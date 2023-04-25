const cors = require("cors");

require("dotenv").config();

const defaultCors = () => {
  return cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: process.env.ALLOWED_HOSTS.split(","),
    credentials: false,
  });
};

module.exports = {
  defaultCors,
};
