const db = require('../model/Database')

module.exports = {
  async add(req, res) {
    const phone = req.body;
    const id = phone[0].cli_id;
    for (let i in phone) {
      const sql = "INSERT INTO Telefone (cli_id, tel_tipo, tel_numero) VALUES(?,?,?)";
      const values = [
        id, phone[i].tel_tipo, phone[i].tel_numero
      ]
      await db.conect();
      const result = await db.handle(sql, values);
      console.log(result);
    }
  },

  async edit(req, res) {
    const phone = req.body;
    const id = phone[0].cli_id;
    for (let i in phone) {
      const sql = "UPDATE Telefone SET cli_id=?, tel_tipo=?, tel_numero=? WHERE tel_id = ?";
      const values = [
        id, phone[i].tel_tipo, phone[i].tel_numero, phone[i].tel_id
      ]
      await db.conect();
      const result = await db.handle(sql, values);
      console.log(result);
    }
  },

  async listByClient(req, res) {
    const { id } = req.params;
    const sql = "SELECT * FROM Telefone WHERE cli_id = ?";
    const values = [id];
    await db.conect();
    const result = await db.query(sql, values);
    return res.json(result.data);
  }
}