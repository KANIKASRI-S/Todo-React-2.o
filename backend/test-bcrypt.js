const bcrypt = require("bcrypt");

async function test() {
  const password = "hello123";

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Original password:", password);
  console.log("Hashed password:", hashedPassword);
}

test();