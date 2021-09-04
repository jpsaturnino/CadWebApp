const db = require('../model/Database')

module.exports = {
  async add(req, res) {
    const address = req.body;
    const id = address[0].cli_id;
    for (let i in address) {
      const sql = "INSERT INTO Endereco (cli_id, end_rua, end_numero, end_cep, end_cidade, " +
        "end_estado, end_bairro) VALUES(?,?,?,?,?,?,?)";
      const values = [
        id, address[i].end_rua, address[i].end_numero, address[i].end_cep,
        address[i].end_cidade, address[i].end_estado, address[i].end_bairro
      ]
      await db.conect();
      const result = await db.handle(sql, values);
      console.log(result);
    }
  },

  async edit(req, res) {
    const address = req.body;
    const id = address[0].cli_id;
    for (let i in address) {
      const sql = "UPDATE Endereco SET cli_id=?, end_rua=?, end_numero=?, end_cep=?, end_cidade=?, " +
        "end_estado=?, end_bairro=? WHERE end_id=?";
      const values = [
        id, address[i].end_rua, address[i].end_numero, address[i].end_cep,
        address[i].end_cidade, address[i].end_estado, address[i].end_bairro, address[i].end_id
      ]
      await db.conect();
      const result = await db.handle(sql, values);
      console.log(result);
    }
  },

  async listByClient(req, res) {
    const { id } = req.params;
    const sql = 'SELECT * FROM Endereco WHERE cli_id=?';
    const values = [id];
    await db.conect();
    const result = await db.query(sql, values);
    return res.json(result.data);
  }
}