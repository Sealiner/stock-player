create database db_stock_user;
use db_stock_user;
CREATE TABLE t_user(
id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(16) NOT NULL,
password VARCHAR(40) NOT NULL,
age INT DEFAULT NULL,
create_date TIMESTAMP NULL DEFAULT now()
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE UNIQUE INDEX t_quiz_IDX_0 on t_user(username);

CREATE TABLE t_block(
id INT PRIMARY KEY AUTO_INCREMENT,
blockname VARCHAR(16) NOT NULL,
stocks VARCHAR(20000) DEFAULT '',
username VARCHAR(16) DEFAULT NULL,
CONSTRAINT block_user_1 FOREIGN KEY (username) REFERENCES t_user(username)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;