### STEP 1
Download and install  Nodejs, npm
### STEP 2 - CLONE PROJECT
To clone project to your machine, open Terminal/cmd and run command `npm clone https://github.com/halushkom/nodejs_crud_routes `
### STEP 3
To install dependencies run in Terminal `npm install`
### STEP 4 - Setting up MySQL
In terminal run `mysql`
1. Next, need to create new user: `CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';`
2. Add privileges for new user: `GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';`
3. to evoid errors run: `FLUSH PRIVILEGES;`
4. Log out of MySQL by typing: `\q`.
5. Log in as the new database user you just created: `mysql -u newuser -p`
6. Create a new database: `CREATE DATABASE db_name;`
7. Log out of MySQL by typing: `\q`.
### STEP 5
Create file .env. Add such text:
* DB_HOST = localhost
* DB_USER = db_use_name
* DB_PASSWORD = db_password
* DB_NAME = db_name

and replace "db_use_name", "db_password", "db_name"  with your attributes.
### STEP 6
Open terminal again and run command `npm run devstart`. If everything ok in terminal will be displayed 'Connection ------- OK', which means, that you have been connected to database.
### STEP 7
Download and instal POSTMAN
### STEP 8
Open POSTMAN and try to send GET and POST requests by such address `http://localhost:3000/user`. Requests with methods PUT and DELETE should be sent to `http://localhost:3000/user/<your_ID>`