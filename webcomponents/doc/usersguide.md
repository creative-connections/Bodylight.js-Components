## User's guide 

These webcomponents are available:

* `<bdl-range></bdl-range>` Renders a range input which may trigger a value
* `<bdl-value></bdl-value>` Renders value of attribute `value` into DOM, it can be bind as output from FMI.
* `<bdl-bind2previous></bdl-bind2previous>` Binds values of 2 components 
* `<bdl-fmi></bdl-fmi>` Creates control buttons in order to control simulation of the model
* `<bdl-receptacle></bdl-receptacle>` Renders a receptacle graphics which is full or empty based on the values provided
* `<bdl-dygraph></bdl-dygraph>` Creates a graph controlled by Dygraph library [^2]
* `<bdl-chartjs></bdl-chartjs>` Creates a chartjs element controlled by Chartjs library.


### Adding web component into Markdown web page
Markdown component `<bdl-markdown></bdl-markdown>` can be used to create interactive web content with web components.

HTML `index.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bodylight web component</title>
     <script type="module" src="bodylight.bundle.js"></script>
     <script type="module" src="modelfmi.js"></script>
  </head>
<body aurelia-app="webcomponents">
  <bdl-markdown src="index.md"></bdl-markdown>
</body>
</html>
```

any HTML and custom elements are interpretted:

MARKDOWN `index.md`:
```markdown
# This chapter describes usage of web components
select value from range: <bdl-range id="id1" min="40" max="180" step="1" default="60"></bdl-range>
```

### Webcomponent details
Each of the following section contains detail description and attributes with example.
The examples are rendered in markdown component directly - otherwise normal MD do not render them.



  


```
 
