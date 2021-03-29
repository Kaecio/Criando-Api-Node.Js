
const Validation = require("../validator/validator");
const repository = require("../repositories/prduct-repository");

// traz tudo filtrando pelos "title price slug"
exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Falha ao processar a sua requisição" });
  }
};

// traz pelo slug
exports.getBySlug = async (req, res, next) => {
  try {
    const data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (error) {
    console.log('caiu slug')
    res.status(500).send({ message: "Falha ao processar a sua requisição pelo slug" });
  }
};

// traz pelo id
exports.getById = async (req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Falha ao processar a sua requisição pelo id" });
  }
};

// traz pela tag
exports.getByTag = async (req, res, next) => {
  try {
    const data = await repository.getByTag(req.params.tag);
    console.log(data)
    res.status(200).send(data);
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Falha ao processar a sua requisição de tag" });
  }
};

// inserir dados
exports.post = async (req, res, next) => {
  let validationProduct = new Validation();
  validationProduct.hasMinlen(
    req.body.title,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );
  validationProduct.hasMinlen(
    req.body.slug,
    3,
    "O slug deve conter pelo menos 3 caracteres"
  );
  validationProduct.hasMinlen(
    req.body.description,
    3,
    "A descrição deve conter pelo menos 3 caracteres"
  );

  if (!validationProduct.isValid()) {
    res.status(400).send(validationProduct.errors()).end();
    return;
  }

  try {
    await repository.create(req.body);
    res.status(201).send({ message: "Produto codastrado com sucesso" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Falha ao cadastrar produto" });
  }
};

// atualiza o produto
exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(201).send({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Falha ao atualizar produto", data: error });
  }
};

// excuindo o profuto
exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(201).send({ message: "Produto excluido com sucesso" });
  } catch (error) {
    res.status(400).send({ message: "Falha ao remover produto", data: error });
  }
};
