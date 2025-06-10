import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, TrendingUp, DollarSign, Wallet, Settings, Clock, Server, Bell, BarChart2, Zap, Shield, Rocket, Users, Target, FileText, Download, Upload, Cpu, GitBranch, MapPin, Globe } from 'lucide-react'; // Icons für das Dashboard

// --- Utility Components ---

// Card Component for a consistent look
const Card = ({ children, className = '' }) => (
  <div className={`bg-gray-800 p-6 rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

// StatCard Component for key metrics
const StatCard = ({ title, value, unit = '', trend = null }) => (
  <Card className="text-white flex-1 min-w-[200px]">
    <p className="text-sm text-gray-400 mb-2">{title}</p>
    <p className="text-3xl font-bold mb-1">
      {value}
      {unit && <span className="text-xl text-gray-500">{unit}</span>}
    </p>
    {trend && (
      <p className={`text-sm ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
        {trend}
      </p>
    )}
  </Card>
);

// --- Sidebar Component ---
const Sidebar = ({ activeItem, setActiveItem }) => {
  const navItems = [
    { name: 'Übersicht', icon: Home },
    { name: 'Trades & Historie', icon: TrendingUp },
    { name: 'Reinvest-Stufen', icon: Rocket },
    { name: 'Token-Kategorien', icon: BarChart2 },
    { name: 'Smart Money & Buzz', icon: DollarSign },
    { name: 'Risiko & Sicherheit', icon: Shield },
    { name: 'Einstellungen', icon: Settings },
    { name: 'API-Logs / Status', icon: FileText },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col h-screen">
      <div className="text-2xl font-bold text-indigo-400 mb-8">Solana KI-Trading</div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center w-full p-3 rounded-lg text-left mb-2 transition-colors duration-200 ${
              activeItem === item.name ? 'bg-indigo-700 text-white' : 'hover:bg-gray-700 text-gray-300'
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-700">
        <p className="text-xs text-gray-500">Version 1.0.0</p>
      </div>
    </div>
  );
};

// --- TopBar Component ---
const TopBar = () => {
  const [status, setStatus] = useState({
    proxy: 'Online',
    api: 'Online',
    telegram: 'Online',
    wallets: 'Synchronisiert',
  });

  // Dummy status updates (for real app, fetch from backend)
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prevStatus) => ({
        ...prevStatus,
        proxy: Math.random() > 0.1 ? 'Online' : 'Offline',
        api: Math.random() > 0.05 ? 'Online' : 'Offline',
        telegram: Math.random() > 0.03 ? 'Online' : 'Offline',
      }));
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (s) => {
    if (s === 'Online' || s === 'Synchronisiert') return 'text-green-400';
    if (s === 'Offline') return 'text-red-400';
    return 'text-yellow-400'; // e.g., 'Warning'
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex space-x-4 text-sm">
        <span className="flex items-center">
          <Server className={`h-4 w-4 mr-1 ${getStatusColor(status.proxy)}`} /> Proxy: <span className={getStatusColor(status.proxy)}>{status.proxy}</span>
        </span>
        <span className="flex items-center">
          <Cpu className={`h-4 w-4 mr-1 ${getStatusColor(status.api)}`} /> API: <span className={getStatusColor(status.api)}>{status.api}</span>
        </span>
        <span className="flex items-center">
          <Bell className={`h-4 w-4 mr-1 ${getStatusColor(status.telegram)}`} /> Telegram: <span className={getStatusColor(status.telegram)}>{status.telegram}</span>
        </span>
        <span className="flex items-center">
          <Wallet className={`h-4 w-4 mr-1 ${getStatusColor(status.wallets)}`} /> Wallets: <span className={getStatusColor(status.wallets)}>{status.wallets}</span>
        </span>
      </div>
      <div className="flex space-x-6">
        <StatCard title="Verfügbares Kapital" value="12,345" unit=" SOL" trend="+2.5%" />
        <StatCard title="Investiertes Kapital" value="8,765" unit=" SOL" />
        <StatCard title="Tagesgewinn" value="+567" unit=" SOL" trend="+6.1%" />
        <StatCard title="Boost-Level" value="3" unit="/5" />
      </div>
    </div>
  );
};

// --- Overview Page Component ---
const OverviewPage = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Die Basis-URL deines Proxys, die du bereitgestellt hast
  const PROXY_BASE_URL = 'https://mattner-s-proxy.vercel.app/api'; // Deine tatsächliche Proxy-URL

  // Dummy data for capital chart (replace with actual financial data)
  const capitalData = [
    { name: 'Tag 1', kapital: 10000, gewinn: 0 },
    { name: 'Tag 2', kapital: 10500, gewinn: 500 },
    { name: 'Tag 3', kapital: 10200, gewinn: -300 },
    { name: 'Tag 4', kapital: 11000, gewinn: 800 },
    { name: 'Tag 5', kapital: 11500, gewinn: 500 },
    { name: 'Tag 6', kapital: 12300, gewinn: 800 },
    { name: 'Tag 7', kapital: 12500, gewinn: 200 },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    let allFetchedTokens = [];

    try {
      // 1. Pump.fun Tokens abrufen
      // HINWEIS: Der /api/pumpfun-Endpunkt gibt derzeit 404 zurück.
      // Diese Zeilen sind kommentiert oder werden übersprungen, bis der Pump.fun-Proxy funktioniert.
      // Alternativ könntest du auch einen n8n-Webhook als Datenquelle für gefilterte Tokens verwenden.
      let pumpFunTokens = [];
      try {
        const pumpFunResponse = await fetch(`${PROXY_BASE_URL}/pumpfun`);
        if (!pumpFunResponse.ok) {
          console.warn(`Pump.fun API error: ${pumpFunResponse.statusText}. Skipping Pump.fun data.`);
          // Bei 404 oder anderem Fehler, leeres Array verwenden
          pumpFunTokens = [];
        } else {
          const pumpFunData = await pumpFunResponse.json();
          pumpFunTokens = pumpFunData.result || []; // Annahme: 'result' enthält das Array
        }
      } catch (pumpFunError) {
        console.error('Fehler beim Abrufen von Pump.fun Tokens (Proxy möglicherweise nicht bereit oder 404):', pumpFunError);
        pumpFunTokens = []; // Bei Netzwerkfehler oder JSON-Parse-Fehler
      }


      // 2. Dexscreener Details für jedes Token abrufen
      // Wir gehen jetzt davon aus, dass wir nur TokenAdressen von Pump.fun bekommen.
      // Wenn der Pump.fun-Proxy 404 ist, bleibt diese Liste leer.
      const fetchPromises = pumpFunTokens.map(async (token) => {
        try {
          const dexscreenerResponse = await fetch(`${PROXY_BASE_URL}/dexscreener-pair-details/${token.tokenAddress}`);
          
          if (!dexscreenerResponse.ok) {
            if (dexscreenerResponse.status === 404) {
              console.warn(`Kein Dexscreener-Paar für: ${token.tokenAddress}`);
            } else {
              console.warn(`Dexscreener API error für ${token.tokenAddress}: ${dexscreenerResponse.statusText}`);
            }
            return null; // Dieses Token überspringen
          }
          
          const dexscreenerData = await dexscreenerResponse.json();
          const pair = dexscreenerData.pairs && dexscreenerData.pairs.length > 0 ? dexscreenerData.pairs[0] : null;

          if (pair && parseFloat(pair.priceUsd || '0') > 0) { // Optional: Filter für Preis > 0
            return {
              id: token.tokenAddress, // Eindeutige ID
              name: pair.baseToken.name || token.name,
              symbol: pair.baseToken.symbol || token.symbol,
              priceUsd: parseFloat(pair.priceUsd || '0'), // Sicherstellen, dass es eine Zahl ist
              marketCap: parseFloat(pair.fdv || '0'), // FDV als Market Cap
              volume24h: parseFloat(pair.volume?.h24 || '0'),
              liquidity: parseFloat(pair.liquidity?.usd || '0'),
              buys5m: pair.txns?.m5?.buys ?? 0,
              sells5m: pair.txns?.m5?.sells ?? 0,
              url: pair.url,
              pairCreatedAt: pair.pairCreatedAt ? new Date(pair.pairCreatedAt) : null,
            };
          }
          return null;
        } catch (dexscreenerError) {
          console.error(`Fehler beim Abrufen von Dexscreener-Daten für ${token.tokenAddress}:`, dexscreenerError);
          return null;
        }
      });

      const results = await Promise.all(fetchPromises);
      allFetchedTokens = results.filter(token => token !== null); // Entferne null-Einträge

      setTokens(allFetchedTokens);

    } catch (mainError) {
      console.error('Fehler beim Abrufen der Dashboard-Daten:', mainError);
      setError('Fehler beim Laden der Daten: ' + mainError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Sicherstellen, dass der Code nur im Browser ausgeführt wird
    if (typeof window !== 'undefined') {
      fetchDashboardData();
      // Optional: Daten alle X Minuten aktualisieren
      // const intervalId = setInterval(fetchDashboardData, 5 * 60 * 1000); // Alle 5 Minuten
      // return () => clearInterval(intervalId);
    }
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-900 min-h-screen text-white flex items-center justify-center">
        <p className="text-xl">Daten werden geladen... Bitte warten.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-900 min-h-screen text-white flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
        <button onClick={fetchDashboardData} className="ml-4 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700">Erneut versuchen</button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8 text-indigo-400">Dashboard Übersicht</h2>

      {/* Kapitalverlauf & Gewinnanzeige mit Graphen */}
      <Card className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Kapitalverlauf & Gewinnanzeige</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={capitalData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="name" stroke="#cbd5e0" />
              <YAxis stroke="#cbd5e0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#cbd5e0' }}
                labelStyle={{ color: '#a0aec0' }}
                formatter={(value, name) => [`${value.toLocaleString('de-DE')} SOL`, name]}
              />
              <Line type="monotone" dataKey="kapital" stroke="#8884d8" activeDot={{ r: 8 }} name="Kapital" />
              <Line type="monotone" dataKey="gewinn" stroke="#82ca9d" name="Gewinn" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Aktuelle Token-Liste / Top-Performer (Beispiel: Tabelle) */}
      <Card className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Aktuelle Tokens / Top-Performer</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider rounded-tl-lg">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Preis (USD)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Market Cap (FDV)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">24h Volumen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Liquidität</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">5m Käufe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">5m Verkäufe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Erstellt am</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider rounded-tr-lg">Link</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {tokens.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center">
                    Keine Tokens gefunden, die die Kriterien erfüllen oder Daten auf Dexscreener haben.
                  </td>
                </tr>
              ) : (
                tokens.map((token) => (
                  <tr key={token.id} className="hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{token.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{token.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {token.priceUsd ? `$${token.priceUsd.toFixed(8)}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {token.marketCap ? `$${token.marketCap.toLocaleString('de-DE')}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {token.volume24h ? `$${token.volume24h.toLocaleString('de-DE')}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {token.liquidity ? `$${token.liquidity.toLocaleString('de-DE')}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{token.buys5m ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{token.sells5m ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {token.pairCreatedAt ? token.pairCreatedAt.toLocaleString('de-DE') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-400">
                      {token.url ? (
                        <a href={token.url} target="_blank" rel="noopener noreferrer" className="hover:underline">Dexscreener</a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Weitere Kacheln für andere Metriken (Beispiel) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Trades (24h)" value="1,245" />
        <StatCard title="Durchschnittlicher Gewinn pro Trade" value="1.2" unit="%" trend="+0.1%" />
        <StatCard title="Offene Positionen" value="7" />
      </div>

      {/* Platzhalter für Buzz Analyse / Smart Contract Risk */}
      <Card className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-400" /> Buzz Analyse & Social Signals (Platzhalter)
        </h3>
        <p className="text-gray-400">
          Hier könnten Echtzeit-Feeds von Twitter, Telegram, Fourmemes und Solsniffer integriert werden, um Social Signals und Token-Buzz zu überwachen.
          Dafür wären separate API-Anbindungen (z.B. Twitter API, Telegram APIs, oder Web Scraping) notwendig.
        </p>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-400" /> Smart Contract Risiko-Analyse & ScoreX (Platzhalter)
        </h3>
        <p className="text-gray-400">
          Dieser Bereich würde eine detaillierte Analyse der Token-Smart Contracts beinhalten, um "rote Flaggen" und potenzielle Rug Pull Risiken zu identifizieren (z.B. Honeypot-Checks, Tax-Analyse).
          Dies erfordert die Integration mit spezialisierten Blockchain-Sicherheits-APIs oder Rug-Check-Diensten.
        </p>
      </Card>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeItem, setActiveItem] = useState('Übersicht');

  const renderContent = () => {
    switch (activeItem) {
      case 'Übersicht':
        return <OverviewPage />;
      case 'Trades & Historie':
        return <div className="p-8 text-white"><h2>Trades & Historie (Baustelle)</h2><p>Hier werden die Trade-Historie und Exportfunktionen angezeigt.</p></div>;
      case 'Reinvest-Stufen':
        return <div className="p-8 text-white"><h2>Reinvest-Stufen (Baustelle)</h2><p>Visualisierung und Automatisierung der Reinvest-Stufen.</p></div>;
      case 'Token-Kategorien':
        return <div className="p-8 text-white"><h2>Token-Kategorien (Baustelle)</h2><p>Performance-Metriken und Toggles für verschiedene Token-Kategorien.</p></div>;
      case 'Smart Money & Buzz':
        return <div className="p-8 text-white"><h2>Smart Money & Buzz (Baustelle)</h2><p>Detaillierte Analyse von Smart Money Bewegungen und Social Buzz.</p></div>;
          case 'Risiko & Sicherheit':
            return <div className="p-8 text-white"><h2>Risiko & Sicherheit (Baustelle)</h2><p>Gas- & MEV-Schutz Statusanzeigen und Strategie-Steuerung.</p></div>;
          case 'Einstellungen':
            return <div className="p-8 text-white"><h2>Einstellungen (Baustelle)</h2><p>Benutzersteuerung und Rechteverwaltung.</p></div>;
          case 'API-Logs / Status':
            return <div className="p-8 text-white"><h2>API-Logs / Status (Baustelle)</h2><p>Übersicht über API-Aufrufe und deren Status.</p></div>;
          default:
            return <OverviewPage />;
        }
      };

      return (
        <div className="flex bg-gray-900 min-h-screen font-inter">
          {/* Sidebar */}
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <TopBar />

            {/* Content of selected page */}
            <main className="flex-1 overflow-y-auto">
              {renderContent()}
            </main>
          </div>
        </div>
      );
    }
    
