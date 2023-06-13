---
title: "Open vs Restricted"
description: The differences and similarities between open vs. restricted gateways
---

# Open vs. Restricted

Both open and restricted gateways allow for the content being served to be available to anyone with the link.

However, the restricted gateway will **only serve content that is pinned on your account.**

An open gateway will (assuming it can find the content on the IPFS network) **serve up any content even if it's not pinned to your account.** This is great for wide accessibility but can lead to higher usage costs. Restricted gateways mean that you're only charged for delivering your content.

{% hint style="info" %}
To change a gateway from restricted to open, you would need to use the [gateway-access-controls.md](gateway-access-controls.md "mention"), by adding either an Access Token, Host Origin, or IP Address. When you add one of these access controls, the gateway will be able to fetch content outside your account as the restriction requirement is met.
{% endhint %}
