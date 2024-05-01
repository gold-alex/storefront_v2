import { prisma } from "../../../lib/db";

import { Webhook } from "svix";
import { buffer } from "micro";
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = "whsec_1DDBxnqmAHXGYv7lGFBvV2+bIR/O9SaN";

export default async function handler(req, res) {
  const payload = (await buffer(req)).toString();

  const headers = req.headers;

  const wh = new Webhook(webhookSecret);
  let msg;

  try {
    msg = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({});
  }

  const eventType = msg.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      email_addresses: [{ email_address }],
      id,
      first_name,
      last_name,
      username,
      unsafe_metadata: { birthday },
    } = msg.data;
    const { phone_number } = msg.data.phone_numbers[0];

    await prisma.user.upsert({
      where: { externalId: id },
      create: {
        externalId: id,
        email_address: email_address,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number ? phone_number : "missing",
        birthday: birthday ? birthday : "missing",
        username: username,
      },
      update: {
        email_address: email_address,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number ? phone_number : "missing",
        birthday: birthday ? birthday : "missing",
        username: username,
      },
    });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
