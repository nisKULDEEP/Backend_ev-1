const express = require("express");

const app = express();
app.use(express.json());

//Logger
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

// app.use((req, res, next) => {
//   if (req.url == "/libraries" || req.url == "/authors") {
//     req.status = true;
//   } else {
//     req.status = false;
//   }
//   next();
// });

const checkPermission = (req, res, next) => {
  if (req.params.id == "librarian" || req.params.id == "author") {
    req.status = true;
  } else {
    req.status = false;
  }
  next();
};

app.get("/books", (req, res) => {
  res.status(200).json({
    route: req.url,
  });
});

app.get("/libraries", checkPermission, (req, res) => {
  res.status(200).json({
    route: req.url,
    permission: req.status,
  });
});
app.get("/libraries/:id", checkPermission, (req, res) => {
  res.status(200).json({
    route: req.url,
    permission: req.status,
  });
});

app.get("/authors", checkPermission, (req, res) => {
  res.status(200).json({
    route: req.url,
    permission: req.status,
  });
});
app.get("/authors/:id", checkPermission, (req, res) => {
  res.status(200).json({
    route: req.url,
    permission: req.status,
  });
});

module.exports = app;
