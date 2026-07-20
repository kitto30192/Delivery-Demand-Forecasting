import React, { useState } from 'react';
import './index.css' 
import { 
  Search, Menu, Map, Zap, CloudRain, Car, 
  Sliders, Navigation, BarChart3, ShieldAlert, 
  CheckCircle, RefreshCw, Layers 
} from 'lucide-react';

export default function ModernLogisticsDashboard() {
  // 1. Live Simulation State (Simulating "Today's" conditions)
  const [inputs, setInputs] = useState({
    weather: 'Cloudy',
    traffic: 'High',
    isFestival: true,
    prevDemand: 1.0,
    timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
  });

  // 2. Simulated real-time responses based on model patterns
  const [predictions, setPredictions] = useState([
    { id: '8761892ecffffff', baseline: 1.33, zone: 'Downtown Core' },
    { id: '87608b463ffffff', baseline: 1.30, zone: 'Metro Hub' },
    { id: '87618925cffffff', baseline: 1.29, zone: 'Residential West' }
  ]);

  const [activeTab, setActiveTab] = useState('Overview');
  const [isLoading, setIsLoading] = useState(false);

  // 3. Dynamic Calculation: Simulating model outputs based on user inputs
  const calculateLiveDemand = (baseline) => {
    let multiplier = 1.0;
    if (inputs.traffic === 'Jam') multiplier += 0.5;
    if (inputs.traffic === 'High') multiplier += 0.3;
    if (inputs.weather === 'Stormy') multiplier += 0.4;
    if (inputs.isFestival) multiplier += 0.6; // High surge for festivals
    
    // Mix in the user's previous 30 min demand input
    const score = (baseline * multiplier) + (inputs.prevDemand * 0.2);
    return Math.min(score, 5.0).toFixed(2); // Caps at 5 orders for visual structure
  };

  const handleSimulate = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600); // Quick animation effect
  };

  return (
    <div className="min-h-screen bg-[#080f1d] text-gray-100 font-sans antialiased">
      
      {/* --- PREMIUM GLOW HEADERS --- */}
      <div className="relative bg-[#0b1528] border-b border-gray-800 pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-30 blur-3xl"></div>
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-gray-800/60">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/30">
              <Navigation size={20} className="text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              LogiPredict <span className="text-blue-500">Engine</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            {['Overview', 'Live Deployment', 'Spatial Mesh', 'Optimization Matrix'].map((item) => (
              <button 
                key={item} 
                onClick={() => setActiveTab(item)}
                className={`transition-colors relative py-1 hover:text-white ${activeTab === item ? 'text-blue-400 font-semibold' : ''}`}
              >
                {item}
                {activeTab === item && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Core Active
            </span>
            <Menu size={20} className="text-gray-400 cursor-pointer hover:text-white" />
          </div>
        </nav>

        {/* Hero Headline */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mt-12 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Real-Time Fleet Dispatch Matrix
          </h1>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Simulate current environmental triggers to compute predictive geospatial order distribution instantly.
          </p>
        </div>
      </div>

      {/* --- DASHBOARD WRAPPER --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: OPERATIONAL CONTROL SIMULATOR (4 Columns) */}
          <div className="lg:col-span-4 bg-[#0e1726] border border-gray-800 rounded-xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center space-x-2 border-b border-gray-800 pb-4 mb-5">
              <Sliders size={18} className="text-blue-400" />
              <h2 className="text-sm font-bold tracking-wider uppercase text-gray-300">Live Context Simulation</h2>
            </div>

            <div className="space-y-4">
              {/* Timestamp Input */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Target Horizon Time</label>
                <input 
                  type="text" 
                  value={inputs.timestamp}
                  onChange={(e) => setInputs({...inputs, timestamp: e.target.value})}
                  className="w-full bg-[#172237] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Weather Input */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Weather State</label>
                <select 
                  value={inputs.weather}
                  onChange={(e) => setInputs({...inputs, weather: e.target.value})}
                  className="w-full bg-[#172237] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Sunny">Sunny / Clear</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Stormy">Stormy / Heavy Rain</option>
                </select>
              </div>

              {/* Traffic Density Input */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Road Traffic Density</label>
                <select 
                  value={inputs.traffic} 
                  onChange={(e) => setInputs({...inputs, traffic: e.target.value})}
                  className="w-full bg-[#172237] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Low">Low Density</option>
                  <option value="Medium">Medium Density</option>
                  <option value="High">High Density</option>
                  <option value="Jam">Gridlock Jam</option>
                </select>
              </div>

              {/* Previous 30m Demand */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Lag Demand (Prev 30 Mins Volume)</label>
                <input 
                  type="number" 
                  step="0.5"
                  value={inputs.prevDemand}
                  onChange={(e) => setInputs({...inputs, prevDemand: parseFloat(e.target.value) || 0})}
                  className="w-full bg-[#172237] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Festival Toggle Switch */}
              <div className="bg-[#121c2c] border border-gray-800 p-3 rounded-lg flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2.5">
                  <Zap size={16} className={inputs.isFestival ? "text-yellow-400 animate-pulse" : "text-gray-500"} />
                  <div>
                    <p className="text-xs font-bold text-gray-200">Festival Mode Active</p>
                    <p className="text-[10px] text-gray-500">Injects macro-demand shock multipliers</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={inputs.isFestival}
                  onChange={(e) => setInputs({...inputs, isFestival: e.target.checked})}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                />
              </div>

              {/* Action Button */}
              <button 
                onClick={handleSimulate}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg text-sm shadow-xl shadow-blue-500/10 flex items-center justify-center space-x-2 transition-all"
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                <span>{isLoading ? "Running Inference..." : "Compute Fleet Layout"}</span>
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: LIVE MODEL FORECASTS (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            {/* Real-time Metrics Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0e1726] border border-gray-800 p-4 rounded-xl flex items-center space-x-3">
                <CloudRain className="text-blue-400" size={24} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Weather Effect</p>
                  <p className="text-sm font-semibold text-gray-200">{inputs.weather}</p>
                </div>
              </div>
              <div className="bg-[#0e1726] border border-gray-800 p-4 rounded-xl flex items-center space-x-3">
                <Car className="text-red-400" size={24} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Traffic Impedance</p>
                  <p className="text-sm font-semibold text-gray-200">{inputs.traffic}</p>
                </div>
              </div>
              <div className="bg-[#0e1726] border border-gray-800 p-4 rounded-xl flex items-center space-x-3">
                <BarChart3 className="text-yellow-400" size={24} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Target Shift Mode</p>
                  <p className="text-sm font-semibold text-gray-200">{inputs.isFestival ? "Festival Surge" : "Standard Matrix"}</p>
                </div>
              </div>
            </div>

            {/* Generated Output Hexagons */}
            <div className="bg-[#0e1726] border border-gray-800 rounded-xl p-6 shadow-2xl flex-1">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
                <div>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-gray-300">Live Spatial Micro-Forecasts</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Calculated next-30m distribution matrix targets</p>
                </div>
                <div className="flex bg-[#121c2c] border border-gray-800 p-1 rounded-lg text-xs">
                  <span className="px-3 py-1 bg-[#1e2d4a] text-blue-400 font-semibold rounded-md flex items-center gap-1">
                    <Layers size={12} /> H3 Level 7
                  </span>
                </div>
              </div>

              {/* Dynamic Target Allocation Cards */}
              <div className="space-y-4">
                {predictions.map((pred) => {
                  const livePrediction = calculateLiveDemand(pred.baseline);
                  const isHighSurge = parseFloat(livePrediction) > 2.5;

                  return (
                    <div 
                      key={pred.id}
                      className={`border p-5 rounded-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isHighSurge 
                          ? 'bg-[#1c1218] border-red-900/40 hover:border-red-800/60' 
                          : 'bg-[#111c2e] border-gray-800/80 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${isHighSurge ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                          <Map size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-mono font-bold text-gray-200 text-sm tracking-tight">{pred.id}</h4>
                            <span className="text-[11px] text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded-md">{pred.zone}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Baseline Pattern: <span className="font-mono font-medium text-gray-300">{pred.baseline} orders</span>
                          </p>
                        </div>
                      </div>

                      {/* Prediction Summary Blocks */}
                      <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-gray-800/60 pt-3 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Predicted Orders</p>
                          <p className={`text-xl font-black font-mono mt-0.5 ${isHighSurge ? 'text-red-400' : 'text-emerald-400'}`}>
                            {isLoading ? "---" : livePrediction}
                          </p>
                        </div>
                        
                        <div>
                          {isHighSurge ? (
                            <span className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-lg shadow-red-500/5">
                              <ShieldAlert size={14} /> Dispatch Drivers
                            </span>
                          ) : (
                            <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg flex items-center gap-1.5">
                              <CheckCircle size={14} /> Stable Fleet
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}