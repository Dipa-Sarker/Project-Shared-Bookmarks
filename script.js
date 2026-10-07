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
const form = document.querySelector("#addbookmark");
const bookmarkSection = document.getElementById("bookmark-section");
const addBookmarkButton = document.getElementById("add-bookmark-button");

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
    id: crypto.randomUUID(),
    title: "MDN",
    description: "Web development documentation",
    url: "https://developer.mozilla.org",
    createdAt: "2026-10-04T09:00:00Z",
    likes: 0,
  },
];

if (!getData("1")) {
  setData("1", user1Bookmarks);
}

const user2Bookmarks = [
  {
    id: crypto.randomUUID(),
    title: "BBC News",
    description: "Latest news and updates",
    url: "https://www.bbc.com",
    createdAt: "2026-10-03T11:00:00Z",
    likes: 0,
  },
];

if (!getData("2")) {
  setData("2", user2Bookmarks);
}

const user3Bookmarks = [
  {
    id: crypto.randomUUID(),
    title: "YouTube",
    description: "Video sharing platform",
    url: "https://www.youtube.com",
    createdAt: "2026-10-03T13:00:00Z",
    likes: 0,
  },
];
if (!getData("3")) {
  setData("3", user3Bookmarks);
}

const user4Bookmarks = [
  {
    id: crypto.randomUUID(),
    title: "GitHub",
    description: "Code hosting platform",
    url: "https://github.com",
    createdAt: "2026-10-03T14:00:00Z",
    likes: 0,
  },
];
if (!getData("4")) {
  setData("4", user4Bookmarks);
}

const user5Bookmarks = [
  {
    id: crypto.randomUUID(),
    title: "Stack Overflow",
    description: "Questions and answers for programmers",
    url: "https://stackoverflow.com",
    createdAt: "2026-10-03T14:00:00Z",
    likes: 0,
  },
];
if (!getData("5")) {
  setData("5", user5Bookmarks);
}
//function to like bookmark created
function likeBookmark(userId, bookmarkId) {
  const bookmarks = getData(userId);
  const bookmarkIndex = bookmarks.findIndex(
    (bookmark) => bookmark.id === bookmarkId,
  );

  bookmarks[bookmarkIndex].likes++;
  setData(userId, bookmarks);
}
//function to display bookmark so it is reusable and DRY is obeyed.
function displayBookmarks(userId) {
  const bookmarks = getData(userId);

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
    const titleContainer = document.createElement("div");
    const heading = document.createElement("h2");
    const title = document.createElement("a");
    title.textContent = bookmark.title;
    title.href = bookmark.url;
    heading.append(title);
    //creating the copybutton
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy URL";
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(bookmark.url);
    });
    //a titlecontainer so that the title and copy buttton are kept together
    titleContainer.append(heading, copyButton);
    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const createdAt = document.createElement("small");
    const date = new Date(bookmark.createdAt);
    //Timestamp converted to easy to read format for accessiblity
    createdAt.textContent = `Created: ${date.toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    })}`;
    //creating the like button
    const likeButton = document.createElement("button");
    likeButton.textContent = `❤️ ${bookmark.likes} Likes`;
    //likebutton evenlistener that ensure the correct bookmark is liked
    likeButton.addEventListener("click", () => {
      likeBookmark(userId, bookmark.id);
      displayBookmarks(userId);
    });
    bookmarkDiv.append(titleContainer, description, createdAt);
    bookmarksContainer.appendChild(bookmarkDiv);
    bookmarkDiv.append(likeButton);
  });
}

//Retrieving bookmarks
select.addEventListener("change", () => {
  addBookmarkButton.hidden = false;
  const userId = select.value;
  displayBookmarks(userId);
});
addBookmarkButton.addEventListener("click", () => {
  bookmarkSection.hidden = false;
});
// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const userId = select.value;
  const bookmarks = getData(userId) || [];
  const message = document.getElementById("message");
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
  displayBookmarks(userId);
});
