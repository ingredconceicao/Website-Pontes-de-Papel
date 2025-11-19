export const config ={
    port : process.env.PORT || 3000,
    mongo_uri : process.env.MONGO_URI ||'ac-jqnjios-shard-00-00.vwqqvgx.mongodb.net',
    jwt_secret : process.env.JWT_SECRET ||'secret',
    node_env : process.env.NODE_ENV ||'development'
}