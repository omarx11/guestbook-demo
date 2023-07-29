const env = process.env.NODE_ENV;
let PATHNAME_URL = "";

if (env == "development") {
  PATHNAME_URL = "http://localhost:3000";
} else if (env == "production") {
  // change this to your production domain
  PATHNAME_URL = "https://guestbook.omar11.sa";
}

export { PATHNAME_URL };
