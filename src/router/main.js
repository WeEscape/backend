const router = require("express").Router();

router.get("/", (req, res) => {
  res.send(`hello world <br>port : ${process.env.PORT} <br>userId : ${req.userId}`);
});

module.exports = router;