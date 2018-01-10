import React, {Component} from 'react';

import Dimensions from 'react-dimensions';
import {get} from 'axios';

global.THREE = require('three');
global.opentype = require('opentype.js');
const MobilizingLib = require('./vendor/mobilizing.js');
global.Mobilizing = MobilizingLib.Mobilizing ? MobilizingLib.Mobilizing : MobilizingLib;
const mobiliscene = require('./mobiliscene');

class MobiliscenePlayer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initMobiliscene();
    }

    componentWillUnmount() {
      this.unloadMobiliscene();
    }

    resolveDependencies = (data, assetUri) =>
      new Promise((resolve, reject) => {
        // get text
        if (data.content_type === 'text') {
          get(assetUri)
            .then(resp => {
              const content = resp.data;
              resolve({
                ...data,
                content
              });
            })
            .catch(reject);
        }
        else {
          resolve(data);
        }
      })

    initMobiliscene = () => {
      const {
        resource: {
          data
        },
        assetUri,
        fontUri,
      } = this.props;

      this.resolveDependencies(data, assetUri)
        .then(finalData => {
          this.mobilizing = new Mobilizing.Context();/* eslint no-undef : 0 */
          const s = new mobiliscene(this.canvas, finalData, assetUri, fontUri);
          this.mobilizing.addComponent(s);
          this.runner = new Mobilizing.Runner({context: this.mobilizing});/* eslint no-undef : 0 */
        })
        .catch();
    }

    unloadMobiliscene = () => {
      this.runner = null;
      // this.mobilizing._components.forEach(component => {
      //   component = null;
      // });
      this.mobilizing._components = [];
      this.mobilizing = null;
    }

    render() {
      const {
          containerWidth,
          containerHeight,
      } = this.props;
      const bindCanvas = canvas => {
          this.canvas = canvas;
      };
      return (
        <div>
          <canvas
            ref={bindCanvas}
            width={containerWidth}
            height={containerHeight}
            style={{width: containerWidth, height: containerHeight}} />
        </div>
      );
    }
}


export default Dimensions()(MobiliscenePlayer);
