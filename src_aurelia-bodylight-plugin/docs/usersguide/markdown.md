# Markdown syntax components

## BdlMarkdownnav
`<bdl-markdownnav src=""></bdl-markdownnav>"` renders navigation menu based on MD list. MD should contain only list.
All links should


## BdlMarkdown
`<bdl-markdown src="[filename.md]" watchhash="true|false"></bdl-markdown>` renders markdown - which may contain all the above webcomponents.
* `watchhash` if specified, then parameter in URL after hash is scanned and taken loaded instead `src`. The changes in hash are listened and document is replaced on change.
* `fromid` optional, if specified the DOM element with id `fromid` is listened to customevent `concentupdate` and event.detail.content is then parsed and output is updated.
* as aurelia component, the eventaggregator is subscribed to `ContentUpdate` - if any such message is received, then the content is rendered and output updated.

Abbreviations support
*[cytochrom]: Cytochrome protein | More detailed info about cytochromeprotein | https://en.wikipedia.org/Cytochrome

Now the abbreviation cytochrom is higlighted, hover over will show title, click on it show detail info and link to further info.
<abbr data>

BdlMarkdown-it is used to render markdown with following plugins enabled: 
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
  Pythagoran theorem is $a^2 + b^2 = c^2$ and 
$$
c = \sqrt{a^2+b^2}
$$  
  
```
is rendered as:

  Pythagoran theorem is $a^2 + b^2 = c^2$ and 
$$
c = \sqrt{a^2+b^2}
$$



* markdown-it-footnote: 
```markdown
some text and reference [^1] some other text ^[inline footnote]

[^1]: footnote content
```

* customized markdown-it-btoc: add numbering and toc 1. 2. 3. 
```markdown
# header 
# second header
# third header
```

* markdown-it-btoc with custom number: if custom number will appear in header then all headers will be numbered
```markdown
# 4. header 
## subheader
# headerx
# headery
```
will render to `4. header ... 4.1 subheader ... 5. headerx ... 6. headery`

## abbr

```
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
```

is rendered as:

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.

## markdown nav
`<bdl-markdownnav>` renders navigation

## markdown book, markdown-book2, markdown app
`<bdl-markdown-book>` renders vertical navigation sidebar on the left,
  * `index` - index MD to be shown as content
  * `summary` - navigation MD - navigation sidebar is rendered per list in it

`<bdl-markdown-book2>` renders vertical navigation sidebar on the left,
  * `index` - index MD to be shown as content
  * `summary` - navigation MD - navigation sidebar is rendered per list in it

`<bdl-markdown-app>` renders horizontal navigation menu on top
  * `index` - index MD to be shown as content
  * `summary` - navigation MD - navigation sidebar is rendered per list in it

# demo markdown and markdown input
```
<bdl-markdown-input id="id7"></bdl-markdown-input>
<bdl-markdown fromid="id7"></bdl-markdown>
```

<bdl-markdown-input id="id7"></bdl-markdown-input>
<bdl-markdown fromid="id7"></bdl-markdown>

# demo markdown-au and input
<bdl-markdown-input id="id8"></bdl-markdown-input>
<bdl-markdown-au fromid="id8"></bdl-markdown>

# demo markdown and input bind via shared attribute
<form>
  <input value.two-way="textareavalue" />
</form>

<bdl-markdown content.two-way="textareavalue"></bdl-markdown>
