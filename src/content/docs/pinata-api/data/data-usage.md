---
title: Data Usage
description: /data/userPinnedDataTotal
---

This endpoint returns the total combined size for all content that you've pinned through Pinata.

## Getting Usage Data

{% swagger method="get" path="/data/userPinnedDataTotal" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    "pin_count": "TOTAL FILES PINNED",
    "pin_size_total": "TOTAL SIZE IN BYTES OF ALL FILES"
}
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request GET 'https://api.pinata.cloud/data/userPinnedDataTotal' \
--header 'Authorization: Bearer PINATA JWT'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/data/userPinnedDataTotal',
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

url = "https://api.pinata.cloud/data/userPinnedDataTotal"

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

  url := "https://api.pinata.cloud/data/userPinnedDataTotal"
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
