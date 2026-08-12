// /js/v2/core/dictionary.js

import { emit, listen } from "../utils/events.js";

// -------------------------------------------------
// IN-MEMORY CACHE
// -------------------------------------------------

const cache = new Map();

// -------------------------------------------------
// CONFIG: WHERE DEFINITIONS COME FROM
// -------------------------------------------------

// Option A: Supabase REST endpoint
// const DICT_URL = "https://your-project.supabase.co/rest/v1/dictionary?select=*";

// Option B: Local JSON file
const DICT_URL = "/data/dictionary.json";

// -------------------------------------------------
// FETCH ALL TERMS (optional preloading)
// -------------------------------------------------

export async function loadDictionary() {
  try {
    const res = await fetch(DICT_URL);
    const data = await res.json();

    data.forEach((entry) => {
      cache.set(entry.term.toLowerCase(), entry);
    });

    emit("dictionary:loaded", { count: cache.size });
    return data;
  } catch (err) {
    console.error("Dictionary load failed:", err);
    emit("dictionary:error", { error: err });
    return [];
  }
}

// -------------------------------------------------
// LOOKUP A SINGLE TERM
// -------------------------------------------------

export async function lookupTerm(term) {
  const key = term.toLowerCase();

  // 1. Cache hit
  if (cache.has(key)) {
    return cache.get(key);
  }

  // 2. Fetch on demand (Supabase or JSON)
  try {
    const res = await fetch(DICT_URL);
    const data = await res.json();

    // Store all entries in cache
    data.forEach((entry) => {
      cache.set(entry.term.toLowerCase(), entry);
    });

    return cache.get(key) || null;
  } catch (err) {
    console.error("Dictionary lookup failed:", err);
    return null;
  }
}

// -------------------------------------------------
// EVENT LISTENER: term:open → dictionary:lookup
// -------------------------------------------------

listen("term:open", async ({ term }) => {
  const entry = await lookupTerm(term);

  emit("dictionary:result", {
    term,
    entry,
  });
});
