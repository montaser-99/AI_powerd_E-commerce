import express from 'express'
import auth from '../../middlewares/authenticate.js'
import authorize from '../../middlewares/authorize.js'
import { Register,Login,refreshTokenController} from './authentication.controller.js'

const router = express.Router()

router.post("/register",Register)
router.post("login",Login)
router.post("/refresh-token",refreshTokenController)




export default router