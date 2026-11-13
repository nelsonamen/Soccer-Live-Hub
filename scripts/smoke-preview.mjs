import { readFileSync, existsSync } from "node:fs";

const bundlePath = "dist/soccer-live-hub.bundle.js";
if (!existsSync(bundlePath)) {
  console.error(`Preview smoke test failed: ${bundlePath} does not exist.`);
  process.exit(1);
}

const bundle = readFileSync(bundlePath, "utf8");
if (!bundle.includes("soccer-live-hub")) {
  console.error("Preview smoke test failed: bundle does not contain soccer-live-hub element.");
  process.exit(1);
}

console.log("Preview smoke test passed.");
