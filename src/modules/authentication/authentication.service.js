import userModel from "../users/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { generateAccessToken,generateRefreshToken } from "../../utils/jwt.js";

export const register = async (data) => {
  const { first_name, last_name, email, password, phone } = data;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    phone,
  });

  return user;
};

export const login = async(data)=>{

  const {password,email}= data
  const user = await userModel.findOne({email}).select("+password")

  if(!email || !(await user.comparePssword(password))){
    throw new Error("Invalid email on password")}

    const isPasswordCorrect = await user.comparePssword(password)
    if(!isPasswordCorrect){
      throw new Error("Invalid email on password")}
    
const accessToken = generateAccessToken(user)
const refreshToken = generateRefreshToken(user)
return {
  user,
  accessToken,
  refreshToken
}
};

export const refreshAccessToken = async (refreshToken)=>{
  const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET)

  const user = await userModel.findById(decoded.userId)
  if(!user){
    throw new Error("User not found")
  }
  const accessToken = generateAccessToken(user)
  return accessToken

}