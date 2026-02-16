import { useState } from 'react';

interface Props {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[var(--color-foreground)]">
          {question}
        </span>
        <i
          className={`fas fa-chevron-down text-[var(--color-muted)] text-sm transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-[var(--color-muted)] leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}
