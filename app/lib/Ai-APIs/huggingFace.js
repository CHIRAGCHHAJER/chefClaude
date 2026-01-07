// lib/huggingface.js
export async function askHuggingFace(question) {
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: question }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch answer from Hugging Face');
  }

  const data = await response.json();
  return data.result;
}
