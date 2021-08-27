const db = require('../model/Database')

module.exports = {
  async add(req, res) {
    const { rua, numero, cep, cidade, estado, bairro } = req.body;
    const sql = "INSERT INTO Endereco (end_rua, end_numero, end_cep, end_cidade, end_estado, end_bairro) " +
      " VALUES(?,?,?,?,?)";
    const values = [
      rua, numero, cep, cidade, estado, bairro
    ]
    await db.conect();
    await db.handle(sql, values);
  },
}