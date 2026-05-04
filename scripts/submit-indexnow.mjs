import { readFile } from "node:fs/promises";

const host = "mainline.sh";
const key = process.env.INDEXNOW_KEY ?? "5a2a1571c364416eb5f3e5add3653998";
const keyLocation =
  process.env.INDEXNOW_KEY_LOCATION ?? `https://${host}/${key}.txt`;
const endpoint = process.env.INDEXNOW_ENDPOINT ?? "https://api.indexnow.org/IndexNow";
const sitemapPath = new URL("../public/sitemap.xml", import.meta.url);
const dryRun = process.argv.includes("--dry-run");

const sitemap = await readFile(sitemapPath, "utf8");
const urlsFromSitemap = [...sitemap.matchAll(/<loc>(https:\/\/mainline\.sh[^<]*)<\/loc>/g)].map(
  (match) => match[1],
);
const aiReadableUrls = [
  "https://mainline.sh/llms.txt",
  "https://mainline.sh/llms-full.txt",
  "https://mainline.sh/api/knowledge",
];
const urlList = [...new Set([...urlsFromSitemap, ...aiReadableUrls])];

const payload = {
  host,
  key,
  keyLocation,
  urlList,
};

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

const text = await response.text();

if (!response.ok) {
  console.error(`IndexNow submission failed: ${response.status}`);
  if (text) {
    console.error(text);
  }
  process.exit(1);
}

console.log(`IndexNow submitted ${urlList.length} URLs for ${host}.`);
console.log(`Status: ${response.status}`);
