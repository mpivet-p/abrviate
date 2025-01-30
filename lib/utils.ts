import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getChatStorage(): Promise<ChatStorage | null> {
  return await storage.getItem('local:abrviateChat');
}

export async function setChatStorage(chat: ChatStorage) {
  await storage.setItem('local:abrviateChat', chat);
}

export interface ChatStorage {
  videoUrl: string;
  chatContent: string;
}