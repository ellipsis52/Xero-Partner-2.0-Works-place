import React from 'react';

const IconCard = ({ src, alt, label, creditLink, creditText }) => {
  return (
    <div className="p-6 transition-all duration-300 transform bg-white shadow-lg hover:scale-105 hover:shadow-xl rounded-xl dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
      <img src={src} alt={alt} className="w-20 h-20 mx-auto mb-4 transition-all duration-300 transform rounded-full shadow-md hover:scale-110" />
      <p className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">{label}</p>
      <a
        href={creditLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        {creditText}
      </a>
    </div>
  );
};

export default IconCard;
