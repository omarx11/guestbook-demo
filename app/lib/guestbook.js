import axios from "axios";
import { PATHNAME_URL } from "@/app/config/data";

/**
 * Post guestbook messages
 * @param message The user message.
 * @returns An array of messages.
 */
export async function postMessages(message) {
  const { data } = await axios.post(`${PATHNAME_URL}/api/guestbook`, {
    data: {
      message: message,
    },
  });
  return data;
}

/**
 * Fetches guestbook messages
 * @returns An array of messages.
 */
export async function getMessages() {
  const { data } = await axios.get(`${PATHNAME_URL}/api/guestbook`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
