import assert from "node:assert";
import test from "node:test";

import { sortBookmarksByDate } from "./helpers.js";

test("Bookmarks are sorted newest first", () => {
  const bookmarks = [
    {
      title: "Old",
      createdAt: "2026-10-01T10:00:00Z",
    },
    {
      title: "New",
      createdAt: "2026-10-05T10:00:00Z",
    },
  ];

  const sorted = sortBookmarksByDate(bookmarks);

  assert.equal(sorted[0].title, "New");
  assert.equal(sorted[1].title, "Old");
});
