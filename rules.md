# Coding Rules

Hard rules for any code written in this project, across all three services
(Java, Go, React/JS). These apply in addition to the conventions in `CLAUDE.md`.

## Naming

- **Never use one-letter variable names.** Every variable, parameter, and field
  name must be meaningful on its own, without needing to read surrounding code
  to know what it holds.
  - Bad: `for (Book b : books)`, `int i`, `String s`, `(a, b) => a.price - b.price`
  - Good: `for (Book book : books)`, `int quantity`, `String cardNumber`,
    `(bookA, bookB) => bookA.price - bookB.price`
- This applies to loop variables too — prefer `for (Book book : books)` over
  `for (Book b : books)`. If a collection is plural, the loop variable is
  usually just the singular of that name (`books` → `book`).
- The only exception is a conventional mathematical index that is genuinely
  just a position, most commonly `i`/`j` in a classic nested `for` loop
  (`for (int i = 0; i < count; i++)`) — even then, prefer a descriptive name
  (`index`, `row`, `column`) whenever the variable is used for more than
  counting iterations.
