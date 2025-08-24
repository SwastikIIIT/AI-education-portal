import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { systemPrompt } from "./systemPrompt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor=(subject:string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant=(voice:string,style:string,subject:string,topic:string,duration:number) => {
  //Voice configuration
  const voiceId = voices[voice as keyof typeof voices][
          style as keyof (typeof voices)[keyof typeof voices]
          ] || "sarah";

  //AI agent configuration
  const vapiAssistant: CreateAssistantDTO = {
    name: "AI Professor",
    firstMessage:
        "Hello, let's start the session. Today we'll be discusing on {{subject}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:systemPrompt(topic,subject,style,duration),
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };
  return vapiAssistant;
};