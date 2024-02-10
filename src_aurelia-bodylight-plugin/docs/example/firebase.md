# firebase - messaging via firebase service
api-key must secured. Obtain it from firebase console. Firebase realtime database is provided.
```
<bdl-fb-config 
  api-key="somekey" 
  auth-domain="somedomain" 
  database-u-r-l="someurl" 
  project-id="someid"           
  messaging-sender-id="somemsid" 
  app-id="someaid"      
  measurement-id="somemid"></bdl-fb-config>

<bdl-fb-set-state title="1.Simulace" value="screen/k1uvod.md"></bdl-fb-set-state>
```

api-str attribute must be string in JSON form 
```
{
    "apiKey": "somekey",
    "authDomain": "somedomain",
    "databaseURL": "someurl",
    "projectId": "someid",
    "storageBucket": "somebucket",
    "messagingSenderId": "somesid",
    "appId": "someaid",
    "measurementId": "somemid"
}
``` 

encrypted by editor/bin/eps.js using valid `key`


```
<bdl-fb-config 
  api-str="6bxxxx"></bdl-fb-config>

<bdl-fb-set-state title="2.Quiz" value="screen/k1quiz.md"></bdl-fb-set-state>
```

<bdl-fb-config api-str="6bxxxx"></bdl-fb-config>
 
<bdl-fb-set-state title="1.Simulace" value="screen/k1uvod.md"></bdl-fb-set-state>

<bdl-fb-set-state title="2.Quiz" value="screen/k1quiz.md"></bdl-fb-set-state>
