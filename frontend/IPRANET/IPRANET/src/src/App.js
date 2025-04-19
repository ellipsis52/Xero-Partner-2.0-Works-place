import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [okxData, setOkxData] = useState(null);
  const [xeroData, setXeroData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [gptResponse, setGptResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchOkxData = async () => {
    try {
      const response = await axios.get('https://api.okx.com/api/v5/market/price?instId=BTC-USDT');
      setOkxData(response.data);
    } catch (error) {
      setErrorMessage("Erreur lors de la récupération des données OKX.");
      console.error("Erreur OKX:", error);
    }
  };

  const fetchXeroData = async () => {
    try {
      const response = await axios.get('https://api.xero.com/api.xro/2.0/Invoices', {
        headers: {
          'Authorization': 'Bearer YOUR_XERO_ACCESS_TOKEN',
        },
      });
      setXeroData(response.data);
    } catch (error) {
      setErrorMessage("Erreur lors de la récupération des données Xero.");
      console.error("Erreur Xero:", error);
    }
  };

  const processPayment = async (amount) => {
    try {
      const paymentResponse = await axios.post('https://www.saferpay.com/api/v1/payments', {
        amount: amount,
        currency: 'USD',
      });
      setPaymentStatus(paymentResponse.data);
    } catch (error) {
      setErrorMessage("Erreur lors du traitement du paiement avec Saferpay.");
      console.error("Erreur Saferpay:", error);
    }
  };

  const fetchGptResponse = async (text) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'gpt-4',
        prompt: text,
        max_tokens: 150,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,  // Remplacez par votre clé API GPT-4
        },
      });
      setGptResponse(response.data.choices[0].text);
    } catch (error) {
      setErrorMessage("Erreur lors de l'appel à GPT-4.");
      console.error("Erreur GPT-4:", error);
    }
  };

  useEffect(() => {
    fetchOkxData();
    fetchXeroData();
  }, []);

  const handleGptRequest = () => {
    const promptText = `Analyse des données OKX: ${JSON.stringify(okxData)} et Xero: ${JSON.stringify(xeroData)}`;
    fetchGptResponse(promptText);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-semibold text-center text-blue-600">Integration OKX, Xero et Saferpay</h1>

        {/* Afficher un message d'erreur si nécessaire */}
        {errorMessage && (
          <div className="p-4 mb-6 text-red-600 bg-red-100 rounded">
            <strong>Erreur:</strong> {errorMessage}
          </div>
        )}

        {/* Afficher les données OKX */}
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-medium text-gray-800">Donnees OKX</h2>
          {okxData ? (
            <pre className="p-4 bg-gray-200 rounded">{JSON.stringify(okxData, null, 2)}</pre>
          ) : (
            <p className="text-gray-500">Aucune donnée OKX disponible.</p>
          )}
        </div>

        {/* Afficher les données Xero */}
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-medium text-gray-800">Donnees Xero</h2>
          {xeroData ? (
            <pre className="p-4 bg-gray-200 rounded">{JSON.stringify(xeroData, null, 2)}</pre>
          ) : (
            <p className="text-gray-500">Aucune donnée Xero disponible.</p>
          )}
        </div>

        {/* Formulaire pour traiter un paiement avec Saferpay */}
        <div>
          <h2 className="mb-3 text-xl font-medium text-gray-800">Effectuer un paiement</h2>
          <button 
            onClick={() => processPayment(100)} 
            className="px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Payer 100 USD
          </button>

          {paymentStatus && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800">Status du paiement</h3>
              <pre className="p-4 bg-gray-200 rounded">{JSON.stringify(paymentStatus, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Afficher la réponse de GPT-4 */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800">Réponse de GPT-4</h3>
          {gptResponse ? (
            <pre className="p-4 bg-gray-200 rounded">{gptResponse}</pre>
          ) : (
            <button 
              onClick={handleGptRequest} 
              className="px-6 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
            >
              Analyser les données avec GPT-4
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
