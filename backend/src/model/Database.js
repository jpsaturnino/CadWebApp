const mysql = require('mysql2/promise');

module.exports = new
    class Database {
        constructor() {
            this.err = "";
        }

        /*
            Conecta no banco de dados
        */
        async conect() {
            const config = {
                host: "localhost",
                user: "root",
                password: "PRjgg3DxzS3yyPg",
                database: "webapp"
            }
            try {
                this.connection = await new mysql.createConnection(config);
                return true;
            }
            catch (ex) {
                return false;
            }
        }

        /*
            Utilizado para consultas no banco de dados
        */
        async query(sql, values) {
            try {
                const [rows, fields] = await this.connection.execute(sql, values);
                return {
                    status: true,
                    data: rows
                }
            }
            catch (ex) {
                return {
                    status: false,
                    err: ex.code,
                    message: ex.message,
                    data: []
                };
            }
        }

        /*
            Utilizado para a manipulacao dos dados (insert, update, delete)
        */
        async handle(sql, values) {
            try {
                const [rows, fields] = await this.connection.execute(sql, values);
                if (rows.affectedRows > 0)
                    return {
                        status: true,
                        lastId: rows.insertId
                    }
                return {
                    status: false,
                    err: "NOT_ROWS"
                };
            }
            catch (ex) {
                return {
                    status: false,
                    err: ex.code,
                    message: ex.message
                }
            }
        }
    }