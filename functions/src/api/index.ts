import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as express from "express";
import registerHelloWorldRoutes from "./routes/hello-world";
import registerMessagesRoutes from "./routes/messages";

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

registerHelloWorldRoutes(app);
registerMessagesRoutes(app);

export default app;
