const jwt=require('jsonwebtoken')

const generateTokenAndSetCookie=(res,userId)=>{
  const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"10m",
  })
  res.cookie("token",token,{
    httpOnly:true,
    secure: process.env.NODE_ENV==="production",
    sameSite:"strict",
    maxAge:1000*60*10,
  })
  return token;
}

module.exports = generateTokenAndSetCookie;