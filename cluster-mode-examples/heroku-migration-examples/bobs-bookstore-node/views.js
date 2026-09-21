'use strict';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const STYLES = `
  :root {
    color-scheme: light;
    --paper: #f5f0e6;
    --card: #fffdf8;
    --ink: #29231d;
    --muted: #74675a;
    --accent: #8b3d31;
    --line: #ded2c1;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    color: var(--ink);
    background: var(--paper);
    font: 16px/1.5 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  main { width: min(760px, calc(100% - 32px)); margin: 0 auto; padding: 48px 0 96px; }
  header { margin-bottom: 28px; }
  h1, h2 { font-family: Georgia, serif; }
  h1 { margin: 0; font-size: clamp(2rem, 7vw, 3.25rem); line-height: 1.05; }
  header p, .byline, .empty { color: var(--muted); }
  .search, .new-book { display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0; }
  input {
    min-width: 0;
    flex: 1 1 180px;
    padding: 11px 12px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: white;
    font: inherit;
  }
  button, .button {
    display: inline-block;
    padding: 10px 14px;
    border: 1px solid var(--accent);
    border-radius: 8px;
    background: var(--accent);
    color: white;
    font: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  .button.secondary, button.secondary {
    background: transparent;
    color: var(--accent);
  }
  ul { display: grid; gap: 12px; padding: 0; list-style: none; }
  li, section {
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--card);
  }
  .book-row { display: flex; align-items: center; gap: 12px; }
  .book-details { flex: 1; min-width: 0; }
  .book-details h2 { margin: 0; font-size: 1.15rem; overflow-wrap: anywhere; }
  .actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .actions form { margin: 0; }
  .flash { padding: 10px 12px; border-left: 4px solid var(--accent); background: white; }
  @media (max-width: 560px) {
    .book-row { align-items: flex-start; flex-direction: column; }
  }
`;

function layout(title, content) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <style>${STYLES}</style>
  </head>
  <body>
    <main>${content}</main>
  </body>
</html>`;
}

function indexPage(books, searchTerm = '', flash = '') {
  const list = books.length
    ? `<ul>${books.map((book) => `
        <li>
          <div class="book-row">
            <div class="book-details">
              <h2>${escapeHtml(book.title)}</h2>
              <div class="byline">by ${escapeHtml(book.author)}</div>
            </div>
            <div class="actions">
              <a class="button secondary" href="/books/${book.id}/edit">Edit</a>
              <form method="post" action="/books/${book.id}/delete">
                <button class="secondary" type="submit">Remove</button>
              </form>
            </div>
          </div>
        </li>`).join('')}</ul>`
    : '<p class="empty">No books found.</p>';

  return layout("Bob's Used Books", `
    <header>
      <h1>Bob's Used Books</h1>
      <p>A small Node.js and PostgreSQL migration sample.</p>
    </header>
    ${flash ? `<p class="flash" role="status">${escapeHtml(flash)}</p>` : ''}
    <form class="search" method="get" action="/">
      <input name="q" value="${escapeHtml(searchTerm)}" maxlength="200" placeholder="Search by title or author" aria-label="Search books">
      <button type="submit">Search</button>
    </form>
    ${list}
    <section>
      <h2>Add a book</h2>
      <form class="new-book" method="post" action="/books">
        <input name="title" maxlength="200" required placeholder="Title" aria-label="Book title">
        <input name="author" maxlength="200" required placeholder="Author" aria-label="Book author">
        <button type="submit">Add book</button>
      </form>
    </section>
  `);
}

function editPage(book) {
  return layout(`Edit ${book.title}`, `
    <header>
      <h1>Edit book</h1>
      <p><a href="/">Return to the bookstore</a></p>
    </header>
    <section>
      <form class="new-book" method="post" action="/books/${book.id}">
        <input name="title" maxlength="200" required value="${escapeHtml(book.title)}" aria-label="Book title">
        <input name="author" maxlength="200" required value="${escapeHtml(book.author)}" aria-label="Book author">
        <button type="submit">Save changes</button>
      </form>
    </section>
  `);
}

module.exports = {
  editPage,
  escapeHtml,
  indexPage,
};

