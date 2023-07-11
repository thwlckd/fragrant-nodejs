const app = require("./src/app");

const PORT = process.env.PROT || 8080;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
