import express from "express";
import cors from "cors"; // to shut the cross-origin policy warnings
import supabase from "./db/db";

const app = express();
app.use(cors());
app.use(express.json()); // to parse the incoming request body to json

const MYDIRTYPORT = 6969; // inspired from the assets given by my seniors

app.get("/", (_, res) => {
  res.send("Welcome to the Todo API. Developed by lovelin dhoni AIML-B");
});

app.get("/todos", async (_, res) => {
  try {
    const { data, error } = await supabase.from("todos").select();
    if (data?.length == 0) {
      // if the data error is empty
      res.json({ responseData: "No todo exists", isSuccess: true });
    } else {
      // else return the data array
      res.json({ isSuccess: true, responseData: data });
    }
  } catch (error) {
    return res.json({ error });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .eq("id", req.params.id); // selects the todo matching the specified id on route
    if (data?.length == 0) {
      // if the data array is empty
      res.json({
        responseData: `Todo with id ${req.params.id} doesn't exist`,
        isSuccess: false,
      });
    } else {
      // else return the data array
      res.json({ isSuccess: true, responseData: data });
    }
  } catch (error) {
    res.send({ error });
  }
});

app.post("/todos/create", async (req, res) => {
  try {
    const { task, status } = req.body;
    const { data, error } = await supabase
      .from("todos") // inserts a new todo into database and returns it
      .insert({ task, status })
      .select();
    if (data?.length == 0) {
      // if anything goes wrong
      res.json({ responseData: "Failed to create todo", isSuccess: false });
    } else {
      res.json({ isSuccess: true, responseData: data });
    }
  } catch (error) {
    res.json(error);
  }
});

app.delete("/todos/delete/:id", async (req, res) => {
  try {
    const { data } = await supabase
      .from("todos")
      .select()
      .eq("id", req.params.id);
    if (data?.length != 0) {
      // checks whether an todo with specifed id exists
      const { error } = await supabase
        .from("todos")
        .delete() // delete the todo
        .eq("id", req.params.id);
      res.json({
        responseData: `Todo ${req.params.id} successfully deleted`,
        isSuccess: true,
      });
    } else {
      res.json({
        responseData: `Todo with id ${req.params.id} doesn't exist`,
        isSuccess: false,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.put("/todos/update/:id", async (req, res) => {
  try {
    const { task, status } = req.body;
    const { data } = await supabase
      .from("todos")
      .select() // checks if a todo exists with the specified id
      .eq("id", req.params.id);
    if (data?.length != 0) {
      const { data, error } = await supabase
        .from("todos")
        .update({ task, status }) // then updates the task and status fields of that todo
        .eq("id", req.params.id)
        .select();
      res.json({ isSuccess: true, responseData: data });
    } else {
      res.json({
        responseData: `Todo with id ${req.params.id} doesn't exist`,
        isSuccess: false,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(MYDIRTYPORT, () => {
  console.log(`Todo endpoint running on port ${MYDIRTYPORT}`);
});

module.exports = app;

// :)
