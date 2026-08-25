const express = require("express");
const cors = require("cors");
// const pool = require("./db");
const db = require("./db");


const { users ,todos } = require("./db/schema");
const { eq } = require("drizzle-orm");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

/* pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.log("Database connection failed:", error);
  } else {
    console.log("Database connected successfully!");
    console.log("Database time:", result.rows[0].now);
  }
}); */
/* db.select().from(users).then((result) => {
  console.log("Users from database:", result);
}); */

// Signup API
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = await db
      .insert(users)
      .values({
        name: name,
        email: email,
        password: hashedPassword,
      })
      .returning();

  /*   res.status(201).json({
      message: "User created successfully",
      user: newUser[0],
    }); */
    res.status(201).json({
  message: "User created successfully",
  user: {
    id: newUser[0].id,
    name: newUser[0].name,
    email: newUser[0].email,
  },
});
  } catch (error) {
    console.log("Signup error:", error);

    res.status(500).json({
      message: "Signup failed",
    });
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result[0];

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await db.select().from(todos);

    res.json(result);
  } catch (error) {
    console.log("Get todos error:", error);

    res.status(500).json({
      message: "Failed to get todos",
    });
  }
});

// Add a new todo
app.post("/todos", async (req, res) => {
  try {
    const { userId, title } = req.body;

    // Insert todo into database
    const newTodo = await db
      .insert(todos)
      .values({
        userId: userId,
        title: title,
        completed: false,
      })
      .returning();

    res.status(201).json({
      message: "Todo added successfully",
      todo: newTodo[0],
    });
  } catch (error) {
    console.log("Add todo error:", error);

    res.status(500).json({
      message: "Failed to add todo",
    });
  }
});

// Add todo
app.post("/todos", async (req, res) => {
  try {
    const { userId, title } = req.body;

    const newTodo = await db
      .insert(todos)
      .values({
        userId: userId,
        title: title,
        completed: false,
      })
      .returning();

    res.status(201).json(newTodo[0]);
  } catch (error) {
    console.log("Add todo error:", error);

    res.status(500).json({
      message: "Failed to add todo",
    });
  }
});


// Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await db
      .delete(todos)
      .where(eq(todos.id, id));

    res.json({
      message: "Todo deleted successfully"
    });
  } catch (error) {
    console.log("Delete todo error:", error);

    res.status(500).json({
      message: "Failed to delete todo"
    });
  }
});

// Edit todo
app.put("/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title } = req.body;

    const updatedTodo = await db
      .update(todos)
      .set({
        title: title
      })
      .where(eq(todos.id, id))
      .returning();

    res.json(updatedTodo[0]);

  } catch (error) {
    console.log("Edit todo error:", error);

    res.status(500).json({
      message: "Failed to edit todo"
    });
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});