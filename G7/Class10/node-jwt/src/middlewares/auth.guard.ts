import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

export interface AuthRequest extends Request {
  user?: {
    email: string;
    userId: string;
  };
}

/**
 * Authentication middleware using JWT
 *
 * This middleware verifies that the request contains a valid JWT token
 * in the Authorization header before allowing access to protected routes.
 */

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // DONE: Check if the user provided the token
  const token = req.headers.authorization;

  if (!token) {
    res.status(403).send({ message: "Please login" });
    return;
  }

  const [, bearerToken] = token.split(" ");

  try {
    // DONE: If not return error for that
    // Verify the token's signature using the same secret key used to create it
    // jwt.verify() will:
    // 1. Check if the token was signed with our secret
    // 2. Check if the token has expired
    // 3. Decode the payload if everything is valid
    const payload = jwt.verify(bearerToken, JWT_SECRET) as {
      email: string;
      userId: string;
      iat: number;
      exp: number;
    };

    // Store the decoded user data in the request object for use in route handlers
    req.user = {
      email: payload.email,
      userId: payload.userId,
    }; // attach a user object (new property) to the request object

    // If token is valid, proceed to the protected route
    next();
  } catch (error) {
    // If token verification fails (expired or invalid), deny access
    res.status(403).send({ message: "Invalid token" });
  }
};
