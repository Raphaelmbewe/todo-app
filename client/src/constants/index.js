/* eslint-disable no-undef */
let BASE_URL;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3000";
} else {
  BASE_URL = "https://www.bgs-todo-app.com/";
}

export { BASE_URL };
