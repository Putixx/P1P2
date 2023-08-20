# P1P2

## Setup

**First:** npm install -g nodemon ts-node typescript<br />
**After:** npm install chalk@^4.1.2 dotenv express joi mongoose jsonwebtoken bcrypt<br />
**Final:** npm install --save-dev typescript @types/express<br />

## Endpoints

### Authentication
**Register User**
**POST** /api/register
post body:
{
    "username": "testRegisterUser",
    "email": "test.test@te.st",
    "password": "test",
    "image": "path",
    "role": "test"
}

**Login User**
**POST** /api/login
post body:
{
  "email": "test.test@te.st",
  "password": "test"
}

it returns "token" which you can use to authenticate to access other resources

### Create
**Events**
**POST** /api/events/create

**Tickets**
**POST** /api/tickets/create

### Read
**Users**
**GET** /api/users -> returns all users
**GET** /api/users/:userId -> returns specific user

**Events**
**GET** /api/events -> returns all events
**GET** /api/events/event/:eventId -> returns specific event
**GET** /api/events/users/:eventId -> returns specific event participants
**GET** /api/events/:eventType -> returns specific events by event type

**Tickets**
**GET** /api/tickets -> returns all tickets
**GET** /api/events/:ticketsId -> returns specific ticket

### Update
**Events**
**POST** /api/events/:eventId

**Tickets**
**POST** /api/tickets/ticketId

### Delete
**Events**
**POST** /api/events/:eventId

**Tickets**
**POST** /api/tickets/ticketId
