---
title: Pin JSON
description: /pinning/pinJSONToIPFS
---

This endpoint allows the sender to add and pin any JSON object they wish to Pinata's IPFS nodes. This endpoint is specifically optimized to only handle JSON content. Once the server receives the JSON, it is converted into a JSON file and pinned to our IPFS storage nodes.&#x20;

## Uploading and Pinning JSON

Each upload can optionally include additional information beyond just the file. Both `pinataOptions` and `pinataMetadata` can be included in the request. Their formats [are documented here](./#pinata-options).

{% swagger method="post" path="/pinning/pinJSONToIPFS" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pinataOptions" required="false" %}
Optional Pinata Options object
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pinataMetadata" %}
Optional Pinata Metadata object
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pinataContent" required="true" %}
The JSON content to pin
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    IpfsHash: This is the IPFS multi-hash (CID) provided back for your content,
    PinSize: This is how large (in bytes) the content you just pinned is,
    Timestamp: This is the timestamp for your content pinning (represented in ISO 8601 format)
}
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request POST 'https://api.pinata.cloud/pinning/pinJSONToIPFS' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer PINATA JWT' \
--data-raw '{
    "pinataOptions": {
        "cidVersion": 1
    },
    "pinataMetadata": {
        "name": "testing",
        "keyvalues": {
            "customKey": "customValue",
            "customKey2": "customValue2"
        }
    },
    "pinataContent": {
        "somekey":"somevalue"
    }
}'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');
var data = JSON.stringify({
  "pinataOptions": {
    "cidVersion": 1
  },
  "pinataMetadata": {
    "name": "testing",
    "keyvalues": {
      "customKey": "customValue",
      "customKey2": "customValue2"
    }
  },
  "pinataContent": {
    "somekey": "somevalue"
  }
});

var config = {
  method: 'post',
  url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer PINATA JWT'
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

url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

payload = json.dumps({
  "pinataOptions": {
    "cidVersion": 1
  },
  "pinataMetadata": {
    "name": "testing",
    "keyvalues": {
      "customKey": "customValue",
      "customKey2": "customValue2"
    }
  },
  "pinataContent": {
    "somekey": "somevalue"
  }
})
headers = {pyth
  'Content-Type': 'application/json',
  'Authorization': 'Bearer PINATA JWT'
}

response = requests.request("POST", url, headers=headers, data=payload)

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

  url := "https://api.pinata.cloud/pinning/pinJSONToIPFS"
  method := "POST"

  payload := strings.NewReader(`{
    "pinataOptions": {
        "cidVersion": 1
    },
    "pinataMetadata": {
        "name": "testing",
        "keyvalues": {
            "customKey": "customValue",
            "customKey2": "customValue2"
        }
    },
    "pinataContent": {
        "somekey":"somevalue"
    }
}`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }

  req.Header.Add("Content-Type", "application/json")
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
