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
	  answers="volume that does not generate pressure | volume that generates pressure | sum of unstressed and stressed volume"
	  explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true"
	  title="Custom check answer title">
</bdl-quiz>
```

<bdl-quiz question="Match terms and definition:"
	  type="match"
	  terms="unstressed volume | stressed volume | volume"
	  answers="volume that does not generate pressure | volume that generates pressure | sum of unstressed and stressed volume"
	  explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true"
	  title="Custom check answer title">
</bdl-quiz>
