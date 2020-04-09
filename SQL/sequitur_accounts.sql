--
-- File generated with SQLiteStudio v3.2.1 on Wed Apr 8 16:42:57 2020
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Account
CREATE TABLE `Account` (
  `username` varchar(16) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY(`username`)
);

-- Table: Author
CREATE TABLE `Author` (
  `author_id` int(32) NOT NULL,
  `follower_count` int(32) DEFAULT 0,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`author_id`)
);

-- Table: Follows
CREATE TABLE `Follows` (
  `username` varchar(16) NOT NULL,
  `author_id` int(32) NOT NULL,
  PRIMARY KEY(`username`, `author_id`)
);

-- Table: History
CREATE TABLE `History` (
  `timestamp` timestamp DEFAULT CURRENT_TIMESTAMP,
  `paper_id` int(32) NOT NULL,
  `username` varchar(16) NOT NULL,
  PRIMARY KEY (`timestamp`, `username`),
  FOREIGN KEY (`username`) REFERENCES `Account` ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: Recommendation
CREATE TABLE `Recommendation` (
  `paper_id` int(32) NOT NULL,
  `title` varchar(128) NOT NULL,
  `username` varchar(16) NOT NULL,
  PRIMARY KEY (`paper_id`, `username`),
  FOREIGN KEY (`username`) REFERENCES `Account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
