import { Webhook } from "svix";
import { NextApiRequest, NextApiResponse } from "next";
import { WebhookEvent } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("RECEIVED WEBHOOK REQUEST");

  const CLERK_WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers from the req object
  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).send("Error occurred -- no svix headers");
  }

  // Get the body
  const body = JSON.stringify(req.body);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Error occurred");
  }

  if (evt) {
    try {
      if (evt.type === "user.updated") {
        console.log("USER UPDATED");
        console.log(evt);
        // Perform database action
      }

      // Same for user.created and user.deleted

      return res.status(201).send("");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error occurred -- processing webhook data");
    }
  }
}
