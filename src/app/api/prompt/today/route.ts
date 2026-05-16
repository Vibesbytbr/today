import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getTodaySortOrder } from "@/lib/prompt-cycle";

export async function GET() {
  try {
    const session = await auth();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let prompt = await prisma.dailyPrompt.findUnique({
      where: { date: today },
    });

    if (!prompt) {
      const sortOrder = getTodaySortOrder();
      const seed = await prisma.promptSeed.findUnique({
        where: { sortOrder },
      });

      if (seed) {
        prompt = await prisma.dailyPrompt.create({
          data: {
            date: today,
            actionPrompt: seed.actionPrompt,
            scriptureRef: seed.scriptureRef,
            scriptureText: seed.scriptureText,
            sortOrder: seed.sortOrder,
          },
        });
      } else {
        return NextResponse.json(
          { error: "No prompts available" },
          { status: 500 }
        );
      }
    }

    let userResponse = null;
    if (session?.user?.id) {
      userResponse = await prisma.userResponse.findUnique({
        where: {
          userId_promptId: {
            userId: session.user.id,
            promptId: prompt.id,
          },
        },
      });
    }

    return NextResponse.json({ prompt, userResponse });
  } catch (error) {
    console.error("Failed to fetch today's prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}
