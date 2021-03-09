const connData = {
    host: process.env.APP_DB_HOST || '127.0.0.1',
    port: process.env.APP_DB_PORT || 3306,
    database: process.env.APP_DB_NAME || 'freshworks_selection_test',
    user: process.env.APP_DB_USER || 'root',
    password: process.env.APP_DB_PASSWORD || 'toor',
    ssl: true,
}

export default {
    client: 'mysql',
    connection: connData
}