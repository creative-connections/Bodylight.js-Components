import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('value element', () => {
  let component;

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('creates 1 span with value', done => {

    component = StageComponent
      .withResources(['elements/value','elements/fmi'])
      .inView('<div><div id="id1" valuereferences=""></div><value fromid="id1"></value></div>');

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
