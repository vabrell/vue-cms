# vue-cms

A school project by Emil Backlund, Edwin Berg, Gabriel Dahlberg och Victor Abrell.
CMS system built with JavaScript fullstack, VueJS for frontend.

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

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Start API

```
npm run dev
```
