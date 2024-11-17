import express from 'express'
import dotenv from 'dotenv'
import mongoDB from './Models/db.mjs';
import cors from 'cors'
import AuthRouter from './Routes/AuthRoutes.mjs'
import ProductRouter from './Routes/ProductRouter.mjs'
dotenv.config();
mongoDB(); 
let app = express();

let PORT = process.env.PORT;

app.get('/ping',(req,res) => {
  res.send("PONG");
})
app.use(express.json());
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)
app.listen(PORT,() =>{
  console.log(`http://localhost:${PORT}`);
})