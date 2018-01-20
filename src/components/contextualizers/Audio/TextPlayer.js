/* eslint react/no-set-state : 0 */
/* eslint react/no-danger : 0 */
/* eslint no-new-func : 0 */

import React, {Component} from 'react';
import mime from 'mime';
import {get} from 'axios';

import srt from 'parse-srt';


const isBrowser = new Function('try {return this===window;}catch(e){ return false;}');
const inBrowser = isBrowser();

let fs;
if (!inBrowser) {
  fs = require('fs');
}

export default class TextPlayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contents: []
    };
  }

  componentWillMount = () => {
    if (this.props.src) {
      this.updateText(this.props.src);
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.src) {
      this.updateText(nextProps.src);
    }
  }

  getText = src => {
    return new Promise((resolve, reject) => {
      const protocol = src.split(':')[0];
      if (protocol.indexOf('http') === 0) {
        get(src)
          .then(resp => {
            resolve(resp.data);
          })
          .catch(reject);
      }
 else if (protocol.indexOf('file') === 0 && fs) {
        const path = src.split('file://')[1];
        fs.readFile(path, 'utf8', (err, str) => {
          if (err) {
            return reject(err);
          }
 else return resolve(str);
        });
      }
 else reject();
    });
  }

  updateText = (src) => {
    this.getText(src)
      .then(str => {
        const type = mime.lookup(src.split('.').pop());
        let contents;
        switch (type) {
          case 'application/x-subrip':
          case 'text/srt':
            if (srt) {
              contents = srt(str);
              // turn to array
              contents = Object.keys(contents).map(id => contents[id]);
            }
            else {
              contents = str.split('\n')
                          .filter(s => s.trim().length)
                          .map(text => ({text}));
            }
            break;

          default:
            contents = str.split('\n')
                          .filter(s => s.trim().length)
                          .map(text => ({text}));
            break;
        }
        this.setState({
          contents
        });
      })
      .catch(() => {
        // what to do there ?
        this.setState({
          content: {text: 'Not available'}
        });
      });
  }

  render() {
    const {
      contents = []
    } = this.state;

    return (
      <blockquote className="transcription-container">
        {contents.map((paragraph, index) => {
          return <p key={index} dangerouslySetInnerHTML={{__html: paragraph.text}} />;
        })}
      </blockquote>
    );
  }
}
