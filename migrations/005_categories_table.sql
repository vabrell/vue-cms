-- Up
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  options TEXT
)

-- Down
DROP TABLE categories
