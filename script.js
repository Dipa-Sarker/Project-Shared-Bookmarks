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

const user1Bookmarks = [
  {
  id: 1,
  title: "CodeYourFuture",
  description: "Learning programming",
  url: "https://codeyourfuture.io",
  createdAt: "2026-10-03T10:00:00Z",
  likes: 0
}
];

setData("1", user1Bookmarks);
