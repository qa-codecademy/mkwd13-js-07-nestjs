import express, { Request, Response } from "express";
import { mongoConnection } from "./mongo-connection";
import authRouter from "./routes/auth.router";
import protectedRouter from "./routes/protected.router";
import postsRouter from "./routes/posts.router";

const server = express();
server.use(express.json());

server.get("/", (_req: Request, res: Response) => {
  res.send("Server is live");
});

server.use(authRouter);
server.use(protectedRouter);
server.use(postsRouter);

server.listen(3001, "localhost", async () => {
  console.log("Server is up and running.");
  await mongoConnection();
});
