const { Router } = require("express");
const { user } = require('../config/db');
const { schema } = require('../zodType/test');
const router = Router();

router.post("/signup", async function (req, res) {
  const data = req.body;

  const parsedData = schema.safeParse(data);
  if (!parsedData.success) {
    res.status(400).send({ success: false, error: parsedData.error });
    return;
  }

  const users = await user.findOne({
    phoneNumber: data.phoneNumber
  });
  if (users) {
    res.status(409).send({ success: false, msg: "enter a new phone number" });
    return;
  }
  else {
    await user.create({
      name: data.name,
      phoneNumber: data.phoneNumber,
      password: data.password,
      email: data.email,
      money: 10000
    });
    res.status(201).send({
      success: true,
      msg: "user created"
    });
  }

});

module.exports = router;