# Quiz
```html
<bdl-quiz question="Question :" 
          answers="answer 1 (separated by pipe) | answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true">
</bdl-quiz>
```
Creates a quiz component, 
  * question - any text
  * answers - multiple options separated by pipe '|' character
  * correctoptions - set of `true`,`false` in the same order of answers separated by pipe '|' character
  * explanations - set of multiple explanation separated by pipe '|', explanation is shown when a <button>Submit</button> is clicked by user.
  * button - custom title on the button
   
<bdl-quiz question="Question :" 
          answers="answer 1 (separated by pipe) | answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true">
</bdl-quiz>

```html
<bdl-quiz question="Question:" 
          answers="answer 1 (separated by pipe) | answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true">
          title="Custom check answer title"
</bdl-quiz>
```
<bdl-quiz question="Question:" 
          answers="answer 1 (separated by pipe) | answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true"
          button="Custom check answer title">
</bdl-quiz>

```html
<bdl-quiz question="Match terms and definition:"
	  type="match"
	  terms="unstressed volume | stressed volume | volume"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
```

<bdl-quiz question="Match terms and definition:"
	  type="match"
	  terms="unstressed volume | stressed volume | volume"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>

```html
<bdl-quiz-control ids="q1,q2"><bdl-quiz-control>
<bdl-quiz question="Match terms and definition:"
	  type="match"
	  terms="unstressed volume | stressed volume | volume"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
<bdl-quiz question="Match terms and definition2:"
	  type="match"
	  terms="unstressed volume2 | stressed volume2 | volume2"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
</bdl-quiz-control>  
```
<bdl-quiz id="q1" question="Match terms and definition:"
	  type="match"
	  terms="unstressed volume | stressed volume | volume"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
<bdl-quiz id="q2" question="Match terms and definition2:"
	  type="match"
	  terms="unstressed volume2 | stressed volume2 | volume2"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
<bdl-quiz-control ids="q1,q2"></bdl-quiz-control>