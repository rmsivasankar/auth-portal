import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const loginAttempts = await prisma.loginAttempt.findMany({
      orderBy: { attemptTime: "desc" },
      take: 20,
    });

    return NextResponse.json({ success: true, loginAttempts });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching logs" }, { status: 500 });
  }
}
