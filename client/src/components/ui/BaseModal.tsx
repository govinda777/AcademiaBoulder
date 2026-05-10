import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  leftContent: ReactNode;
  children: ReactNode;
  maxWidth?: string;
  leftWidth?: string;
}

export function BaseModal({
  isOpen,
  onClose,
  leftContent,
  children,
  maxWidth = "max-w-6xl",
  leftWidth = "md:w-[45%]"
}: BaseModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/70 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        className={`relative w-full ${maxWidth} h-[90vh] md:h-[80vh] bg-[var(--paper)] rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LADO ESQUERDO */}
        <div className={`w-full ${leftWidth} h-[40%] md:h-auto relative bg-[var(--ink)] overflow-hidden shrink-0`}>
          {leftContent}

          <button
            onClick={onClose}
            className="absolute top-8 left-8 md:top-10 md:right-10 md:left-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:rotate-90 transition-transform duration-500">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* LADO DIREITO */}
        <div className="flex-1 relative p-8 md:p-16 lg:p-20 overflow-y-auto overflow-x-hidden bg-[var(--paper)] grain scrollbar-hide">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
