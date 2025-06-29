-- Migration number: 0001 	 2025-06-29T06:35:54.931Z
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER
);

INSERT INTO products(name, price) VALUES ('produk 1', 5000), ('produk 2', 6000);
