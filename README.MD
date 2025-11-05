### Folder Structure

```
inventory-app/
│
├── package.json
├── main.js                 ← Electron main process
├── preload.js              ← Secure bridge to renderer
│
├── src/                    ← React app (frontend)
│   ├── index.html
│   ├── index.jsx
│   ├── App.jsx
│   ├── components/
│   └── pages/
│
├── database/
│   └── db.js               ← SQLite setup
│
├── public/
│   └── icon.png
│
└── dist/                   ← Production build output (after React build)


```

## Step 1: Initialize Project

```sh

mkdir inventory-react-electron
cd inventory-react-electron
npm init -y

# Install dependencies:
npm install electron better-sqlite3
npm install --save-dev concurrently cross-env wait-on

```  

## Step 2: Create React Frontend (Vite recommended)

```sh

npm create vite@latest src -- --template react
cd src
npm install
cd ..

```

## Step 3: Electron Main Process (main.js)
Create main.js in root:


# Prisma ORM for Multi Database support
In your project root (where package.json for backend exists):
```sh
npm install prisma --save-dev
npm install @prisma/client

Then initialize Prisma:

npx prisma init

This creates:

prisma/
  schema.prisma
.env
```


## Generate & Apply Migration

For relational DBs (SQLite/MySQL):
```sh
npx prisma migrate dev --name init
```
This will:

Create the database file
Create the tables based on your schema
Generate the Prisma Client


# For MongoDB (no migrations needed):
```sh
npx prisma db push
npx prisma generate
```


## Switching Database Anytime

To move from SQLite → MySQL → MongoDB:

Update .env

Run:
```sh
npx prisma db push
```


# Use conditional schema per environment (recommended)
MongThe Reason

For MongoDB, you must include @map("_id")

For SQL databases, _id mapping is invalid — Prisma expects id directly
So there’s no single schema that works without modification for both MongoDB and SQL, but we can design for quick switching.

# Example: schema.prisma (for SQLite/MySQL)

``` js
datasource db {
  provider = env("DATABASE_PROVIDER") // "sqlite" or "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          String   @id @default(uuid()) //  or @id @default(cuid())   ✅ works for SQL
  name        String
  description String?
  price       Float
  quantity    Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

```

## Example: schema.mongo.prisma (for MongoDB)
```js
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId // ✅ required for MongoDB
  name        String
  description String?
  price       Float
  quantity    Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

```

Then, switch schemas dynamically when building or running:

```sh 
# For SQLite
npx prisma generate --schema=prisma/schema.prisma

# For MongoDB
npx prisma generate --schema=prisma/schema.mongo.prisma

```