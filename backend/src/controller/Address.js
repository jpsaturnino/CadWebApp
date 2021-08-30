const db = require('../model/Database')

module.exports = {
  async add(req, res) {
    const address = req.body;
    const id = address[0].cli_id;
    for (let i in address) {
      const sql = "INSERT INTO Endereco (cli_id, end_rua, end_numero, end_cep, end_cidade, end_estado, end_bairro) " +
        " VALUES(?,?,?,?,?,?,?)";
      const values = [
        id, address[i].rua, address[i].numero, address[i].cep,
        address[i].cidade, address[i].estado, address[i].bairro
      ]
      await db.conect();
      await db.handle(sql, values);
    }
  },

  async listByClient(req, res) {
    const id = req.query;
    const sql = 'SELECT * FROM Endereco WHERE cli_id=?';
    const values = [id];
    await db.conect();
    const result = await db.query(sql, values);
    return res.json(result.data);
  }
}