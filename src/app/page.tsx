import { getTodayPrompt } from "@/lib/prompts-data";
import { PageClient } from "./page-client";

export default async function Home() {
  const prompt = getTodayPrompt();
  return <PageClient prompt={prompt} />;
}
