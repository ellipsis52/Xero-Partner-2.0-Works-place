import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  // Centralisation de l'état avec un seul objet
  const [state, setState] = useState({
    message: "",
    reply: "",
    loading: false,
    log: "",
    status: null, // success, error, warning
  });

  const setStatus = (status) => setState((prev) => ({ ...prev, status }));
  const setLog = (log) => setState((prev) => ({ ...prev, log }));
  const setMessage = (message) => setState((prev) => ({ ...prev, message }));

  const sendMessage = async () => {
    setState({ ...state, loading: true, log: "", reply: "", status: null });
    
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // Timeout de 10s

      const res = await axios.post(
        "https://app.netmanagement.online/api/chat",
        { message: state.message },
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      console.log("🌐 Réponse complète du serveur :", JSON.stringify(res, null, 2));
      console.log("📩 Réponse d'IPRANET :", res?.data?.reply ?? "⚠️ Aucune réponse trouvée.");

      if (res?.data?.reply && typeof res.data.reply === "string") {
        setState({
          ...state,
          reply: res.data.reply,
          log: `✅ Succès: ${JSON.stringify(res.data)}`,
          status: "success",
        });
      } else {
        setState({
          ...state,
          reply: "❌ IPRANET n'a pas compris la réponse du serveur.",
          log: `⚠️ Réponse inattendue du serveur.`,
          status: "warning",
        });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleError = (error) => {
    if (axios.isCancel(error)) {
      setState({
        ...state,
        log: "⏱️ Timeout atteint - la requête a été annulée.",
        status: "error",
      });
    } else if (error?.message) {
      setState({
        ...state,
        log: `🚨 Erreur: ${error.message}`,
        status: "error",
      });
    } else if (error?.response) {
      setState({
        ...state,
        log: `🚨 Réponse serveur: ${JSON.stringify(error.response)}`,
        status: "error",
      });
    } else if (error?.code === 'ERR_NETWORK') {
      setState({
        ...state,
        log: "🌐 Erreur réseau: impossible de contacter le serveur.",
        status: "error",
      });
    } else {
      setState({
        ...state,
        log: "🚨 Erreur inconnue.",
        status: "error",
      });
    }
  };

  const getStatusColor = () => {
    switch (state.status) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "warning":
        return "text-yellow-400";
      default:
        return "";
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 animate-fade-in min-h-screen">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Xero Partner 2.0
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Xero partner 2.0 here to serve you...
          </p>

          <div className="mt-10">
            <textarea
              rows="4"
              className="w-full rounded-md border-0 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="ask what you need help for from IPRANET…"
              value={state.message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button
              onClick={sendMessage}
              className={`mt-4 bg-indigo-600 text-white px-4 py-2 rounded ${state.loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
              disabled={state.loading}
            >
              {state.loading ? "trust..." : "ask to IPRANET"}
            </button>

            {state.reply && (
              <motion.p
                className="mt-6 text-gray-300 italic whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                aria-live="assertive"
              >
                {state.reply}
              </motion.p>
            )}

            {state.log && (
              <pre className={`mt-4 text-left text-sm bg-gray-800 p-3 rounded ${getStatusColor()}`}>
                {state.log}
              </pre>
            )}
          </div>

          <footer className="text-center mt-12 text-sm text-gray-500">
            ✨ Powered by netmanagement GPT-4 Oracle & Xero Stars ✨
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
