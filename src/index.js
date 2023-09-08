require("dotenv").config();
const http = require("http");
const app = require("../app/app");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
require("../DB/config");
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
