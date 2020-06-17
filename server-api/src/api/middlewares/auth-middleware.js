import Router from 'express'
import {verifyToken} from '../../services/jwt-service'

const AuthMiddleware = Router()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
AuthMiddleware.post('/', async (req, res, next) => {
    const token = req.body.accessToken
    if (token) {
        console.log(token);
        try {
            const decoded = await verifyToken(token, accessTokenSecret)
            console.log(decoded);
            req.jwtDecoded = decoded
            next()
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({
                message: "Failed"
            })
        }
    } else {
        return res.status(403).json({
                message: "No token provided"
        })
    }
})

export default AuthMiddleware