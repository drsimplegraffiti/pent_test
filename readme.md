#### How to run this application

> Clone the repository
> Install dependencies: npm install

> Run the application: npm start

#### Dependencies used

> mongoose morgan dotenv express bcrypt jsonwebtoken cors helmet

---

**Check** [Postman_Documentation](https://documenter.getpostman.com/view/15544476/VUqpudL7)

---


#### Schema design
![Group 4](https://user-images.githubusercontent.com/70065792/185910330-8ffa8afd-cd24-49ed-9acf-e91485b5aaf9.png)

---

## Auth Route

#### Create a user

> POST --> http://localhost:4545/api/auth/signup

```javascript
{
"name": "John Doe",
"email": "doe@gmail.com",
"password": "123456"
}
```

#### User login

> POST --> http://localhost:4545/api/auth/login

```javascript
{
    "email": "user1@gmail.com",
    "password": "1234"
}
```

---

## Apartment Route

#### Create a new apartment

> POST --> http://localhost:4545/api/apartment

```javascript
{
    "name": "kent villa",
    "address": "3 Royal avenu",
    "city": "Ikeja",
    "state": "Lagos",
    "zip": "234",
    "price": 3000,
    "bedrooms":4
}
```

---

## Booking Route

#### Create a new booking by a user

> POST --> http://localhost:4545/api/booking/create

```javascript
{
    "apartmentId": "63034fde163ff7b9b5aae077",
    "startDate": "2022-10-10",
    "endDate": "2022-11-06"
}
```

---

## Review Routes

#### Post a review

> POST --> http://localhost:4545/api/review

```javascript
{
    "apartmentId": "63034fde163ff7b9b5aae077",
    "rating": 2,
    "image": "a.b",
    "quality_of_amenities": "average",
    "landlord_rating": 2
}
```

#### Mark review as helpful

> POST --> http://localhost:4545/api/review/:id

#### Find review by most recent or helpful

> POST --> http://localhost:4545/api/review/all?helpful=5
