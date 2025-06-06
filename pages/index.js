import React from "react";

const mockTokens = [
  {
    name: "Example Token",
    symbol: "EXM",
    priceUsd: "0.0032",
    liquidityUsd: "12,000",
    volume24h: "3,400",
    buys: 18,
    sells: 11,
  },
  {
    name: "Solstarter",
    symbol: "SOS",
    priceUsd: "0.0019",
    liquidityUsd: "25,000",
    volume24h: "5,700",
    buys: 34,
    sells: 17,
  },
];

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Live Token Overview
      </h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0", textAlign: "left" }}>
            <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Name</th>
            <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Symbol</th>
            <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Price (USD)</th>
            <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Liquidity</th>
            <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Volume 24h</th>
            <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Buys</th>
            <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>Sells</th>
          </tr>
        </thead>
        <tbody>
          {mockTokens.map((token, idx) => (
            <tr key={idx}>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.name}</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.symbol}</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.priceUsd}</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.liquidityUsd}</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.volume24h}</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.buys}</td>
              <td style={{ padding: "0.5rem", border: "1px solid #ccc" }}>{token.sells}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
