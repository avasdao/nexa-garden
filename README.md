# Nexa Garden

### https://nexa.garden

A public repository for Nexa-related data assets.

A [Radicle](https://radicle.xyz/) repository for FOSS projects.

---

## IPFS

Our IPFS gateway is accessible at the URL `https://nexa.garden/ipfs`, and you can use it just by creating URLs with `nexa.garden` as the host.

We strongly recommend storing gateway-agnostic `ipfs://` URIs in your on-chain FT/NFT/SFT records, so there should be no need to change anything at that layer to adopt the NEXA.garden gateway. In web applications and libraries that fetch and display NFTs, you can rewrite an `ipfs://` URI into a "path style" gateway link by replacing `ipfs://` with `https://nexa.garden/ipfs/`.

The gateway supports both "path style" and "subdomain style" URLs, although you must make sure that your HTTP client follows redirects when using "path style" URLs. For example, when using `curl`, make sure to add the `-L` flag to follow the `Location` header redirect:

```sh
curl -L https://nexa.garden/ipfs/bafybeid4gwmvbza257a7rx52bheeplwlaogshu4rgse3eaudfkfm7tx2my/hi-gateway.txt
```

The gateway always redirects path-style URLs into subdomain-style URLs, so that web content served through the gateway can be isolated with the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy). In some cases, this may result in the CID being re-encoded to a format that's compatible with subdomain addressing. In particular, "version 0" CIDs beginning with `Qm` will be encoded to CID version 1 (`bafy...`) in the base32 string encoding. Although the encodings are different, the CIDs are still equivalent for the purposes of content identification and verification, and you can convert back into CIDv0 without losing any information.

You can avoid the redirect from path to subdomain URL by creating a subdomain style URL directly, but you'll need to make sure that you're only using CIDv1, as CIDv0's case-sensitive encoding is incompatible with subdomain URLs. The NEXA.garden APIs always return CIDv1, but if you have other sources of IPFS CIDs you can [convert CIDv0 to v1](https://docs.ipfs.io/concepts/content-addressing/#cid-conversion) yourself before constructing the gateway URL.

## Rate limits

IPFS gateways are a public, shared resource, and they are often in high demand. To provide equitable access to all users, the NEXA.garden gateway imposes request limits on high-volume traffic sources.

The NEXA.garden gateway is currently rate limited to 200 requests per minute for a given IP address. In the event of a rate limit, the IP will be blocked for a minute.
