const { sql, poolPromise, executeSql } = require('../db');
import { Provides } from "typescript-ioc";
import {  StringBuilder } from 'typescript-string-operations';
@Provides(UserService)
export class UserService {

    public async getUserInfoByToken(id: number):Promise<object> {
        let pool;
        try {
            const serviceName = 'getUserInfoByToken'
            console.log(`#### %s ####`, serviceName);
            pool = await poolPromise
            var queryString = new StringBuilder();
            queryString.Append(` 
            SELECT 
                u.username,
                u.name,
                u.surname,
                u.email,
                u.address,
                u.phone,
                u.classify,
                u.salary
            FROM test.[user] u
            WHERE id =@id and flag_enable=1
            `);
           // console.log('SQL =', queryString.ToString())
            let result = await pool.request()
            .input('id', sql.BigInt, id)
            .query(queryString.ToString())
            return result.rowsAffected >= 1 ? result.recordset[0]:{};
        } catch (error) {
            console.log('error. =', error)
            console.log(error);
            throw new Error();
        } finally {
            //sql.close()
        }
    }


}
