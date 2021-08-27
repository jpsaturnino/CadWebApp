const db = require('../model/Database')

module.exports = {
  async add(req, res) {
    const { cli_id, tipo, numero } = req.body;
    const sql = "INSERT INTO Telefone (cli_id, tel_tipo, tel_numero) VALUES(?,?,?)";
    const values = [
      cli_id, tipo, numero
    ]
    await db.conect();
    await db.handle(sql, values);
  },

  async listByClient(req, res) {
    const { cli_id } = req.body;
    const sql = "SELECT * FROM Telefone WHERE cli_id = ?";
    const values = [cli_id];
    await db.conect();
    const result = await db.query(sql, values);
    return res.json(result.data);
  }
}