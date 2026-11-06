import fs from "fs";
import path from "path";
import { SITE } from "../src/config/site.js";

/**
 * Pre-ship Crosscheck Script
 * Validates domain, rules, and mandatory components.
 */

console.log("--- STARTING PRE-SHIP CROSSCHECK ---");

let failures = 0;

function check(name, condition, message) {
  if (condition) {
    console.log(`[PASS] ${name}`);
  } else {
    console.error(`[FAIL] ${name}: ${message}`);
    failures++;
  }
}

// 1. Single Source of Truth
check("Domain Configuration", SITE.domain === "www.onestopvapestore.com", "SITE.domain must match the intended target.");

// 2. Mandatory Agent Files
const agentFiles = [
  "public/robots.txt",
  "public/llms.txt",
  "public/auth.md",
  "public/.well-known/api-catalog",
  "public/.well-known/agent-skills/index.json",
  "public/.well-known/mcp/server-card.json",
  "vercel.json"
];

agentFiles.forEach(f => {
  check(`Agent File: ${f}`, fs.existsSync(path.join(process.cwd(), f)), `File ${f} is missing from the build.`);
});

// 3. Compliance & Age Gate
const rootLayout = fs.readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf-8");
check("AgeGate Inclusion", rootLayout.includes("<AgeGateModal"), "AgeGateModal must be in the root layout.");
check("WebMCP Bridge", rootLayout.includes("webmcp.js"), "WebMCP script must be in the root layout.");

// 4. Banned Terms
const srcFiles = ["app/page.tsx", "src/config/site.js"]; // Add more as needed
srcFiles.forEach(f => {
  let content = fs.readFileSync(path.join(process.cwd(), f), "utf-8");
  // If it is the site config, strip the actual array definition to avoid false positives
  if (f === "src/config/site.js") {
    content = content.replace(/bannedTerms: \[.*?\]/s, "");
  }
  SITE.compliance.bannedTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, "i");
    check(`Banned Term [${term}] in ${f}`, !regex.test(content), `Banned term "${term}" found in ${f}.`);
  });
});

// 5. No Web3Forms
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8"));
check("No Web3Forms Dependency", !pkg.dependencies?.["web3forms"], "Web3Forms is retired and must not be used.");

console.log(`--- CROSSCHECK FINISHED: ${failures} FAILURES ---`);

if (failures > 0) {
  process.exit(1);
}
