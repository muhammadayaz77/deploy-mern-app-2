import { ensureAuthenticated } from "../Middlewares/Auth.mjs";
import express from 'express'
let router = express.Router();


router.get('/',ensureAuthenticated,(req,res) => {
  console.log(req.user);
  res.status(200).json([
  {
    name : 'mobile',
    price : 10000,
  },
  {
    name : 'tv',
    price : 20000,
  }
  ]
)
});

export default router;