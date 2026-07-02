import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export async function askAI(
  message: string,
  source: string,
  destination: string,
  distance: string,
  time: string,
  weather: any,
  nearbyPlaces: any[]
) {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are SmartRoute AI.

Current Trip:

Source: ${source}
Destination: ${destination}
Distance: ${distance}
Travel Time: ${time}
Weather: ${weather?.description}
Nearby Places: ${nearbyPlaces.length}

Answer the user's question based on this trip.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return response.choices[0].message.content ?? "No response from AI.";
  } catch (err) {
    return "Unable to contact AI.";
  }
}