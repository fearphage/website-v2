import * as functions from "firebase-functions";
import app from "./api";
export * as messages from "./db-hooks/messages";

export const api = functions.https.onRequest(app);
