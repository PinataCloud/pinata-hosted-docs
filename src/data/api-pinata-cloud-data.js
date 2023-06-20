export const pinFileToIPFS = {
  base: "https://api.pinata.cloud",
  route: "/pinning/pinFileToIPFS",
  method: "POST",
  headers: {
    keys: "Authorization",
    type: "string",
    value: "Your method of authorization, e.g. Bearer PINATA_API_KEY_JWT",
    required: true
  },
  body: {
    file: {
      keys: "file",
      type: "readable stream",
      value: "File to be uploaded via multipart/form-data.",
      required: true
    },
    pinataOptions: {
      keys: "pinataOptions",
      type: "object",
      value: "Optional object for things like CID version, see pinning.",
      required: false
    },
    pinataMetadata: {
      keys: "pinataMetadata",
      type: "object",
      value: "Optional object for Pinata specific metdata, such as 'name'. See pinning.",
      required: false
    }
  },
}

export const pinJSONToIPFS = {
  base: "https://api.pinata.cloud",
  route: "/pinning/pinJSONToIPFS",
  method: "POST",
  headers: {
    keys: "Authorization",
    type: "string",
    value: "Your method of authorization, e.g. Bearer PINATA_API_KEY_JWT",
    required: true
  },
  body: {
    pinataContent: {
      keys: "pinataContent",
      type: "JSON object",
      value: "The JOSN content to pin",
      required: true
    },
    pinataOptions: {
      keys: "pinataOptions",
      type: "object",
      value: "Optional object for things like CID version, see pinning.",
      required: false
    },
    pinataMetadata: {
      keys: "pinataMetadata",
      type: "object",
      value: "Optional object for Pinata specific metdata, such as 'name'. See pinning.",
      required: false
    }
  }
}

export const pinByHash = {
  base: "https://api.pinata.cloud",
  route: "/pinning/pinByHash",
  method: "POST",
  headers: {
    keys: "Authorization",
    type: "string",
    value: "Your method of authorization, e.g. Bearer PINATA_API_KEY_JWT",
    required: true
  },
  body: {
    hashToPin: {
      keys: "hashToPin",
      type: "string",
      value: "The CID already on IPFS that you want to pin to Pinata",
      required: true
    },
    pinataOptions: {
      keys: "pinataOptions",
      type: "object",
      value: "Optional object for things like CID version, see pinning.",
      required: false
    },
    pinataMetadata: {
      keys: "pinataMetadata",
      type: "object",
      value: "Optional object for Pinata specific metdata, such as 'name'. See pinning.",
      required: false
    }
  }
}

export const unpin = {
  base: "https://api.pinata.cloud",
  route: "/pinning/unpin/{CID}",
  method: "DELETE",
  headers: {
    keys: "Authorization",
    type: "string",
    value: "Your method of authorization, e.g. Bearer PINATA_API_KEY_JWT",
    required: true
  },
}

