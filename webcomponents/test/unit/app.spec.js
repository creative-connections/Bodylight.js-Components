import {bootstrap} from 'aurelia-bootstrapper';
import {StageComponent} from 'aurelia-testing';
import {PLATFORM} from 'aurelia-pal';

describe('Stage App Component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('app'))
      .inView('<app></app>');
  });

  afterEach(() => component.dispose());

  it('should render message', done => {
    component.create(bootstrap).then(() => {
      const view = component.element;
      expect(view.textContent.trim()).toBe('Use App for complex components. Use webcomponents to make rich documents with embedded Modelica/FMI model control.');
      done();
    }).catch(e => {
      fail(e);
      done();
    });
  });
});
