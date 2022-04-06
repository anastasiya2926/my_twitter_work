const { defineConfig } = require("vite");
const env = require("dotenv").config();

module.exports = defineConfig({
  base: "/" + process.env.GIT_REPO  + "/",
});
