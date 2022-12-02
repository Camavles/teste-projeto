const path = require("path")
const dotenv = require("dotenv")

const loadEnv = () => {
    const env = dotenv.config({
        path: path.resolve(__dirname, ".env.test")
    })

    if (env.err) throw err
    process.env = Object.assign(process.env, env.parsed)
}

loadEnv()


