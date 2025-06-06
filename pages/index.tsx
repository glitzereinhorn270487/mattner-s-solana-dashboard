import React, { useEffect, useState } from "react";

type Token = {
  name: string;
  symbol: string;
  priceUsd: string;
};

const Home = () => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch("https://unser-solana-proxy.vercel.app/api/pumpfun"); // 
      const data = await response.json();
      setTokens(data.slice(0, 10)); // Nur die ersten 10 für Demo
    };
    fetchTokens();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Token-Daten</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Symbol</th>
            <th className="border px-2 py-1">Preis (USD)</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{token.name}</td>
              <td className="border px-2 py-1">{token.symbol}</td>
              <td className="border px-2 py-1">{token.priceUsd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Home;

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
              <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Volumen</th>
               </tr>
          </thead>
          <tbody>
            {tokens.map((token, i) => (
              <tr key={i}>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.name}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.symbol}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.priceUsd}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.liquidity}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
