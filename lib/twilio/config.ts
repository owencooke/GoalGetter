import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
export const messagingServiceSid = process.env.TWILIO_SERVICE_SID;

if (!accountSid || !authToken || !messagingServiceSid) {
  throw new Error("Twilio credentials are not set in environment variables");
}

export const client = twilio(accountSid, authToken);
