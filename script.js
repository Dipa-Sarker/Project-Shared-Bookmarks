import { setData, getData } from "./storage.js";
import { sortBookmarksByDate } from "./helpers.js";

//DOM elements
const select = document.getElementById("user-select");
const bookmarksContainer = document.getElementById("bookmarks-container");
const form = document.querySelector("#addbookmark");
const bookmarkSection = document.getElementById("bookmark-section");
const addBookmarkButton = document.getElementById("add-bookmark-button");

//function to like bookmark created
function likeBookmark(userId, bookmarkId) {
  const bookmarks = getData(userId);
  const bookmarkIndex = bookmarks.findIndex(
    (bookmark) => bookmark.id === bookmarkId
  );

  bookmarks[bookmarkIndex].likes++;
  setData(userId, bookmarks);
}

//function to display bookmark so it is reusable and DRY is obeyed
function displayBookmarks(userId) {
  const bookmarks = getData(userId);

  bookmarksContainer.innerHTML = "";
  //display message for no bookmarks
  if (!bookmarks || bookmarks.length === 0) {
    bookmarksContainer.textContent = "This user has no bookmarks.";
    return;
  }
  //sort newest first
  const sortedBookmarks = sortBookmarksByDate(bookmarks);

  sortedBookmarks.forEach((bookmark) => {
    const bookmarkDiv = document.createElement("div");

    //display title(URL), description, timestamp of bookmarks
    //creating elements
    const heading = document.createElement("h2");
    const title = document.createElement("a");
    title.textContent = bookmark.title;
    title.href = bookmark.url;
    heading.append(title);

    //creating the copybutton(URL)
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy to clipboard";
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(bookmark.url);
    });

    //description
    const description = document.createElement("p");
    description.textContent = bookmark.description;

    //created date
    const createdAt = document.createElement("p");
    const date = new Date(bookmark.createdAt);
    createdAt.textContent = `Created: ${date.toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    })}`;

    //create a Like button showing the current number of likes
    const likeButton = document.createElement("button");
    likeButton.textContent = `❤️ ${bookmark.likes} Likes`;

    //increase likes for this bookmark and refresh the displayed bookmarks
    likeButton.addEventListener("click", () => {
      likeBookmark(userId, bookmark.id);
      displayBookmarks(userId);
    });

    // Add everything to bookmark card
    bookmarkDiv.append(heading, copyButton, description, createdAt, likeButton);

    bookmarksContainer.appendChild(bookmarkDiv);
  });
}

//user selection from dropdown
select.addEventListener("change", () => {
  const userId = select.value;
  if (!userId) return;
  addBookmarkButton.hidden = false;
  displayBookmarks(userId);
});

//show form when user click Add New Bookmark
addBookmarkButton.addEventListener("click", () => {
  bookmarkSection.hidden = false;
});

// for adding bookmark
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
  bookmarkSection.hidden = true;
  displayBookmarks(userId);
});

