'use client'; // Ensure this is at the top of client-side components

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { CreatePostcardButtonProps } from '../types';

export const CreatePostcardButton: React.FC<CreatePostcardButtonProps> = ({ text }) => {
    const router = useRouter();

    return (
        <motion.button
            onClick={() => router.push('/create')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 text-base leading-none text-black border border-black border-solid bg-white rounded-full shadow-md font-['Consolas']"
            aria-label={text}
        >
            <span>{text}</span>
        </motion.button>
    );
};
