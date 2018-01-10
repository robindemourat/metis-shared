'use strict';var _typeof2=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/* eslint-disable */(function(global,factory){(typeof exports==='undefined'?'undefined':_typeof2(exports))==='object'&&typeof module!=='undefined'?factory(exports,require('three')):typeof define==='function'&&define.amd?define(['exports','three'],factory):factory(global.Mobilizing={},global.THREE);})(undefined,function(exports)/*THREE*/{'use strict';var _typeof=typeof Symbol==='function'&&_typeof2(Symbol.iterator)==='symbol'?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj==='undefined'?'undefined':_typeof2(obj);};/**
   * Method to retreive a value from an object if available, or a default value
   * Used in class constructors
   *
   * @method getOrDefault
   * @param {Object} object The object to retreive the value from if available
   * @param {String} key The object's key from which the value should be looked up
   * @param {Mixed} defaultValue The default value to return if the object does not contain the given key, or if the value accociated with the key is undefined
   * @return {Mixed} The retreived a value or the default one
   */function getOrDefault(object,key,defaultValue){return object!==undefined&&key in object?object[key]:defaultValue;}/**
   * Method to retreive a value from an object if available, or the return value of a function with optional arguments
   * Used in class constructors
   *
   * @method getOrExec
   * @param {Object} object The object to retreive the value from if available
   * @param {String} key The object's key from which the value should be looked up
   * @param {Function} fn The function to call if no value was found
   * @param {Mixed} [...args] Optional arguments to send with the function
   * @return {Mixed} The retreived a value or the function's return one
  */function getOrExec(object,key,fn){for(var _len=arguments.length,args=Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){args[_key-3]=arguments[_key];}return object!==undefined&&key in object?object[key]:fn.apply(undefined,args);}/**
   * Method to retreive a value from an object if available, or instantiate a class with optional arguments
   * Used in class constructors
   *
   * @method getOrCreate
   * @param {Object} object The object to retreive the value from if available
   * @param {String} key The object's key from which the value should be looked up
   * @param {Class} cls The class to instantiate if no value was found
   * @param {Mixed} [...args] Optional arguments to send to the class's constructor
   * @return {Mixed} The retreived a value or the new class instance
  */function getOrCreate(object,key,cls){for(var _len2=arguments.length,args=Array(_len2>3?_len2-3:0),_key2=3;_key2<_len2;_key2++){args[_key2-3]=arguments[_key2];}return object!==undefined&&key in object?object[key]:new(Function.prototype.bind.apply(cls,[null].concat(args)))();}/**
   * Method to force a class to have only one instance
   *
   * @method singletonize
   * @param {class} def The definition of the class
   */function singletonize(def){var instance=void 0;return function(){if(instance===undefined){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3<_len3;_key3++){args[_key3]=arguments[_key3];}instance=new(Function.prototype.bind.apply(def,[null].concat(args)))();}return instance;};}function noop(){return null;}/**
   * Simple object check.
   *
   * @param  {any}     item - The item
   * @return {boolean} True if object, false otherwise.
   */function isObject(item){return item&&(typeof item==='undefined'?'undefined':_typeof(item))==='object'&&!Array.isArray(item)&&item!==null;}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var AudioBuffer=function(){/**
       AudioBuffer Class. Encapsulates the concept of buffer of Audio data. You can load, depending on the platform, various audio file formats, like WAV, MP3 or OGG. See the Web Audio API documentation. requires the Web Audio API.
        @class AudioBuffer
       @constructor
       @param {Object} params the parameters object
       @param {RendererAudio} params.renderer The audio renderer
       @param {ArrayBuffer} params.arrayBuffer the raw arraybuffer, already loaded, to give to the audio context
       @param {Function} params.decodedCallback the callback function to call when Audio Context has decoded the sound file's raw  arrayBuffer
       @example
       */function AudioBuffer(params){var _this=this;_classCallCheck(this,AudioBuffer);this.renderer=getOrDefault(params,'renderer',undefined);this.arrayBuffer=getOrDefault(params,'arrayBuffer',undefined);this.decodedCallback=getOrDefault(params,'decodedCallback',undefined);if(this.arrayBuffer){this.renderer.audioContext.decodeAudioData(this.arrayBuffer,function(buffer){_this.buffer=buffer;_this.decodedCallback();});}}/**
      * Return the underlying WebAudio audio buffer
      * @method getInternalAudioBuffer
      * @return {Buffer} webAudio buffer
      */_createClass(AudioBuffer,[{key:'getInternalAudioBuffer',value:function getInternalAudioBuffer(){return this.buffer;}}]);return AudioBuffer;}();var _createClass$3=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$3(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Base=function(){/**
       * A base class
       * Used for all classes that need access to a Mobilizing context
       *
       * @class Base
       * @constructor
       * @param {Object} params Config parameters
       * @param {Context} params.context The Mobilizing Context
      */function Base(params){_classCallCheck$3(this,Base);/**
          * A reference to the Mobilizing context
          *
          * @property {Context} _context
          * @private
          */this._context=getOrDefault(params,'context',null);this._name='unnamed';//object name
this._id=Date.now()+'_'+Math.floor(Math.random()*1000000);//FIXME : generate unique id
}/**
      * Set the Mobilizing context
      *
      * @method setContext
      * @param {Context} context The Mobilizing Context
      */_createClass$3(Base,[{key:'setContext',value:function setContext(context){this._context=context;}/**
          * Get the Mobilizing context
          *
          * @method getContext
          * @return {Context} The Mobilizing context
          */},{key:'getContext',value:function getContext(){return this._context;}/**
           * Set the Object name
           *
           * @method setName
           * @param {string} name The Object name
           */},{key:'setName',value:function setName(name){this._name=name;}/**
           * Get the Object name
           *
           * @method getContext
           * @return {string} The Object name
           */},{key:'getName',value:function getName(){return this._name;}/**
           * Get the Object unique ID
           *
           * @method getID
           * @return {int} The Object ID
           */},{key:'getID',value:function getID(){return this._id;}}]);return Base;}();var _createClass$4=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$4(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var EventEmitter=function(){/**
      * EventEmitter is a helper class to handle event emission
      *
      * @class EventEmitter
      * @constructor
      * @param {Object} params The parameters object
      * @param {Mixed} [params.scope] The scope to use for callbacks, should usually be set to the class instance using the EventEmitter. Defaults to the EventEmitter instance if not specified
      */function EventEmitter(params){_classCallCheck$4(this,EventEmitter);this._scope=getOrDefault(params,'scope',this);this.listeners={};}/**
      * Add an event listener
      *
      * @method on
      * @param {String} type The event type to listen to
      * @param {Function} callback The callback to call when the event is captured
       * @chainable
      */_createClass$4(EventEmitter,[{key:'on',value:function on(type,callback){if(typeof this.listeners[type]==='undefined'){this.listeners[type]=[];}this.listeners[type].push(callback);return this;}/**
           * Remove an event listener
           *
           * @method off
           * @param {String} type The event type to stop listen to
           * @param {Function} [callback] The callback function associated with the listener. If not specified, all listeners will be removed
           * @chainable
           */},{key:'off',value:function off(type,callback){var listeners=void 0;if(this.listeners[type]instanceof Array){if(typeof callback==='undefined'){this.listeners[type]=[];}else{listeners=this.listeners[type];for(var i=0,len=listeners.length;i<len;i++){if(listeners[i]===callback){listeners.splice(i,1);break;}}}}return this;}/**
           * Trigger an event
           *
           * @method trigger
           * @param {String} type The event type
           * @param {Mixed} [...data] Data to send along with the event
           * @chainable
           */},{key:'trigger',value:function trigger(type){var _this=this;for(var _len=arguments.length,data=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){data[_key-1]=arguments[_key];}var listeners=void 0;if(this.listeners[type]instanceof Array){listeners=this.listeners[type];listeners.forEach(function(listener){listener.call.apply(listener,[_this._scope].concat(data));});}return this;}}]);return EventEmitter;}();var _createClass$2=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$2(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$1(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$1(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Component=function(_Base){_inherits$1(Component,_Base);/**
       * The generic componment class
       * Used for all Mobilizing components such as input helpers, renderers, etc
       *
       * @class Component
       * @extends Base
       * @constructor
       * @param {Object} params Config parameters
       * @param {Context} params.context The Mobilizing Context
      */function Component(params){_classCallCheck$2(this,Component);/**
          * Whether the component is active or not
          *
          * @property {Boolean} _active
          * @private
          */var _this=_possibleConstructorReturn$1(this,(Component.__proto__||Object.getPrototypeOf(Component)).call(this,params));_this._active=false;/**
          * Whether the component's setup has been called
          *
          * @property {Boolean} _setupDone
          * @private
          */_this._setupDone=false;/**
          * An event emmiter used to send custom events
          *
          * @property {EventEmitter} events
          */_this.events=new EventEmitter({scope:_this});/*
           * Array of all the children component attached to this component.
           * Used to conceive component chains for easy management
           * @private
           * @property {Array} nexts
           */_this._nexts=[];return _this;}/**
      * Calls the setup if it has not already been called
      * This method should not be called
      * This is where all the initialization (such as adding event listeners)should be done
      * It is called automatically by an internal Mobilizing mechanism and should thus not be called directly
      *
      * @method runSetup
      *//*
      runSetup()
      {
          if(!this._setupDone){
              this._setupDone = true;
               this.setup();
          }
      }
       *//**
      * Set's up the component
      * This empty method is usually overriden to perform setup actions for the component
      * This is where all the initialization (such as adding event listeners)should be done
      * It is called automatically by an internal Mobilizing mechanism and should thus not be called directly
      *
      * @method setup
      */_createClass$2(Component,[{key:'setup',value:function setup(){if(!this._setupDone){this._setupDone=true;}}/**
          * preLoad the component
          * This empty method is usually overriden to perform setup actions for the component.
          * The preLoad is designed to be called before any other method, even setup.
          * In the case of user scripts, it is used to preload all needed datas before the setup (pictures, font, etc.)
          * It is called automatically by an internal Mobilizing mechanism and should thus not be called directly
          *
          * @method preLoad
          */},{key:'preLoad',value:function preLoad(){}/**
          * Activate the component
          * A call to this method calls the setup method if it has not been run yet
          *
          * @method on
          */},{key:'on',value:function on(){this._active=true;}/**
          * Deactivate the component
          *
          * @method off
          */},{key:'off',value:function off(){this._active=false;}/**
           * @method byPass
           * TODO!
           */},{key:'byPass',value:function byPass(){}//how to bypass ?
/**
          * Get the activation status of the component
          *
          * @method getStatus
          * @return {Boolean} True if active, false otherwise
          */},{key:'getStatus',value:function getStatus(){return this._active;}/**
          * Run code before the update of all components is run
          * This empty method is usually overriden to perform pre-update actions for the component
          * It is called once per component by an internal Mobilizing mechanism
          *
          * @method preUpdate
          */},{key:'preUpdate',value:function preUpdate(){}/**
          * Update the component
          * This empty method is usually overriden to perform update actions for the component
          * It is called periodically by an internal Mobilizing mechanism
          *
          * @method update
          */},{key:'update',value:function update(){}/**
          * Run code after the update of all components is run
          * This empty method is usually overriden to perform post-update actions for the component
          * It is called periodically by an internal Mobilizing mechanism
          *
          * @method postUpdate
          */},{key:'postUpdate',value:function postUpdate(){}/**
          * Adds a component to this chained component array
          *
          * @method chain
          * @param {Component} component the component to chain
          */},{key:'chain',value:function chain(component){this._nexts.push(component);}/**
          * Returns the array of attached children components
          *
          * @method getChainedComponents
          * @return {Array} children arrays
          */},{key:'getChainedComponents',value:function getChainedComponents(){return this._nexts;}}]);return Component;}(Base);var _createClass$1=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$1(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var AudioSource=function(_Component){_inherits(AudioSource,_Component);/**
       *
       * AudioSource Class. Encapsulates the concept of Audio source, a sound-emitting entity with a given position in space. requires the Web Audio API.
       *
       * @class AudioSource
       * @constructor
       * @extends Component
       * @param {Object} params the parameters object
       * @param {RendererAudio} params.renderer The AudioRenderer
      */function AudioSource(params){_classCallCheck$1(this,AudioSource);var _this=_possibleConstructorReturn(this,(AudioSource.__proto__||Object.getPrototypeOf(AudioSource)).call(this,params));_this.renderer=getOrDefault(params,'renderer',undefined);// this.panner;
if(_this.renderer.audioContext!==undefined){_this.panner=_this.renderer.audioContext.createPanner();_this.panner.panningModel='HRTF';_this.panner.distanceModel='exponential';_this.panner.refDistance=10;_this.panner.maxDistance=10000;_this.panner.rolloffFactor=1;_this.panner.coneInnerAngle=360;_this.panner.coneOuterAngle=0;_this.panner.coneOuterGain=0;}_this.is3D=false;_this.loop=false;return _this;}/**
      * Sets the reference distance for sound attenuation through space
      * @method setRefDistance
      * @param {Number} val
      */_createClass$1(AudioSource,[{key:'setRefDistance',value:function setRefDistance(val){this.panner.refDistance=val;}/**
          * Sets the maximum distance for sound propagation in space
          * @method setMaxDistance
          * @param {Number} val
          */},{key:'setMaxDistance',value:function setMaxDistance(val){this.panner.maxDistance=val;}/**
           set the current AudioSource buffer
           @method setBuffer
           @param {Object} buffer the AudioBuffer we want the source to play.
           */},{key:'setBuffer',value:function setBuffer(buffer){this.buffer=buffer;}/**
          * set 3D propagation
          * @method set3D
          * @param {Boolean} enabled
          */},{key:'set3D',value:function set3D(enabled){this.is3D=enabled;}/**
           set the current Transform that represents the AudioSource position in space.
           @method setTransform
           @param {Object} transform the Transform.
           */},{key:'setTransform',value:function setTransform(transform){this.transform=transform;}/**
          * set this source loop
          * @method setLoop
          * @param {Boolean} enabled
          */},{key:'setLoop',value:function setLoop(val){this.loop=val;}/**
          * Updates the source's position in space if given from a transform
          * @method update
          */},{key:'update',value:function update(){if(this.transform!==undefined){var pos=this.transform.getLocalPosition();this.panner.setPosition(pos.x,pos.y,pos.z);//sound.panner.setVelocity(dx/dt, dy/dt, dz/dt);
//sound.panner.coneInnerAngle = innerAngleInDegrees;
//sound.panner.coneOuterAngle = outerAngleInDegrees;
//sound.panner.coneOuterGain = outerGainFactor;
//listener :
//ctx.listener.setPosition(p.x, p.y, p.z);
//ctx.listener.setOrientation(vec.x, vec.y, vec.z, up.x, up.y, up.z);
/*
                   var oscillator = audioCtx.createOscillator();
                   var gainNode = audioCtx.createGain();
                   oscillator.connect(gainNode);
                   gainNode.connect(audioCtx.destination);
                   oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
                   oscillator.frequency.value = 440; // value in hertz
                   oscillator.start(0);
                   */}}},{key:'on',value:function on(){_get(AudioSource.prototype.__proto__||Object.getPrototypeOf(AudioSource.prototype),'on',this).call(this);this.play();}},{key:'off',value:function off(){_get(AudioSource.prototype.__proto__||Object.getPrototypeOf(AudioSource.prototype),'off',this).call(this);this.stop();}/**
           plays the AudioSource
           @method play
           */},{key:'play',value:function play(){if(this.renderer.audioContext!==undefined){if(this.source!==undefined){this.stop();}this.source=this.renderer.audioContext.createBufferSource();if(this.is3D){this.source.connect(this.panner);this.panner.connect(this.renderer.audioContext.destination);}else{this.source.connect(this.renderer.audioContext.destination);}this.source.buffer=this.buffer.buffer;}if(this.source!==undefined){this.playing=true;if(this.loop){this.source.loop=true;}this.source.start(0);}}/**
           pauses the AudioSource.
           @method pause
           */},{key:'pause',value:function pause(){if(this.source!==undefined){this.playing=false;}}/**
           stops the AudioSource.
           @method stop
           */},{key:'stop',value:function stop(){if(this.source!==undefined){this.source.stop(0);this.source=undefined;this.playing=false;}}}]);return AudioSource;}(Component);var _createClass$5=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$1=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$5(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$2(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$2(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Represents a RGB color to be used in materials applied on Meshes.
   *
   * This class extends the one from Three.js, API available here : http://threejs.org/docs/#Reference/Math/Color
   * @class Color
   */var Color$1=function(_THREE$Color){_inherits$2(Color$$1,_THREE$Color);function Color$$1(){_classCallCheck$5(this,Color$$1);return _possibleConstructorReturn$2(this,(Color$$1.__proto__||Object.getPrototypeOf(Color$$1)).apply(this,arguments));}_createClass$5(Color$$1,[{key:'setTo',/**
      * Sets the rgb components of this color to the [0;1] based given value
      * @private
      * @method setTo
      * @chainable
      * @param {Float} val float number
      * @return {Color} this color with the given value
      */value:function setTo(val){this.r=val;this.g=val;this.b=val;return this;}/**
       Creates a color based on [0;255] RGB values
       @method setRGB32
       @param {Number} r The red component [0;255].
       @param {Number} g The green component [0;255].
       @param {Number} b The blue component [0;255].
       */},{key:'setRGB32',value:function setRGB32(r,g,b){this.r=r/255;this.g=g/255;this.b=b/255;}/**
       Build a HTML color string with the given alpha.
       @method makeRGBAStringWithAlpha
       @param {Number} a The alpha component [0;255].
       @return {String} a string representation of the color with alpha
       */},{key:'makeRGBAStringWithAlpha',value:function makeRGBAStringWithAlpha(a){var string='rgba('+Math.floor(this.r*255)+','+Math.floor(this.g*255)+','+Math.floor(this.b*255)+','+a+')';return string;}/*
      hex()
      {
          return this.color.getHexString();
            var r = this.color.r*255;
           var g = this.color.g*255;
           var b = this.color.b*255;
            return "#" + r.toString(16) + g.toString(16) + b.toString(16);
        }
      *//**
      * Copies given color.
      * @method copy
      * @return Color
      * @param color {Color}
      */},{key:'copy',value:function copy()/*color*/{_get$1(Color$$1.prototype.__proto__||Object.getPrototypeOf(Color$$1.prototype),'copy',this).call(this);}/**
       Copies given color making conversion from gamma to linear space.
      @method copyGammaToLinear
      @return Color
      @param color {Color}
      *//**
       Copies given color making conversion from linear to gamma space.
      @method copyLinearToGamma
      @return Color
      @param color {Color}
      *//**
      @method convertGammaToLinear
      @return Color
      *//**
      @method convertLinearToGamma
      @return Color
      *//**
       Sets this color from RGB values.
      @method setRGB
      @return Color
      @param r {Float}
      @param g {Float}
      @param b {Float}
      *//**
      @method getHex
      @return Integer
      *//**
      @method getHexString
      @return String
      *//**
       Sets this color from a hexadecimal value.
      @method setHex
      @return Color
      @param hex {Integer}
      *//**
       Sets this color from a CSS-style string. For example, "rgb(250, 0,0)", "rgb(100%, 0%, 0%)", "hsl(0, 100%, 50%)", "#ff0000", "#f00", or "red". Transluent colors such as "rgba(255, 0, 0, 0.5)" and "hsla(0, 100%, 50%, 0.5)" are also accepted, but the alpha-channel coordinate will be discarded.
      @method setStyle
      @return Color
      @param style {String}
      *//**
      @method getStyle
      @return String
      *//**
       Sets color from hsl
      @method setHSL
      @return Color
      @param h {Float}
      @param s {Float}
      @param l {Float}
      *//**
      @method offsetHSL
      @return Color
      @param h {Float}
      @param s {Float}
      @param l {Float}
      *//**
      @method add
      @return Color
      @param color {Color}
      *//**
      @method addColors
      @return Color
      @param color1 {Color}
      @param color2 {Color}
      *//**
      @method addScalar
      @return Color
      @param s {Number}
      *//**
      @method multiply
      @return Color
      @param color {Color}
      *//**
      @method multiplyScalar
      @return Color
      @param s {Number}
      *//**
       Linear interpolation of this colors rgb values and the rgb values of the first argument. The alpha argument can be thought of as the percent between the two colors, where 0 is this color and 1 is the first argument.
      @method lerp
      @return Color
      @param color {Color}
      *//**
       Returns an array [r,g,b
      @method toArray
      @return Array
      @param array {Array}
      *//**
      @method equals
      @return Color
      @param c {Color}
      *//**
      @method clone
      @return Color
      */}],[{key:'Create',/**
           Creates a color based on [0;1] float RGB values
           @method Create
           @static
           @param {Number} r The red component [0;1].
           @param {Number} g The green component [0;1].
           @param {Number} b The blue component [0;1].
           */value:function Create(r,g,b){return new Color$$1(r,g,b);}/**
           Creates a random color
           @method random
           @static
           @return {Color} the created random color
           */},{key:'random',value:function random(){return new Color$$1(Math.random(),Math.random(),Math.random());}}]);return Color$$1;}(THREE.Color);/**
  * Color.green, a green Color Object
  * @property green {Color}
  * @static
  */Color$1.green=new Color$1(0.0,1.0,0.0);/**
  * Color.blue, a blue Color Object
  * @property blue {Color}
  * @static
  */Color$1.blue=new Color$1(0.0,0.0,1.0);/**
  * Color.red, a red Color Object
  * @property red {Color}
  * @static
  */Color$1.red=new Color$1(1.0,0.0,0.0);/**
  * Color.white, a white Color Object
  * @property white {Color}
  * @static
  */Color$1.white=new Color$1(1.0,1.0,1.0);/**
  * Color.darkGray, a darkGray Color Object
  * @property darkGray {Color}
  * @static
  */Color$1.darkGray=new Color$1(0.3,0.3,0.3);/**
  * Color.gray, a gray Color Object
  * @property gray {Color}
  * @static
  */Color$1.gray=new Color$1(0.5,0.5,0.5);/**
  * Color.lightGray, a lightGray Color Object
  * @property lightGray {Color}
  * @static
  */Color$1.lightGray=new Color$1(0.8,0.8,0.8);/**
  * Color.black, a black Color Object
  * @property black {Color}
  * @static
  */Color$1.black=new Color$1(0.0,0.0,0.0);/**
   * Color.cyan, a cyan Color Object
   * @property cyan {Color}
   * @static
   */Color$1.cyan=new Color$1(0,1,1);/**
   * Color.magenta, a magenta Color Object
   * @property magenta {Color}
   * @static
   */Color$1.magenta=new Color$1(1,0,1);/**
   * Color.yellow, a yellow Color Object
   * @property yellow {Color}
   * @static
   */Color$1.yellow=new Color$1(1,1,0);/**
   * Color.lightRed, a lightRed Color Object
   * @property lightRed {Color}
   * @static
   */Color$1.lightRed=new Color$1(1,0.5,0.5);/**
   * Color.lightGreen, a lightGreen Color Object
   * @property lightGreen {Color}
   * @static
   */Color$1.lightGreen=new Color$1(0.5,1,0.5);/**
   * Color.lightBlue, a lightBlue Color Object
   * @property lightBlue {Color}
   * @static
   */Color$1.lightBlue=new Color$1(0.5,0.5,1);Color$1.mobilizing=new Color$1(60/255,30/255,1);Color$1.mobilizingDark=new Color$1(36/255,18/255,153/255);Color$1.mobilizingLight=new Color$1(208/255,202/255,247/255);Color$1.mobilizingAlternate=new Color$1(255/255,158/255,116/255);/**
  * Color.transparent, a transparent Color Object
  * @property transparent {Color}
  * @static
  */Color$1.transparent=new Color$1(new Color$1().makeRGBAStringWithAlpha(0));function _classCallCheck$6(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$3(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$3(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Euler class (deprecated ?)
   *
   * This class extends the one from Three.js, API available here : http://threejs.org/docs/#Reference/Math/Euler
   * @class Euler
   */var Euler$1=function(_THREE$Euler){_inherits$3(Euler$$1,_THREE$Euler);function Euler$$1(){_classCallCheck$6(this,Euler$$1);return _possibleConstructorReturn$3(this,(Euler$$1.__proto__||Object.getPrototypeOf(Euler$$1)).apply(this,arguments));}return Euler$$1;}(THREE.Euler);function _classCallCheck$7(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$4(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$4(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Matrix3 class
   *
   * This class extends the one from Three.js, API available here : http://threejs.org/docs/#Reference/Math/Matrix3
   * @class Matrix3
  **/var Matrix3$1=function(_THREE$Matrix){_inherits$4(Matrix3$$1,_THREE$Matrix);function Matrix3$$1(){_classCallCheck$7(this,Matrix3$$1);return _possibleConstructorReturn$4(this,(Matrix3$$1.__proto__||Object.getPrototypeOf(Matrix3$$1)).apply(this,arguments));}return Matrix3$$1;}(THREE.Matrix3);function _classCallCheck$8(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$5(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$5(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Matrix4 class
   *
   * This class extends the one from Three.js, API available here : http://threejs.org/docs/#Reference/Math/Matrix4
   * @class Matrix4
  **/var Matrix4$1=function(_THREE$Matrix){_inherits$5(Matrix4$$1,_THREE$Matrix);function Matrix4$$1(){_classCallCheck$8(this,Matrix4$$1);return _possibleConstructorReturn$5(this,(Matrix4$$1.__proto__||Object.getPrototypeOf(Matrix4$$1)).apply(this,arguments));}return Matrix4$$1;}(THREE.Matrix4);function _classCallCheck$9(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$6(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$6(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Represents a Quaternion, a way to describe a spatial rotation that is less susceptible to gimbal lock.
   *
   * This class extends the one from Three.js, API available here : http://threejs.org/docs/#Reference/Math/Quaternion
   * @class Quaternion
   */var Quaternion$1=function(_THREE$Quaternion){_inherits$6(Quaternion$$1,_THREE$Quaternion);function Quaternion$$1(){_classCallCheck$9(this,Quaternion$$1);return _possibleConstructorReturn$6(this,(Quaternion$$1.__proto__||Object.getPrototypeOf(Quaternion$$1)).apply(this,arguments));}return Quaternion$$1;}(THREE.Quaternion);var _createClass$6=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$10(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Rect=function(){/**
      * Rect hold a simple rectangle representation with x & y coordinates and width & height.
      *
      * @class Rect
      * @constructor
      * @param {float} x
      * @param {float} y
      * @param {float} width
      * @param {float} height
      */function Rect(x,y,width,height){_classCallCheck$10(this,Rect);this.x=x;this.y=y;this.width=width;this.height=height;}/**
      * Return an array representation
      * @method toArray
      * @return {Array} [x, y, width, height]
      */_createClass$6(Rect,[{key:'toArray',value:function toArray(){return[this.x,this.y,this.width,this.height];}/**
          * Sets the rect's value based on an array formatted like [x, y, width, height]
          * @method fromArray
          * @param {Array} array [x, y, width, height]
          */},{key:'fromArray',value:function fromArray(array){this.x=array[0];this.y=array[1];this.width=array[2];this.height=array[3];}}]);return Rect;}();var _createClass$7=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$11(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$7(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$7(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Represents a 2 dimensionnal Euclidean Vector, to be used as 2D positions, 2D directions or 2D Euler angles (rotation).
   *
   * This class extends the one from Three.js, API available here : http://threejs.org/docs/#Reference/Math/Vector2
   * @class Vector2
   */var Vector2$1=function(_THREE$Vector){_inherits$7(Vector2$$1,_THREE$Vector);function Vector2$$1(){_classCallCheck$11(this,Vector2$$1);return _possibleConstructorReturn$7(this,(Vector2$$1.__proto__||Object.getPrototypeOf(Vector2$$1)).apply(this,arguments));}_createClass$7(Vector2$$1,[{key:'rotate90CW',value:function rotate90CW(){var memX=this.x;var memY=this.y;this.x=memY;this.y=-memX;}},{key:'rotate90CCW',value:function rotate90CCW(){var memX=this.x;var memY=this.y;this.x=-memY;this.y=memX;}}]);return Vector2$$1;}(THREE.Vector2);/**
  * Vector2.one returns <i>new Mobilizing.Vector2(1, 1)</i>
  * @property one
  * @static
  */Vector2$1.one=new Vector2$1(1,1);/**
  * Vector2.zero returns <i>new Mobilizing.Vector2(0, 0)</i>
  * @property zero
  * @static
  */Vector2$1.zero=new Vector2$1(0,0);function _classCallCheck$12(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$8(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$8(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Represents a 3 dimensionnal Euclidean Vector, to be used as positions, directions or Euler angles (rotation).
   *
   * This class extends the one from Three.js, API available here : http://threejs.org/docs/#Reference/Math/Vector3
   * @class Vector3
   */var Vector3$1=function(_THREE$Vector){_inherits$8(Vector3$$1,_THREE$Vector);function Vector3$$1(){_classCallCheck$12(this,Vector3$$1);return _possibleConstructorReturn$8(this,(Vector3$$1.__proto__||Object.getPrototypeOf(Vector3$$1)).apply(this,arguments));}return Vector3$$1;}(THREE.Vector3);/**
  * Vector3.one returns <i>new Mobilizing.Vector2(1, 1, 1)</i>
  * @property one
  * @static
  */Vector3$1.one=new Vector3$1(1,1,1);/**
  * Vector3.one returns <i>new Mobilizing.Vector2(0, 0, 0)</i>
  * @property zero
  * @static
  */Vector3$1.zero=new Vector3$1(0,0,0);var _createClass$9=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$14(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
   * Math class gives easy access to some basics calculations that are frequently used in interactive computer graphics
   *
   * @class Math
   * @example
   *     Mobilizing.Math.map(10, 0,20, -10,10);
   */var _Math=function(){function _Math(){_classCallCheck$14(this,_Math);}_createClass$9(_Math,null,[{key:'randomFromTo',/**
           * Generates a random number between 2 float values
           * @method randomFromTo
           * @static
           * @param {float} from
           * @param {float} to
           */value:function randomFromTo(from,to){return Math.random()*(to-from)+from;}/**
           * Maps a number between 2 sets of float values
           * @method map
           * @static
           * @param {float} value the value to map
           * @param {float} low1 the 1st origin value
           * @param {float} high1 the 2nd destination value
           * @param {float} low2 the 1st destination value
           * @param {float} high2
           */},{key:'map',value:function map(value,low1,high1,low2,high2){return low2+(high2-low2)*(value-low1)/(high1-low1);}/**
           * Converts degrees to radians
           * @static
           * @method degToRad
           * @param {float} val
           */},{key:'degToRad',value:function degToRad(val){var degreeToRadiansFactor=Math.PI/180;return val*degreeToRadiansFactor;}/**
           * Converts radians to degrees
           * @static
           * @method radToDeg
           * @param {float} val
           */},{key:'radToDeg',value:function radToDeg(val){var radianToDegreesFactor=180/Math.PI;return val*radianToDegreesFactor;}/**
           * Calculates the distance between two 2D points
           * @static
           * @method dist
           * @param {float} x1
           * @param {float} y1
           * @param {float} x2
           * @param {float} y2
           */},{key:'dist',value:function dist(x1,y1,x2,y2){return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));}/**
           * Lerps a value to the destination value with the given amount
           * @static
           * @method lerp
           * @param {float} value
           * @param {float} dest
           * @param {float} amount
           */},{key:'lerp',value:function lerp(value,dest,amount){return value+(dest-value)*amount;}/**
           * Clamp a value between a minimum and a maximum
           * @static
           * @method clamp
           * @param {Number} value
           * @param {Number} min
           * @param {Number} max
           */},{key:'clamp',value:function clamp(value,min,max){return Math.min(max,Math.max(min,value));}/**
           * Finds if a point is inside an array of vertices
           * @static
           * @method pointIsInside
           * @param {Number} x
           * @param {Number} y
           * @param {Vector2 Array} points vertices {x,y}
           */},{key:'pointIsInside',value:function pointIsInside(x,y,points){var i=void 0,j=points.length-1;var oddNodes=false;for(i=0;i<points.length;i++){if(points[i].y<y&&points[j].y>=y||points[j].y<y&&points[i].y>=y){if(points[i].x+(y-points[i].y)/(points[j].y-points[i].y)*(points[j].x-points[i].x)<x){oddNodes=!oddNodes;}}j=i;}return oddNodes;}},{key:'intersectionPoint',value:function intersectionPoint(line1,line2){var a1=line1[1].x-line1[0].x;var b1=line2[0].x-line2[1].x;var c1=line2[0].x-line1[0].x;var a2=line1[1].y-line1[0].y;var b2=line2[0].y-line2[1].y;var c2=line2[0].y-line1[0].y;var t=void 0;//treat special case : points are on the same lines!
if(b1*c2===0&&b2*c1===0&&a2*b1===0&&a1*b2===0){t=0;}else{t=(b1*c2-b2*c1)/(a2*b1-a1*b2);}return{x:line1[0].x+t*(line1[1].x-line1[0].x),y:line1[0].y+t*(line1[1].y-line1[0].y)};}}]);return _Math;}();var _createClass$10=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$2=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$15(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$10(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$10(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Time=function(_Component){_inherits$10(Time,_Component);/**
      * The Time class provides methods to control time related operations. One instance of this Component is created internnaly by the Context. It makes it possible to access and to use a global time in Components that require it (i.e Touch, Animation, etc.). In users script, this global Time can be accessed via the context.
      *
      * @example
      *    //TODO
      *
      * @class Time
      * @constructor
      */function Time(params){_classCallCheck$15(this,Time);var _this=_possibleConstructorReturn$10(this,(Time.__proto__||Object.getPrototypeOf(Time)).call(this,params));_this._startTime=getOrDefault(params,'startTime',new Date().getTime());_this._timeScale=getOrDefault(params,'scale',1);_this._currentTime=new Date().getTime();_this._deltaTime=0;return _this;}/*setup()
      {
          super.setup();
      }*//**
      * Start the Time
      * @method on
      */_createClass$10(Time,[{key:'on',value:function on(){_get$2(Time.prototype.__proto__||Object.getPrototypeOf(Time.prototype),'on',this).call(this);this.reset();}/**
          * Pause the Time
          * @method off
          *//*off()
          {
              super.off();
          }*//**
          * resets this time instance
          *
          * @method reset
          */},{key:'reset',value:function reset(){this._startTime=new Date().getTime();}/**
          * updates this time instance
          *
          * @method update
          */},{key:'update',value:function update(){if(this.getStatus())//the component must be on, else we "stop" the time
{var lastTime=this._currentTime;this._currentTime=new Date().getTime();this._deltaTime=(this._currentTime-lastTime)/1000*this._timeScale;}}/**
          * absolute Delta
          *
          * @method getAbsoluteDelta
          * @return {Number} absolute Delta
          */},{key:'getAbsoluteDelta',value:function getAbsoluteDelta(){return this._currentTime-this._startTime;}/**
          * Set the current timeScale, useful to slower time down
          *
          * @method setTimeScale
          * @param {Number} scale
          */},{key:'setTimeScale',value:function setTimeScale(scale){this._timeScale=scale;}/**
          * Get the current timeScale
          *
          * @method getTimeScale
          * @return {Number} scale
          */},{key:'getTimeScale',value:function getTimeScale(){return this._timeScale;}/**
          * Get the current timeDelta (difference of time between 2 frames) at the current timeScale
          *
          * @method getDelta
          * @return {Number} the current timeDelta at the current timeScale
          */},{key:'getDelta',value:function getDelta(){return this._deltaTime;}/**
          * Gets the current Time object's time
          *
          * @method getTime
          * @return {Number} the current time
          */},{key:'getTime',value:function getTime(){return this._currentTime;}}]);return Time;}(Component);var _createClass$8=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$13(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$9(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$9(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Fired when the animation starts
   * @event start
   * @param {Object} target The target object
   */var EVT_START='start';/**
   * Fired each time the animation is updated
   * @event update
   * @param {Object} target The target object
   */var EVT_UPDATE='update';/**
   * Fired when each time the animation is repeated once it reached the end if repeat is greater than 1
   * @event restart
   * @param {Object} target The target object
   * @param {Number} direction The current direction
   */var EVT_RESTART='restart';/**
   * Fired when the animation is stopped
   * @event stop
   * @param {Object} target The target object
   */var EVT_STOP='stop';/**
   * Fired when the animation is resumed
   * @event resume
   * @param {Object} target The target object
   */var EVT_RESUME='resume';/**
   * Fired when the animation reaches the end and no repetition is pending
   * @event finish
   * @param {Object} target The target object
   */var EVT_FINISH='finish';var Animation=function(_Component){_inherits$9(Animation,_Component);/**
      * The Animation class provides a simple way to tween object properties
      *
      * @example
      *    //TODO
      *
      * @class Animation
      * @constructor
      * @param {Object} params The parameters object
      * @param {Object} params.target The object whose propoerties are to be animated
      * @param {Object} [params.from] An object indicating the start values of the properties to animate, defaults to the values of the target
      * @param {Object} params.to An object indicating the finish values of the properties to animate
      * @param {Number} params.duration The animation duration in milliseconds
      * @param {Function} [params.easing=Animation.Easing.linear] An easing function to use
      * @param {Number} [params.repeat=0] The number of times the animation should be repeated, set to Infinity to repeat indefinately
      * @param {Boolean} [params.yoyo=false] If set to true and repeat is greater than 1, the animation will play in reverse once it reached the end
      * @param {Number} [params.delay=0] The number of milliseconds to wait for before starting the animation
      * @param {Time} [params.time] The Time instance to use for this Animation Component
      * @param {Function} [params.onStart] A callback to be called when the animation starts
      * @param {Function} [params.onUpdate] A callback to be called each time the animation is updated
      * @param {Function} [params.onRestart] A callback to be called each time the animation is repeated once it reached the end if repeat is greater than 1
      * @param {Function} [params.onStop] A callback to be called when the animation is stopped
      * @param {Function} [params.onResume] A callback to be called when the animation is resumed
      * @param {Function} [params.onFinish] A callback to be called when the animation reaches the end and no repetition is pending
      */function Animation(params){_classCallCheck$13(this,Animation);var _this=_possibleConstructorReturn$9(this,(Animation.__proto__||Object.getPrototypeOf(Animation)).call(this,params));_this._target=params.target;_this._from=getOrDefault(params,'from',null);_this._to=params.to;_this._duration=params.duration;_this._easing=getOrDefault(params,'easing',Animation.Easing.linear);_this._repeat=getOrDefault(params,'repeat',0);_this._yoyo=getOrDefault(params,'yoyo',false);_this._delay=getOrDefault(params,'delay',0);_this._time=new Time();_this._timesPlayed=0;_this._direction=1;var onStart=getOrDefault(params,'onStart',null);var onUpdate=getOrDefault(params,'onUpdate',null);var onRestart=getOrDefault(params,'onRestart',null);var onStop=getOrDefault(params,'onStop',null);var onResume=getOrDefault(params,'onResume',null);var onFinish=getOrDefault(params,'onFinish',null);// bind custom callbacks to events
if(onStart){_this.events.on(EVT_START,onStart);}if(onUpdate){_this.events.on(EVT_UPDATE,onUpdate);}if(onRestart){_this.events.on(EVT_RESTART,onRestart);}if(onStop){_this.events.on(EVT_STOP,onStop);}if(onResume){_this.events.on(EVT_RESUME,onResume);}if(onFinish){_this.events.on(EVT_FINISH,onFinish);}return _this;}/**
      * Setup
      *
      * @method setup
      */_createClass$8(Animation,[{key:'setup',value:function setup(){var context=this.getContext();context.addComponent(this._time);this._time.setup();this._time.on();this._isPlaying=false;}/**
          * Play the animation
          *
          * @method play
          */},{key:'play',value:function play(){var _this2=this;this._isPlaying=true;this._time.reset();if(!this._from){// fill in the start values from the target
this._from={};Object.keys(this._to).forEach(function(prop){_this2._from[prop]=_this2._target[prop];});}this.events.trigger(EVT_START,this._target);}/**
          * Stop the animation
          *
          * @method stop
          */},{key:'stop',value:function stop(){this._isPlaying=false;this.events.trigger(EVT_STOP,this._target);}/**
          * Resume the animation
          *
          * @method resume
          */},{key:'resume',value:function resume(){}/**
          * Rewind the animation back to its starting values
          *
          * @method rewind
          */},{key:'rewind',value:function rewind(){this.update(0);}/**
          * Update the properties according to the elapsed time
          *
          * @method update
          */},{key:'update',value:function update(time){var _this3=this;if(!this._isPlaying){return;}var t=(time!==undefined?time:this._time.getAbsoluteDelta())/this._duration;if(t>=1){Object.keys(this._from).forEach(function(prop){_this3._target[prop]=_this3._to[prop];});if(this._timesPlayed++<this._repeat){if(this._yoyo){this._direction*=-1;}this._time.reset();this.events.trigger(EVT_RESTART,this._target,this._direction);}else{this._isPlaying=false;this.events.trigger(EVT_FINISH,this._target);}}else{for(var prop in this._from){if(this._direction<1){this._target[prop]=_Math.map(this._easing(t),0,1,this._to[prop],this._from[prop]);}else{this._target[prop]=_Math.map(this._easing(t),0,1,this._from[prop],this._to[prop]);}}this.events.trigger(EVT_UPDATE,this._target);}}/**
          * Chain another animation once this one is finished
          *
          * @method chain
          */},{key:'chain',value:function chain(animation){this.events.on(EVT_FINISH,function(){animation.play();});}}]);return Animation;}(Component);// credit: https://gist.github.com/gre/1650294
Animation.Easing={linear:function linear(t){return t;},easeInQuad:function easeInQuad(t){return Math.pow(t,2);},easeOutQuad:function easeOutQuad(t){return 1-Math.abs(Math.pow(t-1,2));},easeInOutQuad:function easeInOutQuad(t){if(t<0.5){return Animation.Easing.easeInQuad(t*2)/2;}return Animation.Easing.easeOutQuad(t*2-1)/2+0.5;},easeInCubic:function easeInCubic(t){return Math.pow(t,3);},easeOutCubic:function easeOutCubic(t){return 1-Math.abs(Math.pow(t-1,3));},easeInOutCubic:function easeInOutCubic(t){if(t<0.5){return Animation.Easing.easeInCubic(t*2)/2;}return Animation.Easing.easeOutCubic(t*2-1)/2+0.5;},easeInQuart:function easeInQuart(t){return Math.pow(t,4);},easeOutQuart:function easeOutQuart(t){return 1-Math.abs(Math.pow(t-1,4));},easeInOutQuart:function easeInOutQuart(t){if(t<0.5){return Animation.Easing.easeInQuart(t*2)/2;}return Animation.Easing.easeOutQuart(t*2-1)/2+0.5;},easeInQuint:function easeInQuint(t){return Math.pow(t,5);},easeOutQuint:function easeOutQuint(t){return 1-Math.abs(Math.pow(t-1,5));},easeInOutQuint:function easeInOutQuint(t){if(t<0.5){return Animation.Easing.easeInQuint(t*2)/2;}return Animation.Easing.easeOutQuint(t*2-1)/2+0.5;},easeInSin:function easeInSin(t){return 1+Math.sin(Math.PI/2*t-Math.PI/2);},easeOutSin:function easeOutSin(t){return Math.sin(Math.PI/2*t);},easeInOutSin:function easeInOutSin(t){return(1+Math.sin(Math.PI*t-Math.PI/2))/2;},easeInElastic:function easeInElastic(t){return(0.04-0.04/t)*Math.sin(25*t)+1;},easeOutElastic:function easeOutElastic(t){return 0.04*t/--t*Math.sin(25*t);},easeInOutElastic:function easeInOutElastic(t){if((t-=0.5)<0){return(0.01+0.01/t)*Math.sin(50*t);}return(0.02-0.01/t)*Math.sin(50*t)+1;},easeInBounce:function easeInBounce(t){return 1-Animation.Easing.easeOutBounce(1-t);},easeOutBounce:function easeOutBounce(t){if(t<1/2.75){return 7.5625*t*t;}else if(t<2/2.75){return 7.5625*(t-=1.5/2.75)*t+0.75;}else if(t<2.5/2.75){return 7.5625*(t-=2.25/2.75)*t+0.9375;}return 7.5625*(t-=2.625/2.75)*t+0.984375;},easeInOutBounce:function easeInOutBounce(t){if(t<0.5){return Animation.Easing.easeInBounce(t*2)*0.5;}return Animation.Easing.easeOutBounce(t*2-1)*0.5+0.5;}};var _createClass$13=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$18(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Material=function(){/**
       * A material will give color and some effect to the surface of the 3D object.
       * Mobilizing.js is heavily based on the one of Three.js http://threejs.org/docs/#Reference/Materials/Material and its variations
       *
       * @class Material
       * @constructor
       * @param {Object} params an object containing all the possible parameters for this class. Use it like in the following example. Possible parameters are lisited below.
       * @example
       *     //this is how to use a parameters object in order to instanciate a Mobilizing.js object
       *     var mobilizingObject = new Mobilizing.Class({paramName1: value, paramName2: value});
       *
       * @param {String} [params.type="basic"] the type of the matrial, one of "basic", "projectionmapping", "phong", "line", "sprite"
       */function Material(params){_classCallCheck$18(this,Material);params.type=getOrDefault(params,'type','default');this.texture=undefined;switch(params.type){case'basic':this._material=new THREE.MeshBasicMaterial({color:0xffffff,wireframe:false});break;case'custom':this._material=new THREE.ShaderMaterial({fragmentShader:params.fragmentShader,vertexShader:params.vertexShader,uniforms:params.uniforms});//this._material.lights = true; //pass the lights uniforms
break;case'projectionmapping':var shader=THREE.ShaderLib.cube;var uniforms=THREE.UniformsUtils.clone(shader.uniforms);shader.vertexShader=shader.vertexShader.replace('vWorldPosition = transformDirection( position, modelMatrix );','vWorldPosition = (modelMatrix * vec4( position, 0.0 )).xyz;');shader.fragmentShader=shader.fragmentShader.replace('gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );','vec3 viewDir = vWorldPosition-viewPosition;  gl_FragColor = textureCube( tCube, normalize(viewDir));');shader.fragmentShader=shader.fragmentShader.replace('uniform samplerCube tCube;','uniform samplerCube tCube; uniform vec3 viewPosition;');uniforms.viewPosition={type:'v3',value:new THREE.Vector3(0,0,0)};this._material=new THREE.ShaderMaterial({fragmentShader:shader.fragmentShader,vertexShader:shader.vertexShader,uniforms:uniforms});break;case'lambert'://vertex lit
this._material=new THREE.MeshLambertMaterial({color:0xffffff,wireframe:false,shading:THREE.FlatShading});//this._material = new THREE.MeshLambertMaterial( { color: 0xffffff, combine: THREE.MixOperation});
break;case'default':case'phong':this._material=new THREE.MeshPhongMaterial({color:0xffffff});this._material.shading=THREE.SmoothShading;break;case'line':this._material=new THREE.LineBasicMaterial({color:0xffffff});break;case'sprite':this._material=new THREE.SpriteMaterial({color:0xffffff});break;default:this._material=new THREE.MeshBasicMaterial({color:0xffffff,wireframe:false});}this._material.side=THREE.DoubleSide;//this._material.transparent = true;
this.type=params.type;//this._material.alphaTest = 0.1;
}/**
       * set the texture
       *
       * @method setTexture
       * @param {Texture} texture
       */_createClass$13(Material,[{key:'setTexture',value:function setTexture(texture){this.texture=texture;if(this.texture._texture!==undefined){//console.log("attach texture to material");
this._material.map=this.texture._texture;//this._material.needsUpdate = true;
}else if(texture.cube!==undefined){if(this.type==='projectionmapping'){this._material.uniforms.tCube.value=texture.cube;// textureCube has been init before
}else{this._material.envMap=texture.cube;}}}/**
          * Gets the current texture
          *
          * @method getTexture
          * @return {Texture}
          */},{key:'getTexture',value:function getTexture(){return this.texture;}/**
           * @method setUniform
           * @param {String} name the name of the uniform to set
           * @param {Object} value the value of the uniform to set
           */},{key:'setUniform',value:function setUniform(name,value){this._material.uniforms[name].value=value;}/**
          * @method setTransparent
          * @param {Boolean} trans
          */},{key:'setTransparent',value:function setTransparent(trans){this._material.transparent=trans;}/**
          * @method getTransparent
          * @return {Boolean}
          */},{key:'getTransparent',value:function getTransparent(){return this._material.transparent;}/**
          * @method setColor
          * @param {Color} color
          */},{key:'setColor',value:function setColor(color){//debug.log("material type", this._material);
this._material.color=color;}/**
          * @method getColor
          * @return {Color}
          */},{key:'getColor',value:function getColor(){return this._material.color;}/**
          * @method setWireframe
          * @param {Boolean} wireframe
          */},{key:'setWireframe',value:function setWireframe(wireframe){this._material.wireframe=wireframe;}/**
          * @method getWireframe
          * @return {Boolean}
          */},{key:'getWireframe',value:function getWireframe(){return this._material.wireframe;}/**
          * @method setOpacity
          * @param {float} op
          */},{key:'setOpacity',value:function setOpacity(op){this._material.opacity=op;}/**
          * @method getOpacity
          * @return {float}
          */},{key:'getOpacity',value:function getOpacity(){return this._material.opacity;}/**
          * @method setDoubleSided
          * @param {Boolean} sided
          */},{key:'setDoubleSided',value:function setDoubleSided(sided){this._material.side=sided?THREE.DoubleSide:THREE.FrontSide;}/**
          * @method getDoubleSided
          * @return {Boolean}
          */},{key:'getDoubleSided',value:function getDoubleSided(){return this._material.side===THREE.DoubleSide;}/**
          * @method setAlphaTest
          * @param {Boolean} val
          */},{key:'setAlphaTest',value:function setAlphaTest(val){this._material.alphaTest=val;}/**
          * @method getAlphaTest
          * @return {Boolean}
          */},{key:'getAlphaTest',value:function getAlphaTest(){return this._material.alphaTest;}},{key:'setDepthWrite',value:function setDepthWrite(bool){this._material.depthWrite=bool;}},{key:'setDepthTest',value:function setDepthTest(bool){this._material.depthTest=bool;}/**
          * @method setLineWidth
          * @param {Number} val
          */},{key:'setLineWidth',value:function setLineWidth(val){this._material.linewidth=val;}/**
          * @method getLineWidth
          * @return {Number}
          */},{key:'getLineWidth',value:function getLineWidth(){return this._material.linewidth;}/**
           * @method setShininess
           * @param {Number} color
           */},{key:'setShininess',value:function setShininess(val){//debug.log("material type", this._material);
this._material.shininess=val;}/**
           * @method getShininess
           * @return {Number}
           */},{key:'getShininess',value:function getShininess(){return this._material.shininess;}/**
           * @method setEmissiveColor
           * @param {Color} color
           */},{key:'setEmissiveColor',value:function setEmissiveColor(color){//debug.log("material type", this._material);
this._material.emissive=color;}/**
           * @method getEmissiveColor
           * @return {Color}
           */},{key:'getEmissiveColor',value:function getEmissiveColor(){return this._material.emissive;}/**
           * @method setShading
           * @param {String} shading one of "smooth", "flat"
           */},{key:'setShading',value:function setShading(shading){this._material.shading=shading==='smooth'?THREE.SmoothShading:THREE.FlatShading;this._material.needsUpdate=true;}/**
           * @method setSpecularColor
           * @param {Color} color
           */},{key:'setSpecularColor',value:function setSpecularColor(color){this._material.specular=color;}/**
           * @method getSpecularColor
           * @return {Color}
           */},{key:'getSpecularColor',value:function getSpecularColor(){return this._material.specular;}//cf http://blog.cjgammon.com/threejs-custom-shader-material
//cf https://threejs.org/docs/index.html#Reference/Materials/ShaderMaterial
/**
           * @method setProperty
           * @param {String} name
           * @param {Object} value (depending on the property)
           */},{key:'setProperty',value:function setProperty(name,val){this._material.uniforms[name].value=val;}/**
           * @method setProperty
           * @param {String} name
           * @return {Object} value (depending on the property)
           */},{key:'getProperty',value:function getProperty(name){return this._material.uniforms[name].value;}},{key:'setBlending',value:function setBlending(blending){this._material.blending=blending;}/**
           * @method erase
           */},{key:'erase',value:function erase(){if(this._material.map){this._material.map.dispose();}this._material.dispose();}}]);return Material;}();var _createClass$16=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$21(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
  * Log a message into the console or redirect it to the provided label if Mobilizing.debug === true
  * @static
  * @method Log
  * @param {String} message
  * @param {String} type
  * @param {Label} label
  */var _debugEnabled=window.location.search.search('[?&]debug(=([^&#]*)|&|#|$)')>-1;var Debug=function(){function Debug(label){_classCallCheck$21(this,Debug);this.label=label;}_createClass$16(Debug,[{key:'log',value:function log(){if(this.doLog()){console.log.apply(console,arguments);}}},{key:'warn',value:function warn(){if(this.doLog()){console.warn.apply(console,arguments);}}},{key:'info',value:function info(){if(this.doLog()){console.info.apply(console,arguments);}}},{key:'error',value:function error(){if(this.doLog()){console.error.apply(console,arguments);}}},{key:'doLog',value:function doLog(){return this.label||_debugEnabled;}}]);return Debug;}();var debug=new Debug();var _createClass$15=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$20(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Camera=function(){/**
       * Camera class. Must be created by the user so that the current scene can be seen.
       * If no camera is added to the scene, rendering is not done (nothing is seen, so nothing is rendered).
       *
       * A Camera contains a transform object to be moved and rotated in space.
       * Viewport can be defined by the user to create multicam rendering.
       *
       * @class Camera
       * @constructor
       * @param {Object} params an object containing all the possible parameters for this class. Use it like in the following example. Possible parameters are lisited below.
       * @example
       *     //this is how to use a parameters object in order to instanciate a Mobilizing.js object
       *     var mobilizingObject = new Mobilizing.Class({paramName1: value, paramName2: value});
       *
       * @param {Context} [params.context] mobilizing context to use
       * @param {String} [params.type="perspective"] One of "perspective", "ortho" or "cube"
       * @param {Number} [params.fov] vertical field of view
       * @param {Number} [params.cubeResolution=1024] if the type is "cube", defines the size of the cubemap, must be a power of 2
       * @param {Number} [params.near=1] near plane
       * @param {Number} [params.far=5000] far plane
       * @param {Rect} [params.viewport=Rect(0,0,1,1)] the Rect defining the viewport in normalize % (0 ~ 1), that is the portion of the rendering canvas to be used as a rendering surface for this camera
       * @param {Context} [params.layer] the layer in which to render the camera, that is the scene it is
       * @param {Vector3} [params.position] the position where to create the camera in space
       * @default Vector(0,0,0)
       * @param {Number} [params.verticalshift=0] vertical lens shift in %
       * @param {Number} [params.horizontalshift=0] horizontal lens shift in %
       * @param {Boolean} [params.autorender=true] Should the camera automatically renders itself or not
       * @param {Boolean} [params.autoclear=true] Should the camera automatically clears itself or not
       * @param {Boolean} [params.autoupdatematrix=true] Should the camera transformation matrix automatically updates itself or not
      */function Camera(params){_classCallCheck$20(this,Camera);this.context=getOrDefault(params,'context',null);this.type=getOrDefault(params,'type','perspective');this.fov=getOrDefault(params,'fov',35);this.cubeResolution=getOrDefault(params,'cubeResolution',1024);this.near=getOrDefault(params,'near',0.1);this.far=getOrDefault(params,'far',5000);var position=getOrDefault(params,'position',undefined);if(this.type==='perspective'){if(this.context){var canvasSize=this.context.getCanvasSize();debug.log('camera canvasSize',canvasSize);this._camera=new THREE.PerspectiveCamera(this.fov,canvasSize.width/canvasSize.height,this.near,this.far);}else{this._camera=new THREE.PerspectiveCamera(this.fov,window.innerWidth/window.innerHeight,this.near,this.far);}debug.log('made perspective cam');}else if(this.type==='ortho'){if(this.context){var _canvasSize=this.context.getCanvasSize();this._camera=new THREE.OrthographicCamera(_canvasSize.width/-2,_canvasSize.width/2,_canvasSize.height/2,_canvasSize.height/-2,this.near,this.far);}else{this._camera=new THREE.OrthographicCamera(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2,this.near,this.far);}this._camera.position.z=400;//default
debug.log('made ortho cam');}else if(this.type==='cube'){this._camera=new THREE.CubeCamera(0.5,1000,this.cubeResolution);debug.log('made cube cam');}this.transform=new Transform(this/*._camera*/);if(position!==undefined){this.transform.setLocalPosition(position);}this.viewport=getOrCreate(params,'viewport',Rect,0,0,1,1);this.layer=getOrDefault(params,'layer','default');this.verticalshift=getOrDefault(params,'verticalshift',0);this.horizontalshift=getOrDefault(params,'horizontalshift',0);this.autorender=getOrDefault(params,'autorender',true);this.autoclear=getOrDefault(params,'autoclear',true);this.autoupdatematrix=getOrDefault(params,'autoupdatematrix',false);/**
           @property dirty
           @type Boolean flag to know if something has changed
           @default true
           */this.dirty=false;}/**
       Set the RenderTexture to render on. By default, the camera renders on the Context canvas.
        @method setRenderTexture
       @param {RenderTexture} renderTexture Mobilizing.RenderTexture object
       */_createClass$15(Camera,[{key:'setRenderTexture',value:function setRenderTexture(renderTexture){this.renderTexture=renderTexture;}/**
           * set the vertical field of view in degrees
           *
           * @method setFOV
           * @param fov {Number} default to 35 degree
           */},{key:'setFOV',value:function setFOV(fov){this.fov=fov;if(this.type==='perspective'){this._camera.fov=this.fov;this.updateProjectionMatrix();}}/**
           * get the vertical field of view in degrees
           *
           * @method getFOV returns the value
           * @return {Number} Field Of View value
           */},{key:'getFOV',value:function getFOV(){return this.fov;}/**
           Set the clear color, which is the color used to paint the backgroud.
           Note: this is camera independant, each cam on the scene can have a different
           clear color, or a different background color.
            @method setClearColor
           @param {Color} Color Mobilizing.Color object
           */},{key:'setClearColor',value:function setClearColor(color){this.clearColor=color;}/**
           Gets the clear color, which is the color used to paint the backgroud.
           Note: this is camera independant, each cam on the scene can have a different
           clear color, or a different background color.
            @method getClearColor
           @return {Color} Color object associated to this clearColor
           */},{key:'getClearColor',value:function getClearColor(){return this.clearColor;}/**
           Set the autorender flag, which means that the camera will render itself automatically.
           @method setAutorender
           @param {Bool} b flag true/false
           */},{key:'setAutorender',value:function setAutorender(b){this.autorender=b;}/**
          Makes the cam "looks at" the argements coordinates. Handy way to orient the cam
          or to make it follow an object in space.
           @method lookAt
          @param {Object} Vector3 the coordinates to look at.
          */},{key:'lookAt',value:function lookAt(vec){//this.camera.up = new Vector3(0,1,0);
this._camera.lookAt(vec);//this.camera.updateProjectionMatrix();
}/**
          Sets the aspect ratio of the camera view
           @method setAspect
          @param {Number} the ratio (ex. 4/3)
          */},{key:'setAspect',value:function setAspect(ratio){this._camera.aspect=ratio;this.updateProjectionMatrix();}/**
           Sets the vertical shift ratio of the camera view
            @method setVerticalShift
           @param {Number} the ratio (1 -> 100%)
           */},{key:'setVerticalShift',value:function setVerticalShift(ratio){this.verticalshift=ratio;this.updateProjectionMatrix();}/**
           Sets the horizontal shift ratio of the camera view
            @method setVerticalShift
           @param {Number} the ratio (1 -> 100%)
           */},{key:'setHorizontalShift',value:function setHorizontalShift(ratio){this.horizontalshift=ratio;this.updateProjectionMatrix();}},{key:'updateProjectionMatrix',value:function updateProjectionMatrix(){//FIXME : this call does an updateProjectionMatrix internally :
var w=1;var h=1/this._camera.aspect;if(this.type!=='cube'){if(this.type!=='ortho'){this._camera.setViewOffset(w,h,w*this.horizontalshift,h*this.verticalshift,w,h);}if(this.autoupdatematrix){this._camera.updateProjectionMatrix();}}}/**
          gets the aspect ratio of the camera view
           @method getAspect
          @return {Number} cam aspect value
          */},{key:'getAspect',value:function getAspect(){return this._camera.aspect;}},{key:'setOrthoPlanes',/**
          Method to recompute the frame of ortho cam. Is used internally for window resizing.
           @method setOrthoPlanes
          @param {Number} left
          @param {Number} right
          @param {Number} top
          @param {Number} bottom
          */value:function setOrthoPlanes(left,right,top,bottom){if(this.type==='ortho'){this._camera.left=left;this._camera.right=right;this._camera.top=top;this._camera.bottom=bottom;}else{console.warn("setOrthoBounds() can't be used on perspective cams!");}}/**
          Zoom is for ortho cam and mimics the Z translation of perspective cams.
          This is expressed like a scale, zoom = 2 will double, .5 make it half.
           @method setZoom
          @param {Number} zoom value
          */},{key:'setZoom',value:function setZoom(val){if(this.type==='ortho'){this._camera.zoom=val;}else{console.warn("setZoom() can't be used on perspective cams!");}}/**
          Gets current zoom value.
           @method getZoom
          @return {Number} zoom value
          */},{key:'getZoom',value:function getZoom(){if(this.type==='ortho'){return this._camera.zoom;}console.warn("getZoom() can't be used on perspective cams!");return null;}},{key:'setFarPlane',/**
          Sets cam far plane
           @method setFarPlane
          @param {Number} far plane value
          */value:function setFarPlane(far){if(this.type!=='cube'){this._camera.far=far;this.updateProjectionMatrix();}else if(this.type==='cube'){this._camera.children.forEach(function(cam){cam.far=far;cam.updateProjectionMatrix();});}}/**
          Gets cam far plane
           @method getFarPlane
          @return {Number} far plane value
          */},{key:'getFarPlane',value:function getFarPlane(){return this._camera.far;}},{key:'setNearPlane',/**
          Sets cam near plane
           @method setNearPlane
          @param {Number} near plane value
          */value:function setNearPlane(near){if(this.type!=='cube'){this._camera.near=near;this.updateProjectionMatrix();}else if(this.type==='cube'){this._camera.children.forEach(function(cam){cam.near=near;cam.updateProjectionMatrix();});}}/**
          Gets cam near plane
           @method getNearPlane
          @return {Number} far plane value
          */},{key:'getNearPlane',value:function getNearPlane(){return this._camera.near;}},{key:'setPlanes',/**
          Sets cam far and near planes
           @method setPlanes
          @param {Number} near near plane value
          @param {Number} far far plane value
          */value:function setPlanes(near,far){this._camera.far=far;this._camera.near=near;this.updateProjectionMatrix();}/**
          Tries to adjust the cam z distance so that 1 world unit == 1 screen pixel.
          Useful to make object move at the mouse or touch position x and y.
          For perspective cam only.
           @method setToPixel
          */},{key:'setToPixel',value:function setToPixel(){if(this.type==='perspective'){var newPos=void 0;if(this.context){var canvasSize=this.context.getCanvasSize();newPos=new Vector3$1(canvasSize.width/2,-canvasSize.height/2,1/(2*Math.tan(_Math.degToRad(this.fov/2.0)/canvasSize.height)));}else{newPos=new Vector3$1(window.innerWidth/2,-window.innerHeight/2,1/(2*Math.tan(_Math.degToRad(this.fov/2.0)/window.innerHeight)));}this.transform.setLocalPosition(newPos);}else{console.error('only perspective camera can be setted to screen pixel z position');}}},{key:'perspectiveOffCenter',value:function perspectiveOffCenter(left,right,bottom,top,near,far){var x=2.0*near/(right-left);var y=2.0*near/(top-bottom);var a=(right+left)/(right-left);var b=(top+bottom)/(top-bottom);var c=-(far+near)/(far-near);var d=-(2.0*far*near)/(far-near);var e=-1.0;var m=this._camera.projectionMatrix;m.set(x,0,a,0,0,y,b,0,0,0,c,d,0,0,e,0);/*
              m.elements[0] = x;
              m.elements[1] = 0;
              m.elements[2] = a;
              m.elements[3] = 0;
              m.elements[4] = 0;
              m.elements[5] = y;
              m.elements[6] = b;
              m.elements[7] = 0;
              m.elements[8] = 0;
              m.elements[9] = 0;
              m.elements[10] = c;
              m.elements[11] = d;
              m.elements[12] = 0;
              m.elements[13] = 0;
              m.elements[14] = e;
              m.elements[15] = 0;
              *//*
              m[0, 0] = x;
              m[0, 1] = 0;
              m[0, 2] = a;
              m[0, 3] = 0;
              m[1, 0] = 0;
              m[1, 1] = y;
              m[1, 2] = b;
              m[1, 3] = 0;
              m[2, 0] = 0;
              m[2, 1] = 0;
              m[2, 2] = c;
              m[2, 3] = d;
              m[3, 0] = 0;
              m[3, 1] = 0;
              m[3, 2] = e;
              m[3, 3] = 0;
              */}},{key:'aspect',set:function set(ratio){this.setAspect(ratio);},get:function get(){return this.getAspect();}},{key:'zoom',set:function set(val){this.setZoom(val);},get:function get(){return this.getZoom();}},{key:'farPlane',set:function set(val){this.setFarPlane(val);},get:function get(){return this.setFarPlane;}},{key:'nearPlane',set:function set(val){this.setNearPlane(val);},get:function get(){return this.getNearPlane();}}]);return Camera;}();var _createClass$17=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$22(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Light=function(){/**
       * Light will enable object to be seen in space. Camera and Light are requiered for a basic scene.
       *
       * @class Light
       * @constructor
       * @param {Object} params parameters object
       * @param {String} [params.type:"point"] one of "point", "directional", "ambient", "spot"
       * @param {Number} [params.intensity=1]
       * @param {Number} [params.distance=1000] distance is taken in account only for point lights
       * @param {Color} [params.color=Color.white]
       */function Light(params){_classCallCheck$22(this,Light);this.type=getOrDefault(params,'type','point');switch(this.type){case'point':this.light=new THREE.PointLight(0xffffff);this.light.distance=1000;break;case'directional':this.light=new THREE.DirectionalLight(0xffffff);this.light.position.set(1,1,1).normalize();break;case'ambient':this.light=new THREE.AmbientLight(0x404040);// soft white light
this.light.position.set(1,1,1).normalize();break;case'spot':this.light=new THREE.SpotLight(0xffffff);//this.light.position.set(1, 1, 1).normalize();
this.target=new THREE.Object3D();this.light.target=this.target;break;default:this.light=new THREE.PointLight(0xffffff);this.type='point';}this.light.intensity=getOrDefault(params,'intensity',1);this.light.distance=getOrDefault(params,'distance',5000);this.light.color=getOrDefault(params,'color',Color$1.white);this.transform=new Transform(this/*.light*/);}/**
      * Sets the light's intensity
      * @method setIntensity
      * @param {Object} val
      */_createClass$17(Light,[{key:'setIntensity',value:function setIntensity(val){this.light.intensity=val;}/**
          * Gets the light's intensity
          * @method getIntensity
          * @param {Object} val
          */},{key:'getIntensity',value:function getIntensity(){return this.light.intensity;}/**
          * Sets the light's distance factor
          * @method setDistance
          * @param {Number} val
          */},{key:'setDistance',value:function setDistance(val){if(this.type==='point'||this.type==='spot'){this.light.distance=val;}}/**
          * Gets the light's distance factor
          * @method getDistance
          * @return {Number} the light distance factor
          */},{key:'getDistance',value:function getDistance(){return this.light.distance;}/**
           * setColor
           * @method setColor
           * @param {Color} color
           */},{key:'setColor',value:function setColor(color){this.light.color=color;}/**
           * getColor
           * @method getColor
           * @return {Color} color
           */},{key:'getColor',value:function getColor(){return this.light.color;//TODO : return a Mobilizing object, not a Three one
}/**
           * Maximum extent of the spotlight, in radians, from its direction. Should be no more than Math.PI/2. The default is Math.PI/3.
           * @method setAngle
           * @param {Number} angle the spot angle
           */},{key:'setAngle',value:function setAngle(val){if(this.type==='spot'){this.light.angle=val;}}/**
           * getAngle
           * @method getAngle
           * @return {Number} the angle
           */},{key:'getAngle',value:function getAngle(){return this.light.angle;}/**
          * Position in space to where the spot light points
          * @method setTargetPosition
          * @param {Object} x
          * @param {Object} y
          * @param {Object} z
          */},{key:'setTargetPosition',value:function setTargetPosition(arg1,arg2,arg3){if(this.type==='spot'){if(arg1 instanceof Vector3$1){this.target.position.set(arg1.x,arg1.y,arg1.z);this.target.updateMatrixWorld();}else{this.target.position.set(arg1,arg2,arg3);this.target.updateMatrixWorld();}}}/**
          * Smoothness of the spot impact shape (makes the light circle blurry)
          * @method setPenumbra
          * @param {Object} val between 0 and 1
          */},{key:'setPenumbra',value:function setPenumbra(val){this.light.penumbra=val;}/**
           * setCastShadow
           * @method setCastShadow
           * @param {Boolean} enabled
           */},{key:'setCastShadow',value:function setCastShadow(enabled){this.light.castShadow=enabled;}/**
           * set the Shadow map Size
           * @method setShadowSize
           * @param {Number} width
           * @param {Number} height
           */},{key:'setShadowSize',value:function setShadowSize(width,height){this.light.shadow.mapSize.width=width;//shadow map size
this.light.shadow.mapSize.height=height;//shadow map size
}/**
           * setShadowDistance
           * @method setShadowDistance
           * @param {Number} near min shadow distance
           * @param {Number} far max shadow distance
           */},{key:'setShadowDistance',value:function setShadowDistance(near,far){this.light.shadow.camera.near=near;//min shadow distance
this.light.shadow.camera.far=far;//max shadow distance
}}]);return Light;}();var _createClass$19=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$24(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Texture$1=function(){/**
       * Texture are bitmap pictures loaded in the graphic card memory so they can be mapped on a geometry surface. Usually, texture are mapped through a Material. Keep in mind that WebGL, as an impletation of OpenGL, shares the same kind of limitations : textures sources should be power of 2 (even if here, Three.js is doing the job of resizing for you if they're not).
       * Constants list for possible texture's mapping mode :
       *
       * Texture.UVMapping
       * Texture.CubeReflectionMapping
       * Texture.CubeRefractionMapping
       * Texture.EquirectangularReflectionMapping
       * Texture.EquirectangularRefractionMapping
       * Texture.SphericalReflectionMapping
       * Texture.CubeUVReflectionMapping
       * Texture.CubeUVRefractionMapping
       *
       * @class Texture
       * @constructor
       * @param {Object} params
       * @param {Context} params.image the Image object.
       * @param {String} params.canvas the canvas object url.
       */function Texture$$1(params){_classCallCheck$24(this,Texture$$1);// this._texture;
this._image=getOrDefault(params,'image',undefined);this._canvas=getOrDefault(params,'canvas',undefined);if(this._image){this.fromImage(this._image);}else if(this._canvas){this.fromCanvas(this._canvas);}}/**
      * Create the texture from an image file
      *
      * @method fromImage
      * @param {Image} image tells if the loader should force the main process to wait for the end of
      */_createClass$19(Texture$$1,[{key:'fromImage',value:function fromImage(image){this._texture=new THREE.Texture(image);this._texture.needsUpdate=true;this.width=image.width;this.height=image.height;}/**
           * Create the texture from a Canvas DOM element (can be Mobilizing itself -> when we'll can catch a WebGL canvas pixels...)
           *
           * @method fromCanvas
           * @param {canvas} canvas canvas
           */},{key:'fromCanvas',value:function fromCanvas(canvas){var _this=this;this._texture=new THREE.Texture(canvas);this._texture.needsUpdate=true;this._texture.magFilter=THREE.LinearFilter;//this._texture.minFilter = THREE.LinearMipMapLinearFilter;
this._texture.minFilter=THREE.LinearFilter;this.width=this._texture.image.width;this.height=this._texture.image.height;//custom events management, used internally to autamatically refresh texture after drawn
if(canvas.events){canvas.events.on('drawn',function(){_this.setNeedsUpdate(true);});}}/**
          * Clears the underlying Three.js texture object
          * @method dispose
          */},{key:'dispose',value:function dispose(){this._texture.dispose();}/**
          * Define the repetition factor of this texture. If the value is > 1, then the texture will be mapped twice on the surface and so on. NB: usage of this method automatically sets the wrapS and wrapT properties to RepeatWrapping
          *
          * @method setRepeat
          * @param {float} u the new u texture coordinate repetition to use
          * @param {float} v the new u texture coordinate repetition to use
          */},{key:'setRepeat',value:function setRepeat(u,v){if(this._texture&&this._texture!==undefined){this._texture.repeat.set(u,v);this._texture.wrapS=THREE.RepeatWrapping;this._texture.wrapT=THREE.RepeatWrapping;}}/**
          * How much a single repetition of the texture is offset from the beginning, in each direction U and V. Typical range is 0.0 to 1.0.
          *
          * @method undefined
          * @param {Numbe} val offset between 0.0 to 1.0
          */},{key:'setOffset',value:function setOffset(val){this._texture.offset=val;}//TODO : setter and getter for Three.js texture props mapping
/**
          * Set this to true to trigger an update next time the texture is used. Particularly important for setting the wrap mode.
          *
          * @method setNeedsUpdate
          * @param {Boolean} val
          */},{key:'setNeedsUpdate',value:function setNeedsUpdate(){this._texture.needsUpdate=true;}/**
          * False by default, which is the norm for PNG images. Set to true if the RGB values have been stored premultiplied by alpha.
          *
          * @method setPremultiplyAlpha
          * @param {Boolean} val
          */},{key:'setPremultiplyAlpha',value:function setPremultiplyAlpha(val){this._texture.premultiplyAlpha=val;}/**
          * How the image is applied to the object. An object type of Texture.UVMapping is the default, where the U,V coordinates are used to apply the map.
          *
          * @property setMapping
          * @param {Number} mapping
          */},{key:'setMapping',value:function setMapping(mapping){this._texture.mapping=mapping;}}]);return Texture$$1;}();Texture$1.UVMapping=THREE.UVMapping;Texture$1.CubeReflectionMapping=THREE.CubeReflectionMapping;Texture$1.CubeRefractionMapping=THREE.CubeRefractionMapping;Texture$1.EquirectangularReflectionMapping=THREE.EquirectangularReflectionMapping;Texture$1.EquirectangularRefractionMapping=THREE.EquirectangularRefractionMapping;Texture$1.SphericalReflectionMapping=THREE.SphericalReflectionMapping;Texture$1.CubeUVReflectionMapping=THREE.CubeUVReflectionMapping;Texture$1.CubeUVRefractionMapping=THREE.CubeUVRefractionMapping;var _createClass$18=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$23(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$12(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$12(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Label=function(_Base){_inherits$12(Label,_Base);/*
      * Label class
      * A Label is a textured, quad shaped object to be used in Graphical User Interfaces.
      * A Label can contains a background (color or existing picture) and/or a prerendered text.
      *
      * @class Label
      * @constructor
      * @param {Object} params Config parameters
      * @param {String} params.text the String to display
      * @param {Font} params.font font Mobilizing.Font object
      * @param {Number} [params.fontSize = 72] fontSize font size
      * @param {Number} [params.lineMaxCharCount = 40] lineMaxCharCount the maximum number of characters a line should count
      * @param {Color} [params.color = Color.white] color the text color
      * @param {Color} params.backgroundColor backgroundColor backgroundColor of the text
      * @param {Texture} params.texture texture the texture to use fo this label (will cancel the text setting, only the texture will be rendered)
      * @param {Number} [params.width = 100] width of the label
      * @param {Number} [params.height = 100] height of the label
      *
      * @example
      *    //TODO
      */function Label(params){_classCallCheck$23(this,Label);var _this/*.mesh*/=_possibleConstructorReturn$12(this,(Label.__proto__||Object.getPrototypeOf(Label)).call(this,params));_this.setName(getOrDefault(params,'name',undefined));_this.font=getOrDefault(params,'font',null);//TODO default font!
_this.material=getOrDefault(params,'material','basic');_this._text=getOrDefault(params,'text','');_this._lineMaxCharCount=getOrDefault(params,'lineMaxCharCount',40);_this.style={};// new Style();
_this._width=getOrDefault(params,'width',100);_this._height=getOrDefault(params,'height',100);_this.style.color=getOrDefault(params,'color',Color$1.white);_this.style.fontSize=getOrDefault(params,'fontSize',72);_this.style.textAlign=getOrDefault(params,'textAlign','center');/*this._geometry = new THREE.PlaneBufferGeometry(1,1);
          this.mesh = new THREE.Mesh( this._geometry, this.material._material );*/_this.mesh=new Mesh$1({primitive:'plane',width:1,height:1,material:_this.material});if(params.backgroundColor!==undefined){_this.style.hasBackground=true;_this.style.backgroundColor=params.backgroundColor;}else{_this.style.hasBackground=false;}_this.transform=new Transform(_this);_this.transform.setLocalScale(_this._width,_this._height);_this.needsComputeTextSize=true;//What's this ?
_this.precLine=getOrDefault(params,'precLine','');// ajout ST
_this._textSize=0;//will be computed on render
if(params.texture!==undefined){_this.material.setTexture(params.texture);_this.transform.setLocalScale(params.width,params.height,1);}else{_this.render();}return _this;}/**
      * set the width of this label.  Will be used by render()
      * @method setWidth
      * @param {Number} val the new width
      */_createClass$18(Label,[{key:'setWidth',value:function setWidth(val){this._width=val;}/**
          * set the height of this label.  Will be used by render()
          * @method setHeight
          * @param {Number} val the new height
          */},{key:'setHeight',value:function setHeight(val){this._height=val;}/**
          * set the Label background texture.
          * @method setBackgroundTexture
          * @param {Object} texture Texture to set as the Label background.
          */},{key:'setBackgroundTexture',value:function setBackgroundTexture(texture){this.style.backgroundTexture=texture;}/**
          * set the Label text content.
          * @method setText
          * @param {String} val text to be used as the Label content.
          */},{key:'setText',value:function setText(val){this._text=val;this.render();}/**
          * @deprecated
          * @method setNeedsComputeTextSize
          * @param {Object} val
          */},{key:'setNeedsComputeTextSize',value:function setNeedsComputeTextSize(val){this.needsComputeTextSize=val;}/**
          * Set the current Label underlying canvas to use this color for the shadowblur effect
          * @method setShadowColor
          * @param {Color} color Mobilizing.Color object
          */},{key:'setShadowColor',value:function setShadowColor(color){this.shadowColor='rgba('+color.r+','+color.g+','+color.b+',1)';}/**
          * Description for undefined
          * @method setShadowBlur
          * @param {Number} val
          */},{key:'setShadowBlur',value:function setShadowBlur(val){this.shadowBlur=val;}/**
          * Renders the label once all the setting are done. Should be called by the user when label properties are modified
          * @method render
          */},{key:'render',value:function render(){var _this2=this;//debug.log("render label");
if(this._text===undefined){this._text='';}if(this._canvas===undefined){this._canvas=document.createElement('canvas');this._canvas.retinaResolutionEnabled=false;//to disable Retina canvas in Ejecta
//document.body.appendChild(this._canvas);
}if(this._width>2048){this._width=2048;}if(this._height>2048){this._height=2048;}this._canvas.width=this._width;this._canvas.height=this._height;//this.transform.setLocalScale(this._width,this._height);
var context=this._canvas.getContext('2d');context.fillStyle=this.style.backgroundColor.makeRGBAStringWithAlpha(this.style.backgroundColorAlpha);context.shadowColor=this.shadowColor;context.shadowBlur=this.shadowBlur;if(this.style.backgroundTexture!==undefined){//debug.log(this.style.backgroundTexture);
context.drawImage(this.style.backgroundTexture.texture.image,0,0,this._width,this._height);}else if(this.style.hasBackground){context.fillRect(0,0,this._canvas.width,this._canvas.height);}else{context.clearRect(0,0,this._canvas.width,this._canvas.height);}if(this.font!==undefined&&this.font!==null){debug.log('render label with font',this.font);var finaltext='';//this._text;
//var words = this._text.split(" ");
//césure automatique
// var l = 0;
//var lastcesure = 0;
var word='';// var ll = 0;
// var first = true;
var SpaceLeft=this._lineMaxCharCount;for(var j=0;j<this._text.length;++j){var c=this._text[j];if(c==='\n'||c===' '){if(word.length+1>SpaceLeft){//debug.log("overflow detected, adding backslash then " + word);
//debug.log("BACKSLASH " + word);
finaltext+='\n';finaltext+=word+' ';SpaceLeft=this._lineMaxCharCount-(word.length+1);//word = "";
if(c==='\n'){finaltext+='\n';SpaceLeft=this._lineMaxCharCount;}}else if(c==='\n'){//debug.log("BACKSLASH detected, adding " + word + " then backslash");
finaltext+=word;//debug.log(word + " BACKSLASH");
finaltext+='\n';SpaceLeft=this._lineMaxCharCount;//word = "";
}else{//debug.log("common case, adding " + word + " then space");
finaltext+=word+' ';SpaceLeft=SpaceLeft-(word.length+1);//word = "";
}word='';}else//lettre normale
{word+=c;}}if(word.length+1>SpaceLeft){//debug.log("BACKSLASH " + word);
finaltext+='\n';}finaltext+=word;//last word
var strings=finaltext.split('\n');var x=0;var y=0;var path=void 0;if(strings.length===0){strings.push(finaltext);// ajout sylvie
this.lastLine=finaltext;}else{this.lastLine=strings[strings.length-1];}this.nbLines=strings.length;strings.forEach(function(s,k){//debug.log(s);
if(_this2.needsComputeTextSize){_this2._textSize=_this2.font.getTextSize(s,_this2.style.fontSize);if(_this2.style.textAlign==='center'){x=_this2._width/2-_this2._textSize.width/2;}else if(_this2.style.textAlign==='end'||_this2.style.textAlign==='right'){x=_this2._width-_this2._textSize.width;}else if(_this2.style.textAlign==='left'||_this2.style.textAlign==='start'){// ajout sylvie
if(k===0){//console.log(this.precLine)
x=_this2.font.getTextSize(_this2.precLine,_this2.style.fontSize).width+_this2.style.textHorizontalMargin;//x = 0 + this.style.textHorizontalMargin;
}else{x=0+_this2.style.textHorizontalMargin;}}var offset=0;if(_this2.style.textVerticalAlign==='center'){if(strings.length>1){offset=k-(strings.length-1)/2;}y=_this2._height/2+_this2._textSize.height/2+offset*_this2.style.fontSize;}else if(_this2.style.textVerticalAlign==='top'){offset=k;y=_this2.style.fontSize+offset*_this2.style.fontSize+_this2.style.textVerticalMargin;}else if(_this2.style.textVerticalAlign==='bottom'){//TO DO !!!!
offset=k;y=offset*_this2.style.fontSize;}//position du curseur
_this2.cursorx=x+_this2._textSize.width;_this2.cursory=y;//+this._textSize.height/2;
}path=_this2.font.getFont().getPath(s,x,y,_this2.style.fontSize);//context.globalAlpha = this.style.colorAlpha;
path.fill='#'+_this2.style.color.getHexString();path.draw(context);});}if(!this._texture){this._texture=new Texture$1({canvas:this._canvas});}else{this._texture.dispose();}this._texture.fromCanvas(this._canvas);this.mesh.material.setTexture(this._texture);}/**
          Creates a text Label.
          @method createTextLabel
          @static
          @deprecated
          @param {String} text text to render on the Label.
          @param {Object} font Font object.
          @param {Number} fontSize The font Size (in pixels).
          @param {String} align the text alignment ("center", "end", "left", "right", "start").
          @param {Number} width Label width in pixels.
          @param {Number} height Label height in pixels.
          @param {Color} color the Label text color.
          @param {Color} backgroundColor the background color.
          @param {Texture} texture the background Texture.
           */},{key:'createTextLabel',value:function createTextLabel(text,font,fontSize,align,width,height,color,backgroundColor,texture){var labelTest=new Label(text,font,width,height);labelTest.style.fontSize=fontSize;labelTest.style.color=color;if(backgroundColor!==undefined){labelTest.style.hasBackground=true;labelTest.style.backgroundColor=backgroundColor;}else{labelTest.style.hasBackground=false;}labelTest.style.textAlign=align;//"center|end|left|right|start"
if(texture!==undefined){labelTest.material.setTexture(texture);labelTest.transform.setLocalScale(width,height,1);}else{labelTest.render();}return labelTest;}}]);return Label;}(Base);var _createClass$14=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$19(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Transform=function(){/**
       Transform class is meant to be aggregated to any object that needs to be transformed in space.
       {{#crossLink "Mesh"}}{{/crossLink}}, {{#crossLink "Light"}}{{/crossLink}} or {{#crossLink "Camera"}}{{/crossLink}} contains a transform instance.
        @class Transform
       @constructor
       @uses {Math}
      */function Transform(obj){_classCallCheck$19(this,Transform);this.mobObject=obj;//used in children array to avoid confusion between three and mob objects
if(obj instanceof Mesh$1){this.entity=obj.mesh;}else if(obj instanceof Camera){this.entity=obj._camera;}else if(obj instanceof Light){this.entity=obj.light;}else if(obj instanceof Label){this.entity=obj.mesh.mesh;}this.children=[];}/**
      * Geneates a transform to point at a certain coordinates, makes the object "look at" this point.
      * @method lookAt
      * @param {Vector} vector
      */_createClass$14(Transform,[{key:'lookAt',value:function lookAt(vector){this.entity.lookAt(vector);}/**
          Set the object rotation with a quarternion {x,y,z,w}.
           @method setLocalQuaternion
          @param {Quaternion} quarternion The quaternion to apply
          */},{key:'setLocalQuaternion',value:function setLocalQuaternion(q){if(q instanceof Quaternion$1){this.entity.quaternion.set(q.x,q.y,q.z,q.w);}}/**
          Get the object rotation as a quarternion.
           @method getLocalQuaternion
          @return {Quaternion} quarternion
          */},{key:'getLocalQuaternion',value:function getLocalQuaternion(){var temp=new Quaternion$1(this.entity.quaternion.x,this.entity.quaternion.y,this.entity.quaternion.z,this.entity.quaternion.w);return temp;}},{key:'setLocalMatrix',value:function setLocalMatrix(m){this.entity.matrixAutoUpdate=false;var mat=new Matrix4$1().multiplyMatrices(this.entity.matrix,m);this.entity.applyMatrix(mat);this.entity.updateMatrix();}//not documented - use setRotation
},{key:'setLocalEulerAngles',value:function setLocalEulerAngles(arg1,arg2,arg3){if(arguments.length===3)//x,y,z float
{this.entity.rotation.x=_Math.degToRad(arg1);this.entity.rotation.y=_Math.degToRad(arg2);this.entity.rotation.z=_Math.degToRad(arg3);}else if(arguments.length===2){if(typeof arg1==='number'&&typeof arg2==='number'){this.entity.rotation.x=_Math.degToRad(arg1);this.entity.rotation.y=_Math.degToRad(arg2);}}else if(arguments.length===1)//direct vector or single float
{if(arg1 instanceof Vector3$1){this.entity.rotation.x=_Math.degToRad(arg1.x);this.entity.rotation.y=_Math.degToRad(arg1.y);this.entity.rotation.z=_Math.degToRad(arg1.z);}if(arg1 instanceof Vector2$1){this.entity.rotation.x=_Math.degToRad(arg1.x);this.entity.rotation.y=_Math.degToRad(arg1.y);}else if(typeof arg1==='number'){this.entity.rotation.z=_Math.degToRad(arg1);}}}//not documented - use getRotation
},{key:'getLocalEulerAngles',value:function getLocalEulerAngles(){return new Vector3$1(_Math.radToDeg(this.entity.rotation.x)%360,_Math.radToDeg(this.entity.rotation.y)%360,_Math.radToDeg(this.entity.rotation.z)%360);}/**
           Set the euler angles rotation in degrees.
          Polymorphic : can take various agruments of various types. Possible arguments number is 1, 2 or 3.
            @method setLocalRotation
           @param {float|Vector3|Vector2} number|Vector3|Vector2 Value for the new rotation of the transform. If a Vector3 is given, its x, y, z will be used for the rotation x, y, z. If a Vector2 is given, its x, y will be used for the rotation x and y, but z will be unchanged. If a number is given, it will be the position x.
          @param {float} Number Value for the new y rotation of the transform.
          @param {float} Number Value for the new z rotation of the transform.
           */},{key:'setLocalRotation',value:function setLocalRotation(){this.setLocalEulerAngles.apply(this,arguments);}/**
          * Sets this transform's x rotation
          *
          * @method setLocalRotationX
          * @param {Number} arg
          */},{key:'setLocalRotationX',value:function setLocalRotationX(arg){if(typeof arg==='number'){this.entity.rotation.x=_Math.degToRad(arg);}}/**
          * Sets this transform's y rotation
          *
          * @method setLocalRotationY
          * @param {Number} arg
          */},{key:'setLocalRotationY',value:function setLocalRotationY(arg){if(typeof arg==='number'){this.entity.rotation.y=_Math.degToRad(arg);}}/**
          * Sets this transform's z rotation
          *
          * @method setLocalRotationZ
          * @param {Number} arg
          */},{key:'setLocalRotationZ',value:function setLocalRotationZ(arg){if(typeof arg==='number'){this.entity.rotation.z=_Math.degToRad(arg);}}/**
           * Get the current local rotation of this transform
           *
           * @method getLocalRotation
           * @return {Vector3} localRotation vector
          */},{key:'getLocalRotation',value:function getLocalRotation(){return this.getLocalEulerAngles();}/**
           * Get the current x local rotation of this transform
           *
           * @method getLocalRotationX
           * @return {Number} localRotation x value
          */},{key:'getLocalRotationX',value:function getLocalRotationX(){return this.getLocalEulerAngles().x;}/**
           * Get the current y local rotation of this transform
           *
           * @method getLocalRotationY
           * @return {Number} localRotation y value
          */},{key:'getLocalRotationY',value:function getLocalRotationY(){return this.getLocalEulerAngles().y;}/**
           * Get the current z local rotation of this transform
           *
           * @method getLocalRotationZ
           * @return {Number} localRotation z value
          */},{key:'getLocalRotationZ',value:function getLocalRotationZ(){return this.getLocalEulerAngles().z;}/**
           Set the local position of the transform (and to the object attach to it).
           Polymorphic : can take various agruments of various types. Possible arguments number is 1, 2 or 3.
            @method setLocalPosition
           @param {float|Vector3|Vector2} number|Vector3|Vector2 Value for the new position of the transform. If a Vector3 is given, its x, y, z will be used for the position x, y, z. If a Vector2 is given, its x, y will be used for the position x and y, but z will be unchanged. If a number is given, it will be the position x.
          @param {float} Number Value for the new y position of the transform.
          @param {float} Number Value for the new z position of the transform.
           */},{key:'setLocalPosition',value:function setLocalPosition(arg1,arg2,arg3){if(arguments.length===3){//x,y,z float
this.entity.position.x=arg1;this.entity.position.y=arg2;this.entity.position.z=arg3;}else if(arguments.length===2){if(typeof arg1==='number'&&typeof arg2==='number'){this.entity.position.x=arg1;this.entity.position.y=arg2;}}else if(arguments.length===1){//direct vector
if(arg1 instanceof Vector3$1){this.entity.position.x=arg1.x;this.entity.position.y=arg1.y;this.entity.position.z=arg1.z;}else if(arg1 instanceof Vector2$1){this.entity.position.x=arg1.x;this.entity.position.y=arg1.y;}else if(typeof arg1==='number'){this.entity.position.x=arg1;this.entity.position.y=arg1;this.entity.position.z=arg1;}}}/**
          * Sets this transform's x position
          *
          * @method setLocalPositionX
          * @param {Number} arg
          */},{key:'setLocalPositionX',value:function setLocalPositionX(arg){if(typeof arg==='number'){this.entity.position.x=arg;}}/**
          * Sets this transform's y position
          *
          * @method setLocalPositionY
          * @param {Number} arg
          */},{key:'setLocalPositionY',value:function setLocalPositionY(arg){if(typeof arg==='number'){this.entity.position.y=arg;}}/**
          * Sets this transform's z position
          *
          * @method setLocalPositionZ
          * @param {Number} arg
          */},{key:'setLocalPositionZ',value:function setLocalPositionZ(arg){if(typeof arg==='number'){this.entity.position.z=arg;}}/**
          Gets the local position of this transform
           @method getLocalPosition
          @return {Vector3} localPosition vector
          */},{key:'getLocalPosition',value:function getLocalPosition(){var tempVec=new Vector3$1(this.entity.position.x,this.entity.position.y,this.entity.position.z);return tempVec;}/**
          Gets the local x position of this transform
           @method getLocalPositionX
          @return {Number} localPosition x
          */},{key:'getLocalPositionX',value:function getLocalPositionX(){var tempVec=this.entity.position.x;return tempVec;}/**
          Gets the local x position of this transform
           @method getLocalPositionY
          @return {Number} localPosition y
          */},{key:'getLocalPositionY',value:function getLocalPositionY(){var tempVec=this.entity.position.y;return tempVec;}/**
          Gets the local z position of this transform
           @method getLocalPositionZ
          @return {Number} localPosition z
          */},{key:'getLocalPositionZ',value:function getLocalPositionZ(){var tempVec=this.entity.position.z;return tempVec;}/**
           @method getWorldPosition
          @return {Vector3} worlPosition vector of the object
          */},{key:'getWorldPosition',value:function getWorldPosition(){var vector=new Vector3$1();vector.setFromMatrixPosition(this.entity.matrixWorld);return vector;}/**
          Set the scale of the transform.
          Polymorphic : can take various agruments of various types. Possible arguments number is 1, 2 or 3.
           @method setLocalScale
          @param {float|Vector3|Vector2} number|Vector3|Vector2 Value for the new scale. If a Vector3 is given, its x, y, z will be used for the scale x, y, z. If a Vector2 is given, its x, y will be used for the scale x and y, but z will be 1. If a number is given, it will be the scale x.
          @param {float} Number Value for the new y scale.
          @param {float} Number Value for the new z scale.
          */},{key:'setLocalScale',value:function setLocalScale(arg1,arg2,arg3){if(arguments.length===3){this.entity.scale.x=arg1;this.entity.scale.y=arg2;this.entity.scale.z=arg3;}else if(arguments.length===2){if(typeof arg1==='number'&&typeof arg2==='number'){this.entity.scale.x=arg1;this.entity.scale.y=arg2;}}else if(arguments.length===1){if(arg1 instanceof Vector3$1){this.entity.scale.x=arg1.x;this.entity.scale.y=arg1.y;this.entity.scale.z=arg1.z;}else if(arg1 instanceof Vector2$1){this.entity.scale.x=arg1.x;this.entity.scale.y=arg1.y;}else if(typeof arg1==='number'){this.entity.scale.x=arg1;this.entity.scale.y=arg1;this.entity.scale.z=arg1;}}}/**
          * Sets this transform's x scale
          *
          * @method setLocalScaleX
          * @param {Number} arg
          */},{key:'setLocalScaleX',value:function setLocalScaleX(arg){if(typeof arg==='number'){this.entity.scale.x=arg;}}/**
          * Sets this transform's y scale
          *
          * @method setLocalScaleY
          * @param {Number} arg
          */},{key:'setLocalScaleY',value:function setLocalScaleY(arg){if(typeof arg==='number'){this.entity.scale.y=arg;}}/**
          * Sets this transform's z scale
          *
          * @method setLocalScaleZ
          * @param {Number} arg
          */},{key:'setLocalScaleZ',value:function setLocalScaleZ(arg){if(typeof arg==='number'){this.entity.scale.z=arg;}}/**
           @method getLocalScale
          @return {Vector3} localScale vector
          */},{key:'getLocalScale',value:function getLocalScale(){var temp=new Vector3$1(this.entity.scale.x,this.entity.scale.y,this.entity.scale.z);return temp;}/**
          @method getLocalScaleX
          @return {Number} localScale x
          */},{key:'getLocalScaleX',value:function getLocalScaleX(){var temp=this.entity.scale.x;return temp;}/**
          @method getLocalScaleY
          @return {Number} localScale y
          */},{key:'getLocalScaleY',value:function getLocalScaleY(){var temp=this.entity.scale.y;return temp;}/**
          @method getLocalScaleZ
          @return {Number} localScale z
          */},{key:'getLocalScaleZ',value:function getLocalScaleZ(){var temp=this.entity.scale.z;return temp;}/**
           * Perform a RayCast picking
           *
           * @method pick
           * @param {Camera} cam The camera to use as a ray caster.
           * @param {number} x The x coordinate in screen space for the ray casting
           * @param {number} y The y coordinate in screen space for the ray casting
           * @return {Object} if picking success, gives an object as {point:{x,y,z}, uv:{u,v}, distance:dist}, null otherwise.
           */},{key:'pick',value:function pick(cam,x,y){var targetList=[];targetList.push(this.entity);//FIXME : will bug with non fullscreen configuration!!!
//IDEA : use the context referenced in the cam to grab the canvas!
var nx=0;var ny=0;if(cam.context){var canvas=cam.context.getCanvasSize();nx=x/canvas.width*2-1;ny=-(y/canvas.height)*2+1;}else{nx=x/window.innerWidth*2-1;ny=-(y/window.innerHeight)*2+1;}// create a Ray with origin at the mouse position
//and direction into the scene (camera direction)
var raycaster=new THREE.Raycaster();// create once
var vector=new THREE.Vector3(nx,ny,1);var camera=cam.transform.entity;raycaster.setFromCamera(vector,camera);var intersects=raycaster.intersectObjects([this.entity]);//debug.log("intersects",nx,ny, intersects);
// if there is one (or more) intersections
if(intersects.length>0){var temp={};temp.point=intersects[0].point;temp.uv=intersects[0].uv;temp.distance=intersects[0].distance;return temp;}// there are no intersections
return null;}/**
          * Return a Vector2 giving the screen coordinates of the object
          * @method getScreenCoordinates
          * @param {Context} context the current Mobilizing context
          * @param {Camera} camera the Camera to use for the projection
          * @return {Vector2} the screen coordinates of the object
          */},{key:'getScreenCoordinates',value:function getScreenCoordinates(context,camera){if(camera.type==='perspective'){var vector=new Vector3$1();// TODO: need to update this when resize window
var widthHalf=0.5*context.getCanvasSize().width*camera.viewport.width;var heightHalf=0.5*context.getCanvasSize().height*camera.viewport.height;this.entity.updateMatrixWorld();vector.setFromMatrixPosition(this.entity.matrixWorld);vector.project(camera.camera);vector.x=vector.x*widthHalf+widthHalf;vector.y=-(vector.y*heightHalf)+heightHalf;return{x:vector.x,y:vector.y};}return null;}/**
          * Adds a child to this transform (argument must be a transform too)
          *
          * @method addChild
          * @param {Transform} child
          */},{key:'addChild',value:function addChild(child){this.children.push(child.mobObject);this.entity.add(child.entity);}/**
          * Removes a child from the children chain
          *
          * @method removeChild
          * @param {Object} child
          */},{key:'removeChild',value:function removeChild(child){this.children.splice(this.children.indexOf(child),1);this.entity.remove(child.entity);}/**
          * Gets an array containning all the children objects of this transform
          *
          * @method getChildren
          * @return {Array}
          */},{key:'getChildren',value:function getChildren(){return this.children;}/**
          * Gets one of all the children objects of this transform
          *
          * @method getChild
          * @param {Number} index Index of the child to get
          * @return {Object}
          */},{key:'getChild',value:function getChild(index){return this.children[index];}/**
          * Sets the render order of this object. The sortObjects of the renderer should be true for this property to have any effect.
          *
          * @method setRenderOrder
          */},{key:'setRenderOrder',value:function setRenderOrder(val){this.entity.renderOrder=val;}/*====================
          * deprecated methods!
          * ====================*///what to do here ? Let it in tranform and Mesh or choose one of them ?
},{key:'setVisible',value:function setVisible(visible){this.entity.visible=visible;}},{key:'getVisible',value:function getVisible(){return this.entity.visible;}}]);return Transform;}();var _createClass$12=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _possibleConstructorReturn$11(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$11(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck$17(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
   A Mesh is the aggregation of a geomtery, made of vertices (Vector3 Array), texture coordinates (or uv, Vector2 Array), vertexColor (Color Array) and various methods to create and modify 3D objects that have a material (see {{#crossLink "Material"}}{{/crossLink}}) and a transform (see {{#crossLink "Transform"}}{{/crossLink}}).

  Primitive types are documented in their respective private construction methods :
  <ul>
  <li>plane : a 4 points defined rectangular plane, see <a href="#method_constructPlane">constructPlane</a></li>
  <li>quad  : a 4 points defined quadrilateral shape, see <a href="#method_constructQuad">constructQuad</a></li>
  <li>box : a 6 faces defined 3D box with width, height and depth, see <a href="#method_constructBox">constructBox</a></li>
  <li>cube : a 3D cube, see <a href="#method_constructCube">constructCube</a></li>
  <li>sphere : a 3D sphere, see <a href="#method_constructSphere">constructSphere</a></li>
  <li>circle : a flat circle, see <a href="#method_constructCircle">constructCircle</a></li>
  <li>cylinder : a 3D cylinder, see <a href="#method_constructCylinder">constructCylinder</a></li>
  <li>icosahedron : a 3D icosahedron, see <a href="#method_constructIcosahedron">constructIcosahedron</a></li>
  <li>octahedron : a 3D octahedron, see <a href="#method_constructOctahedron">constructOctahedron</a></li>
  <li>text : a 3D text extruded frome a typeface, see <a href="#method_constructText">constructText</a></li>
  <li>node : a 3D node, to create parent/child hierarchy structure, see <a href="#method_constructNode">constructNode</a></li>
  <li>line : a 2 points defined line, see <a href="#method_constructLine">constructLine</a></li>
  <li>sprite : a billboard textured plane, see <a href="#method_constructSprite">constructSprite</a></li>
  <li>arc : a flat coordinates generated arc, see <a href="#method_constructArc">constructArc</a></li>
  </u>

    @class Mesh
   */var Mesh$1=function(){/**
      * @class Mesh
      * @constructor
      *
      * @param {Object} params parameters object
      *    @example
      *     function script()
      *     {
      *         var M;
      *         var R;
      *
      *         var camera;
      *         var light;
      *         var light2;
      *
      *         var circle1;
      *         var circle2;
      *
      *         this.setup = function()
      *         {
      *
      *             M = this.getContext();
      *
      *             R = new Mobilizing.Renderer3D();
      *             M.addComponent(R);
      *
      *             var camera = new Mobilizing.Camera();
      *             camera.setFarPlane(100000);
      *             R.addCamera(camera);
      *
      *             light = new Mobilizing.Light();
      *             light.setIntensity(1.2);
      *             light.transform.setLocalPosition(20,20,100);
      *             R.addToCurrentScene(light);
      *
      *             light2 = new Mobilizing.Light();
      *             light2.transform.setLocalPosition(-20,-20,-10);
      *             R.addToCurrentScene(light2);
      *
      *             circle1 = new Mobilizing.Mesh({primitive:"circle"});
      *             circle1.transform.setLocalPosition(-2,0,-15);
      *             R.addToCurrentScene(circle1);
      *
      *             circle2 = new Mobilizing.Mesh({primitive:"circle",
      *                                            radius:2,
      *                                            segments:20,
      *                                            thetaStart:Math.PI/8,
      *                                            thetaLength:Math.PI,
      *                                            material:"lambert"});
      *             circle2.material.setWireframe(true);
      *             circle2.transform.setLocalPosition(2,0,-15);
      *             R.addToCurrentScene(circle2);
      *             console.log(circle2);
      *         };
      *
      *         var r = 0;
      *         this.update = function()
      *         {
      *             r++;
      *             circle2.transform.setLocalRotation(-33,r,33);
      *         };
      *     };
      *
      * @param {String} params.primitive The name of the primitive to create, can be one of the listed names in this class description.
      * @param {String} [params.material="phong"] The name of the material to attach to the created primitive, can be one of : lambert, basic, phong.
      * @param {Object} [params.geometry=undefined] An already existing geometry
      */function Mesh$$1(params){_classCallCheck$17(this,Mesh$$1);this.primitive=getOrDefault(params,'primitive','box');this.name=getOrDefault(params,'name',undefined);this.material=getOrDefault(params,'material','phong');this._geometry=getOrDefault(params,'geometry',undefined);this.visible=true;//construct a geometry according to the argument
switch(this.primitive){case'plane':this.constructPlane(params);break;case'quad':this.constructQuad(params);break;case'box':this.constructBox(params);break;case'cube':this.constructCube(params);break;case'sphere':this.constructSphere(params);break;case'circle':this.constructCircle(params);break;case'cylinder':this.constructCylinder(params);break;case'icosahedron':this.constructIcosahedron(params);break;case'octahedron':this.constructOctahedron(params);break;case'text':this.constructText(params);break;case'node':this.constructNode();break;case'line':this.constructLine(params);break;case'sprite':this.constructSprite();break;case'arc':this.constructArc(params);break;case'custom':this.constructCustom(params);break;default:this.constructNode();break;}//agglomerate a transform object
if(!this.transform){this.transform=new Transform(this);}}/**
      * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
      *
      * A node is an empty 3D object. It has no geometry, but has a tansform, therefore it can be used to create the root element for grouping objects. In Mobilizing, transforms represents a kind of invisible coordinate axis that can be tansformed in space. We use it to construct parent/child relationships, like in `object.transform.addChild(otherObject.transform)`
      *
      * @method constructNode
      */_createClass$12(Mesh$$1,[{key:'constructNode',value:function constructNode(){this.mesh=new THREE.Object3D();}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructLine
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.point1=Vector3(0, -1, 0)] 1st point 3D coordinates
          * @param {Number} [params.point2=Vector3(0, 1, 0)] 2nd point 3D coordinates
          */},{key:'constructLine',value:function constructLine(params){//line have special material so we must manage it specifically
this._geometry=new THREE.Geometry();this._geometry.dynamic=true;var point1=getOrDefault(params,'point1',new Vector3$1(0,-1,0));var point2=getOrDefault(params,'point2',new Vector3$1(0,1,0));console.log(point1,point2);this._geometry.vertices.push(point1,point2);this.material=new Material({type:'line'});this.mesh=new THREE.Line(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructSprite
          */},{key:'constructSprite',value:function constructSprite(){this.material=new Material({type:'sprite'});this.mesh=new THREE.Sprite(this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructPlane
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.width=1] the plane width in world unit
          * @param {Number} [params.height=1] the plane height in world unit
          * @param {Number} [params.segments=1] tesselation size for all sides
          * @param {Number} [params.widthSegments=1] horizontal tesselation size, overrides segments parameters for this side
          * @param {Number} [params.heightSegments=1] vertical tesselation size, overrides segments parameters for this side
          */},{key:'constructPlane',value:function constructPlane(params){//width height widthSegments heightSegments
var width=getOrDefault(params,'width',1);var height=getOrDefault(params,'height',1);var segments=getOrDefault(params,'segments',1);var widthSegments=getOrDefault(params,'widthSegments',segments);var heightSegments=getOrDefault(params,'heightSegments',segments);this._geometry=new THREE.PlaneBufferGeometry(width,height,widthSegments,heightSegments);//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructQuad
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.point1=Vector2(-1,  1)] upper left point
          * @param {Number} [params.point2=Vector2( 1,  1)] upper right point
          * @param {Number} [params.point3=Vector2( 1, -1)] lower right point
          * @param {Number} [params.point4=Vector2(-1, -1)] lower left point
          */},{key:'constructQuad',value:function constructQuad(params){var point1=getOrDefault(params,'point1',new Vector2$1(-1,1));var point2=getOrDefault(params,'point2',new Vector2$1(1,1));var point3=getOrDefault(params,'point3',new Vector2$1(1,-1));var point4=getOrDefault(params,'point4',new Vector2$1(-1,-1));var rectShape=new THREE.Shape();rectShape.moveTo(point1.x,point1.y);rectShape.lineTo(point2.x,point2.y);rectShape.lineTo(point3.x,point3.y);rectShape.lineTo(point4.x,point4.y);rectShape.lineTo(point1.x,point1.y);this._geometry=new THREE.ShapeGeometry(rectShape);//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructCube
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.size=1] the cube dimensions in world unit
          * @param {Number} [params.segments=1] tesselation size for all sides
          * @param {Number} [params.widthSegments=1] horizontal tesselation size, overrides segments parameters for this side
          * @param {Number} [params.heightSegments=1] vertical tesselation size, overrides segments parameters for this side
          * @param {Number} [params.depthSegments=1] depth tesselation size, overrides segments parameters for this side
          */},{key:'constructCube',value:function constructCube(params){var size=getOrDefault(params,'size',1);var segments=getOrDefault(params,'segments',1);var widthSegments=getOrDefault(params,'widthSegments',segments);var heightSegments=getOrDefault(params,'heightSegments',segments);var depthSegments=getOrDefault(params,'depthSegments',segments);this._geometry=new THREE.BoxGeometry(size,size,size,widthSegments,heightSegments,depthSegments);//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructBox
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.width=1] the box width in world unit
          * @param {Number} [params.height=1] the box height in world unit
          * @param {Number} [params.depth=1] the box depth in world unit
          * @param {Number} [params.segments=1] tesselation size for all sides
          * @param {Number} [params.widthSegments=1] horizontal tesselation size, overrides segments parameters for this side
          * @param {Number} [params.heightSegments=1] vertical tesselation size, overrides segments parameters for this side
          * @param {Number} [params.depthSegments=1] depth tesselation size, overrides segments parameters for this side
          */},{key:'constructBox',value:function constructBox(params){//width height depth widthSegments heightSegments depthSegments
var width=getOrDefault(params,'width',1);var height=getOrDefault(params,'height',1);var depth=getOrDefault(params,'depth',1);// var segments = getOrDefault(params, "segments", 1);
var widthSegments=getOrDefault(params,'widthSegments',1);var heightSegments=getOrDefault(params,'heightSegments',1);var depthSegments=getOrDefault(params,'depthSegments',1);this._geometry=new THREE.BoxGeometry(width,height,depth,widthSegments,heightSegments,depthSegments);//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructSphere
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.radius=1] the sphere radius in world unit
          * @param {Number} [params.segments=8] tesselation size for all axis
          * @param {Number} [params.widthSegments=8] horizontal tesselation size
          * @param {Number} [params.heightSegments=8] vertical tesselation size
          * @param {Number} [params.phiStart=0] horizontal angle start of the sphere
          * @param {Number} [params.phiLength=Math.PI*2] horizontal length of the sphere
          * @param {Number} [params.thetaStart=0] vertical angle start of the sphere
          * @param {Number} [params.thetaLength=Math.PI] vertical length of the sphere
          */},{key:'constructSphere',value:function constructSphere(params){//radius widthSegments heightSegments phiStart phiLength thetaStart thetaLength
var radius=getOrDefault(params,'radius',1);var segments=getOrDefault(params,'segments',8);var widthSegments=getOrDefault(params,'widthSegments',segments);var heightSegments=getOrDefault(params,'heightSegments',segments);var phiStart=getOrDefault(params,'phiStart',0);var phiLength=getOrDefault(params,'phiLength',Math.PI*2);var thetaStart=getOrDefault(params,'thetaStart',0);var thetaLength=getOrDefault(params,'thetaLength',Math.PI);this._geometry=new THREE.SphereGeometry(radius,widthSegments,heightSegments,phiStart,phiLength,thetaStart,thetaLength);this._geometry.dynamic=true;//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructCircle
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.radius=1] the circle radius in world unit
          * @param {Number} [params.segments=32] horizontal tesselation size
          * @param {Number} [params.thetaStart=0] vertical angle start of the circle
          * @param {Number} [params.thetaLength=Math.PI] vertical length of the circle
          */},{key:'constructCircle',value:function constructCircle(params){//radius segments thetaStart thetaLength
var radius=getOrDefault(params,'radius',1);var segments=getOrDefault(params,'segments',32);var thetaStart=getOrDefault(params,'thetaStart',0);var thetaLength=getOrDefault(params,'thetaLength',Math.PI*2);this._geometry=new THREE.CircleGeometry(radius,segments,thetaStart,thetaLength);//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructCylinder
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.radiusTop=1] the cylinder top radius in world unit
          * @param {Number} [params.radiusBottom=1] the cylinder bottom radius in world unit
          * @param {Number} [params.height=1] the cylinder height in world unit
          * @param {Number} [params.radiusSegments=32] horizontal tesselation size
          * @param {Number} [params.heightSegments=1] vertical tesselation size
          * @param {Number} [params.openEnded=false] close the ends of the shape or not
          * @param {Number} [params.thetaStart=0] vertical angle start of the cylinder
          * @param {Number} [params.thetaLength=Math.PI] vertical length of the cylinder
          */},{key:'constructCylinder',value:function constructCylinder(params){//radiusTop radiusBottom height radiusSegments heightSegments openEnded thetaStart thetaLength
var radiusTop=getOrDefault(params,'radiusTop',1);var radiusBottom=getOrDefault(params,'radiusBottom',1);var height=getOrDefault(params,'height',1);var radiusSegments=getOrDefault(params,'radiusSegments',32);var heightSegments=getOrDefault(params,'heightSegments',1);var openEnded=getOrDefault(params,'openEnded',false);var thetaStart=getOrDefault(params,'thetaStart',0);var thetaLength=getOrDefault(params,'thetaLength',Math.PI*2);this._geometry=new THREE.CylinderGeometry(radiusTop,radiusBottom,height,radiusSegments,heightSegments,openEnded,thetaStart,thetaLength);//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructIcosahedron
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.radius=1] the icosahedron radius in world unit
          * @param {Number} [params.detail=0] the icosahedron number of points (tesselation and "roundness")
          */},{key:'constructIcosahedron',value:function constructIcosahedron(params){//radius detail
var radius=getOrDefault(params,'radius',1);var detail=getOrDefault(params,'detail',0);this._geometry=new THREE.IcosahedronGeometry(radius,detail);this._geometry.dynamic=true;//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructOctahedron
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.radius=1] the octahedron radius in world unit
          * @param {Number} [params.detail=0] the octahedron number of points (tesselation and "roundness")
          */},{key:'constructOctahedron',value:function constructOctahedron(params){var radius=getOrDefault(params,'radius',1);var detail=getOrDefault(params,'detail',0);this._geometry=new THREE.OctahedronGeometry(radius,detail);this._geometry.dynamic=true;//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * 3D Text is created from a typeface represented in JSON, please use <a href="http://gero3.github.io/facetype.js/">facetype.js</a> to generate a JSON from a font file. The generated JSON must be loader with a Loader.load.JSON() method and passed to the constructor.
          *
          * @method constructText
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.text="text"] the text string
          * @param {Number} [params.fontSize=1] the text font height
          * @param {Number} [params.height=1] the glyph extrusion height (or visually speaking, depth). 0 to have flat letters.
          * @param {Number} [params.segments=5] the text details and tesselation
          * @param {Number} params.font the text font to use. Must be a json generated from facetype.js
          */},{key:'constructText',value:function constructText(params){//FIXME : il faut utiliser un loader pour charger le json de la typo produit par typeface.js
var text=getOrDefault(params,'text','text');var fontSize=getOrDefault(params,'fontSize',1);var height=getOrDefault(params,'height',1);var segments=getOrDefault(params,'segments',5);var font=getOrDefault(params,'font',undefined);var threeFont=new THREE.Font(font);this._geometry=new THREE.TextGeometry(text,{size:fontSize,height:height,curveSegments:segments,font:threeFont,weight:'normal',style:'normal',bevelEnabled:false});this._geometry.center();//manage the material according to the passed params, see the attachMaterial method below
this.attachMaterial(this.material);this.mesh=new THREE.Mesh(this._geometry,this.material._material);}/**
          * Geometry and resulting mesh method, you should not use directly this method as it is used internally by the constructor. This documentation only aims to help you identify the possibles parameters for a particular shape.
          *
          * @method constructArc
          * @param {Object} params Parameters object, given by the constructor.
          * @param {Number} [params.radius=1] the arc radius in world unit
          * @param {Number} [params.width=0.2] the arc width (or weight, distance between the exterior segments and the center) in world unit
          * @param {Number} [params.segments=32] the segments number (detail level)
          * @param {Number} [params.startAngle=0] 0 and Math.PI*2 are at 3 o'clock, value is counter clock-wise
          * @param {Number} [params.endAngle=Math.PI*2] 0 and Math.PI*2 are at 3 o'clock, value is counter clock-wise
          * @param {Color} [params.color=Color.white]
          * @param {Number} [params.center=Vector3.zero]
          */},{key:'constructArc',value:function constructArc(params){this._geometry=new THREE.Geometry();this._geometry.dynamic=true;var radius=getOrDefault(params,'radius',1);var width=getOrDefault(params,'width',0.2);var segments=getOrDefault(params,'segments',32);var startAngle=getOrDefault(params,'startAngle',0);var endAngle=getOrDefault(params,'endAngle',Math.PI*2);var color=getOrDefault(params,'color',Color$1.white.clone());var texture=params.texture;var uvScale=params.uvScale;var center=getOrDefault(params,'center',Vector3$1.zero.clone());this.createArc({center:center,radius:radius,segments:segments,startAngle:startAngle,endAngle:endAngle,color:color,texture:texture,width:width,uvScale:uvScale});}/**
           * Construct an empty and unfinished Mesh for which a geometry must be constructed. Once filled with vertices, constructMesh method must be called, or a method generating a complete Mesh must be used (i.e generateFillMesh)
           *
           * @method constructCustom
           * @param {Object} params Parameters object, given by the constructor.
           */},{key:'constructCustom',value:function constructCustom(params){this._geometry=getOrDefault(params,'geometry',new THREE.Geometry());this._geometry.dynamic=true;}/*
           * =====
           * Mesh generation from vertices defining segments made shapes
           * =====
           *//**
          * Generate the mesh for the given vertices and generates flat uvs for it. Usefull for 2D shapes
          * @method generateFillMesh
          */},{key:'generateFillMesh',value:function generateFillMesh(vertices){//main shape to hold paths
var shape=new THREE.Shape();//draw shape
shape.moveTo(vertices[0].x,vertices[0].y);for(var i=1;i<vertices.length;i++){shape.lineTo(vertices[i].x,vertices[i].y);}shape.closePath();//make a geometry from the shape
var geometry=new THREE.ShapeGeometry(shape);//construct the Mob Mesh
this._geometry=geometry;this.constructMesh();//generate flat uvs
this.generateFlatUVs();}/**
          * Generate the flat uvs for this mesh.
          * @method generateFlatUVs
          */},{key:'generateFlatUVs',value:function generateFlatUVs(){var geometry=this._geometry;var uvs=[];var bounds=this.getBoundingBox();for(var i=0;i<geometry.faces.length;i++){var face=geometry.faces[i];uvs[i]=[new Vector2$1(_Math.map(geometry.vertices[face.a].x,bounds.min.x,bounds.max.x,0,1),_Math.map(geometry.vertices[face.a].y,bounds.min.y,bounds.max.y,0,1)),new Vector2$1(_Math.map(geometry.vertices[face.b].x,bounds.min.x,bounds.max.x,0,1),_Math.map(geometry.vertices[face.b].y,bounds.min.y,bounds.max.y,0,1)),new Vector2$1(_Math.map(geometry.vertices[face.c].x,bounds.min.x,bounds.max.x,0,1),_Math.map(geometry.vertices[face.c].y,bounds.min.y,bounds.max.y,0,1))];}this.setUVs(0,uvs);}/**
          * Static Utils to generate the stroke for the given vertices with the given stroke width
          * @static
          * @method generateStrokeShape
          * @param {Mesh} mesh to use as a base to get vertices
          * @param {Number} inflateValue stroke width
          * @return (Shape) a Three.js Shape to make a geometry from
          */},{key:'updateStroke',/**
          * Utils to regenerate the stroke Mesh when already existing
          * @method updateStrokeMesh
          * @param {Number} inflateValue stroke width
          */value:function updateStroke(mesh,inflateValue){var shape=Mesh$$1.generateStrokeShape(mesh,inflateValue);var geometry=new THREE.ShapeGeometry(shape);this.setVertices(geometry.vertices);this.updateMesh();}/**
          * Static Utils to generate the stroke Mesh from a given shape
          * @static
          * @method generateStrokeMeshFromShape
          * @param {Shape} shape
          * @return {Mesh} the resulting Mesh
          */},{key:'getBoundingBox',/*
           * =====
           * Boundings management
           * =====
           *//**
          * Compute and returns the bounding box of the current geometry  or Node, which is an object made of 2 Vector3.
          *
          * @method getBoundingBox
          * @return {Object} boundingBox object {min: new Vector3, max: new Vector3}
          */value:function getBoundingBox(){if(this._geometry){if(!this._geometry.boundingBox){this._geometry.computeBoundingBox();}return this._geometry.boundingBox;}//no geometry, let three do the math
return new THREE.Box3().setFromObject(this.mesh);}/**
          * Compute and returns the bounding sphere of the current geometry or Node, which is an object with a radius :
          *
          * @method getBoundingSphere
          * @return {Object} boundingSphere object {radius: number}
          */},{key:'getBoundingSphere',value:function getBoundingSphere(){if(this._geometry){if(!this._geometry.boundingSphere){this._geometry.computeBoundingSphere();}return this._geometry.boundingSphere;}//no geometry, let three do the math
var bbox=new THREE.Box3().setFromObject(this.mesh);return bbox.getBoundingSphere();}/*setIndex(val){
              this.index = val;
          }*///============
// 2D Geometry creation
//============
},{key:'createLine',value:function createLine(start,end,color,texture,width,uvScale){var right=Vector3$1.zero;var dir=Vector3$1.zero;dir.subVectors(end,start);if(uvScale===undefined){uvScale=dir.length();}dir.normalize();right.crossVectors(dir,new Vector3$1(0,0,1));//right vector
right.x*=width;right.y*=width;right.z*=width;var p1=new Vector3$1(start.x-right.x,start.y-right.y,start.z-right.z);var p2=new Vector3$1(start.x+right.x,start.y+right.y,start.z+right.z);var p3=new Vector3$1(end.x+right.x,end.y+right.y,end.z+right.z);var p4=new Vector3$1(end.x-right.x,end.y-right.y,end.z-right.z);this.transform.setLocalPosition(Vector3$1.zero.clone());var uv1=new THREE.Vector2(0,uvScale);var uv2=new THREE.Vector2(1,uvScale);var uv3=new THREE.Vector2(1,0);var uv4=new THREE.Vector2(0,0);this.pushQuad(p1,p2,p3,p4,uv1,uv2,uv3,uv4);this.material.setColor(color);this.material.setWireframe(false);}/**
          * createCircle
          * @method createCircle
          * @param {Number} center
          * @param {Number} radius
          * @param {Number} segments
          * @param {Color} color
          * @param {Texture} texture
          * @param {Number} width
          * @param {Number} uvScale
          */},{key:'createCircle',value:function createCircle(params){var center=getOrDefault(params,'center',new Vector3$1(0,0,0));var radius=getOrDefault(params,'radius',1);var segments=getOrDefault(params,'segments',32);// let color  = getOrDefault(params, "color",);
// let width  = getOrDefault(params, "width",);
// let uvScale  = getOrDefault(params, "uvScale", 1);
this.createArc({center:center,radius:radius,segments:segments,startAngle:0,endAngle:2*Math.PI,color:Color$1.white.clone(),width:1,uvScale:1});}/**
          * createArc
          * @method createArc
          * @param {Number} center
          * @param {Number} radius
          * @param {Number} segments
          * @param {Number} startAngle
          * @param {Number} endAngle
          * @param {Color} color
          * @param {Texture} texture
          * @param {Number} width
          * @param {Number} uvScale
          */},{key:'createArc',value:function createArc(params){var center=getOrDefault(params,'center',new Vector3$1(0,0,0));var radius=getOrDefault(params,'radius',1);var segments=getOrDefault(params,'segments',32);var startAngle=getOrDefault(params,'startAngle',0);var endAngle=getOrDefault(params,'endAngle',Math.PI*2);var color=getOrDefault(params,'color',Color$1.white.clone());var width=getOrDefault(params,'width',1);var uvScale=getOrDefault(params,'uvScale',1);if(uvScale===undefined){uvScale=radius*(endAngle-startAngle)*1;//uvScale = Math.floor(uvScale); //(do we want a round count of uv ?)
}var innerpoints=[];var outerpoints=[];var interval=Math.PI*2/segments;var starta=startAngle;var enda=endAngle;var a=0;for(a=starta;a<=enda;a+=interval){innerpoints.push(new Vector3$1(Math.cos(a)*(radius-width/2),Math.sin(a)*(radius-width/2),0));outerpoints.push(new Vector3$1(Math.cos(a)*(radius+width/2),Math.sin(a)*(radius+width/2),0));}//on termine l'arc si on n'était pas sur un multiple
if(a!==enda){innerpoints.push(new Vector3$1(Math.cos(endAngle)*(radius-width/2),Math.sin(endAngle)*(radius-width/2),0));outerpoints.push(new Vector3$1(Math.cos(endAngle)*(radius+width/2),Math.sin(endAngle)*(radius+width/2),0));}for(var k=0;k<innerpoints.length-1;++k){var p1=outerpoints[k];var p2=innerpoints[k];var p3=innerpoints[(k+1)%innerpoints.length];var p4=outerpoints[(k+1)%innerpoints.length];var uv1=new Vector2$1(0,(k+0)*uvScale/(innerpoints.length-1));var uv2=new Vector2$1(1,(k+0)*uvScale/(innerpoints.length-1));var uv3=new Vector2$1(1,(k+1)*uvScale/(innerpoints.length-1));var uv4=new Vector2$1(0,(k+1)*uvScale/(innerpoints.length-1));this.pushQuad(p1,p2,p3,p4,uv1,uv2,uv3,uv4);}this.material=new Material({type:'basic'});//basic
this.material.setColor(color);this.mesh=new THREE.Mesh(this._geometry,this.material._material);this.transform=new Transform(this);this.transform.setLocalPosition(center);}/**
          * createDisc
          * @method createDisc
          * @param {Number} center
          * @param {Number} radius
          * @param {Number} segments
          * @param {Color} color
          * @param {Texture} texture
          */},{key:'createDisc',value:function createDisc(center,radius,segments,color,texture){this.createDiscSector(center,radius,segments,0,2*Math.PI,color,texture);}/**
          * createDiscSector
          * @method undefined
          * @param {Number} center
          * @param {Number} radius
          * @param {Number} segments
          * @param {Number} startAngle
          * @param {Number} endAngle
          * @param {Color} color
          * @param {Texture} texture
          */},{key:'createDiscSector',value:function createDiscSector(params){var center=getOrDefault(params,'center',new Vector3$1(0,0,0));var radius=getOrDefault(params,'radius',1);var segments=getOrDefault(params,'segments',32);var startAngle=getOrDefault(params,'startAngle',0);var endAngle=getOrDefault(params,'endAngle',Math.PI*2);// let color = getOrDefault(params,"color", Color.white.clone());
var points=[];var interval=Math.PI*2/segments;var starta=startAngle;var enda=endAngle;var a=0;for(a=starta;a<=enda;a+=interval){points.push(new Vector3$1(Math.cos(a)*radius,Math.sin(a)*radius,0));}//on termine si on n'était pas sur un multiple
if(a!==enda){points.push(new Vector3$1(Math.cos(endAngle)*radius,Math.sin(endAngle)*radius,0));}var p1=new Vector3$1(0,0,0);//local center
for(var k=0;k<points.length-1;++k){var p2=points[k];var p3=points[k+1];//FIXME : à calculer plus finement, quel mode de projection on applique ?
this.pushTriangle(p1,p2,p3);var uv1=new Vector2$1(0,0);var uv2=new Vector2$1(1,0);var uv3=new Vector2$1(1,1);this.pushUV(uv1,uv2,uv3);}this.material=new Material({type:'basic'});//basic
//this.material.setColor(color);
this.mesh=new THREE.Mesh(this._geometry,this.material._material);this.transform=new Transform(this);this.transform.setLocalPosition(center);}/**
          * Call this method to construct a custom mesh
          * @method constructMesh
          */},{key:'constructMesh',value:function constructMesh(){this.material=new Material({type:'basic'});//basic
this.mesh=new THREE.Mesh(this._geometry,this.material._material);this.transform=new Transform(this);this._geometry.computeBoundingBox();}//================
// VERTEX MANAGEMENT
//================
/**
          Adds a vertex to the current geometry
           @method pushVertex
          @param {Vector3} v vertex to add
          */},{key:'pushVertex',value:function pushVertex(v){this._geometry.vertices.push(v);this._geometry.verticesNeedUpdate=true;}/**
          Adds a face to the current geometry
           @method pushFace
          @param {Integer} i1 Face Index to add
          @param {Integer} i2 Face Index to add
          @param {Integer} i3 Face Index to add
          */},{key:'pushFace',value:function pushFace(i1,i2,i3){var face=new THREE.Face3(i1,i2,i3);this._geometry.faces.push(face);this._geometry.elementsNeedUpdate=true;return face;}/**
          Adds a UV to the current geometry
           @method pushUV
          @param {Vector2} uv1 uv coordinates to add
          @param {Vector2} uv2 uv coordinates to add
          @param {Vector2} uv3 uv coordinates to add
          */},{key:'pushUV',value:function pushUV(uv1,uv2,uv3){this._geometry.faceVertexUvs[0].push([uv1,uv2,uv3]);this._geometry.uvsNeedUpdate=true;this._geometry.elementsNeedUpdate=true;}/**
          Adds a UV to the current geometry
           @method pushNormal
          @param {Vector2} n1 n coordinates to add
          @param {Vector2} n2 n coordinates to add
          @param {Vector2} n3 n coordinates to add
          */},{key:'pushNormal',value:function pushNormal(n1,n2,n3){this._geometry.faceVertexNormals[0].push([n1,n2,n3]);this._geometry.uvsNeedUpdate=true;this._geometry.elementsNeedUpdate=true;this._geometry.normalsNeedUpdate=true;}/**
          Adds a triangle to the current geometry
           @method pushTriangle
          @param {Vector3} v1 vertex coordinates of the triangle
          @param {Vector3} v2 vertex coordinates of the triangle
          @param {Vector3} v3 vertex coordinates of the triangle
          */},{key:'pushTriangle',value:function pushTriangle(v1,v2,v3){var i=this._geometry.vertices.length;this._geometry.vertices.push(v1,v2,v3);this._geometry.faces.push(new THREE.Face3(i+0,i+1,i+2));this._geometry.verticesNeedUpdate=true;this._geometry.elementsNeedUpdate=true;}/**
          * Adds a Quad to the current geometry
          *
          * @method pushQuad
          * @param {Vector3} v1 vertex coordinates of the Quad
          * @param {Vector3} v2 vertex coordinates of the Quad
          * @param {Vector3} v3 vertex coordinates of the Quad
          * @param {Vector3} v4 vertex coordinates of the Quad
          * @param {Vector2} uv1 uv coordinates to add
          * @param {Vector2} uv2 uv coordinates to add
          * @param {Vector2} uv3 uv coordinates to add
          * @param {Vector2} uv3 uv coordinates to add
          */},{key:'pushQuad',value:function pushQuad(v1,v2,v3,v4,uv1,uv2,uv3,uv4){var i=this._geometry.vertices.length;//var fi = this._geometry.faces.length;
this._geometry.vertices.push(v1,v2,v3,v4);this._geometry.faces.push(new THREE.Face3(i+0,i+1,i+2));this._geometry.faces.push(new THREE.Face3(i+0,i+2,i+3));this._geometry.faceVertexUvs[0].push([uv1,uv2,uv3]);this._geometry.faceVertexUvs[0].push([uv1,uv3,uv4]);this._geometry.verticesNeedUpdate=true;this._geometry.elementsNeedUpdate=true;this._geometry.uvsNeedUpdate=true;}/**
          * compute Face and Vertex Normals for the current geometry
          *
          * @method computeNormals
          */},{key:'computeNormals',value:function computeNormals(){this._geometry.computeFaceNormals();this._geometry.normalsNeedUpdate=true;this._geometry.computeVertexNormals(true);this._geometry.verticesNeedUpdate=true;}/**
          * updateMesh
          *
          * @method updateMesh
          */},{key:'updateMesh',value:function updateMesh(){this._geometry.normalsNeedUpdate=true;this._geometry.verticesNeedUpdate=true;this._geometry.elementsNeedUpdate=true;this._geometry.uvsNeedUpdate=true;}/**
          * Clears this mesh's geometry, that is vertices, faces and faceVertexUvs
          * @method clear
          */},{key:'clear',value:function clear(){this._geometry.vertices=[];this._geometry.faces=[];this._geometry.faceVertexUvs[0]=[];//this._geometry.faceVertexNormals[0] = []; //NEW
this._geometry.verticesNeedUpdate=true;this._geometry.elementsNeedUpdate=true;this._geometry.uvsNeedUpdate=true;}/**
          * Erase this mesh's geometry and material from memory
          * @method erase
          */},{key:'erase',value:function erase(){this._geometry.dispose();this.material.erase();}/**
          * Set the vertices of this mesh geometry
          * @method setVertices
          * @param {Object} vertices
          */},{key:'setVertices',value:function setVertices(vertices){this._geometry.vertices=vertices;this._geometry.verticesNeedUpdate=true;this._geometry.computeBoundingBox();}/**
          * Get the vertices of this mesh geometry
          * @method getVertices
          * @return {Object} vertices
          */},{key:'getVertices',value:function getVertices(){return this._geometry.vertices;}/**
          * Set the UV of this mesh geometry
          * @method setUVs
          * @param {integer} index
          * @param {Array} uvs
          */},{key:'setUVs',value:function setUVs(index,uvs){this._geometry.faceVertexUvs[index]=uvs;this._geometry.uvsNeedUpdate=true;this._geometry.elementsNeedUpdate=true;}/**
          * Get the UV of this mesh geometry
          * @method getUVs
          * @param {integer} index of the UV to get
          * @return {Array} uvs
          */},{key:'getUVs',value:function getUVs(index){return this._geometry.faceVertexUvs[index];}/**
          * Set the vertexColors of this mesh geometry's vertices
          * @method setVertexColors
          * @param {Array<Color>} colors
          */},{key:'setVertexColors',value:function setVertexColors(colors){this.material._material.vertexColors=THREE.VertexColors;this._geometry.colors=colors;this._geometry.colorsNeedUpdate=true;}/**
          * Get the vertexColors of this mesh geometry's vertices
          * @method getVertexColors
          * @return {Array<Color>} colors
          */},{key:'getVertexColors',value:function getVertexColors(){return this._geometry.colors;}/**
          * Defines the position of the geometry's center (NOT the transform!).
          *
          * @method setCenter
          * @param {number} x x coordinate
          * @param {number} y y coordinate
          * @param {number} z z coordinate
          */},{key:'setCenter',value:function setCenter(x,y,z){this._geometry.applyMatrix(new Matrix4$1().makeTranslation(x,y,z));}/**
          * Returns the center of the geometry (vertices) based on boundingbox
          *
          * @method getCenter
          * @return {Vector3} vector3 of the current geometry center
          */},{key:'getCenter',value:function getCenter(){//force bounding box computation
if(this._geometry.boundingBox===null){this._geometry.computeBoundingBox();}return this._geometry.boundingBox.center();}/**
          * Set the scale of the geometry (vertices) - this is not like scaling the transform. Shouldn't be done in loop. Polymorphic : can take various agruments of various types. Possible arguments number is 1, 2 or 3.
          *
          * @method setScale
          * @param {float|Vector3|Vector2} number|Vector3|Vector2 Value for the new scale of the geometry. If a Vector3 is given, its x, y, z will be used for the scale x, y, z. If a Vector2 is given, its x, y will be used for the scale x and y, but z will be 1. If a number is given, it will be the scale x.
          * @param {float} Number Value for the new y scale of the geometry.
          * @param {float} Number Value for the new z scale of the geometry.
          */},{key:'setScale',value:function setScale(arg1,arg2,arg3){if(arguments.length===3){this._geometry.applyMatrix(new Matrix4$1().makeScale(arg1,arg2,arg3));}else if(arguments.length===2){if(typeof arg1==='number'&&typeof arg2==='number'){this._geometry.applyMatrix(new Matrix4$1().makeScale(arg1,arg2,1));}}else if(arguments.length===1){if(arg1 instanceof Vector3$1){this._geometry.applyMatrix(new Matrix4$1().makeScale(arg1.x,arg1.y,arg1.z));}else if(arg1 instanceof Vector2$1){this._geometry.applyMatrix(new Matrix4$1().makeScale(arg1.x,arg1.y,1));}else if(typeof arg1==='number'){this._geometry.applyMatrix(new Matrix4$1().makeScale(arg1,arg1,arg1));}}}/**
          * Set the rotation around x axis of the vertices (not the transform!)
          *
          * @method setRotationX
          * @param {float} value Rotation value in degree
          */},{key:'setRotationX',value:function setRotationX(arg1){this._geometry.applyMatrix(new Matrix4$1().makeRotationX(_Math.degToRad(arg1)));}/**
          * Set the rotation around y axis of the vertices (not the transform!)
          *
          * @method setRotationY
          * @param {float} value Rotation value in degree
          */},{key:'setRotationY',value:function setRotationY(arg1){this._geometry.applyMatrix(new Matrix4$1().makeRotationY(_Math.degToRad(arg1)));}/**
          * Set the rotation around z axis of the vertices (not the transform!)
          *
          * @method setRotationZ
          * @param {float} value Rotation value in degree
          */},{key:'setRotationZ',value:function setRotationZ(arg1){this._geometry.applyMatrix(new Matrix4$1().makeRotationZ(_Math.degToRad(arg1)));}/**
          * Set the visibility of this mesh
          *
          * @method setVisible
          * @param {Boolean} value visible or not
          */},{key:'setVisible',value:function setVisible(val){this.mesh.visible=val;}/**
          * Get the visibility of this mesh
          *
          * @method getVisible
          * @return {Boolean} value visible or not
          */},{key:'getVisible',value:function getVisible(){return this.mesh.visible;}/*apply()
          {
              this.mesh.visible = this.visible;
          }*//**
          * Updates this mesh material
          *
          * @method updateMaterial
          * @private
          */},{key:'updateMaterial',value:function updateMaterial(){if(this.mesh.material){this.mesh.material=this.material._material;}}/**
          * Sets this Mesh material. Be warned that this method requiers to build a new mesh, so it can be slow on update. Better use it in setup.
          * @method setMaterial
          * @param {Material || String} material the new material to set (if String used, one of "phong", "lambert", "basic")
          */},{key:'setMaterial',value:function setMaterial(material){this.material=null;if(material===undefined){this.material=new Material({type:'default'});}else if(material instanceof Material){this.material=material;}else if(typeof material==='string'){this.material=new Material({type:material});}var tempMesh=new THREE.Mesh(this._geometry,this.material._material);var tempTransform=this.transform;this.mesh=tempMesh;this.transform=new Transform(this);this.transform.setLocalScale(tempTransform.getLocalScale().x,tempTransform.getLocalScale().y,tempTransform.getLocalScale().z);this.transform.setLocalPosition(tempTransform.getLocalPosition().x,tempTransform.getLocalPosition().y,tempTransform.getLocalPosition().z);this.transform.setLocalRotation(tempTransform.getLocalRotation().x,tempTransform.getLocalRotation().y,tempTransform.getLocalRotation().z);}/**
          * Attach the material to this mesh. The material must have been created before calling this method
          *
          * @method attachMaterial
          * @param {Material} material
          */},{key:'attachMaterial',value:function attachMaterial(material){if(material===undefined){this.material=new Material({type:'default'});}else if(material instanceof Material){this.material=material;}else if(typeof material==='string'){this.material=new Material({type:material});}if(material!==undefined&&this.mesh){this.updateMaterial();}}},{key:'setCastShadow',value:function setCastShadow(enabled){this.mesh.castShadow=enabled;}},{key:'setReceiveShadow',value:function setReceiveShadow(enabled){this.mesh.receiveShadow=enabled;}//============
// 3D Geometry creation
//============
/**
           Creates a plane.
           @method CreatePlane
           @static
           @param {Number} width Plane width (in world units).
           @param {Number} height Plane height (in world units).
           @param {Number} segments tesselation on all axis (in world units).
           @param {Object} material Mobilizing Material.
           */}],[{key:'generateStrokeShape',value:function generateStrokeShape(mesh,inflateValue){// let points = [];
var innerGeom=mesh._geometry.clone();var outterGeom=mesh._geometry.clone();var tempOutterGeom=mesh._geometry.clone();/*
               * Expand fill of convex polygon algorithm taken from
               *
               * https://stackoverflow.com/questions/3749678/expand-fill-of-convex-polygon
               * credits to Oren Trutner
               * Some addition to it by Dominique Cunin
               *///defines the rotation to apply further
var rot=Mesh$$1.geometryIsCW(innerGeom)?'ccw':'cw';for(var i=0;i<tempOutterGeom.vertices.length;i++){// get this point (pt1), the point before it
// (pt0) and the point that follows it (pt2)
var pt0=tempOutterGeom.vertices[i>0?i-1:tempOutterGeom.vertices.length-1];var pt1=tempOutterGeom.vertices[i];var pt2=tempOutterGeom.vertices[i<tempOutterGeom.vertices.length-1?i+1:0];// find the line vectors of the lines going
// into the current point
var v01=new Vector2$1(pt1.x-pt0.x,pt1.y-pt0.y);var v12=new Vector2$1(pt2.x-pt1.x,pt2.y-pt1.y);if(rot==='ccw'){v01.rotate90CCW();v12.rotate90CCW();}else{v01.rotate90CW();v12.rotate90CW();}v01.normalize();v12.normalize();// find the normals of the two lines, multiplied
// to the distance that polygon should inflate
var d01=v01.multiplyScalar(inflateValue).clone();var d12=v12.multiplyScalar(inflateValue).clone();//console.log(d01, d12);
// use the normals to find two points on the
// lines parallel to the polygon lines
var ptx0={x:pt0.x+d01.x,y:pt0.y+d01.y};var ptx10={x:pt1.x+d01.x,y:pt1.y+d01.y};var ptx12={x:pt1.x+d12.x,y:pt1.y+d12.y};var ptx2={x:pt2.x+d12.x,y:pt2.y+d12.y};//console.log(ptx0, ptx10, ptx12, ptx2);
// find the intersection of the two lines, and
// add it to the expanded polygon
var newPoint=_Math.intersectionPoint([ptx0,ptx10],[ptx12,ptx2]);outterGeom.vertices[i].x=newPoint.x;outterGeom.vertices[i].y=newPoint.y;//console.log("newPoint", newPoint);
}//Shape and subPath
var outterPath=new THREE.Shape();var innerPath=new THREE.Path();outterPath.moveTo(outterGeom.vertices[0].x,outterGeom.vertices[0].y);innerPath.moveTo(innerGeom.vertices[0].x,innerGeom.vertices[0].y);//!warning! must construct the path CCW (not the shape, that is CW)
for(var _i=innerGeom.vertices.length-1;_i>0;_i--){outterPath.lineTo(outterGeom.vertices[_i].x,outterGeom.vertices[_i].y);innerPath.lineTo(innerGeom.vertices[_i].x,innerGeom.vertices[_i].y);}outterPath.closePath();innerPath.closePath();outterPath.holes.push(innerPath);return outterPath;}/**
          * Static Utils to check the direction of a geometry (ccw o cw)
          * @static
          * @method geometryIsCW
          * @param {Geometry} geometry Three.js geometry
          * @return {Boolean} is CW or not
          */},{key:'geometryIsCW',value:function geometryIsCW(geometry){var vertices=geometry.vertices;for(var i=0;i<vertices.length;i++){var v1=new Vector2$1(vertices[i+1].x-vertices[i].x,vertices[i+1].y-vertices[i].y);var v2=new Vector2$1(vertices[i+2].x-vertices[i+1].x,vertices[i+2].y-vertices[i+1].y);v1.rotate90CW();var dot=v1.dot(v2);if(dot!==0){return dot>0;}console.log('dot product is 0');}return null;/*return vecDot(
                  vecRot90CW({ x: p[1].x - p[0].x, y: p[1].y - p[0].y }),
                  { x: p[2].x - p[1].x, y: p[2].y - p[1].y }) >= 0;*/}/**
          * Static Utils to generate the stroke Mesh from a given shape
          * @static
          * @method generateStrokeMesh
          * @param {Mesh} mesh to use as a base to get vertices
          * @param {Number} inflateValue stroke width
          * @return {Mesh} the resulting Mesh
          */},{key:'generateStrokeMesh',value:function generateStrokeMesh(mesh,inflateValue){var shape=Mesh$$1.generateStrokeShape(mesh,inflateValue);var geometry=new THREE.ShapeGeometry(shape);var strokeMesh=new Mesh$$1({primitive:'custom',geometry:geometry});strokeMesh.constructMesh();return strokeMesh;}},{key:'generateStrokeMeshFromShape',value:function generateStrokeMeshFromShape(shape){var geometry=new THREE.ShapeGeometry(shape);var strokeMesh=new Mesh$$1({primitive:'custom',geometry:geometry});strokeMesh.constructMesh();strokeMesh.material.setColor(this.strokeColor);return strokeMesh;}},{key:'CreatePlane',value:function CreatePlane(width,height,segments/*, material*/){var obj=new Mesh$$1({primitive:'plane',width:width,height:height,segments:segments,material:'material'});return obj;}/**
           Creates a box.
           @method CreateBox
           @static
           @param {Number} sizeX size on the X axis (in world units).
           @param {Number} sizeY size on the Y axis (in world units).
           @param {Number} sizeZ size on the Z axis (in world units).
           @param {Number} segments tesselation on all axis (in world units).
           @param {Object} material Mobilizing Material.
           */},{key:'CreateBox',value:function CreateBox(sizeX,sizeY,sizeZ,segments,material){var obj=new Mesh$$1({primitive:'box',width:sizeX,height:sizeY,depth:sizeZ,segments:segments,material:material});return obj;}/**
           Creates a text mesh.
           @method CreateText
           @static
           @param {String} text test to render.
           */},{key:'CreateText',value:function CreateText(text,font,fontSize,material,curveSegments,height){var obj=new Mesh$$1({primitive:'text',text:text,font:font,fontSize:fontSize,height:height,segments:curveSegments,material:material});return obj;}/**
           Creates a sphere
           @method CreateSphere
           @static
           @param {Number} radius the Sphere radius (in world units).
           @param {Number} widthSegments horizontal segments count (in world units).
           @param {Number} heightSegments vertical segments count (in world units).
           @param {Object} material Mobilizing Material.
           */},{key:'CreateSphere',value:function CreateSphere(radius,widthSegments,heightSegments,material){var obj=new Mesh$$1({primitive:'sphere',radius:radius,widthSegments:widthSegments,heightSegments:heightSegments,material:material});return obj;}/**
           Creates a circle
           @method CreateCircle
           @static
           @param {Number} radius Plane width (in world units).
           @param {Number} segments Plane height (in world units).
           @param {Object} material Mobilizing Material.
           */},{key:'CreateCircle',value:function CreateCircle(radius,segments,material){var obj=new Mesh$$1({primitive:'circle',segments:segments,material:material});return obj;}}]);return Mesh$$1;}();/**
   * EdgesMesh class creates a hiddenline fashioned Mesh from any other Mesh. "Hard" edges only will be visible. he result is different from when a Mesh material is set to wireframe, as all the segment will not be visible. All the coplanar segment are erased here in a new geometry that is rendered with a "line" type material.
   * @class EdgesMesh
   * @extends Mesh
   * @constructor
   * @param {Object} params parameters this can contains the same parameters than Mesh class
   * @param {Mesh} params.mesh The existing Mesh to use for generate a new edge only Mesh (geometry and material)
   */var EdgesMesh=function(_Mesh){_inherits$11(EdgesMesh,_Mesh);function EdgesMesh(params){_classCallCheck$17(this,EdgesMesh);var _params=getOrDefault(params,{});_params.threshold=getOrDefault(_params.threshold,undefined);var _this=_possibleConstructorReturn$11(this,(EdgesMesh.__proto__||Object.getPrototypeOf(EdgesMesh)).call(this,_params));_this.material=undefined;//this.mesh = new THREE.EdgesHelper(this.mesh, undefined, 90);
_this.material=undefined;_this.material=new Material({type:'line'});if(_params.mesh){//for imported objects
_this.mesh=new THREE.LineSegments(new THREE.EdgesGeometry(_params.mesh.geometry,_params.threshold),_this.material._material);//console.log("tempMesh.geometry",_params.mesh);
}else{_this.mesh=new THREE.LineSegments(new THREE.EdgesGeometry(_this._geometry,_params.threshold),_this.material._material);}//this.mesh.matrix = tempMesh.matrixWorld;
_this.transform=undefined;_this.transform=new Transform(_this);return _this;}return EdgesMesh;}(Mesh$1);var _createClass$11=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$16(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Csg=function(){/*
      ThreeCSG simple binding for Mobilizing.
      Use static method to generate new Mesh from the combination of two existing Mesh.
      User should be careful of scene management as boolean operations are not produced on one of the given Mesh in argument but generate a new mesh from these two.
       @class Csg
      @constructor
      @param {Context} context
      */function Csg(context){_classCallCheck$16(this,Csg);this.context=context;}/*
      Generate a new Mesh from the subtract boolean operation of two Mesh.
       @method substract
      @static
      @param {Mesh} mesh First mesh to use for the boolean operation
      @param {Mesh} mesh Second mesh to use for the boolean operation
      */_createClass$11(Csg,null,[{key:'substract',value:function substract(mobMesh1,mobMesh2){var csgMesh1=new ThreeBSP(mobMesh1.mesh);var csgMesh2=new ThreeBSP(mobMesh2.mesh);var newBSP=csgMesh1.subtract(csgMesh2);var BSPGeom=newBSP.toGeometry();var newMobMesh=new Mesh$1(undefined,undefined,BSPGeom);return newMobMesh;}/*
          Generate a new Mesh from the union boolean operation of two Mesh.
           @method union
          @static
          @param {Mesh} mesh First mesh to use for the boolean operation
          @param {Mesh} mesh Second mesh to use for the boolean operation
          */},{key:'union',value:function union(mobMesh1,mobMesh2){var csgMesh1=new ThreeBSP(mobMesh1.mesh);var csgMesh2=new ThreeBSP(mobMesh2.mesh);var newBSP=csgMesh1.union(csgMesh2);var BSPGeom=newBSP.toGeometry();var newMobMesh=new Mesh$1(undefined,undefined,BSPGeom);return newMobMesh;}/*
          Generate a new Mesh from the intersection boolean operation of two Mesh.
           @method intersect
          @static
          @param {Mesh} mesh First mesh to use for the boolean operation
          @param {Mesh} mesh Second mesh to use for the boolean operation
          */},{key:'intersect',value:function intersect(mobMesh1,mobMesh2){var csgMesh1=new ThreeBSP(mobMesh1.mesh);var csgMesh2=new ThreeBSP(mobMesh2.mesh);var newBSP=csgMesh1.intersect(csgMesh2);var BSPGeom=newBSP.toGeometry();var newMobMesh=new Mesh$1(undefined,undefined,BSPGeom);return newMobMesh;}}]);return Csg;}();var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i.return)_i.return();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError('Invalid attempt to destructure non-iterable instance');}};}();var _createClass$20=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$25(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var MOBILE='mobile';var DESKTOP='desktop';// A map of regular expressions to test the userAgent with and retreive OS information
var OS_REGEX=new Map([['Windows 10',/(Windows 10.0|Windows NT 10.0)/],['Windows 8.1',/(Windows 8.1|Windows NT 6.3)/],['Windows 8',/(Windows 8|Windows NT 6.2)/],['Windows 7',/(Windows 7|Windows NT 6.1)/],['Windows Vista',/Windows NT 6.0/],['Windows Server 2003',/Windows NT 5.2/],['Windows XP',/(Windows NT 5.1|Windows XP)/],['Windows 2000',/(Windows NT 5.0|Windows 2000)/],['Windows ME',/(Win 9x 4.90|Windows ME)/],['Windows 98',/(Windows 98|Win98)/],['Windows 95',/(Windows 95|Win95|Windows_95)/],['Windows NT 4.0',/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/],['Windows CE',/Windows CE/],['Windows 3.11',/Win16/],['Android',/Android/],['Open BSD',/OpenBSD/],['Sun OS',/SunOS/],['Linux',/(Linux|X11)/],['iOS',/(iPhone|iPad|iPod)/],['Mac OS X',/Mac OS X/],['Mac OS',/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/],['QNX',/QNX/],['UNIX',/UNIX/],['BeOS',/BeOS/],['OS/2',/OS\/2/],['Search Bot',/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/]]);var _STATICS={};/**
   * Device class gives easy access to some device information such as the operating system and browser used
   *
   * @example
   *     Mobilizing.Device.getOS();
   *
   * @class Device
   */var Device=function(){function Device(){_classCallCheck$25(this,Device);}_createClass$20(Device,null,[{key:'parseOSData',/**
          * Parse OS data from navigator.userAgent and navigator.appVersion
          * Credit goes to http://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
          *
          * @method parseOSData
          * @static
          * @private
          */value:function parseOSData(){var os='unknown';var osVersion='unknown';var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=OS_REGEX[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var _ref=_step.value;var _ref2=_slicedToArray(_ref,2);var key=_ref2[0];var regex=_ref2[1];if(regex.test(navigator.userAgent)){os=key;if(/Windows/.test(os)){osVersion=/Windows (.*)/.exec(os)[1];os='Windows';}break;}}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}switch(os){case'Mac OS X':osVersion=/Mac OS X (10[._\d]+)/.exec(navigator.userAgent)[1];break;case'Android':osVersion=/Android ([._\d]+)/.exec(navigator.userAgent)[1];break;case'iOS':osVersion=/OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);osVersion=osVersion[1]+'.'+osVersion[2]+'.'+(osVersion[3]|0);break;}_STATICS.os=os;_STATICS.osVersion=osVersion;}/**
          * Parse browser data from navigator.appName, navigator.userAgent and navigator.appVersion
          * Credit goes to http://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
          *
          * @method parseBrowserData
          * @static
          * @private
          */},{key:'parseBrowserData',value:function parseBrowserData(){var browser=navigator.appName;var version=void 0;var majorVersion=void 0;var versionOffset=void 0;var nameOffset=void 0;var ix=void 0;// Opera
if((versionOffset=navigator.userAgent.indexOf('Opera'))!==-1){browser='Opera';version=navigator.userAgent.substring(versionOffset+6);if((versionOffset=navigator.userAgent.indexOf('Version'))!==-1){version=navigator.userAgent.substring(versionOffset+8);}}// MSIE
else if((versionOffset=navigator.userAgent.indexOf('MSIE'))!==-1){browser='Microsoft Internet Explorer';version=navigator.userAgent.substring(versionOffset+5);}// Chrome
else if((versionOffset=navigator.userAgent.indexOf('Chrome'))!==-1){browser='Chrome';version=navigator.userAgent.substring(versionOffset+7);}// Safari
else if((versionOffset=navigator.userAgent.indexOf('Safari'))!==-1){browser='Safari';version=navigator.userAgent.substring(versionOffset+7);if((versionOffset=navigator.userAgent.indexOf('Version'))!==-1){version=navigator.userAgent.substring(versionOffset+8);}}// Firefox
else if((versionOffset=navigator.userAgent.indexOf('Firefox'))!==-1){browser='Firefox';version=navigator.userAgent.substring(versionOffset+8);}// MSIE 11+
else if(navigator.userAgent.indexOf('Trident/')!==-1){browser='Microsoft Internet Explorer';version=navigator.userAgent.substring(navigator.userAgent.indexOf('rv:')+3);}// Other browsers
else if((nameOffset=navigator.userAgent.lastIndexOf(' ')+1)<(versionOffset=navigator.userAgent.lastIndexOf('/'))){browser=navigator.userAgent.substring(nameOffset,versionOffset);version=navigator.userAgent.substring(versionOffset+1);if(browser.toLowerCase()===browser.toUpperCase()){browser=navigator.appName;}}// trim the version string
if((ix=version.indexOf(';'))!==-1){version=version.substring(0,ix);}if((ix=version.indexOf(' '))!==-1){version=version.substring(0,ix);}if((ix=version.indexOf(')'))!==-1){version=version.substring(0,ix);}majorVersion=parseInt(''+version,10);if(isNaN(majorVersion)){version=''+parseFloat(navigator.appVersion);majorVersion=parseInt(navigator.appVersion,10);}_STATICS.browser=browser;_STATICS.browserVersion=version;_STATICS.browserMajorVersion=majorVersion;}/**
          * Get the device type
          *
          * @method getType
          * @static
          * @return {String} The device type (mobile or desktop)
          */},{key:'getType',value:function getType(){if(!('type'in _STATICS)){_STATICS.type=/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)?MOBILE:DESKTOP;}return _STATICS.type;}/**
          * Get the operating system's type
          *
          * @method getOS
          * @static
          * @return {String} The OS type (Windows, Mac OS X, Android, iOS, etc)
          */},{key:'getOS',value:function getOS(){if(!('os'in _STATICS)){Device.parseOSData();}return _STATICS.os;}/**
          * Get the operating system's version
          *
          * @method getOSVersion
          * @static
          * @return {String} The OS version
          */},{key:'getOSVersion',value:function getOSVersion(){if(!('osVersion'in _STATICS)){Device.parseOSData();}return _STATICS.osVersion;}/**
          * Get the name of the web browser
          *
          * @method getBrowser
          * @static
          * @return {String} The browser's name
          */},{key:'getBrowser',value:function getBrowser(){if(!('browser'in _STATICS)){Device.parseBrowserData();}return _STATICS.browser;}/**
          * Get the version of the web browser
          *
          * @method getBrowserVersion
          * @static
          * @return {String} The browser's version
          */},{key:'getBrowserVersion',value:function getBrowserVersion(){if(!('browserVersion'in _STATICS)){Device.parseBrowserData();}return _STATICS.browserVersion;}/**
          * Get the major version number of the web browser
          *
          * @method getBrowserMajorVersion
          * @static
          * @return {Number} The browser's major version
          */},{key:'getBrowserMajorVersion',value:function getBrowserMajorVersion(){if(!('browserMajorVersion'in _STATICS)){Device.parseBrowserData();}return _STATICS.browserMajorVersion;}/**
          * Get the framework the html page is running under (ejecta or cordova), if any
          *
          * @method getFramework
          * @static
          * @return {String} The framework's name, or null if none
          */},{key:'getFramework',value:function getFramework(){if(!('framework'in _STATICS)){_STATICS.framework=null;if(navigator.userAgent.toLowerCase().indexOf('ejecta')>-1){_STATICS.framework='ejecta';}else if(window.cordova){_STATICS.framework='cordova';}}return _STATICS.framework;}/**
          * Get the screen's width
          * This does not necessarily indicate the width available
          * Some of the screen's width might be used by browser widgets and scrollbars
          *
          * @method getScreenWidth
          * @static
          * @return {Number} The screen's width in pixels
          */},{key:'getScreenWidth',value:function getScreenWidth(){return window.screen.width;}/**
          * Get the screen's height
          * This does not necessarily indicate the height available
          * Some of the screen's height might be used by browser widgets and scrollbars
          *
          * @method getScreenHeight
          * @static
          * @return {Number} The screen's height in pixels
          */},{key:'getScreenHeight',value:function getScreenHeight(){return window.screen.height;}/**
          * Shortcut to {{#crossLink "Device/getScreenWidth:method"}}{{/crossLink}} and {{#crossLink "Device/getScreenHeight:method"}}{{/crossLink}}
          *
          * @method getScreenSize
          * @static
          * @return {Object} An object with "width" and "height" as keys representing the screen's dimensions
          */},{key:'getScreenSize',value:function getScreenSize(){return{width:Device.getScreenWidth(),height:Device.getScreenHeight()};}}]);return Device;}();var _createClass$21=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$3=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$26(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$13(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$13(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Fired when charging state changed
   * @event chargingchange
   */var EVT_CHARGING_CHANGED='chargingchange';/**
   * Fired when charge level changed
   * @event levelchange
   */var EVT_LEVEL_CHANGED='levelchange';/**
   * Fired when charging time changed
   * @event chargingtimechange
   */var EVT_CHARGING_TIME_CHANGED='chargingtimechange';/**
   * Fired when discharging time changed
   * @event dischargingtimechange
   */var EVT_DISCHARGING_TIME_CHANGED='dischargingtimechange';/**
  * Component to monitor battery status changes
  *
  * @class BatteryStatus
  */var BatteryStatus=function(_Component){_inherits$13(BatteryStatus,_Component);function BatteryStatus(){_classCallCheck$26(this,BatteryStatus);return _possibleConstructorReturn$13(this,(BatteryStatus.__proto__||Object.getPrototypeOf(BatteryStatus)).apply(this,arguments));}_createClass$21(BatteryStatus,[{key:'setup',/**
          * @method setup
          */value:function setup(){this._manager=null;this._batteryAvailable=navigator.getBattery!==undefined;}/**
          * @method on
          */},{key:'on',value:function on(){var _this2=this;if(this._batteryAvailable){_get$3(BatteryStatus.prototype.__proto__||Object.getPrototypeOf(BatteryStatus.prototype),'on',this).call(this);navigator.getBattery().then(function(manager){return _this2.onBatteryManager(manager);});}else{debug.warn('The battery API is not supported on this device');}}/**
          * @method off
          */},{key:'off',value:function off(){var _this3=this;_get$3(BatteryStatus.prototype.__proto__||Object.getPrototypeOf(BatteryStatus.prototype),'off',this).call(this);if(this._manager){this._manager.removeEventListener('chargingchange',function(event){return _this3.onChargingChange(event);});this._manager.removeEventListener('chargingtimechange',function(event){return _this3.onChargingTimeChange(event);});this._manager.removeEventListener('levelchange',function(event){return _this3.onLevelChange(event);});this._manager.removeEventListener('dischargingtimechange',function(event){return _this3.onDischargingTimeChange(event);});this._manager=null;}}/**
          battery API promise callback
          Adds event listeners on the battery manager
           @method onBatteryManager
          @param {BatteryManager} manager A BatteryManager (see https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager)
          @private
          */},{key:'onBatteryManager',value:function onBatteryManager(manager){var _this4=this;if(!this.getStatus()){// this component has been turned off before getting the manager
return;}this._manager=manager;this._manager.addEventListener('chargingchange',function(event){return _this4.onChargingChange(event);});this._manager.addEventListener('chargingtimechange',function(event){return _this4.onChargingTimeChange(event);});this._manager.addEventListener('levelchange',function(event){return _this4.onLevelChange(event);});this._manager.addEventListener('dischargingtimechange',function(event){return _this4.onDischargingTimeChange(event);});}/**
          chargingchange event handler
          Fires a chargingchange event
           @method onChargingChange
          @private
          */},{key:'onChargingChange',value:function onChargingChange(event){this.events.trigger(EVT_CHARGING_CHANGED,event.target.charging);}/**
          chargingtimechange event handler
          Fires a chargingtimechange event
           @method onChargingTimeChange
          @private
          */},{key:'onChargingTimeChange',value:function onChargingTimeChange(event){this.events.trigger(EVT_CHARGING_TIME_CHANGED,event.target.chargingTime);}/**
          levelchange event handler
          Fires a levelchange event
           @method onDischargingTimeChange
          @private
          */},{key:'onDischargingTimeChange',value:function onDischargingTimeChange(event){this.events.trigger(EVT_DISCHARGING_TIME_CHANGED,event.target.dischargingTime);}/**
          dischargingtimechange event handler
          Fires a dischargingtimechange event
           @method onLevelChange
          @private
          */},{key:'onLevelChange',value:function onLevelChange(event){this.events.trigger(EVT_LEVEL_CHANGED,event.target.level);}/**
          Check if the battery is currently charging
          The component needs to be activated before using this method
           @method isCharging
          @return {Boolean} True if charging, false otherwise
          */},{key:'isCharging',value:function isCharging(){if(!this._manager){debug.warn('The battery component needs to be active to get battery information');return null;}return this._manager.charging;}/**
          Get the time remaining until the battery is fully charge
          The component needs to be activated before using this method
           @method getChargingTime
          @return {Number} The remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged
          */},{key:'getChargingTime',value:function getChargingTime(){if(!this._manager){debug.warn('The battery component needs to be active to get battery information');return null;}return this._manager.chargingTime;}/**
          Get the time remaining until the battery is completely discharged
          The component needs to be activated before using this method
           @method getDischargingTime
          @return {Number} The remaining time in seconds until the battery is completely discharged and the system will suspend
          */},{key:'getDischargingTime',value:function getDischargingTime(){if(!this._manager){debug.warn('The battery component needs to be active to get battery information');return null;}return this._manager.dischargingTime;}/**
          Get the battery's charge level
          The component needs to be activated before using this method
           @method getLevel
          @return {Number} The charge level on a scale from 0.0 to 1.0
          */},{key:'getLevel',value:function getLevel(){if(!this._manager){debug.warn('The battery component needs to be active to get battery information');return null;}return this._manager.level;}}]);return BatteryStatus;}(Component);var _createClass$22=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$4=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$27(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$14(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$14(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Fired when a new keydown event occures
   * @event keydown
   */var EVT_KEY_DOWN='keydown';/**
   * Fired when a new keypressed event occures
   * @event keypressed
   */var EVT_KEY_PRESS='keypress';/**
   * Fired when a new keyup event occures
   * @event keyup
   */var EVT_KEY_UP='keyup';var Keyboard=function(_Component){_inherits$14(Keyboard,_Component);/**
       * Simple mapping from HTLM keyboard events toward Mobilizing.js. Not of a big interest for now...
       *
       * @class Keyboard
       * @constructor
       *
       * @param {Object} params Config parameters
       * @param {Window} [params.target=window] The DOM element this instance is attached to
      */function Keyboard(params){_classCallCheck$27(this,Keyboard);var _this=_possibleConstructorReturn$14(this,(Keyboard.__proto__||Object.getPrototypeOf(Keyboard)).call(this,params));_this._target=getOrDefault(params,'target',window);return _this;}_createClass$22(Keyboard,[{key:'on',value:function on(){var _this2=this;_get$4(Keyboard.prototype.__proto__||Object.getPrototypeOf(Keyboard.prototype),'on',this).call(this);this._target.addEventListener('keydown',function(event){return _this2.onKeyDown(event);});this._target.addEventListener('keypress',function(event){return _this2.onKeyPress(event);});this._target.addEventListener('keyup',function(event){return _this2.onKeyUp(event);});}},{key:'off',value:function off(){var _this3=this;_get$4(Keyboard.prototype.__proto__||Object.getPrototypeOf(Keyboard.prototype),'off',this).call(this);this._target.removeEventListener('keydown',function(event){return _this3.onKeyDown(event);});this._target.removeEventListener('keypress',function(event){return _this3.onKeyPress(event);});this._target.removeEventListener('keyup',function(event){return _this3.onKeyUp(event);});}},{key:'setup',value:function setup(){//note: on window, keypress events are continously called, like keydown. It's not the case of html element
//we reproduce this behavior here.
this._isPressed=false;// this._keyDownCode;
}},{key:'update',value:function update(){}/**
          * Fast way to verify in an update loop if a specific key is currently down
          *
          * @method getKeyIsDown
          * @param {Object} key
          * @return {Boolean} is down or not
          */},{key:'getKeyIsDown',value:function getKeyIsDown(key){return this._keyDownCode===key.toLowerCase();}/**
          * Forward the keydown event
          *
          * @private
          * @method onKeyDown
          * @param {Object} event
          */},{key:'onKeyDown',value:function onKeyDown(event){this._keyDownCode=String.fromCharCode(event.keyCode).toLowerCase();this.events.trigger(EVT_KEY_DOWN,event);//event.preventDefault();
}/**
          * Forward the keypress event
          *
          * @private
          * @method onKeyPress
          * @param {Object} event
          */},{key:'onKeyPress',value:function onKeyPress(event){//if(!this._isPressed){
this._keyDownCode=String.fromCharCode(event.keyCode).toLowerCase();this.events.trigger(EVT_KEY_PRESS,event);this._isPressed=true;//}
event.preventDefault();}/**
          * Forward the keyup event
          *
          * @private
          * @method onKeyUp
          * @param {Object} event
          */},{key:'onKeyUp',value:function onKeyUp(event){this._keyDownCode=undefined;this._isPressed=false;this.events.trigger(EVT_KEY_UP,event);//event.preventDefault();
}}]);return Keyboard;}(Component);var _createClass$24=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$29(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
   * DOM helper class gives easy access to some basics calculations/manipulations frequently done on DOM elements
   *
   * @class DOM
   */var _DOM=function(){function _DOM(){_classCallCheck$29(this,_DOM);}_createClass$24(_DOM,null,[{key:'getElementPosition',/**
           * Get an element's position within the document taking into account the scroll positions
           * @method getElementPosition
           * @static
           * @param {Element} el The DOM element
           * @return {Object} the position of the element as {x, y}
           */value:function getElementPosition(el){var x=0;var y=0;while(el){if(el.tagName==='BODY'){// deal with browser quirks with body/window/document and page scroll
var xScroll=el.scrollLeft||document.documentElement.scrollLeft;var yScroll=el.scrollTop||document.documentElement.scrollTop;x+=el.offsetLeft-xScroll+el.clientLeft;y+=el.offsetTop-yScroll+el.clientTop;}else{// for all other non-BODY elements
x+=el.offsetLeft-el.scrollLeft+el.clientLeft;y+=el.offsetTop-el.scrollTop+el.clientTop;}el=el.offsetParent;}return{x:x,y:y};}}]);return _DOM;}();var _createClass$23=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$5=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$28(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$15(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$15(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}// Events
/**
   * Fired when the mouse postupdate is called
   * @event mouseupdate
   */var EVT_MOUSE_UPDATE='mouseupdate';/**
   * Fired when a mouse move is detected
   * @event mousemove
   */var EVT_MOUSE_MOVE='mousemove';/**
   * Fired when the pointer moves onto the target element
   * @event mouseover
   */var EVT_MOUSE_OVER='mouseover';/**
   * Fired when the pointer moves off the target element
   * @event mouseout
   */var EVT_MOUSE_OUT='mouseout';/**
   * Fired when a button is pressed
   * @event mousepress
   * @param {Number} button The button number pressed
   */var EVT_MOUSE_PRESS='mousepress';/**
   * Fired when a mouse move is detected and a button is being pressed
   * @event mousedrag
   */var EVT_MOUSE_DRAG='mousedrag';/**
   * Fired when a button is released
   * @event mouserelease
   */var EVT_MOUSE_RELEASE='mouserelease';/**
   * Fired when a button is pressed and released on the target element
   * @event mouseclick
   * @param {Number} button The button number pressed
   */var EVT_MOUSE_CLICK='mouseclick';/**
   * Fired when a button is clicked twice on the target element
   * @event mousedblclick
   * @param {Number} button The button number pressed
   */var EVT_MOUSE_DBLCLICK='mousedblclick';/**
   * Fired when the wheel button is rotated
   * @event mousewheel
   * @param {Number} deltaX The scroll amount for the x-axis
   * @param {Number} deltaY The scroll amount for the y-axis
   * @param {Number} deltaZ The scroll amount for the z-axis
   */var EVT_MOUSE_WHEEL='mousewheel';var Mouse=function(_Component){_inherits$15(Mouse,_Component);/**
       * Give simple access to mouse events
       *
       * @class Mouse
       * @extends Component
       * @constructor
       * @param {Object} params Config parameters
       * @param {Object} [params.target=window] The DOM element this instance is attached to
      */function Mouse(params){_classCallCheck$28(this,Mouse);var _this=_possibleConstructorReturn$15(this,(Mouse.__proto__||Object.getPrototypeOf(Mouse)).call(this,params));_this._target=getOrDefault(params,'target',window);return _this;}/**
      * Initialization method
      * @method setup Setup
      */_createClass$23(Mouse,[{key:'setup',value:function setup(){this._x=null;this._y=null;this._pX=null;this._pY=null;this._dragStartX=null;this._dragStartY=null;// keeps track of total wheel deltas between two updates
this._wheelDeltaX=0;this._wheelDeltaY=0;this._wheelDeltaZ=0;// keeps track of whether a button is being pressed
this._pressed=false;// keeps track of whether the wheel has been activated since last update
this._wheelActivated=false;// keeps track of whether the wheel values should be reset during next update
this._resetWheel=false;}/**
          * @method on
          */},{key:'on',value:function on(){var _this2=this;_get$5(Mouse.prototype.__proto__||Object.getPrototypeOf(Mouse.prototype),'on',this).call(this);if(!this._target){debug.error("Can't activate the mouse input component without a target");return;}this._target.addEventListener('mousemove',function(event){return _this2.onMouseMove(event);});this._target.addEventListener('mouseover',function(event){return _this2.onMouseOver(event);});this._target.addEventListener('mouseout',function(event){return _this2.onMouseOut(event);});this._target.addEventListener('mousedown',function(event){return _this2.onMouseDown(event);});this._target.addEventListener('mouseup',function(event){return _this2.onMouseUp(event);});this._target.addEventListener('click',function(event){return _this2.onClick(event);});this._target.addEventListener('dblclick',function(event){return _this2.onDblClick(event);});this._target.addEventListener('wheel',function(event){return _this2.onWheel(event);});}/**
          * @method off
          */},{key:'off',value:function off(){var _this3=this;_get$5(Mouse.prototype.__proto__||Object.getPrototypeOf(Mouse.prototype),'off',this).call(this);if(!this._target){debug.error("Can't deactivate the mouse input component without a target");return;}this._target.removeEventListener('mousemove',function(event){return _this3.onMouseMove(event);});this._target.removeEventListener('mouseover',function(event){return _this3.onMouseOver(event);});this._target.removeEventListener('mouseout',function(event){return _this3.onMouseOut(event);});this._target.removeEventListener('mousedown',function(event){return _this3.onMouseDown(event);});this._target.removeEventListener('mouseup',function(event){return _this3.onMouseUp(event);});this._target.removeEventListener('click',function(event){return _this3.onClick(event);});this._target.removeEventListener('dblclick',function(event){return _this3.onDblClick(event);});this._target.removeEventListener('wheel',function(event){return _this3.onWheel(event);});}},{key:'preUpdate',value:function preUpdate(){// check if the wheel was already active at previous update and if it needs to be reset
if(this._wheelActivated){if(this._resetWheel){this._wheelActivated=false;this._resetWheel=false;this._wheelDeltaX=0;this._wheelDeltaY=0;this._wheelDeltaZ=0;}else{this._resetWheel=true;}}}},{key:'update',value:function update(){}},{key:'postUpdate',value:function postUpdate(){// update the previous x and y coordinates
this._pX=this._x;this._pY=this._y;this.events.trigger(EVT_MOUSE_UPDATE,{pX:this.getPX(),pY:this.getPY(),x:this.getX(),y:this.getY()});}/**
          mousemove event handler
          Fires a mousemove event and possibly a mousedrag event
           @method onMouseMove
          @private
          */},{key:'onMouseMove',value:function onMouseMove(event){if(!(this._target instanceof Window)){var position=_DOM.getElementPosition(this._target);this._x=event.clientX-position.x;this._y=event.clientY-position.y;}else{this._x=event.clientX;this._y=event.clientY;}this.events.trigger(EVT_MOUSE_MOVE,{pX:this.getPX(),pY:this.getPY(),x:this.getX(),y:this.getY()});if(this.isPressed()){this.events.trigger(EVT_MOUSE_DRAG,{pX:this.getPX(),pY:this.getPY(),x:this.getX(),y:this.getY()});}event.preventDefault();}/**
          mouseover event handler
          Fires a mouseover event
           @method onMouseOver
          @private
          */},{key:'onMouseOver',value:function onMouseOver(event){this.events.trigger(EVT_MOUSE_OVER);event.preventDefault();}/**
          mouseover event handler
          Fires a mouseout event
           @method onMouseOut
          @private
          */},{key:'onMouseOut',value:function onMouseOut(event){this.events.trigger(EVT_MOUSE_OUT);event.preventDefault();}/**
          mousedown event handler
          Fires a mousepress event and updates the pressed state
           @method onMouseDown
          @private
          */},{key:'onMouseDown',value:function onMouseDown(event){this._pressed=true;this._dragStartX=this.getX();this._dragStartY=this.getY();this.events.trigger(EVT_MOUSE_PRESS,event.button);event.preventDefault();}/**
          mouseup event handler
          Fires a mouserelease event and updates the pressed state
           @method onMouseUp
          @private
          */},{key:'onMouseUp',value:function onMouseUp(event){this._pressed=false;this._dragStartX=null;this._dragStartY=null;this.events.trigger(EVT_MOUSE_RELEASE);event.preventDefault();}/**
          cick event handler
          Fires a mouseclick event
           @method onClick
          @private
          */},{key:'onClick',value:function onClick(event){this.events.trigger(EVT_MOUSE_CLICK,event.button);event.preventDefault();}/**
          dblcick event handler
          Fires a mousedblclick event
           @method onDblClick
          @private
          */},{key:'onDblClick',value:function onDblClick(event){this.events.trigger(EVT_MOUSE_DBLCLICK,event.button);event.preventDefault();}/**
          wheel event handler
          Fires a mousewheel event
           @method onWheel
          @private
          */},{key:'onWheel',value:function onWheel(event){this._wheelActivated=true;this._wheelDeltaX+=event.deltaX;this._wheelDeltaY+=event.deltaY;this._wheelDeltaZ+=event.deltaZ;this.events.trigger(EVT_MOUSE_WHEEL,event.deltaX,event.deltaY,event.deltaZ);event.preventDefault();}/**
          returns whether a mouse button is currently pressed or not
           @method isPressed
          @return {Boolean} True if a mouse button is currently pressed
          */},{key:'isPressed',value:function isPressed(){return this._pressed;}/**
          returns the current x coordinate of the mouse
           @method getX
          @return {Number} The x coordinate of the mouse position
          */},{key:'getX',value:function getX(){return this._x;}/**
          returns the current y coordinate of the mouse
           @method getY
          @return {Number} The y coordinate of the mouse position
          */},{key:'getY',value:function getY(){return this._y;}/**
          returns the previous x coordinate of the mouse
           @method getPX
          @return {Number} The x coordinate of the previous mouse position
          */},{key:'getPX',value:function getPX(){return this._pX;}/**
          returns the previous y coordinate of the mouse
           @method getPY
          @return {Number} The y coordinate of the previous mouse position
          */},{key:'getPY',value:function getPY(){return this._pY;}/**
          returns the x delta between the previous and current mouse positions
           @method getDeltaX
          @return {Number} The x delta value
          */},{key:'getDeltaX',value:function getDeltaX(){return this._x-this._pX;}/**
          returns the y delta between the previous and current mouse positions
           @method getDeltaY
          @return {Number} The y delta value
          */},{key:'getDeltaY',value:function getDeltaY(){return this._y-this._pY;}/**
          returns the x and y deltas between the previous and current mouse positions
           @method getDelta
          @return {Object} The x and y delta values
          */},{key:'getDelta',value:function getDelta(){return{x:this.getDeltaX(),y:this.getDeltaY()};}/**
          returns the x offset between the current mouse position and the position at the begining of the drag
           @method getDragOffsetX
          @return {Number} The x offset value
          */},{key:'getDragOffsetX',value:function getDragOffsetX(){if(!this.isPressed()){return 0;}return this.getX()-this._dragStartX;}/**
          returns the y offset between the current mouse position and the position at the begining of the drag
           @method getDragOffsetY
          @return {Number} The y offset value
          */},{key:'getDragOffsetY',value:function getDragOffsetY(){if(!this.isPressed()){return 0;}return this.getY()-this._dragStartY;}/**
          returns the x and y offsets between the current mouse position and the position at the begining of the drag
           @method getDragOffset
          @return {Object} The x and y offset values
          */},{key:'getDragOffset',value:function getDragOffset(){return{x:this.getDragOffsetX(),y:this.getDragOffsetY()};}/**
          helper method to check if the wheel is supported on the device
           @method isWheelSupported
          @return {Boolean} True if the wheel is supported, false otherwise
          */},{key:'isWheelSupported',value:function isWheelSupported(){return Device.getType()==='desktop'&&window.WheelEvent!==undefined;}/**
          helper method to check if the wheel has been rotated
           @method isWheelActivated
          @return {Boolean} True if the wheel has been rotated, false otherwise
          */},{key:'isWheelActivated',value:function isWheelActivated(){return this._wheelActivated;}/**
          returns the scroll amount for the x-axis
           @method getWheelDeltaX
          @return {Number} The scroll amount for the x-axis
          */},{key:'getWheelDeltaX',value:function getWheelDeltaX(){return this._wheelDeltaX;}/**
          returns the scroll amount for the y-axis
           @method getWheelDeltaY
          @return {Number} The scroll amount for the y-axis
          */},{key:'getWheelDeltaY',value:function getWheelDeltaY(){return this._wheelDeltaY;}/**
          returns the scroll amount for the z-axis
           @method getWheelDeltaZ
          @return {Number} The scroll amount for the z-axis
          */},{key:'getWheelDeltaZ',value:function getWheelDeltaZ(){return this._wheelDeltaZ;}/**
          returns the scroll amounts for the x, y and z axes
           @method getWheelDelta
          @return {Object} The scroll amounts for the x, y and z axes
          */},{key:'getWheelDelta',value:function getWheelDelta(){return{x:this.getWheelDeltaX(),y:this.getWheelDeltaY(),z:this.getWheelDeltaZ()};}}]);return Mouse;}(Component);var _get$6=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};var _createClass$25=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _possibleConstructorReturn$16(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$16(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck$30(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var TouchObject=function(){/**
       * Object that represent what defines a Touch. Touch Class returns this type of objets when events are fired.
       * This class is used internally and is documented for consultation purpose. Users should not make new instances from it.
       * @private
       * @class TouchObject
       * @constructor
       * @param {Number} x the x coordinate of the touch
      */function TouchObject(x,y,index){_classCallCheck$30(this,TouchObject);/**
          * index
          * @property {Number} index
          */this.index=index;/**
          * x coordinate of the touch
          * @property {Number} x
          */this.x=x;/**
          * y coordinate of the touch
          * @property {Number} y
          */this.y=y;/**
          * pX pevious x coordinate of the touch
          * @property {Number} pX
          */this.pX=this.x;/**
          * pY previous y coordinate of the touch
          * @property {Number} pY
          */this.pY=this.y;/**
          * id used internally to manage the touch list in Touch Class
          * @property {Object} id
          */this.id=undefined;/**
          * xDelta delta on x coordinate (difference between pevious and current x)
          * @property {Number} xDelta
          */this.xDelta=0;/**
          * yDelta delta on y coordinate (difference between pevious and current y)
          * @property {Number} yDelta
          */this.yDelta=0;/**
          * startX x coordinate where the touch began
          * @property {Number} startX
          */this.startX=this.x;/**
          * startY x coordinate where the touch began
          * @property {Number} startY
          */this.startY=this.y;/**
          * offset on the X coordinate (difference between startX and current x)
          * @property {Number} offsetX
          */this.offsetX=0;/**
          * offset on the Y coordinate (difference between startY and current y)
          * @property {Number} offsetY
          */this.offsetY=0;}/**
      * Set a new x coordinate and compute the new xDelta and offsetX
      * @method setX
      * @param {Object} x
      */_createClass$25(TouchObject,[{key:'setX',value:function setX(x){//this.pX = this.x;
this.x=x;this.xDelta=this.x-this.pX;this.offsetX=this.x-this.startX;}/**
          * Set a new y coordinate and compute the new yDelta and offsetY
          * @method setY
          * @param {Object} y
          */},{key:'setY',value:function setY(y){//this.pY = this.y;
this.y=y;this.yDelta=this.y-this.pY;this.offsetY=this.y-this.startY;}},{key:'setPX',value:function setPX(){this.pX=this.x;}},{key:'setPY',value:function setPY(){this.pY=this.y;}}]);return TouchObject;}();/**
   * Fired when a touch starts
   * @event touchstart
   */var EVT_TOUCH_START='touchstart';/**
   * Fired when a touch ends
   * @event touchend
   */var EVT_TOUCH_END='touchend';/**
   * Fired when a touch moved
   * @event touchmoved
   */var EVT_TOUCH_MOVED='touchmoved';/**
   * Fired when the tap count changed
   * @event tapchanged
   */var EVT_TAP_CHANGED='tapchanged';/**
   * Fired when the pressed state changed (ie a touch is on screen)
   * @event pressedchanged
   */var EVT_PRESSED_CHANGED='pressedchanged';var Touch=function(_Component){_inherits$16(Touch,_Component);/**
       * Touch give an interface to access the multitouch events of the device. It holds a list of currently active touches and various ways to access their coordinates.
       *
       * @example
       *     //this is how to use events in a user's script
       *     function script()
       *     {
       *
       *        var M;
       *        var R;
       *
       *        var camera;
       *        var cube;
       *        var light;
       *
       *        var y = 0;
       *        var speed = 0;
       *
       *        var touch;
       *
       *        this.setup = function()
       *        {
       *            M = this.getContext();
       *            R = M.addComponent( new Mobilizing.Renderer3D() );
       *
       *            touch = M.addComponent(new Mobilizing.input.Touch({"target": R.canvas}));
       *            touch.setup();//set it up
       *            touch.on();//active it
       *
       *            //construct a default perspective camera
       *            camera = new Mobilizing.Camera();
       *            camera.setFarPlane(10000);
       *            camera.setToPixel();
       *            R.addCamera(camera);
       *
       *            //make a light
       *            light = new Mobilizing.Light();
       *            light.transform.setLocalPosition(500,-100,500);
       *            light.setDistance(5000);
       *            R.addToCurrentScene(light);
       *
       *            //make a cube
       *            cube = new Mobilizing.Mesh({primitive:"box", width:1, height:1, depth:1});
       *            cube.transform.setLocalPosition(0,0,0);
       *            cube.transform.setLocalScale(50);
       *            R.addToCurrentScene(cube);
       *        };
       *
       *        this.update = function()
       *        {
       *            if(touch.pressed){
       *
       *                cube.transform.setLocalPosition(
       *                     touch.getX(0),
       *                    - touch.getY(0),
       *                    0);
       *            }
       *        };
       *    };
       *
       * @class Touch
       * @constructor
       * @extends Component
       * @param {Object} params Config parameters
       * @param {DOMElement} params.target The DOM element that will be used to attach touch events on
      */function Touch(params){_classCallCheck$30(this,Touch);var _this=_possibleConstructorReturn$16(this,(Touch.__proto__||Object.getPrototypeOf(Touch)).call(this,params));_this._target=getOrDefault(params,'target',window);_this._time=new Time();return _this;}/**
      * Initialization method
      * @method setup Setup
      */_createClass$25(Touch,[{key:'setup',value:function setup(){//!!this.getContext() is not already available in constructor as setContext() is called after creation!!
var context=this.getContext();context.addComponent(this._time);this._time.setup();this._time.on();/**
              Gives the number of touch currently active
              @property {Number} count
              */this.count=0;/**
              true if the active touch on screen > 1, false otherwise
              @property {Boolean} pressed
              */this.pressed=false;this.touches={};this.taps=0;this.tapsMaxInterval=500;//sec but depends on timeScale (!?)
this.oldTapTime=0;this.pinchTouches=[];this.pinchStart=0;this.pinch=0;this.pinchActive=false;// this.touchState;
// this.touchDown;
// this.touchUp;
}},{key:'on',value:function on(){var _this2=this;_get$6(Touch.prototype.__proto__||Object.getPrototypeOf(Touch.prototype),'on',this).call(this);this._target.addEventListener('touchstart',function(event){return _this2.onTouchStart(event);});this._target.addEventListener('touchend',function(event){return _this2.onTouchEnd(event);});this._target.addEventListener('touchcancel',function(event){return _this2.onTouchEnd(event);});this._target.addEventListener('touchleave',function(event){return _this2.onTouchEnd(event);});this._target.addEventListener('touchmove',function(event){return _this2.onTouchMove(event);});}},{key:'off',value:function off(){var _this3=this;_get$6(Touch.prototype.__proto__||Object.getPrototypeOf(Touch.prototype),'off',this).call(this);this._target.removeEventListener('touchstart',function(event){return _this3.onTouchStart(event);});this._target.removeEventListener('touchend',function(event){return _this3.onTouchEnd(event);});this._target.removeEventListener('touchcancel',function(event){return _this3.onTouchEnd(event);});this._target.removeEventListener('touchleave',function(event){return _this3.onTouchEnd(event);});this._target.removeEventListener('touchmove',function(event){return _this3.onTouchMove(event);});}/**
           * @method update
           */},{key:'update',value:function update(){var _this4=this;if(this.pressed&&!this.touchState){this.touchDown=true;}else{this.touchDown=false;}if(!this.pressed&&this.touchState){this.touchUp=true;}else{this.touchUp=false;}this.touchState=this.pressed;Object.keys(this.touches).forEach(function(identifier){_this4.touches[identifier].setPX();_this4.touches[identifier].setPY();});}/**
           * onTouchStart listener
           * Manage a new touch and organize it in the main touch list Input.touches
           *
           * @method onTouchStart
           * @private
          */},{key:'onTouchStart',value:function onTouchStart(event){var position=_DOM.getElementPosition(this._target);var newTouch=null;if(event.changedTouches!==null&&event.changedTouches!==undefined){//touch
for(var i=0;i<event.changedTouches.length;i++){var changed=event.changedTouches[i];if(!(changed.identifier in this.touches)){//no touch in memory, build it
var x=changed.pageX-position.x;var y=changed.pageY-position.x;newTouch=new TouchObject(x,y,this.count);debug.log('newTouch',newTouch);newTouch.setX(x);newTouch.setY(y);newTouch.id=changed.identifier;newTouch.up=false;//JON
newTouch.down=true;//JON
//à laisser ici!
this.touches[changed.identifier]=newTouch;this.count+=1;}else{//touch is already there, update
var touch=this.touches[changed.identifier];var _x=touch.pageX-position.x;var _y=touch.pageY-position.x;touch.setX(_x);touch.setY(_y);}//Events
this.events.trigger(EVT_TOUCH_START,newTouch);}}//tap management, add a tap after a time interval
if(this._time.getTime()-this.oldTapTime<this.tapsMaxInterval){this.taps+=1;//Events
this.events.trigger(EVT_TAP_CHANGED,this.taps);}else{this.taps=1;//Events
this.events.trigger(EVT_TAP_CHANGED,this.taps);}//current time memory for next tap
this.oldTapTime=this._time.getTime();//pressed state
this.pressed=true;this.events.trigger(EVT_PRESSED_CHANGED,this.pressed);//avoid the browser's defaults interactions
event.preventDefault();}/**
           * onTouchEnd listener
           *
           * Manage a touch removal and organize it in the main touch list Input.touches
           *
           * @method onTouchEnd
           * @private
          */},{key:'onTouchEnd',value:function onTouchEnd(event){if(event.changedTouches!==null&&event.changedTouches!==undefined){//touch
for(var i=0;i<event.changedTouches.length;i++){var touch=event.changedTouches[i];if(touch.identifier in this.touches){//touch is there!
//Events
this.events.trigger(EVT_TOUCH_END,this.touches[touch.identifier]);//erase
delete this.touches[touch.identifier];this.count-=1;}}//reset pinch value when no fingers
if(this.count<=1){this.pinchTouches=[];this.pinchStart=0;this.pinch=0;this.pinchActive=false;}}if(this.count===0){this.pressed=false;this.events.trigger(EVT_PRESSED_CHANGED,this.pressed);}event.preventDefault();}/**
           * onTouchMove listener
           *
           * Manage a touch move and organize it in the main touch list Input.touches
           *
           * @method onTouchMove
           * @private
          */},{key:'onTouchMove',value:function onTouchMove(event){var position=_DOM.getElementPosition(this._target);if(event.changedTouches!==null&&event.changedTouches!==undefined){//touch
for(var i=0;i<event.changedTouches.length;i++){var touch=event.changedTouches[i];if(touch.identifier in this.touches){//touch is there!
var myTouch=this.touches[touch.identifier];var x=touch.pageX-position.x;var y=touch.pageY-position.y;myTouch.setX(x);myTouch.setY(y);this.events.trigger(EVT_TOUCH_MOVED,myTouch);}}}this.taps=0;event.preventDefault();}/**
           * returns the x coordinate of the touch given as paramater
           *
           * @method getX
           * @param {Number:Int} index the index of the touch to get x coordinate from
           * @return {Number:Int} x coordinate of the touch if active, -1 if not active
          */},{key:'getX',value:function getX(index){var val=void 0;if(typeof index==='number'){for(var obj in this.touches){if(this.touches[obj].index===index){val=this.touches[obj].x;}}}return val;}/**
           * returns the y coordinate of the touch given as paramater
           *
           * @method getY
           * @param {Number:Int} index the index of the touch to get y coordinate from
           * @return {Number:Int} y coordinate of the touch if active, -1 if not active
          */},{key:'getY',value:function getY(index){var val=void 0;if(typeof index==='number'){for(var obj in this.touches){if(this.touches[obj].index===index){val=this.touches[obj].y;}}}return val;}/**
           * returns a TouchObject
           *
           * @method get
           * @param {Number:Int} index the index of the touchObject to get
           * @return {TouchObject}
          */},{key:'get',value:function get(index){var val=void 0;if(typeof index==='number'){for(var obj in this.touches){if(this.touches[obj].index===index){val=this.touches[obj];}}}return val;}/**
           * Returns a Number that represents the coordinate of the touch delta,
           * that is the numerical difference between the previous state in time and the actual one.
           *
           * @method getDeltaX
           * @param {Number:Int || Object:Touch} index the index of the touch to get x coordinate from, or the touch object
           * @return {Number:Int}, the x coordinates of the touch delta;
          */},{key:'getDeltaX',value:function getDeltaX(index){var _this5=this;var val=void 0;if(typeof index==='number'){Object.keys(this.touches).forEach(function(identifier){var touch=_this5.touches[identifier];if(touch.index===index){val=touch.xDelta;}});}return val;}/**
           * Returns a Number that represents the coordinate of the touch delta,
           * that is the numerical difference between the previous state in time and the actual one.
           *
           * @method getDeltaY
           * @param {Number:Int || Object:Touch} index the index of the touch to get y coordinate from, or the touch object
           * @return {Number:Int}, the y coordinates of the touch delta;
          */},{key:'getDeltaY',value:function getDeltaY(index){var _this6=this;var val=void 0;if(typeof index==='number'){Object.keys(this.touches).forEach(function(identifier){var touch=_this6.touches[identifier];if(touch.index===index){val=touch.yDelta;}});}return val;}/**
           * Returns an object {x:Number, y:Number} that represents the coordinate of the touch delta,
           * that is the numerical difference between the previous state in time and the actual one.
           *
           * @method getDelta
           * @param {Number:Int || Object:Touch} index the index of the touch to get coordinates from, or the touch object
           * @return {Object} {x:Number, y:Number}, the x & y coordinates of the touch delta;
          */},{key:'getDelta',value:function getDelta(index){var _this7=this;var val=void 0;if(typeof index==='number'){Object.keys(this.touches).forEach(function(identifier){var touch=_this7.touches[identifier];if(touch.index===index){val={x:touch.xDelta,y:touch.yDelta};}});}return val;}/**
           * Returns a Number that represents the x coordinate of the touch offset,
           * that is the numerical difference between the start point of the touch and the actual one.
           *
           * @method getOffsetX
           * @param {Number:Int || Object:Touch} index the index of the touch to get x offset coordinate from, or the touch object
           * @return {Number} the x coordinates of the touch offset;
          */},{key:'getOffsetX',value:function getOffsetX(index){var _this8=this;var val=void 0;Object.keys(this.touches).forEach(function(identifier){var touch=_this8.touches[identifier];if(touch.index===index){val=touch.offsetX;}});return val;}/**
           * Returns a Number that represents the y coordinate of the touch offset,
           * that is the numerical difference between the start point of the touch and the actual one.
           *
           * @method getOffsetY
           * @param {Number:Int || Object:Touch} index the index of the touch to get y offset coordinate from, or the touch object
           * @return {Number} the y coordinates of the touch offset;
          */},{key:'getOffsetY',value:function getOffsetY(index){var _this9=this;var val=void 0;Object.keys(this.touches).forEach(function(identifier){var touch=_this9.touches[identifier];if(touch.index===index){val=touch.offsetY;}});return val;}/**
           * Returns an object {x:Number, y:Number} that represents the coordinate of the touch offset,
           * that is the numerical difference between the start point of the touch and the actual one.
           *
           * @method getOffset
           * @param {Number:Int || Object:Touch} index the index of the touch to get offset coordinate from, or the touch object
           * @return {Object} {x:Number, y:Number}, the x & y coordinates of the touch offset;
          */},{key:'getOffset',value:function getOffset(index){var _this10=this;var val=void 0;Object.keys(this.touches).forEach(function(identifier){var touch=_this10.touches[identifier];if(touch.index===index){val={x:touch.offsetX,y:touch.offsetY};}});return val;}/**
           *Returns a Number that represents the pinch touch move,
           *that is the numerical difference between the start point of 2 touches and the actual one.
           *
           * @method getPinch
           * @return {Number} the pinch delta value;
          */},{key:'getPinch',value:function getPinch(){var touchNb=0;//We must use a min of 2 touches
if(this.count>=2){//if don't have the touches, find and save them, else compute start point
if(this.pinchTouches[1]===undefined){//loop through touches to find at least 2
for(var obj in this.touches){if(touchNb<2){//gather 2 touch if not already in memory
this.pinchTouches[touchNb]=this.touches[obj];touchNb++;}if(touchNb===2){this.pinchActive=true;//we have 2 touches in memory, compute startpoint
this.pinchStart=_Math.dist(this.pinchTouches[0].x,this.pinchTouches[0].y,this.pinchTouches[1].x,this.pinchTouches[1].y);//debug.log("pinchStart at break",this.pinchStart);
break;//2 touches found, break loop;
}}}//pinch computation's ready to be done
this.pinch=_Math.dist(this.pinchTouches[0].x,this.pinchTouches[0].y,this.pinchTouches[1].x,this.pinchTouches[1].y)-this.pinchStart;//we have 2 touches in memory, compute startpoint
this.pinchStart=_Math.dist(this.pinchTouches[0].x,this.pinchTouches[0].y,this.pinchTouches[1].x,this.pinchTouches[1].y);}else{this.pinchStart=0;this.pinch=0;this.pinchTouches=[];}return this.pinch;}}]);return Touch;}(Component);var _createClass$26=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$7=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$31(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$17(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$17(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Fired when a new acceleration is available
   * @event acceleration
   */var EVT_ACC='acceleration';/**
   * Fired when a new acceleration including gravity is available
   * @event accelerationIncludingGravity
   */var EVT_ACC_GRAVITY='accelerationIncludingGravity';/**
   * Fired when a new gravity vector is available
   * @event accelerationGravityVector
   */var EVT_ACC_GRAVITY_VECTOR='accelerationGravityVector';/**
   * Fired when a new rotationrate data is available
   * @event rotationrate
   */var EVT_ROTATION_RATE='rotationrate';var Motion=function(_Component){_inherits$17(Motion,_Component);/**
       * @class Motion
       * @constructor
       * Motion gives access to the embbeded accelerometers data of you device.
      */function Motion(param){_classCallCheck$31(this,Motion);/**
           * true if the acceloremeters are available on the device, false otherwise
           * @property {Boolean} _accAvailable
          */var _this=_possibleConstructorReturn$17(this,(Motion.__proto__||Object.getPrototypeOf(Motion)).call(this,param));_this._accAvailable=window.DeviceMotionEvent;return _this;}_createClass$26(Motion,[{key:'setup',value:function setup(){this.rotationRate=new Vector3$1();this.acc=new Vector3$1();this.userAcc=new Vector3$1();this.smoothedAcc=new Vector3$1();this.accel=[0,0,0];this.kFilteringFactor=0.07;this.gravityVector=new Vector3$1();}},{key:'on',value:function on(){var _this2=this;if(this._accAvailable){_get$7(Motion.prototype.__proto__||Object.getPrototypeOf(Motion.prototype),'on',this).call(this);window.addEventListener('devicemotion',function(event){return _this2.onDeviceMotion(event);});}else{debug.info("this device doesn't have acceloremeters");}}},{key:'off',value:function off(){var _this3=this;_get$7(Motion.prototype.__proto__||Object.getPrototypeOf(Motion.prototype),'off',this).call(this);window.removeEventListener('devicemotion',function(event){return _this3.onDeviceMotion(event);});}},{key:'onDeviceMotion',value:function onDeviceMotion(event){var _this4=this;//Chrome manage everything reversed to Safari. We use Safari as 1, Chrome as -1
var reverse=1;if(Device.getOS()==='Android'){reverse=-1;}if(event.acceleration){this.userAcc.x=event.acceleration.x*reverse;this.userAcc.y=event.acceleration.y*reverse;this.userAcc.z=event.acceleration.z*reverse;//if the device doesn't support acceleration without gravity
if(event.acceleration.x===null||event.acceleration.x===undefined){this.computeUserAcc();}this.events.trigger(EVT_ACC,this.userAcc);}if(event.accelerationIncludingGravity){this.acc.x=event.accelerationIncludingGravity.x*reverse;this.acc.y=event.accelerationIncludingGravity.y*reverse;this.acc.z=event.accelerationIncludingGravity.z*reverse;//propagate event to user script
this.events.trigger(EVT_ACC_GRAVITY,this.acc);//propagate custom event to user script
this.events.trigger(EVT_ACC_GRAVITY_VECTOR,function(){_this4.computeGravityVector();return _this4.gravityVector;});}if(event.rotationRate){this.rotationRate.x=event.rotationRate.alpha;this.rotationRate.y=event.rotationRate.beta;this.rotationRate.z=event.rotationRate.gamma;//propagate custom event to user script
this.events.trigger(EVT_ROTATION_RATE,this.rotationRate);}}/**
          * Compute the values for the acc on devices that gives "undefined" for the event.acceleration prop (some Android)
          * @private
          * @method computeUserAcc
          */},{key:'computeUserAcc',value:function computeUserAcc(){this.accel[0]=this.acc.x*this.kFilteringFactor+this.accel[0]*(1.0-this.kFilteringFactor);this.accel[1]=this.acc.y*this.kFilteringFactor+this.accel[1]*(1.0-this.kFilteringFactor);this.accel[2]=this.acc.z*this.kFilteringFactor+this.accel[2]*(1.0-this.kFilteringFactor);/*debug.log( this.acc.x - this.accel[0],
                              this.acc.y - this.accel[1],
                              this.acc.z - this.accel[2]);*/this.userAcc.x=this.acc.x-this.accel[0];this.userAcc.y=this.acc.y-this.accel[1];this.userAcc.z=this.acc.z-this.accel[2];}/**
          * Method to compute the gravity orientation vector based on accel including gravity.
          * The result can also be get through the event onAccelerationGravityVector
          *
          * @method computeGravityVector
          * @private
          */},{key:'computeGravityVector',value:function computeGravityVector(){this.accel[0]=this.acc.x*this.kFilteringFactor+this.accel[0]*(1.0-this.kFilteringFactor);this.accel[1]=this.acc.y*this.kFilteringFactor+this.accel[1]*(1.0-this.kFilteringFactor);this.accel[2]=this.acc.z*this.kFilteringFactor+this.accel[2]*(1.0-this.kFilteringFactor);this.gravityVector.z=this.accel[2]*(360/(2*Math.PI))*1.1;this.gravityVector.x=this.accel[1]*(360/(2*Math.PI))*1.1;this.gravityVector.y=Math.atan2(this.accel[0],this.accel[1])*(180.0/Math.PI);}/**
           * Method to get the accel values without gravity.
           * The result can also be get through the event onAcceleration
           *
           * @method getUserAcc
           * @return {Object} userAcc object composed by x, y & z components
          */},{key:'getUserAcc',value:function getUserAcc(){return this.userAcc;}/**
           * Method to get the accel values including gravity.
           * The result can also be get through the event onAccelerationIncludingGravity
           *
           * @method getAcc
           * @return {Object} acc object composed by x, y & z components
          */},{key:'getAcc',value:function getAcc(){return this.acc;}/**
           * Method to get the gravity orientation vector based on accel including gravity.
           * The result can also be get through the event onAccelerationGravityVector
           *
           * @method getGravityVector
           * @return {Object} gravityVector object composed by x, y & z components
          */},{key:'getGravityVector',value:function getGravityVector(){return this.gravityVector;}/**
           * Method to get the filtered accel including gravity.
           *
           * @method getSmoothedAcc
           * @param {Number} factor The number to use for the filtering aglorithm (0.07 gives good results)
           * @return {Object} smoothedAcc object composed by x, y & z components
          */},{key:'getSmoothedAcc',value:function getSmoothedAcc(factor){this.smoothedAcc.x=this.acc.x*factor+this.smoothedAcc.x*(1.0-factor);this.smoothedAcc.y=this.acc.y*factor+this.smoothedAcc.y*(1.0-factor);this.smoothedAcc.z=this.acc.z*factor+this.smoothedAcc.z*(1.0-factor);return this.smoothedAcc;}}]);return Motion;}(Component);var _createClass$27=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$8=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$32(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$18(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$18(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Fired when a new orientation is available
   * @event deviceorientation
   */var EVT_DEVICE_ORIENTATION='deviceorientation';/**
   * Fired when calibration is required
   * @event compassneedscalibration
   */var EVT_COMPASS_CALIBRATION='compassneedscalibration';var Orientation=function(_Component){_inherits$18(Orientation,_Component);/**
       * Uses built-in compass and/or gyroscope to produce orientation Data. Some heplers functions are in there to generate quarternion that can be applied on a camera or a 3D object's transform.
       *
       * @class Orientation
       * @extends Component
       * @constructor
      */function Orientation(params){_classCallCheck$32(this,Orientation);/**
          * true if the magnetometer/compass is available on the device, false otherwise
          * @property {Boolean} compassAvailable
          */var _this=_possibleConstructorReturn$18(this,(Orientation.__proto__||Object.getPrototypeOf(Orientation)).call(this,params));_this.compassAvailable=window.DeviceOrientationEvent;return _this;}_createClass$27(Orientation,[{key:'setup',value:function setup(){this.compass=new Vector3$1();this.deviceRotationMatrix=new Matrix4$1();this.deviceHeading=null;this.deviceAttitude=null;this.deviceBank=null;}},{key:'on',value:function on(){var _this2=this;_get$8(Orientation.prototype.__proto__||Object.getPrototypeOf(Orientation.prototype),'on',this).call(this);window.addEventListener('deviceorientation',function(event){return _this2.onDeviceOrientation(event);});window.addEventListener('compassneedscalibration',function(event){return _this2.onCompassCalibration(event);});}},{key:'off',value:function off(){var _this3=this;_get$8(Orientation.prototype.__proto__||Object.getPrototypeOf(Orientation.prototype),'off',this).call(this);window.removeEventListener('deviceorientation',function(event){return _this3.onDeviceOrientation(event);});window.removeEventListener('compassneedscalibration',function(event){return _this3.onCompassCalibration(event);});}/**
           * Returns the compass/gyro current raw values.
           * This can also be get with the onDeviceOrientation event from the user script
           *
           * @method getDeviceOrientation
           * @return {Object} compass object with x, y & z components
          */},{key:'getDeviceOrientation',value:function getDeviceOrientation(){return this.compass;}/**
          * Creates a Quaternion that matches the device's current orientation. Calculated in radians.
          * @private
          * @method createGyroQuaternion
          * @param {Number} alpha the angle to use for the quaternion creation
          * @param {Number} beta  the angle to use for the quaternion creation
          * @param {Number} gamma the angle to use for the quaternion creation
          * @param {Object} screenOrientation orientation of the screen in degree! Can be very different depending on the plateform...
          * @author Rich Tibbett, https://github.com/richtr/threeVR
          */},{key:'createGyroQuaternion',value:function createGyroQuaternion(alpha,beta,gamma,screenOrientation){if(alpha!==0&&beta!==0&&gamma!==0){var finalQuaternion=new Quaternion$1();var deviceEuler=new Euler$1();var screenTransform=new Quaternion$1();var worldTransform=new Quaternion$1(-Math.sqrt(0.5),0,0,Math.sqrt(0.5));// - PI/2 around the x-axis
var minusHalfAngle=0;deviceEuler.set(beta,alpha,-gamma,'YXZ');finalQuaternion.setFromEuler(deviceEuler);minusHalfAngle=-screenOrientation/2;screenTransform.set(0,Math.sin(minusHalfAngle),0,Math.cos(minusHalfAngle));finalQuaternion.multiply(screenTransform);finalQuaternion.multiply(worldTransform);return finalQuaternion;}return new Quaternion$1(0,0,0);// we have nothing to give
}/**
           * Can be used in the transform of a perspective camera to produce a "blind camera" effect : move the screen around to frame a part of the current scene like if you were using a camera.
           *
           * @method getGyroQuaternion
           */},{key:'getGyroQuaternion',value:function getGyroQuaternion(){if(this.compassAvailable&&this.compass.alpha){var quaternion=this.createGyroQuaternion(_Math.degToRad(this.compass.alpha),_Math.degToRad(this.compass.beta),_Math.degToRad(this.compass.gamma),_Math.degToRad(window.orientation||0));return quaternion;}return null;}/**
          * compass calibration event callback
          * @private
          * @method compassCalibrationHandler
          * @param {Object} event
          */},{key:'onCompassCalibration',value:function onCompassCalibration(event){//alert("onCompassCalibration call", event);
this.events.trigger(EVT_COMPASS_CALIBRATION,event);}/**
          * callback used to access compass event.
          *
          * @private
          * @method onDeviceorientation
          * @param {Object} event
          */},{key:'onDeviceOrientation',value:function onDeviceOrientation(event){this.compass.alpha=event.alpha;//x
this.compass.beta=event.beta;//y
this.compass.gamma=event.gamma;//z
//this.compass.heading = event.compassHeading || event.webkitCompassHeading || event.mozCompassHeading || event.ieCompassHeading;// || -event.alpha;
//When the device doesn't generate a heading information, find a substitute.
if(event.webkitCompassHeading){this.compass.heading=event.webkitCompassHeading;}else{this.compass.heading=-event.alpha;}this.events.trigger(EVT_DEVICE_ORIENTATION,this.compass);}//FIXME (may be garbage code...)
},{key:'computeRotationMatrix',value:function computeRotationMatrix(alpha,beta,gamma){var _x=beta?_Math.degToRad(beta):0;// beta value
var _y=gamma?_Math.degToRad(gamma):0;// gamma value
var _z=alpha?_Math.degToRad(alpha):0;// alpha value
var cX=Math.cos(_x);var cY=Math.cos(_y);var cZ=Math.cos(_z);var sX=Math.sin(_x);var sY=Math.sin(_y);var sZ=Math.sin(_z);//
// ZXY rotation matrix construction.
//
var m11=cZ*cY-sZ*sX*sY;var m12=-cX*sZ;var m13=cY*sZ*sX+cZ*sY;var m21=cY*sZ+cZ*sX*sY;var m22=cZ*cX;var m23=sZ*sY-cZ*cY*sX;var m31=-cX*sY;var m32=sX;var m33=cX*cY;this.deviceRotationMatrix.set(m11,m21,m31,0,m12,m22,m32,0,m13,m23,m33,0,0,0,0,1);if(m12>0.998){// singularity at north pole
this.deviceHeading=Math.atan2(m31,m33);this.deviceAttitude=Math.PI/2;this.deviceBank=0;return;}if(m12<-0.998){// singularity at south pole
this.deviceHeading=Math.atan2(m31,m33);this.deviceAttitude=-Math.PI/2;this.deviceBank=0;return;}this.deviceHeading=Math.atan2(-m13,m11);this.deviceBank=Math.atan2(-m32,m22);this.deviceAttitude=Math.asin(m12);}},{key:'updateDeviceRotationMatrix',value:function updateDeviceRotationMatrix(){this.computeRotationMatrix(this.compass.alpha,this.compass.beta,this.compass.gamma);}},{key:'getDeviceRotationMatrix',value:function getDeviceRotationMatrix(){this.updateDeviceRotationMatrix();return this.deviceRotationMatrix;}}]);return Orientation;}(Component);var _createClass$28=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$9=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$33(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$19(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$19(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
   * Fired when the location has been updated
   * @event locationupdated
   */var EVT_LOC_UPDATED='locationupdated';/**
   * Fired when the location update generated an error
   * @event locationerror
   */var EVT_LOC_ERROR='locationerror';var GPS=function(_Component){_inherits$19(GPS,_Component);/**
       * @class GPS
       * @constructor
       *
       * @param {Object} params Config parameters
       * @param {Object} params.context the Mobilizing context this Input instance is linked to
       * @param {Boolean} params.enableHighAccuracy Boolean to activate accurate location (eats more battery and takes time)
       * @param {Number} params.maximumAge Number of millisecond to define the maximum age of the geolocation data (default = 500000)
       * @param {Number} params.timeout timeout of the location service in millisecond
       */function GPS(params){_classCallCheck$33(this,GPS);/**
          * Accurate location (eats more battery and takes time)
          * @private
          * @property {Boolean} _enableHighAccuracy
          */var _this=_possibleConstructorReturn$19(this,(GPS.__proto__||Object.getPrototypeOf(GPS)).call(this,params));_this._enableHighAccuracy=getOrDefault(params,'enableHighAccuracy',false);/**
          * Number of millisecond to define the maximum age of the geolocation data
          * @private
          * @property {Number} _maximumAge
          */_this._maximumAge=getOrDefault(params,'maximumAge',undefined);/**
          * Timeout of the location service in millisecond
          * @private
          * @property {Number} _timeout
          */_this._timeout=getOrDefault(params,'timeout',undefined);/**
           * true if the GPS is available on the device, false otherwise
           * @private
           * @property {Boolean} _GPSAvailable
          */_this._GPSAvailable=navigator!==undefined&&'geolocation'in navigator;return _this;}/**
      * Set the GPS up.
      * @method setup
      */_createClass$28(GPS,[{key:'setup',value:function setup(){/**
               * Object containing the informations given by the GPS. Used internally.
               * @property {Object} _location
               * @private
              */this._location={latitude:null,longitude:null,altitude:null,accuracy:null,altitudeAccuracy:null,heading:null,speed:null,timestamp:null};// this._watchID;
}/**
          * Activates the component
          * @method on
          */},{key:'on',value:function on(){var _this2=this;if(this._GPSAvailable){_get$9(GPS.prototype.__proto__||Object.getPrototypeOf(GPS.prototype),'on',this).call(this);var positionOptions={enableHighAccuracy:this._enableHighAccuracy,timeout:this._timeout,maximumAge:this._maximumAge};this._watchID=navigator.geolocation.watchPosition(function(event){return _this2.updateLocationCallBack(event);},function(event){return _this2.updateLocationErrorCallBack(event);},positionOptions);}else{debug.info('this device has no GPS!');}}/**
          * Deactivate the component
          * @method off
          */},{key:'off',value:function off(){_get$9(GPS.prototype.__proto__||Object.getPrototypeOf(GPS.prototype),'off',this).call(this);navigator.geolocation.clearWatch(this._watchID);}/**
          * Enable HighAccuracy. Requieres to set the component off once then to set it on again to use the new value.
          * @method setHighAccuracy
          * @param {Boolean} val Enable or not high accuracy
          */},{key:'setEnableHighAccuracy',value:function setEnableHighAccuracy(val){this._enableHighAccuracy=val;}/**
          * Set the time out for location update. Requieres to set the component off once then to set it again on to use the new value.
          * @method setTimeout
          * @param {Number} val the new value
          */},{key:'setTimeout',value:function setTimeout(val){this._timeout=val;}/**
          * Set the maximum age of a location data. Requieres to set the component off once then to set it on again to use the new value.
          * @method setMaximumAge
          * @param {Number} val the new value
          */},{key:'setMaximumAge',value:function setMaximumAge(val){this._maximumAge=val;}/**
            * returns the most recent location data. Location service MUST be activated on the device, or errors will get out from the callbacks!
            * The return objects contains the standard HTML5 properties for geolocation :
            *
            *     location.longitude
            *     location.latitude
            *     location.altitude
            *     location.accuracy
            *     location.altitudeAccuracy
            *     location.heading
            *     location.speed
            *     location.timestamp
            *
            * @method getLocation
            * @return {Object} the location object updated with the most recent data.
            */},{key:'getLocation',value:function getLocation(){if(this._active){return this._location;}debug.warn('geolocation is off, turn it on with context.input.setGeolocationStatus(true);');return null;}/**
           * Listener for the update of the location object with the most recent data.
           *
           * @method updateLocationCallBack
           * @param {Object} position the HTML5 position object to use for the Mobilizing location object's update
           * @private
          */},{key:'updateLocationCallBack',value:function updateLocationCallBack(position){//debug.log(position);
this._location.longitude=position.coords.longitude;this._location.latitude=position.coords.latitude;this._location.altitude=position.coords.altitude;this._location.accuracy=position.coords.accuracy;this._location.altitudeAccuracy=position.coords.altitudeAccuracy;this._location.heading=position.coords.heading;this._location.speed=position.coords.speed;this._location.timestamp=position.timestamp;this._location.error='no error';this.events.trigger(EVT_LOC_UPDATED,this._location);}/**
           * Listener for the update errors of the location object with the most recent data.
           *
           * @method updateLocationErrorCallBack
           * @param error
           * @private
          */},{key:'updateLocationErrorCallBack',value:function updateLocationErrorCallBack(error){if(error.code===1){console.error('location permission denied');this._location.error='location permission denied';}else if(error.code===2){console.error('location unavailable');this._location.error='location unavailable';}else if(error.code===3){console.error('location timeout');this._location.error='location timeout';}this.events.trigger(EVT_LOC_ERROR,this._location.error);}/**
           * reset the location object to avoid bugs
           * @private
           * @deprecated
           * @method resetLocation
           */},{key:'resetLocation',value:function resetLocation(){this._location={latitude:null,longitude:null,altitude:null,accuracy:null,altitudeAccuracy:null,heading:null,speed:null,timestamp:null};}}]);return GPS;}(Component);var _STATICS$1={};_STATICS$1.zoom=1;_STATICS$1.worldSize=512*Math.pow(2,_STATICS$1.zoom);/**
  * Some GPS coordinates convertion tools to use maps in Mobilizing.js
  * @class GPSUtils
  * @constructor
  * @static
  */var GPSUtils=function(){function GPSUtils(){_classCallCheck$33(this,GPSUtils);}_createClass$28(GPSUtils,null,[{key:'getPixelsCoordsFromOSMLngLat',/**
          * Converts longitude and latitude coords (from an OpenStreetMap map) into absolute pixels coords. This method don't calculate the pixels coords within a given map bound's! Use getCoordinateInMap for this.
          * @static
          * @method getPixelsCoordsFromOSMLngLat
          * @param {Number} longitute longitute
          * @param {Number} latitude latitude
          * @param {Number} zoom the zoom factor fo this map
          */value:function getPixelsCoordsFromOSMLngLat(longitute,latitude,zoom){if(zoom){_STATICS$1.zoom=zoom;_STATICS$1.worldSize=512*Math.pow(2,_STATICS$1.zoom);}return{x:GPSUtils.lngX(longitute),y:GPSUtils.latY(latitude)};}/**
          * Compute GPS coordinates into pixels x, y coordinates in a map. Here, we adopt the OSM standard for mappinp. Therefore, you should generate your bitmap earth map with a tool using OSM tiles (like MapBox, TileMill). You should give the zoom factor and the map bounds (in lognititude and latitude) to this method for the calculation to be effective
          * @static
          * @method getCoordinateInMap
          * @param {Number} longitute
          * @param {Number} latitude
          * @param {Number} zoom zoom factor fo this map
          * @param {Array} mapCoord MapBox/TileMill map coords array, like [-180,-85.0511,180,85.0511]
          * @param {Number} mapWidth the map width in pixels
          * @param {Number} mapHeight the map height in pixels
          */},{key:'getCoordinateInMap',value:function getCoordinateInMap(longitute,latitude,mapCoord,mapWidth,mapHeight,zoom){if(zoom){_STATICS$1.zoom=zoom;}//construct local variable to simplify expressions writing
var leftLong=mapCoord[0];var bottomLat=mapCoord[1];var rightLong=mapCoord[2];var topLat=mapCoord[3];//construct the corners pixel coordinates
var topRight=GPSUtils.getPixelsCoordsFromOSMLngLat(rightLong,topLat);var topLeft=GPSUtils.getPixelsCoordsFromOSMLngLat(leftLong,topLat);var bottomRight=GPSUtils.getPixelsCoordsFromOSMLngLat(rightLong,bottomLat);// let bottomLeft = GPSUtils.getPixelsCoordsFromOSMLngLat(leftLong, bottomLat);
var absCoord=GPSUtils.getPixelsCoordsFromOSMLngLat(longitute,latitude);var coords={x:_Math.map(absCoord.x,topRight.x,topLeft.x,mapWidth/2,-mapHeight/2),y:_Math.map(absCoord.y,topRight.y,bottomRight.y,mapWidth/2,-mapHeight/2)};return coords;}/**
           * latitude to absolute x coord
           * @static
           * @method lngX
           * @param {Number} lon
           * @return {Number} pixel coordinate
           */},{key:'lngX',value:function lngX(lng){return(180+lng)*_STATICS$1.worldSize/360;}/**
           * latitude to absolute y coord
           * @static
           * @method latY
           * @param {Number} lat
           * @return {Number} pixel coordinate
           */},{key:'latY',value:function latY(lat){var y=180/Math.PI*Math.log(Math.tan(Math.PI/4+lat*Math.PI/360));return(180-y)*_STATICS$1.worldSize/360;}},{key:'xLng',value:function xLng(x){return x*360/_STATICS$1.worldSize-180;}},{key:'yLat',value:function yLat(y){var y2=180-y*360/_STATICS$1.worldSize;return 360/Math.PI*Math.atan(Math.exp(y2*Math.PI/180))-90;}/**
          * Convert GPS coords to cartesian coords. NB : this algorithm is adapted to three.js geoms!
          * @static
          * @property getPolarFromLngLat
          * @param {Numbe} longitude
          * @param {Numbe} latitude
          * @param {Numbe} radius
          * @return {Object} {x, y, z} coordinates
          */},{key:'getPolarFromLngLat',value:function getPolarFromLngLat(longitude,latitude,radius){var lng=_Math.degToRad(longitude+180);var lat=_Math.degToRad(90-latitude);var x=-(radius*Math.cos(lng)*Math.sin(lat));var y=radius*Math.cos(lat);var z=radius*Math.sin(lat)*Math.sin(lng);return{x:x,y:y,z:z};}}]);return GPSUtils;}();var _createClass$29=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$34(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/*
   * MeshFX provides a set of static methods to work on 3D models verticies and to apply various effects on it.
   *
   * @class MeshFX
   */var MeshFX=function(){function MeshFX(){_classCallCheck$34(this,MeshFX);}_createClass$29(MeshFX,null,[{key:'Noise',/*
          * Noise the vertices of the Mesh
          * @static
          * @method Noise
          * @param {Mesh} mesh
          * @param {Vector3} amount
          */value:function Noise(mesh,amount){var vertices=mesh.getVertices();for(var i=0;i<vertices.length;++i){var noise=new Vector3$1(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5);vertices[i]=new Vector3$1(vertices[i].x+noise.x*amount,vertices[i].y+noise.y*amount,vertices[i].z+noise.z*amount);}mesh.setVertices(vertices);}},{key:'Nothing',value:function Nothing(mesh){var vertices=mesh.getVertices();for(var i=0;i<vertices.length;++i){vertices[i]=new Vector3$1(vertices[i].x,vertices[i].y,vertices[i].z);}mesh.setVertices(vertices);}/*
          * Offsets the vertices of the Mesh
          * @static
          * @method Offset
          * @param {Mesh} mesh
          * @param {Vector3} offset
          */},{key:'Offset',value:function Offset(mesh,offset){var vertices=mesh.getVertices();for(var i=0;i<vertices.length;++i){vertices[i]=new Vector3$1(vertices[i].x+offset.x,vertices[i].y+offset.y,vertices[i].z+offset.z);}mesh.setVertices(vertices);}/*
          * Scales the vertices of the Mesh
          * @static
          * @method Scale
          * @param {Mesh} mesh
          * @param {Vector3} scale
          */},{key:'Scale',value:function Scale(mesh,scale){var vertices=mesh.getVertices();for(var i=0;i<vertices.length;++i){vertices[i]=new Vector3$1(vertices[i].x*scale.x,vertices[i].y*scale.y,vertices[i].z*scale.z);}mesh.setVertices(vertices);}}]);return MeshFX;}();var _createClass$30=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$35(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$20(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$20(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Midi=function(_Component){_inherits$20(Midi,_Component);/**
       Gives access to the midi devices. This class requires the Web MIDI API to operate properly.
        @class Midi
       @constructor
       @param {Object} params the parameters object
       @param {String} params.in The Midi IN interface name we want to open.
       @param {String} params.out The Midi OUT interface name we want to open.
       @param {Function} params.onMidiIn The Midi IN callback we want to be called on a midi in event.
        @requires Web Midi API
       */function Midi(params){_classCallCheck$35(this,Midi);var _this=_possibleConstructorReturn$20(this,(Midi.__proto__||Object.getPrototypeOf(Midi)).call(this,params));_this.midioutname=params.out;_this.midiinname=params.in;//callbacks
_this.onMidiIn=params.onMidiIn;debug.log('params.onMidiIn='+params.onMidiIn);debug.log('this.onMidiIn='+_this.onMidiIn);if(navigator.requestMIDIAccess){navigator.requestMIDIAccess().then(_this.onMIDIInit.bind(_this),_this.onMIDIReject.bind(_this));}else{console.warn('No MIDI support present in your browser. Try in another browser.');}return _this;}/**
       Web MIDI API success callback.
       @method onMIDIInit
       @private
       @param {Object} midi
       */_createClass$30(Midi,[{key:'onMIDIInit',value:function onMIDIInit(midi){this.midiAccess=midi;this.hookUpMIDI();this.midiAccess.onstatechange=this.hookUpMIDI;}/**
           Web MIDI API failure callback.
           @method onMIDIReject
           @private
           @param {Object} err
           */},{key:'onMIDIReject',value:function onMIDIReject(err){alert('\n            The MIDI system failed to start.\n            You\'re gonna have a bad time.\n            Error: '+err.message+'\n        ');}/**
          * hookUpMIDI
          * @method hookUpMIDI
          * @private
          */},{key:'hookUpMIDI',value:function hookUpMIDI(){if(this.midiinname!==undefined){var inputs=this.midiAccess.inputs.values();debug.log('MIDI inputs on your system : ');for(var _input=inputs.next();_input&&!_input.done;_input=inputs.next()){debug.log('input=',_input);if(_input.value.name===this.midiinname){debug.log('found midi interface IN : '+_input.value.name);_input.value.onmidimessage=this.onMIDIMessage.bind(this);}}}if(this.midioutname!==undefined){var outputs=this.midiAccess.outputs.values();debug.log('MIDI outputs on your system : ');for(var output=outputs.next();output&&!output.done;output=outputs.next()){debug.log('output=',output);if(output.value.name===this.midioutname){debug.log('found midi interface OUT : '+output.value.name);this.midioutput=output.value;}}}}/**
          * onMIDIMessage
          * @method onMIDIMessage
          * @param {Object} event MIDI event
          * @private
          */},{key:'onMIDIMessage',value:function onMIDIMessage(event){debug.log('this.onMidiIn='+this.onMidiIn);if(this.onMidiIn!==undefined){//channel message data1 data2
var message=event.data[0]&0xf0;var channel=event.data[0]-message;var data1=event.data[1];var data2=event.data[2];this.onMidiIn(channel,message,data1,data2);}}/**
           Sends a Control Change MIDI message.
           @method ControlChange
           @param {Number} channel MIDI channel [0-15]
           @param {Number} cc ControlChange number [0-127]
           @param {Number} val ControlChange value [0-127]
           @example
               midi.ControlChange(2,11,50);
           */},{key:'ControlChange',value:function ControlChange(channel,cc,val){if(this.midioutput===undefined){return;}var ccMessage=void 0;var m=0xB0+channel;ccMessage=[m,cc,val];this.midioutput.send(ccMessage);}/**
           Sends a NoteOn MIDI message.
           @method NoteOn
           @param {Number} channel MIDI channel [0-15]
           @param {Number} note Midi Note number [0-127]
           @param {Number} vel note MIDI velocity [0-127]
           @example
               midi.NoteOn(0,60,127);
           */},{key:'NoteOn',value:function NoteOn(channel,note,vel){if(this.midioutput===undefined){return;}var ccMessage=void 0;var m=0x90+channel;ccMessage=[m,note,vel];this.midioutput.send(ccMessage);}/**
           Sends a NoteOff MIDI message.
           @method NoteOff
           @param {Number} channel MIDI channel [0-15]
           @param {Number} note Midi Note number [0-127]
           @param {Number} vel note MIDI velocity [0-127]
           @example
               midi.NoteOff(0,60,0);
           */},{key:'NoteOff',value:function NoteOff(channel,note,vel){if(this.midioutput===undefined){return;}var ccMessage=void 0;var m=0x80+channel;ccMessage=[m,note,vel];this.midioutput.send(ccMessage);}}]);return Midi;}(Component);/**
   * Note On
   *
   * @property NoteOn
   * @type Number
   * @static
   * @final
   */Midi.NoteOn=144;/**
   * Note Off
   *
   * @property NoteOff
   * @type Number
   * @static
   * @final
   */Midi.NoteOff=128;/**
   * After touch
   *
   * @property Aftertouch
   * @type Number
   * @static
   * @final
   */Midi.Aftertouch=160;/**
   * Control change
   *
   * @property ControlChange
   * @type Number
   * @static
   * @final
   */Midi.ControlChange=176;/**
   * Program change
   *
   * @property ProgramChange
   * @type Number
   * @static
   * @final
   */Midi.ProgramChange=192;var _createClass$31=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$36(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$21(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$21(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/*
   * Profiler class should not be used by users
   *
   * @class Profiler
   * @private
   */var Profiler=function(_Component){_inherits$21(Profiler,_Component);/**
       * Profiler is a Profiler component.
       *
       *
       * @example
       *     //to do
       *
       * @class Profiler
       * @constructor
       * @extends Component
       * @param {Object} params Config parameters
      */function Profiler(params){_classCallCheck$36(this,Profiler);var _this=_possibleConstructorReturn$21(this,(Profiler.__proto__||Object.getPrototypeOf(Profiler)).call(this,params));_this.timers=[];_this.current_frame=0;_this.last_time=0;_this.initialize();return _this;}_createClass$31(Profiler,[{key:'initialize',value:function initialize(){this.last_time=this.getTime();}},{key:'update',value:function update(){var t=this.getTime();var dt=t-this.last_time;this.last_time=t;var frame=this.timers[this.current_frame];if(!frame){frame={};this.timers[this.current_frame]=frame;}this.timers[this.current_frame].dt=dt;this.current_frame++;this.logTimers();}},{key:'startTimer',value:function startTimer(){//var t = Profiler.getTime();
//Profiler.timers[Profiler.current_frame].
}},{key:'getTime',value:function getTime(){return Date.now();}},{key:'logTimers',value:function logTimers(){console.log('Profiler timers : '+this.timers.map(function(timer){return timer.dt;}).join(' '));}}]);return Profiler;}(Component);var _createClass$32=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$37(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Runner=function(){/**
       A runner is used to instanciate a Mobilizing.js user's script inside a specific context. It is requiered to use a Runner to initiate a context and to attech a script to it.
        @class Runner
       @constructor
       @param mobscriptinstance the Mobilizing.js script instance given by the user
       @param params JSON parameters to activate or not some Mobilizing.js modules when used in an other lib (i.e. CoSiMa)
       @param params.canvas canvas used by the engine
       @param params.callback a callback function that get called when the user script setup() is finished (function args are the Runner instance and the user script instance)
       @param params.inputEnabled enable the Mobilizing Input built-in manager
       @param params.audioEnabled enable the Mobilizing Audio manager
        @example
           <!DOCTYPE html>
              <html>
                  <head>
                      <meta http-equiv="Content-Type" content="text/html; charset=utf8">
                      <meta charset="UTF-8">
                      <meta name="viewport" content="height=device-height,width=device-width" />
                      <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
                      <meta name="apple-mobile-web-app-capable" content="yes">
                      <meta name="apple-touch-fullscreen" content="yes">
                       <link rel='stylesheet' href='css/main.css' />
                       <script src="../../vendor/three/three.min.js"></script>
                      <script src="../../vendor/opentype/opentype.js"></script>
                      <script src="../../dist/Mobilizing.js"></script>
                      <script src="script.js"></script>
                      <script>
                          //script.js is a user written script that must be instanciate for the Runner
                          var runner = new Mobilizing.Runner(new script());
                      </script>
                  </head>
              <body>
              </body>
            </html>
        @example
           function script()
           {
              this.setup = function(){
              //get the current context to work with
                  var context = this.getContext();
              };
               this.update = function(){
               };
            };
       */function Runner(params){_classCallCheck$37(this,Runner);this.callback=getOrDefault(params,'callback',undefined);this.context=params.context;if(document.readyState==='complete'){this.run();}else{window.addEventListener('load',this.run.bind(this));}this.frame=0;}/**
       * Runs the runner, init the context, create the preLoader and launch it, then execute the script
       *
       * @method run
       * @private
       */_createClass$32(Runner,[{key:'run',value:function run(){var _this=this;this.context.init();this.context.preLoad();this.context.loader.events.on('complete',function(){_this.startLoop();});this.context.loader.consumeAll();}/**
          * Starts the loop of the user's script, that is the update function
          * @method startLoop
          * @private
          */},{key:'startLoop',value:function startLoop(){this.context.setup();//call all components setups
this.loop();//start the main loop
}/**
          * onFrameBegin
          *
          * @method onFrameBegin
          */},{key:'onFrameBegin',value:function onFrameBegin(){//move to a component ?
this.frame++;if(this.context.stats!==undefined){this.context.stats.begin();}}/**
          * onFrameEnd
          *
          * @method onFrameEnd
          */},{key:'onFrameEnd',value:function onFrameEnd(){if(this.context.stats!==undefined){this.context.stats.end();}}/**
           * Runner's requestAnimationFrame loop manager
           *
           * @method loop
           * @private
           */},{key:'loop',value:function loop(){this.onFrameBegin();this.context.update();//engine update
//we don't need anymore user script update and 3D rendering (this is done internally by the context)
this.onFrameEnd();requestAnimationFrame(this.loop.bind(this));//schedule next
}}]);return Runner;}();var _createClass$34=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$39(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}// Events
/**
   * Fired when the readystate of the request changes
   * @event readystatechange
   * @param {Ajax} ajax The Ajax instance
   */var EVT_READYSTATE_CHANGE='readystatechange';/**
   * Fired when the request is opened
   * @event start
   * @param {Ajax} ajax The Ajax instance
   */var EVT_START$1='start';/**
   * Fired when an operation is in progress
   * @event progress
   * @param {Ajax} ajax The Ajax instance
   */var EVT_PROGRESS='progress';/**
   * Fired when the request has finished loading
   * @event load
   * @param {Ajax} ajax The Ajax instance
   * @param {Boolean} success Whether the request was successfull or not
   */var EVT_LOAD$1='load';/**
   * Fired when the request has finished loading and the status is greater or equal to 200 and less than 300, or is equal to 304
   * @event success
   * @param {Ajax} ajax The Ajax instance
   */var EVT_SUCCESS='success';/**
   * Fired when the request encountered an error, or if it finished loading with an error status
   * @event error
   * @param {Ajax} ajax The Ajax instance
   */var EVT_ERROR$1='error';var Ajax=function(){/**
      * Ajax is a helper class used to simplify the use of the XMLHttpRequest API
      *
      * @example
      *    //TODO
      *
      * @class Ajax
      * @constructor
      * @param {Object} params The parameters object
      * @param {String} params.url The URL to which the request is sent
      * @param {String} [params.method = "GET"] The method used for the request (GET, POST, or PUT)
      * @param {Object} [params.data = null] Data to be send along with the request
      * @param {Object} [params.headers = null] An object of header key/value pairs to send along with requests
      * @param {Boolean} [params.async = true] Whether the request is asynchronous or not
      * @param {Boolean} [params.autoSend = true] Whether the request should be automatically sent
      * @param {Boolean} [params.withCredentials = null] Whether cross-site Access-Control requests should be made using credentials such as cookies or authorization headers
      * @param {String} [params.responseType = ""] The responseType this request must return
      * @param {Number} [params.timeout = null] The number of milliseconds the request can take before automatically being terminated
      * @param {Function} [params.onReadyStateChange = null] A function to be called when the readyState of the request changes
      * @param {Function} [params.onStart = null] A function to be called when the request starts
      * @param {Function} [params.onProgress = null] A function to be called when the request progresses
      * @param {Function} [params.onLoad = null] A function to be called when the request finishes
      * @param {Function} [params.onSuccess = null] A function to be called if the request succeeds
      * @param {Function} [params.onError = null] A function to be called if the request fails
      */function Ajax(params){var _this=this;_classCallCheck$39(this,Ajax);this.url=params.url;this.method=getOrDefault(params,'method','GET');var data=getOrDefault(params,'data',null);var headers=getOrDefault(params,'headers',null);this.async=getOrDefault(params,'async',true);var autoSend=getOrDefault(params,'autoSend',true);var withCredentials=getOrDefault(params,'withCredentials',null);var timeout=getOrDefault(params,'timeout',null);var responseType=getOrDefault(params,'responseType','text');var onReadyStateChange=getOrDefault(params,'onReadyStateChange',null);var onStart=getOrDefault(params,'onStart',null);var onProgress=getOrDefault(params,'onProgress',null);var onLoad=getOrDefault(params,'onLoad',null);var onSuccess=getOrDefault(params,'onSuccess',null);var onError=getOrDefault(params,'onError',null);this.events=new EventEmitter({scope:this});this._xhr=new XMLHttpRequest();// bind custom callbacks to events
if(onReadyStateChange){this.events.on(EVT_READYSTATE_CHANGE,onReadyStateChange);}if(onStart){this.events.on(EVT_START$1,onStart);}if(onProgress){this.events.on(EVT_PROGRESS,onProgress);}if(onLoad){this.events.on(EVT_LOAD$1,onLoad);}if(onSuccess){this.events.on(EVT_SUCCESS,onSuccess);}if(onError){this.events.on(EVT_ERROR$1,onError);}this._xhr.addEventListener('readystatechange',this.onReadyStateChange.bind(this));// if this is a GET request, the data needs to be treated as URL parameters
if(this.method==='GET'&&data){var url_params=[];Object.keys(data).forEach(function(key){url_params.push(key+'='+encodeURIComponent(data[key]));});this.url+='?'+url_params.join('&');data=null;}this.setResponseType(responseType);// set custom headers
if(headers!==null){Object.keys(headers).forEach(function(name){_this.setRequestHeader(name,headers[name]);});}if(withCredentials!==null){this.setWithCredentials(withCredentials);}if(timeout!==null){this.setTimeout(timeout);}if(autoSend){this._xhr.open(this.method,this.url,this.async);this.send(data);}}/**
      * A helper function to create a request of type GET
      *
      * @method get
      * @static
      * @param {Object} params The parameters to send to the constructor
      */_createClass$34(Ajax,[{key:'onReadyStateChange',/**
          * The readystatechange event handler
          *
          * @method onReadyStateChange
          * @private
          */value:function onReadyStateChange(){this.events.trigger(EVT_READYSTATE_CHANGE,this);switch(this.getReadyState()){case XMLHttpRequest.OPENED:this.events.trigger(EVT_START$1,this);break;case XMLHttpRequest.LOADING:this.events.trigger(EVT_PROGRESS,this);break;case XMLHttpRequest.DONE:{var status=this.getStatus();var success=false;if(status===200&&status<300||status===304){success=true;}// local requests can return a status of 0 even if no error occurs
else if(status===0&&!this._xhr.error){success=true;}this.events.trigger(EVT_LOAD$1,this,success);if(success){this.events.trigger(EVT_SUCCESS,this);}else{this.events.trigger(EVT_ERROR$1,this);}break;}}}/**
          * Get the XMLHttpRequest instance for the request
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
          *
          * @method getXHR
          * @return {XMLHttpRequest} The XMLHttpRequest instance
          */},{key:'getXHR',value:function getXHR(){return this._xhr;}/**
          * Wrapping method for the setRequestHeader method of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
          *
          * @method setRequestHeader
          * @param {String} header The name of the header
          * @param {String} value The value of the header
          */},{key:'setRequestHeader',value:function setRequestHeader(header,value){this._xhr.setRequestHeader(header,value);}/**
          * Wrapping method for the withCredentials property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
          *
          * @method setWithCredentials
          * @param {Boolean} value Whether cross-site Access-Control requests should be made using credentials such as cookies or authorization headers
          */},{key:'setWithCredentials',value:function setWithCredentials(value){this._xhr.withCredentials=value;}/**
          * Wrapping method for the timeout property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
          *
          * @method setTimeout
          * @param {Number} value The number of milliseconds the request can take before automatically being terminated
          */},{key:'setTimeout',value:function setTimeout(value){this._xhr.timeout=value;}/**
          * Wrapping method for the responseType property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responsetype
          *
          * @method setResponseType
          * @param {String} value The type of response to be given by this request. Possible values are : "arraybuffer", "text", "json", "document", "blob"
          */},{key:'setResponseType',value:function setResponseType(value){this._xhr.responseType=value;}/**
          * Wrapping method for the send method of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
          *
          * @method send
          * @param {Mixed} data The data to send along the request
          */},{key:'send',value:function send(data){this._xhr.open(this.method,this.url,this.async);this._xhr.send(data);}/**
          * Wrapping method for abort method of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
          *
          * @method abort
          */},{key:'abort',value:function abort(){this._xhr.abort();}/**
          * Wrapping method for status property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
          *
          * @method getStatus
          * @return {Number} The status of the request
          */},{key:'getStatus',value:function getStatus(){return this._xhr.status;}/**
          * Wrapping method for statusText property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
          *
          * @method getStatusText
          * @return {DOMString} The status message of the request
          */},{key:'getStatusText',value:function getStatusText(){return this._xhr.statusText;}/**
          * Wrapping method for readyState property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
          *
          * @method getReadyState
          * @return {Number} The state the XMLHttpRequest client is in
          */},{key:'getReadyState',value:function getReadyState(){return this._xhr.readyState;}/**
          * Wrapping method for responseType property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
          *
          * @method getResponseType
          * @return {String} The response's type
          */},{key:'getResponseType',value:function getResponseType(){return this._xhr.responseType;}/**
          * Wrapping method for response property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
          *
          * @method getResponse
          * @return {Mixed} The response's body
          */},{key:'getResponse',value:function getResponse(){return this._xhr.response;}/**
          * Wrapping method for responseText property of XMLHttpRequest
          * see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
          *
          * @method getResponseText
          * @return {String} The text response
          */},{key:'getResponseText',value:function getResponseText(){return this._xhr.responseText;}/**
          * Return the XMLHttpRequest responseText as a JSON object
          *
          * @method getJSON
          * @return {Object} The responseText parsed as a JSON object
          */},{key:'getJSON',value:function getJSON(){return JSON.parse(this.getResponseText());}}],[{key:'get',value:function get(params){params.method='GET';return new Ajax(params);}/**
          * A helper function to create a request of type POST
          *
          * @method post
          * @static
          * @param {Object} params The parameters to send to the constructor
          */},{key:'post',value:function post(params){params.method='POST';return new Ajax(params);}/**
          * A helper function to create a request of type PUT
          *
          * @method put
          * @static
          * @param {Object} params The parameters to send to the constructor
          */},{key:'put',value:function put(params){params.method='PUT';return new Ajax(params);}}]);return Ajax;}();var _createClass$35=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$40(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
   * OBJ class gives easy access to some calculations specific to OBJs. It is used to load an external .obj model file.
   *
   * @class OBJ
   */var OBJ=function(){function OBJ(){_classCallCheck$40(this,OBJ);}_createClass$35(OBJ,null,[{key:'load',/**
           * Load an OBJ and dependencies from a URL
           * @method load
           * @static
           * @param {Loader} loader
           * @param {Object} params The parameters object
           * @param {Function} [params.onStart = null] A function to be called when the loading starts
           */value:function load(loader,params){OBJ.callBack=params.onLoad;return loader.loadText({url:params.url,onLoad:OBJ.parseOBJ.bind(null,loader)});}/**
           * Attach a texture to the given model
           * @method attachTexture
           * @static
           * @param {Loader} loader
           * @param {Object} model The model to attach a texture to
           * @param {Texture} texture The Texture object to attach
           */},{key:'attachTexture',value:function attachTexture(loader,model,texture){debug.log('attachTexture ',loader,model,texture);model.material.setTexture(texture);}/**
           * parse the MTL file associated to the obj file
           * @method parseMTL
           * @static
           * @param {Loader} loader
           * @param {Object} model The model to attach a texture to
           * @param {Object} data The data to parse
           */},{key:'parseMTL',value:function parseMTL(loader,model,data){debug.log('model='+model);//OBJ.mtl = data;
debug.log('mtl content =',data);var lines=data.toString().split('\n');//debug.log("MTL lines = " + lines);
lines.forEach(function(line){var words=line.split(' ');//debug.log("WORDS:"+words);
switch(words[0]){//comment, we just ignore
case'#':break;//new material declared
case'newmtl':debug.log('new material : '+words[1]);break;//ambient term
case'Ka':model.material.setEmissiveColor(new Mobilizing.Color(words[1],words[2],words[3]));break;case'Kd'://diffuse
model.material.setColor(new Mobilizing.Color(words[1],words[2],words[3]));break;case'Ks'://specular
model.material.setSpecularColor(new Mobilizing.Color(words[1],words[2],words[3]));model.material._material.shininess=20;break;case'Ns'://specular exponent
break;case'd'://dissolved == opacity
break;case'Tr'://Transparent
//d = 1-Tr;
break;case'illum'://illumination model
break;case'map_Kd'://Map diffuse
//load texture
//debug.log("load texture : " + words[1]);
loader.loadTexture({url:words[1],onLoad:OBJ.attachTexture.bind(null,loader,model)});model.updateMaterial();break;default:debug.log('unknown MTL line : ',line);break;}});//model.material.setColor(Mobilizing.Color.green);
}/**
           * parse the OBJ file
           * @method parseOBJ
           * @static
           * @param {Loader} loader
           * @param {Object} data The data to parse
           */},{key:'parseOBJ',value:function parseOBJ(loader,data){debug.log('onLoaded data=',data);debug.log('loader=',loader);//debug.log("onLoaded result=", this.result);
//this.text = data.getResponseText();
OBJ.text=data;debug.log('text=',OBJ.text);//this.text = this.result._value; //FIXME
var p=void 0;if(OBJ.mesh!==undefined){p=OBJ.mesh;}else{debug.log('create material');p=new Mesh$1({});p.clear();//empty the current mesh to have clean buffers
p.material=new Material({type:'phong'});debug.log('Material created : ',p.material);}debug.log('parsing obj file...');//OBJ parsing =====================================
var lines=OBJ.text.toString().split('\n');var uvs=[];var normals=[];lines.forEach(function(line){var words=line.split(' ');//debug.log("LINE " + line);
switch(words[0]){case'mtllib'://chargement de la lib
debug.log('mtllib '+words[1]);OBJ.resultmtl=loader.loadText({url:words[1],onLoad:OBJ.parseMTL.bind(null,loader,p)});break;case'usemtl':debug.log('usemtl '+words[1]);//to do : load mtl file
break;case'o':debug.log('OBJ o '+words[1]);break;case'g':debug.log('OBJ g '+words[1]);break;case'v'://debug.log("Vertice")
p.pushVertex(new Vector3$1(words[1],words[2],words[3]));break;case'vt':debug.log('uv '+words[1]+' '+words[2]);uvs.push(new Vector2$1(words[1],words[2]));break;case'vn':normals.push(new Vector3$1(words[1],words[2],words[3]));//debug.log("normal")
break;case's'://debug.log("Face")
break;case'f':{//FACE definition
//debug.log(uvs);
//debug.log("Face")
var index1=words[1].split('/');var index2=words[2].split('/');var index3=words[3].split('/');p.pushFace(index1[0]-1,index2[0]-1,index3[0]-1);p.pushUV(uvs[index1[1]-1],uvs[index2[1]-1],uvs[index3[1]-1]);//debug.log(index1, index2, index3);
//p.pushNormal(normals[index1[2]-1], normals[index2[2]-1], normals[index3[2]-1]); //NEW
//f.normal = new Vector3(normals[index1[2]-1], normals[index2[2]-1], normals[index3[2]-1]);
if(words.length>4){//we have quads, we need to add an additionnal triangle
var index4=words[4].split('/');p.pushFace(index1[0]-1,index3[0]-1,index4[0]-1);p.pushUV(uvs[index1[1]-1],uvs[index3[1]-1],uvs[index4[1]-1]);}break;}case'#'://debug.log("Comment")
break;}});p.updateMesh();p.computeNormals();//p.updateMaterial();
debug.log('callback called : ',p);OBJ.callBack(p);//p.material.setTexture(OBJ.texture);
}}]);return OBJ;}();var _createClass$33=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$38(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
   * Fired by a LoadRequest when it has started loading
   * @event start
   */var EVT_REQUEST_START='start';/**
   * Fired by a LoadRequest when it has successfully finished loading
   * @event load
   * @param {Mixed} value The loaded and processed value
   */var EVT_REQUEST_LOAD='load';/**
   * Fired by a LoadRequest when it has failed loading
   * @event error
   * @param {String} error The error
   */var EVT_REQUEST_ERROR='error';/**
   * Fired when one of the Loader's requests has finished loading
   * @event load
   * @param {LoadRequest} request The LoadRequest
   */var EVT_LOAD='load';/**
   * Fired when one of the Loader's requests has failed loading
   * @event error
   * @param {LoadRequest} request The LoadRequest
   */var EVT_ERROR='error';/**
   * Fired when all the Loader's request have finished loading (whether successfully or not)
   * @event complete
   * @param {Array} requests The list of consumed requests
   */var EVT_COMPLETE='complete';/**
   * A status indicating that the loader has not yet started consuming requests
   * @property pending
   * @static
   * @final
   * @private
   */var STATUS_PENDING='pending';/**
   * A status indicating that the loader has started consuming requests
   * @property loading
   * @static
   * @final
   * @private
   */var STATUS_LOADING='loading';/**
   * A status indicating that the loader has finished consuming all requests
   * @property complete
   * @static
   * @final
   * @private
   */var STATUS_COMPLETE='complete';/**
   * LoadRequest object encapsulates a request of a loader
   *
   * @class LoadRequest
   * @constructor
   * @param {Object} params The parameters object
   * @param {Function} params.consume A function to be called (with this request as an argument) to consume the request
   * @param {Function} [params.onStart = null] A function to be called when the loading starts
   * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
   * @param {Function} [params.onError = null] A function to be called when the loading fails
  */var LoadRequest=function(){function LoadRequest(params){_classCallCheck$38(this,LoadRequest);this._consumeCallback=params.consume;this._value=undefined;this._error=undefined;this.events=new EventEmitter({scope:this});var onStart=getOrDefault(params,'onStart',null);var onLoad=getOrDefault(params,'onLoad',null);var onError=getOrDefault(params,'onError',null);if(onStart){this.events.on(EVT_REQUEST_START,onStart);}if(onLoad){this.events.on(EVT_REQUEST_LOAD,onLoad);}if(onError){this.events.on(EVT_REQUEST_ERROR,onError);}}/**
      * Launch the associated Ajax request
      * @method consume
      */_createClass$33(LoadRequest,[{key:'consume',value:function consume(){this._consumeCallback(this);}/**
          * Set the value of this LoadRequest. Will be filled after loading completion
          * @method setValue
          * @param {Object} value
          */},{key:'setValue',value:function setValue(value){this._value=value;}/**
          * Get the value of this LoadRequest
          * @method getValue
          * @return {Mixed} value
          */},{key:'getValue',value:function getValue(){return this._value;}/**
          * Set the error that occured if any
          * @method setError
          * @param {Mixed} error
          */},{key:'setError',value:function setError(error){this._error=error;}/**
          * Get the error that occured if any
          * @method getError
          * @return {Mixed} error
          */},{key:'getError',value:function getError(){return this._error;}}]);return LoadRequest;}();var Loader=function(){/**
      * A loader class that manage the loading of datas from url. This is mainly used internally to manage the preLoad method in users script. Users should usually use this class methods to load datas and obtain the result encapsulated in a LoadRequest object.
      *
      * @class Loader
      * @constructor
      * @param {Object} params Config parameters
      * @param {Function} params.onLoad
      * @param {Function} params.onError
      * @param {Function} params.onComplete
      *
      * @example
      *     this.preLoad = function(loader){
      *
      *       logoFile = loader.loadImage({url:"logo_mobilizing.png",
      *                                    onStart: function(){console.log("Started loading of logo");},
      *                                    onLoad: function(data){console.log("Hell Yeah! Got", data);}
      *                                   });
      *     }
      *
      *     this.setup = function(){
      *
      *       console.log("logoFile", logoFile);
      *       //will print the LoadRequest object. Access the loaded data with logoFile.getValue()
      *     }
      */function Loader(params){_classCallCheck$38(this,Loader);var onLoad=getOrDefault(params,'onLoad',null);var onError=getOrDefault(params,'onError',null);var onComplete=getOrDefault(params,'onComplete',null);this._status=STATUS_PENDING;this._requests=[];this._complete=0;this.events=new EventEmitter({scope:this});if(onLoad){this.events.on(EVT_LOAD,onLoad);}if(onError){this.events.on(EVT_ERROR,onError);}if(onComplete){this.events.on(EVT_COMPLETE,onComplete);}}/**
      * Consume (executes) all the requests
      * @method consumeAll
      */_createClass$33(Loader,[{key:'consumeAll',value:function consumeAll(){if(this._requests.length>0){this._status=STATUS_LOADING;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this._requests[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var request=_step.value;request.consume();}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}else{this.doComplete();}}/**
          * Helper method to update the status and trigger the complete event
          * @method doComplete
          * @private
          */},{key:'doComplete',value:function doComplete(){this._status=STATUS_COMPLETE;this.events.trigger(EVT_COMPLETE,this._requests);}/**
          * Loads data from a URL. This static method must be provided a callback method.
          * @static
          * @method load
          * @param {String} url the URL to load data from
          * @param {Function} callback callback function that the user wants to call on load completion
          * @param {Mixed} callback.result The load result if successful
          * @param {String} callback.error The load error if unsuccessful
          * @param {String} [responseType] The type of the respons to return from the Ajax call
          * @param {Function} [processData] function definning what to do with the data coming from the promise
          */},{key:'load',/*static loadOBJ(params, callback)
          {
              return OBJ.load(this, params);
          }*//**
          * Load a data from the URL given in parameters. ResponseType is the default one of an Ajax object, that is String.
          * @method load
          * @param {Object} params The parameters object
          * @param {String} params.url the URL to load data from
          * @param {Function} [params.onStart = null] A function to be called when the loading starts
          * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
          * @param {Function} [params.onError = null] A function to be called when the loading fails
          * @param {String} [params.responseType] The type of the respons to return from the Ajax call
          * @param {Function} params.processData function definning what to do with the data coming from the promise
          * @return {LoadRequest} the LoadRequest object is incomplete at call and will be filled by the inner promise manager, when fulfilled.
          */value:function load(params){var _this=this;var url=params.url;var onStart=getOrDefault(params,'onStart',null);var onLoad=getOrDefault(params,'onLoad',null);var onError=getOrDefault(params,'onError',null);var responseType=getOrDefault(params,'responseType','');var processData=getOrDefault(params,'processData',function(ajax){return ajax.getResponse();});var ajax=new Ajax({url:url,responseType:responseType,autoSend:false});var request=new LoadRequest({consume:function consume(){ajax.send();},onStart:onStart,onLoad:onLoad,onError:onError});ajax.events.on('start',function(){request.events.trigger(EVT_REQUEST_START);});ajax.events.on('success',function(ajx){var value=processData(ajx,_this);request.setValue(value);request.events.trigger(EVT_REQUEST_LOAD,value);_this.events.trigger(EVT_LOAD,request);_this._complete++;if(_this._complete===_this._requests.length){_this.doComplete();}});ajax.events.on('error',function(ajx){var error=ajx.getStatusText();request.setError(error);request.events.trigger(EVT_REQUEST_ERROR,error);_this.events.trigger(EVT_ERROR,request);_this._complete++;if(_this._complete===_this._requests.length){_this.doComplete();}});this._requests.push(request);if(this._status===STATUS_LOADING){request.consume();}return request;}/**
          * Loads a text from a URL.
          * @method loadText
          * @param {Object} params The parameters object
          * @param {String} params.url the URL to load data from
          * @param {Function} [params.onStart = null] A function to be called when the loading starts
          * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
          * @param {Function} [params.onError = null] A function to be called when the loading fails
          * @return {LoadRequest} a LoadRequest who's value is incomplete at first and will be filled once the Ajax request is fulfilled
          */},{key:'loadText',value:function loadText(params){return this.load(Object.assign({},params,{responseType:'text'}));}/**
          * Loads a JavaScript object, parsed from a JSON string from a URL.
          * @method loadJSON
          * @param {Object} params The parameters object
          * @param {String} params.url the URL to load data from
          * @param {Function} [params.onStart = null] A function to be called when the loading starts
          * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
          * @param {Function} [params.onError = null] A function to be called when the loading fails
          * @return {LoadRequest} a LoadRequest who's value is incomplete at first and will be filled once the Ajax request is fulfilled
          */},{key:'loadJSON',value:function loadJSON(params){return this.load(Object.assign({},params,{responseType:'json'}));}/**
          * Load an image from the URL given in parameters. The Image Object is given as the returned LoadRequest's value.
          * @method loadImage
          * @param {Object} params The parameters object
          * @param {String} params.url the URL to load data from
          * @param {Function} [params.onStart = null] A function to be called when the loading starts
          * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
          * @param {Function} [params.onError = null] A function to be called when the loading fails
          * @return {LoadRequest} a LoadRequest who's value is incomplete at first and will be filled once the Ajax request is fulfilled
          */},{key:'loadImage',value:function loadImage(params){var _this2=this;var url=params.url;var onStart=getOrDefault(params,'onStart',null);var onLoad=getOrDefault(params,'onLoad',null);var onError=getOrDefault(params,'onError',null);var img=new Image();var request=new LoadRequest({consume:function consume(req){img.src=url;req.events.trigger(EVT_REQUEST_START);},onStart:onStart,onLoad:onLoad,onError:onError});img.addEventListener('load',function(){request.setValue(img);request.events.trigger(EVT_REQUEST_LOAD,img);_this2.events.trigger(EVT_LOAD,request);_this2._complete++;if(_this2._complete===_this2._requests.length){_this2.doComplete();}},false);img.addEventListener('error',function(){var error='Error loading the image '+url;request.setError(error);request.events.trigger(EVT_REQUEST_ERROR,error);_this2.events.trigger(EVT_ERROR,request);_this2._complete++;if(_this2._complete===_this2._requests.length){_this2.doComplete();}});this._requests.push(request);if(this._status===STATUS_LOADING){request.consume();}return request;}/**
          * Load a video from the URL given in parameters. The Video Object is given as the returned LoadRequest's value.
          * @method loadVideo
          * @param {Object} params The parameters object
          * @param {String} params.url the URL to load data from
          * @param {Function} [params.onStart = null] A function to be called when the loading starts
          * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
          * @param {Function} [params.onError = null] A function to be called when the loading fails
          * @return {LoadRequest} a LoadRequest who's value is incomplete at first and will be filled once the request is fulfilled
          */},{key:'loadVideo',value:function loadVideo(params){var _this3=this;var url=params.url;var onStart=getOrDefault(params,'onStart',null);var onLoad=getOrDefault(params,'onLoad',null);var onError=getOrDefault(params,'onError',null);var video=document.createElement('video');video.autoplay=false;var request=new LoadRequest({consume:function consume(req){video.src=url;video.setAttribute('crossorigin','anonymous');video.load();req.events.trigger(EVT_REQUEST_START);},onStart:onStart,onLoad:onLoad,onError:onError});video.addEventListener('canplay',function(){request.setValue(video);request.events.trigger(EVT_REQUEST_LOAD,video);_this3.events.trigger(EVT_LOAD,request);_this3._complete++;if(_this3._complete===_this3._requests.length){_this3.doComplete();}},false);video.addEventListener('error',function(){var error='Error loading the video '+url+' '+video.error.code;debug.log(video.error);request.setError(error);request.events.trigger(EVT_REQUEST_ERROR,error);_this3.events.trigger(EVT_ERROR,request);_this3._complete++;if(_this3._complete===_this3._requests.length){_this3.doComplete();}});this._requests.push(request);if(this._status===STATUS_LOADING){request.consume();}return request;}/**
          * Loads an ArrayBuffer from a URL.
          * @method loadArrayBuffer
          * @param {Object} params The parameters object
          * @param {String} params.url the URL to load data from
          * @param {Function} [params.onStart = null] A function to be called when the loading starts
          * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
          * @param {Function} [params.onError = null] A function to be called when the loading fails
          * @return {LoadRequest} a LoadRequest who's value is incomplete at first and will be filled once the Ajax request is fulfilled
          */},{key:'loadArrayBuffer',value:function loadArrayBuffer(params){return this.load(Object.assign({},params,{responseType:'arraybuffer'}));}/**
          * Loads a blob from a URL.
          * @method loadBlob
          * @param {Object} params The parameters object
          * @param {String} params.url the URL to load data from
          * @param {Function} [params.onStart = null] A function to be called when the loading starts
          * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
          * @param {Function} [params.onError = null] A function to be called when the loading fails
          * @return {LoadRequest} a LoadRequest who's value is incomplete at first and will be filled once the Ajax request is fulfilled
          */},{key:'loadBlob',value:function loadBlob(params){return this.load(Object.assign({},params,{responseType:'blob'}));}/**
          * Loads an OBJ from a URL.
          * @method loadOBJ
          * @param {Object} params The parameters object
          * @param {String} params.url the URL to load data from
          * @param {Function} [params.onStart = null] A function to be called when the loading starts
          * @param {Function} [params.onLoad = null] A function to be called when the loading finishes
          * @param {Function} [params.onError = null] A function to be called when the loading fails
          * @return {LoadRequest} a LoadRequest who's value is incomplete at first and will be filled once the Ajax request is fulfilled
          */},{key:'loadOBJ',value:function loadOBJ(params){return OBJ.load(this,params);}},{key:'loadTexture',value:function loadTexture(params){var t=new Texture$1();console.log('try to load '+params.url);var result=this.loadImage({url:params.url,onLoad:function onLoad(img){t.fromImage(img);if(params.onLoad!==undefined){console.log('call onLoad:',params.onLoad);params.onLoad(t);}}});console.log('result=',result);return t;}}],[{key:'load',value:function load(url,callback,responseType,processData){//check if the url is aleady in cache for loading
if(Loader.Cache.isLoading(url)){if(callback){Loader.Cache.addCallback(url,callback);//console.log("adding", callback);
return null;}}//check if the file is already cached (loaded)
if(Loader.Cache.isCached(url)){debug.info('ressource '+url+" is cached and won't be loaded again");return Loader.Cache.get(url);}//add this url to the file to cache
Loader.Cache.addKey(url);var ajax=new Ajax({url:url,responseType:responseType,autoSend:false});if(processData===undefined){processData=function processData(ajx){return ajx.getResponse();};}ajax.events.on('success',function(ajx){var result=processData(ajx);callback(result);//this is the loading response whithout further process,
//add it to the cache and pass the response to all other registred callback
Loader.Cache.addValue(url,result);});ajax.events.on('error',function(ajx){callback(undefined,ajx.getStatusText());});ajax.send();return null;}/**
          * Loads a text from a URL. This static method must be provided a callback method.
          * @method loadText
          * @static
          * @param {String} url the URL to load data from
          * @param {Function} callback callback function that the user wants to call on load completion
          * @param {Mixed} callback.result The load result if successful
          * @param {String} callback.error The load error if unsuccessful
          */},{key:'loadText',value:function loadText(url,callback){Loader.load(url,callback,'text');}/**
          * Loads a JavaScript object, parsed from a JSON string from a URL. This static method must be provided a callback method.
          * @method loadJSON
          * @static
          * @param {String} url the URL to load data from
          * @param {Function} callback callback function that the user wants to call on load completion
          * @param {Mixed} callback.result The load result if successful
          * @param {String} callback.error The load error if unsuccessful
          */},{key:'loadJSON',value:function loadJSON(url,callback){Loader.load(url,callback,'json');}/**
          * Loads an arraybuffer from a URL. This static method must be provided a callback method.
          * @method loadArrayBuffer
          * @static
          * @param {String} url the URL to load data from
          * @param {Function} callback callback function that the user wants to call on load completion
          * @param {Mixed} callback.result The load result if successful
          * @param {String} callback.error The load error if unsuccessful
          */},{key:'loadArrayBuffer',value:function loadArrayBuffer(url,callback){Loader.load(url,callback,'arraybuffer');}/**
          * Loads a blob from a URL. This static method must be provided a callback method.
          * @method loadBlob
          * @static
          * @param {String} url the URL to load data from
          * @param {Function} callback callback function that the user wants to call on load completion
          */},{key:'loadBlob',value:function loadBlob(url,callback){Loader.load(url,callback,'blob');}/**
          * Loads an image from a URL. This static method must be provided a callback method.
          * @static
          * @method loadImage
          * @param {String} url the URL to load data from
          * @param {Function} callback callback function that the user wants to call on load completion
          * @param {Mixed} callback.result The load result if successful
          * @param {String} callback.error The load error if unsuccessful
          */},{key:'loadImage',value:function loadImage(url,callback){var img=new Image();img.addEventListener('load',function(){callback(img);},false);img.addEventListener('error',function(){callback(undefined,'Error loading the image '+url);},false);img.src=url;}/**
          * Loads a script from a URL. This static method must be provided a callback method.
          * @method loadScript
          * @static
          * @param {String} url the URL to load data from
          * @param {Function} callback callback function that the user wants to call on load completion
          */},{key:'loadScript',value:function loadScript(url,callback){var script=document.createElement('script');document.head.appendChild(script);script.addEventListener('load',callback);script.src=url;}}]);return Loader;}();var Cache=function(){/**
      * Cache gives the possibility to automatically avoid the reloading of the same ressource. It uses url to check if a given ressource has already been loaded or if it's currently loading.
      * Cache exists only once as a static class of Loader and should never be created by user.
      * Cache is enabled by default. To disable it, use Loader.Cache.enable(false) before you start using a Loader or a component that uses a Loader internally (like Button, RichText, etc.)
      * It is used only in Loader static methods for now (to fix!).
      * @class Cache
      * @constructor
      */function Cache(){_classCallCheck$38(this,Cache);this.enabled=true;this.files={};this.callbacks=[];}/**
      * Enable or disable cache
      * @method enable
      * @param {Boolean} enabled
      */_createClass$33(Cache,[{key:'enable',value:function enable(){var enabled=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;this.enabled=enabled;}/**
          * Add a file to the cache with the given key
          * @method add
          * @param {Object} key
          * @param {Object} file
          */},{key:'add',value:function add(key,file){if(this.enabled===true&&!this.getKey(key)){debug.info('Cache Adding key and file:',key,file);this.files[key]=file;}}/**
          * Add a key to the cache with no value, for further completion
          * @method addKey
          * @param {Object} key
          */},{key:'addKey',value:function addKey(key){if(this.enabled===true&&!this.getKey(key)){debug.info('Cache Adding key:',key);this.files[key]=undefined;}}/**
          * Add a value to the cache to the given, already existing key
          * @method addValue
          * @param {Object} key
          * @param {Object} file
          */},{key:'addValue',value:function addValue(key,file){if(this.enabled===false){return;}if(this.getKey(key)&&this.files[key]===undefined){if(this.getKey(key)&&this.files[key]===undefined){debug.info('Cache Adding value:',file,'to key',key);this.files[key]=file;//process then remove callback consumed
for(var i=this.callbacks.length-1;i>=0;i--){//console.log("this.callbacks", this.callbacks[i]);
if(this.callbacks[i].key===key){var callback=this.callbacks[i].callback;callback(file);this.callbacks.splice(i,1);}}debug.log('this.callbacks.length',this.callbacks.length);}}}/**
          * Get the value of the given key
          * @method get
          * @param {Object} key
          * @return {Object} the file in cache
          */},{key:'get',value:function get(key){if(this.enabled===false){return null;}//console.log( 'Cache', 'Checking key:', key );
return this.files[key];}/**
          * Remove the given key
          * @method remove
          * @param {Object} key
          */},{key:'remove',value:function remove(key){delete this.files[key];}/**
          * Check if the file of the given key is aleady cached
          * @method isCached
          * @param {Object} key
          * @return {Boolean} is cached or not
          */},{key:'isCached',value:function isCached(key){return this.files.hasOwnProperty(key)&&typeof this.files[key]!=='undefined';}/**
          * Check if the file of the given key is loading (only the key exists, not the value)
          * @method isLoading
          * @param {Object} key
          * @return {Boolean} is loading or not
          */},{key:'isLoading',value:function isLoading(key){return this.files.hasOwnProperty(key)&&typeof this.files[key]==='undefined';}/**
          * Get the key if it exists, even with no value
          * @method getKey
          * @param {Object} key
          * @return {Object} the key or undefined
          */},{key:'getKey',value:function getKey(key){var keys=Object.keys(this.files);for(var k=0;k<keys.length;k++){if(keys[k]===key){//console.log("getKey found",keys[k], key);
return keys[k];}}return undefined;}/**
          * Empty the file list
          * @method clear
          */},{key:'clear',value:function clear(){this.files={};}/**
          * Adds a callback coming from a Loader, with its associated key. We use a list of object as we must be able to register several callback that can have the same key.
          * @method addCallback
          * @param {Object} key
          * @param {Function} callback
          */},{key:'addCallback',value:function addCallback(key,callback){var temp={key:key,callback:callback};//console.log("will add key",  temp.key,"callback", temp.callback);
this.callbacks.push(temp);}}]);return Cache;}();Loader.Cache=new Cache();var _createClass$36=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _possibleConstructorReturn$22(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$22(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck$41(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var TOUCH_TYPE='touch';var MOUSE_TYPE='mouse';var PointerObject=function(){/**
      * PointerObject is a thin layer that unify all inputs to simplify UI interactions
      *
      * @class PointerObject
      * @constructor
      * @param {Number} x
      * @param {Number} y
      * @param {Number} state
      * @param {Number} type
      */function PointerObject(params){_classCallCheck$41(this,PointerObject);var x=getOrDefault(params,'x',0);var y=getOrDefault(params,'y',0);var state=getOrDefault(params,'state',false);var type=getOrDefault(params,'type',undefined);this._x=x;this._y=y;this._deltaX=0;this._deltaY=0;this._state=state;this._type=type;this._component=null;}/**
      * Set the component
      *
      * @method setComponent
      * @param {Object} component
      */_createClass$36(PointerObject,[{key:'setComponent',value:function setComponent(component){this._component=component;}/**
          * get the component
          *
          * @method getComponent
          * @return {Object} component
          */},{key:'getComponent',value:function getComponent(){return this._component;}/**
          * Set the x coordinate
          *
          * @method setX
          * @param {Object} x
          */},{key:'setX',value:function setX(x){this._x=x;}/**
          * Set the y coordinate
          *
          * @method setY
          * @param {Object} y
          */},{key:'setY',value:function setY(y){this._y=y;}/**
          * Get the x coordinate
          *
          * @method getX
          * @return {Object} x
          */},{key:'getX',value:function getX(){return this._x;}/**
          * Get the y coordinate
          *
          * @method getY
          * @return {Object} y
          */},{key:'getY',value:function getY(){return this._y;}/**
          * Set the x coordinate
          *
          * @method setDeltaX
          * @param {Object} x
          */},{key:'setDeltaX',value:function setDeltaX(x){this._deltaX=x;}/**
          * Set the y delta coordinate
          *
          * @method setDeltaY
          * @param {Object} y
          */},{key:'setDeltaY',value:function setDeltaY(y){this._deltaY=y;}/**
          * Get the x coordinate
          *
          * @method getDeltaX
          * @return {Object} x
          */},{key:'getDeltaX',value:function getDeltaX(){return this._deltaX;}/**
          * Get the y coordinate
          *
          * @method getDeltaY
          * @return {Object} y
          */},{key:'getDeltaY',value:function getDeltaY(){return this._deltaY;}/**
          * Set the state
          *
          * @method setState
          * @param {Boolean} state
          */},{key:'setState',value:function setState(state){this._state=state;}/**
          * Get the state
          *
          * @method getState
          * return {Boolean} state
          */},{key:'getState',value:function getState(){return this._state;}/**
          * Set the type
          *
          * @method setType
          * return {String} type
          */},{key:'setType',value:function setType(type){this._type=type;}/**
          * Get the type
          *
          * @method getType
          * return {String} type
          */},{key:'getType',value:function getType(){return this._type;}}]);return PointerObject;}();/**
   * Fired when a pointer is on (pressed or down)
   * @event on
   */var EVT_ON='on';/**
   * Fired when a pointer is off (released or erased)
   * @event off
   */var EVT_OFF='off';/**
   * Fired when a pointer moved
   * @event moved
   */var EVT_MOVED='moved';var Pointer=function(_Component){_inherits$22(Pointer,_Component);/**
      * Pointer is an abstraction that enables various input devices to send the same kind of events. It is designed to accumulate various type of inputs in a Map of PointerOject. Each input device is converted in a PointerOject in order to unify its interface. Usefully mainly internally for interactive UI objects like buttons.
      *
      * @example
      *    //TODO
      *
      * @class Pointer
      * @constructor
      * @param {Object} params Parameters Object
      * @param {Component} params.components the input components to add to this pointer (i.e. Mouse)
      */function Pointer(params){_classCallCheck$41(this,Pointer);var _this=_possibleConstructorReturn$22(this,(Pointer.__proto__||Object.getPrototypeOf(Pointer)).call(this,params));var components=getOrDefault(params,'components',undefined);_this.pointers=new Map();// special pointer to get the last active pointer
_this.lastActivePointer=new PointerObject();_this.lastActivePointer.setType('lastActive');if(Array.isArray(components)){components.forEach(function(component){_this.add(component);});}return _this;}/**
      * Remove unused Pointers
      *
      * @method postUpdate
      */_createClass$36(Pointer,[{key:'postUpdate',value:function postUpdate(){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.pointers.keys()[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var pointerKey=_step.value;var pointer=this.pointers.get(pointerKey);if(pointer.getState()===false&&pointer.getType()===TOUCH_TYPE){//console.log("erase",pointer);
this.pointers.delete(pointerKey);}//update ce qui doit l'être mais qui ne peut l'être ailleurs
if(pointer.getType()==='touch'){pointer.setDeltaX(pointer.getComponent().getDeltaX());pointer.setDeltaY(pointer.getComponent().getDeltaY());}else if(pointer.getType()==='mouse'){pointer.setDeltaX(pointer.getComponent().getDeltaX());pointer.setDeltaY(pointer.getComponent().getDeltaY());}}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}/**
          * Adds the specified input component as a PointerObject to the pointers list.
          * @method add
          * @param {Component} component
          */},{key:'add',value:function add(component){var _this2=this;//console.log("component",component);
if(component instanceof Touch){var touchComponent=component;//just to understand better
//console.log("will add Touch comp", touchComponent);
//register a new Pointer at touch creation
touchComponent.events.on('touchstart',function(touch){var pointer=new PointerObject();pointer.setComponent(component);pointer.setType(TOUCH_TYPE);pointer.setState(true);pointer.setX(touch.x);pointer.setY(touch.y);_this2.pointers.set(touch.id,pointer);_this2.events.trigger(EVT_ON,{pointer:pointer,x:pointer.getX(),y:pointer.getY()});_this2.lastActivePointer.setState(true);_this2.lastActivePointer.setX(touch.x);_this2.lastActivePointer.setY(touch.y);//console.log("touchstart", pointer, this.pointers);
});//updates a Pointer at touch mouved
touchComponent.events.on('touchmoved',function(touch){var pointer=_this2.pointers.get(touch.id);pointer.setState(true);pointer.setX(touch.x);pointer.setY(touch.y);pointer.setDeltaX(touch.xDelta);pointer.setDeltaY(touch.yDelta);_this2.events.trigger(EVT_MOVED,{pointer:pointer,x:pointer.getX(),y:pointer.getY()});_this2.lastActivePointer.setState(true);_this2.lastActivePointer.setX(touch.x);_this2.lastActivePointer.setY(touch.y);_this2.lastActivePointer.setDeltaX(touch.xDelta);_this2.lastActivePointer.setDeltaY(touch.yDelta);//console.log("touchmoved", pointer);
});//updates a Pointer at touch mouved
touchComponent.events.on('touchend',function(touch){var pointer=_this2.pointers.get(touch.id);pointer.setState(false);pointer.setX(touch.x);pointer.setY(touch.y);_this2.events.trigger(EVT_OFF,{pointer:pointer});_this2.lastActivePointer.setState(false);_this2.lastActivePointer.setX(touch.x);_this2.lastActivePointer.setY(touch.y);//console.log("touchend", pointer);
});}else if(component instanceof Mouse){var mouseComponent=component;//just to understand better
mouseComponent.events.on('mousepress',function(){var pointer=_this2.pointers.get(component.getID());pointer.setState(true);_this2.events.trigger(EVT_ON,{pointer:pointer,x:pointer.getX(),y:pointer.getY()});_this2.lastActivePointer.setState(true);});mouseComponent.events.on('mouserelease',function(){var pointer=_this2.pointers.get(component.getID());pointer.setState(false);_this2.events.trigger(EVT_OFF,{pointer:pointer});_this2.lastActivePointer.setState(false);});mouseComponent.events.on('mousemove',function(coords){var pointer=_this2.pointers.get(component.getID());pointer.setDeltaX(mouseComponent.getDeltaX());pointer.setDeltaY(mouseComponent.getDeltaY());pointer.setX(coords.x);pointer.setY(coords.y);_this2.events.trigger(EVT_MOVED,{pointer:pointer,x:pointer.getX(),y:pointer.getY()});_this2.lastActivePointer.setState(true);_this2.lastActivePointer.setX(pointer.getX());_this2.lastActivePointer.setY(pointer.getY());_this2.lastActivePointer.setDeltaX(pointer.getDeltaX());_this2.lastActivePointer.setDeltaY(pointer.getDeltaY());});mouseComponent.events.on('mouseupdate',function(){var pointer=_this2.pointers.get(component.getID());pointer.setDeltaX(mouseComponent.getDeltaX());pointer.setDeltaY(mouseComponent.getDeltaY());/*this.events.trigger(EVT_MOVED, {pointer:pointer, x:pointer.getX(), y:pointer.getY()});*/_this2.lastActivePointer.setState(true);_this2.lastActivePointer.setDeltaX(pointer.getDeltaX());_this2.lastActivePointer.setDeltaY(pointer.getDeltaY());});var pointer=new PointerObject();pointer.setComponent(component);pointer.setType(MOUSE_TYPE);this.pointers.set(component.getID(),pointer);}}/**
          * Returns the specified PointerObject to work with its state
          * @method get
          * @param {Component} component
          * @return {Component} the corresponding input Component
          */},{key:'get',value:function get(component){return this.pointers.get(component.id);}/**
          * Returns an Array from the pointers Map object. For debug purpose.
          * @method getPointersArray
          * @return {Array} Pointers array
          */},{key:'getPointers',value:function getPointers(){return Array.from(this.pointers.values());}/**
          * Returns true if ANY of the PointerObjects (input Component) state is true, false otherwise. i.e. if you add a mouse and a touch component to the pointer, this will return true if any of these 2 has it's state to true.
          * @method getState
          * @return {Array} pointers array
          */},{key:'getState',value:function getState(){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=this.pointers.values()[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var pointer=_step2.value;//the virtual pointer is on true
if(pointer.getState()){return true;}}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}this.events.trigger('off');return false;}/**
          * Returns x coordinates of the PointerObject (input Component) of the given index. If no index is given, the last active pointer will return.
          * @method getX
          * @return {Number} x coordinate
          */},{key:'getX',value:function getX(index){var values=[];var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=this.pointers.values()[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var pointer=_step3.value;values.push(pointer.getX());}}catch(err){_didIteratorError3=true;_iteratorError3=err;}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return();}}finally{if(_didIteratorError3){throw _iteratorError3;}}}if(index)// we want a specific pointer in the list
{return index===undefined?values:values[index];}// we want a value
return this.lastActivePointer.getX();}/**
          * Returns y coordinates of the PointerObject (input Component) of the given index. If no index is given, the last active pointer will return.
          * @method getY
          * @return {Number} y coordinate
          */},{key:'getY',value:function getY(index){var values=[];var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=this.pointers.values()[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var pointer=_step4.value;values.push(pointer.getY());}}catch(err){_didIteratorError4=true;_iteratorError4=err;}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return();}}finally{if(_didIteratorError4){throw _iteratorError4;}}}if(index)// we want a specific pointer in the list
{return index===undefined?values:values[index];}// we want a value
return this.lastActivePointer.getY();}/**
          * Returns x delta coordinates of the PointerObject (input Component) of the given index. If no index is given, the last active pointer will return.
          * @method getDeltaX
          * @return {Number} coordinate
          */},{key:'getDeltaX',value:function getDeltaX(index){var values=[];var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=this.pointers.values()[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var pointer=_step5.value;values.push(pointer.getDeltaX());}}catch(err){_didIteratorError5=true;_iteratorError5=err;}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return();}}finally{if(_didIteratorError5){throw _iteratorError5;}}}if(index)// we want a specific pointer in the list
{return index===undefined?values:values[index];}// we want a value
return this.lastActivePointer.getDeltaX();}/**
          * Returns y delta coordinates of the PointerObject (input Component) of the given index. If no index is given, the last active pointer will return.
          * @method getDeltaY
          * @return {Number} coordinate
          */},{key:'getDeltaY',value:function getDeltaY(index){var values=[];var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=this.pointers.values()[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var pointer=_step6.value;values.push(pointer.getDeltaY());}}catch(err){_didIteratorError6=true;_iteratorError6=err;}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return();}}finally{if(_didIteratorError6){throw _iteratorError6;}}}if(index)// we want a specific pointer in the list
{return index===undefined?values:values[index];}// we want a value
return this.lastActivePointer.getDeltaY();}}]);return Pointer;}(Component);var _createClass$37=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$42(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
   * Fired when the client successfully connects to the server
   * @event connect
   */var EVT_CONNECT='connect';/**
   * Fired when the client disconnects from the server
   * @event disconnect
   */var EVT_DISCONNECT='disconnect';/**
   * Fired when a connection error occurs
   * @event error
   */var EVT_ERROR$2='error';var PubSub=function(){/**
      * PubSub is a publish-subscribe messaging system based on socket.io
      * It allows simple socket communication between different clients
      * An runing instance of MobilizingServer is required to make this work
      *
      * @example
      *    //TODO
      *
      * @class PubSub
      * @constructor
      * @param {Object} params The parameters object
      * @param {String} [params.url=""] The URL of the server on which the MobilizingServer instance is running
      * @param {Boolean} [params.autoConnect=true] Whether the connection should be automatically opened
      */function PubSub(params){_classCallCheck$42(this,PubSub);var url=getOrDefault(params,'url','');var autoConnect=getOrDefault(params,'autoConnect',true);this.events=new EventEmitter({scope:this});if(autoConnect){this.open(url);}}/**
      * Open the socket connection
      * @method open
      * @param {String} url URL of the server on which the MobilizingServer instance is running
      */_createClass$37(PubSub,[{key:'open',value:function open(url){var _this=this;if(typeof io==='undefined'){var script=document.createElement('script');script.src=url+'/socket.io/socket.io.js';script.onload=function(){_this.open(url);};document.head.appendChild(script);}else{this.socket=io(url);this.socket.on('connect',function(){_this.socket.on('disconnect',function(){_this.events.trigger(EVT_DISCONNECT);});_this.events.trigger(EVT_CONNECT);});this.socket.on('error',function(error){_this.events.trigger(EVT_ERROR$2,error);});}}/**
          * Close the socket connection
          * @method close
          */},{key:'close',value:function close(){if(this.socket){this.socket.disconnect();delete this.socket;}}/**
          * Publish a message to a specific channel
          * @method publish
          * @param {String} channel The channel on which to publish the message
          * @param {Mixed} message The message to publish
          */},{key:'publish',value:function publish(channel,message){if(this.socket){this.socket.emit('publish',{channel:channel,message:message});}}/**
          * Subscribe for messages from a specific channel
          * @method subscribe
          * @param {String} channel The channel on which to subscribe
          * @param {Function} callback The callback to call when a message is received on the channel
          */},{key:'subscribe',value:function subscribe(channel,callback){if(this.socket){this.socket.emit('subscribe',{channel:channel});this.socket.on(channel,callback);}}/**
          * Unsubscribe for messages from a specific channel
          * @method unsubscribe
          * @param {String} channel The channel from which to unsubscribe
          */},{key:'unsubscribe',value:function unsubscribe(channel){if(this.socket){this.socket.emit('unsubscribe',{channel:channel});this.socket.off(channel);}}/**
          * id accessor
          *
          * @property id
          * @type String
          */},{key:'getID',value:function getID(){return this.socket?this.socket.id:null;}}]);return PubSub;}();var _createClass$38=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$43(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$23(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$23(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var PhysicsEngine=function(_Component){_inherits$23(PhysicsEngine,_Component);/**
       * PhysicsEngine Class
       *
       * @class PhysicsEngine
       * @constructor
       * @param {Object} params Parameters Object
       * @param {Number} params.iterations iterations of the physic engine when constrains are calculated
       */function PhysicsEngine(params){_classCallCheck$43(this,PhysicsEngine);var _this=_possibleConstructorReturn$23(this,(PhysicsEngine.__proto__||Object.getPrototypeOf(PhysicsEngine)).call(this,params));_this.joints=[];_this.bodies=[];_this.iterations=getOrDefault(params,'iterations',5);_this.G=6.6742*Math.pow(10,-11);//constante gravitationnelle
_this.ke=8.99*Math.pow(10,9);//coulomb's constant
_this.relaxationCoeff=1;return _this;}/**
       * Initialization method
       * @method setup Setup
       */_createClass$38(PhysicsEngine,[{key:'setup',value:function setup(){this.context=this.getContext();this._time=new Time();this.context.addComponent(this._time);this._time.setup();this._time.on();}/*on(){
              super.on();
           }
           off(){
              super.off();
           }*//**
          * Description for undefined
          * @method update
          */},{key:'update',value:function update(){if(this._active){var body=void 0;var joint=void 0;var p1=void 0;var p2=void 0;var x=void 0;var y=void 0;var z=void 0;var distance=void 0;var dt=this._time.getDelta();//this.context.time.deltaTime;
//
if(dt===0){return;}if(dt>1){dt=1;}//console.log("dt="+dt);
var force=void 0;//apply forces / acc / vel / pos
for(var i=0;i<this.bodies.length;++i){body=this.bodies[i];body.forces=new Vector3$1(0,0,0);}//springs
for(var j=0;j<this.joints.length;++j){joint=this.joints[j];if(!joint.enabled){continue;//ignore this joint
}if(joint.type==='spring'){p1=joint.body1.position;p2=joint.body2.position;x=p2.x-p1.x;y=p2.y-p1.y;z=p2.z-p1.z;distance=Math.sqrt(x*x+y*y+z*z);//compute spring force
force=(distance-joint.distance)*joint.k;joint.body1.forces.x+=x*force;joint.body1.forces.y+=y*force;joint.body1.forces.z+=z*force;joint.body2.forces.x-=x*force;joint.body2.forces.y-=y*force;joint.body2.forces.z-=z*force;//damping force
var sx=joint.body2.velocity.x-joint.body1.velocity.x;var sy=joint.body2.velocity.y-joint.body1.velocity.y;var sz=joint.body2.velocity.z-joint.body1.velocity.z;joint.body1.forces.x+=sx*joint.damping;joint.body1.forces.y+=sy*joint.damping;joint.body1.forces.z+=sz*joint.damping;joint.body2.forces.x-=sx*joint.damping;joint.body2.forces.y-=sy*joint.damping;joint.body2.forces.z-=sz*joint.damping;}else if(joint.type==='gravity'){p1=joint.body1.position;p2=joint.body2.position;x=p2.x-p1.x;y=p2.y-p1.y;z=p2.z-p1.z;distance=Math.sqrt(x*x+y*y+z*z);//normalize
x/=distance;y/=distance;z/=distance;//compute gravity force
var mass=joint.body1.mass+joint.body2.mass;force=this.G*mass/(distance*distance);joint.body1.forces.x+=x*force;joint.body1.forces.y+=y*force;joint.body1.forces.z+=z*force;joint.body2.forces.x-=x*force;joint.body2.forces.y-=y*force;joint.body2.forces.z-=z*force;}else if(joint.type==='electrostatics'){p1=joint.body1.position;p2=joint.body2.position;x=p2.x-p1.x;y=p2.y-p1.y;z=p2.z-p1.z;distance=Math.sqrt(x*x+y*y+z*z);//normalize
x/=distance;y/=distance;z/=distance;//compute electrostatics force
force=this.ke*joint.charge1*joint.charge2/(distance*distance);joint.body1.forces.x-=x*force;joint.body1.forces.y-=y*force;joint.body1.forces.z-=z*force;joint.body2.forces.x+=x*force;joint.body2.forces.y+=y*force;joint.body2.forces.z+=z*force;}}for(var _i=0;_i<this.bodies.length;++_i){body=this.bodies[_i];//quasi Verlet
if(body.speed!==undefined){body.velocity=new Vector3$1(body.speed.x,body.speed.y,body.speed.z);body.speed=undefined;}else{body.velocity=new Vector3$1(body.position.x-body.previousposition.x,body.position.y-body.previousposition.y,body.position.z-body.previousposition.z);body.velocity.x/=dt;body.velocity.y/=dt;body.velocity.z/=dt;}body.previousposition=new Vector3$1(body.position.x,body.position.y,body.position.z);//apply gravity (FIXME, not accurate !!!)
if(this.globalgravity!==undefined){body.forces.x+=this.globalgravity.x*body.mass;body.forces.y+=this.globalgravity.y*body.mass;body.forces.z+=this.globalgravity.z*body.mass;}if(this.globalwind!==undefined){body.forces.x+=this.globalwind.x;body.forces.y+=this.globalwind.y;body.forces.z+=this.globalwind.z;}//acc
var acc=new Vector3$1(0,0,0);acc.x=body.forces.x/body.mass;acc.y=body.forces.y/body.mass;acc.z=body.forces.z/body.mass;//console.log("body acc", acc);
//speed
body.velocity.x+=acc.x*dt;body.velocity.y+=acc.y*dt;body.velocity.z+=acc.z*dt;//pos
body.position.x+=body.velocity.x*dt;body.position.y+=body.velocity.y*dt;body.position.z+=body.velocity.z*dt;//console.log("body position", body.position);
}//satisfy constraints
for(var _i2=0;_i2<this.iterations;++_i2){for(var _j=0;_j<this.joints.length;++_j){joint=this.joints[_j];if(!joint.enabled){continue;//ignore this joint
}if(joint.type==='stick'||joint.type==='string'){p1=joint.body1.position;p2=joint.body2.position;x=p2.x-p1.x;y=p2.y-p1.y;z=p2.z-p1.z;distance=Math.sqrt(x*x+y*y+z*z);//satisfy distance constraint
var err=(distance-joint.distance)/distance*1;//console.log("err=" + err);
if(joint.type==='stick'||joint.type==='string'&&distance>joint.distance){var err1=err/2;var err2=err/2;if(joint.body1.fixed){err1=0;err2=err;}else if(joint.body2.fixed){err1=err;err2=0;}p1.x=p1.x+x*err1*this.relaxationCoeff;p2.x=p2.x-x*err2*this.relaxationCoeff;p1.y=p1.y+y*err1*this.relaxationCoeff;p2.y=p2.y-y*err2*this.relaxationCoeff;p1.z=p1.z+z*err1*this.relaxationCoeff;p2.z=p2.z-z*err2*this.relaxationCoeff;}}else if(joint.type==='fixed'){//console.log("fixed = " , joint.position);
joint.body1.position=new Vector3$1(joint.position.x,joint.position.y,joint.position.z);joint.body1.velocity=new Vector3$1(0,0,0);}}}//apply new positions
for(var _i3=0;_i3<this.bodies.length;++_i3){body=this.bodies[_i3];if(body.object!==undefined){//console.log("new pos=" , body.position);
body.object.transform.setLocalPosition(body.position);}}}}/**
          * addBody
          * @method addBody
          * @param {Vector3} position
          * @param {Number} mass
          * @param {Mesh} object the Mesh to attach this physics body to
          * @return {Body} the added physic body
          */},{key:'addBody',value:function addBody(position,mass,object){var body={};body.position=new Vector3$1(position.x,position.y,position.z);//console.log("body position : ", body.position);
body.previousposition=new Vector3$1(position.x,position.y,position.z);body.mass=mass;body.object=object;body.velocity=new Vector3$1(0,0,0);this.bodies.push(body);return body;}/**
          * addFixedJoint
          * @method addFixedJoint
          * @param {Mesh} body
          * @param {Vector3} position
          * @return {Body} the added joint body
          */},{key:'addFixedJoint',value:function addFixedJoint(body,position){var joint={};joint.body1=body;joint.body1.fixed=true;joint.type='fixed';joint.position=new Vector3$1(position.x,position.y,position.z);joint.enabled=true;this.joints.push(joint);return joint;}/**
          * addStickJoint
          * @method addStickJoint
          * @param {Mesh} body1
          * @param {Mesh} body2
          * @param {Number} distance
          * @return {Body} the added joint body
          */},{key:'addStickJoint',value:function addStickJoint(body1,body2,distance){var joint={};joint.body1=body1;joint.body2=body2;joint.type='stick';joint.distance=distance;joint.enabled=true;this.joints.push(joint);return joint;}/**
          * addSpringJoint
          * @method addSpringJoint
          * @param {Mesh} body1
          * @param {Mesh} body2
          * @param {Number} distance
          * @param {Number} k
          * @param {Number} damping
          * @return {Body} the added joint body
          */},{key:'addSpringJoint',value:function addSpringJoint(body1,body2,distance,k,damping){var joint={};joint.body1=body1;joint.body2=body2;joint.type='spring';joint.distance=distance;joint.k=k;joint.damping=damping;joint.enabled=true;this.joints.push(joint);return joint;}/**
          * addStringJoint
          * @method addStringJoint
          * @param {Mesh} body1
          * @param {Mesh} body2
          * @param {Number} distance
          * @return {Body} the added joint body
          */},{key:'addStringJoint',value:function addStringJoint(body1,body2,distance){var joint={};joint.body1=body1;joint.body2=body2;joint.type='string';joint.distance=distance;joint.enabled=true;this.joints.push(joint);return joint;}/**
          * addGravityJoint
          * @method addGravityJoint
          * @param {Mesh} body1
          * @param {Mesh} body2
          * @return {Body} the added joint body
          */},{key:'addGravityJoint',value:function addGravityJoint(body1,body2){var joint={};joint.body1=body1;joint.body2=body2;joint.type='gravity';joint.enabled=true;this.joints.push(joint);return joint;}/**
          * addElectrostaticsJoint
          * @method addElectrostaticsJoint
          * @param {Mesh} body1
          * @param {Mesh} body2
          * @param {Number} charge1
          * @param {Number} charge2
          * @return {Body} the added joint body
          */},{key:'addElectrostaticsJoint',value:function addElectrostaticsJoint(body1,body2,charge1,charge2){var joint={};joint.body1=body1;joint.body2=body2;joint.type='electrostatics';joint.charge1=charge1;joint.charge2=charge2;joint.enabled=true;this.joints.push(joint);return joint;}/**
          * setGlobalGravity
          * @method setGlobalGravity
          * @param {Vector3} vector
          */},{key:'setGlobalGravity',value:function setGlobalGravity(vector){this.globalgravity=vector;}/**
          * setGlobalWind
          * @method setGlobalWind
          * @param {Vector3} vector
          */},{key:'setGlobalWind',value:function setGlobalWind(vector){this.globalwind=vector;}}]);return PhysicsEngine;}(Component);var _createClass$39=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$44(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Engine3D=function(){/**
       * Engine3D class contains the technical elements that bind Mobilizing.js API to a 3D rendering library. Currently, it's Three.js that is used to acheive 3D rendering. In the future, we can imagine to use an other library or a home made Engine.
       *
       * @class Engine3D
       * @constructor
       * @param {Canvas} canvas the canvas to use, if any, otherwise the Engine produce one.
       * @param {Context} context the Mobilizing.js context to use, if any.
       */function Engine3D(params){_classCallCheck$44(this,Engine3D);//we try to use the canvas
//try
if(params.canvas){var canvas=params.canvas;debug.log('try to attach the Canvas...',canvas);//Mobilizing.renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')}); //FIXME : Ejecta
//this.renderer = new THREE.WebGLRenderer({canvas: document.getElementById(canvas)});
this.renderer=new THREE.WebGLRenderer({canvas:canvas});this.engine='webgl';if(this.renderer.devicePixelRatio===undefined){this.renderer.devicePixelRatio=window.devicePixelRatio;}this.renderer.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1);//force retina
this.renderer.setSize(canvas.width/window.devicePixelRatio,canvas.height/window.devicePixelRatio);canvas.style.width=canvas.width/window.devicePixelRatio+'px';canvas.style.height=canvas.height/window.devicePixelRatio+'px';this.canvas=canvas;this.canvas.retinaResolutionEnabled=true;this.windowWidth=this.canvas.clientWidth;this.windowHeight=this.canvas.clientHeight;debug.log('existing CANVAS',this.renderer);}else{debug.log('retrieve Canvas failed, create a new canvas');//this.renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true, alpha:true});
this.renderer=new THREE.WebGLRenderer({alpha:true});this.engine='webgl';this.renderer.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1);//force retina
if(this.renderer.devicePixelRatio===undefined){this.renderer.devicePixelRatio=window.devicePixelRatio;}this.renderer.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(this.renderer.domElement);this.canvas=this.renderer.domElement;this.canvas.retinaResolutionEnabled=true;this.windowWidth=window.innerWidth;this.windowHeight=window.innerHeight;}debug.log('engine = '+this.engine);this.renderer.setClearColor(0x000000,1.0);this.renderer.autoClear=true;//false
debug.log('window pixel ratio = '+window.devicePixelRatio);/*
          this.renderer.setPixelRatio( window.devicePixelRatio ); //force retina
          this.renderer.setSize( window.innerWidth, window.innerHeight);*/}/**
      * Returns the current Engine rendering canvas
      * @method getCanvas
      * @return {Canvas} the canvas being used.
      */_createClass$39(Engine3D,[{key:'getCanvas',value:function getCanvas(){return this.canvas;}}]);return Engine3D;}();var _createClass$40=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$45(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$24(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$24(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Renderer3D=function(_Component){_inherits$24(Renderer3D,_Component);/**
       * Renderer3D is a Three js based renderer.
       *
       *
       * @example
       *     //to do
       *
       * @class Renderer3D
       * @constructor
       * @extends Component
       * @param {Object} params Config parameters
       * @param {Context} params.context The Mobilizing context
      */function Renderer3D(params){_classCallCheck$45(this,Renderer3D);var _this=_possibleConstructorReturn$24(this,(Renderer3D.__proto__||Object.getPrototypeOf(Renderer3D)).call(this,params));_this.canvas=getOrDefault(params,'canvas',undefined);_this.scenes=[];_this.cameras=[];_this.fog=undefined;_this.setCurrentScene('default');_this.engine=new Mobilizing.Engine3D({canvas:_this.canvas});//3D engine creation - we pass the Canvas
//we must register the canvas when made internally by Mobilizing/Three
if(_this.canvas){_this.fullscreen=false;debug.log('got canvas from runner to context',_this.canvas);}else{_this.canvas=_this.engine.canvas;_this.fullscreen=true;debug.log('got canvas from Engine',_this.canvas);}//==================================================================
//window management
window.addEventListener('orientationchange',function(event){return _this.onWindowResize(event);},false);window.addEventListener('resize',function(event){return _this.onWindowResize(event);},false);// deal with the page getting resized or scrolled
window.addEventListener('scroll',function(event){return _this.updateCanvasPosition(event);},false);window.addEventListener('resize',function(event){return _this.updateCanvasPosition(event);},false);_this.canvasPosition=_this.getCanvasPosition();return _this;}/*setup()
      {
      }*//*on(){
          super.on();
      }
       off(){
          super.off();
      }*//**
       * @method update
       */_createClass$40(Renderer3D,[{key:'update',value:function update(){this.render();}//deprecated
},{key:'setClearColor',value:function setClearColor(color,alpha){this.engine.renderer.setClearColor(color,alpha);}/**
          * Activates the rendering of projected shadows
          * @method setEnableShadowMap
          * @param {Boolean} state
          */},{key:'setEnableShadowMap',value:function setEnableShadowMap(state){this.engine.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.engine.renderer.shadowMapEnabled=state;}/**
           * Tells the context to use this scene (defined by a string) or create it and switch to it.
           * @method setCurrentScene
           * @param {String} name
           */},{key:'setCurrentScene',value:function setCurrentScene(name){this.scene=this.scenes[name];if(this.scene===undefined){this.scene=new THREE.Scene();this.scenes[name]=this.scene;debug.log('current scene is : ',this.scene);}}/**
           * Adds on object to the current scene
           * @method addToCurrentScene
           * @param {Object} object A Mesh or Light to add the scene
           */},{key:'addToCurrentScene',value:function addToCurrentScene(object){this.scene.add(object.transform.entity);}/**
           * Remove from the current scene
           * @method removeFromCurrentScene
           * @param {Object} object the object to remove
           */},{key:'removeFromCurrentScene',value:function removeFromCurrentScene(object){this.scene.remove(object.transform.entity);}/**
           * Clears this renderer : remove all cameras and scene objects
           *
           * @method addCamera
           * @param {Camera} cam the camera to add
           */},{key:'clear',value:function clear(){var _this2=this;console.log('scene=',this.scene);this.scene.children.forEach(function(child){console.log('removing ',child);_this2.scene.remove(child);});this.scene.children=[];this.cameras=[];}/**
           * Adds a camera to the current context
           *
           * @method addCamera
           * @param {Camera} cam the camera to add
           */},{key:'addCamera',value:function addCamera(cam){this.cameras.push(cam);}/**
           * Removes the camera from the current context
           *
           * @method removeCamera
           * @param {Camera} cam
           */},{key:'removeCamera',value:function removeCamera(cam){this.cameras.splice(this.cameras.indexOf(cam),1);}/**
           * Defines the type and color of the fog to be used for rendering the scene
           *
           * @method setFog
           * @param {String} type one of "linear", "exp"
           * @param {Color} color the fog color
           */},{key:'setFog',value:function setFog(type,color){if(!color){color=Color$1.black.clone();}switch(type){case'linear':this.fog=new THREE.Fog(color.getHex());this.fog.type='linear';break;case'exp':this.fog=new THREE.FogExp2(color.getHex());this.fog.type='exp';break;default:this.fog=new THREE.Fog(color.getHex());this.fog.type='linear';break;}this.scene.fog=this.fog;}/**
           * Defines the near distance of the linear fog. Default is 1.
           *
           * @method setFogNear
           * @param {Number} near
           */},{key:'setFogNear',value:function setFogNear(near){if(this.fog.type==='linear'){this.fog.near=near;}}/**
           * Defines the far distance of the linear fog. Default is 1000.
           *
           * @method setFogFar
           * @param {Number} far
           */},{key:'setFogFar',value:function setFogFar(far){if(this.fog.type==='linear'){this.fog.far=far;}}/**
           * Defines the density of the exponential fog.  Default is 0.00025.
           *
           * @method setFogDensity
           * @param {Number} density
           */},{key:'setFogDensity',value:function setFogDensity(val){if(this.fog.type==='exp'){this.fog.density=val;}}/**
           * Defines the fog color
           *
           * @method setFogColor
           * @param {Color} color
           */},{key:'setFogColor',value:function setFogColor(color){this.fog.color=color;}},{key:'onWindowResize',value:function onWindowResize(){var _this3=this;if(this.fullscreen){this.cameras.forEach(function(cam){if(cam.type==='perspective'){var w=_this3.engine.renderer.domElement.width/_this3.engine.renderer.devicePixelRatio;var h=_this3.engine.renderer.domElement.height/_this3.engine.renderer.devicePixelRatio;cam.setAspect(w*cam.viewport.width/(h*cam.viewport.height));}else if(cam.type==='ortho'){cam.setOrthoPlanes(window.innerWidth/-2,window.innerWidth/2,window.innerHeight/2,window.innerHeight/-2);}});this.engine.renderer.setSize(window.innerWidth,window.innerHeight);}}/**
           * Renders all the camera in the context
           * @method render
           */},{key:'render',value:function render(){//rendu de toutes les caméras
//debug.log("render " + this.cameras.length + " cams");
//simple insertion index sorting
for(var l=0;l<this.cameras.length;++l){this.cameras[l].sort=false;if(this.cameras[l].index===undefined){this.cameras[l].index=0;}}var sorted_cameras=[];var min_val=9999;var min_cam=null;for(var i=0;i<this.cameras.length;++i){//recherche de l'élément le plus petit pas encore trié
min_val=9999;min_cam=null;for(var j=0;j<this.cameras.length;++j){var cam_candidate=this.cameras[j];//debug.log("evaluating cam.index=" + cam_candidate.index);
if(cam_candidate.index<=min_val&&!cam_candidate.sort){min_cam=cam_candidate;min_val=cam_candidate.index;}}if(min_cam){min_cam.sort=true;//debug.log("push cam with index=" + min_val);
sorted_cameras.push(min_cam);}}for(var k=0;k<sorted_cameras.length;++k){//debug.log("render " + k);
var cam=sorted_cameras[k];if(cam.transform.getVisible()&&(cam.dirty||cam.autorender)){var w=this.engine.renderer.domElement.width/this.engine.renderer.devicePixelRatio;var h=this.engine.renderer.domElement.height/this.engine.renderer.devicePixelRatio;if(cam.type!=='cube'){cam.setAspect(w*cam.viewport.width/(h*cam.viewport.height));}var viewport_x=w*cam.viewport.x;var viewport_y=h*cam.viewport.y;var viewport_w=w*cam.viewport.width;var viewport_h=h*cam.viewport.height;this.engine.renderer.setViewport(viewport_x,viewport_y,viewport_w,viewport_h);this.engine.renderer.setScissor(viewport_x,viewport_y,viewport_w,viewport_h);this.engine.renderer.setScissorTest(true);this.engine.renderer.autoClear=cam.autoclear;for(var ks in this.scenes){if(this.logLevel===1){debug.log('render cam/scene ',cam,ks);}if(cam.layer===ks)//si la scène a le même nom que le layer de la caméra
{if(cam.renderTexture!==undefined){this.engine.renderer.render(this.scenes[ks],cam._camera,cam.renderTexture._engineTexture,cam.autoClear);}else if(cam.type==='cube'){cam._camera.updateCubeMap(this.engine.renderer,this.scenes[ks]);}else{this.engine.renderer.render(this.scenes[ks],cam._camera);}cam.dirty=false;}}}}}/**
          * Returns the current canvas
          *
          * @method getCanvas
          * @return {Object} the canvas
          */},{key:'getCanvas',value:function getCanvas(){return this.canvas;}/**
          * Returns the current canvas'size as {width, height}
          *
          * @method getCanvasSize
          * @return {Object} the size of the canvas as {width, height}
          */},{key:'getCanvasSize',value:function getCanvasSize(){return{width:this.canvas.width/window.devicePixelRatio,height:this.canvas.height/window.devicePixelRatio};}/**
          * Get the canvas position as {x, y}
          *
          * @method getCanvasPosition
          * @return {Object} the position of the canvas as {x, y}
          */},{key:'getCanvasPosition',value:function getCanvasPosition(){return _DOM.getElementPosition(this.canvas);}/**
          * Update the canvas position in screen
          *
          * @method updateCanvasPosition
          */},{key:'updateCanvasPosition',value:function updateCanvasPosition(){this.canvasPosition=this.getCanvasPosition();}}]);return Renderer3D;}(Component);var Renderer3DSingleton=singletonize(Renderer3D);var _createClass$41=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$10=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$46(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$25(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$25(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var RendererAudio=function(_Component){_inherits$25(RendererAudio,_Component);/**
       * RendererAudio is a Web Audio API based renderer for playing sound.
       *
       * @example
       *     //to do
       *
       * @class RendererAudio
       * @constructor
       * @extends Component
       * @param {Object} params Config parameters
      */function RendererAudio(params){_classCallCheck$46(this,RendererAudio);var _this=_possibleConstructorReturn$25(this,(RendererAudio.__proto__||Object.getPrototypeOf(RendererAudio)).call(this,params));_this.renderer=_this.getContext();_this.audioContext=undefined;//web Audio API
if(_this.params===undefined||_this.params.audioEnabled){if(window.AudioContext!==undefined){_this.audioContext=new window.AudioContext();}else if(window.webkitAudioContext!==undefined){_this.audioContext=new window.webkitAudioContext();}//hack to reset the SR
if(_this.audioContext){if(_this.audioContext.sampleRate!==44100){var buffer=_this.audioContext.createBuffer(1,1,44100);var dummy=_this.audioContext.createBufferSource();dummy.buffer=buffer;dummy.connect(_this.audioContext.destination);dummy.start(0);dummy.disconnect();_this.audioContext.close();if(window.AudioContext!==undefined){_this.audioContext=new window.AudioContext();}else if(window.webkitAudioContext!==undefined){_this.audioContext=new window.webkitAudioContext();}}_this.audioOutputNode=_this.audioContext.createGain();_this.audioOutputNode.connect(_this.audioContext.destination);}}_this.listener=_this.audioContext.listener;if(_this.listener.forwardX){_this.listener.forwardX.value=0;_this.listener.forwardY.value=0;_this.listener.forwardZ.value=-1;_this.listener.upX.value=0;_this.listener.upY.value=1;_this.listener.upZ.value=0;}else{_this.listener.setOrientation(0,0,-1,0,1,0);}return _this;}_createClass$41(RendererAudio,[{key:'beep',value:function beep(frequency){var freq=frequency?frequency:440;var osc=this.audioContext.createOscillator();//this.audioOutputNode.gain.value = 0;
osc.connect(this.audioOutputNode);osc.frequency.value=freq;osc.start(0);osc.stop(this.audioContext.currentTime+0.3);}},{key:'setListenerTransform',value:function setListenerTransform(transform){this.listener.transform=transform;}/*setup()
          {
          }
           on()
          {
              super.on();
          }
           off()
          {
              super.off();
          }
          */},{key:'update',value:function update(){_get$10(RendererAudio.prototype.__proto__||Object.getPrototypeOf(RendererAudio.prototype),'update',this).call(this);if(this.listener.transform){var pos=this.listener.transform.getLocalPosition();this.listener.setPosition(pos.x,pos.y,pos.z);}}}]);return RendererAudio;}(Component);var RendererAudioSingleton=singletonize(RendererAudio);var _createClass$42=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$47(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Font$1=function(){/**
       Font are not managed in Mobilizing.js like in a usual DOM context as we are using WebGL. To be able to use both bitmap rendered font and 3D vector rendering, we use openType.js (https://nodebox.github.io/opentype.js/ big thanks to Frederik!) to load any web compilant font and the use it in other classes (like {{#crossLink "Label"}}{{/crossLink}} or {{#crossLink "Mesh"}}{{/crossLink}})
       @class Font
       @constructor
       @param {Object} params
       @param {Mixed} params.fontFile the font file already loaded, must be loaded with response type setted to arraybuffer
      */function Font$$1(params){_classCallCheck$47(this,Font$$1);this._fontFile=getOrDefault(params,'fontFile',undefined);this._font=opentype.parse(this._fontFile);}/**
      * Return the underlying Font.js object to work with it outside of Mobilizing.Font
      * @private
      * @method getFont
      * @return {Object} Font.js object
      */_createClass$42(Font$$1,[{key:'getFont',value:function getFont(){return this._font;}/**
          * Calculates the size (in pixels) that should take the string with this font at the given fontSize. Handy for Label creation.
          * @method getTextSize
          * @param {String} text the string to use for the size computing
          * @param {Number} fontSize the text font size to use
          * @return {Object.width, Object.height} width and height
          */},{key:'getTextSize',value:function getTextSize(text,fontSize){if(!this._font.supported){return null;}var kerning=void 0,fontScale=void 0,glyphs=void 0,i=void 0,glyph=void 0,options=void 0,kerningValue=void 0;var ymax=[];var x=0;fontSize=fontSize!==undefined?fontSize:72;options=options||{};kerning=options.kerning===undefined?true:options.kerning;fontScale=1/this._font.unitsPerEm*fontSize;glyphs=this._font.stringToGlyphs(text);for(i=0;i<glyphs.length;i+=1){glyph=glyphs[i];ymax.push((glyph.getMetrics().yMax-glyph.getMetrics().yMin)*fontScale);if(glyph.advanceWidth){x+=glyph.advanceWidth*fontScale;}if(kerning&&i<glyphs.length-1){kerningValue=this._font.getKerningValue(glyph,glyphs[i+1]);x+=kerningValue*fontScale;}}return{width:x,height:Math.max.apply(0,ymax)};}}]);return Font$$1;}();var _createClass$43=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$48(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/*
   * LODGroup Class
   *
   * @class LODGroup
   */var LODGroup=function(){function LODGroup(){_classCallCheck$48(this,LODGroup);this.transform=new Transform(this/*.light*/);this.bias=1;this.factor=-0.1;}//process LOD
_createClass$43(LODGroup,[{key:'process',value:function process()/*position*/{// var thisposition = this.transform.getWorldPosition();
// var distance = this.getDistance(position, thisposition);
// var lod = this.bias+distance*this.factor;
}},{key:'getDistance',value:function getDistance(p1,p2){var d=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y)+(p1.z-p2.z)*(p1.z-p2.z));return d;}},{key:'applyLOD',value:function applyLOD()/*lod*/{}}]);return LODGroup;}();var _createClass$44=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$49(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
   * StyledLetter is a class that helps to represents a letter with its style for later drawing.
   * @class StyledLetter
   * @constructor
   * @param {Object} params Parameters Object
   * @param {String} params.letter the letter's string (character)
   * @param {Number} params.size the size of the font
   * @param {Font} params.font a Mobilizing font reference
   * @param {Color} params.color a Mobilizing Color
   */var StyledLetter=function(){function StyledLetter(params){_classCallCheck$49(this,StyledLetter);this.letter=getOrDefault(params,'letter','');this.size=getOrDefault(params,'size',40);this.font=getOrDefault(params,'font',undefined);//mobilizing font
// this.path; //openType Path
// this.boundingBox; //derived from path
this.color=getOrDefault(params,'color',Color$1.black.clone());this.x=0;this.y=0;this.width=0;this.height=0;if(this.font){this.update();}}/**
      * Updates properties according to the new settings
      * @method update
      */_createClass$44(StyledLetter,[{key:'update',value:function update(){var size=this.font.getTextSize(this.letter,this.size);this.width=size.width;this.height=size.height;this.path=this.font.getFont().getPath(this.letter,this.x,this.y,this.size);this.path.fill='#'+this.color.getHexString();//this.color;
this.boundingBox=this.path.getBoundingBox();}/**
          * Defines the letter's string
          * @method setLetter
          * @param {String} letter
          */},{key:'setLetter',value:function setLetter(val){this.letter=val;}/**
          * Defines the letter's x coord
          * @method setX
          * @param {Number} x
          */},{key:'setX',value:function setX(val){this.x=val;}/**
          * Defines the letter's y coord
          * @method setY
          * @param {Number} y
          */},{key:'setY',value:function setY(val){this.y=val;}/**
          * Defines the letter's font size
          * @method setSize
          * @param {Number} size
          */},{key:'setSize',value:function setSize(val){this.size=val;}/**
          * Defines the letter's color
          * @method setColor
          * @param {Color} color
          */},{key:'setColor',value:function setColor(color){this.color=color;}/**
          * Defines the letter's font
          * @method setFont
          * @param {Font} font
          */},{key:'setFont',value:function setFont(font){this.font=font;}}]);return StyledLetter;}();/**
   * StyledTextElement is a simple class to organise text elements extacted from HTML text. It contains an array of StyledLetter.
   * @class StyledTextElement
   * @constructor
   * @param {Object} params Parameters Object
   * @param {String} params.text the text string (character)
   * @param {Number} params.size the size of the font
   * @param {Font} params.font a Mobilizing font reference
   * @param {Color} params.color a Mobilizing Color
   */var StyledTextElement=function(){function StyledTextElement(params){_classCallCheck$49(this,StyledTextElement);this.text=getOrDefault(params,'text','');this.font=getOrDefault(params,'font',undefined);this.size=getOrDefault(params,'size',40);this.color=getOrDefault(params,'color',Color$1.black.clone());// this.path;
// this.boundingBox;
this.line=0;this.x=0;this.y=0;this.width=0;this.height=0;this.styledLetters=[];if(this.font){this.update();}}/**
      * Updates properties according to the new settings (including styledLetters array properties)
      * @method update
      */_createClass$44(StyledTextElement,[{key:'update',value:function update(){var size=this.font.getTextSize(this.text,this.size);this.width=size.width;this.height=size.height;this.path=this.font.getFont().getPath(this.text,this.x,this.y,this.size);this.path.fill='#'+this.color.getHexString();//this.color;
this.boundingBox=this.path.getBoundingBox();var baseWidth=0;for(var i=0;i<this.styledLetters.length;i++){var styledLetter=this.styledLetters[i];styledLetter.font=this.font;if(i===0){styledLetter.setX(this.x);baseWidth=styledLetter.width;}else{styledLetter.setX(this.x+baseWidth);baseWidth+=styledLetter.width;}styledLetter.setY(this.y);styledLetter.setSize(this.size);styledLetter.setColor(this.color);styledLetter.update();}}/**
          * Defines the letter's font
          * @method setFont
          * @param {Font} font
          */},{key:'setFont',value:function setFont(font){this.font=font;}/**
          * Defines the letter's color
          * @method setColor
          * @param {Color} color
          */},{key:'setColor',value:function setColor(color){this.color=color;}/**
          * Defines the letter's x
          * @method setX
          * @param {Number} x
          */},{key:'setX',value:function setX(val){this.x=val;}/**
          * Defines the letter's y
          * @method setY
          * @param {Number} y
          */},{key:'setY',value:function setY(val){this.y=val;}/**
          * Defines the letter's font size
          * @method setSize
          * @param {Font} size
          */},{key:'setSize',value:function setSize(val){this.size=val;}/**
          * Defines the letter's path
          * @method setPath
          * @param {Path} openType.js object's Path
          */},{key:'setPath',value:function setPath(val){this.path=val;}/**
          * Defines the letter's text string
          * @method setText
          * @param {String} text
          */},{key:'setText',value:function setText(val){this.text=val;this.styledLetters=[];for(var i=0;i<this.text.length;i++){var char=this.text.charCodeAt(i);var styledLetter=new StyledLetter({letter:String.fromCharCode(char),font:this.font,size:this.size,color:this.color});this.styledLetters.push(styledLetter);}}}]);return StyledTextElement;}();var TextLine=/**
  * TextLine is a thin layer class to organise text elements extacted from HTML text in lines. It gives the possibility to easily compute the global size of the line. Used in RichText.
  * @class TextLine
  * @constructor
  */function TextLine(){_classCallCheck$49(this,TextLine);this.styledTextElements=[];this.width=0;};var _createClass$45=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$50(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$26(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$26(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
  * Triggered when the canvas has been redrawn, useful to synchronise Texture update and canvas refresh
  * @event drawn
  */var EVT_DRAWN='drawn';var TEXT_ALIGN_LEFT='left';var TEXT_ALIGN_RIGHT='right';var TEXT_ALIGN_CENTER='center';var RichText=function(_Base){_inherits$26(RichText,_Base);/**
      * RichText class uses standard HTML Text to format text drawn with a certain style in a Canvas. Supported HTML style tags are <b>, <strong>, <i>, <em>, <br>, <p>, <font> with attributes color and size. TODO : support of face attribute in <font>. Default font are predefined.
      * @class RichText
      * @extends Base
      * @constructor
      * @param {Object} params Parameters Object
      * @param {HTMLNode} params.htmlText the html text to draw in the canvas
      * @param {Number} [params.width=512] width of the inner canvas
      * @param {Number} [params.height=512] height of the inner canvas
      * @param {Number} [params.lineHeight=1] line height for the text
      * @param {Number} [params.margins=10] white space (margin) in pixel on all left, top, right and bottom of the canvas. Text will be drawn within these boundaries with automatic newline management.
      * @param {Number} [params.marginLeft=10] white space (margin) in pixel on left side.
      * @param {Number} [params.marginTop=10] white space (margin) in pixel on top side.
      * @param {Number} [params.marginRight=10] white space (margin) in pixel on right side.
      * @param {Number} [params.marginBottom=10] white space (margin) in pixel on bottom side.
      * @param {Number} [params.textSize=20] size, in pixels, of the text
      * @param {Color} [params.textColor=black] color the text default color
      * @param {Color} [params.textAlign="left"] text alignment in the canvas (margins included), can be one of "left", "center", "right".
      * @param {Color} [params.backgroundColor=white] color the background color
      * @param {Boolean} [params.drawBoundingBox=false] tell to draw the bounding boxes of every text blocs or not
      * @param {Number} [params.boundingBoxStrokeWidth=1] the lineWidth to use for bounding boxes drawing
      * @param {URL} params.fontURL url for the regular font file
      * @param {URL} params.fontItalicURL url for the italic font file
      * @param {URL} params.fontBoldURL url for the bold font file
      * @param {URL} params.fontBoldItalicURL url for the bold-italic font file
      *
      */function RichText(params){_classCallCheck$50(this,RichText);var _this=_possibleConstructorReturn$26(this,(RichText.__proto__||Object.getPrototypeOf(RichText)).call(this,params));_this._width=getOrDefault(params,'width',512);_this._height=getOrDefault(params,'height',512);_this._backgroundColor=getOrDefault(params,'backgroundColor',Color$1.white.clone());_this._lineHeight=getOrDefault(params,'lineHeight',1);_this._margins={left:0,right:0,top:0,bottom:0};var margins=getOrDefault(params,'margins',10);_this._margins.left=getOrDefault(params,'marginLeft',margins);_this._margins.right=getOrDefault(params,'marginRight',margins);_this._margins.top=getOrDefault(params,'marginTop',margins);_this._margins.bottom=getOrDefault(params,'marginBottom',margins);_this._textSize=getOrDefault(params,'textSize',20);_this._textColor=getOrDefault(params,'textColor',Color$1.black.clone());_this._textAlign=getOrDefault(params,'textAlign',TEXT_ALIGN_LEFT);_this._boundingBoxStrokeWidth=getOrDefault(params,'boundingBoxStrokeWidth',1);_this._drawBoundingBox=getOrDefault(params,'drawBoundingBox',false);_this._fontURL=getOrDefault(params,'fontURL','fonts/Raleway-Regular.ttf');_this._fontItalicURL=getOrDefault(params,'fontItalicURL','fonts/Raleway-Regular-Italic.ttf');_this._fontBoldURL=getOrDefault(params,'fontBoldURL','fonts/Raleway-Bold.ttf');_this._fontBoldItalicURL=getOrDefault(params,'fontBoldItalicURL','fonts/Raleway-Bold-Italic.ttf');_this._canvas=document.createElement('canvas');_this._canvas.width=_this._width;_this._canvas.height=_this._height;_this._canvasContext=_this._canvas.getContext('2d');_this._canvas.events=new EventEmitter({scope:_this._canvas});/*document.body.appendChild(this._canvas);
          this._canvas.style.position = "absolute";*/_this._text=getOrDefault(params,'text',undefined);if(_this._text){_this._DOMText=document.createElement('div');_this._DOMText.innerHTML=_this._text;_this.styledText=_this.parseDOMTree(_this._DOMText);}else{console.error('no html text provided');}//for internal use
_this._lines=[];//loading font chain
Loader.loadArrayBuffer(_this._fontURL,function(fotnData){_this._defaultFontFile=fotnData;Loader.loadArrayBuffer(_this._fontItalicURL,function(fotnItalicData){_this._defaultItalicFontFile=fotnItalicData;Loader.loadArrayBuffer(_this._fontBoldURL,function(fontBoldData){_this._defaultBoldFontFile=fontBoldData;Loader.loadArrayBuffer(_this._fontBoldItalicURL,function(fontBoldItalicData){_this._defaultBoldItalicFontFile=fontBoldItalicData;_this.setup();});});});});return _this;}/**
      * Setup bloc called after default font loading
      * @private
      * @method setup
      */_createClass$45(RichText,[{key:'setup',value:function setup(){this._defaultFont=new Font$1({fontFile:this._defaultFontFile});this._defaultItalicFont=new Font$1({fontFile:this._defaultItalicFontFile});this._defaultBoldFont=new Font$1({fontFile:this._defaultBoldFontFile});this._defaultBoldItalicFont=new Font$1({fontFile:this._defaultBoldItalicFontFile});this.render();}/**
          * Get canvas width
          * @method getWidth
          * @return {Number} canvas width
          */},{key:'getWidth',value:function getWidth(){return this._width;}/**
          * Get canvas height
          * @method getHeight
          * @return {Number} canvas height
          */},{key:'getHeight',value:function getHeight(){return this._height;}/**
          * Get the canvas
          * @method getCanvas
          * @return {Canvas} canvas
          */},{key:'getCanvas',value:function getCanvas(){return this._canvas;}/**
          * Stater method to process the html tree. Manage internally the array used afterward to contain all StyledTextElement.
          * @method parseDOMTree
          * @param {DOMNodeObject} baseNode
          * @return {Array} the resulting StyledTextElement array
          */},{key:'parseDOMTree',value:function parseDOMTree(baseNode){var styledText=[];this.processDOMTree(baseNode,styledText);//console.log(styledText);
return styledText;}/**
          * Recursive process of an html tree from it's main node. This method return a linear list (in the original text strings order) of StyledTextElement in order to cumulate all the tags a piece of string is attach to and the attributes of its immediate parent tag.
          * @method processDOMTree
          * @param {DOMNodeObject} baseNode
          * @param {Array} destArray the array of destination
          */},{key:'processDOMTree',value:function processDOMTree(baseNode,destArray){var i=0;var node=void 0;//lazy <p> support : <p> has automatic margin, top and bottom, of 1 line-height, which is 2 <br> ;-)
//TODO : support <p> top and bottom margin ?
if(baseNode.tagName==='P'){if(baseNode.previousElementSibling.tagName==='P'){baseNode.innerHTML=baseNode.innerHTML+'<br>';}else{baseNode.innerHTML='<br><br>'+baseNode.innerHTML+'<br>';}}while(node=baseNode.childNodes[i]){var children=node.childNodes.length;if(children>=1){this.processDOMTree(node,destArray);}else{//split the textContent
var words=node.textContent.split(/\s/);//StyledTextElement array construction loop
for(var w=0;w<words.length;w++){var el=new StyledTextElement();//surchage StyledTextElement
el.attributes=[];el.tags=[];el.setText(words[w]);//reconstruct white space, lost after split, take first place, \n and "." is first as conditions
if(w!==0){el.text=' '+el.text;}//manage attributes at parent level as it's how it's done
if(node.parentNode.attributes){for(var a=0;a<node.parentNode.attributes.length;a++){el.attributes.push({name:node.parentNode.attributes[a].name,value:node.parentNode.attributes[a].value});}}if(node.tagName){el.tags.push(node.tagName);}var tempNode=node;while(tempNode.parentNode){if(tempNode.parentNode.tagName!=='DIV')//avoid to take the main enclosing span
{el.tags.push(tempNode.parentNode.tagName);}tempNode=tempNode.parentNode;}destArray.push(el);}}i++;}return destArray;}/**
          * Render the input HTML text parsed in an array of StyledTextElement in the current canvas
          * @method render
          */},{key:'render',value:function render(){//background color
if(this._backgroundColor!==Color$1.transparent.makeRGBAStringWithAlpha(0)){//console.log(this._backgroundColor, Color.transparent.makeRGBAStringWithAlpha(0));
this._canvasContext.fillStyle='#'+this._backgroundColor.getHexString();this._canvasContext.fillRect(0,0,this._width,this._height);}//x position of drawing (letter pos in x)
var letterXOffset=this._margins.left;//y position of drawing (letter pos in y, or baseline)
var lineYOffset=this._margins.top;//number of lines in the canvas
var lineCount=0;for(var i=0;i<this.styledText.length;i++){var el=this.styledText[i];//select the font to use
var currentFont=this._defaultFont;//define the font based on associated tags
if(el.tags.indexOf('B')>=0||el.tags.indexOf('STRONG')>=0){currentFont=this._defaultBoldFont;}if(el.tags.indexOf('I')>=0||el.tags.indexOf('EM')>=0){currentFont=this._defaultItalicFont;}if(el.tags.indexOf('B')>=0&&el.tags.indexOf('I')>=0||el.tags.indexOf('STRONG')>=0&&el.tags.indexOf('EM')>=0){currentFont=this._defaultBoldItalicFont;}var size=this._textSize;//test for new line <br> and add a new line to lineCount
if(el.tags.indexOf('BR')>=0){lineYOffset+=size*this._lineHeight;letterXOffset=this._margins.left;//increment the lineNb
lineCount++;console.log('lineYOffset',lineYOffset);}var color=this._textColor;//is it the 1st run ?  place the baseline to the margin + font size
if(lineYOffset===this._margins.top){lineYOffset+=size;}//test for new line from canvas width limit and reset offsets and add a new line to lineCount
var tempWidth=letterXOffset+currentFont.getTextSize(el.text,size).width;if(tempWidth>this._width-this._margins.right){lineYOffset+=size*this._lineHeight;letterXOffset=this._margins.left;//to erase first space and avoid unused whitespace at line start
el.text=el.text.replace(/^\s/,'');//increment the lineNb
lineCount++;}//manage font tag attributes
//TODO : manage font changes!!
if(el.attributes){for(var j=0;j<el.attributes.length;j++){if(el.attributes[j].name==='color'){color=new Color$1(el.attributes[j].value);}if(el.attributes[j].name==='size'){size=Number(el.attributes[j].value);}}}//set the font to use
el.setFont(currentFont);/*el.setPath(currentFont.getFont().getPath(el.text, letterXOffset, lineYOffset, size));*/var fontTextSize=currentFont.getTextSize(el.text,size);//store info in the object
el.line=lineCount;el.setX(letterXOffset);el.setY(lineYOffset);el.setSize(size);//el.setColor("#" + color.getHexString());
el.setColor(color);el.update();//refresh
//populate the lines object for later align computation
if(this._lines[lineCount]){var lineObj=this._lines[lineCount];lineObj.styledTextElements.push(el);lineObj.width+=el.width;}else{var _lineObj=new TextLine();_lineObj.styledTextElements.push(el);_lineObj.width+=el.width;this._lines.push(_lineObj);}//update the x offset for next el
letterXOffset+=fontTextSize.width;}//console.log(this._lines);
//text-align loop, we adjust x positions of every text bloc
for(var _i=0;_i<this._lines.length;_i++){var xDiff=void 0;var line=this._lines[_i];//compute the x difference between current and desired align
switch(this._textAlign){case TEXT_ALIGN_CENTER:xDiff=this._width/2-(this._margins.left+line.width/2);break;case TEXT_ALIGN_RIGHT:xDiff=this._width-this._margins.left-(this._margins.right+line.width);break;}if(xDiff!==undefined){for(var _j=0;_j<line.styledTextElements.length;_j++){var _el=line.styledTextElements[_j];_el.setX(_el.x+xDiff);_el.update();//refresh
}}}//draw loop
for(var _i2=0;_i2<this.styledText.length;_i2++){var _el2=this.styledText[_i2];_el2.path.draw(this._canvasContext);if(this._drawBoundingBox){var boundingBox=_el2.path.getBoundingBox();this._canvasContext.beginPath();this._canvasContext.moveTo(boundingBox.x1,boundingBox.y1);this._canvasContext.lineTo(boundingBox.x2,boundingBox.y1);this._canvasContext.lineTo(boundingBox.x2,boundingBox.y2);this._canvasContext.lineTo(boundingBox.x1,boundingBox.y2);this._canvasContext.lineTo(boundingBox.x1,boundingBox.y1-this._boundingBoxStrokeWidth/2);this._canvasContext.lineWidth=this._boundingBoxStrokeWidth;this._canvasContext.stroke();}}//emit a custom event on the canvas to refresh texture when used
this._canvas.events.trigger(EVT_DRAWN);}}]);return RichText;}(Base);var _createClass$46=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$51(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var CanvasTexture=function(){/**
       * CanvasTexture Class simplifies the creation of texture from an HTML5 canvas. Any valid canvas can be used to create a texure that can then be attached to a material.
       * Some helpers static methods are implemented to quickly creates some commons shapes (rectangles, circle).
       * Stroke and fill colors can be changed on the fly if update methods is called afterward
       *
       * @class CanvasTexture
       * @constructor
       * @param {Object} params an object containing all the possible parameters for this class. Use it like in the following example. Possible parameters are lisited below.
       * @example
       *     //TODO
       *
       * @param {Canvas} [params.canvas = a canvas will be created internally if undefined] the canvas to use
       * @param {Context} [params.context] the Mobilizing context to use
       * @param {Number} [params.width = 100] width the width of the canvas
       * @param {Number} [params.height = 100] height the height of the canvas
       * @param {Number} [params.strokeWidth = 1] strokeWidth as an integer
       * @param {Color} [params.strokeColor] strokeColor as a Mobilizing Color
       * @param {Number} [params.strokeOpacity = 1] strokeOpacity as a float between 0 and 1
       * @param {Color} [params.fillColor] fillColor as a Mobilizing Color
       * @param {Number} [params.fillOpacity = 1] fillOpacity as a float between 0 and 1
      */function CanvasTexture(params){var _this=this;_classCallCheck$51(this,CanvasTexture);this._strokeWidth=getOrDefault(params,'strokeWidth',1);this._strokeColor=getOrDefault(params,'strokeColor',undefined);this._strokeOpacity=getOrDefault(params,'strokeOpacity',1);this._fillColor=getOrDefault(params,'fillColor',undefined);this._fillOpacity=getOrDefault(params,'fillOpacity',1);this._width=getOrDefault(params,'width',100);this._height=getOrDefault(params,'height',100);this._canvas=getOrExec(params,'canvas',function(){var canvas=document.createElement('canvas');canvas.width=_this._width;canvas.height=_this._height;return canvas;});this._texture=new THREE.Texture(this._canvas);this._texture.needsUpdate=true;//avoid smoothing of pixels
this._texture.minFilter=THREE.NearestFilter;this._texture.magFilter=THREE.NearestFilter;this._texture.generateMipmaps=false;this._canvasContext=this._canvas.getContext('2d');this.update();}/**
      * Get this texture base canvas
      * @method getCanvas
      * @return canvas {Canvas}
      */_createClass$46(CanvasTexture,[{key:'getCanvas',value:function getCanvas(){return this._canvas;}/**
          * Get this texture base canvas context, to directly daw on it
          * @method getCanvasContext
          * @return canvasContext {CanvasContext}
          */},{key:'getCanvasContext',value:function getCanvasContext(){return this._canvasContext;}/**
          * Fills the canvas with the given color
          * @method fillWithColor
          * @param {Color} color Mobilizing Color to use
          */},{key:'fillWithColor',value:function fillWithColor(color){this.setFillColor(color);this.update();this._canvasContext.fillRect(0,0,this._width,this._height);this._texture.needsUpdate=true;}/**
          * resizeCanvas resizes and refresh the canvasContext interally
          * @method resizeCanvas
          * @param {Number} width
          * @param {Number} height
          */},{key:'resizeCanvas',value:function resizeCanvas(width,height){this._canvas.width=width;this._canvas.height=height;this._canvasContext=this._canvas.getContext('2d');}/**
          * Get the canvas's width
          * @method getWidth
          * @return width {Number}
          */},{key:'getWidth',value:function getWidth(){return this._width;}/**
          * Get the canvas's height
          * @method getHeight
          * @return height {Number}
          */},{key:'getHeight',value:function getHeight(){return this._height;}/**
          * @method setStrokeColor
          * @param {Color} c new stroke width
          */},{key:'setStrokeColor',value:function setStrokeColor(c){this._strokeColor=c;}/**
          * @method setFillColor
          * @param {Color} c new stroke width
          */},{key:'setFillColor',value:function setFillColor(c){this._fillColor=c;}/**
          * @method setStrokeWidth
          * @param {Number} w new stroke width
          */},{key:'setStrokeWidth',value:function setStrokeWidth(w){this._strokeWidth=w;}/**
          * Updates the current canvas so that it reflects graphically all the changes done (colors, strokeWidth, etc.)
          * Should be called after the changes has been given.
          * @method update
          */},{key:'update',value:function update(){var tempStrokeColor=void 0,tempFillColor=void 0;if(this._strokeColor){tempStrokeColor=this.toRGBAColorString(this._strokeColor,this._strokeOpacity);}else{tempStrokeColor='rgba(0,0,0,0)';}if(this._fillColor){tempFillColor=this.toRGBAColorString(this._fillColor,this._fillOpacity);}else{tempFillColor='rgba(0,0,0,0)';}debug.log('this._strokeColor',this._strokeColor,'this._fillColor',this._fillColor);debug.log('tempStrokeColor',tempStrokeColor,'tempFillColor',tempFillColor);this._canvasContext.strokeStyle=tempStrokeColor;this._canvasContext.fillStyle=tempFillColor;this._canvasContext.lineWidth=this._strokeWidth;this._canvasContext.clearRect(0,0,this._width,this._height);this._canvasContext.fill();this._canvasContext.stroke();this._texture.needsUpdate=true;}/**
          * Draw an Mobilizing StyledText or StyledLetter in the canvas object and updates it.
          *
          * @method drawStyledText
          * @param {StyledText || StyledLetter} text
          */},{key:'drawStyledText',value:function drawStyledText(text){text.path.draw(this._canvasContext);this._texture.needsUpdate=true;}/**
          * Draw an Image in the canvas object and updates it.
          *
          * @method drawImage
          * @param {Image} image
          * @param {Number} x x coordinate to start drawing (from upper-left corner)
          * @param {Number} y y coordinate to start drawing (from upper-left corner)
          * @param {Number} [width=canvas.width] the destination width to draw to
          * @param {Number} [height=canvas.height]  the destination height to draw to
          */},{key:'drawImage',value:function drawImage(image,x,y,width,height){this._canvasContext.drawImage(image,x?x:0,y?y:0,width?width:this._width,height?height:this._height);this._texture.needsUpdate=true;}/**
          * toRGBAColorString makes a css rgba color from a Mobilizing Color and an alpha value (0:1)
          * @private
          * @method toRGBAColorString
          * @param {Color} color
          * @param {Number} alpha
          */},{key:'toRGBAColorString',value:function toRGBAColorString(color,alpha){var c='rgba('+Math.floor(color.r*255)+','+Math.floor(color.g*255)+','+Math.floor(color.b*255)+','+alpha+')';return c;}/**
          * CreateRect prepares a canvas and a path to draw a rectangle
          * @static
          * @method CreateRect
          * @param {Object} params object of paramaters
          * @param {Number} params.width
          * @param {Number} params.height
          * @param {Number} params.strokeWidth
          * @param {Color} params.strokeColor
          * @param {Color} params.fillColor
          */}],[{key:'CreateRect',value:function CreateRect(params){var width=getOrDefault(params,'width',100);var height=getOrDefault(params,'height',100);var strokeWidth=getOrDefault(params,'strokeWidth',1);var strokeColor=getOrDefault(params,'strokeColor',0);var fillColor=getOrDefault(params,'fillColor',0);var fillOpacity=getOrDefault(params,'fillOpacity',1);var strokeOpacity=getOrDefault(params,'strokeOpacity',1);var canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;var ctx=canvas.getContext('2d');ctx.lineWidth=strokeWidth;ctx.beginPath();ctx.lineTo(0,0);ctx.lineTo(width,0);ctx.lineTo(width,height);ctx.lineTo(0,height);ctx.lineTo(0,0);ctx.closePath();ctx.fill();ctx.stroke();//reset params
params={};params.canvas=canvas;params.width=width;params.height=height;params.strokeWidth=strokeWidth;params.strokeColor=strokeColor;params.fillColor=fillColor;params.fillOpacity=fillOpacity;params.strokeOpacity=strokeOpacity;var obj=new CanvasTexture(params);return obj;}/**
          * CreateCircle prepares a canvas and a path to draw a circle
          * @static
          * @method CreateCircle
          * @param {Object} params object of paramaters
          * @param {Number} params.radius
          * @param {Number} params.strokeWidth
          * @param {Color} params.strokeColor
          * @param {Color} params.fillColor
          */},{key:'CreateCircle',value:function CreateCircle(params){var radius=getOrDefault(params,'radius',100);var strokeWidth=getOrDefault(params,'strokeWidth',1);var strokeColor=getOrDefault(params,'strokeColor',0);var fillColor=getOrDefault(params,'fillColor',0);var fillOpacity=getOrDefault(params,'fillOpacity',1);var strokeOpacity=getOrDefault(params,'strokeOpacity',1);var canvas=document.createElement('canvas');canvas.width=radius+strokeWidth;canvas.height=radius+strokeWidth;var ctx=canvas.getContext('2d');ctx.strokeStyle=strokeColor?strokeColor.getHexString():undefined;ctx.fillStyle=fillColor?fillColor.getHexString():undefined;ctx.lineWidth=strokeWidth;//ctx.rect(0,0,canvas.width,canvas.height);
ctx.beginPath();ctx.arc(radius/2+strokeWidth/2,radius/2+strokeWidth/2,radius/2,0,2*Math.PI,false);ctx.closePath();ctx.fill();ctx.stroke();document.body.appendChild(canvas);//reset params
params={};params.canvas=canvas;params.width=radius;params.height=radius;params.strokeWidth=strokeWidth;params.strokeColor=strokeColor;params.fillColor=fillColor;params.fillOpacity=fillOpacity;params.strokeOpacity=strokeOpacity;var obj=new CanvasTexture(params);return obj;}}]);return CanvasTexture;}();var _createClass$47=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$52(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var DOMNodeTexture=function(){/*
       * DOMNodeTexture Class gives an easy way to inject HTML node into Mobilizing.js thanks to domvas.js, a small library that "paint" the content of an HTML element tree to a canvas. Mus be mapped to a Mesh via a Matirial texture field.
       * Be warned that this class will give a result ONLY in FireFox and Chrome as Safari's security is too high for the painted canvas to be used as a WebGL Texture (security error is raised and can't be avoided)
       *
       * @class DOMNodeTexture
       * @constructor
       * @param {DOM Node} node the HTML node to be rasterized
       */function DOMNodeTexture(node){var _this=this;_classCallCheck$52(this,DOMNodeTexture);//this.context = context;
this.canvas=document.createElement('canvas');this.canvas.width=512;this.canvas.height=512;var ctx=this.canvas.getContext('2d');ctx.fillStyle='rgba(0,0,255,255)';ctx.lineTo(0,0);ctx.lineTo(this.canvas.width,0);ctx.lineTo(this.canvas.width,this.canvas.height);ctx.lineTo(0,this.canvas.height);ctx.lineTo(0,0);ctx.closePath();ctx.fill();ctx.stroke();document.body.appendChild(this.canvas);var img=new Image();img.src=this.canvas.toDataURL('image/png');//img.crossOrigin = 'use-credentials';
var imgEl=document.createElement('img');imgEl.src=img.src;document.body.appendChild(imgEl);this.texture=new THREE.Texture(img);this.texture.needsUpdate=true;//add to the document so that css can be computed
document.body.appendChild(node);//dom to image
domvas.toImage(node,function(){ctx.drawImage(_this,0,0);img.src=_this.canvas.toDataURL('image/png');imgEl.src=img.src;//console.log(this, this.texture);
_this.update();});//no need to keep the node in the document
//document.body.removeChild(node);
}/*
      * Updates the texture accroding to the HTML element.
      * @private
      * @method update
      */_createClass$47(DOMNodeTexture,[{key:'update',value:function update(){var img=new Image();img.src=this.canvas.toDataURL();this.texture.image=img;this.texture.needsUpdate=true;}/*
          * Helper static fonction to add an existing css style to an HTML element on the fly. You can define classes in a css sheet and  attribute them to any HTML Node with this method.
          * @static
          * @method addCSSToNode
          * @param {DOM Node} el the HTML element to apply the CSS class to
          * @param {String} cssName the CSS class name without the starting "."
          */}],[{key:'addCSSToNode',value:function addCSSToNode(el,cssName){var cssRules=document.styleSheets[0].cssRules;if(cssRules){for(var i=0;i<cssRules.length;i++){var selector=cssRules[i].selectorText;if(selector){if(selector.indexOf(cssName)>0){//apply css
el.classList.add(cssName);//debug.info("css",cssName,"to",el);
return;}}else{//debug.info("no selectorText in this css",cssRules[i]);
}}}console.error('no css class of this name found. Remove the . if any in your argument');}}]);return DOMNodeTexture;}();var _createClass$48=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$53(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}/**
   * The ImageSequenceTexture represents a special kind of 2D Texture that is built from a sequence of pictures that you can play at a given rate and with a given play mode.
   *
   * @class ImageSequenceTexture
   */var ImageSequenceTexture=function(){//var currentTime     = 0;
//var playing        = false;
/**
      @method constructor
      @param {Object} context The Mobilizing Context.
      */function ImageSequenceTexture(context){_classCallCheck$53(this,ImageSequenceTexture);this.currentTime=0;this.playing=false;this.frameRate=10;this.context=context;this.textures=[];//
this.sequenceMode='FORWARD';this.direction=1;this.lapsToDo=-1;this.frameCount=0;this.laps=0;this.currentFrame=0;}/**
      Load an image sequence from a wild card URL (the * sign will be replaced by an index starting from min and ending at max).
       @method load
      @param {String} urlbase wild card base URL. This can be a relative or absolute URL, and can be local or online, depending on your Browser cross domain policies.
      @param {Integer} min starting index.
      @param {Integer} max ending index.
      */_createClass$48(ImageSequenceTexture,[{key:'load',value:function load(urlbase,min,max){for(var i=min;i<=max;++i){var t=new Texture$1({context:this.context});var file=urlbase.replace('*',''+i+'');t.loadFromFile(file,true);this.textures.push(t);}this.frameCount=this.textures.count;this.enterFrame=0;this.currentFrame=0;this.outFrame=max;}/**
          Set the starting frame of the current loaded sequence.
          @method setEnterFrame
          @param {Integer} frame starting frame.
          */},{key:'setEnterFrame',value:function setEnterFrame(frame){if(frame>=0&&frame<this.frameCount){this.enterFrame=frame;this.currentFrame=this.enterFrame;}else{this.enterFrame=0;this.currentFrame=0;debug.log('ERROR enterFrame %i is out of sequence bounds - back to 0',frame);}}/**
          Set the ending frame of the current loaded sequence.
          @method setOutFrame
          @param {Integer} frame ending frame.
          */},{key:'setOutFrame',value:function setOutFrame(frame){if(frame>=this.enterFrame&&frame<this.frameCount){this.outFrame=frame;}else{this.outFrame=this.frameCount-1;debug.log('ERROR outFrame %i is out of sequence bounds - back to frameCount',frame);}}/**
          Set the sequence playing mode.
          @method setMode
          @param {String} mode playing mode : "FORWARD", BACKWARD", "PINGPONG", "RANDOM".
          */},{key:'setMode',value:function setMode(mode){this.sequenceMode=mode;}/**
          update the Image sequence. You have to call this once per frame for the Image sequence Texture to update and run its own logic.
          @method update
          */},{key:'update',value:function update(){if(!this.playing){return;}this.currentTime+=this.context.Time.deltaTime;if(this.currentTime>1/this.frameRate){this.currentTime-=1/this.frameRate;//this.currentFrame = Math.floor(this.currentTime*this.frameRate) % this.textures.length;
if(this.sequenceMode==='FORWARD'){if(this.laps>=0&&this.laps<this.lapsToDo){this.currentFrame++;this.currentFrame%=this.outFrame+1;if(this.currentFrame===0){this.currentFrame=this.enterFrame;}if(this.currentFrame===this.outFrame){this.laps++;}}else if(this.lapsToDo<0){this.currentFrame++;this.currentFrame%=this.outFrame+1;if(this.currentFrame===0){this.currentFrame=this.enterFrame;}}if(this.lapsToDo===this.laps){this.stop();}debug.log('currentFrame = '+this.currentFrame);}else if(this.sequenceMode==='BACKWARD'){if(this.laps>=0&&this.laps<this.lapsToDo){this.currentFrame--;if(this.currentFrame<this.enterFrame){this.currentFrame=this.outFrame;}if(this.currentFrame===this.enterFrame){this.laps++;}}else if(this.lapsToDo<0){this.currentFrame--;if(this.currentFrame<this.enterFrame){this.currentFrame=this.outFrame;}}if(this.lapsToDo===this.laps){this.stop();}debug.log('currentFrame = '+this.currentFrame);}else if(this.sequenceMode==='PINGPONG'){if(this.laps>=0&&this.laps<this.lapsToDo){this.currentFrame+=this.direction;//protection against border over
if(this.currentFrame<0){this.currentFrame=0;}if(this.currentFrame>this.outFrame){this.currentFrame=this.outFrame;}if(this.currentFrame>=this.outFrame){this.direction=-this.direction;this.laps++;}if(this.currentFrame<=this.enterFrame){this.direction=-this.direction;this.laps++;}}else if(this.lapsToDo<0){this.currentFrame+=this.direction;if(this.currentFrame>=this.outFrame){this.direction=-this.direction;}if(this.currentFrame<=this.enterFrame){this.direction=-this.direction;}}if(this.lapsToDo===this.laps){this.stop();}debug.log('currentFrame = '+this.currentFrame);}else if(this.sequenceMode==='RANDOM'){this.currentFrame=Math.floor(Math.random()*(this.outFrame-this.enterFrame)+this.enterFrame);debug.log('currentFrame = '+this.currentFrame);}}}/**
          Get the current Image Sequence frame Texture.
          @method getCurrentTexture
          @return {Texture} the texture
          */},{key:'getCurrentTexture',value:function getCurrentTexture(){return this.textures[this.currentFrame];}/**
          play the Image Sequence.
          @method play
          */},{key:'play',value:function play(){this.playing=true;}/**
          pause the Image Sequence.
          @method pause
          */},{key:'pause',value:function pause(){this.playing=false;}/**
          stop the Image Sequence. The image frame is resetted.
          @method stop
          */},{key:'stop',value:function stop(){this.currentTime=0;this.currentFrame=0;this.playing=false;this.laps=0;}/**
          Loop the image sequence for a given number of iterations (once play() is called).
          @method loop
          @param {Number} count : -1 means infinity.
          */},{key:'loop',value:function loop(count){this.lapsToDo=count;}}]);return ImageSequenceTexture;}();var _createClass$49=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$54(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var RenderTexture=function(){/**
       * RenderTexture are 3D camera rendered bitmap pictures loaded in the graphic card memory so they can be mapped on a geometry surface. Usually, texture are mapped through a Material. Keep in mind that WebGL, as an implementation of OpenGL, shares the same kind of limitations : textures sources should be power of 2 (even if here, Three.js is doing the job of resizing for you if they're not).
       *
       * @class RenderTexture
       * @constructor
       * @param {Object} params the parameters object
       * @param {Number} params.width the width of this texture
       * @param {Number} params.height the height of this texture
       */function RenderTexture(params){_classCallCheck$54(this,RenderTexture);this._width=getOrDefault(params,'width',512);this._height=getOrDefault(params,'height',512);this._engineTexture=new THREE.WebGLRenderTarget(this._width,this._height,{minFilter:THREE.LinearFilter,magFilter:THREE.NearestFilter,format:THREE.RGBFormat});this._texture=this._engineTexture.texture;}_createClass$49(RenderTexture,[{key:'getTexture',value:function getTexture(){return this._engineTexture.texture;}}]);return RenderTexture;}();var _createClass$50=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$55(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var VideoTexture=function(){/**
       * VideoTexture Class give the possibility to use a movie file directly as a texture. Therefore, this class contains some movie media fonctions to manage time (play, pause, stop, etc). The texture must be mapped on an Mesh via a Material (setTexture()).
       *
       * @class VideoTexture
       * @constructor
       * @param {Object} params params The parameters object
       * @param {Video} params.video the html5 video object to use for this VideoTexture
       * @param {Number} [params.fps = 30] the fps to use for this video playback, used only with iOS devices. NB : this parameter will not change the playback speed of the video, it will only affect it's picture update frequency.
       * @param {Boolean} [params.loop = false] whether the video should loop after playback end
       * @param {Boolean} [params.autoPlay = false] whether the video should play at construction
       *
       * @example
       *    //TODO
       */function VideoTexture(params){_classCallCheck$55(this,VideoTexture);this._video=getOrDefault(params,'video',undefined);this._loop=getOrDefault(params,'loop',false);this._autoPlay=getOrDefault(params,'autoPlay',false);this._fps=getOrDefault(params,'fps',30);//special treatment for iOS as we can't access the video without an automatic fullscreen
this._isIOS=Device.getOS()==='iOS';this._isPlaying=false;this._bufferedPourcent={start:0,end:0};//iOS specifics, we must create a canvas to render in or we'll go fullscreen
if(this._isIOS){this._autoPlay=false;//no autoplay on iOS
this._videoCanvasTexture=new CanvasTexture({width:this._video.videoWidth,height:this._video.videoHeight});}//to have some events to work with
this._video.addEventListener('progress',this.onLoadProgess.bind(this));this._video.addEventListener('ended',this.onVideoEnded.bind(this));if(!this._isIOS){this._texture=new THREE.Texture(this._video);this._texture.generateMipmaps=false;this._texture.minFilter=THREE.NearestFilter;this._texture.magFilter=THREE.NearestFilter;}else{this._texture=this._videoCanvasTexture._texture;}if(this._autoPlay&&!this._isIOS){this.play();}}/**
      * Defines a "load progress" behavior. User can access the result of the progress through the bufferedPourcent property (videoTexture.bufferedPourcent) which is an object constructed like this : this._bufferedPourcent = {start:<Number>, end: <Number>}. FIXME : should map to the orginal list produced by HTML5 TimeRange object
      * @private
      * @method onVideoSrcLoaded
      * @param {Event} e
      */_createClass$50(VideoTexture,[{key:'onLoadProgess',value:function onLoadProgess(){var timeRange=this.getBuffered();debug.log('progress',timeRange,this.getDuration());if(timeRange){if(timeRange.length>=1){this._bufferedPourcent={start:this.getBuffered().start(0)*100/this.getDuration(),end:this.getBuffered().end(0)*100/this.getDuration()};}}}/**
          * Ended event to manage loop playback
          * @private
          * @method onVideoEnded
          * @param {Event} e
          */},{key:'onVideoEnded',value:function onVideoEnded(){if(this._loop){this.play();}else{this.stop();}}/**
          * Set Loop on or off for this video
          * @method setLoop
          * @param {Boolean} val
          */},{key:'setLoop',value:function setLoop(val){this._loop=val;}/**
          * updates the video texture, should be done everytime an update is desired (i.e. every frame)
          * @method update
          */},{key:'update',value:function update(){//if ( this._video.readyState === this._video.HAVE_ENOUGH_DATA || this._video.readyState === this._video.HAVE_METADATA )
if(this._video.readyState>=this._video.HAVE_FUTURE_DATA){if(this._isIOS&&this._isPlaying){var time=Date.now();var elapsed=(time-this.lastTime)/1000;if(elapsed>=1/this._fps){this._video.currentTime=this._video.currentTime+elapsed;this.lastTime=time;this._videoCanvasTexture.drawImage(this._video);// Resync audio and video if they drift more than 300ms apart
/* if(this.audio && Math.abs(this.audio.currentTime - this._video.currentTime) > 0.3){
                              this.audio.currentTime = this._video.currentTime;
                          }*/}}if(!this._isIOS&&this._texture){this._texture.needsUpdate=true;}}}/**
          * Play the video
          * @method play
          */},{key:'play',value:function play(){if(!this._isIOS){this._video.play();}else{this.lastTime=Date.now();}this._isPlaying=true;}/**
          * Pause the video
          * @method pause
          */},{key:'pause',value:function pause(){this._video.pause();this._isPlaying=false;}/**
          * Stop the video
          * @method stop
          */},{key:'stop',value:function stop(){this._video.pause();this._video.currentTime=0;this._isPlaying=false;}/**
          * Get playing state
          * @method getIsPlaying
          * @return {Boolean} playing state
          */},{key:'getIsPlaying',value:function getIsPlaying(){return this._isPlaying;}/**
          * Gets the current time of this video
          * @method getCurrentTime
          * @return {Number} the current time of this video in seconds
          */},{key:'getCurrentTime',value:function getCurrentTime(){return this._video.currentTime;}/**
          * Gets the current buffered part of this video
          * @method getBuffered
          * @return {Object} the current buffered part as a TimeRange Object {length:Number, start:Number, end:Number}
          */},{key:'getBuffered',value:function getBuffered(){return this._video.buffered;}/**
          * Set the current time of this video
          * @method setCurrentTime
          * @param {Number} t the current time (in second) to
          */},{key:'setCurrentTime',value:function setCurrentTime(t){if(this._video.currentTime<this._video.duration){this._video.currentTime=t;}else{this._video.currentTime=this._video.duration;}}/**
          * Get the duration of the video file in seconds
          * @method getDuration
          * @return {Number} duration
          */},{key:'getDuration',value:function getDuration(){return this._video.duration;}/**
          * Set the playback rate of the video. See https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate for more details
          * @method setPlaybackRate
          * @param {Number} r the playback rate
          */},{key:'setPlaybackRate',value:function setPlaybackRate(r){this._video.playbackRate=r;}/**
          * Get the current playback rate
          * @method getPlaybackRate
          * @return {Number} the playback rate
          */},{key:'getPlaybackRate',value:function getPlaybackRate(){return this._video.playbackRate;}/**
          * Get the current video width
          * @method getWidth
          * @return {Number} the video width
          */},{key:'getWidth',value:function getWidth(){return this._video.videoWidth;}/**
          * Get the current video height
          * @method getHeight
          * @return {Number} the video height
          */},{key:'getHeight',value:function getHeight(){return this._video.videoHeight;}}]);return VideoTexture;}();var _createClass$51=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$11=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$56(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$27(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$27(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Timer=function(_Component){_inherits$27(Timer,_Component);/**
      *A timer is a time manager that gives the possibily to schedule a function every <i>n</i> ms.
      *
      *@class Timer
      *@constructor
      *@param {Object} params Config parameters
      *@param {Number} params.interval the number of millisecond to wait before the next timer's fire
      *@param {Function} params.callback the function to fires every time the timer's interval is passed. Can be an anonymous fonction or not.
      *@example
      *    var myTimer = new Timer({interval: 200, callback: function(){
      *                    //your code here
      *                } });
      *    myTimer.start();
      */function Timer(params){_classCallCheck$56(this,Timer);var _this=_possibleConstructorReturn$27(this,(Timer.__proto__||Object.getPrototypeOf(Timer)).call(this,params));debug.log('constructor post super');_this.interval=getOrDefault(params,'interval',100);//milliseconds
_this.callback=getOrDefault(params,'callback',null);//this is a function
return _this;}/**
      * Setup the timer with the current time
      *
      * @method setup
      */_createClass$51(Timer,[{key:'setup',value:function setup(){this.startTime=new Date().getTime();this.currentTime=new Date().getTime();}/**
          * Activate the component
          *
          * @method on
          *//*on(){
              super.on();
           }*//**
          * Deactivate the component
          *
          * @method off
          */},{key:'off',value:function off(){_get$11(Timer.prototype.__proto__||Object.getPrototypeOf(Timer.prototype),'off',this).call(this);this.stop();}/**
          * Starts the timer
          *
          * @method start
          */},{key:'start',value:function start(){if(this._active){this.startTime=new Date().getTime();this.currentTime=new Date().getTime();}else{debug.info('component is off');}}/**
          * Starts the timer
          *
          * @method stop
          */},{key:'stop',value:function stop(){this.startTime=0;this.currentTime=0;}/**
          * Updates the timer's state
          *
          * @method update
          */},{key:'update',value:function update(){if(this._active){this.currentTime=new Date().getTime();var tempInterval=this.currentTime-this.startTime;if(tempInterval>=this.interval){this.callback();this.reset();}}}/**
          * Resets the timer
          * @method reset
          */},{key:'reset',value:function reset(){this.startTime=new Date().getTime();this.currentTime=new Date().getTime();}}]);return Timer;}(Component);var _createClass$52=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$57(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$28(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$28(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var NTP=function(_Component){_inherits$28(NTP,_Component);/*
      * The NTP class provides methods to control time synchronization related operations.
      *
      * @example
      *    //TODO
      *
      * @class NTP
      * @constructor
      */function NTP(params){_classCallCheck$57(this,NTP);var _this=_possibleConstructorReturn$28(this,(NTP.__proto__||Object.getPrototypeOf(NTP)).call(this,params));_this._startTime=getOrDefault(params,'startTime',0);_this._timeScale=getOrDefault(params,'scale',1);_this._smoothingFactor=getOrDefault(params,'smoothingFactor',0.9);_this._NTPEnabled=getOrDefault(params,'NtpEnabled',false);_this._currentTime=0;_this._deltaTime=0;_this._timeOffsetSmooth=0;_this._lastTime=new Date().getTime();_this._offset=0;return _this;}/**
      * Setup for this time instance
      *
      * @method setup
      */_createClass$52(NTP,[{key:'setup',value:function setup(){var _this2=this;this._lastTime=new Date().getTime();this._offset=this._lastTime-this._startTime;if(this._NTPEnabled){var socket=new WebSocket('ws://ntp.surexposition.mobi:8000/');ntp_websockets.init(socket);//how to import this vendor ?
//debug.log("WebSocket init");
setInterval(function(){_this2._offset=ntp_websockets.offset();},1000);}}},{key:'start',value:function start(){this._startTime=new Date().getTime();}},{key:'pause',value:function pause(){}},{key:'reset',value:function reset(){this._startTime=0;}/**
          * updates this time instance
          *
          * @method update
          */},{key:'update',value:function update(){if(this.getStatus())//the component must be on, else we "stop" the time
{var currentTime=new Date().getTime();this._deltaTime=(currentTime-this._currentTime)/1000;this._currentTime=currentTime;}}/**
          * Set the current timeScale, useful to slower time down
          *
          * @method setTimeScale
          * @param {Number} scale
          */},{key:'setTimeScale',value:function setTimeScale(scale){this._timeScale=scale;}/**
          * Get the current timeScale
          *
          * @method getTimeScale
          * @return {Number} scale
          */},{key:'getTimeScale',value:function getTimeScale(){return this._timeScale;}/**
          * Get the current timeDelta (difference of time between 2 frames) at the current timeScale
          *
          * @method getDelta
          * @return {Number} the current timeDelta at the current timeScale
          */},{key:'getDelta',value:function getDelta(){return this._deltaTime*this._timeScale;}/**
          * Gets the current Time object's time
          *
          * @method getTime
          * @return {Number} the current time
          */},{key:'getTime',value:function getTime(){return(this._currentTime+this._offset)*this._timeScale;}/**
          * Gets a smoothed time, useful to avoid hard transitions when time passed faster than the computing time.
          *
          * @method getTimeSmooth
          * @return {Number} the current time smoothed with an offset
          */},{key:'getTimeSmooth',value:function getTimeSmooth(){this._timeOffsetSmooth=this._timeOffsetSmooth*this._startTime+this._offset*(1-this._startTime);return(this._currentTime+this._timeOffsetSmooth)*this._timeScale;}/**
          * Gets the current Time object underlying Date Object time
          *
          * @method getDateTime
          * @return {Number} the current Date Object raw getTime() result
          */},{key:'getDateTime',value:function getDateTime(){return new Date().getTime();}/**
          * Resync the current Time object with the given ntp server
          *
          * @method resync
          */},{key:'resync',value:function resync(){if(this._NTPEnabled){ntp_websockets.resync();}}}]);return NTP;}(Component);var _createClass$54=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$13=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$59(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$30(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$30(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Clickable=function(_Component){_inherits$30(Clickable,_Component);/**
      * Makes a Mesh clickable
      *
      * @class Clickable
      * @constructor
      * @param {Object} params parameters object
      * @param {Pointer} params.pointer
      * @param {Camera} params.camera
      * @param {onPress} params.onPress
      * @param {onRelease} params.onRelease
      * @param {onEnter} params.onEnter
      * @param {onLeave} params.onLeave
      */function Clickable(params){_classCallCheck$59(this,Clickable);var _this=_possibleConstructorReturn$30(this,(Clickable.__proto__||Object.getPrototypeOf(Clickable)).call(this,params));_this.pointer=getOrDefault(params,'pointer',undefined);_this.onPress=getOrDefault(params,'onPress',noop);_this.onRelease=getOrDefault(params,'onRelease',noop);_this.onEnter=getOrDefault(params,'onEnter',noop);_this.onLeave=getOrDefault(params,'onLeave',noop);_this.camera=params.camera;_this.target=getOrDefault(params,'target',undefined);_this.picked=false;_this.hovered=false;return _this;}/**
      * Setup for this clickable instance
      *
      * @method setup
      */_createClass$54(Clickable,[{key:'setup',value:function setup(){var _this2=this;_get$13(Clickable.prototype.__proto__||Object.getPrototypeOf(Clickable.prototype),'setup',this).call(this);var context=this.getContext();if(!this.pointer){var mouse=new Mouse();context.addComponent(mouse);mouse.setup();mouse.on();this.pointer=new Pointer();this.pointer.add(mouse);context.addComponent(this.pointer);this.pointer.setup();this.pointer.on();//console.log(mouse,context);
}this.pointer.events.on('on',function(event){var pick=_this2.target.transform.pick(_this2.camera,event.x,event.y);if(pick){_this2.picked=true;_this2.onPress();}else{_this2.picked=false;}});this.pointer.events.on('off',function()/*event*/{// let pick = this.target.transform.pick(this.camera, event.x, event.y);
if(_this2.picked===true){_this2.onRelease();}});this.pointer.events.on('moved',function(event){var pick=_this2.target.transform.pick(_this2.camera,event.x,event.y);if(pick){_this2.picked=true;if(!_this2.hovered){_this2.onEnter();_this2.hovered=true;}}else{if(_this2.picked)//avoid useless recall
{_this2.onLeave();_this2.hovered=false;_this2.picked=false;}}});}}]);return Clickable;}(Component);var _createClass$53=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$12=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$58(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$29(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$29(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var BT_STATE_PRESSED='pressed';var BT_STATE_RELEASED='released';var Button=function(_Component){_inherits$29(Button,_Component);/**
       * A Button is a special kind of 3D object that is clickable and that you can use to build Graphical User Interfaces (GUI).
       *
       * @class Button
       * @constructor
       * @param {Object} params parameters object.
       * @param {Camera} params.camera the camera used for picking.
       * @param {String} params.text text to render (can be empty).
       * @param {Number} params.textSize the text size
       * @param {Object} params.font font to use.
       * @param {Number} params.width width in pixels.
       * @param {Number} params.height height in pixels.
       * @param {Number} params.cutOff the size of the cutOff
       * @param {Color} params.strokeColor
       * @param {Color} params.fillColor
       * @param {Color} params.pressFillColor
       * @param {Color} params.hoverFillColor
       * @param {Function} [params.onPress]
       * @param {Function} [params.onRelease]
       * @param {Function} [params.onEnter]
       * @param {Function} [params.onLeave]
       * @param {URL} [params.fontURL] url for the regular font file
       * @param {URL} [params.fontItalicURL] url for the italic font file
       * @param {URL} [params.fontBoldURL] url for the bold font file
       * @param {URL} [params.fontBoldItalicURL] url for the bold-italic font file
       * @example
       *     //TODO
       */function Button(params){_classCallCheck$58(this,Button);var _this=_possibleConstructorReturn$29(this,(Button.__proto__||Object.getPrototypeOf(Button)).call(this,params));_this.camera=params.camera;// requiered
_this.pointer=getOrDefault(params,'pointer',undefined);_this.mesh=getOrDefault(params,'mesh',undefined);_this.width=getOrDefault(params,'width',3);_this.height=getOrDefault(params,'height',1);_this.radius=getOrDefault(params,'radius',undefined);_this.sideCount=getOrDefault(params,'sideCount',6);_this.cutOff=getOrDefault(params,'cutOff',_this.height/3);_this.strokeWidth=getOrDefault(params,'strokeWidth',0.1);_this.strokeColor=getOrDefault(params,'strokeColor',Color$1.mobilizing.clone());_this.fillColor=getOrDefault(params,'fillColor',Color$1.white.clone());_this.pressFillColor=getOrDefault(params,'pressFillColor',Color$1.mobilizing.clone());_this.hoverFillColor=getOrDefault(params,'hoverFillColor',Color$1.mobilizingAlternate.clone());_this.onPress=getOrDefault(params,'onPress',noop);_this.onRelease=getOrDefault(params,'onRelease',noop);_this.onEnter=getOrDefault(params,'onEnter',noop);_this.onLeave=getOrDefault(params,'onLeave',noop);_this._fontURL=getOrDefault(params,'fontURL','fonts/Raleway-Regular.ttf');_this._fontItalicURL=getOrDefault(params,'fontItalicURL','fonts/Raleway-Regular-Italic.ttf');_this._fontBoldURL=getOrDefault(params,'fontBoldURL','fonts/Raleway-Bold.ttf');_this._fontBoldItalicURL=getOrDefault(params,'fontBoldItalicURL','fonts/Raleway-Bold-Italic.ttf');_this.text=getOrDefault(params,'text',undefined);_this.textSize=getOrDefault(params,'textSize',40);//main node
_this.root=new Mesh$1({primitive:'node'});_this.transform=_this.root.transform;//to get the state
_this.state=BT_STATE_RELEASED;//create the texture from text
if(_this.text){//FIXME -> quand on a un radius pour le poly faire une texture carré
var canvasWidth=void 0;if(_this.width<100){canvasWidth=512;}else{canvasWidth=_this.width;}var canvasHeight=void 0;if(_this.height<100){canvasHeight=canvasWidth/(_this.width/_this.height);}else{canvasHeight=_this.height;}if(_this.radius){var twoSquareThree=2/Math.sqrt(3);canvasHeight=canvasWidth*twoSquareThree;}//label normal state
var richText=new Mobilizing.RichText({width:canvasWidth,height:canvasHeight,text:_this.text,marginTop:canvasHeight/2-_this.textSize/2,backgroundColor:Color$1.transparent.makeRGBAStringWithAlpha(0),textColor:Color$1.mobilizing.clone(),textAlign:'center',textSize:_this.textSize,fontURL:_this._fontURL,fontItalicURL:_this._fontItalicURL,fontBoldURL:_this._fontBoldURL,fontBoldItalicURL:_this._fontBoldItalicURL});//label pressed state
var pressRichText=new Mobilizing.RichText({width:canvasWidth,height:canvasHeight,text:_this.text,marginTop:canvasHeight/2-_this.textSize/2,backgroundColor:Color$1.transparent.makeRGBAStringWithAlpha(0),textColor:Color$1.white.clone(),textAlign:'center',textSize:_this.textSize,fontURL:_this._fontURL,fontItalicURL:_this._fontItalicURL,fontBoldURL:_this._fontBoldURL,fontBoldItalicURL:_this._fontBoldItalicURL});_this.textTexture=new Texture$1({canvas:richText.getCanvas()});_this.pressTextTexture=new Texture$1({canvas:pressRichText.getCanvas()});/*document.body.appendChild(richText.getCanvas());
              richText.getCanvas().style.position = "absolute";
              richText.getCanvas().style.top = "0px";
              richText.getCanvas().style.left = "0px";*/}//construct the default mesh & stroke
if(!_this.mesh){_this.generateDefaultMesh();}_this.root.transform.addChild(_this.mesh.transform);return _this;}_createClass$53(Button,[{key:'setup',value:function setup(){var _this2=this;_get$12(Button.prototype.__proto__||Object.getPrototypeOf(Button.prototype),'setup',this).call(this);var context=this.getContext();this.clickable=new Clickable({camera:this.camera,target:this.mesh,pointer:this.pointer,onPress:function onPress(){if(_this2._active){_this2.mesh.material.setColor(_this2.pressFillColor);if(_this2.pressTextTexture){_this2.texturedMesh.material.setTexture(_this2.pressTextTexture);}_this2.onPress();_this2.state=BT_STATE_PRESSED;}},onRelease:function onRelease(){if(_this2._active){_this2.mesh.material.setColor(_this2.hoverFillColor);if(_this2.textTexture){_this2.texturedMesh.material.setTexture(_this2.textTexture);}_this2.onRelease();_this2.state=BT_STATE_RELEASED;}},onEnter:function onEnter(){if(_this2._active){_this2.mesh.material.setColor(_this2.hoverFillColor);_this2.onEnter();}},onLeave:function onLeave(){if(_this2._active){_this2.mesh.material.setColor(_this2.fillColor);if(_this2.textTexture){_this2.texturedMesh.material.setTexture(_this2.textTexture);}_this2.onLeave();}}});context.addComponent(this.clickable);this.clickable.setup();this.on();}/**
          * Activate the button
          * @method on
          */},{key:'on',value:function on(){_get$12(Button.prototype.__proto__||Object.getPrototypeOf(Button.prototype),'on',this).call(this);this.mesh.material.setOpacity(1);this.strokeMesh.material.setOpacity(1);if(this.text){this.texturedMesh.material.setOpacity(1);}}/**
          * deactivate the button, set its opacity to 30 %
          * @method off
          */},{key:'off',value:function off(){_get$12(Button.prototype.__proto__||Object.getPrototypeOf(Button.prototype),'off',this).call(this);this.mesh.material.setOpacity(0.3);this.strokeMesh.material.setOpacity(0.3);if(this.text){this.texturedMesh.material.setOpacity(0.3);}}},{key:'update',value:function update(){}/**
          * Generate the vertices and meshes for the default button. Called internally only
          * @private
          * @method generateDefaultMesh
          */},{key:'generateDefaultMesh',value:function generateDefaultMesh(){//vertices
var w=this.width/2;var h=this.height/2;//this.cutOff = h/2;
//let cutOffXOffset = 0;
this.vertex=[];//manage special case of squared size : will be an hexagon!
if(this.radius){var parts=this.sideCount;var radius=this.radius;for(var i=0;i<parts;i++){//arc(a, b, c, d, start, stop, mode)
this.vertex.push(new Vector2$1(Math.cos(_Math.degToRad(360/parts/2)+Math.PI*2/parts*i)*radius,Math.sin(_Math.degToRad(360/parts/2)+Math.PI*2/parts*i)*radius));}}else{this.vertex.push(new Vector2$1(-w+this.cutOff,h));this.vertex.push(new Vector2$1(w-this.cutOff,h));this.vertex.push(new Vector2$1(w,h-this.cutOff));this.vertex.push(new Vector2$1(w,-h+this.cutOff));this.vertex.push(new Vector2$1(w-this.cutOff,-h));this.vertex.push(new Vector2$1(-w+this.cutOff,-h));this.vertex.push(new Vector2$1(-w,-h+this.cutOff));this.vertex.push(new Vector2$1(-w,h-this.cutOff));}//console.log(this.vertex);
this.topLeftIndex=0;this.topRightIndex=1;this.bottomRightIndex=4;this.bottomLeftIndex=5;this.mesh=new Mesh$1({primitive:'custom'});this.mesh.generateFillMesh(this.vertex);this.mesh.material.setTransparent(true);if(this.text){this.texturedMesh=new Mesh$1({primitive:'custom'});this.texturedMesh.generateFillMesh(this.vertex);this.texturedMesh.material.setTransparent(true);this.texturedMesh.material.setTexture(this.textTexture);this.root.transform.addChild(this.texturedMesh.transform);}this.strokeMesh=Mesh$1.generateStrokeMesh(this.mesh,this.strokeWidth);this.strokeMesh.material.setColor(this.strokeColor);this.strokeMesh.material.setTransparent(true);this.root.transform.addChild(this.strokeMesh.transform);}/**
          * Adapt a corner of the shape, for grouping buttons together
          * @method adaptCorner
          * @param {String} mode cutOff, straight
          * @param {String} corner topLeft, topRight, bottomRight,bottomLeft
          */},{key:'adaptCorner',value:function adaptCorner(mode,corner){if(this.width!==this.height){var vertex=null;switch(corner){case'topLeft':vertex=this.mesh._geometry.vertices[this.topLeftIndex];if(mode==='straight'){vertex.x=-this.width/2;}else if(mode==='cutOff'){vertex.x=-this.width/2+this.cutOff;}this.mesh.updateMesh();this.regenerateStrokeGeometry(this.mesh);break;case'topRight':vertex=this.mesh._geometry.vertices[this.topRightIndex];if(mode==='straight'){vertex.x=this.width/2;}else if(mode==='cutOff'){vertex.x=this.width/2-this.cutOff;}this.mesh.updateMesh();this.regenerateStrokeGeometry(this.mesh);break;case'bottomRight':vertex=this.mesh._geometry.vertices[this.bottomRightIndex];if(mode==='straight'){vertex.x=this.width/2;}else if(mode==='cutOff'){vertex.x=this.width/2-this.cutOff;}this.mesh.updateMesh();this.regenerateStrokeGeometry(this.mesh);break;case'bottomLeft':vertex=this.mesh._geometry.vertices[this.bottomLeftIndex];if(mode==='straight'){vertex.x=-this.width/2;}else if(mode==='cutOff'){vertex.x=-this.width/2+this.cutOff;}this.mesh.updateMesh();this.regenerateStrokeGeometry(this.mesh);break;}this.mesh.generateFlatUVs();}}/**
          * regenerate the geometry of the mesh for further update
          * @method regenerateStrokeGeometry
          * @private
          * @param {Mesh} the mesh to regenerate the stroke for
          */},{key:'regenerateStrokeGeometry',value:function regenerateStrokeGeometry(mesh){this.strokeMesh.updateStroke(mesh,this.strokeWidth);}/**
          * Can be used to simulate a pressed event when necessary (i.e. when a keyboard event should modify the button state).
          *
          * @method fakePress
          */},{key:'fakePress',value:function fakePress(){this.fakePressed=true;}/*update()
          {
           }*/}]);return Button;}(Component);var _createClass$55=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$60(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$31(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$31(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ButtonGroup=function(_Component){_inherits$31(ButtonGroup,_Component);/**
       * ButtonGroup organize an array of Buttons with different layout patterns. Make it easier to build menu.
       *
       * @class ButtonGroup
       * @constructor
       * @param {Object} params Parameters object.
       * @param {Number} params.row for grid based layout, the maximum nb of rows
       * @param {Number} params.columns for grid based layout, the maximum nb of columns
       * @param {String} params.mode layout mode. One of grid, honeycomb
       * @param {Array} params.buttons The list of buttons to layout.
       *
       * @example
       *     //TODO
       */function ButtonGroup(params){_classCallCheck$60(this,ButtonGroup);// let rows = getOrDefault(params, "rows", 3);
var _this=_possibleConstructorReturn$31(this,(ButtonGroup.__proto__||Object.getPrototypeOf(ButtonGroup)).call(this,params));/*
           * index d'élement => position
           * plusieurs implémentations de positionement
           * - grille simple à plusieurs sens
           * - fleur / spirale
           * - clavier
           * - custom
           */var columns=getOrDefault(params,'columns',2);var mode=getOrDefault(params,'mode','grid');var offsetType=getOrDefault(params,'offsetType','even');_this.buttons=getOrDefault(params,'buttons',[]);_this.orderedIndices=[];_this.width=0;_this.height=0;_this.root=new Mesh$1({primitive:'node'});_this.transform=_this.root.transform;if(_this.buttons.length>0){//add objects to this group root
for(var i=0;i<_this.buttons.length;i++){_this.root.transform.addChild(_this.buttons[i].transform);}_this.organize(mode,columns,offsetType);}return _this;}/*setup()
      {
          super.setup();
          let context = this.getContext();
      }*//*add(button)
      {
          this.buttons.push(button);
          button.setName(this.buttons.length-1);
      }*//**
      * Generic organize method to switch between various layout modes
      * @private
      * @method organize
      * @param {String} mode grid, HoneyComb (for HoneyComb layout)
      */_createClass$55(ButtonGroup,[{key:'organize',value:function organize(mode,columns,offsetType){/*let mode = getOrDefault(params, "mode", "grid");
              let rows = getOrDefault(params, "rows", 2);
              let columns = getOrDefault(params, "columns", 3);*///console.log(mode, columns, offsetType);
var indices=this.organizeGrid(columns);switch(mode){case'grid':this.positionGrid(indices);break;case'honeycomb':// bee honeycomb!
this.positionHoneyComb(indices,offsetType);break;}}/**
          * Organize the buttons to place in the grid. Each button is associated to an index.
          * @private
          * @method organizeGrid
          * @param {Number} columns
          * @return {Array} indices List of objects like this: {index:i,position: new Vector3(), isTop: false, isBottom: false, isLeft: false, isRight: false}, that will help to compute positions and Mesh deformations
          */},{key:'organizeGrid',value:function organizeGrid(columns){var tempIndices=[];for(var i=0;i<this.buttons.length;i++){if(i===0||i%columns===0){tempIndices[tempIndices.length]=[];}tempIndices[tempIndices.length-1].push({index:i,position:new Vector3$1(),isTop:false,isBottom:false,isLeft:false,isRight:false});}return tempIndices;}/**
          * Compute position and set position flags for each button
          * @private
          * @method positionGrid
          * @param {Array} indices given from organizeGrid
          */},{key:'positionGrid',value:function positionGrid(indices){var index=0;for(var i=0;i<indices.length;i++)//line nb
{var line=indices[i];for(var j=0;j<line.length;j++)// column nb
{var bt=this.buttons[line[j].index];line[j].position.x=j*(bt.width+bt.strokeWidth);line[j].position.y=i*-(bt.height+bt.strokeWidth);//manage placement by strings
if(i===0){line[j].isTop=true;}if(i===indices.length-1){line[j].isBottom=true;}if(j===0){line[j].isLeft=true;}if(j===line.length-1){line[j].isRight=true;//for corner with no vertical neighbor but a line under
if(index+line.length>this.buttons.length-1){line[j].isBottom=true;}}this.orderedIndices.push(line[j]);index++;}}//console.log(this.orderedIndices);
this.renderGrid();}},{key:'renderGrid',value:function renderGrid(){for(var i=0;i<this.orderedIndices.length;i++){var order=this.orderedIndices[i];var bt=this.buttons[i];bt.transform.setLocalPosition(order.position);//one column singularity
if(order.isTop&&order.isLeft&&!order.isBottom&&order.isRight){var nextOrder=this.orderedIndices[i+1];if(!nextOrder.isTop&&nextOrder.isLeft&&!nextOrder.isBottom&&nextOrder.isRight){bt.adaptCorner('straight','bottomRight');bt.adaptCorner('straight','bottomLeft');}}//one line only
if(order.isTop&&order.isLeft&&order.isBottom&&!order.isRight){bt.adaptCorner('straight','topRight');bt.adaptCorner('straight','bottomRight');}if(order.isTop&&!order.isLeft&&order.isBottom&&!order.isRight){bt.adaptCorner('straight','topRight');bt.adaptCorner('straight','bottomRight');bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','bottomLeft');}if(order.isTop&&!order.isLeft&&order.isBottom&&order.isRight){bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','bottomLeft');}//several lines
//middle
if(order.isTop&&!order.isLeft&&!order.isBottom&&!order.isRight){bt.adaptCorner('straight','topRight');bt.adaptCorner('straight','bottomRight');bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','bottomLeft');}//top
if(order.isTop&&order.isLeft&&!order.isBottom&&!order.isRight){bt.adaptCorner('straight','topRight');bt.adaptCorner('straight','bottomRight');bt.adaptCorner('straight','bottomLeft');}if(order.isTop&&!order.isLeft&&!order.isBottom&&order.isRight){bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','bottomLeft');bt.adaptCorner('straight','bottomRight');}//other middle
if(!order.isTop&&!order.isBottom){bt.adaptCorner('straight','topRight');bt.adaptCorner('straight','bottomRight');bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','bottomLeft');}//bottom
if(!order.isTop&&order.isLeft&&order.isBottom&&order.isRight){bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','topRight');}if(!order.isTop&&order.isLeft&&order.isBottom&&!order.isRight){bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','topRight');bt.adaptCorner('straight','bottomRight');}if(!order.isTop&&!order.isLeft&&order.isBottom&&order.isRight){bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','topRight');bt.adaptCorner('straight','bottomLeft');}if(!order.isTop&&!order.isLeft&&order.isBottom&&!order.isRight){bt.adaptCorner('straight','topRight');bt.adaptCorner('straight','bottomRight');bt.adaptCorner('straight','topLeft');bt.adaptCorner('straight','bottomLeft');}}this.computeSize();}},{key:'positionHoneyComb',value:function positionHoneyComb(indices,offsetType){for(var i=0;i<indices.length;i++)//line nb
{var line=indices[i];for(var j=0;j<line.length;j++)// column nb
{var bt=this.buttons[line[j].index];/*let halfWidthSquared = Math.pow(bt.mesh.getBoundingBox().getSize().x / 2, 2);
                      let twoSquareThree = 2 / Math.sqrt(3);
                      let polyHeight = bt.mesh.getBoundingBox().getSize().x * twoSquareThree;
                      let interval = Math.sqrt( Math.pow( polyHeight * Math.sin(Math.PI/6), 2) - halfWidthSquared) + polyHeight * Math.sin(Math.PI/6);*/var interval=bt.mesh.getBoundingBox().getSize().y*3/4;line[j].position.x=j*(bt.mesh.getBoundingBox().getSize().x+bt.strokeWidth);line[j].position.y=i*-(interval+bt.strokeWidth);if(i%2===1){if(offsetType==='odd'){line[j].position.x-=(bt.mesh.getBoundingBox().getSize().x+bt.strokeWidth)/2;}else{line[j].position.x+=(bt.mesh.getBoundingBox().getSize().x+bt.strokeWidth)/2;}}this.orderedIndices.push(line[j]);}}this.renderHoneyComb();}},{key:'renderHoneyComb',value:function renderHoneyComb(){for(var i=0;i<this.orderedIndices.length;i++){var order=this.orderedIndices[i];var bt=this.buttons[i];bt.transform.setLocalPosition(order.position);}this.computeSize();}},{key:'computeSize',value:function computeSize(){var bbox=this.buttons[0].mesh.getBoundingBox();bbox.expandByObject(this.root.transform.entity);//console.log(bbox);
this.width=bbox.getSize().x;this.height=bbox.getSize().y;//console.log(this.width, this.height);
}//TODO : flower menu with cube coordinates (http://www.redblobgames.com/grids/hexagons)
}]);return ButtonGroup;}(Component);var _createClass$56=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$14=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$61(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$32(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$32(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var OPACITY_ENABLED=1;var OPACITY_DISABLED=0.3;var DEFAULTS={title:null,camera:null,pointer:null,width:50,height:50,cutOff:'auto',strokeWidth:'auto',titleHeight:'auto',fillColor:Color$1.black.clone(),strokeColor:Color$1.mobilizing.clone(),fontURL:null,fontItalicURL:null,fontBoldURL:null,fontBoldItalicURL:null,texture:null};var Panel=function(_Component){_inherits$32(Panel,_Component);function Panel(params){_classCallCheck$61(this,Panel);// Parameters
var _this=_possibleConstructorReturn$32(this,(Panel.__proto__||Object.getPrototypeOf(Panel)).call(this));params=Object.assign({},DEFAULTS,params);_this.title=params.title;_this.camera=params.camera;_this.pointer=params.pointer;_this.width=params.width;_this.height=params.height;_this.cutOff=params.cutOff;_this.strokeWidth=params.strokeWidth;_this.titleHeight=params.titleHeight;_this.fillColor=params.fillColor;_this.strokeColor=params.strokeColor;_this.titleHeight=params.titleHeight;_this.fontURL=params.fontURL;_this.fontItalicURL=params.fontItalicURL;_this.fontBoldURL=params.fontBoldURL;_this.fontBoldItalicURL=params.fontBoldItalicURL;_this.texture=params.texture;if(_this.cutOff==='auto'){_this.cutOff=Math.min(_this.width,_this.height)/10;}if(_this.strokeWidth==='auto'){_this.strokeWidth=Math.min(_this.width,_this.height)/100;}_this.titleWidth=_this.height-2*_this.cutOff;if(_this.titleHeight==='auto'){_this.titleHeight=typeof _this.cutOff==='number'?_this.cutOff:_this.width/10;}// Node & Materials
_this.root=new Mesh$1({primitive:'node'});_this.transform=_this.root.transform;_this.materials=[];// Vertices
var width=_this.width/2;var height=_this.height/2;_this.vertices=[// Top
new Vector2$1(-width+_this.cutOff,height),new Vector2$1(width-_this.cutOff,height),// Right
new Vector2$1(width,height-_this.cutOff),new Vector2$1(width,-height+_this.cutOff),// Bottom
new Vector2$1(width-_this.cutOff,-height),new Vector2$1(-width+_this.cutOff,-height),// Left
new Vector2$1(-width,-height+_this.cutOff),new Vector2$1(-width,height-_this.cutOff)];// Base mesh
_this.mesh=new Mesh$1({primitive:'custom'});_this.mesh.generateFillMesh(_this.vertices);_this.root.transform.addChild(_this.mesh.transform);if(params.title===null&&isObject(params.texture)){_this.mesh.material.setTexture(params.texture);}else{_this.mesh.material.setColor(_this.fillColor);}_this.mesh.material.setTransparent(true);_this.materials.push(_this.mesh.material);// Stroke
_this.strokeMesh=Mesh$1.generateStrokeMesh(_this.mesh,_this.strokeWidth);_this.root.transform.addChild(_this.strokeMesh.transform);_this.strokeMesh.material.setColor(_this.strokeColor);_this.strokeMesh.material.setTransparent(true);_this.materials.push(_this.strokeMesh.material);if(params.title!==null){// Title
var canvasWidth=Math.max(_this.titleWidth,512);var canvasHeight=canvasWidth*(_this.titleHeight/_this.titleWidth);_this.titleText=new Mobilizing.RichText({width:canvasWidth,height:canvasHeight,marginTop:0,text:'<b>'+_this.title+'</b>',textSize:canvasHeight*0.75,textAlign:'right',textColor:_this.strokeColor,backgroundColor:_this.fillColor,fontURL:_this.fontURL,fontItalicURL:_this.fontItalicURL,fontBoldURL:_this.fontBoldURL,fontBoldItalicURL:_this.fontBoldItalicURL});_this.titleTexture=new Texture$1({canvas:_this.titleText.getCanvas()});_this.texturedMesh=new Mesh$1({primitive:'plane',material:'basic',width:_this.titleWidth,height:_this.titleHeight});_this.texturedMesh.transform.setLocalPosition(_this.titleHeight/2-_this.width/2,0,0);_this.texturedMesh.transform.setLocalRotation(0,0,90);_this.root.transform.addChild(_this.texturedMesh.transform);_this.texturedMesh.material.setTexture(_this.titleTexture);_this.texturedMesh.material.setTransparent(true);_this.materials.push(_this.texturedMesh.material);// Image
if(isObject(_this.texture)){_this.imgMesh=new Mesh$1({primitive:'plane',material:'basic',width:_this.width-2*_this.titleHeight,height:_this.height-2*_this.titleHeight});_this.imgMesh.material.setTransparent(true);_this.imgMesh.material.setTexture(params.texture);_this.root.transform.addChild(_this.imgMesh.transform);_this.materials.push(_this.imgMesh.material);}}return _this;}_createClass$56(Panel,[{key:'setup',value:function setup(){var _this2=this;_get$14(Panel.prototype.__proto__||Object.getPrototypeOf(Panel.prototype),'setup',this).call(this);var context=this.getContext();if(context===null){throw new Error('Add Panel to a context before calling setup()');}this.clickable=new Clickable({camera:this.camera,target:this.mesh,pointer:this.pointer,onPress:function onPress(){if(_this2._active){_this2.events.trigger('down');}},onRelease:function onRelease(){if(_this2._active){_this2.events.trigger('up');_this2.events.trigger('click');}},onEnter:function onEnter(){if(_this2._active){_this2.events.trigger('over');}},onLeave:function onLeave(){if(_this2._active){_this2.events.trigger('out');}}});context.addComponent(this.clickable);this.clickable.setup();this.on();}},{key:'update',value:function update(){}},{key:'setStrokeColor',value:function setStrokeColor(color){this.strokeColor=color;this.strokeMesh.material.setColor(this.strokeColor);this.titleText._textColor=color;// TODO: Fix text shifting (margin increasing) on each render
this.titleText._lines=[];this.titleText.render();}},{key:'on',value:function on(){_get$14(Panel.prototype.__proto__||Object.getPrototypeOf(Panel.prototype),'on',this).call(this);this.materials.forEach(function(material){return material.setOpacity(OPACITY_ENABLED);});}},{key:'off',value:function off(){_get$14(Panel.prototype.__proto__||Object.getPrototypeOf(Panel.prototype),'off',this).call(this);this.materials.forEach(function(material){return material.setOpacity(OPACITY_DISABLED);});}}]);return Panel;}(Component);var _createClass$57=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$15=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$62(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$33(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$33(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var PanelStack=function(_Component){_inherits$33(PanelStack,_Component);function PanelStack(params){_classCallCheck$62(this,PanelStack);var _this=_possibleConstructorReturn$33(this,(PanelStack.__proto__||Object.getPrototypeOf(PanelStack)).call(this));_this.camera=params.camera;_this.pointer=params.pointer;_this.root=new Mesh$1({primitive:'node'});_this.transform=_this.root.transform;_this.width=typeof params.width==='number'?params.width:params.defaults.width*2.5,_this.height=params.defaults.height;_this.hand=typeof params.hand==='number'?params.hand:null;_this.isFolded=false;_this.current=null;_this.positions={x:{min:params.defaults.width/2-_this.width/2,max:_this.width/2-params.defaults.width/2,offset:_this.width/2-params.defaults.width/2+params.defaults.width*1.1},z:{min:typeof params.depth==='number'?params.depth*-1:params.defaults.height*-1,max:0}};_this.defaults=params.defaults;_this.panels=[];_this.count=params.panels.length;params.panels.forEach(function(options,index){var panelParams=Object.assign({},params.defaults,options,{camera:_this.camera,pointer:_this.pointer});var panel=new Panel(panelParams);panel.transform.setLocalPosition(_this.getPanelPosition(index));_this.root.transform.addChild(panel.transform);_this.panels.push(panel);});// Animations
_this.updatePositions=function(_ref){var delta=_ref.delta;var x=0;var z=0;if(_this.count===1){var offset=_this.defaults.width*0.10;if(delta<0.25){x=_Math.map(delta,0.00,0.25,_this.positions.x.max,_this.positions.x.max+offset);}else if(delta<0.75){x=_Math.map(delta,0.25,0.75,_this.positions.x.max+offset,_this.positions.x.max-offset);}else{x=_Math.map(delta,0.75,1.00,_this.positions.x.max-offset,_this.positions.x.max);}_this.panels[0].transform.setLocalPositionX(x);}else{// First panel moves to the bottom of the stack
var min=_this.getPanelPosition(_this.count-1);if(delta<0.3){x=_Math.map(delta,0,0.3,_this.positions.x.max,_this.positions.x.offset);z=0;}else{x=_Math.map(delta,0.3,1,_this.positions.x.offset,min.x);}z=_Math.map(delta,0,1,_this.positions.z.max,min.z);_this.panels[0].transform.setLocalPositionX(x);_this.panels[0].transform.setLocalPositionZ(z);// Next panels move up
for(var i=1;i<_this.count;i++){var from=_this.getPanelPosition(i);var to=_this.getPanelPosition(i-1);x=_Math.map(delta,0,1,from.x,to.x);z=_Math.map(delta,0,1,from.z,to.z);_this.panels[i].transform.setLocalPositionX(x);_this.panels[i].transform.setLocalPositionZ(z);}}};_this.updateFolding=function(_ref2){var delta=_ref2.delta;var offset=_this.panels[0].strokeWidth+2;_this.panels.slice(1).forEach(function(panel,index){index++;var from=_this.getPanelPosition(index);var to={x:_this.positions.x.max-offset*index,z:_this.positions.z.max-offset*index};panel.transform.setLocalPositionX(_Math.map(delta,0,1,from.x,to.x));panel.transform.setLocalPositionZ(_Math.map(delta,0,1,from.z,to.z));});};_this.animations={next:new Animation({duration:400,target:{delta:0},to:{delta:1},easing:Animation.Easing.easeInOutQuint,onUpdate:_this.updatePositions,onFinish:function onFinish(){_this.panels.push(_this.panels.shift());}}),previous:new Animation({duration:400,target:{delta:1},to:{delta:0},easing:Animation.Easing.easeInOutQuint,onUpdate:_this.updatePositions,onStart:function onStart(){_this.panels.unshift(_this.panels.pop());}}),fold:new Animation({duration:400,target:{delta:0},to:{delta:1},easing:Animation.Easing.easeInOutQuint,onUpdate:_this.updateFolding}),unfold:new Animation({duration:400,target:{delta:1},to:{delta:0},easing:Animation.Easing.easeInOutQuint,onUpdate:_this.updateFolding})};return _this;}_createClass$57(PanelStack,[{key:'setup',value:function setup(){var _this2=this;_get$15(PanelStack.prototype.__proto__||Object.getPrototypeOf(PanelStack.prototype),'setup',this).call(this);var context=this.getContext();if(context===null){throw new Error('Add Panel to a context before calling setup()');}// Animations
Object.keys(this.animations).forEach(function(name){var animation=_this2.animations[name];animation.events.on('start',function(){_this2.current=animation;});animation.events.on('finish',function(){_this2.current=null;});context.addComponent(animation);animation.setup();animation.on();});// Pointer
var ptr=null;var inside=false;var swipe=false;var from={x:0,y:0};var delta={x:0,y:0};this.pointer.events.on('on',function(_ref3){var x=_ref3.x,y=_ref3.y,pointer=_ref3.pointer;if(_this2._active&&!_this2.animations.previous._isPlaying&&!_this2.animations.next._isPlaying){ptr=pointer;swipe=false;from={x:0,y:0};delta={x:0,y:0};inside=_this2.panels.some(function(panel){return panel.mesh.transform.pick(_this2.camera,x,y)!==null;});if(inside===true){from={x:x,y:y};}}});this.pointer.events.on('moved',function(_ref4){var x=_ref4.x,y=_ref4.y,pointer=_ref4.pointer;if(inside&&pointer===ptr){delta={x:x-from.x,y:y-from.y};if(Math.abs(delta.x)>20||Math.abs(delta.y)>20){swipe=true;}}});this.pointer.events.on('off',function(_ref5){var pointer=_ref5.pointer;if(inside&&pointer===ptr&&swipe===true){_this2.events.trigger('swipe',delta);if(Math.abs(delta.x)>Math.abs(delta.y)){_this2.events.trigger(delta.x>0?'swiperight':'swipeleft');}else{_this2.events.trigger(delta.y>0?'swipeup':'swipedown');}}});// Panels
this.panels.forEach(function(panel){context.addComponent(panel);panel.setup();panel.events.on('click',function(){if(swipe===false&&panel===_this2.panels[0]){_this2.events.trigger('click',panel);}});});this.on();}},{key:'update',value:function update(){}},{key:'isIdle',value:function isIdle(){return this.current===null;}},{key:'next',value:function next(){this.animations.next.play();}},{key:'previous',value:function previous(){this.animations.previous.play();}},{key:'fold',value:function fold(){var animate=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;if(!this.isFolded){this.isFolded=true;if(animate){this.animations.fold.play();}else{this.updateFolding({delta:1});}}}},{key:'unfold',value:function unfold(){var animate=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;if(this.isFolded){this.isFolded=false;if(animate){this.animations.unfold.play();}else{this.updateFolding({delta:0});}}}},{key:'on',value:function on(){_get$15(PanelStack.prototype.__proto__||Object.getPrototypeOf(PanelStack.prototype),'on',this).call(this);this.panels.forEach(function(panel){return panel.on();});}},{key:'off',value:function off(){_get$15(PanelStack.prototype.__proto__||Object.getPrototypeOf(PanelStack.prototype),'off',this).call(this);this.panels.forEach(function(panel){return panel.off();});}},{key:'getPanelPosition',value:function getPanelPosition(index){if(this.count===1){return new Vector3$1(this.positions.x.max,0,this.positions.z.max);}var easingX=Animation.Easing.easeOutSin;var easingZ=Animation.Easing.linear;var t=this.hand>0?Math.min(index,5)/5:index/(this.count-1);var dx=_Math.map(easingX(t),0,1,this.positions.x.max,this.positions.x.min);var dz=_Math.map(easingZ(t),0,1,this.positions.z.max,this.positions.z.min);return new Vector3$1(dx,0,dz);}}]);return PanelStack;}(Component);var _createClass$58=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$63(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$34(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$34(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
  * Triggered when the canvas has been redrawn, useful to synchronise Texture update and canvas refresh
  * @event drawn
  */var EVT_DRAWN$1='drawn';var TextField=function(_Base){_inherits$34(TextField,_Base);/**
      * TextField.
      *
      * @class TextField
      * @constructor
      * @param {Object} params Config parameters
      * @param {String} params.text the String to display
      * @param {Font} params.font font Mobilizing.Font object
      * @param {Number} [params.fontSize = 20] fontSize font size
      * @param {Number} [params.lineMaxCharCount = 40] lineMaxCharCount the maximum number of characters a line should count
      * @param {Color} [params.color = Color.white] color the text color
      * @param {Color} params.backgroundColor backgroundColor backgroundColor of the text
      * @param {Number} [params.width = 300] width of the label
      * @param {Number} [params.height = 100] height of the label
      *
      * @example
      *    //TODO
      */function TextField(params){_classCallCheck$63(this,TextField);var _this=_possibleConstructorReturn$34(this,(TextField.__proto__||Object.getPrototypeOf(TextField)).call(this,params));_this.setName(getOrDefault(params,'name',undefined));_this._ready=false;_this._styledLetters=[];_this._maxCharCount=getOrDefault(params,'maxCharCount',1000);_this._maxLineCount=getOrDefault(params,'maxLineCount',1);_this._size=getOrDefault(params,'size',20);_this._color=getOrDefault(params,'color',Color$1.gray);_this._backgroundColor=getOrDefault(params,'backgroundColor',Color$1.white);_this._lineHeight=getOrDefault(params,'lineHeight',1);_this._margins=getOrDefault(params,'margins',10);_this._width=getOrDefault(params,'width',300);_this._height=getOrDefault(params,'height',100);// to compute from font ?
//this.mesh = new Mesh({primitive: "plane", width: 1, height:1, material:this.material});
_this._fontURL=getOrDefault(params,'fontURL','fonts/Raleway-Regular.ttf');_this._fontItalicURL=getOrDefault(params,'fontItalicURL','fonts/Raleway-Regular-Italic.ttf');_this._fontBoldURL=getOrDefault(params,'fontBoldURL','fonts/Raleway-Bold.ttf');_this._fontBoldItalicURL=getOrDefault(params,'fontBoldItalicURL','fonts/Raleway-Bold-Italic.ttf');_this._font=getOrDefault(params,'font',undefined);//to easily switch fonts in rendering process
_this._currentFont=_this._font;_this._cursorColor=getOrDefault(params,'cursorColor',_this._color);_this._cursorWidth=getOrDefault(params,'cursorWidth',2);_this._blinkTime=getOrDefault(params,'blinkTime',300);_this._blinkState=false;setInterval(_this.onBlink.bind(_this),_this._blinkTime);_this._cursorIndex=-1;//to get the position of the cursor from the letters!
_this._cursorX=0;_this._cursorY=0;_this._canvas=document.createElement('canvas');_this._canvas.width=_this._width;_this._canvas.height=_this._height;_this._canvasContext=_this._canvas.getContext('2d');_this._canvas.events=new EventEmitter({scope:_this._canvas});//        document.body.appendChild(this._canvas);
//        this._canvas.style.position = "absolute";
//loading font chain
Loader.loadArrayBuffer(_this._fontURL,function(data){_this._defaultFontFile=data;Loader.loadArrayBuffer(_this._fontItalicURL,function(fotnItalicData){_this._defaultItalicFontFile=fotnItalicData;Loader.loadArrayBuffer(_this._fontBoldURL,function(fontBoldData){_this._defaultBoldFontFile=fontBoldData;Loader.loadArrayBuffer(_this._fontBoldItalicURL,function(fontBoldItalicData){_this._defaultBoldItalicFontFile=fontBoldItalicData;_this.setup();});});});});return _this;}/**
      * Setup bloc called after default font loading
      * @private
      * @method setup
      */_createClass$58(TextField,[{key:'setup',value:function setup(){this._defaultFont=new Font$1({fontFile:this._defaultFontFile});this._defaultItalicFont=new Font$1({fontFile:this._defaultItalicFontFile});this._defaultBoldFont=new Font$1({fontFile:this._defaultBoldFontFile});this._defaultBoldItalicFont=new Font$1({fontFile:this._defaultBoldItalicFontFile});this._currentFont=this._defaultFont;this.render();}/**
          * Set the font.
          * @method setFont
          * @param {Font} font Mobilizing font to use for the next letter
          */},{key:'setFont',value:function setFont(font){this._currentFont=font;}/**
          * Set the size of the next letter
          * @method setSize
          * @param {Number} size the new size of the font
          */},{key:'setSize',value:function setSize(val){this._size=val;}/**
          * Set the color of the next letter
          * @method setColor
          * @param {Color} color the new Mobilizing Color
          */},{key:'setColor',value:function setColor(val){this._color=val;}/**
          * add a letter to the field content. Styles (font, color, etc) should be defined before calling this method.
          * @method setText
          * @param {String} letter the letter to add
          */},{key:'addLetter',value:function addLetter(val){var char=val.charCodeAt(0);var letter=String.fromCharCode(char);//manage new line feed
if(val==='\n'){letter=val;}var styledLetter=new StyledLetter({letter:letter,font:this._currentFont,size:this._size,color:this._color});this._styledLetters.splice(this._cursorIndex+1,0,styledLetter);this.moveCursorForward();this.render();}/**
          * Delete the letter currently before the cursor (or under selection when implemented)
          * @method delete
          */},{key:'delete',value:function _delete(){if(this._cursorIndex>=0){this._styledLetters.splice(this._cursorIndex,1);//console.log("delete",this._cursorIndex,this._styledLetters);
this.moveCursorBack();}}/**
          * Cursor blink callback
          * @method onBlink
          * @private
          */},{key:'onBlink',value:function onBlink(){this._blinkState=!this._blinkState;//console.log("blink",this._blinkState);
this.render();}/**
          * Moves the cursor to the next letter
          * @method moveCursorForward
          */},{key:'moveCursorForward',value:function moveCursorForward(){this._cursorIndex++;if(this._cursorIndex>this._styledLetters.length-1){this._cursorIndex=this._styledLetters.length-1;}if(this._styledLetters.length===0){this._cursorIndex=-1;}this.render();//console.log("++this._cursorIndex",this._cursorIndex);
}/**
          * Moves the cursor to the pevious letter
          * @method moveCursorBack
          */},{key:'moveCursorBack',value:function moveCursorBack(){this._cursorIndex--;if(this._cursorIndex<-1){this._cursorIndex=-1;}this.render();//console.log("--this._cursorIndex",this._cursorIndex);
}/**
          * Moves the cursor to the given index of the letter
          * @method moveCursorTo
          * @param {Number} index
          */},{key:'moveCursorTo',value:function moveCursorTo(index){if(index>=-1&&index<this._styledLetters.length){this._cursorIndex=index;this.render();}}/**
          * Pick the letter situated under the given x,y coordinates
          * @method pickLetter
          * @param {Number} x
          * @param {Number} y
          */},{key:'pickLetter',value:function pickLetter(x,y){for(var i=0;i<this._styledLetters.length;i++){var el=this._styledLetters[i];var bbox=el.path.getBoundingBox();var rect=[{x:bbox.x1,y:bbox.y1},{x:bbox.x2,y:bbox.y1},{x:bbox.x2,y:bbox.y2},{x:bbox.x1,y:bbox.y2}];if(_Math.pointIsInside(x,y,rect)){return{index:i,letter:this._styledLetters[i]};}}return null;}/**
          * Renders the canvas
          * @method render
          */},{key:'render',value:function render(){//background color
this._canvasContext.fillStyle='#'+this._backgroundColor.getHexString();this._canvasContext.fillRect(0,0,this._width,this._height);//x position of drawing (letter pos in x)
var letterXOffset=this._margins;//y position of drawing (letter pos in y, or baseline)
var lineYOffset=this._margins;for(var i=0;i<this._styledLetters.length;i++){if(i<this._maxCharCount){var el=this._styledLetters[i];//is it the 1st run ?  place the baseline to the margin + font size
if(lineYOffset===this._margins){lineYOffset+=el.size;}//test for new line from canvas width limit and reset offsets and add a new line to lineCount
var tempWidth=letterXOffset+el.width;if(tempWidth>this._width-this._margins){lineYOffset+=el.size;letterXOffset=this._margins;}//test for new line feed
if(el.letter==='\n'){lineYOffset+=el.size;letterXOffset=this._margins;}el.setX(letterXOffset);el.setY(lineYOffset);el.update();//refresh
el.path.draw(this._canvasContext);//update the x offset for next el
letterXOffset+=el.width;}}//draw the cursor
if(this._blinkState){var _el=this._styledLetters[this._cursorIndex];if(_el){var boundingBox=_el.path.getBoundingBox();this._canvasContext.beginPath();//console.log(el);
if(_el.height<1)//manage blank space
{this._canvasContext.moveTo(_el.x+_el.width,_el.y);this._canvasContext.lineTo(_el.x+_el.width,_el.y);this._canvasContext.lineTo(_el.x+_el.width,_el.y-this._size);}else//use path boundingBox
{this._canvasContext.moveTo(boundingBox.x2,boundingBox.y1);this._canvasContext.lineTo(boundingBox.x2,boundingBox.y1);this._canvasContext.lineTo(boundingBox.x2,boundingBox.y2);}}else//we don't have a letter, it's the start of the text
{this._canvasContext.beginPath();this._canvasContext.moveTo(this._margins,this._margins);this._canvasContext.lineTo(this._margins,this._margins);this._canvasContext.lineTo(this._margins,this._margins+this._size);}this._canvasContext.lineWidth=this._cursorWidth;this._canvasContext.strokeStyle='#'+this._cursorColor.getHex();this._canvasContext.stroke();}//emit a custom event on the canvas to refresh texture when used
this._canvas.events.trigger(EVT_DRAWN$1);}/**
          * Get canvas width
          * @method getWidth
          * @return {Number} canvas width
          */},{key:'getWidth',value:function getWidth(){return this._width;}/**
          * Get canvas height
          * @method getHeight
          * @return {Number} canvas height
          */},{key:'getHeight',value:function getHeight(){return this._height;}/**
          * Get the canvas
          * @method getCanvas
          * @return {Canvas} canvas
          */},{key:'getCanvas',value:function getCanvas(){return this._canvas;}}]);return TextField;}(Base);var _createClass$60=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$65(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$36(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$36(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ComponentProxy=function(_Component){_inherits$36(ComponentProxy,_Component);/**
       * ComponentProxy is a proxy that converts (like a kind of casting) scripts into Mobilizing Components. It was designed specifically to convert users script to regular Components, so they can be used besides all the other Components used by the program. The script should implement the methods preLoad(), setup(), update(). Users can define their own Component using this class for converting their script to a regular Mobilizing Component, we call it custom behavior.
       *
       * @example
       *     //to do
       *
       * @class ComponentProxy
       * @constructor
       * @extends Component
       *
       * @param {Object} params Config parameters
       * @param {Script} params.targetScript The Mobilizing user's script to convert in a Component
      */function ComponentProxy(params){_classCallCheck$65(this,ComponentProxy);var _this=_possibleConstructorReturn$36(this,(ComponentProxy.__proto__||Object.getPrototypeOf(ComponentProxy)).call(this,params));_this.targetScript=params.targetScript;_this.targetScript.context=params.context;_this.targetScript.getContext=function(){return this.context;};return _this;}/**
       * @method preLoad
       */_createClass$60(ComponentProxy,[{key:'preLoad',value:function preLoad(){if(typeof this.targetScript.preLoad==='function'){var _targetScript=void 0;(_targetScript=this.targetScript).preLoad.apply(_targetScript,arguments);}}/**
          * Initialization method
          * @method setup Setup
          */},{key:'setup',value:function setup(){this.targetScript.setup();}/**
           * @method update
           */},{key:'update',value:function update(){this.targetScript.update();}}]);return ComponentProxy;}(Component);var _createClass$59=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck$64(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$35(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$35(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Context=function(_Component){_inherits$35(Context,_Component);/**
      * Mobilizing.js defines a context to enable the use of multiple Mobilizing.js instances in the same webpage.
      *
      * @class Context
      * @constructor
      */function Context(params){_classCallCheck$64(this,Context);var _this=_possibleConstructorReturn$35(this,(Context.__proto__||Object.getPrototypeOf(Context)).call(this,params));_this._components=[];//list of components
_this.loader=new Loader();//default loader
return _this;}/**
      * Context initialization. Instanciates a Loader.
      *
      * @method init
      */_createClass$59(Context,[{key:'init',value:function init(){}/**
           * Setup for this Context instance (setup all components)
           *
           * @method setup
           */},{key:'setup',value:function setup(){var _this2=this;this._components.forEach(function(component){//component.setup();
_this2.chainedCall(component,'setup');});}/**
          * preLoad all components
          *
          * @method setup
          */},{key:'preLoad',value:function preLoad(){var _this3=this;this._components.forEach(function(component){component.preLoad(_this3.loader);//this.chainedCall(component, "preLoad", this.loader);
});}/**
          * Update
          * @method update
          */},{key:'update',value:function update(){var _this4=this;//new components pre-update-post
this._components.forEach(function(component){//component.preUpdate();
_this4.chainedCall(component,'preUpdate');});this._components.forEach(function(component){_this4.chainedCall(component,'update');});this._components.forEach(function(component){//component.postUpdate();
_this4.chainedCall(component,'postUpdate');});}},{key:'chainedCall',value:function chainedCall(component,method,arg){var _this5=this;component[method](arg);//execute first
var chained=component.getChainedComponents();//recurse then
if(chained.length>0){chained.forEach(function(chainedComponent){_this5.chainedCall(chainedComponent,method,arg);});}}/**
          * Add a Component to this context
          * @method addComponent
          * @param {Component} component
          */},{key:'addComponent',value:function addComponent(component){//encapsulate class in a component : useful for user script
if(!(component instanceof Component)){component=new ComponentProxy({targetScript:component,context:this});}this._components.push(component);component.setContext(this);//add the context to the component
//component.setup(); //no
//component.preLoad(this.loader);
return component;}/*
           addBehaviour(target, component)
          {
              component.context = this;
              component.getContext = function(){return this.context;};
              component.target = target;
              component.getTarget = function(){return this.target;};
              this.components.push(component);
              component.setup();
          }
            */}]);return Context;}(Component);var _createClass$61=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get$16=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if('value'in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck$66(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _possibleConstructorReturn$37(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==='undefined'?'undefined':_typeof2(call))==='object'||typeof call==='function')?call:self;}function _inherits$37(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+(typeof superClass==='undefined'?'undefined':_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/*
   * @class EasyContext
   * @extends Context
   */var EasyContext=function(_Context){_inherits$37(EasyContext,_Context);function EasyContext(){_classCallCheck$66(this,EasyContext);return _possibleConstructorReturn$37(this,(EasyContext.__proto__||Object.getPrototypeOf(EasyContext)).apply(this,arguments));}_createClass$61(EasyContext,[{key:'init',/*
          * Initiate the context by instanciating objects needed for the Mobilizing lib to work well! That is :
          *
          *     static Time Object
          *     Scenes array (context.scenes)
          *     Cameras array (context.cameras)
          *     Engine object
          *     device object (context.device)
          *     Canvas for rendering (context.canvas)
          *     Input object (context.input)
          *
          * @method init
          * @param {Canvas} canvas The canvas to use as a rendering surface
          * @param {JSON object} params inputDisabled to disable input
          */value:function init(){var params=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_get$16(EasyContext.prototype.__proto__||Object.getPrototypeOf(EasyContext.prototype),'init',this).call(this,params);params.context=this;this.audio=this.addComponent(new Mobilizing.RendererAudio(params));this.renderer=this.addComponent(new Mobilizing.Renderer3D(params));this.physics=this.addComponent(new Mobilizing.PhysicsEngine(params));this.time=this.addComponent(new Mobilizing.Time(params));this.touch=this.addComponent(new Mobilizing.input.Touch({context:this}));}/*
          * Update all the context object that needs it (Time, Animation, Input)
          * @method update
          * @param {Canvas} canvas
          */},{key:'update',value:function update(canvas){_get$16(EasyContext.prototype.__proto__||Object.getPrototypeOf(EasyContext.prototype),'update',this).call(this,canvas);}},{key:'getMainRenderer',value:function getMainRenderer(){return this.renderer;}},{key:'getRenderingSurface',value:function getRenderingSurface(){return this.canvas;}},{key:'getTouchSurface',value:function getTouchSurface(){return this.canvas;}/*
          * Tells the context to use this scene (defined by a string) or create it and switch to it.
          * @method setCurrentScene
          * @param {String} name
          */},{key:'setCurrentScene',value:function setCurrentScene(name){this.renderer.setCurrentScene(name);}/*
          * Adds on object to the current scene
          * @method addToCurrentScene
          * @param {Object} object A Mesh or Light to add the ce scène
          */},{key:'addToCurrentScene',value:function addToCurrentScene(object){this.renderer.addToCurrentScene(object);}/*
          * Remove from the current scene
          * @method removeFromCurrentScene
          * @param {Object} object the object to remove
          */},{key:'removeFromCurrentScene',value:function removeFromCurrentScene(object){this.renderer.removeFromCurrentScene(object);}},{key:'clear',value:function clear(){this.renderer.clear();}/*
          * Adds a camera to the current context
          * @method addCamera
          * @param {Camera} cam the camera to add
          */},{key:'addCamera',value:function addCamera(cam){this.renderer.addCamera(cam);}/*
          * Removes the camera from the current context
          * @method removeCamera
          * @param {Camera} cam
          */},{key:'removeCamera',value:function removeCamera(cam){this.renderer.removeCamera(cam);}/*
          * Returns the current canvas'size as {width, height}
          * @method getCanvasSize
          * @return {Object} the size of the canvas as {width, height}
          */},{key:'getCanvasSize',value:function getCanvasSize(){return{width:this.canvas.width/window.devicePixelRatio,height:this.canvas.height/window.devicePixelRatio};}//move to RendererAudio
},{key:'beep',value:function beep(frequency){this.audio.beep(frequency);}// Helper function to get an element's exact position
},{key:'getCanvasPosition',value:function getCanvasPosition(){return _DOM.getElementPosition(this.canvas);}},{key:'updateCanvasPosition',value:function updateCanvasPosition(){this.canvasPosition=this.getCanvasPosition();}/*
           * Creates a Mobilizing Cube
           * @method createCube
           * @return {Object} a Mobilizing cube
          */},{key:'createCube',value:function createCube(){//var cube = new Mobilizing.Cube(...arguments);
var cube=new Mobilizing.Mesh({primitive:'box'});this.addToCurrentScene(cube);return cube;}/*
           * Creates a Mobilizing sphere
           * @method createSphere
           * @return {Object} a Mobilizing sphere
           */},{key:'createSphere',value:function createSphere(){//var sphere = new Mobilizing.Sphere(...arguments);
var sphere=new Mobilizing.Mesh({primitive:'sphere'});//var sphere = Mobilizing.Mesh.CreateSphere(1,100,100);
this.addToCurrentScene(sphere);return sphere;}/*
           * Creates a Mobilizing Plane
           * @method createPlane
           * @return {Object} a Mobilizing Plane
           */},{key:'createPlane',value:function createPlane()/*width, height*/{//var plane = Mobilizing.Mesh.CreatePlane(width, height);
var plane=new Mobilizing.Mesh({primitive:'plane'});this.addToCurrentScene(plane);return plane;}/*
           * Creates a Mobilizing Light
           * @method createLight
           * @return {Object} a Mobilizing light
           */},{key:'createLight',value:function createLight(){var light=new(Function.prototype.bind.apply(Mobilizing.Light,[null].concat(Array.prototype.slice.call(arguments))))();this.addToCurrentScene(light);return light;}/*
           * Creates a Mobilizing label
           * @method createLabel
           * @return {Object} a Mobilizing label
           */},{key:'createLabel',value:function createLabel(params){params.context=this;var label=new Mobilizing.Label(params);this.addToCurrentScene(label);return label;}/*
           * Creates a Mobilizing label
           * @method createLabel
           * @return {Object} a Mobilizing label
           */},{key:'createMesh',value:function createMesh(params){params.context=this;var mesh=new Mobilizing.Mesh(params);this.addToCurrentScene(mesh);return mesh;}/*
           * Creates a Mobilizing Camera
           * @method createCamera
           * @return {Object} a Mobilizing camera
           */},{key:'createCamera',value:function createCamera(){var cam=new(Function.prototype.bind.apply(Mobilizing.Camera,[null].concat(Array.prototype.slice.call(arguments))))();this.addCamera(cam);this.addToCurrentScene(cam);return cam;}/*
           * Creates a Mobilizing Camera
           * @method createCameraX
           * @param {Object} params A multi purpose parametrization object
           * @return {Object} a Mobilizing camera
           */},{key:'createCameraX',value:function createCameraX(params){//DEPRECATED
var cam=new Mobilizing.Camera(params.type);this.addCamera(cam);this.addToCurrentScene(cam);if(params.fov!==undefined){cam.setFOV(params.fov);}if(params.position!==undefined){cam.transform.setLocalPosition(params.position);}if(params.layer!==undefined){cam.layer=params.layer;}return cam;}/*
           * Creates a Text Label
           * @method createTextLabel
           * @return {Object} a Mobilizing Label
           */},{key:'createTextLabel',value:function createTextLabel(text,font,fontSize,width,height,color,backgroundColor,texture/*, hasBackground*/){var labelTest=new Mobilizing.Label(text,font,width,height);labelTest.style.fontSize=fontSize;labelTest.style.color=color;if(backgroundColor!==undefined){labelTest.style.hasBackground=true;labelTest.style.backgroundColor=backgroundColor;}else{labelTest.style.hasBackground=false;}//labelTest.style.textAlign = align;//"center|end|left|right|start"
labelTest.style.textAlign='center';//"center|end|left|right|start"
if(texture!==undefined){labelTest.material.texture=texture;labelTest.transform.setLocalScale(width,height,1);}else{labelTest.render();}this.addToCurrentScene(labelTest);return labelTest;}/*
           * Creates a Mobilizing Video Quad
           * @method createVideoQuad
           * @return {Object} a Mobilizing Video Quad
           */},{key:'createVideoQuad',value:function createVideoQuad(url){var quad=new Mobilizing.Mesh({primitive:'plane'});quad.vt=new Mobilizing.VideoTexture();quad.vt.loadFromFile(url);quad.material.setTexture(quad.vt);this.addToCurrentScene(quad);return quad;}/*
           * Loads a Mobilizing Font
           * @method loadFont
           * @return {Object} a Mobilizing Font
           */},{key:'loadFont',value:function loadFont(url){var font=new Mobilizing.Font(url,this);return font;}},{key:'loadObj3dModel',value:function loadObj3dModel(model_url,texture_url){//load model from OBJ file
var model=new Mobilizing.Mesh();model.material=new Mobilizing.Material({type:'lambert'});model.updateMaterial();model.loadFromFile(model_url,this.onObjLoaded.bind(this));//load texture
var tex=new Mobilizing.Texture({context:this});tex.loadFromFile(texture_url);//apply texture to model
model.material.setTexture(tex);//mob.addToCurrentScene(model); //doing this before the completed loading may result in an no rendering, we have to do that in the callback given to loadFromFile()
//console.log("added to current scene");
return model;}},{key:'onObjLoaded',value:function onObjLoaded(model){//we add the just loaded model to the 3D scene
this.addToCurrentScene(model);}/*
           * Creates a Mobilizing Audio source
           * @method createAudioSource
           * @return {Object} a Mobilizing Audio source
           */},{key:'createAudioSource',value:function createAudioSource(url){var source=new Mobilizing.AudioSource(this);source.set3D(false);var sound=new Mobilizing.AudioBuffer(this);sound.loadFromURL(url,this.onBufferLoaded.bind(this));return source;}},{key:'onBufferLoaded',value:function onBufferLoaded()/*source, buffer*/{}//source.setBuffer(sound);
//source.play();
/*
           * Creates a Mobilizing Texture
           * @method createTexture
           * @return {Object} a Mobilizing texture
           */},{key:'createTexture',value:function createTexture(){var texture=new Mobilizing.Texture({context:this});return texture;}/*
           * Creates a Mobilizing Texture
           * @method createTextureFromCubeCamera
           * @return {Object} a Mobilizing texture
           */},{key:'createTextureFromCubeCamera',value:function createTextureFromCubeCamera(camera){var texture=new Mobilizing.Texture({context:this});texture.cube=camera._camera.renderTarget;//FIXME
texture.cube.minFilter=THREE.LinearMipMapLinearFilter;return texture;}/*
           * Loads a Mobilizing Texture
           * @method loadFont
           * @return {Object} a Mobilizing Texture
           */},{key:'loadTexture',value:function loadTexture(url,asynchro){var texture=new Mobilizing.Texture({context:this});texture.loadFromFile(url,asynchro);return texture;}/*
           * Creates a Mobilizing Button
           * @method createTextButton
           * @return {Object} a Mobilizing Button
           */},{key:'createTextButton',value:function createTextButton(text,width,height,font,fontSize,position,scale){var button=Mobilizing.Button.CreateButton(undefined,text,font,fontSize,position,width,height,undefined,undefined,this);button.transform.setLocalScale(scale);this.addToCurrentScene(button);return button;}}]);return EasyContext;}(Context);var version='0.0.1';var revision='8fdb694';var input={Keyboard:Keyboard,Mouse:Mouse,Touch:Touch,Motion:Motion,Orientation:Orientation,GPS:GPS};var net={Ajax:Ajax,PubSub:PubSub};exports.version=version;exports.revision=revision;exports.input=input;exports.net=net;exports.GPSUtils=GPSUtils;exports.math=_Math;exports.getOrDefault=getOrDefault;exports.AudioBuffer=AudioBuffer;exports.AudioSource=AudioSource;exports.Color=Color$1;exports.Euler=Euler$1;exports.Matrix3=Matrix3$1;exports.Matrix4=Matrix4$1;exports.Quaternion=Quaternion$1;exports.Rect=Rect;exports.Vector2=Vector2$1;exports.Vector3=Vector3$1;exports.Animation=Animation;exports.Csg=Csg;exports.Debug=Debug;exports.debug=debug;exports.Device=Device;exports.BatteryStatus=BatteryStatus;exports.MeshFX=MeshFX;exports.Midi=Midi;exports.Profiler=Profiler;exports.Runner=Runner;exports.Loader=Loader;exports.Cache=Cache;exports.Pointer=Pointer;exports._DOM=_DOM;exports.PhysicsEngine=PhysicsEngine;exports.Engine3D=Engine3D;/**
   * @todo check problem with renderer3D singleton in mobilizing.js
   * @body
   * For the purpose of the experiment it was necessary to expose renderer 3D as a instanciable object
   * because of the fact that a mobilizing sketch must be unloaded and reloaded multiple times
   */// exports.Renderer3D = Renderer3DSingleton;
exports.Renderer3D=Renderer3D;exports.RendererAudio=RendererAudioSingleton;exports.Camera=Camera;exports.Font=Font$1;exports.Light=Light;exports.LODGroup=LODGroup;exports.Material=Material;exports.Transform=Transform;exports.Label=Label;exports.Mesh=Mesh$1;exports.EdgesMesh=EdgesMesh;exports.StyledLetter=StyledLetter;exports.StyledTextElement=StyledTextElement;exports.TextLine=TextLine;exports.RichText=RichText;exports.CanvasTexture=CanvasTexture;exports.DOMNodeTexture=DOMNodeTexture;exports.ImageSequenceTexture=ImageSequenceTexture;exports.RenderTexture=RenderTexture;exports.Texture=Texture$1;exports.VideoTexture=VideoTexture;exports.Time=Time;exports.Timer=Timer;exports.NTP=NTP;exports.Button=Button;exports.ButtonGroup=ButtonGroup;exports.Clickable=Clickable;exports.Panel=Panel;exports.PanelStack=PanelStack;exports.TextField=TextField;exports.Context=Context;exports.EasyContext=EasyContext;Object.defineProperty(exports,'__esModule',{value:true});});//# sourceMappingURL=Mobilizing.js.map