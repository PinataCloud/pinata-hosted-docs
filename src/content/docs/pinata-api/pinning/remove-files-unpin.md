---
title: Remove (Unpin) Files
description: /pinning/unpin
---

The process of removing files from IPFS is called unpinning. When you unpin something from an IPFS storage node, it is marked for garbage collection. When garbage collection runs, the content is permanently deleted from the storage node.&#x20;

[Read more about unpinning here](https://knowledge.pinata.cloud/en/articles/5506024-what-does-unpinning-a-file-mean).&#x20;

## Unpinning a File

{% swagger method="delete" path="/pinning/unpin/:CID" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-response status="200: OK" description="" %}
```javascript
"Ok"
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request DELETE 'https://api.pinata.cloud/pinning/unpin/CID' \
--header 'Authorization: Bearer PINATA JWT'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');

var config = {
  method: 'delete',
  url: 'https://api.pinata.cloud/pinning/unpin/CID',
  headers: {
    'Authorization': 'Bearer PINATA JWT'
  }
};

const res = await axios(config);

console.log(res.data);va
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

url = "https://api.pinata.cloud/pinning/unpin/CID"

payload={}
headers = {
  'Authorization': 'Bearer PINATA JWT'
}

response = requests.request("DELETE", url, headers=headers, data=payload)

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

  url := "https://api.pinata.cloud/pinning/unpin/CID"
  method := "DELETE"

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
