# vue-cms

A school project by [Emil Backlund](https://github.com/Backlund79), [Edwin Berg](https://github.com/EdwinBerg), [Gabriel Dahlberg](https://github.com/gabbe98) och [Victor Abrell](https://github.com/vabrell).
CMS system built with JavaScript fullstack, VueJS for frontend.

- [Project Setup](#project-setup)
- [Frontend](#frontend)
  - [Administration](#administration)
    - [Products](#products)
      - [All products](#all-products)
      - [Add product](#add-product)
      - [Edit product](#edit/delete-product)
- [API](#api)
  - [Users](#users)
    - [GET](#get)
    - [POST](#post)
  - [Products](#products-1)
    - [GET](#get-1)
    - [POST](#post-1)
    - [PUT](#put)
    - [DELETE](#delete)

## Project setup

```
npm install
```
__Compiles and hot-reloads for development__
```
npm run serve
```
__Compiles and minifies for production__
```
npm run build
```
__Lints and fixes files__
```
npm run lint
```

### Start API

```
npm run dev
```

## Frontend

### Administration
The controlpanel for the administrator of the CMS system
```
/admin
```

#### Products
The view of the products in the CMS system

##### All products
The _landing page_ for the Products in the controlpanel. 
It will show a link to Add a new product, a table of all existing products with links to edit the product.
```
/admin/products
```

##### Add product
The page for adding a new product.
```
/admin/products/new
```

##### Edit/delete product
The page for editing an existing product. 
On this page there is a delete button that will remove the product.
```
/admin/products/edit/:id
```
**id** the ID of the product


## API

Base address is http://localhost:8080/api/.

### Users

#### GET

```
/api/users
```

Get all users from the database

```
/api/users/:id
```

Get a specific user, filtered by ID

#### POST

```
/api/users
```

Create a new user  
**name** required (String)  
**email** required (String)  
**password** required (String)  
**confirmPassword** required (String)  
**admin** optional (Boolean)

### Products

#### GET

```
/api/products
```

Get all the products from the database

```
/api/products/:id
```

Get a specific product, filtered by ID

#### POST

```
/api/products
```

Create a new product  
**name** required (String)  
**description** required (String)  
**price** required (Number, can be Float)  
**stock** required (Number)

#### PUT

```
/api/products/:id
```

Update a product, specified by ID  
**name** required (String)  
**description** required (String)  
**price** required (Number, can be Float)  
**stock** required (Number)

#### DELETE

```
/api/products/:id
```

Delete a product, specified by ID


