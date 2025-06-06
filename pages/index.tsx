import React, { useEffect, useState } from "react";

type Token = {
  name: string;
  symbol: string;
  priceUsd: string;
};

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch("https://dein-vercel-proxy.vercel.app/api/pumpfun");
        const json = await res.json();
        const parsed = json.tokens.map((t: any) => ({
          name: t.name,
          symbol: t.symbol,
          priceUsd: t.priceUsd,
        }));
        setTokens(parsed);
        setLoading(false);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Token Dashboard</h1>
      {loading ? (
        <p>Lade Daten...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Symbol</th>
              <th className="border px-4 py-2">Preis (USD)</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{token.name}</td>
                <td className="border px-4 py-2">{token.symbol}</td>
                <td className="border px-4 py-2">{token.priceUsd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
