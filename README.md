# Installation guide

# Database   	
- Insatall Microsoft SQL Sever and Create DB Connection
- Create Schema and table as follows :

CREATE SCHEMA [test]

CREATE TABLE [test].[user] (
 id bigint IDENTITY(257,1) NOT NULL,
 username nvarchar(45) COLLATE Thai_CI_AS NOT NULL,
 password nvarchar(300) COLLATE Thai_CI_AS DEFAULT NULL NULL,
 name nvarchar(200) COLLATE Thai_CI_AS DEFAULT NULL NULL,
 surname nvarchar(200) COLLATE Thai_CI_AS DEFAULT NULL NULL,
 email nvarchar(200) COLLATE Thai_CI_AS DEFAULT NULL NULL,
 address nvarchar(400) COLLATE Thai_CI_AS DEFAULT NULL NULL,
 phone nvarchar(45) COLLATE Thai_CI_AS DEFAULT NULL NULL,
 reference_code nvarchar(13) COLLATE Thai_CI_AS DEFAULT NULL NULL,
 classify nvarchar(20) COLLATE Thai_CI_AS DEFAULT NULL NULL,
 salary decimal(16,2) DEFAULT 0,
 flag_enable smallint DEFAULT 1 NULL,
 created_date datetime2 DEFAULT NULL NULL,
 updated_date datetime2 DEFAULT NULL NULL
)"
# NodeJS	
- Install NodeJs
	
# Install  library 	
- terminal : $npm install
	
# Config Enveronment	
- Created .env file config as follows :
	HOST=localhost
	PORT=7000
	DB_HOST=<<Edit  hostname database >>
	DB_DB=<<Edit  name database>>
	DB_USERNAME=<<Edit username database>>
	DB_PASSWORD=<<Edit Password password>>
	SECRET_KEY=)}i43/Z_X:<CE?G
	
# Script built project	
- terminal  :  $npm run  tsoa:gen
- terminal  :  $npm start"
