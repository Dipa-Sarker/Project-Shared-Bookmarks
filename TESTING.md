# Testing

## The website contains a drop-down which lists five users

Tested manually by opening the website and verifying that the dropdown contains:

- Jack
- Mary
- Oliver
- Noah
- Emma

## Selecting a user displays the relevant bookmarks

Tested manually by selecting each user from the dropdown and verifying that the correct bookmarks were displayed.

## If there are no bookmarks for the selected user, a message is displayed

Tested manually by selecting a user with no bookmarks and verifying that the "This user has no bookmarks." message appeared.

## The list of bookmarks is shown in reverse chronological order

Unit tests in `example.test.js`.
Also verified manually by checking that newer bookmarks appear before older bookmarks.

## Each bookmark displays a title, description and timestamp

Tested manually by checking the displayed bookmark information.

## Each bookmark title is a hyperlink to the bookmark URL

Tested manually by clicking bookmark titles and verifying that the correct webpages opened.

## Copy to clipboard button copies the bookmark URL

Tested manually by clicking the copy button and pasting the clipboard contents into a text editor.

## Like counter works independently and persists across sessions

Tested manually by:

1. Clicking the like button for a bookmark.
2. Refreshing the page.
3. Verifying the like count remained.
4. Verifying that liking one bookmark did not affect another bookmark.

## The website contains a form with URL, title and description inputs

Tested manually by checking the form fields are present.

## Submitting the form adds a new bookmark for the selected user

Tested manually by creating a bookmark and verifying it appeared in the selected user's bookmark list.

## After creating a bookmark, the updated list is displayed

Tested manually by submitting the form and verifying that the new bookmark appeared immediately.

## Bookmark data persists across browser sessions

Tested manually by:

1. Creating a bookmark.
2. Refreshing the page.
3. Closing and reopening the browser.
4. Verifying the bookmark still existed.

## Accessibility

Tested using Lighthouse (Desktop mode).
Accessibility score: 100%.

## Unit tests

Run using:

```bash
npm test
```

All tests pass successfully.

Unit tests are located in:

- `example.test.js`
