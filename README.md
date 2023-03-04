# sample_pern
Create a table todos in user database
```
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title TEXT,
  completed BOOLEAN DEFAULT false
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
