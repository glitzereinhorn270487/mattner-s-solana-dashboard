import React, { useEffect, useState } from "react";

type Token = {
  name: string;
  symbol: string;
  priceUsd: string;
  liquidity: string;
  volume: string;
};
export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch("https://unser-solana-proxy.vercel.app/api/pumpfun");
        const json = await res.json();

        const parsed = json.tokens.slice(0, 20).map((t: any) => ({
          name: t.name,
          symbol: t.symbol,
          priceUsd: t.priceUsd.toFixed(6),
          liquidity: t.liquidity.toLocaleString(),
          volume24h: t.volume.h24.toLocaleString(),
          buys: t.txns?.m5?.buys ?? 0,
          sells: t.txns?.m5?.sells ?? 0,
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
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Live Token Übersicht</h1>

      {loading ? (
        <p>Lade Token-Daten...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Name</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Symbol</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Preis (USD)</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Liquidität</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Volumen 24h</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Buys (5m)</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Sells (5m)</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, i) => (
              <tr key={i}>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.name}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.symbol}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.priceUsd}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.liquidityUsd}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.volumeUsd24h}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.buys}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.sells}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
