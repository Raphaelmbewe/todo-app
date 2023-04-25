const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/dashboard"));
app.use("/api", require("./routes/task"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
