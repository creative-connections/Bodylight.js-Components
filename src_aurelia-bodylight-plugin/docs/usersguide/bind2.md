### Bind2previous, bdl-bind2previous
`<bdl-bind2previous fromid="id9" toid="id10" toattribute="hx"></bdl-bind2previous>` Binds values of 2 components. With following attributes:
  * `fromid` unique id of the source element, which events are to be listened
  * `toid` unique id of the target element, the `input` event are handled and value of the target element is set
  * `toattribute` (optional) name of the attribute to be set, if not defined 'value' is set.

Example 1 for webcomponents:
```html
  <bdl-receptacle id="id2" hx="100" hy="100" px="50" py="50" value="50" value.bind="valueid3"></bdl-receptacle>
   <bdl-range id="id3" min="10" max="100" step="2" default="50"></bdl-range> 
   <bdl-bind2previous fromid="id3" toid="id2"></bdl-bind2previous>
 ``` 
Binds value of range, to the receptacle above, sets the attribute 'value'. Works only in webcomponents.

   <bdl-receptacle id="id2" hx="100" hy="100" px="50" py="50" value="50" value.bind="valueid3"></bdl-receptacle>
   <bdl-range id="id3" min="10" max="100" step="2" default="50"></bdl-range> 
   <bdl-bind2previous fromid="id3" toid="id2"></bdl-bind2previous>
