import type { WebHookResponse } from '@/server/lib/schema/apiResponse/webhooks';
import { EMPTY_STRING } from '@/utils/constants';

import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(request: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  let response: WebHookResponse = {
    data: EMPTY_STRING,
    errorMessage: [],
  };

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    response = {
      ...response,
      errorMessage: ['Error occured -- no svix headers'],
    };
    return NextResponse.json(response, {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    response = {
      ...response,
      errorMessage: ['Error occured in verifying svix payload.'],
    };
    return NextResponse.json(response, {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  switch (eventType) {
    // Put data indatabase for the admin side.
    case 'user.created':
      console.log('userId:', evt.data.id);
      break;
    case 'session.created':
      console.log(evt.data.id);
      break;
  }
  response = {
    ...response,
    data: 'Webhook success!',
  };
  return NextResponse.json(response, { status: 200 });
}
