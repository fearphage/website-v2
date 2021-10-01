import type * as express from "express";

export default function reqisterHelloWorld(app: express.Application) {
  app.get("/hello-world", (_, res) => {
    res.json({ message: "Hello from Firebase!" });
  });
}
