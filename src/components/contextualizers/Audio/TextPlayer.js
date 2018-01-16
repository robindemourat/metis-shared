/* eslint react/no-set-state : 0 */
/* eslint react/no-danger : 0 */

import React, {Component} from 'react';
import mime from 'mime';
import {get} from 'axios';

import srt from 'parse-srt';

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
      get(src)
        .then(resp => {
          console.log(resp);
          resolve(resp.data);
        })
        .catch(reject);
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
      });
  }

  render() {
    const {
      contents = []
    } = this.state;

    return (
      <div className="transcription-container">
        {contents.map((paragraph, index) => {
          return <p key={index} dangerouslySetInnerHTML={{__html: paragraph.text}} />;
        })}
      </div>
    );
  }
}
