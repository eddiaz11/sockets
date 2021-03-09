var express = require("express");
var router = express.Router();

const Joi = require("joi");
const Message = require("../models/message");

router.get("/", function (req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/", function (req, res, next) {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.create({ message: req.body.message, user: req.body.user, ts: Date.now() }).then(
    (result) => {
      res.send(result);
    }
  );
});

router.get("/:ts", (req, res) => {
  Message.findByPk(req.params.ts).then((response) => {
    if (response === null)
      return res
        .status(404)
        .send("The Message with the given ts was not found.");
    res.send(response);
  });
});

router.post("/", (req, res) => {
  const { error } = validateClient(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.create({ message: req.body.message, user: req.body.user, ts: Date.now() }).then(
    (result) => {
      res.send(result);
    }
  );
});

router.put("/:ts", (req, res) => {
  const { error } = validateClient(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.update(req.body, { where: { ts: req.params.ts } }).then((response) => {
    if (response[0] !== 0) res.send({ message: "Message updated" });
    else res.status(404).send({ message: "Message was not found" });
  });
});

router.delete("/:ts", (req, res) => {
  Message.destroy({
    where: {
      ts: req.params.ts,
    },
  }).then((response) => {
    if (response === 1) res.status(204).send();
    else res.status(404).send({ message: "Message was not found" });
  });
});

const validateMessage = (Message) => {
  const schema = Joi.object({
    massage: Joi.string().min(5).required(),
    user: Joi.string(),
  });

  return schema.validate(Message);
};

module.exports = router;