import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  const refreshToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: "7d", 
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};