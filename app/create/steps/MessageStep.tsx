// MessageStep.tsx
'use client'
import { useState, useEffect } from 'react';

interface MessageStepProps {
  initialData?: string;
  onBack: () => void;
  updateData: (data: any) => void;
  handleSubmit: () => Promise<void>;
}

export function MessageStep({ initialData, updateData, handleSubmit }: MessageStepProps) {
  const [message, setMessage] = useState(initialData || '');
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const MAX_CHARS = 400;

  useEffect(() => {
    if (initialData) {
      setMessage(initialData);
    }
  }, [initialData]);

  const handleChange = (value: string) => {
    if (value.length <= MAX_CHARS) {
      setMessage(value);
      updateData(value);
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    
    setGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiPrompt })
      });

      if (!response.ok) {
        throw new Error('Failed to generate message');
      }

      const data = await response.json();
      setMessage(data.message);
      updateData(data.message);
      setAiPrompt(''); // Clear the prompt after successful generation
    } catch (error) {
      setError('Failed to generate message. Please try again.');
      console.error('Generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await handleSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 max-w-[1170px] mx-auto">
      <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-10 text-center">
        What would you like to say?
      </h1>

      <div className="w-full max-w-[905px]">
        <div className="flex flex-col items-end w-full mb-10">
          <textarea
            value={message}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full min-h-[467px] p-6 rounded-xl border border-black border-solid bg-white bg-opacity-20 shadow-[0px_4px_4px_rgba(9,9,9,0.26)] font-['Consolas']"
            placeholder="Type your message here."
          />
          <div className="mt-2 text-zinc-500">
            {message.length}/{MAX_CHARS} characters
          </div>
        </div>

        <div className="flex flex-col items-end w-full">
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            disabled={message.length > 0}
            className={`w-full min-h-[182px] p-6 rounded-xl border border-black border-solid bg-white bg-opacity-20 shadow-[0px_4px_4px_rgba(9,9,9,0.26)] font-['Consolas']
              ${message.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder={message.length > 0 ? "Clear the message above to use AI generation" : "Write your prompt here"}
          />
          {error && <p className="mt-2 text-red-500">{error}</p>}
          <button
            onClick={generateWithAI}
            disabled={generating || message.length > 0 || !aiPrompt.trim()}
            className={`mt-4 px-8 py-3 rounded-full border border-black text-xl font-['Consolas'] transition-colors
              ${(generating || message.length > 0 || !aiPrompt.trim()) 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-50'}`}
          >
            {generating ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>

        <button
          onClick={onSubmit}
          disabled={loading || !message.trim()}
          className="mt-8 w-full px-8 py-3 rounded-full border border-black text-xl font-['Consolas'] bg-white hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
        >
          {loading ? 'Sending...' : 'Send Postcard'}
        </button>
      </div>
    </div>
  );
}