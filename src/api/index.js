const bodyParser = require("body-parser");
const axios = require("axios");

app.get("/tasks", (req, res) => {
  return res.json(dummyArray).status(200);
});

app.get("/tasks/:id", (req, res) => {
  let filter = dummyArray.filter((w) => {
    return w.id == req.params.id;
  });

  if (filter.length > 0) return res.json(filter[0]).status(200);

  return res.json(null).status(200);
});

app.get("/types", (req, res) => {
  axios
    .get("https://53lsdx4cm6.execute-api.us-east-1.amazonaws.com/dev/task-type")
    .then((result) => {
      return res.json(result.data);
    })
    .catch((err) => {
      return res.statusCode(400);
    });
});
