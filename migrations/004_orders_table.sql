-- Up
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT,
  shipping TEXT,
  products TEXT,
  details TEXT,
	payment TEXT
)

-- Down
DROP TABLE orders
