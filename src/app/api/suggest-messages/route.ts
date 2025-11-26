// // app/api/suggest-messages/route.ts
// import { google } from '@ai-sdk/google';
// import { generateText } from 'ai';

// export const runtime = "edge";

// export async function POST(req: Request) {
//   try {
//     console.log(process.env.GOOGLE_API_KEY);
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. Your output should look like: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'.";

//     const { text } = await generateText({
//       model: google('gemini-2.5-flash'),
//       prompt,
//     });

//     return new Response(JSON.stringify({ success: true, message: text }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (err) {
//     console.error("Gemini API Error:", err);

//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: "Failed to generate suggestions",
//       }),
//       { status: 500 }
//     );
//   }
// }


// app/api/suggest-messages/route.ts
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. Your output should look like: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'.";

    const result = await streamText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // STREAM response
    return result.toTextStreamResponse();

  } catch (err) {
     console.error("Gemini Stream Error:", err);

    return new Response(
      JSON.stringify({ success: false, error: "Stream failed" }),
      { status: 500 }
    );
  }
}
