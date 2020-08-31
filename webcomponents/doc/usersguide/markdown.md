
### Markdownnav
`<bdl-markdownnav src=""></bdl-markdownnav>"` renders navigation menu based on MD list. MD should contain only list.
All links should

### Markdown
`<bdl-markdown src="[filename.md]" watchhash="true|false"></bdl-markdown>` renders markdown - which may contain all the above webcomponents.
* `watchhash` if specified, then parameter in URL after hash is scanned and taken loaded instead `src`. The changes in hash are listened and document is replaced on change.
* `fromid` optional, if specified the DOM element with id `fromid` is listened to customevent `concentupdate` and event.detail.content is then parsed and output is updated.
* as aurelia component, the eventaggregator is subscribed to `ContentUpdate` - if any such message is received, then the content is rendered and output updated.

Markdown-it is used to render markdown with following plugins enabled: 
* highlight.js to highlight source code specifying language, e.g. Python 
 ```markdown
    ```javascript
     // some javascript code
    ``` 
```

```markdown
    ```python
    //some python code
    ```
```
* markdown-it-katex to render math formula between `$` or multiline `$$` using KaTEX and HTML.

Example:
```markdown
  Pythagoran theorem is $a^2 + b^2 = c^2$.
  
  
```
is rendered as:

Inline pythagoran theorem is $a^2 + b^2 = c^2$.
Pythagoran theorem is 
$$a^2 + b^2 = c^2$$

### markdown nav
`<bdl-markdownnav>` renders navigation

### markdown book, markdown app
`<bdl-markdown-book>` renders vertical navigation sidebar on the left,
  * `index` - index MD to be shown as content
  * `summary` - navigation MD - navigation sidebar is rendered per list in it

`<bdl-markdown-app>` renders horizontal navigation menu on top
  * `index` - index MD to be shown as content
  * `summary` - navigation MD - navigation sidebar is rendered per list in it
