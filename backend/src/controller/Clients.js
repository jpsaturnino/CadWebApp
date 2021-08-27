const db = require('../model/Database')

module.exports = {
  async add(req, res) {
    const {
      id, nome, sobrenome, dataNasc, cpf, rg,
      facebook, instagram, linkedin, twitter
    } = req.body;
    const sql = "INSERT INTO Cliente (cli_id,cli_nome,cli_sobrenome,cli_dataNasc," +
      "cli_cpf,cli_rg,cli_facebook,cli_instagram,cli_linkedin,cli_twitter) " +
      " VALUES(?,?,?,?,?,?,?,?,?,?)";
    const values = [
      id, nome, sobrenome, dataNasc, cpf, rg,
      facebook, instagram, linkedin, twitter
    ];
    await db.conect();
    await db.handle(sql, values);
  },

  async list(req, res) {
    const sql = "SELECT * from Cliente"
    await db.conect();
    const clients = await db.query(sql);
    return res.json(clients.data);
  },

  async search(req, res) {
    const { nome } = req.query;
    const sql = "SELECT cli_nome, cli_sobrenome from Cliente WHERE cli_nome LIKE ? OR cli_sobrenome LIKE ?";
    const values = [nome, sobrenome];
    await db.conect();
    const result = await db.query(sql, values);
    return res.json(result.data);
  }
}