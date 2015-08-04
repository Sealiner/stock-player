create database db_stock_user;
use db_stock_user;
CREATE TABLE t_user(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(16) NOT NULL,
password VARCHAR(16) NOT NULL,
create_date TIMESTAMP NULL DEFAULT now()
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE UNIQUE INDEX t_quiz_IDX_0 on t_user(name);