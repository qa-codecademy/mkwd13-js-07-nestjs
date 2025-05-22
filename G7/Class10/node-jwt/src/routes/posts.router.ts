import { Router, Response } from "express";
import { AuthRequest, verifyToken } from "../middlewares/auth.guard";

const postsRouter = Router();
postsRouter.use(verifyToken);

postsRouter.get("/posts", (req: AuthRequest, res: Response) => {
  const posts = [
    { id: 1, title: "Post 1", createdBy: "john_doe@mail.com" },
    { id: 2, title: "Post 2", createdBy: "john_doe@mail.com" },
    { id: 3, title: "Post 3", createdBy: "bob_bobski@mail.com" },
  ];

  const user = req.user;

  const filteredPosts = posts.filter((post) => post.createdBy === user?.email);

  res.send(filteredPosts);
});

export default postsRouter;
