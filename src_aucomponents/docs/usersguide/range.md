### Range, bdl-range
`<bdl-range>` Renders a range input which may trigger a value. With following attributes:
  * `id` unique id
  * `min`, `max` minimum and maximum range value (default 0,100)
  * `step`, step between the range values (default 1)
  * `default`, default value of the range component (default 50)

Example:
  * `<bdl-range id="id1" min="10" max="20" step="2" default="12"></bdl-range>` will render range from 10 to 20 with default value 12 and step 2.
  *  <bdl-range id="id1" min="10" max="20" step="2" default="12"></bdl-range>  
*  <bdl-range id="id1" min="0" max="1" step="0.01" default="12"></bdl-range>
*  <bdl-range id="id1" min="0" max="1" step="0.001" default="12"></bdl-range>
*  <bdl-range id="id1" min="0" max="10" step="0.1" default="12"></bdl-range>
*  <bdl-range id="id1" min="0" max="10" step="1" default="12"></bdl-range>

### Range 2 range binding value
E.g. setting range 1 will change range 2 and range 3 so the sum is constant:

```xml
tkan1: <bdl-range id="id3" min="0" max="100" step="1" default="20" ids="id4,id5,id6,id7" convertors="20-x/5;20-x/5;20-x/5;20-x/5"></bdl-range>

        tkan2:<bdl-range id="id4" min="0" max="100" step="1" default="20" ids="id3,id5" convertors="100-2-x;2"></bdl-range>

        tkan3:<bdl-range id="id5" min="0" max="100" step="1" default="20" ids="id3,id4" convertors="21;100-21-x"></bdl-range>

        tkan4:<bdl-range id="id6" min="0" max="100" step="1" default="20" ids="id3,id4" convertors="21;100-21-x"></bdl-range>

        tkan5:<bdl-range id="id7" min="0" max="100" step="1" default="20" ids="id3,id4" convertors="21;100-21-x"></bdl-range>

```

tkan1: <bdl-range id="id3" min="0" max="100" step="1" default="20" ids="id4,id5,id6,id7" convertors="20-(x-20)/4;20-(x-20)/4;20-(x-20)/4;20-(x-20)/4"></bdl-range>

tkan2:<bdl-range id="id4" min="0" max="100" step="1" default="20" ids="id3,id5" convertors="100-2-x;2"></bdl-range>

tkan3:<bdl-range id="id5" min="0" max="100" step="1" default="20" ids="id3,id4" convertors="21;100-21-x"></bdl-range>

tkan4:<bdl-range id="id6" min="0" max="100" step="1" default="20" ids="id3,id4" convertors="21;100-21-x"></bdl-range>

tkan5:<bdl-range id="id7" min="0" max="100" step="1" default="20" ids="id3,id4" convertors="21;100-21-x"></bdl-range>

### range 3 smooth

This range will change the value smoothly by steps - it will change the step on each `fmidata` event fired by fmi component, thus every simulation step. `fromid` attribute must be defined in order to attach to the right fmi to listen `fmidata`.
```xml
Smooth range
<bdl-range-smooth2 id="ids1" min="40" max="180" step="1" default="60" title="Heart rate:" fromid="id4"></bdl-range-smooth2>
```

<bdl-range-smooth2 id="ids1" min="40" max="180" step="1" default="60" title="Heart rate:" fromid="id4"></bdl-range-smooth2>
