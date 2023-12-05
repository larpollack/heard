# Heard FullStack Assessment

- Built with `node 18.17.1` && `npm 9.6.7`
- Client side bootstrapped with create-react-app, typescript and tailwind
- Server side built with express, prisma, postgres

### Getting Started

- Clone the repo
- `npm install` (keep this terminal open to run backend)
- cd into client folder and `npm install` (keep this terminal open to run frontend)
- set up a new, empty database using a local or web Postgres instance (I used Supabase for quick setup)
- create a `.env` file based on the `.env.example`
- run `npx prisma migrate dev --name init` (make sure you're cd'd in the root of the project)
- run `npm run seed` to seed the database. You may be instructed to run another prisma command first and then rerun the seed command
- run `npm start` to start the server
- in your separate, client terminal, run `npm start` to start the client

### Testing out features

- Simple CRUD actions include viewing a list of transactions, creating a new transaction, editing a transaction, and deleting transactions using relevant buttons
