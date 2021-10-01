import type * as express from "express";
import * as admin from "firebase-admin";

admin.initializeApp();

export default function registerMessages(app: express.Application) {
  app.post("/message", async (req, res) => {
    console.log(req.body);
    // Grab the text parameter.
    const original = req.body.text || "failed";
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin
      .firestore()
      .collection("messages")
      .add({ original });
    // Send back a message that we've successfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  });
}
