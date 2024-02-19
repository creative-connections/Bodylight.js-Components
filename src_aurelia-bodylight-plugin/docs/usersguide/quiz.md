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
          type="choice2"
          answers="answer 1 (separated by pipe) | answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true">
          title="Custom check answer title"
</bdl-quiz>
```
<bdl-quiz question="Question:" 
          type="choice2"
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

## Quiz control
multiple quiz can be controlled by adding 'id' to bdl-quiz and adding list of 'ids' to quiz-control element:
<div class="w3-row">
<div class="w3-half">

```html
<bdl-quiz id="q1" question="1. Match terms and definition:"
	  type="match"
	  terms="A unstressed volume | B stressed volume | C volume"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
<bdl-quiz id="q2" question="2. Match terms and definition2:"
	  type="match"
	  terms="unstressed volume2 | stressed volume2 | volume2"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
<bdl-quiz id="q3" question="3. Question :" 
          answers="A answer 1 (separated by pipe) | B answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true">
</bdl-quiz>
<bdl-quiz id="q4" question="4. Question:" 
          type="choice2"
          answers="A answer 1 (separated by pipe) | B answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true"
          button="Custom check answer title">
</bdl-quiz>

<bdl-quiz-control ids="q1,q2,q3,q4"></bdl-quiz-control>
```
</div>
<div class="w3-half">

<bdl-quiz id="q1" question="1. Match terms and definition:"
	  type="match"
	  terms="A unstressed volume | B stressed volume | C volume"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
<bdl-quiz id="q2" question="2. Match terms and definition2:"
	  type="match"
	  terms="unstressed volume2 | stressed volume2 | volume2"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quiz>
<bdl-quiz id="q3" question="3. Question :" 
          answers="A answer 1 (separated by pipe) | B answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true">
</bdl-quiz>
<bdl-quiz id="q4" question="4. Question:" 
          type="choice2"
          answers="A answer 1 (separated by pipe) | B answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true"
          button="Custom check answer title">
</bdl-quiz>
<bdl-quiz-summary id="qs">
  Some summary text
</bdl-quiz-summary>

<bdl-quiz-control ids="q1,q2,q3,q4,qs"></bdl-quiz-control>
</div>
</div>

## quizx control
multiple quiz can be controlled by adding 'id' to bdl-quizx and adding list of 'ids' to quiz-control element:
`bdl-quizx` do not show check answers on every page
<div class="w3-row">
<div class="w3-half">

```html
<bdl-quizx id="q5" question="1. Match terms and definition:"
	  type="match"
	  terms="A unstressed volume | B stressed volume | C volume"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quizx>
<bdl-quizx id="q6" question="2. Match terms and definition2:"
	  type="match"
	  terms="unstressed volume2 | stressed volume2 | volume2"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quizx>
<bdl-quizx id="q7" question="3. Question :" 
          answers="A answer 1 (separated by pipe) | B answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true">
</bdl-quizx>
<bdl-quizx id="q8" question="4. Question:" 
          type="choice2"
          answers="A answer 1 (separated by pipe) | B answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true"
          button="Custom check answer title">
</bdl-quizx>
<bdl-quiz-summary id="qs2">
  Some summary text
</bdl-quiz-summary>

<bdl-quiz-control ids="q5,q6,q7,q8,qs2"></bdl-quiz-control>
```
</div>
<div class="w3-half">

<bdl-quizx id="q5" question="1. Match terms and definition:"
	  type="match"
	  terms="A unstressed volume | B stressed volume | C volume"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quizx>
<bdl-quizx id="q6" question="2. Match terms and definition2:"
	  type="match"
	  terms="unstressed volume2 | stressed volume2 | volume2"
	  answers="volume that does not generate pressure | gen.pressure | sum of unstressed and stressed volume and all blood in circulation system, with long description and markup <i>l</i> <b>bold</b>">
</bdl-quizx>
<bdl-quizx id="q7" question="3. Question :" 
          answers="A answer 1 (separated by pipe) | B answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true">
</bdl-quizx>
<bdl-quizx id="q8" question="4. Question:" 
          type="choice2"
          answers="A answer 1 (separated by pipe) | B answer 2"
          correctoptions="false|true"
          explanations="explanation why answer 1 is false (separated by pipe)|explanation why answer 2 is true"
          button="Custom check answer title">
</bdl-quizx>
<bdl-quiz-summary id="qs2">
  Summary:
</bdl-quiz-summary>

<bdl-quiz-control ids="q5,q6,q7,q8,qs2"></bdl-quiz-control>
</div>