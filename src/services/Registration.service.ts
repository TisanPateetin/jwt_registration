import {  StringBuilder } from 'typescript-string-operations';
const { sql, poolPromise, executeSql } = require('../db');
import { Provides } from "typescript-ioc";

@Provides(RegistrationService)
export class RegistrationService {

    public async registerSave(regis: object) {
    
        let pool, tran;
        try {    
            pool = await poolPromise
            tran = new sql.Transaction(pool);
            await tran.begin();
            console.log(' regis ==', regis)
            const result = await new sql.Request(tran)
                .input('username', sql.NVarChar, regis['username'])
                .input('password', sql.NVarChar, regis['password'])
                .input('name', sql.NVarChar, regis['name'])
                .input('surname', sql.NVarChar, regis['surname'])
                .input('email', sql.NVarChar, regis['email'])
                .input('address', sql.NVarChar, regis['address'])
                .input('phone', sql.NVarChar, regis['phone'])
                .input('reference_code', sql.NVarChar, regis['reference_code'])
                .input('classify', sql.NVarChar, regis['classify'])
                .input('salary', sql.Decimal, regis['salary'])
                .query(`INSERT INTO test.[user]
                        (   username,
                            password,
                            name,
                            surname,
                            email,
                            address,
                            phone,
                            reference_code,
                            classify,
                            salary,
                            flag_enable,
                            updated_date,
                            created_date
                            )
                        VALUES
                        (   @username,
                            @password,
                            @name,
                            @surname,
                            @email,
                            @address,
                            @phone,
                            @reference_code,
                            @classify,
                            @salary,
                            1,
                            GETDATE(),
                            GETDATE()                            
                        );
                        SELECT SCOPE_IDENTITY() as ID;`);
            // await tran.rollback();
            await tran.commit();
            console.log('result-insert==', result.recordset[0])
            const recordId: number = result.recordset[0].ID;
            return recordId;
        } catch (error) {
            console.log('error==', error);
            await tran.rollback();
            console.log(error);
            throw new Error();
        }
    }

    public async checkDuplicateUsername( username: string):Promise<boolean> {
        let pool;
        try {
            const serviceName = 'checkDuplicateUsername'
            console.log(`#### %s ####`, serviceName);
            pool = await poolPromise
            var queryString = new StringBuilder();

            queryString.Append(` 
            SELECT u.username
            FROM test.[user] u
            WHERE username =@username
            `);
            console.log('SQL =', queryString.ToString())
            let result1 = await pool.request()
            .input('username', sql.NVarChar, username)
            .query(queryString.ToString())
            let flag: boolean = false
            if (result1.rowsAffected >= 1) {
                flag = true
            }
            return flag;
        } catch (error) {
            console.log('error. =', error)
            console.log(error);
            throw new Error();
        } finally {
            //sql.close()
        }
    }

    public async checkDuplicateEmail(email: string):Promise<boolean> {
        let pool;
        try {
            const serviceName = 'checkDuplicateEmail'
            console.log(`#### %s ####`, serviceName);
            pool = await poolPromise
            var queryString = new StringBuilder();

            queryString.Append(` 
            SELECT u.username
            FROM test.[user] u
            WHERE email=@email
            `);
            //console.log('SQL =', queryString.ToString())
            let result1 = await pool.request()
            .input('email', sql.NVarChar, email)
            .query(queryString.ToString())

            console.log('result recordsets=', result1.recordsets)
            let flag: boolean = false
            if (result1.rowsAffected >= 1) {
                flag = true
            }
            return flag;

        } catch (error) {
            console.log('error. =', error)
            console.log(error);
            throw new Error();
        } finally {
            //sql.close()
        }
    }
    
}