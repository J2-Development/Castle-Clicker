import { useState, useEffect, useRef, useCallback } from "react";
import { VentureIcon, CompanionPortrait, GoldCoinIcon, SoulGemIcon } from "./src/GameAssets.jsx";

// ═══ ICONS ═══
/* ═══════════════════════════════════════════════════════════════
   Castle Capitalist — Custom SVG Icon Library
   Hand-crafted dungeon-themed icons. No emoji. No AI slop.
   ═══════════════════════════════════════════════════════════════ */

const TorchIcon = ({ color = "#f0c030", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <rect x="17" y="20" width="6" height="16" rx="1.5" fill="#8B6914" stroke="#5a4510" strokeWidth="0.8"/>
    <rect x="18.5" y="21" width="3" height="14" rx="1" fill="#a07820" opacity="0.4"/>
    <ellipse cx="20" cy="19" rx="5" ry="4" fill={color} opacity="0.25"/>
    <path d="M20 6 C14 12, 14 16, 17 19 C18 20, 22 20, 23 19 C26 16, 26 12, 20 6Z" fill={color}/>
    <path d="M20 9 C17 13, 17 15, 18.5 17.5 C19 18.5, 21 18.5, 21.5 17.5 C23 15, 23 13, 20 9Z" fill="#fff3c4" opacity="0.7"/>
    <path d="M20 12 C18.5 14, 19 16, 20 17 C21 16, 21.5 14, 20 12Z" fill="#fff" opacity="0.5"/>
  </svg>
);

const DaggerIcon = ({ color = "#6dba4a", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M12 28 L18 22 L16 20 Z" fill="#8B6914" stroke="#5a4510" strokeWidth="0.6"/>
    <rect x="17.5" y="19.5" width="5" height="2.5" rx="0.5" fill="#a0a0a0" stroke="#666" strokeWidth="0.5" transform="rotate(-45 20 20.5)"/>
    <path d="M21 19 L32 8" stroke="#ccc" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M21 19 L32 8" stroke="#e8e8e8" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M31 9 L33 7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32.5" cy="7.5" r="2" fill={color} opacity="0.3"/>
  </svg>
);

const MushroomIcon = ({ color = "#c74f8e", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <rect x="17" y="22" width="6" height="12" rx="2" fill="#e8dcc8" stroke="#bba888" strokeWidth="0.6"/>
    <rect x="18.5" y="24" width="3" height="8" rx="1" fill="#d4c4a8" opacity="0.5"/>
    <ellipse cx="20" cy="22" rx="13" ry="10" fill={color}/>
    <ellipse cx="20" cy="20" rx="11" ry="7" fill={color} opacity="0.3"/>
    <circle cx="15" cy="18" r="2.5" fill="rgba(255,255,255,0.25)"/>
    <circle cx="23" cy="16" r="1.8" fill="rgba(255,255,255,0.2)"/>
    <circle cx="19" cy="14" r="1.2" fill="rgba(255,255,255,0.2)"/>
    <circle cx="26" cy="20" r="1.5" fill="rgba(255,255,255,0.15)"/>
  </svg>
);

const SkullIcon = ({ color = "#8bb8d0", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <ellipse cx="20" cy="17" rx="11" ry="12" fill="#e8e0d0"/>
    <ellipse cx="20" cy="17" rx="11" ry="12" fill={color} opacity="0.2"/>
    <ellipse cx="20" cy="16" rx="9" ry="10" fill="#f0eade" opacity="0.3"/>
    <ellipse cx="15" cy="16" rx="3.5" ry="4" fill="#0d0f14"/>
    <ellipse cx="25" cy="16" rx="3.5" ry="4" fill="#0d0f14"/>
    <ellipse cx="15" cy="15.5" rx="1.5" ry="2" fill={color} opacity="0.6"/>
    <ellipse cx="25" cy="15.5" rx="1.5" ry="2" fill={color} opacity="0.6"/>
    <path d="M17 24 L17 28" stroke="#0d0f14" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 25 L20 29" stroke="#0d0f14" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M23 24 L23 28" stroke="#0d0f14" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="20" cy="21" rx="2" ry="1.5" fill="#151922"/>
  </svg>
);

const GearIcon = ({ color = "#e85d3a", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <g transform="translate(20,20)">
      {[0,45,90,135,180,225,270,315].map((a, i) => (
        <rect key={i} x="-2.8" y="-14" width="5.6" height="6" rx="1.2" fill={color} transform={`rotate(${a})`} stroke="#5a4510" strokeWidth="0.4"/>
      ))}
      <circle r="9" fill={color} stroke="#5a4510" strokeWidth="0.6"/>
      <circle r="4" fill="#0d0f14"/>
      <circle r="2.5" fill={color} opacity="0.3"/>
    </g>
  </svg>
);

const ChestIcon = ({ color = "#a855f7", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <rect x="7" y="18" width="26" height="14" rx="2" fill="#8B6914" stroke="#5a4510" strokeWidth="0.8"/>
    <rect x="8" y="19" width="24" height="5" fill="#a07820" opacity="0.3"/>
    <path d="M7 18 L7 14 Q7 10, 11 10 L29 10 Q33 10, 33 14 L33 18 Z" fill={color} stroke="#5a4510" strokeWidth="0.8"/>
    <path d="M9 17 L9 14 Q9 12, 12 12 L28 12 Q31 12, 31 14 L31 17 Z" fill="#e8c060" opacity="0.3"/>
    <rect x="17" y="15" width="6" height="8" rx="1" fill="#5a4510"/>
    <circle cx="20" cy="20" r="2" fill={color}/>
    <circle cx="20" cy="20" r="1" fill="#fff" opacity="0.3"/>
  </svg>
);

const DragonIcon = ({ color = "#ef4444", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <ellipse cx="20" cy="22" rx="10" ry="9" fill={color}/>
    <ellipse cx="20" cy="21" rx="8" ry="7" fill="#e06060" opacity="0.3"/>
    <path d="M10 18 L6 8 L14 14 Z" fill={color} stroke="#8a2020" strokeWidth="0.5"/>
    <path d="M30 18 L34 8 L26 14 Z" fill={color} stroke="#8a2020" strokeWidth="0.5"/>
    <ellipse cx="15" cy="19" rx="3" ry="3.5" fill="#0d0f14"/>
    <ellipse cx="25" cy="19" rx="3" ry="3.5" fill="#0d0f14"/>
    <ellipse cx="15.8" cy="18.5" rx="1.2" ry="2" fill="#f0c030"/>
    <ellipse cx="25.8" cy="18.5" rx="1.2" ry="2" fill="#f0c030"/>
    <ellipse cx="18" cy="27" rx="1" ry="0.6" fill="#0d0f14"/>
    <ellipse cx="22" cy="27" rx="1" ry="0.6" fill="#0d0f14"/>
    <path d="M16 30 L18 32 L20 30 L22 32 L24 30" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6"/>
  </svg>
);

const CrownIcon = ({ color = "#14b8a6", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M8 28 L8 16 L14 22 L20 12 L26 22 L32 16 L32 28 Z" fill={color} stroke="#0d7a6e" strokeWidth="0.8"/>
    <path d="M10 27 L10 18 L14.5 22.5 L20 14 L25.5 22.5 L30 18 L30 27 Z" fill="#5eead4" opacity="0.25"/>
    <rect x="8" y="27" width="24" height="4" rx="1" fill={color} stroke="#0d7a6e" strokeWidth="0.8"/>
    <circle cx="14" cy="16" r="2" fill="#f0c030"/>
    <circle cx="20" cy="12" r="2.5" fill="#f0c030"/>
    <circle cx="26" cy="16" r="2" fill="#f0c030"/>
    <circle cx="14" cy="16" r="0.8" fill="#fff" opacity="0.5"/>
    <circle cx="20" cy="12" r="1" fill="#fff" opacity="0.5"/>
    <circle cx="26" cy="16" r="0.8" fill="#fff" opacity="0.5"/>
  </svg>
);

const VolcanoIcon = ({ color = "#f97316", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M4 36 L15 12 L25 12 L36 36 Z" fill="#5a3a1a" stroke="#3a2510" strokeWidth="0.6"/>
    <path d="M8 36 L16 14 L24 14 L32 36 Z" fill="#6a4a2a" opacity="0.4"/>
    <ellipse cx="20" cy="12" rx="6" ry="3" fill="#3a2510"/>
    <path d="M16 12 Q18 4, 20 2 Q22 4, 24 12" fill={color} opacity="0.8"/>
    <path d="M17.5 12 Q19 6, 20 4 Q21 6, 22.5 12" fill="#f0c030" opacity="0.6"/>
    <circle cx="18" cy="7" r="1.5" fill={color} opacity="0.5"/>
    <circle cx="22" cy="5" r="1" fill="#f0c030" opacity="0.5"/>
    <circle cx="20" cy="3" r="1.5" fill="#fff" opacity="0.2"/>
    <path d="M14 24 Q16 22, 18 24 Q20 22, 22 24 Q24 22, 26 24" stroke={color} strokeWidth="1" fill="none" opacity="0.4"/>
  </svg>
);

const VoidIcon = ({ color = "#6366f1", size = 28 }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <circle cx="20" cy="20" r="13" fill="#0a1a2a" stroke={color} strokeWidth="1"/>
    <circle cx="20" cy="20" r="10" fill="none" stroke={color} strokeWidth="0.6" opacity="0.5"/>
    <circle cx="20" cy="20" r="7" fill="none" stroke={color} strokeWidth="0.4" opacity="0.3"/>
    <circle cx="20" cy="20" r="4" fill={color} opacity="0.3"/>
    <circle cx="20" cy="20" r="2" fill={color} opacity="0.5"/>
    <circle cx="20" cy="20" r="0.8" fill="#fff" opacity="0.8"/>
    {[0,60,120,180,240,300].map((a, i) => (
      <circle key={i} cx={20 + 11 * Math.cos(a * Math.PI / 180)} cy={20 + 11 * Math.sin(a * Math.PI / 180)} r="1.2" fill={color} opacity="0.4"/>
    ))}
  </svg>
);

const GoldCoin = ({ size = 14 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} style={{verticalAlign:'middle', marginRight:2, display:'inline-block'}}>
    <circle cx="10" cy="10" r="8" fill="#f0c030" stroke="#a07818" strokeWidth="1.2"/>
    <circle cx="10" cy="10" r="5.5" fill="none" stroke="#a07818" strokeWidth="0.6" opacity="0.4"/>
    <text x="10" y="14" textAnchor="middle" fill="#8a6010" fontSize="10" fontWeight="bold" fontFamily="serif">G</text>
  </svg>
);

const SoulGem = ({ size = 14 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} style={{verticalAlign:'middle', marginRight:2, display:'inline-block'}}>
    <path d="M6 8 L10 3 L14 8 L10 17 Z" fill="#c084fc" stroke="#7c3aed" strokeWidth="0.8"/>
    <path d="M6 8 L10 3 L10 17 Z" fill="#d4a0ff" opacity="0.3"/>
    <path d="M8 7 L10 4 L12 7 L10 8 Z" fill="#fff" opacity="0.2"/>
  </svg>
);

// Ordered array matching venture indices
const VENTURE_ICONS = [
  TorchIcon, DaggerIcon, MushroomIcon, SkullIcon, GearIcon,
  ChestIcon, DragonIcon, CrownIcon, VolcanoIcon, VoidIcon,
];


// ═══ CONFIG ═══
/* ═══════════════════════════════════════════════════════════════
   Castle Capitalist — Game Configuration
   All tuning knobs in one place. Tweak these to balance the game.
   ═══════════════════════════════════════════════════════════════ */

const VENTURES = [
  { id:0, name:"Torch Scavenging",     color:"#e8a023", colorDark:"#a06810", baseCost:4,           baseRevenue:1,              baseTime:600,    unlockCost:0 },
  { id:1, name:"Goblin Pickpocketing",  color:"#6dba4a", colorDark:"#3d7a22", baseCost:60,          baseRevenue:17,             baseTime:1000,   unlockCost:60 },
  { id:2, name:"Mushroom Foraging",     color:"#c74f8e", colorDark:"#8a2a5e", baseCost:720,         baseRevenue:267,            baseTime:1600,   unlockCost:720 },
  { id:3, name:"Skeleton Looting",      color:"#8bb8d0", colorDark:"#4a7a94", baseCost:8640,        baseRevenue:4200,           baseTime:2500,   unlockCost:8640 },
  { id:4, name:"Trap Disarming",        color:"#e85d3a", colorDark:"#a33820", baseCost:103680,      baseRevenue:66700,          baseTime:4000,   unlockCost:103680 },
  { id:5, name:"Potion Brewing",        color:"#a855f7", colorDark:"#6a2aaa", baseCost:1244160,     baseRevenue:1083000,        baseTime:6500,   unlockCost:1244160 },
  { id:6, name:"Dragon Taming",         color:"#ef4444", colorDark:"#991b1b", baseCost:14929920,    baseRevenue:16670000,       baseTime:10000,  unlockCost:14929920 },
  { id:7, name:"Dungeon Expansion",     color:"#14b8a6", colorDark:"#0d7a6e", baseCost:179159040,   baseRevenue:266700000,      baseTime:16000,  unlockCost:179159040 },
  { id:8, name:"Demon Gate Siege",      color:"#f97316", colorDark:"#b45210", baseCost:2149908480,  baseRevenue:4334000000,     baseTime:26000,  unlockCost:2149908480 },
  { id:9, name:"Elder God Pact",        color:"#6366f1", colorDark:"#4338ca", baseCost:25798901760, baseRevenue:70000000000,    baseTime:42000,  unlockCost:25798901760 },
];

// Revenue multiplied at ownership thresholds (sawtooth spikes)
// { at: count, mult: multiplier } — bigger spikes at 25, 100, 500 for dopamine hits
const MILESTONES = [
  { at:25,   mult:3 },
  { at:50,   mult:2 },
  { at:100,  mult:3 },
  { at:200,  mult:2 },
  { at:300,  mult:2 },
  { at:400,  mult:2 },
  { at:500,  mult:3 },
  { at:600,  mult:2 },
  { at:700,  mult:2 },
  { at:800,  mult:2 },
  { at:900,  mult:2 },
  { at:1000, mult:3 },
  { at:1100, mult:2 },
  { at:1200, mult:2 },
  { at:1300, mult:2 },
  { at:1400, mult:2 },
  { at:1500, mult:2 },
  { at:1600, mult:2 },
  { at:1700, mult:2 },
  { at:1800, mult:2 },
  { at:1900, mult:2 },
  { at:2000, mult:3 },
  { at:2250, mult:2 },
  { at:2500, mult:2 },
  { at:2750, mult:2 },
  { at:3000, mult:2 },
  { at:3500, mult:2 },
  { at:4000, mult:2 },
  { at:4500, mult:2 },
  { at:5000, mult:3 },
];

// Cost to recruit each companion (auto-runner)
const COMPANION_COSTS = [
  1000, 15000, 100000, 500000, 10_000_000,
  100_000_000, 1_000_000_000, 100_000_000_000,
  5_000_000_000_000, 500_000_000_000_000,
];

const COMPANION_NAMES = [
  "Squire Finn",
  "Rogue Nyx",
  "Fungi Sage",
  "Bone Collector",
  "Trapmaster Vex",
  "Chest Warden",
  "Dragonkeeper Ash",
  "Lich Servant Morrn",
  "Demon Binder Kael",
  "Void Priest Zara",
];

const COMPANION_DESCS = [
  "A loyal torchbearer",
  "Nimble-fingered thief",
  "Ancient spore whisperer",
  "Harvests the undead",
  "Defuses any mechanism",
  "Guards mimics & loot",
  "Speaks draconic tongue",
  "Bound beyond death",
  "Commands hellfire",
  "Channels the abyss",
];

// Prestige config
const PRESTIGE_BASE = 1e10;       // lifetime gold needed for first gem
const PRESTIGE_GEM_BONUS = 0.03;  // +3% per gem

// Cost scaling
const COST_EXPONENT = 1.12;       // each unit costs 12% more

// Offline earnings multiplier (1.0 = full, 0.25 = quarter)
const OFFLINE_EFFICIENCY = 0.25;

// Max offline time counted (8 hours in ms)
const OFFLINE_CAP = 8 * 60 * 60 * 1000;

// Save key for localStorage / AsyncStorage
const SAVE_KEY = "castle_capitalist_v4";


// ═══ MATH UTILS ═══
/* ═══════════════════════════════════════════════════════════════
   Castle Capitalist — Game Math Utilities
   Pure functions for all game calculations.
   ═══════════════════════════════════════════════════════════════ */


/**
 * Get the cumulative milestone multiplier for a given ownership count.
 * Revenue doubles at each milestone threshold.
 */
const getMilestoneMultiplier = (count) => {
  let mult = 1;
  for (const ms of MILESTONES) {
    if (count >= ms.at) mult *= ms.mult;
    else break;
  }
  return mult;
};

/**
 * Cost of the Nth unit (0-indexed from current owned count).
 */
const getUnitCost = (baseCost, owned) => {
  return Math.floor(baseCost * Math.pow(COST_EXPONENT, owned));
};

/**
 * Total cost to buy `qty` units starting from `owned`.
 */
const getBulkCost = (baseCost, owned, qty) => {
  let total = 0;
  for (let i = 0; i < qty; i++) {
    total += getUnitCost(baseCost, owned + i);
  }
  return total;
};

/**
 * Revenue per cycle for a venture at given count and prestige multiplier.
 */
const getRevenue = (venture, count, prestigeMultiplier) => {
  return venture.baseRevenue * count * getMilestoneMultiplier(count) * prestigeMultiplier;
};

/**
 * Maximum units buyable with current gold.
 */
const getMaxBuyable = (baseCost, owned, gold) => {
  let max = 0;
  let cost = 0;
  let o = owned;
  while (cost + getUnitCost(baseCost, o) <= gold) {
    cost += getUnitCost(baseCost, o);
    o++;
    max++;
  }
  return max;
};

/**
 * Calculate prestige gems earned from lifetime gold.
 */
const calcPrestigeGems = (lifetimeGold) => {
  return Math.max(0, Math.floor(Math.sqrt(lifetimeGold / PRESTIGE_BASE)));
};

/**
 * Find the next milestone threshold above current count.
 */
const getNextMilestone = (count) => {
  const next = MILESTONES.find(m => count < m.at);
  return next ? next.at : "MAX";
};

/**
 * Format large numbers with suffixes (K, M, B, T, Qa, etc.)
 */
const formatNumber = (n) => {
  if (n < 0) return "-" + formatNumber(-n);
  if (n < 1000) return Math.floor(n).toString();

  const SUFFIXES = [
    "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No",
    "Dc", "UDc", "DDc", "TDc", "QaDc", "QiDc", "SxDc", "SpDc", "OcDc", "NoDc",
    "Vg", "UVg", "DVg", "TVg", "QaVg", "QiVg", "SxVg", "SpVg", "OcVg", "NoVg", "Tg",
  ];

  let tier = 0;
  let scaled = n;
  while (scaled >= 1000 && tier < SUFFIXES.length - 1) {
    scaled /= 1000;
    tier++;
  }

  const decimals = scaled < 10 ? 2 : scaled < 100 ? 1 : 0;
  return scaled.toFixed(decimals) + " " + SUFFIXES[tier];
};

/**
 * Format milliseconds as MM:SS or H:MM:SS
 */
const formatTime = (ms) => {
  const totalSeconds = ms / 1000;
  if (totalSeconds < 1) return "00:00";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


// ═══ MAIN GAME ═══
/* ═══════════════════════════════════════════════════════════════
   Castle Capitalist — Main Game Component
   An idle/incremental dungeon game inspired by Adventure Capitalist.
   
   Web prototype (React). Architecture designed to port cleanly to
   React Native + Expo for iOS/Android release.
   ═══════════════════════════════════════════════════════════════ */


// ── Initial State ──
const createInitialState = () =>
  VENTURES.map((_, i) => ({
    owned: i === 0 ? 1 : 0,
    hasCompanion: false,
    progress: 0,
    running: false,
  }));

export default function CastleCapitalist() {
  const [gold, setGold] = useState(4);
  const [ventures, setVentures] = useState(createInitialState);
  const [prestigeGems, setPrestigeGems] = useState(0);
  const [totalGems, setTotalGems] = useState(0);
  const [buyQty, setBuyQty] = useState(1);
  const [tab, setTab] = useState("ventures");
  const [lifetimeGold, setLifetimeGold] = useState(0);

  const lastTick = useRef(Date.now());
  const animRef = useRef(null);
  const goldRef = useRef(gold);
  const venturesRef = useRef(ventures);
  const gemsRef = useRef(prestigeGems);

  goldRef.current = gold;
  venturesRef.current = ventures;
  gemsRef.current = prestigeGems;

  const prestigeMultiplier = 1 + totalGems * PRESTIGE_GEM_BONUS;

  // ═══ SAVE / LOAD ═══
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const save = JSON.parse(raw);

      if (save.gold != null) setGold(save.gold);
      if (save.ventures) setVentures(save.ventures);
      if (save.prestigeGems != null) setPrestigeGems(save.prestigeGems);
      if (save.totalGems != null) setTotalGems(save.totalGems);
      if (save.lifetimeGold != null) setLifetimeGold(save.lifetimeGold);

      // Offline earnings
      if (save.lastSave && save.ventures) {
        const elapsed = Math.min(Date.now() - save.lastSave, OFFLINE_CAP);
        if (elapsed > 5000) {
          let offlineGold = 0;
          const pm = 1 + (save.totalGems || 0) * PRESTIGE_GEM_BONUS;
          save.ventures.forEach((vs, i) => {
            if (vs.hasCompanion && vs.owned > 0) {
              const rev = getRevenue(VENTURES[i], vs.owned, pm);
              const cycles = Math.floor(elapsed / VENTURES[i].baseTime);
              offlineGold += rev * cycles * OFFLINE_EFFICIENCY;
            }
          });
          if (offlineGold > 0) {
            setGold(g => g + offlineGold);
            setLifetimeGold(l => l + offlineGold);
          }
        }
      }
    } catch (e) { /* corrupted save, start fresh */ }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
          gold: goldRef.current,
          ventures: venturesRef.current,
          prestigeGems: gemsRef.current,
          totalGems,
          lifetimeGold,
          lastSave: Date.now(),
        }));
      } catch (e) {}
    }, 5000);
    return () => clearInterval(interval);
  }, [totalGems, lifetimeGold]);

  // ═══ GAME LOOP ═══
  const tick = useCallback(() => {
    const now = Date.now();
    const dt = now - lastTick.current;
    lastTick.current = now;

    setVentures(prev => {
      let earned = 0;
      const next = prev.map((vs, i) => {
        if (vs.owned === 0 || (!vs.running && !vs.hasCompanion)) return vs;

        let newProgress = vs.progress + dt;
        const cycleTime = VENTURES[i].baseTime;

        if (newProgress >= cycleTime) {
          const cycles = Math.floor(newProgress / cycleTime);
          earned += getRevenue(VENTURES[i], vs.owned, prestigeMultiplier) * cycles;

          if (vs.hasCompanion) {
            return { ...vs, progress: newProgress % cycleTime, running: true };
          }
          return { ...vs, progress: 0, running: false };
        }
        return { ...vs, progress: newProgress };
      });

      if (earned > 0) {
        setGold(g => g + earned);
        setLifetimeGold(l => l + earned);
      }
      return next;
    });

    animRef.current = requestAnimationFrame(tick);
  }, [prestigeMultiplier]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [tick]);

  // ═══ ACTIONS ═══
  const handleBuyVenture = (idx) => {
    const v = VENTURES[idx];
    const vs = ventures[idx];
    const qty = buyQty === -1 ? Math.max(1, getMaxBuyable(v.baseCost, vs.owned, gold)) : buyQty;
    const cost = getBulkCost(v.baseCost, vs.owned, qty);
    if (gold < cost) return;
    setGold(g => g - cost);
    setVentures(prev => prev.map((s, i) => i === idx ? { ...s, owned: s.owned + qty } : s));
  };

  const handleStartVenture = (idx) => {
    setVentures(prev => prev.map((s, i) =>
      i === idx && s.owned > 0 && !s.running ? { ...s, running: true, progress: 0 } : s
    ));
  };

  const handleBuyCompanion = (idx) => {
    const cost = COMPANION_COSTS[idx];
    if (gold < cost || ventures[idx].hasCompanion || ventures[idx].owned === 0) return;
    setGold(g => g - cost);
    setVentures(prev => prev.map((s, i) =>
      i === idx ? { ...s, hasCompanion: true, running: true } : s
    ));
  };

  const pendingGems = calcPrestigeGems(lifetimeGold);

  const handlePrestige = () => {
    if (pendingGems <= 0) return;
    setPrestigeGems(g => g + pendingGems);
    setTotalGems(t => t + pendingGems);
    setGold(4);
    setVentures(createInitialState());
    setLifetimeGold(0);
  };

  const handleHardReset = () => {
    if (!confirm("Hard reset everything? This erases ALL progress including Soul Gems.")) return;
    localStorage.removeItem(SAVE_KEY);
    setGold(4);
    setVentures(createInitialState());
    setPrestigeGems(0);
    setTotalGems(0);
    setLifetimeGold(0);
  };

  // ═══ DERIVED VALUES ═══
  const goldPerSecond = VENTURES.reduce((sum, v, i) => {
    const vs = ventures[i];
    if (vs.owned === 0 || (!vs.running && !vs.hasCompanion)) return sum;
    return sum + getRevenue(v, vs.owned, prestigeMultiplier) / (v.baseTime / 1000);
  }, 0);

  // ═══ RENDER ═══
  return (
    <div className="cc">
      <style>{STYLES}</style>

      {/* ── HEADER ── */}
      <div className="hd">
        <div className="hd-top">
          <span className="hd-title">⚔ CASTLE CAPITALIST</span>
          <span className="hd-gems" onClick={() => setTab("prestige")}>
            <SoulGemIcon /> {prestigeGems} ({prestigeMultiplier.toFixed(2)}x)
          </span>
        </div>
        <div className="hd-gold">
          <div className="hd-gold-left">
            <GoldCoinIcon size={18} />
            <span className="hd-amount">{formatNumber(gold)}</span>
            <span className="hd-label">GOLD</span>
          </div>
          <span className="hd-gps"><GoldCoinIcon /> {formatNumber(goldPerSecond)}/sec</span>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="tabs">
        {[
          { key: "ventures",   label: "⚔ Ventures" },
          { key: "companions", label: "🛡 Companions" },
          { key: "upgrades",   label: "⬆ Upgrades" },
          { key: "prestige",   label: "✦ Ascend" },
        ].map(t => (
          <button key={t.key}
            className={`tab ${tab === t.key ? 'tab-on' : ''}`}
            onClick={() => setTab(t.key)}
          >{t.label}</button>
        ))}
      </div>

      {/* ── BUY QTY ── */}
      {tab === "ventures" && (
        <div className="qty-row">
          {[1, 10, 100, -1].map(q => (
            <button key={q}
              className={`qty ${buyQty === q ? 'qty-on' : ''}`}
              onClick={() => setBuyQty(q)}
            >{q === -1 ? "MAX" : `×${q}`}</button>
          ))}
        </div>
      )}

      {/* ── VENTURES TAB ── */}
      {tab === "ventures" && (
        <div className="vent-list">
          {VENTURES.map((v, i) => {
            const vs = ventures[i];
            const unlocked = vs.owned > 0;
            const qty = buyQty === -1 ? Math.max(1, getMaxBuyable(v.baseCost, vs.owned, gold)) : buyQty;
            const cost = unlocked ? getBulkCost(v.baseCost, vs.owned, qty) : v.unlockCost;
            const canAfford = gold >= cost;
            const pct = unlocked ? Math.min(100, (vs.progress / v.baseTime) * 100) : 0;
            const rev = unlocked ? getRevenue(v, vs.owned, prestigeMultiplier) : 0;
            const perSec = unlocked ? rev / (v.baseTime / 1000) : 0;
            const remaining = unlocked && vs.running ? Math.max(0, v.baseTime - vs.progress) : v.baseTime;

            // Hide far-away ventures
            if (!unlocked && gold < v.unlockCost * 0.05 && i > 2) return null;

            const IconComponent = VENTURE_ICONS[i];

            return (
              <div key={v.id} className={`vrow ${!unlocked ? 'vrow-locked' : ''} ${!unlocked && canAfford ? 'vrow-afford' : ''}`}>
                {/* Badge */}
                <div className="badge-wrap" onClick={() => unlocked && handleStartVenture(i)}>
                  <div className="badge"
                    style={{
                      background: `linear-gradient(135deg, ${v.color}33, ${v.colorDark}55)`,
                      borderColor: v.color + '88',
                      overflow: 'hidden',
                    }}
                  >
                    <VentureIcon index={i} color={v.color} size={56} />
                  </div>
                  <span className="badge-ct">{vs.owned}</span>
                </div>

                {/* Info */}
                <div className="vmid" onClick={() => unlocked && handleStartVenture(i)}>
                  <div className="vname">
                    {v.name}
                    {vs.hasCompanion && <span className="auto-tag">AUTO</span>}
                  </div>
                  <div className="vrev">
                    <GoldCoinIcon /> {formatNumber(rev)}
                    <span className="vps">{formatNumber(perSec)}/s</span>
                  </div>
                  <div className="bar-out">
                    <div className="bar-in"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${v.colorDark}, ${v.color})`,
                      }}
                    />
                    <span className="bar-time">{formatTime(remaining)}</span>
                  </div>
                  <div className="vms">
                    next: <span className="vms-n">{getNextMilestone(vs.owned)}</span>
                  </div>
                </div>

                {/* Buy */}
                <button className="buy-btn" disabled={!canAfford} onClick={() => handleBuyVenture(i)}>
                  <div className="buy-q">{unlocked ? (buyQty === -1 ? `×${qty}` : `×${buyQty}`) : "UNLOCK"}</div>
                  <div className="buy-c"><GoldCoinIcon />{formatNumber(cost)}</div>
                  <div className="buy-l">{unlocked ? "Buy" : "New"}</div>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── COMPANIONS TAB ── */}
      {tab === "companions" && (
        <div className="comp-list">
          <div className="comp-hdr">🛡 Recruit Dungeon Companions</div>
          <p className="comp-sub">Companions auto-run ventures so you earn gold even while away.</p>
          {VENTURES.map((v, i) => {
            const vs = ventures[i];
            const cost = COMPANION_COSTS[i];
            const canAfford = gold >= cost && !vs.hasCompanion && vs.owned > 0;
            return (
              <div key={v.id} className="comp-row">
                <div className="comp-info">
                  <div className="comp-icon"
                    style={{
                      background: `linear-gradient(135deg, ${v.color}33, ${v.colorDark}55)`,
                      borderColor: v.color + '66',
                    }}
                  >
                    <CompanionPortrait index={i} color={v.color} size={32} />
                  </div>
                  <div>
                    <div className="comp-name">{COMPANION_NAMES[i]}</div>
                    <div className="comp-desc">{COMPANION_DESCS[i]}</div>
                  </div>
                </div>
                {vs.hasCompanion ? (
                  <span className="comp-hired">✦ RECRUITED</span>
                ) : vs.owned === 0 ? (
                  <span className="comp-locked">🔒 Locked</span>
                ) : (
                  <button className="comp-btn" disabled={!canAfford} onClick={() => handleBuyCompanion(i)}>
                    Recruit · <GoldCoinIcon />{formatNumber(cost)}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── UPGRADES TAB ── */}
      {tab === "upgrades" && (
        <div className="upgrades">
          <div className="up-hdr">⬆ Enchantments & Upgrades</div>
          <p className="up-sub">
            Speed potions, revenue multipliers, and dungeon-wide enchantments will be forged here.
            This is where rewarded ad boosts and premium power-ups would live in the mobile release.
          </p>
        </div>
      )}

      {/* ── PRESTIGE TAB ── */}
      {tab === "prestige" && (
        <div className="prest">
          <div className="prest-title">✦ DUNGEON ASCENSION ✦</div>
          <p className="prest-sub">
            Sacrifice all progress to earn <strong style={{ color: 'var(--gm)' }}>Soul Gems</strong>.
            Each gem permanently enchants ALL gold earnings by {PRESTIGE_GEM_BONUS * 100}%.
          </p>
          <div className="prest-grid">
            <div className="prest-stat">
              <div className="prest-label">Current Gems</div>
              <div className="prest-val" style={{ color: 'var(--gm)' }}><SoulGemIcon size={18} /> {prestigeGems}</div>
            </div>
            <div className="prest-stat">
              <div className="prest-label">Enchantment</div>
              <div className="prest-val">{prestigeMultiplier.toFixed(2)}x</div>
            </div>
            <div className="prest-stat">
              <div className="prest-label">Gems on Ascend</div>
              <div className="prest-val" style={{ color: 'var(--gm)' }}>+{pendingGems}</div>
            </div>
            <div className="prest-stat">
              <div className="prest-label">New Power</div>
              <div className="prest-val">{(1 + (totalGems + pendingGems) * PRESTIGE_GEM_BONUS).toFixed(2)}x</div>
            </div>
          </div>
          <button className="prest-btn" disabled={pendingGems <= 0} onClick={handlePrestige}>
            {pendingGems > 0 ? `⚡ ASCEND (+${pendingGems} Gems)` : "Gather more gold to ascend"}
          </button>
          <p className="prest-hint">
            Next gem at: <GoldCoinIcon />{formatNumber(Math.pow(prestigeGems + totalGems + 1, 2) * PRESTIGE_BASE)} lifetime gold
          </p>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div className="ft">
        <span className="ft-text">Castle Capitalist v0.3</span>
        <button className="ft-reset" onClick={handleHardReset}>Reset</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLES — All CSS in one template literal.
   Uses CSS custom properties for easy theming / dark mode.
   ═══════════════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Almendra:wght@400;700&family=Fira+Code:wght@400;600&display=swap');

.cc {
  --bg: #0d0f14; --bg2: #151922;
  --sf: #1c2030; --sf2: #242a3a;
  --bd: #2a3045; --bd2: #3d4a6a;
  --gd: #f0c030; --gdl: #ffe082; --gdd: #a07818;
  --gm: #c084fc; --gmd: #7c3aed;
  --gn: #4ade80; --rd: #ef4444;
  --tx: #e0e4f0; --txd: #7a84a6; --txb: #f0f2ff;
  font-family: 'Almendra', serif;
  background: var(--bg); color: var(--tx);
  min-height: 100vh; max-width: 480px;
  margin: 0 auto; user-select: none;
  position: relative; overflow-x: hidden;
}
.cc::before {
  content: ''; position: fixed; inset: 0;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(100,130,200,.03) 3px, rgba(100,130,200,.03) 4px),
    repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(100,130,200,.02) 3px, rgba(100,130,200,.02) 4px);
  pointer-events: none; z-index: 0;
}
.cc * { position: relative; z-index: 1; box-sizing: border-box; }

/* Header */
.hd { background: linear-gradient(180deg,#1a1f2e,#0d0f14); border-bottom: 3px solid var(--bd2); padding: 12px 16px 10px; position: sticky; top: 0; z-index: 20; box-shadow: 0 4px 20px rgba(0,0,0,.6); }
.hd::after { content:''; position:absolute; bottom:-6px; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,var(--gdd),transparent); }
.hd-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
.hd-title { font-family:'Cinzel',serif; font-size:16px; font-weight:900; color:var(--gd); text-shadow:0 2px 4px rgba(0,0,0,.6),0 0 20px rgba(240,192,48,.15); letter-spacing:2px; }
.hd-gems { font-family:'Fira Code',monospace; font-size:11px; color:var(--gm); padding:3px 10px; border-radius:12px; background:rgba(192,132,252,.1); border:1px solid rgba(192,132,252,.25); cursor:pointer; display:flex; align-items:center; gap:4px; }
.hd-gold { display:flex; justify-content:space-between; align-items:baseline; }
.hd-gold-left { display:flex; align-items:baseline; gap:4px; }
.hd-amount { font-family:'Cinzel',serif; font-size:26px; font-weight:900; color:var(--gdl); text-shadow:0 2px 8px rgba(240,192,48,.3); }
.hd-label { font-family:'Fira Code',monospace; font-size:9px; color:var(--gdd); }
.hd-gps { font-family:'Fira Code',monospace; font-size:11px; color:var(--gdd); display:flex; align-items:center; gap:2px; }

/* Tabs */
.tabs { display:flex; background:var(--bg2); border-bottom:2px solid var(--bd); }
.tab { flex:1; padding:10px 0; background:none; border:none; font-family:'Cinzel',serif; font-size:11px; font-weight:700; color:var(--txd); cursor:pointer; border-bottom:2px solid transparent; letter-spacing:.5px; transition:all .2s; }
.tab:hover { color:var(--tx); }
.tab-on { color:var(--gd) !important; border-bottom-color:var(--gd); background:rgba(240,192,48,.04); }

/* Buy Quantity */
.qty-row { display:flex; gap:4px; padding:8px 12px; justify-content:flex-end; background:var(--bg2); }
.qty { padding:4px 14px; font-family:'Fira Code',monospace; font-size:11px; font-weight:600; background:var(--sf); color:var(--txd); border:1px solid var(--bd); border-radius:4px; cursor:pointer; transition:all .15s; }
.qty-on { background:var(--gd) !important; color:var(--bg) !important; border-color:var(--gd) !important; }

/* Venture List */
.vent-list { padding:4px 8px 100px; }
.vrow { display:flex; align-items:center; gap:6px; padding:8px 6px; margin-bottom:4px; background:linear-gradient(135deg,var(--sf),var(--sf2)); border:1px solid var(--bd); border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.03); transition:border-color .2s; }
.vrow:hover { border-color:var(--bd2); }
.vrow-locked { opacity:.4; filter:grayscale(.3); }
.vrow-afford { opacity:1; filter:none; border-color:rgba(74,222,128,.8); animation:row-glow 1.5s ease-in-out infinite; }
@keyframes row-glow { 0%,100% { box-shadow:0 0 8px rgba(74,222,128,.3), 0 0 2px rgba(74,222,128,.5); border-color:rgba(74,222,128,.5); } 50% { box-shadow:0 0 20px rgba(74,222,128,.6), 0 0 8px rgba(74,222,128,.8); border-color:rgba(74,222,128,1); } }

/* Icon Badge */
.badge-wrap { display:flex; flex-direction:column; align-items:center; flex-shrink:0; cursor:pointer; }
.badge-wrap:active .badge { transform:scale(.92); }
.badge { width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:2px solid; box-shadow:0 2px 8px rgba(0,0,0,.3),inset 0 -2px 4px rgba(0,0,0,.2),inset 0 2px 4px rgba(255,255,255,.1); transition:transform .1s; overflow:hidden; }
.badge-ct { font-family:'Fira Code',monospace; font-size:10px; font-weight:700; color:var(--txb); text-shadow:0 1px 3px rgba(0,0,0,.8); margin-top:3px; }

/* Venture Middle */
.vmid { flex:1; min-width:0; cursor:pointer; }
.vname { font-family:'Cinzel',serif; font-size:12px; font-weight:700; color:var(--txb); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-shadow:0 1px 2px rgba(0,0,0,.4); }
.auto-tag { font-family:'Fira Code',monospace; font-size:8px; font-weight:700; color:var(--gn); margin-left:6px; padding:1px 5px; border-radius:3px; background:rgba(74,222,128,.12); }
.vrev { font-family:'Fira Code',monospace; font-size:11px; font-weight:600; color:var(--gdl); margin-bottom:3px; display:flex; align-items:center; gap:2px; }
.vps { font-size:9px; color:var(--txd); margin-left:6px; }

/* Progress Bar */
.bar-out { height:14px; background:#0a0c12; border-radius:7px; overflow:hidden; border:1px solid var(--bd); box-shadow:inset 0 2px 4px rgba(0,0,0,.4); margin-bottom:3px; position:relative; }
.bar-in { height:100%; border-radius:6px; position:relative; overflow:hidden; }
.bar-in::after { content:''; position:absolute; inset:0; background:repeating-linear-gradient(-45deg,transparent,transparent 4px,rgba(255,255,255,.08) 4px,rgba(255,255,255,.08) 8px); animation:stripe .8s linear infinite; }
@keyframes stripe { 0%{background-position:0 0} 100%{background-position:16px 0} }
.bar-time { position:absolute; right:6px; top:50%; transform:translateY(-50%); font-family:'Fira Code',monospace; font-size:9px; font-weight:600; color:var(--txb); text-shadow:0 1px 3px rgba(0,0,0,.8); z-index:2; }

/* Milestone */
.vms { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); }
.vms-n { color:#60a5fa; }

/* Buy Button */
.buy-btn { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px 8px; min-width:68px; background:linear-gradient(180deg,var(--sf2),var(--sf)); border:2px solid var(--bd); border-radius:8px; cursor:pointer; font-family:'Fira Code',monospace; transition:all .15s; flex-shrink:0; box-shadow:0 2px 6px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.05); }
.buy-btn:hover:not(:disabled) { border-color:var(--gd); box-shadow:0 2px 12px rgba(240,192,48,.2); }
.buy-btn:active:not(:disabled) { transform:scale(.95); }
.buy-btn:disabled { opacity:.3; cursor:default; }
.buy-q { font-size:12px; font-weight:700; color:var(--txb); }
.buy-c { font-size:9px; color:var(--gdd); margin-top:2px; display:flex; align-items:center; gap:1px; }
.buy-l { font-size:8px; color:var(--txd); margin-top:1px; text-transform:uppercase; letter-spacing:.5px; }

/* Companions */
.comp-list { padding:12px 12px 100px; }
.comp-hdr { text-align:center; font-family:'Cinzel',serif; font-size:14px; color:var(--txd); margin-bottom:4px; letter-spacing:1px; }
.comp-sub { text-align:center; font-size:11px; color:var(--txd); margin:0 0 16px; opacity:.7; }
.comp-row { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; margin-bottom:4px; background:var(--sf); border:1px solid var(--bd); border-radius:8px; }
.comp-info { display:flex; align-items:center; gap:10px; }
.comp-icon { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid; box-shadow:0 2px 6px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1); }
.comp-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; color:var(--txb); }
.comp-desc { font-size:10px; color:var(--txd); font-style:italic; }
.comp-hired { font-family:'Fira Code',monospace; font-size:11px; color:var(--gn); font-weight:700; }
.comp-locked { font-size:11px; color:var(--txd); }
.comp-btn { padding:7px 16px; font-family:'Cinzel',serif; font-size:11px; font-weight:700; background:linear-gradient(180deg,var(--sf2),var(--sf)); color:var(--gd); border:1px solid var(--bd); border-radius:6px; cursor:pointer; transition:all .15s; display:flex; align-items:center; gap:2px; }
.comp-btn:hover:not(:disabled) { border-color:var(--gd); }
.comp-btn:disabled { opacity:.3; cursor:default; }

/* Upgrades */
.upgrades { padding:12px 12px 100px; }
.up-hdr { text-align:center; font-family:'Cinzel',serif; font-size:14px; color:var(--txd); margin-bottom:16px; letter-spacing:1px; }
.up-sub { text-align:center; color:var(--txd); font-size:12px; line-height:1.7; max-width:320px; margin:0 auto; }

/* Prestige */
.prest { padding:24px 16px 100px; text-align:center; }
.prest-title { font-family:'Cinzel',serif; font-size:20px; font-weight:900; color:var(--gm); letter-spacing:3px; text-shadow:0 2px 12px rgba(192,132,252,.3); margin-bottom:8px; }
.prest-sub { font-size:12px; color:var(--txd); max-width:320px; margin:0 auto 24px; line-height:1.7; }
.prest-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:24px; }
.prest-stat { background:var(--sf); border:1px solid var(--bd); border-radius:10px; padding:14px 10px; }
.prest-label { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); text-transform:uppercase; letter-spacing:1.5px; margin-bottom:6px; }
.prest-val { font-family:'Cinzel',serif; font-size:18px; font-weight:900; color:var(--txb); display:flex; align-items:center; justify-content:center; gap:4px; }
.prest-btn { padding:14px 36px; font-family:'Cinzel',serif; font-size:15px; font-weight:900; background:linear-gradient(135deg,var(--gm),var(--gmd)); color:#fff; border:2px solid rgba(255,255,255,.15); border-radius:10px; cursor:pointer; letter-spacing:1px; box-shadow:0 4px 20px rgba(124,58,237,.3); transition:all .2s; }
.prest-btn:hover:not(:disabled) { box-shadow:0 4px 30px rgba(124,58,237,.5); transform:translateY(-1px); }
.prest-btn:disabled { opacity:.35; cursor:default; }
.prest-hint { font-family:'Fira Code',monospace; font-size:10px; color:var(--txd); margin-top:16px; display:flex; align-items:center; justify-content:center; gap:3px; }

/* Footer */
.ft { display:flex; justify-content:space-between; align-items:center; padding:8px 16px; border-top:2px solid var(--bd); background:var(--bg2); position:sticky; bottom:0; z-index:20; }
.ft-text { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); }
.ft-reset { font-family:'Fira Code',monospace; font-size:9px; color:var(--rd); background:none; border:1px solid rgba(239,68,68,.2); border-radius:4px; padding:3px 10px; cursor:pointer; }

/* Scrollbar */
.cc ::-webkit-scrollbar { width:4px; }
.cc ::-webkit-scrollbar-track { background:transparent; }
.cc ::-webkit-scrollbar-thumb { background:var(--bd); border-radius:2px; }
`;

