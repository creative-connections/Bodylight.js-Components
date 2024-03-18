# Quiz

and related components
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
<div class="w3-clear"></div>

## quiz-present

First quiz:
<bdl-quizx id="q3.1" type="choice2" 
           question="3.1 What type of ABR disorder is this - as in pH pCO2 diagram?" 
           answers="A. chronic base deficit|B. acute base deficit|C. chronic hypercapnia|D. acute hypercapnia" 
           correctoptions="true|false|false|false" 
           explanations="ano|ne|ne|ne" 
           buttontitle="zkontrolovat odpověď"></bdl-quizx>
<bdl-quizx id="q3.2" type="choice2" 
           question="3.2 What type of ABR disorder is this - as in pH HCO3- diagram?" 
           answers="A. metabolic acidosis|B. acute respiratory acidosis|C. chronic respiratory acidosis|D. metabolic alkalosis" 
           correctoptions="true|false|false|false" 
           explanations="yes|no|no|no" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.3" type="choice2" 
           question="3.3 What type of ABR disorder is this - as in BE pCO2 nomogram?" 
           answers="A. UMAc - steady metabolická acidosis|B. AMAc - acute metabolic acidosis|C. URAlk - steady respiratory alkalosis|D. AMAlk - acute metabolic alkalosis" 
           correctoptions="true|false|false|false" 
           explanations="ano|ne|ne|ne" 
           buttontitle="zkontrolovat odpověď"></bdl-quizx>                
<bdl-quizx id="q3.4" type="choice2" 
           question="3.4 What could this be a complication of type 1 DM?" 
           answers="A. diabetic ketoacidosis| B. hypochloremic alkalosis in diabetes and vomiting|C. hyperglycemic hyperosmolar coma" 
           correctoptions="true|false|false" 
           explanations="yes|no|no" 
           buttontitle="check answer"></bdl-quizx>           
<bdl-quizx id="q3.5" type="choice2" 
           question="3.5 What is the anion gap?" 
           answers="A. AG = Na<sup>+</sup> – (Cl<sup>-</sup> + HCO3<sup>-</sup>) in the USA and at our institute<br/>AG = (Na<sup>+</sup>+K<sup>+</sup>) – (Cl<sup>-</sup> + HCO3<sup>-</sup>) in Europe|B. AG = (Na<sup>+</sup>) + (2x Cl<sup>-</sup>) + (HCO3<sup>-</sup>) in the USA and at our institute<br/>|C. AG = (Na<sup>+</sup>) + (2x Cl<sup>-</sup>) + (HCO3<sup>-</sup>) + (K<sup>+</sup>) in Europe" 
           correctoptions="true|false|false" 
           explanations="yes|no|no" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.6" type="choice2" 
           question="3.6 The anion gap typically ranges from 10-12 mmol/l, marginally then 16 mmol/l. An increased anion gap may indicate the presence of certain diseases or conditions, such as metabolic acidosis. Calculate the anion gap from memory or on a calculator according to the values and select:" 
           answers="A. AG = 28.9| B. AG = 314.2 | C. AG = 10" 
           correctoptions="true|false" 
           explanations="yes|no" 
           buttontitle="check answer"></bdl-quizx>           
<bdl-quizx id="q3.7" type="choice2" 
           question="3.7 How would ABR parameters and clinical picture change during vomiting?" 
           answers="A. vomiting results in the loss of K<sup>+</sup>, leading to the development of hypokalemia and if the situation is not addressed, the exchange of H<sup>+</sup> for K<sup>+</sup> on the cell membrane (K<sup>+</sup> goes out, H<sup>+</sup> inside, leading to alkalization of the internal environment.|B. Vomiting leads to the complication of existing metabolic acidosis by metabolic alkalosis (loss of H<sup>+</sup>, Cl<sup>-</sup>), suppression of respiratory compensatory mechanisms, deepening dehydration, increasing losses of K<sup>+</sup> and worsening of the condition (combined ABR disorder, K<sup>+</sup> depletion)." 
           correctoptions="false|true" 
           explanations="no|yes" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.8" type="choice2" 
           question="3.8 What findings do you expect in urine?" 
           answers="A. I would expect ketonuria, glycosuria, polyuria, higher amounts of Na<sup>+</sup>, K<sup>+</sup> and phosphates, acidic pH|B. urine pH will be alkaline, there will be ketonuria, low concentration of K<sup>+</sup>, Na<sup>+</sup> and phosphates, there will be severe proteinuria" 
           correctoptions="true|false" 
           explanations="yes|no" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.9" type="choice2" 
           question="3.9 What osmolality of serum do you expect? How can it be calculated?" 
           answers="A. Osmolarity will be decreased due to loss of sodium and potassium, formula (Na<sup>+</sup>) + (Cl<sup>-</sup>) + (K<sup>+</sup>) + urea|B. Osmolarity = (2xNa) + glycemia + urea - osmolarity will be increased" 
           correctoptions="false|true" 
           explanations="no|yes|no" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.10" type="choice2" 
           question="3.10 How would you interpret renal parameters?" 
           answers="A. Elevation of urea and creatinine vs. due to dehydration and practically prerenal failure with the development of renal ischemia. Another reason could also be chronic renal insufficiency developed over the course of the disease due to the patient's non-cooperation in treatment. Currently worsened by concurrently running complication and dehydration.|B. The increase in renal parameters in this patient is exclusively caused by the consumption of an excessive amount of foods rich in proteins. Due to the diabetic condition of the patient, their body incorrectly and too rapidly metabolizes proteins, leading to the overload of the organism with metabolites, such as creatinine and urea. This condition, called 'Protein-induced renal dysfunction in diabetes', is a common complication in diabetic patients who do not adhere to strict dietary restrictions." 
           correctoptions="true|false" 
           explanations="yes|no" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.11" type="choice2" 
           question="3.11 What is the development of potassium levels in ketoacidosis? Over time, at the start of treatment and its continuation in the further course without potassium substitution?" 
           answers="A. Hyperkalemia persists throughout, it adjusts only when glucose drops < 10mmol/L. If treatment is not initiated, the patient with hyperglycemia and hyperkalemia dies from malignant arrhythmia, if potassium is substituted during treatment, hyperkalemia worsens and the patient is at risk of malignant arrhythmia.|B. metabolic acidosis initially causes hyperkalemia, which is corrected by treatment to the right value, if K<sup>+</sup> is not compensated by infusions, the patient is at risk of severe hypokalemia due to potassium losses through urine and depletion of IC reserves." 
           correctoptions="false|true" 
           explanations="no|yes" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.12" type="choice2" 
           question="3.12 What is the cause of diabetic ketoacidosis?" 
           answers="A. absolute lack of insulin and excess of glucagon|B. relative lack of insulin" 
           correctoptions="true|false" 
           explanations="yes|no" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.13" type="choice2" 
           question="3.13 What is the pathogenesis of the development of diabetic ketoacidosis?"
           answers="A. diagram (A)|B. diagram(B)" 
           correctoptions="false|true" 
           explanations="ne|ano" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quizx id="q3.14" type="choice2" 
           question="3.14 Which other conditions lead to increased production of ketone bodies?" 
           answers="A. alcoholism and starvation|B. hypothyroidism, Cushing's syndrome" 
           correctoptions="true|false" 
           explanations="yes|no" 
           buttontitle="check answer"></bdl-quizx>
<bdl-quiz-summary id="qs1">
  Summary of answers:
  <button class="w3-right w3-button w3-theme" onclick="document.getElementById('mySvg').contentDocument.getElementById('patientpoint').style.display='';">Show values</button>
</bdl-quiz-summary>
<bdl-quiz-control ids="q3.1;astrup2,q3.2;astrup,q3.3;astrup3,q3.4,q3.5,q3.6;biochemie,q3.7,q3.8,q3.9,q3.10,q3.11,q3.12,q3.13;patogenesis,q3.14,qs1"></bdl-quiz-control>


To present results stored in Cloud - e.g. firebase realtime database, listens for `fb-process-answer-result` events vie event aggregator.
```
<bdl-quiz-present></bdl-quiz-present>
```
<bdl-quiz-present></bdl-quiz-present>

</div>