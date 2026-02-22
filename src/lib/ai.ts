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
  const apiUrl = import.meta.env.VITE_AI_API_URL || '/api/ai/generate';

  // For security: API keys must stay on backend.
  if (!apiUrl) {
    return null;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
