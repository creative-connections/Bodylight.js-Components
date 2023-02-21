import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('chartjs-time element', () => {
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

  it('creates chartjs-time canvas', done => {

    component = StageComponent
      .withResources('elements/chartjs-time')
      .inView('<chartjs-time \n' +
          '  id="id9" \n' +
          '  width="300" \n' +
          '  height="500" \n' +
          '  fromid="id4" \n' +
          '  labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"\n' +
          '  initialdata="0,4,2,3" \n' +
          '  refindex="2" \n' +
          '  refvalues="6"></chartjs-time>');


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
