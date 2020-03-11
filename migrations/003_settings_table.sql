-- Up
CREATE TABLE settings (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	value TEXT
)

-- Down
DROP TABLE settings
