import React from 'react';
import suntory from '../src';
import './index.scss';

class Item extends React.Component {
  render() {
    return <li className="List-item" data-click>{this.props.text}</li>;
  }
}

@suntory({
  'click [data-click]': function(e) { console.log(e.target) }
})
class List extends React.Component {
  render() {
    return (
        <div>
          <ul>
            {
              "Hola mundo, esto es una prueba de suntory".split(' ').map((text, index) => {
                return (<Item key={index} text={text} />);
              })
            }
          </ul>
        </div>
    )
  }
}

React.render(<List />, document.getElementById('container'));
