---
title: Pin File or Directory
description: /pinning/pinFileToIPFS
---

This endpoint will accept a single file or a single directory. The request must include a read stream for the payload in order for the API to accept it.&#x20;

## Uploading and Pinning a Single File

Each upload can optionally include additional information beyond just the file. Both `pinataOptions` and `pinataMetadata` can be included in the request. Their formats [are documented here](./#pinata-options).

{% swagger method="post" path="/pinning/pinFileToIPFS" baseUrl="https://api.pinata.cloud" summary="" expanded="true" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}




Bearer PINATA-JWT
{% endswagger-parameter %}

{% swagger-parameter in="body" name="file" required="true" %}
Read stream representing the file
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pinataOptions" %}
Optional stringified object
{% endswagger-parameter %}

{% swagger-parameter in="body" name="pinataMetadata" %}
Optional stringified object
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    IpfsHash: This is the IPFS multi-hash provided back for your content,
    PinSize: This is how large (in bytes) the content you just pinned is,
    Timestamp: This is the timestamp for your content pinning (represented in ISO 8601 format)
}
```
{% endswagger-response %}
{% endswagger %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request POST 'https://api.pinata.cloud/pinning/pinFileToIPFS' \
--header 'Authorization: Bearer PINATA JWT' \
--form 'file=@"/Users/Desktop/images/cat.JPG"' \
--form 'pinataOptions="{\"cidVersion\": 1}"' \
--form 'pinataMetadata="{\"name\": \"MyFile\", \"keyvalues\": {\"company\": \"Pinata\"}}"'
```
{% endtab %}

{% tab title="Node.js" %}
```javascript
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'Bearer PASTE_YOUR_PINATA_JWT'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "path/to/file.png";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}

```
{% endtab %}

{% tab title="Python" %}
```python
import requests

url = "https://api.pinata.cloud/pinning/pinFileToIPFS"

payload={'pinataOptions': '{"cidVersion": 1}',
'pinataMetadata': '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'}
files=[
  ('file',('cat.JPG',open('/Users/Desktop/images/cat.JPG','rb'),'application/octet-stream'))
]
headers = {
  'Authorization': 'Bearer PINATA JWT'
}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)

```
{% endtab %}

{% tab title="Go" %}
```go
package main

import (
  "fmt"
  "bytes"
  "mime/multipart"
  "os"
  "path/filepath"
  "io"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://api.pinata.cloud/pinning/pinFileToIPFS"
  method := "POST"

  payload := &bytes.Buffer{}
  writer := multipart.NewWriter(payload)
  file, errFile1 := os.Open("/Users/Desktop/images/cat.JPG")
  defer file.Close()
  part1,
         errFile1 := writer.CreateFormFile("file",filepath.Base("/Users/Desktop/images/cat.JPG"))
  _, errFile1 = io.Copy(part1, file)
  if errFile1 != nil {
    fmt.Println(errFile1)
    return
  }
  _ = writer.WriteField("pinataOptions", "{\"cidVersion\": 1}")
  _ = writer.WriteField("pinataMetadata", "{\"name\": \"MyFile\", \"keyvalues\": {\"company\": \"Pinata\"}}")
  err := writer.Close()
  if err != nil {
    fmt.Println(err)
    return
  }


  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Authorization", "Bearer PINATA JWT")

  req.Header.Set("Content-Type", writer.FormDataContentType())
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

## Uploading and Pinning a Directory

This endpoint also allows users to pin an entire directory to IPFS. This works almost identically to pinning a file, with the main difference being that we provide an array of files and need to provide a relative file path for each file in the directory.

However, our servers will use the exact path that's provided for each file, so it's important that each path begins with the "base" directory that is being uploaded. As an example, if your directory is located at "./../myBuilds/desiredBuild" on your local machine, then each file path should start with "desiredBuild".

We have a JavaScript example of uploading a directory below. Note that in the example, we use the `got` library instead of `axios`, but the same general procedure can be applied using `axios` or any other library.&#x20;

```javascript
const fs = require("fs");
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
const got = require('got');
const JWT = 'Bearer PASTE_YOUR_PINATA_JWT'

const pinDirectoryToPinata = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = "RELATIVE PATH TO DIRECTORY TO UPLOAD";
  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }
    const response = await got(url, {
      method: 'POST',
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        "Authorization": JWT
      },
      body: data
    })
    .on('uploadProgress', progress => {
	console.log(progress);
    });
    console.log(JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }
};
```

## Uploading Implementations&#x20;

Depending on your use case there are lots of different ways you can implement the API. Here's a few ways that we have seen are popular!&#x20;

### React

With these React gists we would like to remind users that **using API keys on the client side is not secure.** It's typically a better practice to have your own backend where the keys are stored, but in some cases users see the need to upload through the client side. Feel free to use these components!&#x20;

{% tabs %}
{% tab title="FileUpload" %}
```jsx
import { useState } from "react"
import axios from "axios"
const JWT = `Bearer PASTE_YOUR_JWT`

const FileUpload = () => {

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async() => {

    const formData = new FormData();

    formData.append('file', selectedFile)

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <label class="form-label">Choose File</label>
    <input type="file"  onChange={changeHandler}/>
    <button onClick={handleSubmission}>Submit</button>
    </>
  )
}

export default FileUpload
```
{% endtab %}

{% tab title="FolderUpload" %}
```jsx
import { useState } from "react"
import axios from "axios"
const JWT = `Bearer PASTE_YOUR_JWT`

const FolderUpload = () => {

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleSubmission = async() => {

    const formData = new FormData();

    Array.from(selectedFile).forEach((file) => {
      formData.append("file", file)
    })

    const metadata = JSON.stringify({
      name: 'Folder name',
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: ,
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <label class="form-label">choose Folder</label>
    <input directory="" webkitdirectory="" type="file"  onChange={changeHandler}/>
    <button onClick={handleSubmission}>Submit</button>
    </>
  )
}

export default FolderUpload
```
{% endtab %}
{% endtabs %}

### Upload from Buffer

There are some cases where it's handy to upload from a buffer rather than disk. Here is an example of how you can do that!&#x20;

<pre class="language-javascript"><code class="lang-javascript">const { Readable } = require("stream");
const FormData = require("form-data");
const axios = require("axios");
const JWT = `Bearer PASTE_YOUR_JWT`

<strong>const uploadFromBuffer = async (buffer) => {
</strong>  try {
    const stream = Readable.from(buffer);
    const data = new FormData();
    data.append('file', stream, {
      filepath: 'FILENAME.png'
    })

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxBodyLength: "Infinity",
      headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          Authorization: JWT
      }
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
</code></pre>

This opens a lot of possibilities as to what you can pass into that buffer. For instance, here is how you could upload a string of text to Pinata!

```javascript
const { Readable } = require('stream');
const FormData = require('form-data')
const axios = require('axios');
const JWT = 'Bearer PASTE_YOUR_PINATA_JWT'

const pinStringToIPFS = async (string) => {
  try {
   const buffer = Buffer.from(string, 'utf8')
   const stream = Readable.from(buffer)
   const data = new FormData()
   data.append('file', stream, {
      filepath: "string.txt"
    })
   const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      headers: {
        'Authorization': JWT
      }
    })
   console.log(res.data)
  } catch (error) {
   console.log(error)
  }
}

pinStringToIPFS("Hello World!!")
```

### Upload From URL Stream

This snippet will let you upload from a URL stream to Pinata!

```javascript
const axios = require("axios");
const axiosRetry = require("axios-retry");
const FormData = require("form-data");
const JWT = `Bearer PASTE_YOUR_JWT`

const uploadToPinata = async (sourceUrl) => {

  const axiosInstance = axios.create();

  axiosRetry(axiosInstance, { retries: 5 });
  const data = new FormData();

  const response = await axiosInstance(sourceUrl, {
    method: "GET",
    responseType: "stream",
  });
  data.append(`file`, response.data);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxBodyLength: "Infinity",
      headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          'Authorization': JWT
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error)
  }
};

uploadToPinata("https://example.com/1.png")
```

