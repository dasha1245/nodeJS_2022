module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL,
    ACCESS_SECRET: process.env.ACCESS_SECRET || 'AccessWord',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'RefreshWord',
}