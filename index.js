const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server start on -> ${process.env.HOST}:${PORT}`);
});
