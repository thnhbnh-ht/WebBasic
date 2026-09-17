import * as userRepository from "../repository/user.repository.js";
import { ConflictError, UnauthorizedError, NotFoundError } from "../core/error.response.js";
import { hashPassword, comparePassword } from "../utils/password.helper.js";
import { generateTokens } from "../utils/jwt.helper.js";

export const register = async ({ name, email, password, age, role }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError("Email này đã được sử dụng!");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
    age,
    role: role || "MEMBER",
  });

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  console.log(">>> User tìm thấy trong DB:", user);
  if (!user) {
    throw new UnauthorizedError("Email hoặc mật khẩu không chính xác!");
  }

  const isMatch = await comparePassword(password, user.password);
  console.log(">>> Kết quả so khớp mật khẩu isMatch:", isMatch);
  if (!isMatch) {
    throw new UnauthorizedError("Email hoặc mật khẩu không chính xác!");
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const {accessToken, refreshToken} = generateTokens(tokenPayload);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const getMe = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new NotFoundError("Người dùng không còn tồn tại trên hệ thống!");
  }
  return user;
};