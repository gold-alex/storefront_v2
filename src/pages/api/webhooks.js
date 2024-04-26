import { prisma } from "../../../lib/db";

import { Webhook } from "svix";
import { buffer } from "micro";
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.WEBHOOK_SECRET;

export default async function handler({ body, headers }) {
  let payload = body;
  // let headers = req.headers;

  const wh = new Webhook(webhookSecret);
  let msg;

  try {
    msg = wh.verify(payload, headers);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }

  const eventType = msg.type;
  if (eventType === "user.created") {
    const {
      email_addresses: [{ email_address }],
      id,
      first_name,
      last_name,
      username,
      phone_number,
    } = msg.data;

    await prisma.user.upsert({
      where: { externalId: id },
      create: {
        externalId: id,
        email_address: email_address,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number ? phone_number : "missing",

        username: username,
      },
      update: {
        email_address: email_address,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number ? phone_number : "missing",
        username: username,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
