#!/usr/bin/env node
// Append one request/reply entry to a lesson log with credentials masked.
import { appendFileSync, readFileSync } from "node:fs";
const [logPath, entryPath] = process.argv.slice(2);
const mask = (s) => String(s)
  .replace(/\b(v1\.[A-Za-z0-9_-]{3})[A-Za-z0-9._-]+([A-Za-z0-9_-]{4})\b/g, "$1…$2")
  .replace(/\b(sk-[A-Za-z0-9_-]{3})[A-Za-z0-9_-]{8,}([A-Za-z0-9]{4})\b/g, "$1…$2");
const entry = JSON.parse(readFileSync(entryPath, "utf8"));
appendFileSync(logPath, `[${new Date().toISOString()}] ${entry.method || "POST"} ${mask(entry.url)}\n${mask(JSON.stringify(entry, null, 1))}\n\n`);
