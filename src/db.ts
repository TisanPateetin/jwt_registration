const sql = require('mssql')
import conf from './config/db.conn';

const poolPromise = new sql.ConnectionPool(conf)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql,
  poolPromise
}