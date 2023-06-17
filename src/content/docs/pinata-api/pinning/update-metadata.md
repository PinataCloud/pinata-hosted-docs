---
title: Update Pinata Metadata
description: /pinning/hashMetadata
---

This endpoint allows the sender to change the name and custom key-values associated with a piece of content stored on Pinata.

Changes made via this endpoint only affect the [metadata](./#pinata-metadata) for the hash passed in.

## Updating Metadata For CID

{% swagger method="put" path="/pinning/hashMetadata" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-parameter in="body" name="ipfsPinHash" required="true" %}
CID for file where you want to update metadata
{% endswagger-parameter %}

{% swagger-parameter in="body" name="name" %}
Name for the file
{% endswagger-parameter %}

{% swagger-parameter in="body" name="keyvalues" type="" %}
Stringified object of key value pairs
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
"OK"
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request PUT 'https://api.pinata.cloud/pinning/hashMetadata' \
--header 'Authorization: Bearer PINATA JWT' \
--header 'Content-Type: application/json' \
--data-raw '{
    "ipfsPinHash": "CID",
    "name": "Name",
    "keyvalues": {
       "anewkeyk": "anewvalue"
    }
}'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');
var data = JSON.stringify({
  "ipfsPinHash": "CID",
  "name": "Name",
  "keyvalues": {
    "anewkeyk": "anewvalue"
  }
});

var config = {
  method: 'put',
  url: 'https://api.pinata.cloud/pinning/hashMetadata',
  headers: {
    'Authorization': 'Bearer PINATA JWT',
    'Content-Type': 'application/json'
  },
  data: data
};

const res = await axios(config);

console.log(res.data);
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
import json

url = "https://api.pinata.cloud/pinning/hashMetadata"

payload = json.dumps({
  "ipfsPinHash": "CID",
  "name": "Name",
  "keyvalues": {
    "anewkeyk": "anewvalue"
  }
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

  url := "https://api.pinata.cloud/pinning/hashMetadata"
  method := "PUT"

  payload := strings.NewReader(`{
    "ipfsPinHash": "CID",
    "name": "Name",
    "keyvalues": {
       "anewkeyk": "anewvalue"
    }
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
