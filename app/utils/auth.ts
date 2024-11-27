import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function authenticateAPI(req: NextRequest): Promise<boolean> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  return !!token;
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
