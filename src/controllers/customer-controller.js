const Validation = require("../validator/validator");
const repository = require("../repositories/customer-repository");
const md5 = require("md5");

const emailService = require("../services/email-services");

exports.post = async (req, res, next) => {
  let validationProduct = new Validation();
  validationProduct.hasMinlen(
    req.body.name,
    3,
    "O nome deve conter pelo menos 3 caracteres"
  );
  validationProduct.isEmail(req.body.email, "O email é inválido");
  validationProduct.hasMinlen(
    req.body.password,
    6,
    "O password deve conter pelo menos 6 caracteres"
  );

  if (!validationProduct.isValid()) {
    res.status(400).send(validationProduct.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    emailService.send(
      req.body.email,
      "bem vindo ao Node Store",
      global.EMAIL_TMPL.replace("{0}", req.body.name),
      console.log('caiu no emailService')
      );
    res.status(201).send({ message: "Cliente codastrado com sucesso" });
  } catch (error) {
    console.error("caiu no error");
    res.status(400).send({ message: "Falha ao cadastrar cliente" });
  }
};
