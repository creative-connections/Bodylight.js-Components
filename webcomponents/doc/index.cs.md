
# Úvod

Web komponenty Bodylight<sup>TM</sup> - jsou implementované jako tzv. "custom element" podle *Web Components standard*[^1].
Tyto custom elementy definují speciální funkcionalitu pro tvorbu interaktivních aplikací
a dokumentů s modely exportovanými z jazyka Modelica pomocí Bodylight FMU Compiler.

Bodylight Web Components are all prefixed with `bdl-` to prevent ambuiguity.

## Propojení

Bodylight web components can be integrated directly into `HTML` source code. E.g.
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
