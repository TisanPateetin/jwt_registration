# Design
 - Database type Mircosoft SQL Sever 
 - API Used  NodeJs , Express, tsoa
 - Authentication Implementing a JWT auth system with TypeScript and Node
 - API Enpoint user register Method POST /registration
curl --location --request POST 'http://localhost:7000/registration' \
--header 'Content-Type: application/json' \
--data-raw ' {
   "username" :"String" ,
 "password" :"String",
 "name" :"String",
 "surname" :"String",
 "email" :"String",
 "address" ::"String", 
 "phone" ::"String", 
 "salary" :"number"
} '
- API Enpoint get user information Method GET  /user/profile
curl --location --request GET 'http://localhost:7000/user/profile' \
--header 'authorization: "String"'
- Response error message  format
{
    "errors": [
        {
            "error": "",
            "error_message": ""
        }
    ]
}

# Diagram
 <img src="/Register-diagram.png" />

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
	
# Config environment	
- Created .env file config as follows :
- HOST=localhost
- PORT=7000
- DB_HOST=(Edit hostname database)
- DB_DB=(Edit name database)
- DB_USERNAME=(Edit username database)
- DB_PASSWORD=(Edit Password password)
- SECRET_KEY=)}i43/Z_X:<CE?G
	
# Script built project	
- terminal  :  $npm run  tsoa:gen
- terminal  :  $npm start"

# Example usage
- Registration
<div>
-  curl --location --request POST 'http://localhost:7000/registration' \
--header 'Content-Type: application/json' \
--data-raw ' {
   "username" :"tisanpa5" ,
 "password" :"Pass12345",
 "name" :"tisan5",
 "surname" :"pateetin",
 "email" :"5@gmail.com",
 "address" :"123/12 Bankok 10900", 
 "phone" :"0849199321", 
 "salary" :14999.00
}
</div>

- Get User Information
<div>
- curl --location --request GET 'http://localhost:7000/user/profile' \
--header 'authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6Mjc4LCJpc3N1ZWQiOjE2MTE1ODMxNzcwNDgsImV4cGlyZXMiOjE2MTE1ODQwNzcwNDh9.pW7dFb6RJhStCHRsnNUAS3I7g2yhAa513mqel7xYWMJAKBKhMgut57DnB5kim1Y8GcW4Li10xa9kLif1ULowow'
	</div>

# Test Case
<p>Download document test Case: <a href="/test%20case.xlsx">Click</a></p>	

# Unit Test 
- Run Jest Unit Test
- terminal  :  $npm run test:watch
 <div>
 <img src="/Result_unit_test.png" />
 <img src="/Path_unit_test.png" />
 <div/>
	
# Case User Registration
- Error Failed Invalid data when register save
- Error Failed Registration save rejected not match  alphanumeric string that may include _ and – having a length of 3 to 16 characters
- Error Failed Registration save rejected not match alphanumeric string a length of 3 to 200 characters
- Error Registration save rejected not match 10 digit phone number
- Error Failed Registration save rejected not match email pattern
- Error Registration save rejected To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
- Error Failed Registration save rejected due to duplicate username
- ErrorRegistration save rejected due to duplicate email
- Registration save rejected member type classify from salary less than 15,000
- Registration : Success

# Case User Infomation
- Failed error invalid token
- Get user infomation success
