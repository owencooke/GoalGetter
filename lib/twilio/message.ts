import { Goal } from "@/types/goals";
import { client, messagingServiceSid } from "./config";
import { Parent } from "@/types/parent";

export async function sendGoalCompleteTextToParent(parent: Parent, goal: Goal) {
  const messageBody = `🎉 Congratulations! Your child has completed one of their goals:\n\n 
  📋 "${goal.title}"!\n\n
  Make sure to tell them to keep up the great work! 🌟`;
  try {
    const message = await client.messages.create({
      body: messageBody,
      messagingServiceSid: messagingServiceSid,
      to: parent.phoneNumber,
    });
    return message;
  } catch (error: any) {
    console.error("Error sending SMS:", error);
  }
}
