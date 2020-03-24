-- Up
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT,
	image TEXT,
  price REAL,
  stock INT,
  categories TEXT
)

-- Down
DROP TABLE products
