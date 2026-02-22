interface GeneratePayload {
  imageBase64: string;
  mode: 'pets' | 'humans';
  stylePrompt: string;
}

interface GenerateResponse {
  imageUrl?: string;
  imageBase64?: string;
}

export async function generatePortraitViaApi(payload: GeneratePayload): Promise<string | null> {
  const apiUrl = import.meta.env.VITE_AI_API_URL;
  const apiKey = import.meta.env.VITE_AI_API_KEY;

  // Placeholder for your AI provider key/url. Add both env vars to activate API generation.
  if (!apiUrl || !apiKey) {
    return null;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('AI API request failed');
  }

  const data = (await response.json()) as GenerateResponse;

  if (data.imageUrl) return data.imageUrl;
  if (data.imageBase64) return data.imageBase64;

  return null;
}
