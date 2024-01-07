# My Todo-Endpoint

This is a simple RESTful endpoint to manage a todo-app, created as part of an application for the tk-web_team 2024.

## Dependencies

This endpoint is not possible without these awesome projects

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Typescript](https://www.typescriptlang.org/) - Type strong 💪🏾😅
- [DotEnv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.
- [Supabase-js](https://github.com/supabase/supabase-js) - An isomorphic Javascript client for Supabase.
- [Cors](https://github.com/expressjs/cors) - Node.js CORS middleware

## API Endpoints

- `GET /`: Returns a welcome message.
- `GET /todos`: Returns all todos. If no todo exists, it returns a message saying "No todo exists".
- `GET /todos/:id`: Returns the todo with the specified ID. If the todo doesn't exist, it returns a message saying "Todo with id [id] doesn't exist".
- `POST /todos/create`: Creates a new todo with the task and status specified in the request body.
- `DELETE /todos/delete/:id`: Deletes the todo with the specified ID. If the todo doesn't exist, it returns a message saying "Todo with id [id] doesn't exist".
- `PUT /todos/update/:id`: Updates the task and status of the todo with the specified ID. If the todo doesn't exist, it returns a message saying "Todo with id [id] doesn't exist".


## Run Local

1. Clone the repository:

   ```bash
   git clone https://github.com/lovelindhoni/todo-endpoint.git
   ```

1. Install dependencies:

   ```bash
   pnpm install
   ```

1. Run the application:

   ```bash
   pnpm run start
   ```

   No need to build since running start explicitly calls build

## What is this exactly

This endpoint provides several CRUD operations for managing our todo list. By ‘our’ todo list, I mean that I haven’t set up any kind of authorization which would allow each user to manage their own todo list. This results in a global todo list where anyone can access and modify anything. I know it sounds awkward, but I don’t have time to set up such authorizations or I don’t know how to set up such authorizations, whichever sounds more honest. The data is stored in a PostgreSQL database provisioned by Supabase. The database schema is as per instructions given on the pdf with appropriate types for each columns. The Id and created_at(timestampz) fields are automatically filled, only the task message and status is needed to create a new todo. 

## Additional Notes

I would really liked to set up kinda UI for all the todos, but I was sure I know I  will never finish within the deadline, so I made a minimal wrapper for accessing my endpoint. It lives [here](https://github.com/lovelindhoni/todo-wrapper).

## License

This project is licensed under the MIT License.
