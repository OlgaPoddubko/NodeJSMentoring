import jwt from 'jsonwebtoken'
import { accounts, secret } from '../constants/constants.js'

export default function(req, res){
  console.log(req.body.login, req.body.password)
  const account = accounts.find( account => account.login === req.body.login );
  if(account === undefined || account.password !== req.body.password) {
    res.status(403).send({ success: false, message: "Bad login/password"})
  } else {
   const payload = { id: `${req.body.login}_${req.body.password}` }

   const token = jwt.sign(payload, secret, { expiresIn: 30000000 });

   res.send(token);
  }
}
