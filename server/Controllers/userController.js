import connection from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = (req, res) => {
  const { name, email, password, mobile_no } = req.body;

  console.log(req.body);

  // First, check if the user already exists
  const checkUserQuery = "SELECT * FROM users WHERE mobile_no = ?";
  connection.query(checkUserQuery, [mobile_no], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      // User already exists
      return res.status(400).json({ error: "mobile no already exists" });
    }

    // If user does not exist, proceed with registration
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery =
      "INSERT INTO users (name, email, password,mobile_no) VALUES (?, ?,?, ?)";
    connection.query(
      insertUserQuery,
      [name, email, hashedPassword, mobile_no],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};

export const loginUser = (req, res) => {
  const { mobile_no, password } = req.body;

  // Find user by email
  const query = "SELECT * FROM users WHERE mobile_no = ?";
  connection.query(query, [mobile_no], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];

    // Check if the password matches
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null });
    }

    // Create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ auth: true, token, message: "Login Success" });
  });
};
