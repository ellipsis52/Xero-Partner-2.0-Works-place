import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Icône FlatIcon CV (utilisation de l'URL ou d'un fichier local)
import cvIcon from './assets/icons/cv-icon.svg'; // Si tu as téléchargé l'icône

const XeroPartner2_0 = () => {
  const [state, setState] = useState({
    selectedScript: "",
    successEffect: false,
    loading: false,
    message: "",
    reply: "",
    language: "en",
    accessToken: "",
    useVoice: false,
    copied: false,
    history: [],
    darkMode: false,
  });

  useEffect(() => {
    document.body.className = state.darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
  }, [state.darkMode]);

  const setSelectedScript = (value) => setState((prev) => ({ ...prev, selectedScript: value }));
  const setMessage = (value) => setState((prev) => ({ ...prev, message: value }));
  const setLanguage = (lang) => setState((prev) => ({ ...prev, language: lang }));
  const toggleVoice = () => setState((prev) => ({ ...prev, useVoice: !prev.useVoice }));
  const toggleDarkMode = () => setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));

  const speakText = (text, lang) => {
    if (!state.useVoice) return;
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = lang;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className={`relative min-h-screen px-6 py-16 ${state.darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} sm:py-24 lg:py-32`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold sm:text-5xl">Xero Partner 2.0 Interface</h1>
          <p className="mt-4 text-lg">Ask IPRANET or run a script as per your needs.</p>
        </div>

        {/* Section des icônes */}
        <div className="flex justify-around mt-6">
          {/* Icône CV */}
          <div className="flex items-center space-x-2">
            <img src={cvIcon} alt="Cv Icon" className="w-10 h-10" />
            <p className="text-lg">CV</p>
          </div>
        </div>

        {/* Autres éléments du composant */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium">Access Token (Xero)</label>
          <input type="text" className="w-full px-5 py-3 text-black bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" value={state.accessToken} onChange={(e) => setState((prev) => ({ ...prev, accessToken: e.target.value }))} placeholder="Enter your Xero access token" />
        </div>

        <textarea rows="4" className="w-full p-4 mt-6 text-black placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Ask a question to IPRANET…" value={state.message} onChange={(e) => setMessage(e.target.value)}></textarea>

        <button onClick={() => speakText(state.message, state.language)} className="mt-4 w-full font-semibold py-3 px-6 rounded-lg bg-[#8080FF] text-white hover:bg-[#7070FF] transition duration-300">
          {state.loading ? "Please wait..." : "Ask IPRANET"}
        </button>

        {state.reply && (
          <motion.div className="relative p-4 mt-6 text-black bg-gray-100 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <pre className="break-words whitespace-pre-wrap">{state.reply}</pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Icône FlatIcon CV (utilisation de l'URL ou d'un fichier local)
import cvIcon from './assets/icons/cv-icon.svg'; // Si tu as téléchargé l'icône

const XeroPartner2_0 = () => {
  const [state, setState] = useState({
    selectedScript: "",
    successEffect: false,
    loading: false,
    message: "",
    reply: "",
    language: "en",
    accessToken: "",
    useVoice: false,
    copied: false,
    history: [],
    darkMode: false,
  });

  useEffect(() => {
    document.body.className = state.darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
  }, [state.darkMode]);

  const setSelectedScript = (value) => setState((prev) => ({ ...prev, selectedScript: value }));
  const setMessage = (value) => setState((prev) => ({ ...prev, message: value }));
  const setLanguage = (lang) => setState((prev) => ({ ...prev, language: lang }));
  const toggleVoice = () => setState((prev) => ({ ...prev, useVoice: !prev.useVoice }));
  const toggleDarkMode = () => setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));

  const speakText = (text, lang) => {
    if (!state.useVoice) return;
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = lang;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className={`relative min-h-screen px-6 py-16 ${state.darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} sm:py-24 lg:py-32`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold sm:text-5xl">Xero Partner 2.0 Interface</h1>
          <p className="mt-4 text-lg">Ask IPRANET or run a script as per your needs.</p>
        </div>

        {/* Section des icônes */}
        <div className="flex justify-around mt-6">
          {/* Icône CV */}
          <div className="flex items-center space-x-2">
            <img src={cvIcon} alt="Cv Icon" className="w-10 h-10" />
            <p className="text-lg">CV</p>
          </div>
        </div>

        {/* Autres éléments du composant */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium">Access Token (Xero)</label>
          <input type="text" className="w-full px-5 py-3 text-black bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" value={state.accessToken} onChange={(e) => setState((prev) => ({ ...prev, accessToken: e.target.value }))} placeholder="Enter your Xero access token" />
        </div>

        <textarea rows="4" className="w-full p-4 mt-6 text-black placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Ask a question to IPRANET…" value={state.message} onChange={(e) => setMessage(e.target.value)}></textarea>

        <button onClick={() => speakText(state.message, state.language)} className="mt-4 w-full font-semibold py-3 px-6 rounded-lg bg-[#8080FF] text-white hover:bg-[#7070FF] transition duration-300">
          {state.loading ? "Please wait..." : "Ask IPRANET"}
        </button>

        {state.reply && (
          <motion.div className="relative p-4 mt-6 text-black bg-gray-100 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <pre className="break-words whitespace-pre-wrap">{state.reply}</pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default XeroPartner2_0;
