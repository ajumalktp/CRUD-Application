// imports
const dbConnect = require("./dbConnect");
const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

// database connection
dbConnect();

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "123",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.use("/", userRouter);
app.use("/admin/", adminRouter);

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
