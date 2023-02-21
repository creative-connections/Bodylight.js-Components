import '@danzen/createjs';
import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}



describe('markdown element',  () => {
  let component;
  beforeEach(() => {
    jest.setTimeout(3000);
    //fake function to satisfy plotly
    //window.URL.createObjectURL = function() {return {}};
  });

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('creates div and section with md content', done => {
    //await delay(500);
    component = StageComponent
        .withResources('elements/markdownaurelia')
        .inView('<markdownaurelia content="# title\n## title 2"></markdownaurelia>');
    delay(300)
        .then( () =>{
          component.create(bootstrap).then(() => {
            const view = component.element;
            const dynhtml = view.getElementsByTagName('dynamic-html');
            expect(dynhtml.length).toBe(1);
            /*const h1 = view.getElementsByTagName('h1');
            expect(h1.length).toBe(1);
            const h2 = view.getElementsByTagName('h2');
            expect(h2.length).toBe(1);*/
            done();
          }).catch(e => {
            fail(e);
            done();
          });
        });
  });
});
