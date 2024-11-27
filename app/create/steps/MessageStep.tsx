// message step file (MessageStep.tsx)
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Loader2 } from 'lucide-react';

interface MessageStepProps {
  initialData?: string;
  onNext?: () => void; 
  onBack: () => void;
  updateData: (data: string) => void;
}

const PROMPT_EXAMPLES = [
  "Write a funny Christmas message from a secret admirer",
  "Create a mysterious holiday greeting with inside jokes",
  "Write a nostalgic message about fictional childhood memories",
  "Compose a playful message mentioning made-up holiday traditions",
  "Write a cryptic message about a non-existent Christmas party",
  "Create a message about a fictional shared hobby",
  "Write as an old friend from a made-up summer camp",
  "Compose a message about an imaginary college adventure",
  "Write about a fictional neighborhood memory",
  "Create a message reminiscing about a fake coffee shop meetup"
];

export function MessageStep({ initialData, updateData}: MessageStepProps) {
  const [message, setMessage] = useState<string>(initialData || '');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const MIN_CHARS = 10;
  const MAX_CHARS = 400;

  const handleChange = (value: string) => {
    if (value.length <= MAX_CHARS) {
      setMessage(value);
      updateData(value);
    }
  };
  useEffect(() => {
    if (initialData) {
      setMessage(initialData);
    }
  }, [initialData]);

  // Rotate through examples
  useEffect(() => {
    if (message.length > 0) return; // Don't rotate if there's a message

    const interval = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % PROMPT_EXAMPLES.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [message.length]);



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
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate message');
      }

      const data = await response.json();
      setMessage(data.message);
      updateData(data.message);
      setAiPrompt('');
    } catch (error) {
      setError('Failed to generate message. Please try again.');
      console.error('Generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 max-w-[1170px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-['Almarena_Neue'] text-4xl md:text-6xl mb-3">
          Write Your Message
        </h1>
        <p className="text-gray-600 text-lg">
          Or let our AI help you craft the perfect prank
        </p>
      </motion.div>
 
      <div className="w-full max-w-[905px] space-y-8">
        {/* Message Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => handleChange(e.target.value)}
              className={`w-full min-h-[467px] p-6 rounded-2xl border bg-white shadow-sm 
                         font-['Consolas'] text-lg focus:border-black focus:ring-1 focus:ring-black 
                         transition-colors resize-none
                         ${message.length < MIN_CHARS ? 'border-red-200' : 'border-gray-200'}`}
              placeholder="Type your message here (minimum 10 characters)."
            />
            <div className={`absolute bottom-4 right-4 px-3 py-1 ${
              message.length < MIN_CHARS ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'
            } rounded-full text-sm`}>
              {message.length < MIN_CHARS ? 
                `${MIN_CHARS - message.length} more characters needed` : 
                `${message.length}/${MAX_CHARS}`}
            </div>
          </div>
        </motion.div>
 
        {/* AI Generation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 font-medium">AI Message Generator</span>
          </div>
          
          <div className="relative">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={message.length > 0}
              className={`w-full min-h-[182px] p-6 rounded-2xl border bg-white transition-all duration-300
                ${message.length > 0 
                  ? 'border-gray-100 bg-gray-50 text-gray-400' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-black focus:ring-1 focus:ring-black'}`}
              placeholder={
                message.length > 0
                  ? 'Clear the message above to use AI generation'
                  : PROMPT_EXAMPLES[currentExampleIndex]
              }
            />
            {!message.length && !aiPrompt && (
              <div className="absolute top-3 right-3 px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-xs text-gray-500">Examples...</span>
              </div>
            )}
          </div>
 
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 p-3 bg-red-50 rounded-xl text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}
 
          <motion.button
            whileHover={!generating && message.length === 0 && aiPrompt.trim() ? { scale: 1.02 } : {}}
            whileTap={!generating && message.length === 0 && aiPrompt.trim() ? { scale: 0.98 } : {}}
            onClick={generateWithAI}
            disabled={generating || message.length > 0 || !aiPrompt.trim()}
            className={`mt-4 px-8 py-3 rounded-full font-['Consolas'] w-full md:w-auto 
              transition-all flex items-center justify-center gap-2
              ${generating || message.length > 0 || !aiPrompt.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-900'
              }`}
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crafting your message...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate with AI</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
 
}