/* eslint no-undef : 0 */

module.exports = function script(canvas, data, contentUri, fontUri) {
  const contentType = data.content_type;
  const content = data.content;
  const geometry = data.geometry;

  // Mobilizing context
  let M;
  // Mobilizing renderer
  let R;
  // camera
  let camera;
  // geometry object on which we will map the content
  let support;

  // lights
  let light;
  let light2;

  // texture that is going to be mapped on the content
  let orientation;

  let videoFile;
  let videoTexture;

  let typeface;
  let typefaceRequest;

  let pointer;

  let textNode;

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
      }
      else if (geometry === 'cube') {
        support = new Mobilizing.Mesh({
            primitive: 'cube',
            size: 100,
            segments: 32,
            material: 'basic'
        });
      }
      else if (geometry === 'cylinder') {
        support = new Mobilizing.Mesh({primitive: 'cylinder',
                                      height: 5,
                                      radius: 50,
                                      heightSegments: 12,
                                      radiusSegments: 16,
                                      material: 'basic'});
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

        const vertices = support.getVertices();

        textNode = new Mobilizing.Mesh({primitive: 'node'});
        R.addToCurrentScene(textNode);

        typeface = typefaceRequest.getValue();

        const stringArray = content.split(' ');

        for (let i = 0; i < stringArray.length; i++) {


            if (stringArray[i] && vertices[i]) {
                const text = new Mobilizing.Mesh({primitive: 'text',
                                                text: stringArray[i],
                                                font: typeface,
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
        const video = videoFile.getValue();
        videoTexture = new Mobilizing.VideoTexture({video, autoPlay: true});

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
          videoFile = loader.loadVideo({url: contentUri});
      }
      else {
          typefaceRequest = loader.loadJSON({url: fontUri});
      }
  };

  /**
   * Initializations
   */
  this.setup = function () {
        M = this.getContext();

        R = new Mobilizing.Renderer3D({canvas});
        M.addComponent(R);

        /**
         * Set interactivity-related components
         */

        // touch input
        const touch = new Mobilizing.input.Touch({target: R.canvas});
        M.addComponent(touch);
        touch.setup(); //set it up
        touch.on(); //active it

        // mouse input
        const mouse = new Mobilizing.input.Mouse({target: R.canvas});
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
        }
        else {
            setupText();
        }
    };

    this.update = function () {
        if (videoTexture) {
            videoTexture.update();
        }

        const deviceQuat = orientation.getGyroQuaternion();
        if (deviceQuat) {
            camera.transform.setLocalQuaternion(deviceQuat);
        }
        else {
            if (pointer.getState()) {
                const factor = 5;
                const x = -pointer.getDeltaX() / factor;
                const y = -pointer.getDeltaY() / factor;

                const tempRY = support.transform.getLocalRotationY();
                support.transform.setLocalRotationY(tempRY + x);

                const tempRX = support.transform.getLocalRotationX();
                support.transform.setLocalRotationX(tempRX + y);

                if (textNode) {
                    textNode.transform.setLocalRotationY(support.transform.getLocalRotationY());
                    textNode.transform.setLocalRotationX(support.transform.getLocalRotationX());
                }
            }

        }

    };
};
