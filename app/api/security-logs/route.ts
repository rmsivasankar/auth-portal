import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { type, message } = await req.json();
    
    if (!type || !message) {
      return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 });
    }

    // Check if attack type already exists in DB
    const existingLog = await prisma.securityLog.findFirst({
      where: { type },
    });

    if (existingLog) {
      // If attack exists, update count
      await prisma.securityLog.update({
        where: { id: existingLog.id },
        data: { count: existingLog.count + 1 },
      });
    } else {
      // If new attack, insert record
      await prisma.securityLog.create({
        data: { type, message, count: 1 },
      });
    }

    return NextResponse.json({ success: true, message: "Security alert logged" });
  } catch (error) {
    console.error("Error storing alert:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
