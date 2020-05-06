## Vývojářský průvodce

Pro vývoj nové web komponenty:
1. vytvořte definici v `src/components`,  
  * buď definice bude jen HTML, nebo HTML a JS soubor.
2. register component as webcomponent in `src/webcomponents.js` adding a row
```javascript
export function configure(aurelia) {
aurelia.use
...
//use this routine to register HTML only component as web component
.globalResources(PLATFORM.moduleName('components/mycomponent.html'))
//use this routine to register component (JS and HTML) as web component
.globalResources(PLATFORM.moduleName('components/mycomponent'))
...
```
3. build the bodylight.bundle.js using `au build`
4. add documentation section about new component into User's guide

