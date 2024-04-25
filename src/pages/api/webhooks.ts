// @ts-ignore
import { prisma } from "../../../lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, username, phone_number } = evt.data;

    await prisma.comment.upsert({
      where: { externalId: id as string },
      create: {
        externalId: id as string,
        email: first_name as string,
        firstName: first_name as string,
        lastName: last_name as string,
        phone: phone_number as string,

        username: username as string,
      },
      update: {
        email: first_name as string,
        firstName: first_name as string,
        lastName: last_name as string,
        phone: phone_number as string,

        username: username as string,
      },
    });
  }
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
