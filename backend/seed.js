const db = require("./db");
const { users, todos } = require("./db/schema");
const bcrypt = require("bcrypt");


const userData = [
  {
    name: "User 1",
    email: "user1@example.com",
    password: "password123",
  },
  {
    name: "User 2",
    email: "user2@example.com",
    password: "password123",
  },
  {
    name: "User 3",
    email: "user3@example.com",
    password: "password123",
  },
  {
    name: "User 4",
    email: "user4@example.com",
    password: "password123",
  },
  {
    name: "User 5",
    email: "user5@example.com",
    password: "password123",
  },
  {
    name: "User 6",
    email: "user6@example.com",
    password: "password123",
  },
  {
    name: "User 7",
    email: "user7@example.com",
    password: "password123",
  },
  {
    name: "User 8",
    email: "user8@example.com",
    password: "password123",
  },
  {
    name: "User 9",
    email: "user9@example.com",
    password: "password123",
  },
  {
    name: "User 10",
    email: "user10@example.com",
    password: "password123",
  },
];

async function seedDatabase() {
  // Hash passwords before storing them
  const hashedUsers = [];

  for (const user of userData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    hashedUsers.push({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
  }

  console.log("Passwords hashed successfully");

  // Insert users into database
  const insertedUsers = await db
    .insert(users)
    .values(hashedUsers)
    .returning();

  console.log("10 users inserted successfully");
  console.log(insertedUsers);

    // Create 100 todos
  const todoData = [];

  for (let i = 0; i < 100; i++) {
    const user = insertedUsers[i % insertedUsers.length];

    todoData.push({
      userId: user.id,
      title: `Todo task ${i + 1}`,
      completed: false,
    });
  }

  // Insert todos into database
  await db
    .insert(todos)
    .values(todoData);

  console.log("100 todos inserted successfully");
}

seedDatabase()
  .then(() => {
    console.log("Database seeding completed!");
  })
  .catch((error) => {
    console.log("Database seeding failed:", error);
  });