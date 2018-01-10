'use strict';

/* eslint no-undef : 0 */

module.exports = function script(canvas, data, contentUri, fontUri) {
    var contentType = data.content_type;
    var content = data.content;
    var geometry = data.geometry;

    // Mobilizing context
    var M = void 0;
    // Mobilizing renderer
    var R = void 0;
    // camera
    var camera = void 0;
    // geometry object on which we will map the content
    var support = void 0;

    // lights
    var light = void 0;
    var light2 = void 0;

    // texture that is going to be mapped on the content
    var orientation = void 0;

    var videoFile = void 0;
    var videoTexture = void 0;

    var typefaceRequest = void 0;

    var pointer = void 0;

    var textNode = void 0;

    /**
       * Setup a geometry support
       */
    function setupGeometry() {
        /**
         * Load geometry
         */
        if (geometry === 'sphere') {
            support = new Mobilizing.Mesh({
                primitive: 'sphere',
                radius: 100,
                segments: 32,
                material: 'basic'
            });
        } else if (geometry === 'cube') {
            support = new Mobilizing.Mesh({
                primitive: 'cube',
                size: 100,
                segments: 32,
                material: 'basic'
            });
        } else if (geometry === 'cylinder') {
            support = new Mobilizing.Mesh({ primitive: 'cylinder',
                height: 5,
                radius: 50,
                heightSegments: 12,
                radiusSegments: 16,
                material: 'basic' });
            support.transform.setLocalScale(-1, 1, 1);
            support.material.setWireframe(true);
        }

        support.transform.setLocalScale(-1, 1, 1);
        R.addToCurrentScene(support);
    }

    /**
     * Maps a text on the geometry support
     */
    function setupText() {
        pointer.setup();
        pointer.on();

        support.setVisible(false);

        var vertices = support.getVertices();

        textNode = new Mobilizing.Mesh({ primitive: 'node' });
        R.addToCurrentScene(textNode);

        typeface = typefaceRequest.getValue();

        var stringArray = content.split(' ');

        for (var i = 0; i < stringArray.length; i++) {

            if (stringArray[i] && vertices[i]) {
                var text = new Mobilizing.Mesh({ primitive: 'text',
                    text: stringArray[i],
                    font: typeface
                    /*material: "basic"*/
                });

                text.transform.setLocalPosition(vertices[i].x, vertices[i].y, vertices[i].z);
                text.transform.lookAt(new Mobilizing.Vector3());
                text.transform.setLocalScale(0.05);
                //text.material.setWireframe(true);
                textNode.transform.addChild(text.transform);
            }
        }
    }

    /**
     * Maps a video on the geometry support
     */
    function setupVideo() {

        /**
         * Load content
         */
        //get the loaded video object from videoFile LoadRequest
        var video = videoFile.getValue();
        videoTexture = new Mobilizing.VideoTexture({ video: video, autoPlay: true });

        /**
         * Map content to geometry
         */
        support.material.setTexture(videoTexture);

        // toggleMeshes(geomType);
    }

    /**
     * Loadings
     */
    this.preLoad = function (loader) {
        if (contentType === 'video') {
            videoFile = loader.loadVideo({ url: contentUri });
        } else {
            typefaceRequest = loader.loadJSON({ url: fontUri });
        }
    };

    /**
     * Initializations
     */
    this.setup = function () {
        M = this.getContext();

        R = new Mobilizing.Renderer3D({ canvas: canvas });
        M.addComponent(R);

        /**
         * Set interactivity-related components
         */

        // touch input
        var touch = new Mobilizing.input.Touch({ target: R.canvas });
        M.addComponent(touch);
        touch.setup(); //set it up
        touch.on(); //active it

        // mouse input
        var mouse = new Mobilizing.input.Mouse({ target: R.canvas });
        M.addComponent(mouse);
        mouse.setup(); //set it up
        mouse.on(); //active it

        pointer = new Mobilizing.Pointer();
        M.addComponent(pointer);
        pointer.add(touch);
        pointer.add(mouse);
        // pointer.setup();
        // pointer.on();

        orientation = new Mobilizing.input.Orientation();
        M.addComponent(orientation);
        orientation.setup();
        orientation.on();

        /**
         * Set camera
         */
        camera = new Mobilizing.Camera();
        camera.setFOV(90);
        R.addCamera(camera);

        /**
         * Lights
         */

        light = new Mobilizing.Light();
        light.transform.setLocalPosition(20, 20, 0);
        light.setIntensity(2);
        R.addToCurrentScene(light);

        light2 = new Mobilizing.Light();
        //light2.transform.setLocalPosition(-20,-20,-20);
        R.addToCurrentScene(light2);

        setupGeometry();
        if (contentType === 'video') {
            setupVideo();
        } else {
            setupText();
        }
    };

    this.update = function () {
        if (videoTexture) {
            videoTexture.update();
        }

        var deviceQuat = orientation.getGyroQuaternion();
        if (deviceQuat) {
            camera.transform.setLocalQuaternion(deviceQuat);
        } else {
            if (pointer.getState()) {
                var factor = 5;
                var x = -pointer.getDeltaX() / factor;
                var y = -pointer.getDeltaY() / factor;

                var tempRY = support.transform.getLocalRotationY();
                support.transform.setLocalRotationY(tempRY + x);

                var tempRX = support.transform.getLocalRotationX();
                support.transform.setLocalRotationX(tempRX + y);

                if (textNode) {
                    textNode.transform.setLocalRotationY(support.transform.getLocalRotationY());
                    textNode.transform.setLocalRotationX(support.transform.getLocalRotationX());
                }
            }
        }
    };
};