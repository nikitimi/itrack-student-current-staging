// TODO: Make ReadableStream converted into Blob.
export async function POST(request: Request) {
  if (request.headers.get("content-type") === null || request.body === null)
    return Response.json(
      { data: [], error: "No provided file" },
      { status: 411 }
    );

  return Response.json({ data: [], error: "" });
}
