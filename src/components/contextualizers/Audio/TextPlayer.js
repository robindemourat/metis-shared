/* eslint react/no-set-state : 0 */
/* eslint react/no-danger : 0 */

import React, {Component} from 'react';
import mime from 'mime';
import srt from 'srt';

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
      const xhr = new XMLHttpRequest();
      const fileReader = new FileReader();

      xhr.open('GET', src, true);
      // Set the responseType to blob
      xhr.responseType = 'blob';

      xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
              // onload needed since Google Chrome doesn't support addEventListener for FileReader
              fileReader.onload = (evt) => {
                  // Read out file contents as a Data URL
                  resolve(evt.target.result);
              };
              // Load blob as Data URL
              fileReader.readAsText(xhr.response);
          }
 else {
            // handle error
            xhr.addEventListener('error', e => reject(e));
          }
      }, false);

      // Send XHR
      xhr.send();
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
            contents = srt.fromString(str);
            // turn to array
            contents = Object.keys(contents).map(id => contents[id]);
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
      <div>
        {contents.map((paragraph, index) => {
          return <p key={index} dangerouslySetInnerHTML={{__html: paragraph.text}} />;
        })}
      </div>
    );
  }
}
