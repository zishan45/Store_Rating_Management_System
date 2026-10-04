CREATE DATABASE store_rating_db;

USE store_rating_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400) NOT NULL,
    role ENUM('admin', 'user', 'owner') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

Describe users;

CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(400) NOT NULL,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_store_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating TINYINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_rating
        CHECK (rating BETWEEN 1 AND 5),

    CONSTRAINT fk_rating_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_rating_store
        FOREIGN KEY (store_id)
        REFERENCES stores(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT unique_user_store_rating
        UNIQUE (user_id, store_id)
);

show tables;

INSERT INTO users
(name, email, password, address, role)
VALUES
(
    'System Administrator Account',
    'admin@example.com',
    'TEMP_PASSWORD',
    'Bhopal, Madhya Pradesh',
    'admin'
);

INSERT INTO users
(name, email, password, address, role)
VALUES
(
    'Rahul Kumar Sharma',
    'user@example.com',
    'TEMP_PASSWORD',
    'Bhopal, Madhya Pradesh',
    'user'
);

INSERT INTO users
(name, email, password, address, role)
VALUES
(
    'Amit Kumar Store Owner',
    'owner@example.com',
    'TEMP_PASSWORD',
    'Bhopal, Madhya Pradesh',
    'owner'
);

INSERT INTO stores
(name, email, address, owner_id)
VALUES
(
    'Smart Campus Restaurant',
    'restaurant@example.com',
    'Main Campus Road, Bhopal, Madhya Pradesh',
    3
);

INSERT INTO stores
(name, email, address, owner_id)
VALUES
(
    'Campus Technology Store',
    'techstore@example.com',
    'University Market, Bhopal, Madhya Pradesh',
    3
);

INSERT INTO ratings
(user_id, store_id, rating)
VALUES
(2, 1, 5),
(2, 2, 4);

select * from users;
select * from stores;
select * from ratings;

SELECT
    store_id,
    AVG(rating) AS average_rating
FROM ratings
GROUP BY store_id;

SELECT
    stores.id,
    stores.name AS store_name,
    stores.address,
    users.name AS owner_name,
    users.email AS owner_email
FROM stores
JOIN users
    ON stores.owner_id = users.id;
    
SELECT USER(), CURRENT_USER();
USE store_rating_db;
SHOW TABLES;

SHOW VARIABLES LIKE 'port';

USE store_rating_db;

INSERT INTO users
(name, email, password, address, role)
VALUES
(
    'System Administrator Account',
    'newadmin@example.com',
    'PASTE_BCRYPT_HASH_HERE',
    'Bhopal, Madhya Pradesh',
    'admin'
);

INSERT INTO users
(name, email, password, address, role)
VALUES
(
    'Amit Chicken Store Owner',
    'newowner@example.com',
    'PASTE_THE_HASH_HERE',
    'MP Nagar, Bhopal, Madhya Pradesh',
    'owner'
);

UPDATE users
SET password = 'OWNER_HASH'
WHERE email = 'newowner@example.com';

DELETE FROM users
WHERE email IN (
    'admin@example.com',
    'owner@example.com'
);

UPDATE users
SET password = 'PASTE_OWNER_HASH_HERE'
WHERE email = 'newowner@example.com';

UPDATE users
SET password = 'PASTE_ADMIN_HASH_HERE'
WHERE email = 'newadmin@example.com';

SELECT id, name, email, role
FROM users
WHERE role = 'owner';

INSERT INTO stores
(name, email, address, owner_id)
VALUES
(
    'Bhopal Fresh Mart',
    'freshmart.bhopal@example.com',
    'MP Nagar Zone 1, Bhopal, Madhya Pradesh',
    10
),
(
    'City Choice Supermarket',
    'citychoice.bhopal@example.com',
    'Arera Colony, Bhopal, Madhya Pradesh',
    10
),
(
    'Green Valley Grocery',
    'greenvalley.bhopal@example.com',
    'Kolar Road, Bhopal, Madhya Pradesh',
    10
),
(
    'Central Shopping Store',
    'centralstore.bhopal@example.com',
    'New Market, Bhopal, Madhya Pradesh',
    10
),
(
    'Smart Daily Needs',
    'smartdaily.bhopal@example.com',
    'Indrapuri, Bhopal, Madhya Pradesh',
    10
);

INSERT INTO ratings
(user_id, store_id, rating)
VALUES
(2, 3, 4),
(2, 4, 3),
(2, 5, 5),
(2, 6, 4);

select * from users;
select * from ratings;
select * from stores;