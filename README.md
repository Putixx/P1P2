# P1P2

## Setup

**First:** npm install -g nodemon ts-node typescript<br />
**After:** npm install chalk@^4.1.2 dotenv express joi mongoose jsonwebtoken bcrypt<br />
**Final:** npm install --save-dev typescript @types/express<br />

## Endpoints

### Authentication
**Register User**<br />
**POST** /api/register<br />
post body:<br />
{<br />
    "username": "testRegisterUser",<br />
    "email": "test.test@te.st",<br />
    "password": "test",<br />
    "image": "path",<br />
    "role": "test"<br />
}<br />

**Login User**<br />
**POST** /api/login<br />
post body:<br />
{<br />
  "email": "test.test@te.st",<br />
  "password": "test"<br />
}<br />

it returns "token" which you can use to authenticate to access other resources<br />

### Create
**Events**<br />
**POST** /api/events/create<br />

**Tickets**<br />
**POST** /api/tickets/create<br />

### Read
**Users**<br />
**GET** /api/users -> returns all users<br />
**GET** /api/users/:userId -> returns specific user<br />

**Events**<br />
**GET** /api/events -> returns all events<br />
**GET** /api/events/event/:eventId -> returns specific event<br />
**GET** /api/events/users/:eventId -> returns specific event participants<br />
**GET** /api/events/:eventType -> returns specific events by event type<br />

**Tickets**<br />
**GET** /api/tickets -> returns all tickets<br />
**GET** /api/events/:ticketsId -> returns specific ticket<br />

### Update<br />
**Events**<br />
**POST** /api/events/:eventId<br />

**Tickets**<br />
**POST** /api/tickets/ticketId<br />

### Delete
**Events**<br />
**POST** /api/events/:eventId<br />

**Tickets**<br />
**POST** /api/tickets/ticketId<br />
