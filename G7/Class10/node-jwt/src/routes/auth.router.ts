import { Router, Request, Response } from "express";
import validateRegisterDto, { RegisterDto } from "../dto/register.dto";
import { userMongoModel } from "../schemas/user.schema";
import bryptjs from "bcryptjs";
import validatLoginDto, { LoginDto } from "../dto/login.dto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const authRouter = Router();

/**
 * User Registration Endpoint
 */
authRouter.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body as RegisterDto;

  try {
    // DONE:  1. Validate request body
    await validateRegisterDto.validateAsync({ email, password });
    // DONE: 2. Check if there is already user with that email
    const existingUser = await userMongoModel.findOne({ email });
    if (existingUser) {
      res.status(400).send({ message: "User with that email already exists" });
      return;
    }
    // DONE: 3. Hash the password
    // Hash the password with bcrypt
    // The second parameter is the "salt rounds" - higher numbers = more secure but slower
    // Salt is random data added to the password before hashing to prevent rainbow table attacks
    const SALTS = 10;
    const hashedPassword = await bryptjs.hash(password, SALTS);

    // DONE: 4. Save a user using the hashed password
    const user = {
      email,
      password: hashedPassword,
    };

    const userDocument = new userMongoModel(user);
    await userDocument.save();
    // DONE: 5. Return correct response to the user
    res.status(201).send({ message: "Registered success." });
  } catch (error) {
    console.error(error);
    // TODO: Handle errors (JOI)
    res.status(500).send({ message: "Something went wrong" });
  }
});

/**
 * User Login Endpoint
 */

authRouter.post("/login", async (req: Request, res: Response) => {
  // DONE: 1. Validate request body
  const { email, password } = req.body as LoginDto;
  try {
    await validatLoginDto.validateAsync({ email, password });
    // DONE: 2. Check if user with that email exists
    const user = await userMongoModel.findOne({ email }); //  { email: email }
    if (!user) {
      res.status(400).send({ message: "Invalid credentials" });
      return;
    }
    // DONE: 3. Check if the password is the same
    const isPasswordValid = await bryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).send({ message: "Invalid credentials" });
    }
    // DONE: 4. Create & sign the token
    // Create JWT token
    // JWT has three parts:
    // 1. Header: Algorithm and token type
    // 2. Payload: Data (user info)
    // 3. Signature: Header + Payload + Secret, encrypted
    const accessToken = jwt.sign(
      { email: user.email, userId: user._id }, // Payload
      JWT_SECRET, // Secret key from environment variables
      { expiresIn: "1h" } // Token expiration time
    );

    // DONE: 5. Return the token to the client
    res.send({ message: "Login successfully", token: accessToken });
  } catch (error) {
    console.error(error);
    // TODO: Handle errors (JOI)
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default authRouter;
