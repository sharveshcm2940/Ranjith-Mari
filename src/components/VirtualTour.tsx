import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  Shield, 
  Activity, 
  Sparkles, 
  Navigation, 
  Info, 
  CheckCircle,
  RefreshCw,
  Thermometer,
  Gauge,
  Play
} from 'lucide-react';

interface TourStop {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  hotspots: {
    x: number; // percentage from left
    y: number; // percentage from top
    label: string;
    title: string;
    description: string;
  }[];
  specifications: string[];
}

const TOUR_STOPS: TourStop[] = [
  {
    id: 'cbct-lounge',
    title: 'CBCT Radiology & Diagnosis Lounge',
    subtitle: 'Ultra-low dose digital volume tomography and 3D facial modeling.',
    description: 'Every advanced reconstructive implant setup begins here. Our digital diagnosis lounge is centered around our ultra-high definition CBCT scanner, providing comprehensive 3D cross-sections of the mandibular bone density, sinus cavities, and nerve pathways with sub-millimeter precision.',
    stats: [
      { label: 'Spatial Resolution', value: '75 μm (Ultra-Fine)' },
      { label: 'Radiation Dose', value: '-85% vs. Spiral CT' },
      { label: 'Capture Time', value: '8.9 Seconds' }
    ],
    hotspots: [
      { x: 35, y: 30, label: '3D', title: 'Carbon Sensor Frame', description: 'Adjusts automatically to patient stature to eliminate alignment and movement distortion.' },
      { x: 60, y: 45, label: 'kV', title: 'Pulsed kV generator', description: 'Emits x-ray pulses only during crucial sensor frames to cut dose by up to 85%.' },
      { x: 45, y: 70, label: 'HD', title: 'Voxel Mapping Software', description: 'Reconstructs real-time 3D volumetric bone density charts for immediate implant planning.' }
    ],
    specifications: [
      { key: 'Technology', value: 'High-speed cone beam scan' },
      { key: 'Integration', value: 'Fully integrated with DentalPlanner simulator' },
      { key: 'Safety', value: 'Dual lead-shielded physical barriers' }
    ].map(s => `${s.key}: ${s.value}`)
  },
  {
    id: 'laser-suite',
    title: 'Laser & Periodontal Microsurgery Suite',
    subtitle: 'State-of-the-art Erbium & Diode dual-wave laser debridement.',
    description: 'This operator room is designed specifically for state-of-the-art laser therapies and microsurgical mucogingival repairs. Lined with specialized eye-safety equipment and active high-volume subgingival aerosol evacuation systems, it provides a tranquil, sterile, suture-free healing space.',
    stats: [
      { label: 'Wave Frequencies', value: '2940 nm & 810 nm' },
      { label: 'Bacterial Kill Rate', value: '99.997%' },
      { label: 'Precision Level', value: 'Cellular Selective' }
    ],
    hotspots: [
      { x: 25, y: 40, label: 'Er', title: 'Erbium-YAG Handpiece', description: 'Cold laser tool that vaporizes diseased tissue layer by layer with zero thermal damage.' },
      { x: 50, y: 25, label: 'HE', title: 'Active HEPA filter', description: 'Maintains continuous medical grade laminar flow air extraction.' },
      { x: 75, y: 65, label: 'Di', title: 'Diode Photo-Stimulator', description: 'Accelerates blood clot synthesis and cellular energy to trigger instant bio-healing.' }
    ],
    specifications: [
      { key: 'Water spray', value: 'Dual pressurized sterile saline mist' },
      { key: 'Goggles', value: 'Specific optical density (OD5+) protective wear' },
      { key: 'Autoregulate', value: 'Real-time laser tissue resistance feedback' }
    ].map(s => `${s.key}: ${s.value}`)
  },
  {
    id: 'sterility-bay',
    title: 'Grade-A Autoclave & Sterilization Bay',
    subtitle: 'Closed-loop automation complying with CDC and international norms.',
    description: 'The foundation of clinical safety. Our sterilization bay operates on an uncompromising physical barrier system. Instruments flow in a single direction from contaminated, to chemical disinfection, to Class-B steam autoclave, to heat-sealed bio-bags.',
    stats: [
      { label: 'Sterilizer Class', value: 'Class B (Medical Grade)' },
      { label: 'Autoclave Temp', value: '134°C (273°F)' },
      { label: 'Indicator Type', value: 'Triple Chemical & Biological' }
    ],
    hotspots: [
      { x: 30, y: 55, label: 'US', title: 'Multi-Frequency Ultrasonic', description: 'Cavitation bubbles disintegrate debris in micro-grooves of handpieces.' },
      { x: 55, y: 35, label: 'B', title: 'Fractionated Vacuum', description: 'Extracts 100% of air pockets from porous tools, guaranteeing perfect steam ingress.' },
      { x: 80, y: 50, label: 'S', title: 'Barcoded Thermal Sealer', description: 'Encloses sterilized tools in heavy nylon pouches, logging cycle parameters.' }
    ],
    specifications: [
      { key: 'Cycle Log', value: 'Digitized server logs stored for every single clinic patient' },
      { key: 'Water Supply', value: 'Triple-pass reverse osmosis demineralizer' },
      { key: 'Verification', value: 'Weekly spore test cultures processed externally' }
    ].map(s => `${s.key}: ${s.value}`)
  }
];

export default function VirtualTour() {
  const [activeStopId, setActiveStopId] = useState('cbct-lounge');
  const [selectedHotspot, setSelectedHotspot] = useState<typeof TOUR_STOPS[0]['hotspots'][0] | null>(null);

  // CBCT & Implant Simulation State
  const [cbctScanActive, setCbctScanActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [implantPlaced, setImplantPlaced] = useState(false);

  // Laser Suite Simulation State
  const [debrisState, setDebrisState] = useState([true, true, true, true, true]);
  const [laserActive, setLaserActive] = useState(false);
  const [activeLaserTarget, setActiveLaserTarget] = useState<number | null>(null);

  // Sterility Bay Simulation State
  const [autoclavePhase, setAutoclavePhase] = useState<'idle' | 'vacuum' | 'heating' | 'complete'>('idle');
  const [sterilizationProgress, setSterilizationProgress] = useState(0);
  const [temperature, setTemperature] = useState(25);
  const [pressure, setPressure] = useState(1.0);

  const handleStartCBCT = () => {
    if (cbctScanActive) return;
    setCbctScanActive(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCbctScanActive(false);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleResetCBCT = () => {
    setCbctScanActive(false);
    setScanProgress(0);
    setImplantPlaced(false);
  };

  const handleFireLaser = (idx: number) => {
    if (laserActive) return;
    setActiveLaserTarget(idx);
    setLaserActive(true);
    
    setTimeout(() => {
      setDebrisState(prev => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
      setLaserActive(false);
      setActiveLaserTarget(null);
    }, 600);
  };

  const handleResetLaser = () => {
    setDebrisState([true, true, true, true, true]);
    setLaserActive(false);
    setActiveLaserTarget(null);
  };

  const handleStartSterile = () => {
    if (autoclavePhase !== 'idle') return;
    setAutoclavePhase('vacuum');
    setSterilizationProgress(15);
    setTemperature(45);
    setPressure(1.2);

    setTimeout(() => {
      setAutoclavePhase('heating');
      setSterilizationProgress(60);
      setTemperature(134);
      setPressure(2.1);

      setTimeout(() => {
        setAutoclavePhase('complete');
        setSterilizationProgress(100);
        setTemperature(85);
        setPressure(1.0);
      }, 1800);

    }, 1500);
  };

  const handleResetSterile = () => {
    setAutoclavePhase('idle');
    setSterilizationProgress(0);
    setTemperature(25);
    setPressure(1.0);
  };

  const activeStop = TOUR_STOPS.find(s => s.id === activeStopId) || TOUR_STOPS[0];

  const handleStopChange = (id: string) => {
    setActiveStopId(id);
    setSelectedHotspot(null); // reset selected hotspot
  };

  return (
    <section id="clinic-tour" className="py-24 relative bg-brand-light border-b border-brand-navy/5">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#3b82f6_0.5px,transparent_0.5px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-left mb-16 max-w-2xl">
          <p className="font-mono text-xs text-brand-blue font-bold uppercase tracking-widest mb-2">Virtual Walkthrough</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Interactive Virtual Clinic Tour
          </h2>
          <p className="font-sans text-xs text-brand-slate/50 mt-2 font-semibold uppercase tracking-wider">
            Step inside our clinical, radiologic, and surgical facilities at Saveetha Hospital.
          </p>
          <div className="w-12 h-1 bg-brand-blue mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Map/Stage Selection and Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <span className="font-mono text-[9px] font-bold tracking-wider text-brand-blue uppercase bg-brand-blue/10 px-2 py-1 rounded">
                Navigation Panel
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-navy">Select Clinical Suite</h3>

              <div className="space-y-2">
                {TOUR_STOPS.map((stop) => {
                  const isActive = stop.id === activeStopId;
                  return (
                    <button
                      key={stop.id}
                      onClick={() => handleStopChange(stop.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                        isActive
                          ? 'bg-brand-navy border-brand-navy text-white shadow-xl shadow-brand-navy/10'
                          : 'bg-white border-brand-navy/5 text-brand-slate hover:border-brand-blue/30'
                      }`}
                    >
                      <div>
                        <h4 className={`font-serif text-sm font-bold ${isActive ? 'text-white' : 'text-brand-navy'}`}>
                          {stop.title}
                        </h4>
                        <p className={`font-sans text-[11px] mt-0.5 font-light ${isActive ? 'text-gray-300' : 'text-brand-slate/50'}`}>
                          {stop.stats[0].label}: {stop.stats[0].value}
                        </p>
                      </div>
                      <Navigation className={`w-4.5 h-4.5 shrink-0 transition-transform ${isActive ? 'text-brand-blue rotate-45 scale-110' : 'text-brand-slate/35'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-brand-navy/10">
              <h4 className="font-serif text-base font-bold text-brand-navy">{activeStop.title}</h4>
              <p className="font-sans text-xs sm:text-sm text-brand-slate/70 leading-relaxed font-light">
                {activeStop.description}
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-3">
                {activeStop.stats.map((stat, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-brand-navy/5">
                    <p className="font-mono text-[10px] text-brand-blue font-bold uppercase tracking-wider">{stat.value}</p>
                    <p className="font-sans text-[9px] text-brand-slate/40 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage with Interactive Hotspots */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-brand-navy rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden min-h-[450px]">
            {/* Visual Isometric Wireframe Simulation (Made using clean CSS grid lines and floating cubes) */}
            <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4.5 h-4.5 text-brand-blue animate-pulse" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Visual Simulation Lab</span>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/30 px-2.5 py-1 rounded-full">
                <Shield className="w-3.5 h-3.5 text-brand-blue" />
                <span className="font-mono text-[9px] font-bold text-brand-blue uppercase">FDA Standard Compliant</span>
              </div>
            </div>

            {/* Simulated Room Interior Interactive Board */}
            <div className="relative flex-1 bg-brand-navy/60 border border-white/5 rounded-2xl overflow-hidden min-h-[250px] flex items-center justify-center p-6">
              {/* Abstract Room Outline Isometric Blocks */}
              <div className="absolute w-[80%] h-[70%] border border-white/5 rounded-3xl rotate-x-[50deg] rotate-z-[25deg] transform-style-3d pointer-events-none">
                <div className="absolute inset-10 border border-brand-blue/10 rounded-2xl animate-pulse-soft" />
                <div className="absolute right-0 bottom-0 w-32 h-32 border-l border-t border-brand-blue/10" />
              </div>

              {/* Pulsing Target Hotspots */}
              {activeStop.hotspots.map((spot, i) => {
                const isSelected = selectedHotspot?.title === spot.title;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedHotspot(spot)}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <span className="absolute inline-flex h-7 w-7 rounded-full bg-brand-blue/30 animate-ping" />
                    <span className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-[10px] font-mono font-bold border transition-all ${
                      isSelected 
                        ? 'bg-brand-blue border-white text-white scale-125 shadow-lg shadow-brand-blue/50' 
                        : 'bg-brand-navy border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
                    }`}>
                      {spot.label}
                    </span>

                    {/* Popover on Hover (Desktop fallback) */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 rounded-lg bg-black/95 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 z-30">
                      <strong className="block font-serif text-[11px] mb-0.5 text-brand-blue">{spot.title}</strong>
                      {spot.description}
                    </span>
                  </button>
                );
              })}

              {/* Interactive Dynamic Simulation Interface */}
              <div className="w-full z-15 mt-4">
                {activeStopId === 'cbct-lounge' && (
                  <div className="w-full flex flex-col gap-3 bg-slate-900/95 border border-slate-800 p-4 rounded-2xl shadow-inner text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <p className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                          Simulation: 3D Bone Density & Implant Placement
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <button 
                          onClick={handleStartCBCT}
                          disabled={cbctScanActive}
                          className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-[9px] font-bold uppercase tracking-wider transition-colors"
                        >
                          {cbctScanActive ? `Scanning ${scanProgress}%` : 'Run 3D CBCT Scan'}
                        </button>
                        <button 
                          onClick={handleResetCBCT}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                          title="Reset"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="relative h-28 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />

                      {/* Jawbone cross section */}
                      <div className="absolute w-64 h-12 bottom-0 bg-slate-800/30 rounded-t-[20px] border-t-2 border-emerald-500/20 flex items-end justify-around px-4">
                        {[55, 65, 80, 75, 85, 70, 60, 50, 45, 65, 75, 80].map((density, idx) => (
                          <div key={idx} className="flex flex-col items-center justify-end h-full w-2">
                            <motion.div 
                              animate={{ 
                                height: cbctScanActive ? `${density}%` : '20%',
                                backgroundColor: cbctScanActive ? '#10b981' : '#38bdf8' 
                              }}
                              transition={{ duration: 0.8, delay: idx * 0.04 }}
                              className="w-full rounded-t-sm opacity-50"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Implant Titanium Screw */}
                      <motion.div 
                        style={{ y: -20 }}
                        animate={{ 
                          y: implantPlaced ? 12 : -35,
                          opacity: implantPlaced ? 1 : 0.3
                        }}
                        transition={{ type: "spring", stiffness: 90 }}
                        className="absolute flex flex-col items-center z-10"
                      >
                        <div className="w-3.5 h-2.5 bg-slate-300 rounded-t-xs" />
                        <div className="w-2.5 h-0.5 bg-slate-400" />
                        <div className="w-2 h-0.5 bg-slate-500" />
                        <div className="w-1.5 h-1.5 bg-slate-600 rounded-b-xs" />
                        <div className="w-1 h-1.5 bg-amber-500 -mt-5" />
                      </motion.div>

                      {/* Scanner Sweep beam */}
                      {cbctScanActive && (
                        <motion.div 
                          animate={{ y: [-40, 50, -40] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                          className="absolute left-0 right-0 h-0.5 bg-sky-400/80 shadow-[0_0_8px_#38bdf8] z-20 pointer-events-none"
                        />
                      )}

                      {!cbctScanActive && !implantPlaced && (
                        <p className="absolute text-[9px] text-slate-400 font-mono text-center max-w-[220px] bg-slate-950/90 p-1.5 rounded border border-slate-800">
                          Click <strong className="text-sky-400">"Run 3D CBCT Scan"</strong> to map bone or place simulated implant.
                        </p>
                      )}

                      {implantPlaced && (
                        <div className="absolute top-2 right-2 bg-emerald-500/20 border border-emerald-500/30 rounded px-1.5 py-0.5 text-[7px] font-mono text-emerald-400 uppercase font-black">
                          Osseointegrated 98%
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setImplantPlaced(!implantPlaced)}
                        className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[9px] font-bold uppercase tracking-wider border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                      >
                        {implantPlaced ? "Remove Planned Implant" : "Simulate Titanium Implant"}
                      </button>
                    </div>
                  </div>
                )}

                {activeStopId === 'laser-suite' && (
                  <div className="w-full flex flex-col gap-3 bg-slate-900/95 border border-slate-800 p-4 rounded-2xl shadow-inner text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                        <p className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                          Simulation: Selective Laser Decontamination
                        </p>
                      </div>
                      <span className="text-[8px] font-mono text-slate-400 uppercase">
                        Frequencies: <span className="text-emerald-400 font-bold">2940nm</span> / <span className="text-rose-400 font-bold">810nm</span>
                      </span>
                    </div>

                    <div className="relative h-28 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />

                      {/* Simulated teeth and periodontal sulcus pocket */}
                      <div className="flex gap-2.5 items-end justify-center w-full px-4 z-10">
                        {debrisState.map((hasDebris, idx) => (
                          <div key={idx} className="relative flex flex-col items-center">
                            <div className="w-8 h-8 bg-white rounded-t-lg border border-slate-300 flex items-center justify-center relative">
                              <span className="text-[7px] font-bold text-slate-400">{idx + 1}</span>
                            </div>
                            <div className="w-9 h-4 bg-rose-200/90 rounded-b-xs relative flex items-center justify-center overflow-hidden">
                              {hasDebris ? (
                                <motion.div 
                                  layoutId={`debris-${idx}`}
                                  className="absolute inset-x-0.5 top-0 h-1.5 bg-slate-800/90 rounded-xs bg-[radial-gradient(#ef4444_2.5px,transparent_2.5px)] [background-size:4px_4px]"
                                />
                              ) : (
                                <div className="absolute inset-x-0.5 top-0 h-1 bg-emerald-400/40 rounded-xs" />
                              )}
                            </div>

                            <button 
                              onClick={() => handleFireLaser(idx)}
                              className="mt-1 text-[7px] px-1 py-0.5 rounded bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 transition-all font-mono uppercase"
                            >
                              {hasDebris ? "Target" : "Clean"}
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Animated Laser line path */}
                      {laserActive && activeLaserTarget !== null && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                          <motion.line 
                            x1="50%" 
                            y1="0" 
                            x2={`${18 + activeLaserTarget * 16}%`} 
                            y2="78" 
                            stroke="#f43f5e" 
                            strokeWidth="2"
                            strokeDasharray="3 2"
                            animate={{ strokeDashoffset: [0, -6] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 0.15 }}
                          />
                          <circle 
                            cx={`${18 + activeLaserTarget * 16}%`} 
                            cy="78" 
                            r="6" 
                            fill="none" 
                            stroke="#10b981" 
                            strokeWidth="1.5" 
                            className="animate-ping"
                          />
                        </svg>
                      )}

                      {debrisState.every(d => !d) && (
                        <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xs flex flex-col items-center justify-center z-30 p-2 text-center">
                          <Sparkles className="w-4 h-4 text-emerald-400 mb-0.5 animate-pulse" />
                          <p className="font-serif text-[11px] font-bold text-white">Bacterial Disintegration: 99.997%</p>
                          <p className="font-mono text-[7px] text-emerald-300 mt-0.5 uppercase">Sulcular Pocket fully sterilized</p>
                          <button 
                            onClick={handleResetLaser}
                            className="mt-2 px-2.5 py-0.5 rounded bg-white text-slate-900 text-[8px] font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors"
                          >
                            Reset Sim
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeStopId === 'sterility-bay' && (
                  <div className="w-full flex flex-col gap-3 bg-slate-900/95 border border-slate-800 p-4 rounded-2xl shadow-inner text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <p className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                          Simulation: Class-B Autoclave Chamber
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <button 
                          onClick={handleStartSterile}
                          disabled={autoclavePhase !== 'idle'}
                          className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-[9px] font-bold uppercase tracking-wider transition-colors"
                        >
                          {autoclavePhase === 'idle' ? 'Start Cycle' : `Phase: ${autoclavePhase}`}
                        </button>
                        <button 
                          onClick={handleResetSterile}
                          className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                          title="Reset"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="relative h-28 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center p-3 overflow-hidden">
                      {/* Chamber temperature indicators */}
                      <div className="absolute top-1.5 left-2.5 flex gap-2.5 z-10 font-mono text-[8px] text-slate-400">
                        <div className="flex items-center gap-0.5">
                          <Thermometer className="w-3 h-3 text-rose-400" />
                          <span>{temperature}°C</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Gauge className="w-3 h-3 text-sky-400" />
                          <span>{pressure.toFixed(1)} Bar</span>
                        </div>
                      </div>

                      <div className="absolute top-1.5 right-2.5 font-mono text-[8px] text-slate-400 z-10">
                        Sanitation: <span className="font-bold text-emerald-400">{sterilizationProgress}%</span>
                      </div>

                      {autoclavePhase === 'vacuum' && (
                        <motion.div 
                          animate={{ opacity: [0.15, 0.4, 0.15] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="absolute inset-0 bg-sky-500/10 pointer-events-none z-0"
                        />
                      )}
                      {autoclavePhase === 'heating' && (
                        <motion.div 
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="absolute inset-0 bg-rose-500/10 pointer-events-none z-0"
                        />
                      )}

                      {/* Instrument Cassette */}
                      <div className="border border-slate-800 rounded p-2 bg-slate-900/95 w-full z-10 flex flex-col gap-1 max-w-[280px]">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[7px] font-mono text-slate-500 uppercase">
                          <span>Payload Rack B</span>
                          <span>CDC Standard Active</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['Scalpel', 'Curette', 'Driver'].map((tool, idx) => (
                            <div key={idx} className="bg-slate-950 p-1 rounded border border-slate-800/60 flex flex-col items-center justify-center text-center">
                              <div className="w-full h-0.5 bg-slate-800 rounded-full mb-1 overflow-hidden">
                                <motion.div 
                                  animate={{ 
                                    width: `${sterilizationProgress}%`,
                                    backgroundColor: autoclavePhase === 'complete' ? '#10b981' : '#38bdf8'
                                  }}
                                  className="h-full"
                                />
                              </div>
                              <span className="font-sans text-[7px] font-bold text-slate-300 leading-none truncate w-full">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hotspot details tray */}
            <div className="relative z-10 border-t border-white/10 pt-4 mt-4 text-left">
              <AnimatePresence mode="wait">
                {selectedHotspot ? (
                  <motion.div
                    key={selectedHotspot.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Info className="w-4 h-4 text-brand-blue shrink-0" />
                      <h4 className="font-serif text-sm font-bold text-brand-blue">{selectedHotspot.title}</h4>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed pl-6">
                      {selectedHotspot.description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-gray-300">Sanitation Certification & Log</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {activeStop.specifications.map((spec, i) => (
                          <div key={i} className="text-[10px] font-sans text-gray-400 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-brand-blue shrink-0" />
                            {spec}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
