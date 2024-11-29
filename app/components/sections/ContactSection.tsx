import { motion } from 'framer-motion';
import { EnvelopeIcon} from '@heroicons/react/24/outline';
import { CreatePostcardButton } from '../CreatePostcardButton';

export const ContactSection = () => {
  return (
    <footer className="relative py-24 w-full px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-['Almarena_Neue'] text-4xl md:text-7xl mb-8 max-w-4xl mx-auto leading-tight"
          >
            Ready to Create Some 
            <span className="text-red-500"> Holiday Magic?</span>
          </motion.h2>
 
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6 mt-12"
          >
            <CreatePostcardButton text="Start Your Prank Card Now" />
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-lg text-gray-400">
              <a 
                href="mailto:hello@cardpranks.com" 
                className="hover:text-black transition-colors flex items-center gap-2"
              >
                <EnvelopeIcon className="w-5 h-5" />
                hello@cardpranks.com
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 pt-4">
              <a 
                href="https://thunder-lemongrass-2d5.notion.site/Terms-and-Conditions-14b65606281b803fab1eeb6e08b79d11?pvs=4"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs md:text-sm text-gray-600 hover:text-black transition-colors border border-gray-200 rounded-full hover:border-gray-400"
              >
                Terms & Conditions
              </a>
              <div className="w-1 h-1 bg-gray-200 rounded-full" />
              <a 
                href="https://thunder-lemongrass-2d5.notion.site/Privacy-Policy-14b65606281b809ea8a5d9d6e9824449"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs md:text-sm text-gray-600 hover:text-black transition-colors border border-gray-200 rounded-full hover:border-gray-400"
              >
                Privacy Policy
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};