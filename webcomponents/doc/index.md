
# Introduction

Bodylight Web Components are custom elements following *Web Components standard*[^1] with special functionality to allow
build interactive web application and document with models exported from Modelica language using Bodylight FMU Compiler.

Bodylight Web Components are all prefixed with `bdl-` to prevent ambuiguity.

## Integration

Bodylight web components can be integrated directly into `HTML` source code. 
Add 
```html
<p>Set the heart rate</p>
<bdl-cardiaccycle></bdl-cardiaccycle>
```

Bodylight web components can be integrated into Markdown or WIKI. E.g.
```markdown
# some heading
heart rate can be set here <bdl-range></bdl-range>
```

Bodylight web components can be integrated into HTML based systems Moodle (TBD) and Adobe Captivate.
```moodle


``` 

[^1]: Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[^2]: Dygraph: https://dygraphs.com
