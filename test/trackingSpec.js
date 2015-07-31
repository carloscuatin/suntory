import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import testTree from 'react-test-tree';

import suntory from '../src';

const getInstanceFromSuntory = (events) => {
  const decorator = suntory(events);
  const Constructor = decorator(class Target{});
  return new Constructor();
};

const createTree = (events) => {
  class Item extends React.Component {
    render() {
      return <li className="List-item" data-click></li>;
    }
  }

  @suntory(events)
  class List extends React.Component {
    render() {
      return (
        <div>
          <ul refCollection='ul'>{[1,2,3].map((_, index) => <Item key={index} ref={`li${index}`}/>)}</ul>
        </div>
      )
    }
  }

  return testTree(<List />);
}

describe('Suntory', () => {

  it('expect be decorator function', () => {
    return expect(suntory).not.to.be.undefined;
  });

  it('expect return a function if is called with a object', () => {
    expect(suntory({'event dom-slice': () => {}})).to.be.a('function');
  });

  it('expect return the same target if there is not events object', () => {
    return expect(getInstanceFromSuntory().events).to.be.undefined;
  });

  it('expect return a new class with the events', () => {
    return expect(getInstanceFromSuntory({'event dom-slice': () => {}}).events).not.to.be.undefined;
  });

  describe('Using the decorator to append an event', () => {
    let list, handlerStub;
    beforeEach(() => {
      handlerStub = sinon.stub();
      list = createTree({'click .List-item': handlerStub});
    });

    afterEach(() => {
      handlerStub.reset();
      list.dispose();
    });

    xit('Expect execute the callback define', () => {
      list.ul[0].click();
      return expect(handlerStub.called).to.be.true;
    });

    xit('Expect calling with the original event', () => {});
    xit('Expect play well with static methods', () => {});
    xit('Expect play well other decorators', () => {});
    xit('Expect call to suntory with without browser', () => {});
  });

});
