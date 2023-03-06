# sample_pern
Create a table todos in user database
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  pwd TEXT
);
```
Backend Setup :
in the home directory
```
npm install
```
Frontend Setup:
```
cd client
npm install
```

Starting backend
```
node server.js
```

Starting frontend
```
npm run start
```
