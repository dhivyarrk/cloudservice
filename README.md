Instruction

A link to your GitHub repository of the project, that includes: 

Source code 

Backend code: https://github.com/dhivyarrk/cloudservice/tree/main/backend

Frontend code: https://github.com/dhivyarrk/cloudservice/tree/main/frontend


Project architecture: 

Frontend: Angular 
Backend: flask
Database: postgres

Documentation: 

Service name: Web-Store Application

 Description of the service: Online web store where customer's can purchase kid’s clothes, kid’s shoes, women’s clothes and women’s accessories. 

Detailed description 

Kid’s clothes, kid’s shoes, women’s clothes and women’s accessories are sold in this website. Customer's can login through third party sso (single-sign-on) or create account, browse inventory,  add items to their cart, checkout, pay through card or cash on delivery. 

Market: Inventories which are not accepted by the big brands are usually discarded - this results in so much waste and the huge warehouse company does not have time or see reasonable enough profit to sell these left overs. Boo Boo fashions is going to sell just this. Good products but minor defects at very reasonable price. 



Installation instructions:  


If you would like to run locally :  
(Tested in ubuntu 24.04 lts) 

 1. Install postgres: 
 1.1 Install postgresql service 

sudo apt install postgresql 

1.2 start postgresql service 

sudo service postgresql start 
sudo service postgresql status  

1.3 connect to postgresql as postgres default user: 

sudo -u postgres psql 

1.4 create user with password 

create user webstore_user with encrypted password '12345'; 

1.5 Create database 

create database webstore_database; 

1.6 Provide enough privileges for the user to access the database 

webstore_database=> set role postgres;  

webstore_database=# grant all privileges on schema public to webstore_user;  

grant all privileges on database webstore_database to webstore_user;  

grant all privileges on schema public to webstore_user;  

 

Inside the terminal: 

2. For backend server: 

 2.1 Clone the repository: 

git clone git@github.com:dhivyarrk/webstore.git 

2.2 Clean migration folder if already present: 

cd webstore 

rm -rf migrations 

2.3 Initiate db and run migrations for database: 

flask --app=backend db init 
flask --app=backend db migrate 
flask --app=backend db upgrade 

2.4 change config to use local postgres db: 

a. uncomment this line in config.py: 

https://github.com/dhivyarrk/webstore/blob/main/backend/config.py#L4 

b. comment this line: 

https://github.com/dhivyarrk/webstore/blob/main/backend/config.py#L5 

2.5 Run the application: 

flask –app=backend run 



3. For frontend server: 

3.1 Clone repository: 

git clone git@github.com:dhivyarrk/fullstackfrontendapp.git 

 3.2 Change env.ts to connect to local backend server: 

cd fullstackfrontendapp 

a. uncomment local server https://github.com/dhivyarrk/fullstackfrontendapp/blob/main/src/app/env.ts#L1 

d. comment the online deployment server https://github.com/dhivyarrk/fullstackfrontendapp/blob/main/src/app/env.ts#L2 

3.3. run server: 

ng serve 

(if there are any issues please remove node-modules (rm -rf node-modules) and package-lock.json(rm package-lock.json) and run again) 

 

User manual: 

Important Features: 

As a user: 

1. Signup as an admin or normal customer to use service. 

2. Signin with existing credentials and continue session until logout. 

3. Sign in with the google account. 

4. Can list women’s clothes, women’s accessories, kid’s clothes and kid’s shoes 

5. Add products to cart. 

6. Checkout the cart and choose cash on delivery or card for payment of order. 

7. Send feedback about service through contact form. 

8. Can logout of the service. 

 

As an admin: 

1. Sign in to the service 

2. Signup in the service as an admin 

3. Can list, add, modify women’s clothes 

4. Can list, add, modify women’s accessories 

5. Can list, add, modify kid’s clothes 

6. Can list, add, modify kid’s shoes 

7. Can logout of the service. 
