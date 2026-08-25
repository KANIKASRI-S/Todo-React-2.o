const {
  pgTable,
  serial,
  integer,
  varchar,
  boolean,
} = require("drizzle-orm/pg-core");

// Users table
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

// Todos table
const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
});

module.exports = {
  users,
  todos,
};