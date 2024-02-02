# django-flask-warehouse-app

## Table of Contents

- [App Features](#app-features)
- [Web Framework and Architecture](#web-framework-and-architecture)
- [Database](#database)
- [Hosting](#hosting)
- [Installation and Usage](#installation-and-usage)
- [In Progress Features / Issues](#in-progress-features--issues)

## App features
### Available features:
- Can create user accounts in Django admin and assign permission groups.
- Django admin can perform basic CRUD on models.
- Can login/logout of application, will be redirected to login page if attempting to use urls when not authenticated.
- Basic listing page for models such as Products, Inventory etc. Displayed on a data grid and client-side filtering/ordering is available.
- Get endpoints in Django are by default allowed to all authenticated users, so currently any logged in user can see Products, Inventory, Inbound, Outbound etc. But Post endpoints such as to create Product are restricted based on permissions (Operator group only has permissions for inbound/outbound, so they cannot create a Product) 

### In progress features / issues:
- Allowing users to act on ‘Pending’ Inbound and Outbound requests, for example a user can “complete” an Inbound, which will mark it as complete and update the Inventory information of the storage location receiving the Inbound order.
- Having issues with sessionToken and csrf tokens, new to these concepts so not sure what is happening yet, but opening incognito tabs seem to ensure that the permissions after login are handled correctly.


## Web Framework and Architecture

The project uses Django as the web framework, which handles the backend logic and serves the React frontend. React, located in `/frontend`, controls the client-side UI and routing. React's build files are served by Django, with non-matching URLs directed to React's `index.html`. ReactRouter manages routing within the application. DjangoRestFramework is employed to construct REST APIs, located in the `/api` folder.

## Database

A PostgreSQL database hosted on Azure serves as the production database. Access to the database requires specific credentials, which can be obtained from the owner and added to the appropriate configuration files. Database model normalization is illustrated in `/design-docs`, providing insight into the conceptual model used.

## Hosting

The project utilizes Azure App Service to serve the separate React files and Django API backend. However, due to the application's dual nature, configuring `config.yml` requires careful consideration. Dockerization is planned as a future enhancement, with the goal of containerizing the application for easier deployment.

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
6. Back to project root and run:
   ```bash
   python manage.py runserver
7. App hosted on localhost:8000
   
  
