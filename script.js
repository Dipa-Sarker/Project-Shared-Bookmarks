// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

/*window.onload = function () {
  const users = getUserIds();
}; */

import { setData, getData } from "./storage.js";
import { sortBookmarksByDate } from "./helpers.js";

//DOM elements
const select = document.getElementById("user-select");
const bookmarksContainer = document.getElementById("bookmarks-container");

//Saving Bookmarks
const user1Bookmarks = [
  {
    id: 1,
    title: "CodeYourFuture",
    description: "Learning programming",
    url: "https://codeyourfuture.io",
    createdAt: "2026-10-03T10:00:00Z",
    likes: 0,
  },
  {
    id: 2,
    title: "MDN",
    description: "Web development documentation",
    url: "https://developer.mozilla.org",
    createdAt: "2026-10-04T09:00:00Z",
    likes: 0,
  },
];

setData("1", user1Bookmarks);

const user2Bookmarks = [
  {
    id: 1,
    title: "BBC News",
    description: "Latest news and updates",
    url: "https://www.bbc.com",
    createdAt: "2026-10-03T11:00:00Z",
    likes: 0,
  },
];

setData("2", user2Bookmarks);

const user3Bookmarks = [
  {
    id: 1,
    title: "YouTube",
    description: "Video sharing platform",
    url: "https://www.youtube.com",
    createdAt: "2026-10-03T13:00:00Z",
    likes: 0,
  },
];

setData("3", user3Bookmarks);

const user4Bookmarks = [
  {
    id: 1,
    title: "GitHub",
    description: "Code hosting platform",
    url: "https://github.com",
    createdAt: "2026-10-03T14:00:00Z",
    likes: 0,
  },
];

setData("4", user4Bookmarks);

const user5Bookmarks = [
  {
    id: 1,
    title: "Stack Overflow",
    description: "Questions and answers for programmers",
    url: "https://stackoverflow.com",
    createdAt: "2026-10-03T14:00:00Z",
    likes: 0,
  },
];

setData("5", user5Bookmarks);

//Retrieving bookmarks
select.addEventListener("change", () => {
  const userId = select.value;

  const bookmarks = getData(userId);

  console.log(bookmarks);

  bookmarksContainer.innerHTML = "";

  //display message for no bookmarks
  if (!bookmarks || bookmarks.length === 0) {
    bookmarksContainer.textContent = "This user has no bookmarks.";
    return;
  }

  //Sort newest first
  const sortedBookmarks = sortBookmarksByDate(bookmarks);

  //display title(URL), description, timestamp of bookmarks
  sortedBookmarks.forEach((bookmark) => {
    const bookmarkDiv = document.createElement("div");

    const heading = document.createElement("h3");
    const title = document.createElement("a");
    title.textContent = bookmark.title;
    title.href = bookmark.url;
    heading.append(title);

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const createdAt = document.createElement("small");
    createdAt.textContent = `Created: ${bookmark.createdAt}`;

    bookmarkDiv.append(heading, description, createdAt);

    bookmarksContainer.appendChild(bookmarkDiv);

    setData("1", user1Bookmarks);
  });
});

const userSelect = document.querySelector("#user-select");
const form = document.querySelector("#addbookmark");
const bookmarkSection = document.getElementById("bookmark-section");
userSelect.addEventListener("change", () => {
  bookmarkSection.hidden = false;
});
// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const userId = userSelect.value;
  const bookmarks = getData(userId) || [];
  const message = document.getElementById("message");
  const bookmarksContainer = document.getElementById("bookmarks");
  const newBookmark = {
    id: crypto.randomUUID(),
    title: formData.get("title"),
    description: formData.get("description"),
    url: formData.get("url"),
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  bookmarks.push(newBookmark);
  setData(userId, bookmarks);
  message.textContent = "Bookmark successfully added!";
  bookmarksContainer.innerHTML = "";
  bookmarks.forEach((bookmark) => {
    const article = document.createElement("article");

    const heading = document.createElement("h3");
    const link = document.createElement("a");

    link.href = bookmark.url;
    link.textContent = bookmark.title;

    heading.append(link);

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    article.append(heading);
    article.append(description);

    bookmarksContainer.append(article);
  });
});
