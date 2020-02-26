# vue-cms

A school project by Emil Backlund, Edwin Berg, Gabriel Dahlberg och Victor Abrell.
CMS system built with JavaScript fullstack, VueJS for frontend.

- [Project Setup](#project-setup)
- [API](#api)
  - [Users](#users)
    - [GET](#get)
    - [POST](#post)
  - [Products](#products)
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


