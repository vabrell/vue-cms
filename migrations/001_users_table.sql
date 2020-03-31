-- Up
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  admin INT(1) DEFAULT 0,
  securityQuestion TEXT,
  securityAnswer TEXT,
  address_details TEXT
)

-- Down
DROP TABLE users