import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ promptId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { promptId } = await params;
  const body = await req.json();
  const { status, note } = body;

  const existing = await prisma.userResponse.findUnique({
    where: {
      userId_promptId: {
        userId: session.user.id,
        promptId,
      },
    },
  });

  let response;
  if (existing) {
    response = await prisma.userResponse.update({
      where: { id: existing.id },
      data: {
        ...(status !== undefined && { status }),
        ...(note !== undefined && { note }),
      },
    });
  } else {
    response = await prisma.userResponse.create({
      data: {
        userId: session.user.id,
        promptId,
        status: status ?? null,
        note: note ?? null,
      },
    });
  }

  return NextResponse.json({ response });
}
