CREATE TABLE recipients (id TEXT PRIMARY KEY, token_hash TEXT UNIQUE NOT NULL, display_name TEXT NOT NULL DEFAULT '');
CREATE TABLE progress (recipient_id TEXT NOT NULL REFERENCES recipients(id), day INTEGER NOT NULL CHECK(day BETWEEN 1 AND 24), opened_at TEXT NOT NULL, PRIMARY KEY(recipient_id, day));
