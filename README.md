**Instruction**

**Source code**

Backend code: https://github.com/dhivyarrk/cloudservice/tree/main/backend

Frontend code: https://github.com/dhivyarrk/cloudservice/tree/main/frontend


**Project architecture:**

Frontend: Angular served via nginx
Backend: flask, alembic for migration, sqlalchemy - ORM wrapper
Database: postgres
Load Balancer - Traefik
HTTPS: Acme lets encrypt
Monitoring: Prometheus, Grafana
Logging: loki, promtail.

**Documentation:**

Service name: Web-Store Application

Description of the service: Online web store where customer's can purchase kid’s clothes, kid’s shoes, women’s clothes and women’s accessories. 

Detailed description 

Kid’s clothes, kid’s shoes, women’s clothes and women’s accessories are sold in this website. Customer's can login through third party sso (single-sign-on) or create account, browse inventory,  add items to their cart, checkout, pay through card or cash on delivery. 

**User manual:**

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


**Installation instructions:**

Few ways to install:

1. Install locally - separate installation of frontend, backend and database
2. Dockerize and install (locally)
3. Install using docker compose
4. Install in Digital ocean with docker swarm

***Installation method 1 - Install locally - separate installation of frontend, backend and database ***

If you would like to run locally (manual process):  
(Tested in ubuntu 24.04 lts) 

 1. Install postgres: 
 1.1 Install postgresql service 

```
sudo apt install postgresql 
```

1.2 start postgresql service 

```
sudo service postgresql start 
sudo service postgresql status  
```

1.3 connect to postgresql as postgres default user: 

```
sudo -u postgres psql 
```

1.4 create user with password 

```
create user webstore_user with encrypted password '12345'; 
```

1.5 Create database 

```
create database webstore_database; 
```

1.6 Provide enough privileges for the user to access the database 

```
webstore_database=> set role postgres;  

webstore_database=# grant all privileges on schema public to webstore_user;  

grant all privileges on database webstore_database to webstore_user;  

grant all privileges on schema public to webstore_user;  
```
 

Inside the terminal: 

2. For backend server: 

 2.1 Clone the repository: 

```
git clone git@github.com:dhivyarrk/cloudservice.git
```

2.2 Clean migration folder if already present: 

```
cd webstore 

rm -rf migrations 
```

2.3 Initiate db and run migrations for database: 

```
flask --app=backend db init 
flask --app=backend db migrate 
flask --app=backend db upgrade 
```

or 

```
python -m flask --app=backend db init
python -m flask --app=backend db migrate
python -m flask --app=backend db upgrate
```

sample insert:
```

INSERT INTO categories (category_id, category_name, category_description)
VALUES
(1, 'womensclothes', 'this is womens clothes'),
(2, 'womensaccessories', 'this is womens accesories'),
(3, 'kidsclothes', 'this is kids clothes'),
(4, 'kidsshoes', 'this is kids shoes');


INSERT INTO womensproducts (product_id, product_name, product_description, product_price, category_id, availability)
VALUES
(1, 'wc1', 'jdkw', 50, 1, 50),
(3, 'wc2', 'jdkwdjk', 30, 1, 100),
(5, 'wa1', 'djdjed', 10, 2, 60),
(4, 'wc3', 'jdkwdjkdjk', 30, 1, 100);


INSERT INTO kidsproducts (product_id, product_name, product_description, product_price, category_id, availability)
VALUES
(1, 'kc1', 'jdks', 30, 3, 20),
(3, 'ks1', 'njdsbc', 10, 4, 200),
(4, 'ks2', 'njdsbcdnjk', 40, 4, 2000);
```


2.4 change config to use local postgres db: 

a. uncomment this line in config.py: 

https://github.com/dhivyarrk/cloudservice/blob/main/backend/backend/config.py#L4

b. comment this line: 

https://github.com/dhivyarrk/cloudservice/blob/main/backend/backend/config.py#L5

2.5 Run the application: 

```
flask –app=backend run or

python -m flask --app=backend run
```


3. For frontend server: 

3.1 Change env.ts to connect to local backend server: 

```
cd frontend 
```

Change to local or hosted server according to needs:

https://github.com/dhivyarrk/cloudservice/blob/main/frontend/src/app/env.ts#L1


3.2 run server: 

```
ng serve 
```

(if there are any issues please remove node-modules (rm -rf node-modules) and package-lock.json(rm package-lock.json) and run again) . Also use npm install to install modules if it wasn't installed.

 

***Installation method 2 - Dockerize and install (locally)***

How to run with Docker:

Ensure docker is running.

```
cd cloudservice/backend

docker build -t flask-app .

docker run -p 5000:5000 flask-app
```

```
cd cloudservice/frontend
$ docker build --progress=plain --no-cache -t angular-app .
$ docker run -p 8080:80 angular-app
```

check in http://localhost:8080/signin


**********************

***Installation Method 3 - Install using docker compose***

Run locally using Docker compose:

Install docker compose
```
cd cloudservice

docker compose build --no-cache
docker compose up
docker compose down
```
*******************

***Installation Method 4 - Install in Digital ocean with docker swarm***

It is now deploed in https://booboofashions.com

Reference: https://github.com/Japskua/cloud_services_and_infra_2025

Create 2 Droplets manager and worker for docker swarm and add necessary firewall rules(Refer: https://github.com/Japskua/cloud_services_and_infra_2025/tree/main/session_7)

Initialize docker swarm and let worker join.
Create secrets:

Get Api token from Digital Ocean:

ssh to manager droplet and create secrets:

1. Digital ocean api token

echo "digital ocean api token" | docker secret create do_token -

check if token works:
```
curl -s -X GET https://api.digitalocean.com/v2/domains \
  -H "Authorization: Bearer api-token"
```

2. Traefik user:

```
htpasswd -nbB traefikuser password
dockeruser@lut-project-swarm-manager:~$ docker secret create traefik_users traefik_users 
```

3. Prometheus user

```
htpasswd -nbB promethuser password | tr -d '\n' > prometheus_users
docker secret create prometheus_users prometheus_users 
```

4. Grafana admin password

```
echo "password" | docker secret create grafana_admin_password -
```

5. backend_metric_user

```
htpasswd -nbB metricsuser password | tr -d '\n' > backend_metrics_users

docker secret create backend_metrics_users backend_metrics_users
```

For Acme lets encrypt certificate:

Add digtal ocean nameservers to the custom domain name(booboofashions.com) so that digital ocean can manage DNS records. Acme lets encrypt certificate is generated. 


CI/CD workflows:

(https://github.com/dhivyarrk/cloudservice/tree/main/.github/workflows)
(https://github.com/dhivyarrk/cloudservice/actions)

Github workflows builds image and pushes frontend and backend to github container registry. They build the images from docker files in backend and frontend folders. The workflow is triggered when commit message has [build-frontend] (build frontend image and pushes to GHCR) and [build-backend] (build backend image and pushes to GHCR) in it.

Builds are pushed to private registry and when pulled it needs github container registry token.

after generating the token check 

```
curl -s -u "dhivyarrk:token" \
  https://api.github.com/users/dhivyarrk/packages?package_type=container \
  | jq -r '.[].name'
```
should return images from registry.

Docker login in manager node and create secret so that docker swarm can use in deployment:

```
echo "GHCR token" | docker login ghcr.io -u dhivyarrk --password-stdin

docker secret create ghcrregcred ~/.docker/config.json
```


Add new URLs to DNS. These are:

```

prometheus.booboofashions.com
grafana.booboofashions.com
loki.booboofashions.com
frontend.booboofashions.com
backend.booboofashions.com
```


Create configs

ssh to manager droplet and 

```

docker config create alertmanager_config configs/alertmanager_config
docker config create loki_config configs/loki_config
docker config create prometheus_config configs/prometheus_config
docker config create promtail_config configs/promtail_config
```

Create volumes:

ssh to manager droplet

```
dockeruser@lut-project-swarm-worker-1:~$ docker volume create prometheus_data
prometheus_data
dockeruser@lut-project-swarm-worker-1:~$ docker volume create alertmanager_data
docker volume create grafana_data
docker volume create grafana_provisioning
docker volume create loki_data
```

Add plugins on all nodes:

```
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions

```

Deploy:

ssh to manager droplet and deploy the stack

```
cd cloudservice/Digital_Ocean_deployment
docker stack deploy -c traefik-ssl.yml traefik-stack
docker stack deploy -c portainer.yml portainer-stack
docker stack deploy -c application-stack.yml my-stack --with-registry-auth
docker stack deploy -c monitor-stack.yml monitor-stack
```
