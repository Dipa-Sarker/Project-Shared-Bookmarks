//helper function for sorting in reverse chronological order
  export function sortBookmarksByDate(bookmarks) {
  return [...bookmarks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

