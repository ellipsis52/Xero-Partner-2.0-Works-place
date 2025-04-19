import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Fonction pour détecter automatiquement la langue
const detectLanguage = async (text) => {
  const response = await fetch("https://ws.detectlanguage.com/0.2/detect", {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_DETECTLANGUAGE_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: text }),
  });
  const data = await response.json();
  return data.data.detections[0].language;
};

const callXeroAPI = async (accessToken) => {
  try {
    const response = await fetch("https://api.xero.com/api.xro/2.0/Invoices", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Xero API Error:", err);
    throw new Error("Erreur lors de la communication avec Xero");
  }
};

const callGPT4 = async (message) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_GPT_API_KEY`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error("GPT-4 Error:", err);
    throw new Error("Erreur lors de la communication avec GPT-4");
  }
};

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

  const runScript = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const xeroData = await callXeroAPI(state.accessToken);
      const replyMessage = `Xero data fetched successfully! Invoices: ${xeroData.Invoices.length}`;
      setState((prev) => ({
        ...prev,
        successEffect: true,
        reply: replyMessage,
        loading: false,
        history: [...prev.history, { message: prev.message, reply: replyMessage }],
      }));
      setTimeout(() => setState((prev) => ({ ...prev, successEffect: false })), 1000);
      speakText(replyMessage, state.language);
    } catch (err) {
      const errorMessage = "⚠️ Error executing the script.";
      setState((prev) => ({ ...prev, reply: errorMessage, loading: false }));
      speakText(errorMessage, state.language);
    }
  };

  const sendMessage = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const lang = await detectLanguage(state.message);
      const replyMessage = await callGPT4(state.message);
      setState((prev) => ({
        ...prev,
        reply: replyMessage,
        language: lang,
        loading: false,
        history: [...prev.history, { message: prev.message, reply: replyMessage }],
      }));
      speakText(replyMessage, lang);
    } catch (err) {
      const errorMessage = "🚨 Network error, please try again.";
      setState((prev) => ({ ...prev, reply: errorMessage, loading: false }));
      speakText(errorMessage, state.language);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.reply).then(() => {
      setState((prev) => ({ ...prev, copied: true }));
      setTimeout(() => setState((prev) => ({ ...prev, copied: false })), 1500);
    });
  };

  return (
    <div className={`relative min-h-screen px-6 py-16 ${state.darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} sm:py-24 lg:py-32`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold sm:text-5xl">Xero Partner 2.0 Interface</h1>
          <p className="mt-4 text-lg">Ask IPRANET or run a script as per your needs.</p>
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={toggleDarkMode} className="flex-1 px-5 py-3 text-white bg-gray-700 rounded-lg hover:bg-gray-600">
            {state.darkMode ? "☀️ Mode clair" : "🌘 Mode sombre"}
          </button>
          <button onClick={toggleVoice} className="flex-1 px-5 py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-400">
            {state.useVoice ? "🔇 Voix désactivée" : "🔊 Voix activée"}
          </button>
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium">Access Token (Xero)</label>
          <input type="text" className="w-full px-5 py-3 text-black bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" value={state.accessToken} onChange={(e) => setState((prev) => ({ ...prev, accessToken: e.target.value }))} placeholder="Enter your Xero access token" />
        </div>

        <textarea rows="4" className="w-full p-4 mt-6 text-black placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Ask a question to IPRANET…" value={state.message} onChange={(e) => setMessage(e.target.value)}></textarea>

        <button onClick={sendMessage} className={`mt-4 w-full font-semibold py-3 px-6 rounded-lg ${state.loading ? "bg-indigo-300 cursor-wait" : "bg-[#8080FF] text-white hover:bg-[#7070FF] transition duration-300"}`} disabled={state.loading}>
          {state.loading ? "Please wait..." : "Ask IPRANET"}
        </button>

        <button onClick={runScript} className="w-full px-6 py-3 mt-4 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-400">
          ▶️ Run Script
        </button>

        {state.reply && (
          <motion.div className="relative p-4 mt-6 text-black bg-gray-100 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <pre className="break-words whitespace-pre-wrap">{state.reply}</pre>
            <button onClick={copyToClipboard} className="absolute px-3 py-1 text-sm text-white bg-indigo-600 rounded top-2 right-2 hover:bg-indigo-500">
              {state.copied ? "✅ Copied" : "📋 Copy"}
            </button>
          </motion.div>
        )}

        {state.history.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-2 text-xl font-semibold">🕘 Historique</h2>
            <ul className="space-y-2">
              {state.history.map((entry, idx) => (
                <li key={idx} className="p-3 text-black bg-gray-200 rounded">
                  <strong>Q:</strong> {entry.message}<br />
                  <strong>A:</strong> {entry.reply}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import cvIcon from './assets/icons/cv-icon.svg';  // Icône téléchargée
import travailEquipeIcon from './assets/icons/travail-en-equipe-icon.svg';  // Icône téléchargée pour "travail en équipe"
import selectionCandidatsIcon from './assets/icons/selection-des-candidats-icon.svg';  // Icône téléchargée

const App = () => {
  return (
    <div className="App">
      <h1>Bienvenue dans l'application</h1>

      {/* Section pour les icônes téléchargées */}
      <div>
        <h2>Icônes téléchargées</h2>

        {/* Icône CV */}
        <div>
          <img src={cvIcon} alt="Cv Icon" style={{ width: '50px', height: '50px' }} />
          <p>Votre texte ici pour l'icône CV</p>
          <a href="https://www.flaticon.com/fr/icones-gratuites/cv-et-cv" title="cv et cv icônes">Cv et cv icônes créées par Bamart - Flaticon</a>
        </div>

        {/* Icône Travail en équipe */}
        <div>
          <img src={travailEquipeIcon} alt="Travail en équipe Icon" style={{ width: '50px', height: '50px' }} />
          <p>Votre texte ici pour l'icône travail en équipe</p>
          <a href="https://www.flaticon.com/fr/icones-gratuites/travail-en-equipe" title="travail en équipe icônes">Travail en équipe icônes créées par Bamart - Flaticon</a>
        </div>

        {/* Icône Sélection des candidats */}
        <div>
          <img src={selectionCandidatsIcon} alt="Sélection des candidats Icon" style={{ width: '50px', height: '50px' }} />
          <p>Votre texte ici pour l'icône sélection des candidats</p>
          <a href="https://www.flaticon.com/fr/icones-gratuites/selection-des-candidats" title="sélection des candidats icônes">Sélection des candidats icônes créées par Bamart - Flaticon</a>
        </div>
      </div>

      {/* Section pour les icônes en ligne */}
      <div>
        <h2>Icônes depuis Flaticon</h2>

        {/* Icône CV en ligne */}
        <div>
          <img 
            src="https://imageURL_icone_de_Flaticon.svg" // Remplace avec l'URL correcte
            alt="Cv Icon"
            style={{ width: '50px', height: '50px' }} 
          />
          <p>Votre texte ici pour l'icône CV en ligne</p>
          <a href="https://www.flaticon.com/fr/icones-gratuites/cv-et-cv" title="cv et cv icônes">Cv et cv icônes créées par Bamart - Flaticon</a>
        </div>
      </div>
    </div>
  );
}
<img className="icon" src={cvIcon} alt="Cv Icon" />

import React from 'react';
import IconComponent from './IconComponent';

function App() {
  return (
    <div className="App">
      <IconComponent />
    </div>
  );
  export default XeroPartner2_0;
