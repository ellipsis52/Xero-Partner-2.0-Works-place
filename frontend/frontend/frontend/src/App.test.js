// --- frontend/src/App.js ---
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState("");
  const [status, setStatus] = useState(null); // ✅ Indicateur de statut

  const sendMessage = async () => {
    setLoading(true);
    setLog("");
    setStatus(null);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // ⏱️ Timeout de 10s

      const res = await axios.post(
        "https://app.netmanagement.online/api/chat",
        { message },
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      console.log("🌐 Réponse complète du serveur :", JSON.stringify(res, null, 2));
      console.log("📩 Réponse d'IPRANET :", res?.data?.reply ?? "⚠️ Aucune réponse trouvée.");

      setLog(`✅ Succès: ${JSON.stringify(res.data)}`);
      setStatus("success");

      if (res && res.data && typeof res.data.reply === "string") {
        setReply(res.data.reply);
      } else {
        console.warn("Réponse inattendue du serveur:", res);
        setReply("❌ IPRANET n'a pas compris la réponse du serveur.");
        setStatus("warning");
      }
    } catch (error) {
      setReply(
        "❌ IPRANET can't answer for the moment\n\n💡 Erreur technique détectée. Consulte la console pour les détails."
      );
      setStatus("error");

      if (axios.isCancel(error)) {
        console.error("⏱️ La requête a expiré. Timeout atteint.");
        setLog("⏱️ Timeout atteint - la requête a été annulée.");
      } else if (
        error &&
        typeof error === "object" &&
        Object.prototype.hasOwnProperty.call(error, "message") &&
        typeof error.message === "string"
      ) {
        console.error("Erreur lors de l'envoi du message:", error.message);
        setLog(`🚨 Erreur: ${error.message}`);
      } else if (
        error &&
        typeof error === "object" &&
        error.response &&
        typeof error.response === "object"
      ) {
        console.error("Erreur de réponse serveur:", error.response);
        setLog(`🚨 Réponse serveur: ${JSON.stringify(error.response)}`);
      } else if (
        error &&
        typeof error === "object" &&
        error.code === 'ERR_NETWORK'
      ) {
        console.error("🌐 Erreur réseau détectée:", error);
        setLog("🌐 Erreur réseau: impossible de contacter le serveur. Vérifiez la connexion.");
      } else {
        try {
          console.error("Erreur inconnue:", JSON.stringify(error));
          setLog(`🚨 Erreur inconnue: ${JSON.stringify(error)}`);
        } catch (jsonError) {
          console.error("Erreur inconnue et non sérialisable:", error);
          setLog("🚨 Erreur inconnue et non sérialisable");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (status) {
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
              placeholder="Entrez une requête sacrée pour invoquer IPRANET…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              onClick={sendMessage}
              className={`mt-4 bg-indigo-600 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
              disabled={loading}
            >
              {loading ? "trust..." : "ask to IPRANET"}
            </button>
            {reply && (
              <motion.p
                className="mt-6 text-gray-300 italic whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {reply}
              </motion.p>
            )}
            {log && (
              <pre className={`mt-4 text-left text-sm bg-gray-800 p-3 rounded ${getStatusColor()}`}>
                {log}
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
