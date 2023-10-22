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
**GET** /api/events/event/:eventId -> returns specific event<br />
**GET** /api/events/users/:eventId -> returns specific event participants<br />
**GET** /api/events/:eventType -> returns specific events by event type<br />
**GET** /api/events -> returns all events<br />
To filter out events, just do as follows:<br />
for param filtering:<br />
**GET** /api/events?filter={paramName}&value={paramValue} -> returns all events which paramName is equal to paramValue, example:<br />
**GET** /api/events?filter=type&value=Sport -> returns all events which type is equal to Sport, example:<br />
for dates filtering:<br />
**GET** /api/events?filter={startDate || endDate}&value={year || month || day || date}&year=2023&month=9&day=6 -> returns events which startDate/endDate, year/month/day/date is equal to provided params, example<br />
**GET** /api/events?filter=startDate&value=date&year=2023&month=9&day=6 -> return events which startDate is equal to 2023-09-06<br />
**GET** /api/events?filter=startDate&value=year&year=2023 -> return events which startDate year is equal to 2023<br />

**Tickets**<br />
**GET** /api/tickets -> returns all tickets<br />
**GET** /api/events/:ticketsId -> returns specific ticket<br />

### Update<br />
**Events**<br />
**PATCH** /api/events/:eventId<br />

**Tickets**<br />
**PATCH** /api/tickets/ticketId<br />

**Users**<br />
**PATCH** /api/users/userId<br />

### Delete
**Events**<br />
**DELETE** /api/events/:eventId<br />

**Tickets**<br />
**DELETE** /api/tickets/ticketId<br />

**Users**<br />
**DELETE** /api/users/userId<br />
