---
title: Generate Pinata API Key
description: /users/generateApiKey
---

This endpoint is used to programmatically generate Pinata API keys. This endpoint can only be called by using an "Admin" key. When generating new keys, specific scopes and limits can be implemented.&#x20;

This endpoint will return three values: The API Key, the API Secret, and a JWT Bearer Token. For more information on these values, [see the authentication section](../introduction-to-the-pinata-api/authentication.md).

**Make sure to record the API Secret and the JWT as they will not be accessible again.**

## Generating an API Key

The request body when generating a Pinata API key will look like this:&#x20;

```
{
    keyName: (A name for your new key for easy reference - Required),
    maxUses: (Number of times the new api keys can be used - Optional),
    permissions: {
      admin: boolean,
      endpoints: {
        data: {
          pinList: boolean,
          userPinnedDataTotal: boolean
        },
        pinning: {
          hashMetadata: boolean,
          hashPinPolicy: boolean,
          pinByHash: boolean,
          pinFileToIPFS: boolean,
          pinJSONToIPFS: boolean,
          pinJobs: boolean,
          unpin: boolean,
          userPinPolicy: boolean
        }
      }
    }
}
```

Notice the `keyName` is required. When setting the permissions, it is necessary to include all properties and sub-properties unless you are creating an admin key. If you are creating an admin key, the `endpoints` property and sub-properties can be omitted. If you are including the `endpoints` property, you cannot include the `admin` property.&#x20;



For example, this would be a simplified body for admin key generation:&#x20;

```
{
    keyName: "My admin key",
    permissions: {
      admin: true
    }
}
```

{% swagger method="post" path="/users/generateApiKey" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-parameter in="body" name="keyName" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="permissions" required="true" %}
Stringified object
{% endswagger-parameter %}

{% swagger-parameter in="body" name="maxUses" type="" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    "pinata_api_key": "KEY",
    "pinata_api_secret": "SECRET",
    "JWT": "JWT"
}
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```javascript
curl --location --request POST 'https://api.pinata.cloud/users/generateApiKey' \
--header 'Authorization: Bearer PINATA JWT' \
--header 'Content-Type: application/json' \
--data-raw '{
    "keyName": "My Key",
    "permissions": {
      "endpoints": {
        "data": {
          "pinList": false,
          "userPinnedDataTotal": false
        },
        "pinning": {
          "hashMetadata": true,
          "hashPinPolicy": false,
          "pinByHash": true,
          "pinFileToIPFS": true,
          "pinJSONToIPFS": true,
          "pinJobs": false,
          "unpin": false,
          "userPinPolicy": false
        }
      }
    }
}'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');
var data = JSON.stringify({
  "keyName": "My Key",
  "permissions": {
    "endpoints": {
      "data": {
        "pinList": false,
        "userPinnedDataTotal": false
      },
      "pinning": {
        "hashMetadata": true,
        "hashPinPolicy": false,
        "pinByHash": true,
        "pinFileToIPFS": true,
        "pinJSONToIPFS": true,
        "pinJobs": false,
        "unpin": false,
        "userPinPolicy": false
      }
    }
  }
});

var config = {
  method: 'post',
  url: 'https://api.pinata.cloud/users/generateApiKey',
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

url = "https://api.pinata.cloud/users/generateApiKey"

payload = json.dumps({
  "keyName": "My Key",
  "permissions": {
    "endpoints": {
      "data": {
        "pinList": False,
        "userPinnedDataTotal": False
      },
      "pinning": {
        "hashMetadata": True,
        "hashPinPolicy": False,
        "pinByHash": True,
        "pinFileToIPFS": True,
        "pinJSONToIPFS": True,
        "pinJobs": False,
        "unpin": False,
        "userPinPolicy": False
      }
    }
  }
})
headers = {
  'Authorization': 'Bearer PINATA JWT',
  'Content-Type': 'application/json'
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

  url := "https://api.pinata.cloud/users/generateApiKey"
  method := "POST"

  payload := strings.NewReader(`{
    "keyName": "My Key",
    "permissions": {
      "endpoints": {
        "data": {
          "pinList": false,
          "userPinnedDataTotal": false
        },
        "pinning": {
          "hashMetadata": true,
          "hashPinPolicy": false,
          "pinByHash": true,
          "pinFileToIPFS": true,
          "pinJSONToIPFS": true,
          "pinJobs": false,
          "unpin": false,
          "userPinPolicy": false
        }
      }
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
