import type { SessionCreatedResponse } from '@/server/lib/schema/apiResponse/webhooks/sessionCreated';

import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(request: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET_CREATED_SESSION =
    process.env.WEBHOOK_SECRET_CREATED_SESSION;

  let response: SessionCreatedResponse = {
    data: {
      abandon_at: 0,
      client_id: '',
      created_at: 0,
      expire_at: 0,
      id: '',
      last_active_at: 0,
      object: 'session',
      status: '',
      updated_at: 0,
      user_id: '',
    },
    errorMessage: [],
  };

  if (!WEBHOOK_SECRET_CREATED_SESSION) {
    response = {
      ...response,
      errorMessage: [
        'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
      ],
    };
    return NextResponse.json(response, { status: 400 });
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
  const wh = new Webhook(WEBHOOK_SECRET_CREATED_SESSION);

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
      errorMessage: ['Error verifying webhook'],
    };
    return NextResponse.json(response, {
      status: 400,
    });
  }

  console.log(`Webhook with and ID of ${evt.data.id} and type of ${evt.type}`);
  console.log('Webhook body:', body);
  response = {
    ...response,
    data: evt.data as unknown as SessionCreatedResponse['data'],
  };

  return NextResponse.json(response);
}
