import React, { useEffect, useState } from "react";

type Token = {
  name: string;
  symbol: string;
  priceUsd: string;
};

const Home = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch("https://dein-vercel-proxy.vercel.app/api/pumpfun");
        const parsed = await res.json();
        setTokens(parsed);
        setLoading(false);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div>
      <h1>Token Dashboard</h1>
      {loading ? (
        <p>Lädt...</p>
      ) : (
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              {token.name} ({token.symbol}): {token.priceUsd} USD
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
