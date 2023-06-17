---
title: Query Files
description: /data/pinList
---

This endpoint returns data on what content the sender has pinned to IPFS through Pinata.

The purpose of this endpoint is to provide insight into what is being pinned, and how long it has been pinned.

The results of this call can be filtered using multiple query parameters that will be discussed below.

## Querying Files

{% swagger method="get" path="/data/pinList?includeCount=false" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-parameter in="query" name="hashContains" %}
CID of file you are searching for
{% endswagger-parameter %}

{% swagger-parameter in="query" name="pinStart" %}
ISO_8601 format date to filter by start date for when file was pinned
{% endswagger-parameter %}

{% swagger-parameter in="query" name="pinEnd" %}
ISO_8601 format date to filter by end date for when file was pinned
{% endswagger-parameter %}

{% swagger-parameter in="query" name="unpinStart" %}
ISO_8601 format date to filter by start date for when file was unpinned
{% endswagger-parameter %}

{% swagger-parameter in="query" name="unpinEnd" %}
ISO_8601 format date to filter by end date for when file was unpinned
{% endswagger-parameter %}

{% swagger-parameter in="query" name="pinSizeMin" %}
Minimum size in bytes of files to return
{% endswagger-parameter %}

{% swagger-parameter in="query" name="pinSizeMax" %}
Maximum size in bytes of files to return
{% endswagger-parameter %}

{% swagger-parameter in="query" name="status" %}
Options are "all", "pinned", or "unpinned"
{% endswagger-parameter %}

{% swagger-parameter in="query" name="pageLimit" %}
Maximum number of files to return. Default is 10, max is 1000
{% endswagger-parameter %}

{% swagger-parameter in="query" name="pageOffset" %}
Use to paginate through files, default is 0
{% endswagger-parameter %}

{% swagger-parameter in="query" name="metadata" %}
See metadata querying section below
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    count: (this is the total number of pin records that exist for the query filters you passed in),
    rows: [
        {
            id: (the id of your pin instance record),
            ipfs_pin_hash: (the IPFS multi-hash for the content you pinned),
            size: (this is how large (in bytes) the content pinned is),
            user_id: (this is your user id for Pinata),
            date_pinned: (This is the timestamp for when this content was pinned - represented in ISO 8601 format),
            date_unpinned: (This is the timestamp for when this content was unpinned (if null, then you still have the content pinned on Pinata),
            metadata: {
                name: (this will be the name of the file originally upuloaded, or the custom name you set),
                keyvalues: {
                    exampleCustomKey: "exampleCustomValue",
                    exampleCustomKey2: "exampleCustomValue2",
                    ...
                }
            },
            regions: [
                {
                    regionId: (region this content is expected to be pinned in),
                    desiredReplicationCount: (the number of replications desired in this region for this content),
                    currentReplicationCount: (the number of times this content has been replicated so far)
                }
            ]
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

You'll notice that the `includeCount` query string is shown above. This is the fastest way to use this endpoint, but you'll need to manually paginate through your files without knowing the total number of files available.&#x20;

### Metadata Querying

You also have the option to query your content on the associated metadata that may have been included with the content when it was uploaded through either the [PinFileToIPFS](broken-reference) or [PinJSONToIPFS](broken-reference) endpoints.

These queries look very similar to the default parameters but are slightly more complex.

Here are few simple examples, with added explanation afterward.

**To query on the name you provided for your pin, your query would take this form:**

`?metadata[name]=exampleName`

(this will match on names that contain the string of characters provided as a value. For added specificity, please include the full name you're trying to find).

**To query on the metadata key-value attributes:**

`?metadata[keyvalues]={"exampleKey":{"value":"exampleValue","op":"exampleOp"}}`

Or:

`?metadata[keyvalues][exampleKey]={"value":"exampleValue","op":"exampleOp"}`

**To query on both the metadata name and multiple key-value attributes:**

`?metadata[name]=exampleName&metadata[keyvalues]={"exampleKey":{"value":"exampleValue","op":"exampleOp"},"exampleKey2":{"value":"exampleValue2","op":"exampleOp2"}}`

**Explaining the "value" and "op" key / values**

As seen above, each query on custom values takes the form of an object with a "value" key and an "op" key.

The "value" is fairly straightforward. This is simply the value that you wish your query operation to be applied to. These values can be:

* Strings
* Numbers (integers or decimals)
* Dates (Provided in ISO\_8601 format)

The "op" is what query operation will be applied to the value you provided. The following opcodes are available to query with:

* "gt" - (greater than)
* "gte" - (greater than or equal)
* "lt" - (less than)
* "lte" - (less than or equal)
* "ne" - (not equal to)
* "eq" - (equal to)
* "between" - (When querying with the 'between' operation, you need to supply a 'secondValue' to be consumed by the query operation)

For Example:

`?metadata[keyvalues]={"exampleKey":{"value":"2018-01-01 00:00:00.000+00","secondValue":"2018-02-01 00:00:00.000+00","op":"between"}}`

* "notBetween" - (When querying with the 'notBetween' operation, you need to supply a 'secondValue' to be consumed by the query operation)

For Example:

`?metadata[keyvalues]={"exampleKey":{"value":4.00,"secondValue":5.50,"op":"notBetween"}}`

* "like" - (you can use this to find values that are similar to what you've passed in)

For example, this query would find all entries that begin with "testValue". A `%` before your value means anything can come before it, and a `%` sign after means any characters can come after it. So `%testValue%` would contain all entries containing the characters "testValue".

`?metadata[keyvalues]={"exampleKey":{"value":"testValue%","op":"like"}}`

* "notLike" - (you can use this to find values that do not contain the character string you've passed in)
* "iLike" - (The case insensitive version of the "like" opcode)
* "notILike" - (The case insensitive version of the "notLike" opcode)
* "regexp" - (Regular expression matching)
* "iRegexp" - (Case insensitive regular expression matching)

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request GET 'https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100' \
--header 'Authorization: Bearer PINATA JWT'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100',
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

url = "https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100"

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

  url := "https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100"
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
