import bcrypt from 'bcrypt'
import userModel from "../Models/User.mjs";
import jwt from 'jsonwebtoken'
export let signup = async (req,res) => {
  try {
    const {name,email,password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
      return res.status(409).json({message : 'User is already existed,you can login',success:false})
    }
    const model = new userModel({name,email,password});
    model.password = await bcrypt.hash(password,10);
    await model.save();
    res.status(201).json({
      message : 'Signup successfully',
      success : true,
    })
  } catch (error) {
    res.status(500).json({
        message : 'Internal Server Error',
        success : false,
      })
    
  }
}
export let login = async (req,res) => {
  try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    const errMsg = 'Auth failed, email or password is wrong';
    if(!user){
      return res.status(409).json({message : errMsg,success:false});
    }
    let isPassEqual = await bcrypt.compare(password,user.password);
    if(!isPassEqual){
      return res.status(409).json({message : errMsg,success:false});
    }
    let jwtToken = jwt.sign(
      {email : user.email},
      process.env.JWT_SECRET,
      {expiresIn:'24h'}
    )
    res.status(200).json({
      message : 'Login successfully',
      success : true,
      jwtToken,
      email,
      name:user.name,
    })
  } catch (error) {
    res.status(500)
      .json({
        message : 'Internal Server Error',
        success : false,
      })
    
  }
}