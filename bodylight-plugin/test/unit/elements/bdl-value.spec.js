import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('bdl-value element', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('creates 1 span with value', done => {

    component = StageComponent
      .withResources('elements/bdl-value')
      .inView('<div><bdl-fmi id="id1"></bdl-fmi><bdl-value fromid="id1"></bdl-value></div>');

    component.create(bootstrap).then(() => {
      const view = component.element;
      const spans = view.getElementsByTagName('span');
      expect(spans.length).toBe(1);
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
