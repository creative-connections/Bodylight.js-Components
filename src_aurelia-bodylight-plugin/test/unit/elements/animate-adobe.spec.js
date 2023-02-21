//import 'createjs/builds/1.0.0/createjs.js';
import '@danzen/createjs';
import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}
describe('animate-adobe element', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });


  /* seems that createjs not compatible with server testing in jest
  it('creates animate-adobe with createjs', done => {
    //await delay(500);
    component = StageComponent
      .withResources('elements/animate-adobe')
      .inView('<div><script></script><animate-adobe src="Faze_srdce.js"></animate-adobe></div>');

    component.create(bootstrap).then(() => {
      //await waitForTimeout(50);
      const view = component.element;
      //console.log('component',component)
      //console.log('component.element',component.element)
      const canvas = view.getElementsByTagName('canvas');
      expect(canvas.length).toBe(1); //1 canvas
      const divs = view.getElementsByTagName('div');
      expect(divs.length).toBe(2); //1 anim container, 1 dom_overlay

      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
   */
  it('creates animate-adobe-control with 2 buttons', done => {
    component = StageComponent
      .withResources('elements/animate-adobe-control')
      .inView('<animate-adobe-control></animate-adobe-control>');

    component.create(bootstrap).then(() => {
      //await waitForTimeout(50);
      const view = component.element;
      const buttons = view.getElementsByTagName('button');
      expect(buttons.length).toBe(2);
      expect(buttons[0].title).toBe('Start/Stop simulation');
      expect(buttons[1].title).toBe('Do simulation step');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
