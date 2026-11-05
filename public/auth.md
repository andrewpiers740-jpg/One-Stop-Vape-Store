# Auth.md

## Site: One Stop Vape Store — Ecommerce Vape Store

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://onestopvapestore.com/shop/ |
| Blog | https://onestopvapestore.com/blog/ |
| FAQ | https://onestopvapestore.com/faq/ |
| Wholesale | https://onestopvapestore.com/wholesale/ |

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
