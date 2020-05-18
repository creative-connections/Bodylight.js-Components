
# Úvod

Web komponenty Bodylight<sup>TM</sup> - jsou implementované jako tzv. "custom element" podle *Web Components standard*[^1].
Tyto custom elementy definují speciální funkcionalitu pro tvorbu interaktivních webových aplikací za pomoci syntaxe velice podobné HTML.
Dokumenty v HTML tak lze obohatit o interaktivní grafiku a modely exportované z jazyka Modelica pomocí Bodylight FMU Compileru do Javascriptu.

Všechny custom-elementy jsou s prefixem `bdl-`.

## Propojení

`HTML`:
```html
<p>Set the heart rate</p>
<bdl-range></bdl-range>
```

Markdown, WIKI.
```markdown
# some heading
heart rate can be set here 
<bdl-range></bdl-range>
```

Moodle.
```moodle


``` 

[^1]: Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[^2]: Dygraph: https://dygraphs.com
