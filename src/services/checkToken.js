import jwt from 'jsonwebtoken'
import { secret } from '../constants/constants.js'

export default function (req, res, next) {
  let token = req.headers['authorization-token'];
  if(token) {
    jwt.verify(token, secret, function(err, decoded) {
      if(err) {
        res.status(403).send({ success: false, message: 'Forbidden Error: Failed to authenticate.'})
      } else {
        next()
      }
    })
  } else{
    res.status(401).send({ success: false, message: 'Unauthorized Error: no token provided.'})
  }
}
