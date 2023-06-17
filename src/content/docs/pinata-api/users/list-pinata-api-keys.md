---
title: List Pinata API Keys
description: /users/apiKeys
---

This endpoint is used to programmatically list all active Pinata API keys. This endpoint can only be called by using an "Admin" key.&#x20;

This endpoint will return a paginated list of 10 API keys at a time. You can use an offset query parameter to page through keys.&#x20;

## Listing API Keys

{% swagger method="get" path="/users/apiKeys" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}


Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-parameter in="query" name="offset" %}
number of keys to start the offset at (i.e. 10)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    "keys": [
        {
            "id": "string",
            "name": "string",
            "key": "string",
            "secret": "string",
            "max_uses": number,
            "uses": number,
            "user_id": "string",
            "scopes": {
                "admin": true
            },
            "revoked": false,
            "createdAt": "2022-06-01T16:25:08.473Z",
            "updatedAt": "2022-06-01T16:25:08.473Z"
        }
    ],
    "count": 1
}
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request GET 'https://api.pinata.cloud/users/apiKeys' \
--header 'Authorization: Bearer PINATA JWT'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/users/apiKeys',
  headers: {
    'Authorization': 'Bearer PINATA JWT'
  }
};

const res = await axios(config);

console.log(res.data);
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

url = "https://api.pinata.cloud/users/apiKeys"

payload={}
headers = {
  'Authorization': 'Bearer PINATA JWT'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)

```
{% endtab %}

{% tab title="Go" %}
```go
package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://api.pinata.cloud/users/apiKeys"
  method := "GET"

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, nil)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Authorization", "Bearer PINATA JWT")

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
