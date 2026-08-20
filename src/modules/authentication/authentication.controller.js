import { register,login,refreshAccessToken } from "./authentication.service.js";


 export const Register = async(req,res)=>{
    try{
        const data = req.body
        const user = await register(data)
        return res.status(201).json({message:"User registered successfully",user})

     }catch (error){
        return res.status(500).json({message:"error message"})
    }
    
}

export const Login = async (req, res) => {
  try {
    const data = req.body
    const result = await login(data);

    return res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const accessToken = await refreshAccessToken(refreshToken);

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};