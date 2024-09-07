import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    }

    // Save user ID for use in the next middleware
    req.userId = decoded.id;
    next();
  });
};
