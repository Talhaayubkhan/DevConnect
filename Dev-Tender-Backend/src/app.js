const express = require("express");

const app = express();

app.use((req, res) => {
  console.log("server request = ", req);
  res.send("Hello from the server");
});

app.listen(5000, () => {
  console.log("Server running on port 3000");
});
