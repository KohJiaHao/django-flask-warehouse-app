# django-flask-warehouse-app

## Table of Contents

- [App Features](#app-features)
- [Web Framework and Architecture](#web-framework-and-architecture)
- [Database](#database)
- [Hosting](#hosting)
- [Installation and Usage](#installation-and-usage)

## App features
### Available features:
- Can create user accounts in Django admin and assign permission groups.
- Django admin can perform basic CRUD on models.
- Can login/logout of application, will be redirected to login page if attempting to use urls when not authenticated.
- Basic listing page for models such as Products, Inventory etc. Displayed on a data grid and client-side filtering/ordering is available.
- Get endpoints in Django are by default allowed to all authenticated users, so currently any logged in user can see Products, Inventory, Inbound, Outbound etc. But Post endpoints such as to create Product are restricted based on permissions (Operator group only has permissions for inbound/outbound, so they cannot create a Product) 

### In progress features / issues:
- Outbound page
- Feedback on failed user actions (user not permitted to make post request, invalid csrf token, HTTP400_BAD_REQUEST due to missing required fields)
- Allowing users to act on ‘Pending’ Inbound and Outbound requests, for example a user can “complete” an Inbound, which will mark it as complete and update the Inventory information of the storage location receiving the Inbound order.
- Having issues with sessionToken and csrf tokens, new to these concepts so not sure what is happening yet, but opening incognito tabs seem to ensure that the permissions after login are handled correctly, same browser session can be used to logout/login to other users to test permissions.
- Refactoring could be done in create screens to 1) handle form state changes better. 2) reuse of create screens


## Web Framework and Architecture

Django is used as the web framework but allows React to handle client side UI and routing. React is located in ‘/frontend’, and it’s build files are served by Django by making Django path any non-matching urls to React’s index.html, which React then controls routing with ReactRouter. DjangoRestFramework is used to build REST Apis in the ‘/api’ folder. 

## Database

A PostgreSQL database hosted on Azure serves as the production database. Access to the database requires specific credentials, which can be obtained from the owner and added to the appropriate configuration files. Database model normalization is shown in ‘/design-docs’ which show the conceptual model used. 

## Hosting

I have used Azure App service to serve my separate React files and Flask API backend before, but this being a 2-in-1 application, I will need to think about how to setup the config.yml. As for Docker I have not successfully dockerized an app before but that will certainly be the end goal.

## Installation and Usage

To install and run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project root directory.
3. Install Python dependencies by running:
   ```bash
   pip install -r requirements.txt
4. Navigate to `/frontend`.
5. Install node modules by running:
   ```bash
   npm install
6. Add .env for postgresDB connection in `/django_project`, it should contain
   ```bash
   # .env
   DB_PASSWORD=xxx
7. Back to project root and run:
   ```bash
   python manage.py runserver
8. App hosted on localhost:8000
   
  
