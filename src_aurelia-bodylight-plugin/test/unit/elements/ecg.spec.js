import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('chartjs element', () => {
  let component;

  /*beforeEach(() => {
    const createElement = document.createElement.bind(document);
    document.createElement = (tagName) => {
	if (tagName === 'canvas') {
        return {
        CanvasRenderingContext2D:() => ({}),
	    getContext: () => ({}),
	    getContext2d: () => ({}),
	    measureText: () => ({})
        };
	}
	return createElement(tagName);
    };

  });*/

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('creates ecg canvas', done => {

    component = StageComponent
      .withResources('elements/ecg')
      .inView('<ecg \n' +
        '  id="id11" \n' +
        '  fromid="id4" \n' +
        '  labels="ECG I (mV)"\n' +
        '  width="300"\n' +
        '  height="50"></ecg>');


    component.create(bootstrap).then(() => {
      //await waitForTimeout(50);
      const view = component.element;
      const canvas = view.getElementsByTagName('canvas');
      expect(canvas.length).toBe(1); //1 canvas
      const divs = view.getElementsByTagName('div');
      //console.log('divs length',divs.length)
      expect(divs.length).toBe(3); //2 chartjs monitor1
      //console.log('divs[0] class')
      //expect(divs[0].className).toBe('chartjs-size-2); //2 chartjs monitor1
      //const chartjsmonitor = view.getElementsByClassName('chartjs-size-monitor');
      //expect(chartjsmonitor.length).toBe(1); //1 chartjs monitor1
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
