import express from "express";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());

// api to get all expenses
app.get("/api/expenses", async (req, res) => {
  console.log("app.get(/api/expenses)");
  // console.log(db);
  const expenses = await db.collection("expenses").find({}).toArray();
  res.json(expenses);
});

// api to get a single expense based on title
app.get("/api/expenses/:id", async (req, res) => {
  console.log("app.get(/api/expenses/:id)");
  const id = req.params.id;
  console.log("id: " + id);
  const expense = await db.collection("expenses").findOne({ id: parseInt(id) });
  res.json(expense);
});

// api to add a new expense
app.post("/api/expenses", async (req, res) => {
  console.log("app.post(/api/expenses)");
  let result = {
    acknowledged: false,
  };
  const expense = req.body;
  // TO DO: test the following
  if (!expense) {
    res.status(400).json({ error: "Invalid expense" });
    return;
  }
  try {
    result = await db.collection("expenses").insertOne(expense);
    console.log("in try");
    console.log(result);
  } catch (error) {
    console.log("Error in app.post(/api/expenses)");
    console.log(error);
  } finally {
    console.log("in finally");
    console.log(result);
    res.json(result);
  }
});

// allow for environment variable PORT with a default of 8000 (for dev)
const PORT = process.env.PORT || 8000;

connectToDb(() => {
  console.log("Succesfully connected to database");
  app.listen(PORT, () => {
    console.log("Server.js is listening on port " + PORT);
  });
});
