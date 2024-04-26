// @ts-ignore
import { prisma } from "../../../lib/db";
import { Webhook } from "svix";
import { buffer } from "micro";
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.WEBHOOK_SECRET || "";

export default async function handler(req, res) {
  const payload = (await buffer(req, res)).toString();
  const headers = req.headers;

  const wh = new Webhook(webhookSecret);
  let msg;

  try {
    msg = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({});
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

    await prisma.comment.upsert({
      where: { externalId: id },
      create: {
        externalId: id,
        email: email_address,
        firstName: first_name,
        lastName: last_name,
        phone: phone_number ? phone_number : "missing",

        username: username,
      },
      update: {
        email: first_name,
        firstName: first_name,
        lastName: last_name,
        phone: phone_number ? phone_number : "missing",

        username: username,
      },
    });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
