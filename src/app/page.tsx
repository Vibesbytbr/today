import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getTodaySortOrder } from "@/lib/prompt-cycle";
import { PageClient } from "./page-client";

export default async function Home() {
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
      }
    }

    let userResponse = null;
    if (session?.user?.id && prompt) {
      userResponse = await prisma.userResponse.findUnique({
        where: {
          userId_promptId: {
            userId: session.user.id,
            promptId: prompt.id,
          },
        },
      });
    }

    return (
      <PageClient
        prompt={
          prompt
            ? {
                id: prompt.id,
                date: prompt.date.toISOString(),
                actionPrompt: prompt.actionPrompt,
                scriptureRef: prompt.scriptureRef,
                scriptureText: prompt.scriptureText,
                sortOrder: prompt.sortOrder,
              }
            : null
        }
        userResponse={
          userResponse
            ? {
                id: userResponse.id,
                userId: userResponse.userId,
                promptId: userResponse.promptId,
                status: userResponse.status as "DONE" | "HARD" | "NOT_RELEVANT" | null,
                note: userResponse.note,
                createdAt: userResponse.createdAt.toISOString(),
                updatedAt: userResponse.updatedAt.toISOString(),
              }
            : null
        }
      />
    );
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
    return <PageClient prompt={null} userResponse={null} />;
  }
}
