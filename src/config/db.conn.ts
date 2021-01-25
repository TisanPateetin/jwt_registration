//export default `Server=tcp:bpdevdbsql1.database.windows.net,1433;Initial Catalog=masterdata;Persist Security Info=False;User ID='masterdatasys';Password='rbcKnau7G2wL';MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`;
import env from '../env';

const config = {
    server: env.DB_HOST, 
    database: env.DB_DB,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        max: 20,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

export default config;
