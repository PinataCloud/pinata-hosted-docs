---
title: List Pin by CID Jobs
description: /pinning/pinJobs
---

When using the `pinByHash` endpoint, you may want to programmatically check on the status of CIDs you'd requested to be pinned to your account. This endpoint allows you to do so.&#x20;

## Listing Pin By CID Jobs

All possible filters are included in the API reference below, but these are the possible "status" filters:

* "status" - Filter by the status of the job in the pinning queue (see potential statuses below)
  * "prechecking" - Pinata is running preliminary validations on your pin request.
  * "searching" - Pinata is actively searching for your content on the IPFS network. This may take some time if your content is isolated.
  * "retrieving" - Pinata has located your content and is now in the process of retrieving it.
  * "expired" - Pinata wasn't able to find your content after a day of searching the IPFS network. Please make sure your content is hosted on the IPFS network before trying to pin again.
  * "over\_free\_limit" - Pinning this object would put you over the free tier limit. Please add a credit card to continue pinning content.
  * "over\_max\_size" - This object is too large of an item to pin. If you're seeing this, please contact us for a more custom solution.
  * "invalid\_object" - The object you're attempting to pin isn't readable by IPFS nodes. Please contact us if you receive this, as we'd like to better understand what you're attempting to pin.
  * "bad\_host\_node" - You provided a host node that was either invalid or unreachable. Please make sure all provided host nodes are online and reachable.

{% swagger method="get" path="/pinning/pinJobs" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-parameter in="query" name="sort" %}
Values include: ASC or DESC
{% endswagger-parameter %}

{% swagger-parameter in="query" name="status" %}
See above for available values
{% endswagger-parameter %}

{% swagger-parameter in="query" name="ipfs_pin_hash" %}
CID of the file to be pinned
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" %}
Number of jobs to return. Default is 5 and 1000 is the maximum
{% endswagger-parameter %}

{% swagger-parameter in="query" name="offset" %}
Provide the record offset for records being returned. This is how you retrieve records on additional pages (default is 0)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    count: (this is the total number of pin job records that exist for the query filters you passed in),
    rows: [
        {
            id: (the id for the pin job record),
            ipfs_pin_hash: (the IPFS multi-hash for the content you pinned),
            date_queued: (The date this hash was initially queued to be pinned - represented in ISO 8601 format),
            status: (The current status for the pin job),
            name: (If you passed in a name for your hash, it will be listed here),
            keyvalues: (If you passed in keyvalues for your hash, they will be listed here),
            host_nodes: (If you provided host nodes for your hash, they will be listed here),
            pin_policy: Once this content has been found, this is the pin policy that will be used for replications
        },
        {
            same record format as above
        }
        .
        .
        .
    ]
}
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request GET 'https://api.pinata.cloud/pinning/pinJobs?status=retrieving&sort=ASC' \
--header 'Authorization: Bearer PINATA JWT'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/pinning/pinJobs?status=retrieving&sort=ASC',
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

url = "https://api.pinata.cloud/pinning/pinJobs?status=retrieving&sort=ASC"

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

  url := "https://api.pinata.cloud/pinning/pinJobs?status=retrieving&sort=ASC"
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
