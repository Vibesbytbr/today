import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prompts = await prisma.dailyPrompt.findMany({
    orderBy: { date: "desc" },
    include: {
      responses: {
        where: { userId: session.user.id },
      },
    },
  });

  const data = prompts.map((p) => ({
    ...p,
    userResponse: p.responses[0] ?? null,
    responses: undefined,
  }));

  return NextResponse.json({ prompts: data });
}
