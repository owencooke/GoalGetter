import { Goal } from "@/types/goals";
import { client, messagingServiceSid } from "./config";
import { Parent } from "@/types/parent";

export async function sendGoalCompleteTextToParent(
  parent: Parent,
  goals: Goal[]
) {
  const goalTitles = goals.map((goal) => `📋 "${goal.title}"`).join("\n");
  const messageBody = `
🎉 Congratulations! ${parent.children[0].firstName} has completed their goal${
    goalTitles.length > 0 && "s"
  }:

${goalTitles}

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
