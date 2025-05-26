import { Router, Request, Response } from "express";
import { AuthRequest, verifyToken } from "../middlewares/auth.guard";

const protectedRouter = Router();

protectedRouter.use(verifyToken);

protectedRouter.get("/profile", (req: AuthRequest, res: Response) => {
  const user = req.user;

  console.log("USER", user);

  res.json({
    message: "Your profile",
    email: user?.email,
  });
});

protectedRouter.get("/protected", async (req: AuthRequest, res: Response) => {
  res.send([{ id: 1, title: "Title" }]);
});

export default protectedRouter;
