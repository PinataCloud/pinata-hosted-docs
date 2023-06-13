---
title: "How Do I Use My Gateway?"
description: "Learn how to pass CIDs into a gateway url"
---

# How Do I Use My Gateway?

## Viewing Content Through Your Gateway

To view content through your gateway, grab the CID of the file you'd like to view and add it to your gateway URL like this:

`https://<Your Gateway Subdomain>.mypinata.cloud/ipfs/<Your CID>`

Simple as that!

## Convert other Gateway URLs to use my Gateway

In many cases, projects will directly put an entire gateway URL on-chain (such as when minting NFTs).

If you find yourself reading from a location that may provide a gateway URL, Pinata created the [ipfs-gateway-tools](https://github.com/PinataCloud/ipfs-gateway-tools) toolkit to help you out.

This toolkit can easily convert any standard IPFS gateway URL, as well as URIs with the `ipfs://<CID>` format to a URL that utilizes your gateway.

## Adding a Custom Domain

Pinata also allows you to create a custom domain for your dedicated gateway. Simply click the menu button on the right side of your gateway row in the table on the Gateways page, then click Add Custom Domain. You'll need to own the domain you want to use. When you enter your domain, you will be prompted to enter DNS information through your registrar.
