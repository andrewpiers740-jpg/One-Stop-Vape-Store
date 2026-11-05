# One Stop Vape Store (SV3 LLC)

High-performance e-commerce platform and product catalog for **One Stop Vape Store** (SV3 LLC, established December 2022). Built with Next.js 15 (App Router), Tailwind CSS v4, Lucide icons, full 21+ adult age verification, PACT Act compliance, interactive Wishlist, Blog, Trustpilot review integrations, and Agent-Ready standards (RFC 9727, MCP server, UCP, ACP, WebMCP).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the store in your browser.

### 3. Build & Verify
```bash
# Run linting
npm run lint

# Run pre-ship crosscheck
npm run crosscheck

# Production build
npm run build
```

---

## 📦 Push to GitHub

To push this repository to your GitHub account:

### Step 1: Create a New GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `onestopvapestore` or `one-stop-vape-store`).
3. Leave it empty (do **not** initialize with README, .gitignore, or license).
4. Click **Create repository**.

### Step 2: Add Remote and Push
In your terminal, run:

```bash
# Add your GitHub repository as remote origin (replace with your repo URL):
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# Push code to main branch:
git push -u origin main
```

*(If using SSH: `git remote add origin git@github.com:<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git`)*

---

## 🌐 Deploy to Vercel

1. Log in to [vercel.com](https://vercel.com) and click **"Add New..." > "Project"**.
2. Select your newly pushed GitHub repository.
3. Keep the default settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
4. Configure Environment Variables (in Vercel Project Settings):
   - `ADMIN_PASSCODE` (passcode for `/admin` hub)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` (for automated order and notification emails)
   - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (for admin order and enquiry persistence)
5. Click **Deploy**.

---

## 🛡️ Features & Compliance
- **2,515+ Products in Catalog**: Categories include Nixodine, Disposable Vapes, Vape Juice, Nicotine Salts, Vape Kits, Vaporizers, Pod Systems, Coils, Tanks, and Nicotine Pouches.
- **PACT Act & 21+ Verification**: Strictly age-gated with modal confirmation, adult signature shipping notices, and compliance disclaimers.
- **Persistent Wishlist**: Client-side localStorage synchronized wishlist (`/wishlist` & `/pages/wishlist`).
- **Educational Hub**: Informative guides on Nixodine, battery safety, and coil maintenance (`/blog`).
- **Agent-Ready Protocol**: Full RFC 9727 API catalog, Model Context Protocol (`/api/mcp`), UCP, ACP, and WebMCP browser bridge.
- **Trustpilot Integration**: 4.9/5 verified reviews section highlighting customer satisfaction since December 2022.
