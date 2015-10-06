/* eslint no-unused-vars:0, no-console:0, no-unused-expressions:0 */

import {Component} from 'react';
import ReactDom from 'react-dom';
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

      componentWillUnmount(...args) {
        super.componentWillUnmount && super.componentWillUnmount.apply(this, args);
        this.toggleEvent('off');
      }

      toggleEvent(action) {
        const parentDOM = ReactDom.findDOMNode(this);
        for(let eventItem in this.events) {
          const handler = events[eventItem];
          const [key, event, selector] = eventItem.match(DELEGATE_EVENT_SPLITTER);
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
