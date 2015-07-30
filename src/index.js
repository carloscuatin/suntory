/* eslint no-unused-vars:0 */

import React, {Component} from 'react';
import './vendor/delegatePolyfill';

// Borrowed from https://github.com/jashkenas/backbone/blob/master/backbone.js#L1178
const DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

const suntory = (events) => {
  return (Target) => {
    return !events ? Target : class extends Component {
      constructor() {
        super();
        this.events = events;
      }

      componentDidMount() {
        this.attachEvents(events);
      }

      attachEvents() {
        const parentDOM = React.findDOMNode(this);
        for(let key in this.events) {
          const handler = events[key];
          const [key, event, selector] = key.match(DELEGATE_EVENT_SPLITTER);
          if(typeof handler !== 'function') {
            console && console.warn(`[Suntory] The handler for the event ${key} is not a function`);
            continue;
          }

          parentDOM.on(event, selector, handler.bind(this));
        }
      }

      render() {
        return <Target {...this.props} />
      }

    };
  };
};

export default suntory;
