// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData } from "./storage.js";

/*window.onload = function () {
  const users = getUserIds();
}; */

import { setData } from "./storage.js";

/*const user1Bookmarks = [
  {
    id: crypto.randomUUID(),
    title: "CodeYourFuture",
    description: "Learning programming",
    url: "https://codeyourfuture.io",
    createdAt: "2026-10-03T10:00:00Z",
    likes: 0,
  },
];

setData("1", user1Bookmarks);
*/
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
    bookmarksContainer.innerHTML += `

  <article>
  <h3><a href="${bookmark.url}">${bookmark.title}</a></h3>
  <p>${bookmark.description}</p>
  <p>Likes: ${bookmark.likes}</p>
  <p>Created at: ${bookmark.createdAt}</p>
</article>`;
  });
});
