import React from 'react';

interface StickyActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const StickyActionButton: React.FC<StickyActionButtonProps> = ({ label, onClick, disabled }) => (
  <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 py-3 md:hidden">
    <button
      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg text-lg shadow transition-colors disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
      style={{ minHeight: '48px' }}
    >
      {label}
    </button>
  </div>
);

export default StickyActionButton;
