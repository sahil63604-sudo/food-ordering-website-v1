const JWT=require('jsonwebtoken')
async function controlLogin(req,res) {


const {email,password}=req.body;
const {EMAIL,PASSWORD}=process.env
    
    let token=JWT.sign(
        {id:PASSWORD,email:EMAIL},
        process.env.JWT_SECRET,
        {expiresIn:"10m"}
    )
    if (email==EMAIL && password==PASSWORD) {
               console.log(token);
               
            res.status(200).json({
            message:"login succesfull",
            token})
           res.cookie("token", token, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000, // 10 minutes
    sameSite: "lax",
    path: "/",
  });
        
    }else{
        res.status(401).json({
            message:'wrong email and password'
        })
    }
    
}
module.exports={controlLogin}