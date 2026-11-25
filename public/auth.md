# Auth.md

## Site: One Stop Vape Store — Ecommerce Vape Store

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://www.onestopvapestore.com/shop/ |
| Blog | https://www.onestopvapestore.com/blog/ |
| FAQ | https://www.onestopvapestore.com/where-can-i-buy-disposable-vapes/ |
| Wholesale | https://www.onestopvapestore.com/bulk-vapes-for-sale/ |

## Authentication
```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

## Ordering
Human-in-the-loop required. Agents may browse and prepare order drafts.
Orders are completed by a human via WhatsApp or the order form.
