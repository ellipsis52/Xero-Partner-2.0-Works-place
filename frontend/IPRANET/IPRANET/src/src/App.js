import { useState } from "react";


const ScriptInterface = () => {
  const [state, setState] = useState({
    selectedScript: "",
    successEffect: false,
    loading: false,
    message: "",
    reply: "",
    language: "en",  // Default language is English
  });

  const setSelectedScript = (value) => {
    setState((prevState) => ({ ...prevState, selectedScript: value }));
  };

  const setMessage = (value) => {
    setState((prevState) => ({ ...prevState, message: value }));
  };

  const setLanguage = (lang) => {
    setState((prevState) => ({ ...prevState, language: lang }));
  };

  const speakText = (text, lang) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = lang;
    window.speechSynthesis.speak(msg);
  };

  const runScript = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch("https://app.netmanagement.online/api/run-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script: state.selectedScript }),
      });

      const data = await response.json();
      const replyMessage = data.log || "✅ Script executed successfully!";
      setState((prevState) => ({
        ...prevState,
        successEffect: true,
        reply: replyMessage,
      }));

      setTimeout(() => {
        setState((prevState) => ({ ...prevState, successEffect: false }));
      }, 1000);

      speakText(replyMessage, state.language);  // Speak the reply message in the selected language
    } catch (err) {
      console.error("Execution error:", err);
      const errorMessage = "⚠️ Error executing the script.";
      setState((prevState) => ({
        ...prevState,
        reply: errorMessage,
        loading: false,
      }));
      speakText(errorMessage, state.language);  // Speak error message
    }
  };

  const sendMessage = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const res = await fetch("https://app.netmanagement.online/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: state.message }),
      });

      const data = await res.json();
      const replyMessage = data.reply || "❌ IPRANET couldn't respond.";
      setState((prevState) => ({
        ...prevState,
        reply: replyMessage,
        loading: false,
      }));
      speakText(replyMessage, state.language);  // Speak reply message
    } catch (err) {
      console.error("Send error:", err);
      const errorMessage = "🚨 Network error, please try again.";
      setState((prevState) => ({
        ...prevState,
        reply: errorMessage,
        loading: false,
      }));
      speakText(errorMessage, state.language);  // Speak error message
    }
  };

  return (
    <div className="relative min-h-screen px-6 py-16 bg-white sm:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 sm:text-5xl">Script Interface</h1>
          <p className="mt-4 text-lg text-gray-500">Ask IPRANET or run a script as per your needs.</p>
        </div>

        {/* Language Selector */}
        <div className="mt-6">
          <select
            className="w-full px-5 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={state.language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>

        {/* Select script */}
        <div className="mt-6">
          <select
            className="w-full px-5 py-3 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={state.selectedScript}
            onChange={(e) => setSelectedScript(e.target.value)}
          >
            <option value="purge-secrets.sh">purge-secrets.sh</option>
            <option value="clean-cache.sh">clean-cache.sh</option>
            <option value="reboot.sh">reboot.sh</option>
          </select>
        </div>

        {/* Button to execute the script */}
        <motion.button
          onClick={runScript}
          className="mt-6 w-full bg-[#8080FF] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#7070FF] transition duration-300"
          animate={state.successEffect ? { scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.6 }}
        >
          🧹 Run the selected script
        </motion.button>

        {/* Textarea to send a message to IPRANET */}
        <textarea
          rows="4"
          className="w-full p-4 mt-6 text-gray-800 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Ask a question to IPRANET…"
          value={state.message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {/* Button to send the message */}
        <button
          onClick={sendMessage}
          className={`mt-4 w-full font-semibold py-3 px-6 rounded-lg ${
            state.loading ? "bg-indigo-300 cursor-wait" : "bg-[#8080FF] text-white hover:bg-[#7070FF] transition duration-300"
          }`}
          disabled={state.loading}
        >
          {state.loading ? "Please wait..." : "Ask IPRANET"}
        </button>

        {/* Display the reply */}
        {state.reply && (
          <motion.div
            className="p-4 mt-6 text-gray-800 bg-gray-100 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {state.reply}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScriptInterface;
