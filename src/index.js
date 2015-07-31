/* eslint no-unused-vars:0 */

import React, {Component} from 'react';
import './vendor/delegatePolyfill';

// Borrowed from https://github.com/jashkenas/backbone/blob/master/backbone.js#L1178
const DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

const suntory = (events) => {
  return (Target) => {
    return !events ? Target : class Suntory extends Target {
      constructor() {
        super();
        this.events = events;
      }

      componentDidMount(...args) {
        super.componentDidMount && super.componentDidMount.apply(this, args);
        this.toggleEvent('on');
      }

      componentWillUnmount() {
        super.componentWillUnmount && super.componentWillUnmount.apply(this, args);
        this.toggleEvent('off')
      }

      toggleEvent(action) {
        const parentDOM = React.findDOMNode(this);
        for(let key in this.events) {
          const handler = events[key];
          const [key, event, selector] = key.match(DELEGATE_EVENT_SPLITTER);
          if(typeof handler !== 'function') {
            console && console.warn(`[Suntory#${action}] The handler for the event ${key} is not a function`);
            continue;
          }

          parentDOM[action].call(parentDOM, event, selector, handler.bind(this));
        }
      }

    };
  };
};

export default suntory;
