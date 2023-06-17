---
title: Authentication
description: Different ways to authenticate with the Pinata API
---

To connect to the Pinata API, you will need to generate Pinata API Keys. Visit the [Pinata API Keys](https://app.pinata.cloud/keys) page to generate new keys.

When you click "New API Key" you will be prompted to select permissions and the number of uses for the key you generate. Admin privileges, as you might expect, have access to all API endpoints. If you'd like to specify specific endpoints, you can do so by expanding the endpoint's parent route and toggling on the permission.

By default, all keys have unlimited use. However, if you'd like to limit the number of times a key can be used, you can do so by setting the Max Uses field.

By setting a Key Name, you will be able to easily identify the key and its purpose.

Any key can have its access revoked by clicking the Revoke button. Once a key has been revoked, it can no longer be utilized for any purpose.

{% embed url="https://www.youtube.com/watch?t=2s&v=l4vPAeBtdms" %}

## Important

When you generate your keys, you will see a modal with the **Pinata API Key**, **Pinata API Secret**, and the **JWT**.

Your "Pinata API Key" acts as your public key for our REST API, and your "Pinata Secret API Key" acts as the password for your public key. The JWT is an encoded mix of the two. Be sure to keep your secret key private.

For added customer security, these keys are encrypted on Pinata's side and will only ever be displayed once, so **write them down**. If you lose these values you'll need to revoke the key and create a new one.

## Connecting to the Pinata API

The base URL for Pinata requests is: `https://api.pinata.cloud`

You have two ways of connecting to the Pinata API:

* Bearer Authentication
* Custom Headers

To use the bearer authentication model, you will need the JWT that is generated when creating API keys. This token can be used as an `Authorization` header for all your API requests in the following format:

```javascript
"Authorization": "Bearer YOUR_JWT"
```

{% swagger method="get" path="/data/testAuthentication" baseUrl="https://api.pinata.cloud" summary="Test your API keys and your ability to connect to the Pinata API." expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="{message: "Congratulations! You are communicating with the Pinata API!"}" %}
```javascript
{
    message: "Congratulations! You are communicating with the Pinata API!"
}
```
{% endswagger-response %}
{% endswagger %}



### Custom Headers

If not using bearer authentication, your API requests will need to include two headers:

```javascript
pinata_api_key: (put your personal pinata api key here)
pinata_secret_api_key: (put your personal pinata secret api key here)
```

{% swagger method="get" path="/data/testAuthentication" baseUrl="https://api.pinata.cloud" summary="Test your API keys and your ability to connect to the Pinata API." expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="pinata_api_key" required="true" %}
PINATA-API-KEY
{% endswagger-parameter %}

{% swagger-parameter in="header" name="pinata_secret_api_key" required="true" %}
PINATA-SECRET-API-KEY
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    message: "Congratulations! You are communicating with the Pinata API!"
}
```
{% endswagger-response %}
{% endswagger %}



**Going forward, all examples will use the JWT Bearer Authentication format for simplicity.**

### Testing Authentication

Let's try connecting to the Pinata API via the `data/testAuthentication` endpoint (This endpoint requires an admin key to call).

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location --request GET 'https://api.pinata.cloud/data/testAuthentication' \
--header 'Authorization: Bearer PINATA_JWT'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.pinata.cloud/data/testAuthentication',
  headers: {
    'Authorization': 'Bearer PINATA_JWT'
  }
};

const res = await axios(config)

console.log(res.data);
```
{% endtab %}

{% tab title="Python" %}
```python
import requests
url = "https://api.pinata.cloud/data/testAuthentication"
payload={} headers = { 'Authorization': 'Bearer PINATA_JWT' }
response = requests.request("GET", url, headers=headers, data=payload)
print(response.text)
```
{% endtab %}

{% tab title="Go" %}
```go
package main
import ( "fmt" "net/http" "io/ioutil" )
func main() {
url := "https://api.pinata.cloud/data/testAuthentication" method := "GET"
client := &http.Client { } req, err := http.NewRequest(method, url, nil)
if err != nil { fmt.Println(err) return } req.Header.Add("Authorization", "Bearer PINATA_JWT")
res, err := client.Do(req) if err != nil { fmt.Println(err) return } defer res.Body.Close()
body, err := ioutil.ReadAll(res.Body) if err != nil { fmt.Println(err) return } fmt.Println(string(body)) }GoJavaScript with Axios example:
```
{% endtab %}
{% endtabs %}

### We want your feedback!

Have a suggestion? Have a complaint? Confused about something in the documentation? Just want to say hi?

We want to make Pinata the best product available. That involves listening to our users and addressing their needs.

Send us an email at [team@pinata.cloud](mailto:team@pinata.cloud) and we'll see how we can help.
