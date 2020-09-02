import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('bdl-range element', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('creates 2 inputs, first range, second number', done => {

    component = StageComponent
      .withResources('elements/bdl-range.html')
      .inView('<bdl-range></bdl-range>');


    component.create(bootstrap).then(() => {
      const view = component.element;
      const inputs = view.getElementsByTagName('input');
      expect(inputs.length).toBe(2);
      expect(inputs[0].getAttribute('type')).toBe('range')
      expect(inputs[1].getAttribute('type')).toBe('number')
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
