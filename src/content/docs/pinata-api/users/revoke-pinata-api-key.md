---
title: Revoke Pinata API Key
description: /users/revokeApiKey
---

This endpoint is used to programmatically revoke Pinata API keys. This endpoint can only be called by using an "Admin" key.

## Revoking an API Key

Revoking a Pinata API Key requires the public API Key, not the secret or the JWT.&#x20;

{% swagger method="put" path="/users/revokeApiKey" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}


Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-parameter in="body" name="apiKey" required="true" %}
Public API key to revoke
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
"Revoked"
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```javascript
curl --location --request PUT 'https://api.pinata.cloud/users/revokeApiKey' \
--header 'Authorization: Bearer PINATA JWT' \
--header 'Content-Type: application/json' \
--data-raw '{
    "apiKey": "API KEY TO REVOKE"
}'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');
var data = JSON.stringify({
  "apiKey": "API KEY TO REVOKE"
});

var config = {
  method: 'put',
  url: 'https://api.pinata.cloud/users/revokeApiKey',
  headers: {
    'Authorization': 'Bearer PINATA JWT',
    'Content-Type': 'application/json'
  },
  data : data
};

const res = await axios(config);

console.log(res.data);

```
{% endtab %}

{% tab title="Python" %}
```python
import requests
import json

url = "https://api.pinata.cloud/users/revokeApiKey"

payload = json.dumps({
  "apiKey": "API KEY TO REVOKE"
})
headers = {
  'Authorization': 'Bearer PINATA JWT',
  'Content-Type': 'application/json'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text)

```
{% endtab %}

{% tab title="Go" %}
```go
package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://api.pinata.cloud/users/revokeApiKey"
  method := "PUT"

  payload := strings.NewReader(`{
    "apiKey": "API KEY TO REVOKE"
}`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Authorization", "Bearer PINATA JWT")
  req.Header.Add("Content-Type", "application/json")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}
```
{% endtab %}
{% endtabs %}
