import { useState, useEffect, useRef, useCallback } from "react";
import { VentureIcon, CompanionPortrait, GoldCoinIcon, SoulGemIcon } from "./src/GameAssets.jsx";

// ═══ ICONS ═══
/* ═══════════════════════════════════════════════════════════════
   Castle Clicker — Custom SVG Icon Library
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
   Castle Clicker — Game Configuration
   All tuning knobs in one place. Tweak these to balance the game.
   ═══════════════════════════════════════════════════════════════ */

const VENTURES = [
  //                                                          cost         revenue/cycle    cycle(ms)   unlock
  // Pacing targets (active play, no companions, no prestige):
  //   Tier 2: ~2-3 min | Tier 3: ~8-10 min | Tier 4: ~25-35 min | Tier 5: ~1-2 hr
  //   Tier 6: ~3-5 hr  | Tier 7+: overnight / prestige territory
  { id:0, name:"Torch Scavenging",     color:"#e8a023", colorDark:"#a06810", baseCost:4,             baseRevenue:1,            baseTime:1000,    unlockCost:0 },
  { id:1, name:"Goblin Pickpocketing",  color:"#6dba4a", colorDark:"#3d7a22", baseCost:60,           baseRevenue:4,            baseTime:3000,    unlockCost:200 },
  { id:2, name:"Mushroom Foraging",     color:"#c74f8e", colorDark:"#8a2a5e", baseCost:1400,         baseRevenue:22,           baseTime:6000,    unlockCost:5000 },
  { id:3, name:"Skeleton Looting",      color:"#8bb8d0", colorDark:"#4a7a94", baseCost:36000,        baseRevenue:200,          baseTime:10000,   unlockCost:130000 },
  { id:4, name:"Trap Disarming",        color:"#e85d3a", colorDark:"#a33820", baseCost:950000,       baseRevenue:650,          baseTime:20000,   unlockCost:3500000 },
  { id:5, name:"Potion Brewing",        color:"#a855f7", colorDark:"#6a2aaa", baseCost:26000000,     baseRevenue:3400,         baseTime:36000,   unlockCost:100000000 },
  { id:6, name:"Dragon Taming",         color:"#ef4444", colorDark:"#991b1b", baseCost:750000000,    baseRevenue:17500,        baseTime:60000,   unlockCost:3000000000 },
  { id:7, name:"Dungeon Expansion",     color:"#14b8a6", colorDark:"#0d7a6e", baseCost:22000000000,  baseRevenue:88000,        baseTime:96000,   unlockCost:90000000000 },
  { id:8, name:"Demon Gate Siege",      color:"#f97316", colorDark:"#b45210", baseCost:700000000000, baseRevenue:430000,       baseTime:150000,  unlockCost:2800000000000 },
  { id:9, name:"Elder God Pact",        color:"#6366f1", colorDark:"#4338ca", baseCost:25000000000000,baseRevenue:2100000,     baseTime:240000,  unlockCost:90000000000000 },
];

// Revenue multiplied at ownership thresholds (sawtooth spikes)
// Spaced out, earned not given — big spikes are rare dopamine hits
const MILESTONES = [
  { at:25,   mult:2 },
  { at:50,   mult:2 },
  { at:100,  mult:2 },
  { at:200,  mult:2 },
  { at:300,  mult:2 },
  { at:500,  mult:3 },   // first big spike — reward for commitment
  { at:750,  mult:2 },
  { at:1000, mult:3 },
  { at:1500, mult:2 },
  { at:2000, mult:2 },
  { at:3000, mult:3 },
  { at:5000, mult:3 },
];

// Cost to recruit each companion (auto-runner)
// Priced as a mid-tier luxury — you feel it when you buy one
const COMPANION_COSTS = [
  2500, 60000, 800000, 20000000, 500000000,
  15000000000, 500000000000, 20000000000000,
  800000000000000, 40000000000000000,
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
const COST_EXPONENT = 1.15;       // each unit costs 15% more — steeper scaling

// Offline earnings multiplier (1.0 = full, 0.25 = quarter)
const OFFLINE_EFFICIENCY = 0.25;

// Max offline time counted (8 hours in ms)
const OFFLINE_CAP = 8 * 60 * 60 * 1000;

// Save key for localStorage / AsyncStorage
const SAVE_KEY = "castle_clicker_v8"; // bumped: equipment system

// ═══ SPECIALTY MATERIALS ═══
/* ═══════════════════════════════════════════════════════════════
   Profession-specific currencies. 3 tiers per profession.
   T1 = common (upgrade fuel), T2 = uncommon, T3 = rare catalyst
   ═══════════════════════════════════════════════════════════════ */

const SPECIALTY_MATERIALS = [
  { id:0, t1:{name:"Cinder Ash",       color:"#e8a023"}, t2:{name:"Core Ember",             color:"#ff6b35"}, t3:{name:"Eternal Flame Essence",      color:"#ff2d2d"} },
  { id:1, t1:{name:"Filched Coin",      color:"#6dba4a"}, t2:{name:"Thieves' Sigil",         color:"#3daa22"}, t3:{name:"Shadow King's Token",        color:"#1a5c0a"} },
  { id:2, t1:{name:"Spore Dust",        color:"#c74f8e"}, t2:{name:"Lotus Petal",             color:"#e06aaa"}, t3:{name:"Mycelium Heart",             color:"#ff3090"} },
  { id:3, t1:{name:"Bone Shard",        color:"#8bb8d0"}, t2:{name:"Soul Marrow",             color:"#5a9aba"}, t3:{name:"Lich King's Phylactery",     color:"#2a7a9a"} },
  { id:4, t1:{name:"Sprung Spring",     color:"#e85d3a"}, t2:{name:"Mithril Gearwork",        color:"#cc4422"}, t3:{name:"Architect's Eye",            color:"#aa2200"} },
  { id:5, t1:{name:"Vial Residue",      color:"#a855f7"}, t2:{name:"Philosopher's Salt",      color:"#8a30dd"}, t3:{name:"Elixir of Transmutation",    color:"#6a10bb"} },
  { id:6, t1:{name:"Shed Scale",        color:"#ef4444"}, t2:{name:"Drake Heartstone",        color:"#cc2222"}, t3:{name:"Primordial Dragon Egg",      color:"#991111"} },
  { id:7, t1:{name:"Hewn Stone",        color:"#14b8a6"}, t2:{name:"Enchanted Cornerstone",   color:"#0d9a88"}, t3:{name:"Infinite Blueprint",         color:"#087a6a"} },
  { id:8, t1:{name:"Brimstone Chip",    color:"#f97316"}, t2:{name:"Infernal Seal",           color:"#dd5500"}, t3:{name:"Abyssal Keystone",           color:"#bb3300"} },
  { id:9, t1:{name:"Void Whisper",      color:"#6366f1"}, t2:{name:"Eldritch Ink",            color:"#4a4ad0"}, t3:{name:"Cosmic Covenant Scroll",     color:"#3030aa"} },
];

const MAT_DROP_RATES = { t1: 0.015, t2: 0.0015, t3: 0.00003 };
const MAT_LEVEL_SCALING = { t1: 0.01, t2: 0.005, t3: 0.0001 }; // bonus per 10 owned levels

const rollMaterialDrop = (ventureIndex, owned, watchBonus = 1) => {
  const levelBonus = Math.floor(owned / 10);
  const drops = {};
  for (const tier of ["t3", "t2", "t1"]) {
    const rate = MAT_DROP_RATES[tier] * (1 + levelBonus * MAT_LEVEL_SCALING[tier]) * watchBonus;
    if (Math.random() < rate) {
      drops[tier] = (drops[tier] || 0) + 1;
    }
  }
  return Object.keys(drops).length > 0 ? drops : null;
};

// ═══ PROFESSION UPGRADES ═══
const UPGRADE_TIERS = [
  { name:"—",            t1:0,    t2:0,   t3:0,  revBonus:0,    speedBonus:0    },
  { name:"Apprentice",   t1:50,   t2:0,   t3:0,  revBonus:0.25, speedBonus:0    },
  { name:"Journeyman",   t1:200,  t2:25,  t3:0,  revBonus:0.50, speedBonus:0.10 },
  { name:"Expert",       t1:600,  t2:80,  t3:0,  revBonus:1.00, speedBonus:0.20 },
  { name:"Master",       t1:1500, t2:250, t3:3,  revBonus:2.00, speedBonus:0.30 },
  { name:"Grandmaster",  t1:4000, t2:700, t3:10, revBonus:4.00, speedBonus:0.40 },
];

// ═══ PROFESSION TRANSFORMATIONS ═══
const TRANSFORM_TREES = [
  { id:0, a:{ name:"Inferno Hunting",       color:"#ff3333", colorDark:"#aa1111", revMult:2,   speedMult:1,   passive:"Pyroclasm",          passiveDesc:"Every 10th cycle triggers a free cycle on 2 random professions",       cost:{t3:2, cross:{ventureId:8, tier:"t2", qty:3}} },
         b:{ name:"Moonlight Gathering",    color:"#c0d8f0", colorDark:"#7090b0", revMult:1,   speedMult:2,   passive:"Lunar Tide",          passiveDesc:"All profession speeds +5% during night hours (6pm-6am)",              cost:{t3:2, cross:{ventureId:9, tier:"t2", qty:3}} } },
  { id:1, a:{ name:"Skeleton Pickpocketing", color:"#d4c8a8", colorDark:"#8a7e68", revMult:3,   speedMult:1,   passive:"Grave Robber",        passiveDesc:"+25% Bone Shard drops from Skeleton Looting",                        cost:{t3:2, cross:{ventureId:3, tier:"t2", qty:3}} },
         b:{ name:"Boss Pickpocketing",     color:"#9b59b6", colorDark:"#6a3a80", revMult:1.5, speedMult:1.5, passive:"Big Score",            passiveDesc:"1% chance per cycle for 50x gold",                                   cost:{t3:2, cross:{ventureId:6, tier:"t2", qty:3}} } },
  { id:2, a:{ name:"Plague Cultivation",    color:"#8fce00", colorDark:"#5a8a00", revMult:2.5, speedMult:1,   passive:"Contagion",           passiveDesc:"15% chance per cycle to auto-start a random idle profession",         cost:{t3:2, cross:{ventureId:5, tier:"t2", qty:3}} },
         b:{ name:"Crystal Gardening",      color:"#00bcd4", colorDark:"#008a9a", revMult:1,   speedMult:1,   passive:"Crystalline Growth",   passiveDesc:"ALL material drop rates +10%",                                       cost:{t3:2, cross:{ventureId:5, tier:"t2", qty:3}} } },
  { id:3, a:{ name:"Necromancer's Harvest", color:"#2d5a2d", colorDark:"#1a3a1a", revMult:3,   speedMult:1,   passive:"Raise Dead",          passiveDesc:"5% chance per cycle to gain +1 free owned level",                     cost:{t3:2, cross:{ventureId:9, tier:"t2", qty:3}} },
         b:{ name:"Relic Archaeology",      color:"#d4a24a", colorDark:"#a07020", revMult:1,   speedMult:1,   passive:"Ancient Knowledge",    passiveDesc:"+30% Soul Gems earned on prestige",                                  cost:{t3:2, cross:{ventureId:7, tier:"t2", qty:3}} } },
  { id:4, a:{ name:"Siege Engineering",     color:"#708090", colorDark:"#4a5a6a", revMult:2,   speedMult:1.5, passive:"Fortification",        passiveDesc:"Companions produce 50% more gold offline",                           cost:{t3:2, cross:{ventureId:7, tier:"t2", qty:3}} },
         b:{ name:"Arcane Defusing",        color:"#00aaff", colorDark:"#0070aa", revMult:1,   speedMult:1,   passive:"Mana Siphon",          passiveDesc:"Each cycle steals 5% of highest-revenue profession as bonus gold",    cost:{t3:2, cross:{ventureId:5, tier:"t2", qty:3}} } },
  { id:5, a:{ name:"Elixir Mastery",       color:"#ffd700", colorDark:"#aa9000", revMult:3,   speedMult:1,   passive:"Golden Draught",       passiveDesc:"Once per hour, next cycle grants 10x gold",                          cost:{t3:2, cross:{ventureId:0, tier:"t2", qty:3}} },
         b:{ name:"Poison Distilling",      color:"#39ff14", colorDark:"#20aa0a", revMult:1,   speedMult:2,   passive:"Weakening Toxin",      passiveDesc:"All profession buy costs reduced 5%",                                cost:{t3:2, cross:{ventureId:8, tier:"t2", qty:3}} } },
  { id:6, a:{ name:"Dragon Riding",        color:"#4fc3f7", colorDark:"#2090c0", revMult:1,   speedMult:3,   passive:"Aerial Survey",        passiveDesc:"Reveals hidden expedition rewards",                                  cost:{t3:2, cross:{ventureId:4, tier:"t2", qty:3}} },
         b:{ name:"Dragon Breeding",        color:"#8b0000", colorDark:"#5a0000", revMult:4,   speedMult:1,   passive:"Brood Mother",         passiveDesc:"Every 100 cycles, permanently +1% revenue to this profession",       cost:{t3:2, cross:{ventureId:6, tier:"t1", qty:50}} } },
  { id:7, a:{ name:"Realm Architecture",    color:"#f5f5dc", colorDark:"#b0b090", revMult:3,   speedMult:1,   passive:"Grand Architect",      passiveDesc:"Every 5th profession upgrade costs 50% less materials",              cost:{t3:2, cross:{ventureId:4, tier:"t2", qty:3}} },
         b:{ name:"Void Tunneling",         color:"#2a0845", colorDark:"#1a0030", revMult:1,   speedMult:2,   passive:"Dimensional Shortcut", passiveDesc:"All profession cycle times reduced 3% globally",                     cost:{t3:2, cross:{ventureId:9, tier:"t2", qty:3}} } },
  { id:8, a:{ name:"Demon Pact Brokering",  color:"#cc3300", colorDark:"#881a00", revMult:3,   speedMult:1,   passive:"Infernal Contract",    passiveDesc:"+15% revenue from ALL professions, but Demon cycle time doubled",    cost:{t3:2, cross:{ventureId:9, tier:"t2", qty:3}} },
         b:{ name:"Hellfire Conquest",      color:"#ffee00", colorDark:"#bbaa00", revMult:1,   speedMult:2,   passive:"Scorched Earth",       passiveDesc:"10% chance per cycle to grant 2x materials from all profs for 60s",  cost:{t3:2, cross:{ventureId:6, tier:"t2", qty:3}} } },
  { id:9, a:{ name:"Cosmic Ascension",     color:"#ffffff", colorDark:"#aaaaaa", revMult:5,   speedMult:1,   passive:"Transcendence",        passiveDesc:"Soul Gems give +5% instead of +3%",                                 cost:{t3:3, crossAll:{tier:"t2", qty:5}} },
         b:{ name:"Eldritch Dominion",      color:"#2a1a4a", colorDark:"#1a0a30", revMult:1,   speedMult:3,   passive:"The Deep",             passiveDesc:"Unlocks Abyss auto-clear +5 floors per run",                        cost:{t3:3, crossAll:{tier:"t3", qty:1}} } },
];

// ═══ DUNGEON CLOCK ═══
// Real local time → 4 watches. Each profession has a preferred watch.
// During preferred watch: +25% revenue, +50% material drops.
const WATCHES = [
  { name: "Dawn",   icon: "🌅", hours: [5,6,7,8,9,10] },
  { name: "Zenith", icon: "☀️", hours: [11,12,13,14,15,16] },
  { name: "Dusk",   icon: "🌙", hours: [17,18,19,20,21,22] },
  { name: "Abyss",  icon: "🌑", hours: [23,0,1,2,3,4] },
];
// Which watch each profession prefers (index into WATCHES)
const PROF_WATCH = [0, 1, 0, 2, 1, 1, 2, 0, 3, 3]; // Dawn/Zenith/Dawn/Dusk/Zenith/Zenith/Dusk/Dawn/Abyss/Abyss

const getCurrentWatch = () => {
  const h = new Date().getHours();
  return WATCHES.findIndex(w => w.hours.includes(h));
};

const isProfInWatch = (ventureIdx, watchIdx) => PROF_WATCH[ventureIdx] === watchIdx;

// ═══ LOOT SYSTEM ═══
/* ═══════════════════════════════════════════════════════════════
   Rarity tiers, drop rates, and loot table.
   Effects are data-only in Phase 1 — active in Phase 2 equipping.
   ═══════════════════════════════════════════════════════════════ */

const RARITY_TIERS = {
  common:    { label: "Common",    color: "#9d9d9d", glow: "none" },
  uncommon:  { label: "Uncommon",  color: "#1eff00", glow: "0 0 6px rgba(30,255,0,.3)" },
  rare:      { label: "Rare",      color: "#0070dd", glow: "0 0 8px rgba(0,112,221,.4)" },
  epic:      { label: "Epic",      color: "#a335ee", glow: "0 0 10px rgba(163,53,238,.4)" },
  legendary: { label: "Legendary", color: "#ff8000", glow: "0 0 12px rgba(255,128,0,.5)" },
};

const DROP_RATES = {
  common:    0.004,
  uncommon:  0.0004,
  rare:      0.00004,
  epic:      0.000003,
  legendary: 0.0000002,
};
const DROP_LEVEL_BONUS = 0.005; // +0.5% per skill level, multiplicative

const LOOT_TABLE = [
  // ── Common ── (16 items)
  // Global
  { id:"rusty_coin_pouch",  name:"Rusty Coin Pouch",  rarity:"common", description:"+3% gold from all professions",           effects:[{ type:"goldMultiplier", target:"all", value:0.03 }]},
  { id:"copper_ring",       name:"Copper Ring",        rarity:"common", description:"+2% gold from all professions",           effects:[{ type:"goldMultiplier", target:"all", value:0.02 }]},
  { id:"frayed_rope",       name:"Frayed Rope",        rarity:"common", description:"+3% speed for all professions",           effects:[{ type:"speedBoost",     target:"all", value:0.03 }]},
  { id:"cracked_gem",       name:"Cracked Gem",        rarity:"common", description:"+1% drop rates",                          effects:[{ type:"dropRateBoost",  target:"all", value:0.01 }]},
  { id:"minor_rune",        name:"Minor Rune",         rarity:"common", description:"+2% drop rates",                          effects:[{ type:"dropRateBoost",  target:"all", value:0.02 }]},
  // Targeted
  { id:"worn_gloves",       name:"Worn Gloves",        rarity:"common", description:"+5% speed for Torch Scavenging",          effects:[{ type:"speedBoost",     target:0,     value:0.05 }]},
  { id:"tattered_map",      name:"Tattered Map",       rarity:"common", description:"+3% speed for Goblin Pickpocketing",      effects:[{ type:"speedBoost",     target:1,     value:0.03 }]},
  { id:"spore_poultice",    name:"Spore Poultice",     rarity:"common", description:"+3% speed for Mushroom Foraging",         effects:[{ type:"speedBoost",     target:2,     value:0.03 }]},
  { id:"mushroom_cap",      name:"Mushroom Cap",       rarity:"common", description:"+3% gold from Mushroom Foraging",         effects:[{ type:"goldMultiplier", target:2,     value:0.03 }]},
  { id:"dull_blade",        name:"Dull Blade",         rarity:"common", description:"+4% gold from Skeleton Looting",          effects:[{ type:"goldMultiplier", target:3,     value:0.04 }]},
  { id:"skeleton_key",      name:"Skeleton Key",       rarity:"common", description:"+3% speed for Skeleton Looting",          effects:[{ type:"speedBoost",     target:3,     value:0.03 }]},
  { id:"broken_lockpick",   name:"Broken Lockpick",    rarity:"common", description:"+4% speed for Trap Disarming",            effects:[{ type:"speedBoost",     target:4,     value:0.04 }]},
  { id:"drake_whistle",     name:"Drake Whistle",      rarity:"common", description:"+4% speed for Dragon Taming",             effects:[{ type:"speedBoost",     target:6,     value:0.04 }]},
  { id:"blueprint_scrap",   name:"Blueprint Scrap",    rarity:"common", description:"+3% speed for Dungeon Expansion",         effects:[{ type:"speedBoost",     target:7,     value:0.03 }]},
  { id:"hellfire_ember",    name:"Hellfire Ember",      rarity:"common", description:"+3% speed for Demon Gate Siege",          effects:[{ type:"speedBoost",     target:8,     value:0.03 }]},
  { id:"star_map",          name:"Star Map",            rarity:"common", description:"+3% speed for Elder God Pact",            effects:[{ type:"speedBoost",     target:9,     value:0.03 }]},

  // ── Uncommon ── (12 items)
  // Global
  { id:"goblin_lucky_charm", name:"Goblin's Lucky Charm", rarity:"uncommon", description:"+8% gold from all professions",        effects:[{ type:"goldMultiplier", target:"all", value:0.08 }]},
  { id:"silver_compass",     name:"Silver Compass",       rarity:"uncommon", description:"+6% speed for all professions",        effects:[{ type:"speedBoost",     target:"all", value:0.06 }]},
  { id:"whispering_skull",   name:"Whispering Skull",     rarity:"uncommon", description:"Skill levels count +15% for drops",    effects:[{ type:"xpBoost",        target:"all", value:0.15 }]},
  { id:"enchanted_satchel",  name:"Enchanted Satchel",    rarity:"uncommon", description:"+5% drop rates",                       effects:[{ type:"dropRateBoost",  target:"all", value:0.05 }]},
  // Targeted
  { id:"shadow_dagger",      name:"Shadow Dagger",        rarity:"uncommon", description:"+15% Goblin Pickpocketing gold",       effects:[{ type:"goldMultiplier", target:1,     value:0.15 }]},
  { id:"torch_oil",          name:"Torch Oil Flask",      rarity:"uncommon", description:"-10% Torch Scavenging cooldown",       effects:[{ type:"speedBoost",     target:0,     value:0.10 }]},
  { id:"alchemists_flask",   name:"Alchemist's Flask",    rarity:"uncommon", description:"+12% Potion Brewing gold",             effects:[{ type:"goldMultiplier", target:5,     value:0.12 }]},
  { id:"bubbling_retort",    name:"Bubbling Retort",      rarity:"uncommon", description:"+8% speed for Potion Brewing",         effects:[{ type:"speedBoost",     target:5,     value:0.08 }]},
  { id:"wyvern_fang",        name:"Wyvern Fang",          rarity:"uncommon", description:"+12% Dragon Taming gold",              effects:[{ type:"goldMultiplier", target:6,     value:0.12 }]},
  { id:"mystic_lens",        name:"Mystic Lens",          rarity:"uncommon", description:"+10% Dungeon Expansion gold",          effects:[{ type:"goldMultiplier", target:7,     value:0.10 }]},
  { id:"ember_stone",        name:"Ember Stone",          rarity:"uncommon", description:"+10% Demon Gate Siege gold",           effects:[{ type:"goldMultiplier", target:8,     value:0.10 }]},
  { id:"eldritch_sigil",     name:"Eldritch Sigil",       rarity:"uncommon", description:"+10% Elder God Pact gold",             effects:[{ type:"goldMultiplier", target:9,     value:0.10 }]},

  // ── Rare ── (6 items)
  { id:"shadow_step_boots",  name:"Shadow Step Boots",    rarity:"rare", description:"3% chance for a bonus cycle on completion",    effects:[{ type:"instantComplete", target:"all", value:0.03 }]},
  { id:"alchemist_stone",    name:"Alchemist Stone",      rarity:"rare", description:"2x Potion Brewing gold",                      effects:[{ type:"goldMultiplier",  target:5,     value:1.00 }]},
  { id:"bone_whistle",       name:"Bone Whistle",         rarity:"rare", description:"Skeleton levels count double for drops",       effects:[{ type:"xpBoost",         target:3,     value:1.00 }]},
  { id:"dragon_scale_shield",name:"Dragon Scale Shield",  rarity:"rare", description:"+20% Dragon Taming gold, +10% speed",         effects:[{ type:"goldMultiplier", target:6, value:0.20 }, { type:"speedBoost", target:6, value:0.10 }]},
  { id:"void_shard",         name:"Void Shard",           rarity:"rare", description:"+15% all drop rates",                         effects:[{ type:"dropRateBoost",   target:"all", value:0.15 }]},
  { id:"runic_hammer",       name:"Runic Hammer",         rarity:"rare", description:"+25% Trap Disarming gold",                    effects:[{ type:"goldMultiplier",  target:4,     value:0.25 }]},

  // ── Epic ── (4 items)
  { id:"chain_lightning",    name:"Chain Lightning Scroll", rarity:"epic", description:"6% chance to auto-trigger adjacent profession", effects:[{ type:"chainRun",        target:"all", value:0.06 }]},
  { id:"phoenix_feather",    name:"Phoenix Feather",        rarity:"epic", description:"3% chance for a bonus cycle on all professions",effects:[{ type:"instantComplete", target:"all", value:0.03 }]},
  { id:"greater_void_shard", name:"Greater Void Shard",     rarity:"epic", description:"+50% all drop rates",                          effects:[{ type:"dropRateBoost",   target:"all", value:0.50 }]},
  { id:"warlords_signet",    name:"Warlord's Signet",       rarity:"epic", description:"+20% gold all, +10% speed all",                effects:[{ type:"goldMultiplier", target:"all", value:0.20 }, { type:"speedBoost", target:"all", value:0.10 }]},

  // ── Legendary ── (3 items)
  { id:"crown_dungeon_lord",  name:"Crown of the Dungeon Lord",  rarity:"legendary", description:"+30% all gold, +20% all speed",          effects:[{ type:"goldMultiplier", target:"all", value:0.30 }, { type:"speedBoost", target:"all", value:0.20 }]},
  { id:"elder_gods_eye",      name:"Elder God's Eye",            rarity:"legendary", description:"All drop rates doubled",                  effects:[{ type:"dropRateBoost",  target:"all", value:1.00 }]},
  { id:"blade_forgotten_king",name:"Blade of the Forgotten King",rarity:"legendary", description:"0.5% chance for 50x gold on completion", effects:[{ type:"critGold",       target:"all", value:0.005}]},
];

const LOOT_BY_ID = {};
for (const item of LOOT_TABLE) LOOT_BY_ID[item.id] = item;

// ═══ EQUIPMENT SLOTS ═══
const SLOT_UNLOCKS = [
  { slot: 4, type: "prestige",  req: 5,   label: "Earn 5 Soul Gems" },
  { slot: 5, type: "mastery",   req: 2,   label: "Journeyman in any profession" },
  { slot: 6, type: "prestige",  req: 25,  label: "Earn 25 Soul Gems" },
  { slot: 7, type: "mastery3",  req: 3,   label: "Expert in 3 professions" },
];

const getUnlockedSlotCount = (tGems, pUpgrades, mSlots) => {
  let count = 4;
  if (tGems >= 5) count++;
  if (pUpgrades.some(t => t >= 2)) count++;
  if (tGems >= 25) count++;
  if (pUpgrades.filter(t => t >= 3).length >= 3) count++;
  return Math.min(12, count + mSlots);
};

const getEquippedCount = (equipped, itemId) =>
  equipped.filter(id => id === itemId).length;

// ═══ MATH UTILS ═══
/* ═══════════════════════════════════════════════════════════════
   Castle Clicker — Game Math Utilities
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
const getRevenue = (venture, count, prestigeMultiplier, upgradeTier = 0, transformPath = null, lootGoldMult = 1) => {
  const upgradeBonus = 1 + UPGRADE_TIERS[upgradeTier].revBonus;
  const transformBonus = transformPath ? TRANSFORM_TREES[venture.id][transformPath].revMult : 1;
  return venture.baseRevenue * count * getMilestoneMultiplier(count) * prestigeMultiplier * upgradeBonus * transformBonus * lootGoldMult;
};

const getEffectiveCycleTime = (venture, upgradeTier = 0, transformPath = null, lootSpeedMult = 1) => {
  const speedReduction = UPGRADE_TIERS[upgradeTier].speedBonus;
  const transformSpeed = transformPath ? TRANSFORM_TREES[venture.id][transformPath].speedMult : 1;
  return Math.max(100, venture.baseTime * (1 - speedReduction) / transformSpeed / lootSpeedMult);
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

/**
 * Roll for a loot drop on venture cycle completion.
 * Checks from legendary down to common — only one drop per roll.
 */
const rollLootDrop = (ventureIndex, skillLevel, dropRateMult = 1, xpMult = 1) => {
  const levelBonus = 1 + (skillLevel * xpMult) * DROP_LEVEL_BONUS;
  const tiers = ["legendary", "epic", "rare", "uncommon", "common"];
  for (const tier of tiers) {
    if (Math.random() < DROP_RATES[tier] * levelBonus * dropRateMult) {
      const tierItems = LOOT_TABLE.filter(item => item.rarity === tier);
      return tierItems[Math.floor(Math.random() * tierItems.length)];
    }
  }
  return null;
};

const getRarityStyle = (rarity) => RARITY_TIERS[rarity] || RARITY_TIERS.common;

/** Aggregate all loot bonuses from inventory for a given venture. */
const getLootBonuses = (equippedArr, ventureIndex, unlockedSlots) => {
  let goldMult = 0, speedBonus = 0, dropRateBonus = 0, xpBonus = 0;
  let critChance = 0, instantChance = 0, chainChance = 0;
  for (let s = 0; s < unlockedSlots; s++) {
    const itemId = equippedArr[s];
    if (!itemId) continue;
    const item = LOOT_BY_ID[itemId];
    if (!item) continue;
    for (const e of item.effects) {
      if (e.target !== "all" && e.target !== ventureIndex) continue;
      switch (e.type) {
        case "goldMultiplier":  goldMult += e.value; break;
        case "speedBoost":      speedBonus += e.value; break;
        case "dropRateBoost":   dropRateBonus += e.value; break;
        case "xpBoost":         xpBonus += e.value; break;
        case "critGold":        critChance += e.value; break;
        case "instantComplete": instantChance += e.value; break;
        case "chainRun":        chainChance += e.value; break;
      }
    }
  }
  return {
    goldMult: 1 + goldMult,
    speedMult: 1 + speedBonus,
    dropRateMult: 1 + dropRateBonus,
    xpMult: 1 + xpBonus,
    critChance,
    instantChance,
    chainChance,
  };
};


// ═══ MAIN GAME ═══
/* ═══════════════════════════════════════════════════════════════
   Castle Clicker — Main Game Component
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
  const [inventory, setInventory] = useState({});
  const [lootToast, setLootToast] = useState(null);
  const [hasFoundRare, setHasFoundRare] = useState(false);
  const [materials, setMaterials] = useState({});
  const [profUpgrades, setProfUpgrades] = useState(Array(10).fill(0));
  const [profTransforms, setProfTransforms] = useState(Array(10).fill(null));
  const [equipped, setEquipped] = useState(Array(12).fill(null));
  const [mtxSlots, setMtxSlots] = useState(0);
  const [showWatchInfo, setShowWatchInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [brightness, setBrightness] = useState(() => parseFloat(localStorage.getItem('cc-brightness') || '1'));
  const [theme, setTheme] = useState(() => localStorage.getItem('cc-theme') || 'dark');

  const lastTick = useRef(Date.now());
  const animRef = useRef(null);
  const goldRef = useRef(gold);
  const venturesRef = useRef(ventures);
  const gemsRef = useRef(prestigeGems);
  const inventoryRef = useRef(inventory);
  const hasFoundRareRef = useRef(hasFoundRare);
  const materialsRef = useRef(materials);
  const profUpgradesRef = useRef(profUpgrades);
  const profTransformsRef = useRef(profTransforms);
  const equippedRef = useRef(equipped);
  const pendingDropsRef = useRef([]);
  const pendingMatsRef = useRef([]);
  const particleContainerRef = useRef(null);
  const pendingCompletionsRef = useRef([]);
  const lastParticleTimeRef = useRef(new Array(VENTURES.length).fill(0));

  goldRef.current = gold;
  venturesRef.current = ventures;
  gemsRef.current = prestigeGems;
  inventoryRef.current = inventory;
  hasFoundRareRef.current = hasFoundRare;
  materialsRef.current = materials;
  profUpgradesRef.current = profUpgrades;
  profTransformsRef.current = profTransforms;
  equippedRef.current = equipped;

  const prestigeMultiplier = 1 + totalGems * PRESTIGE_GEM_BONUS;

  // ═══ PARTICLE SYSTEM ═══
  const spawnParticle = useCallback((type, x, y, color, text) => {
    const container = particleContainerRef.current;
    if (!container) return;
    // Cap concurrent particles
    if (container.childElementCount >= 30) container.firstChild?.remove();

    const el = document.createElement('div');
    el.className = `particle particle-${type}`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--p-color', color);

    if (type === 'coin') {
      const rad = (Math.random() - 0.5) * Math.PI * 0.6;
      const dist = 35 + Math.random() * 35;
      el.style.setProperty('--p-tx', `${Math.sin(rad) * dist}px`);
      el.style.setProperty('--p-ty', `${-Math.abs(Math.cos(rad) * dist)}px`);
      el.style.animationDelay = `${Math.random() * 100}ms`;
    }

    if (text) el.textContent = text;
    container.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
    setTimeout(() => { if (el.parentNode) el.remove(); }, 1500);
  }, []);

  const emitClickRipple = useCallback((x, y, color) => {
    spawnParticle('ripple', x, y, color);
  }, [spawnParticle]);

  const emitGoldParticles = useCallback((x, y, color, count = 4) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        spawnParticle('coin', x + (Math.random() - 0.5) * 20, y, color);
      }, i * 40);
    }
  }, [spawnParticle]);

  const emitGoldText = useCallback((x, y, amount) => {
    spawnParticle('gold-text', x, y, '#ffcfa8', `+${formatNumber(amount)}`);
  }, [spawnParticle]);

  // ═══ SAVE / LOAD ═══
  useEffect(() => { localStorage.setItem('cc-brightness', brightness); }, [brightness]);
  useEffect(() => { localStorage.setItem('cc-theme', theme); }, [theme]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem("castle_clicker_v7") || localStorage.getItem("castle_clicker_v6") || localStorage.getItem("castle_clicker_v5");
      if (!raw) return;
      const save = JSON.parse(raw);

      if (save.gold != null) setGold(save.gold);
      if (save.ventures) setVentures(save.ventures);
      if (save.prestigeGems != null) setPrestigeGems(save.prestigeGems);
      if (save.totalGems != null) setTotalGems(save.totalGems);
      if (save.lifetimeGold != null) setLifetimeGold(save.lifetimeGold);
      if (save.inventory) setInventory(save.inventory);
      if (save.hasFoundRare) setHasFoundRare(save.hasFoundRare);
      if (save.materials) setMaterials(save.materials);
      if (save.profUpgrades) setProfUpgrades(save.profUpgrades);
      if (save.profTransforms) setProfTransforms(save.profTransforms);
      if (save.equipped) setEquipped(save.equipped);
      if (save.mtxSlots != null) setMtxSlots(save.mtxSlots);

      // Offline earnings
      if (save.lastSave && save.ventures) {
        const elapsed = Math.min(Date.now() - save.lastSave, OFFLINE_CAP);
        if (elapsed > 5000) {
          let offlineGold = 0;
          const pm = 1 + (save.totalGems || 0) * PRESTIGE_GEM_BONUS;
          const savedUpg = save.profUpgrades || Array(10).fill(0);
          const savedTrans = save.profTransforms || Array(10).fill(null);
          const savedEquipped = save.equipped || Array(12).fill(null);
          const savedMtxSlots = save.mtxSlots || 0;
          const savedUnlockedSlots = getUnlockedSlotCount(save.totalGems || 0, savedUpg, savedMtxSlots);
          save.ventures.forEach((vs, i) => {
            if (vs.hasCompanion && vs.owned > 0) {
              const loot = getLootBonuses(savedEquipped, i, savedUnlockedSlots);
              const rev = getRevenue(VENTURES[i], vs.owned, pm, savedUpg[i] || 0, savedTrans[i] || null, loot.goldMult);
              const ct = getEffectiveCycleTime(VENTURES[i], savedUpg[i] || 0, savedTrans[i] || null, loot.speedMult);
              const cycles = Math.floor(elapsed / ct);
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
          inventory: inventoryRef.current,
          hasFoundRare: hasFoundRareRef.current,
          materials: materialsRef.current,
          profUpgrades: profUpgradesRef.current,
          profTransforms: profTransformsRef.current,
          equipped: equippedRef.current,
          mtxSlots,
          lastSave: Date.now(),
        }));
      } catch (e) {}
    }, 5000);
    return () => clearInterval(interval);
  }, [totalGems, lifetimeGold, mtxSlots]);

  // ═══ GAME LOOP ═══
  const earnedRef = useRef(0);

  const tick = useCallback(() => {
    const now = Date.now();
    const dt = now - lastTick.current;
    lastTick.current = now;

    const currentWatch = getCurrentWatch();

    setVentures(prev => {
      // Reset accumulators each invocation so StrictMode double-calls don't duplicate
      pendingDropsRef.current = [];
      pendingMatsRef.current = [];
      pendingCompletionsRef.current = [];
      earnedRef.current = 0;
      const eq = equippedRef.current;
      const eqSlots = getUnlockedSlotCount(totalGems, profUpgradesRef.current, mtxSlots);
      const chainTriggers = [];
      const next = prev.map((vs, i) => {
        if (vs.owned === 0 || (!vs.running && !vs.hasCompanion)) return vs;

        let newProgress = vs.progress + dt;
        const upgTier = profUpgradesRef.current[i] || 0;
        const tPath = profTransformsRef.current[i] || null;
        const loot = getLootBonuses(eq, i, eqSlots);
        const cycleTime = getEffectiveCycleTime(VENTURES[i], upgTier, tPath, loot.speedMult);
        const inWatch = isProfInWatch(i, currentWatch);

        if (newProgress >= cycleTime) {
          const cycles = Math.floor(newProgress / cycleTime);
          const baseRev = getRevenue(VENTURES[i], vs.owned, prestigeMultiplier, upgTier, tPath, loot.goldMult);
          let rev = baseRev * cycles * (inWatch ? 1.25 : 1);

          // Crit gold — per cycle, chance for 50x on that cycle
          if (loot.critChance > 0) {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < loot.critChance) rev += baseRev * 49 * (inWatch ? 1.25 : 1);
            }
          }

          // Instant complete — bonus cycle of revenue + drops
          if (loot.instantChance > 0) {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < loot.instantChance) {
                rev += baseRev * (inWatch ? 1.25 : 1);
                const drop = rollLootDrop(i, vs.owned, loot.dropRateMult, loot.xpMult);
                if (drop) pendingDropsRef.current.push(drop);
                const matDrop = rollMaterialDrop(i, vs.owned, (inWatch ? 1.5 : 1) * loot.dropRateMult);
                if (matDrop) pendingMatsRef.current.push({ ventureId: i, drops: matDrop });
              }
            }
          }

          earnedRef.current += rev;
          pendingCompletionsRef.current.push({ ventureIndex: i, revenue: rev, color: VENTURES[i].color });

          // Loot rolls — one per completed cycle
          for (let c = 0; c < cycles; c++) {
            const drop = rollLootDrop(i, vs.owned, loot.dropRateMult, loot.xpMult);
            if (drop) pendingDropsRef.current.push(drop);
            // Material drops
            const matDrop = rollMaterialDrop(i, vs.owned, (inWatch ? 1.5 : 1) * loot.dropRateMult);
            if (matDrop) pendingMatsRef.current.push({ ventureId: i, drops: matDrop });
          }

          // Chain run — queue adjacent profession triggers
          if (loot.chainChance > 0) {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < loot.chainChance) {
                const adj = Math.random() < 0.5 ? Math.max(0, i - 1) : Math.min(9, i + 1);
                chainTriggers.push(adj);
              }
            }
          }

          if (vs.hasCompanion) {
            return { ...vs, progress: newProgress % cycleTime, running: true };
          }
          return { ...vs, progress: 0, running: false };
        }
        return { ...vs, progress: newProgress };
      });

      // Apply chain triggers — start idle adjacent professions
      for (const adj of chainTriggers) {
        if (next[adj].owned > 0 && !next[adj].running && !next[adj].hasCompanion) {
          next[adj] = { ...next[adj], running: true, progress: 0 };
        }
      }

      return next;
    });

    // Gold update OUTSIDE the ventures updater — prevents double-counting in StrictMode
    if (earnedRef.current > 0) {
      const earned = earnedRef.current;
      setGold(g => g + earned);
      setLifetimeGold(l => l + earned);
    }

    // Process loot drops after state update
    if (pendingDropsRef.current.length > 0) {
      const drops = pendingDropsRef.current;
      setInventory(prev => {
        const next = { ...prev };
        for (const drop of drops) {
          next[drop.id] = (next[drop.id] || 0) + 1;
        }
        return next;
      });
      // Show toast for the rarest drop
      const rarityOrder = ["legendary", "epic", "rare", "uncommon", "common"];
      const rarest = drops.sort((a, b) =>
        rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
      )[0];
      setLootToast({ item: rarest, fadeOut: false });
      if (["rare", "epic", "legendary"].includes(rarest.rarity)) {
        setHasFoundRare(true);
      }
    }

    // Process material drops
    if (pendingMatsRef.current.length > 0) {
      const matDrops = pendingMatsRef.current;
      setMaterials(prev => {
        const next = { ...prev };
        for (const { ventureId, drops } of matDrops) {
          if (!next[ventureId]) next[ventureId] = { t1: 0, t2: 0, t3: 0 };
          for (const [tier, qty] of Object.entries(drops)) {
            next[ventureId][tier] = (next[ventureId][tier] || 0) + qty;
          }
        }
        return next;
      });
    }

    // Process completion particles
    if (pendingCompletionsRef.current.length > 0) {
      const now2 = Date.now();
      for (const comp of pendingCompletionsRef.current) {
        if (now2 - lastParticleTimeRef.current[comp.ventureIndex] < 2000) continue;
        lastParticleTimeRef.current[comp.ventureIndex] = now2;
        const row = document.querySelector(`[data-venture="${comp.ventureIndex}"]`);
        if (row && particleContainerRef.current) {
          const cr = particleContainerRef.current.getBoundingClientRect();
          const rr = row.getBoundingClientRect();
          const x = rr.left - cr.left + rr.width * 0.4;
          const y = rr.top - cr.top + rr.height * 0.3;
          emitGoldParticles(x, y, comp.color);
          emitGoldText(x + rr.width * 0.1, y - 5, comp.revenue);
        }
      }
    }

    animRef.current = requestAnimationFrame(tick);
  }, [prestigeMultiplier, totalGems, mtxSlots, emitGoldParticles, emitGoldText]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [tick]);

  // Loot toast auto-dismiss
  useEffect(() => {
    if (!lootToast) return;
    const fade = setTimeout(() => setLootToast(t => t ? { ...t, fadeOut: true } : null), 2500);
    const remove = setTimeout(() => setLootToast(null), 3200);
    return () => { clearTimeout(fade); clearTimeout(remove); };
  }, [lootToast?.item?.id]);

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

  const handleStartVenture = (idx, e) => {
    setVentures(prev => prev.map((s, i) =>
      i === idx && s.owned > 0 && !s.running ? { ...s, running: true, progress: 0 } : s
    ));
    if (e && particleContainerRef.current) {
      const cr = particleContainerRef.current.getBoundingClientRect();
      const cx = (e.clientX || 0) - cr.left;
      const cy = (e.clientY || 0) - cr.top;
      emitClickRipple(cx, cy, VENTURES[idx].color);
    }
  };

  const handleBuyCompanion = (idx) => {
    const cost = COMPANION_COSTS[idx];
    if (gold < cost || ventures[idx].hasCompanion || ventures[idx].owned === 0) return;
    setGold(g => g - cost);
    setVentures(prev => prev.map((s, i) =>
      i === idx ? { ...s, hasCompanion: true, running: true } : s
    ));
  };

  const handleUpgradeProfession = (ventureIdx) => {
    const currentTier = profUpgrades[ventureIdx] || 0;
    if (currentTier >= UPGRADE_TIERS.length - 1) return; // already max
    const nextTier = UPGRADE_TIERS[currentTier + 1];
    const m = materials[ventureIdx] || { t1: 0, t2: 0, t3: 0 };
    if (m.t1 < nextTier.t1 || m.t2 < nextTier.t2 || m.t3 < nextTier.t3) return; // can't afford
    // Deduct materials
    setMaterials(prev => ({
      ...prev,
      [ventureIdx]: {
        t1: (prev[ventureIdx]?.t1 || 0) - nextTier.t1,
        t2: (prev[ventureIdx]?.t2 || 0) - nextTier.t2,
        t3: (prev[ventureIdx]?.t3 || 0) - nextTier.t3,
      }
    }));
    setProfUpgrades(prev => prev.map((t, i) => i === ventureIdx ? t + 1 : t));
  };

  const handleTransformProfession = (ventureIdx, path) => {
    const tree = TRANSFORM_TREES[ventureIdx];
    const transform = tree[path];
    const m = materials[ventureIdx] || { t1: 0, t2: 0, t3: 0 };
    const cost = transform.cost;

    // Check own T3 materials
    if ((m.t3 || 0) < cost.t3) return;

    // Check cross-profession materials
    if (cost.cross) {
      const crossM = materials[cost.cross.ventureId] || { t1: 0, t2: 0, t3: 0 };
      if ((crossM[cost.cross.tier] || 0) < cost.cross.qty) return;
    }
    if (cost.crossAll) {
      // Need qty of every other profession's tier material
      for (let j = 0; j < 10; j++) {
        if (j === ventureIdx) continue;
        const otherM = materials[j] || { t1: 0, t2: 0, t3: 0 };
        if ((otherM[cost.crossAll.tier] || 0) < cost.crossAll.qty) return;
      }
    }

    // Deduct materials
    setMaterials(prev => {
      const next = { ...prev };
      // Deduct own T3
      next[ventureIdx] = { ...next[ventureIdx], t3: (next[ventureIdx]?.t3 || 0) - cost.t3 };
      // Deduct cross materials
      if (cost.cross) {
        const cid = cost.cross.ventureId;
        next[cid] = { ...next[cid] || { t1: 0, t2: 0, t3: 0 } };
        next[cid][cost.cross.tier] = (next[cid][cost.cross.tier] || 0) - cost.cross.qty;
      }
      if (cost.crossAll) {
        for (let j = 0; j < 10; j++) {
          if (j === ventureIdx) continue;
          next[j] = { ...next[j] || { t1: 0, t2: 0, t3: 0 } };
          next[j][cost.crossAll.tier] = (next[j][cost.crossAll.tier] || 0) - cost.crossAll.qty;
        }
      }
      return next;
    });

    setProfTransforms(prev => prev.map((t, i) => i === ventureIdx ? path : t));
  };

  const pendingGems = calcPrestigeGems(lifetimeGold);

  const handlePrestige = () => {
    if (pendingGems <= 0) return;
    setPrestigeGems(g => g + pendingGems);
    setTotalGems(t => t + pendingGems);
    setGold(4);
    setVentures(createInitialState());
    setLifetimeGold(0);
    setMaterials({});
    setProfUpgrades(Array(10).fill(0));
    setProfTransforms(Array(10).fill(null));
  };

  const handleHardReset = () => {
    if (!confirm("Hard reset everything? This erases ALL progress including Soul Gems.")) return;
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem("castle_clicker_v7");
    localStorage.removeItem("castle_clicker_v6");
    localStorage.removeItem("castle_clicker_v5");
    setGold(4);
    setVentures(createInitialState());
    setPrestigeGems(0);
    setTotalGems(0);
    setLifetimeGold(0);
    setInventory({});
    setHasFoundRare(false);
    setLootToast(null);
    setMaterials({});
    setProfUpgrades(Array(10).fill(0));
    setProfTransforms(Array(10).fill(null));
    setEquipped(Array(12).fill(null));
    setMtxSlots(0);
  };

  // ═══ DERIVED VALUES ═══
  const unlockedSlots = getUnlockedSlotCount(totalGems, profUpgrades, mtxSlots);

  const handleEquip = (itemId, slotIndex) => {
    if (slotIndex >= unlockedSlots) return;
    const totalOwned = inventory[itemId] || 0;
    const alreadyEquipped = getEquippedCount(equipped, itemId);
    if (alreadyEquipped >= totalOwned) return;
    setEquipped(prev => { const next = [...prev]; next[slotIndex] = itemId; return next; });
  };

  const handleUnequip = (slotIndex) => {
    setEquipped(prev => { const next = [...prev]; next[slotIndex] = null; return next; });
  };

  const handleQuickEquip = (itemId) => {
    const slot = equipped.findIndex((id, i) => id === null && i < unlockedSlots);
    if (slot === -1) return;
    handleEquip(itemId, slot);
  };

  const handlePurchaseMtxSlot = () => {
    if (mtxSlots >= 4) return;
    setMtxSlots(prev => Math.min(4, prev + 1));
  };

  // ═══ RENDER ═══
  return (
    <div className={`cc ${theme === 'light' ? 'cc-light' : ''}`}>
      <style>{STYLES}</style>
      <div className="cc-brightness" style={brightness !== 1 ? { filter: `brightness(${brightness})` } : undefined}>

      {/* ── HEADER ── */}
      <div className="hd">
        <button className="settings-cog" onClick={() => setShowSettings(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5.5h3l.4 2 .6.3 1.8-1 2.1 2.1-1 1.8.3.6 2 .4v3l-2 .4-.3.6 1 1.8-2.1 2.1-1.8-1-.6.3-.4 2h-3l-.4-2-.6-.3-1.8 1-2.1-2.1 1-1.8-.3-.6-2-.4v-3l2-.4.3-.6-1-1.8L4.6 1.9l1.8 1 .6-.3.4-2zM8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/></svg>
        </button>
        <div className="hd-brand">
          <div className="hd-title-wrap">
            <span className="hd-title-castle">CASTLE</span>
            <span className="hd-title-clicker">CLICKER</span>
          </div>
        </div>
        <div className="hd-stats">
          <div className="hd-gold-box">
            <GoldCoinIcon size={18} />
            <span className="hd-amount">{formatNumber(gold)}</span>
          </div>
          <span className="hd-watch">
            {WATCHES[getCurrentWatch()].icon} {WATCHES[getCurrentWatch()].name}
            <button className="watch-info-btn" onClick={() => setShowWatchInfo(true)}>?</button>
          </span>
          <span className="hd-gems" onClick={() => setTab("prestige")}>
            <SoulGemIcon /> {prestigeGems} ({prestigeMultiplier.toFixed(2)}x)
          </span>
        </div>
      </div>

      </div>{/* end cc-brightness */}

      {/* ── BOTTOM NAV ── */}
      <div className="bnav">
        {[
          { key: "ventures",   label: "Professions", icon: "\u2694",      mod: "skills" },
          { key: "companions", label: "Allies",     icon: "\uD83D\uDEE1", mod: "allies" },
          { key: "inventory",  label: "Loot",       icon: "\uD83C\uDF81", mod: "loot" },
          { key: "upgrades",   label: "Upgrades",   icon: "\u2B06",      mod: "upgrades" },
          { key: "prestige",   label: "Ascend",     icon: "\u2726",      mod: "ascend" },
        ].map(t => (
          <button key={t.key}
            className={`bnav-btn ${tab === t.key ? 'bnav-on' : ''}`}
            style={tab === t.key ? { color: `var(--mod-${t.mod})` } : undefined}
            onClick={() => setTab(t.key)}
          >
            <span className="bnav-icon">{t.icon}</span>
            <span className="bnav-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="cc-content">
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
            const upgTier = profUpgrades[i] || 0;
            const tPath = profTransforms[i] || null;
            const loot = getLootBonuses(equipped, i, unlockedSlots);
            const effCycle = getEffectiveCycleTime(v, upgTier, tPath, loot.speedMult);
            const pct = unlocked ? Math.min(100, (vs.progress / effCycle) * 100) : 0;
            const remaining = unlocked && vs.running ? Math.max(0, effCycle - vs.progress) : effCycle;
            const inWatch = unlocked && isProfInWatch(i, getCurrentWatch());
            const revPerCycle = unlocked ? getRevenue(v, vs.owned, prestigeMultiplier, upgTier, tPath, loot.goldMult) * (inWatch ? 1.25 : 1) : 0;

            // Hide far-away ventures
            if (!unlocked && gold < v.unlockCost * 0.05 && i > 2) return null;

            const IconComponent = VENTURE_ICONS[i];

            return (
              <div key={v.id} data-venture={i} className={`vrow ${!unlocked ? 'vrow-locked' : ''} ${!unlocked && canAfford ? 'vrow-afford' : ''} ${unlocked && canAfford ? 'vrow-can-buy' : ''} ${inWatch ? 'vrow-watch' : ''}`}
                style={{
                  background: !unlocked
                    ? `linear-gradient(135deg, ${v.colorDark}12, ${v.color}08)`
                    : `linear-gradient(135deg, ${v.colorDark}30, ${v.color}18)`,
                  borderColor: v.color + '35',
                  borderLeftColor: v.color,
                }}
              >
                {/* Badge */}
                <div className="badge-wrap" onClick={(e) => unlocked && handleStartVenture(i, e)}>
                  <div className="badge"
                    style={{
                      background: `linear-gradient(135deg, ${v.color}33, ${v.colorDark}55)`,
                      borderColor: v.color + '88',
                      overflow: 'hidden',
                    }}
                  >
                    <VentureIcon index={i} color={v.color} size={56} />
                  </div>
                  <span className="badge-ct">Lvl {vs.owned}</span>
                </div>

                {/* Info */}
                <div className="vmid" onClick={(e) => unlocked && handleStartVenture(i, e)}>
                  <div className="vname">
                    {v.name}
                    {vs.hasCompanion && <span className="auto-tag">AUTO</span>}
                    {inWatch && <span className="watch-tag">{WATCHES[getCurrentWatch()].icon}</span>}
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
                  {unlocked && (
                    <div className="vms">
                      <GoldCoinIcon size={10} /> <span className="vms-n">{formatNumber(revPerCycle)}</span> / fill
                    </div>
                  )}
                  {unlocked && materials[i] && (materials[i].t1 > 0 || materials[i].t2 > 0 || materials[i].t3 > 0) && (
                    <div className="vmat-row">
                      {materials[i].t1 > 0 && <span className="vmat" style={{color: SPECIALTY_MATERIALS[i].t1.color}}>{materials[i].t1} {SPECIALTY_MATERIALS[i].t1.name}</span>}
                      {materials[i].t2 > 0 && <span className="vmat vmat-t2" style={{color: SPECIALTY_MATERIALS[i].t2.color}}>{materials[i].t2} {SPECIALTY_MATERIALS[i].t2.name}</span>}
                      {materials[i].t3 > 0 && <span className="vmat vmat-t3" style={{color: SPECIALTY_MATERIALS[i].t3.color}}>{materials[i].t3} {SPECIALTY_MATERIALS[i].t3.name}</span>}
                    </div>
                  )}
                </div>

                {/* Buy */}
                <button className={`buy-btn ${canAfford ? 'buy-btn-go' : ''}`} disabled={!canAfford} onClick={() => handleBuyVenture(i)}>
                  <div className="buy-q">{unlocked ? (buyQty === -1 ? `×${qty}` : `×${buyQty}`) : "UNLOCK"}</div>
                  <div className="buy-c"><GoldCoinIcon />{formatNumber(cost)}</div>
                  <div className="buy-l">{unlocked ? "Train" : "Learn"}</div>
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
          <p className="comp-sub">Companions auto-run skills so you earn gold even while away.</p>
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

      {/* ── INVENTORY TAB ── */}
      {tab === "inventory" && (
        <div className="inv-panel">
          {/* Materials Section */}
          {Object.keys(materials).some(k => materials[k].t1 > 0 || materials[k].t2 > 0 || materials[k].t3 > 0) && (
            <>
              <div className="inv-hdr">Specialty Materials</div>
              <p className="inv-sub">Profession-specific currencies. Used for upgrades and transformations.</p>
              <div className="mat-grid">
                {VENTURES.map((v, i) => {
                  const m = materials[i];
                  if (!m || (m.t1 === 0 && m.t2 === 0 && m.t3 === 0)) return null;
                  const sm = SPECIALTY_MATERIALS[i];
                  return (
                    <div key={i} className="mat-card" style={{borderColor: v.color + '40'}}>
                      <div className="mat-card-hdr" style={{color: v.color}}>{v.name}</div>
                      <div className="mat-card-items">
                        {m.t1 > 0 && <div className="mat-entry"><span className="mat-dot" style={{background: sm.t1.color}}/><span className="mat-name">{sm.t1.name}</span><span className="mat-ct">{m.t1}</span></div>}
                        {m.t2 > 0 && <div className="mat-entry"><span className="mat-dot mat-dot-t2" style={{background: sm.t2.color}}/><span className="mat-name">{sm.t2.name}</span><span className="mat-ct" style={{color: sm.t2.color}}>{m.t2}</span></div>}
                        {m.t3 > 0 && <div className="mat-entry"><span className="mat-dot mat-dot-t3" style={{background: sm.t3.color, boxShadow:`0 0 6px ${sm.t3.color}`}}/><span className="mat-name">{sm.t3.name}</span><span className="mat-ct" style={{color: sm.t3.color}}>{m.t3}</span></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{height:16}}/>
            </>
          )}
          {/* ── EQUIPMENT BAR ── */}
          <div className="eq-panel">
            <div className="eq-hdr">Equipment <span className="eq-count">{equipped.filter(Boolean).length}/{unlockedSlots} slots</span></div>
            <div className="eq-grid">
              {Array.from({length: 12}, (_, i) => {
                const isUnlocked = i < unlockedSlots;
                const isMtxZone = i >= 8;
                const itemId = equipped[i];
                const item = itemId ? LOOT_BY_ID[itemId] : null;
                const style = item ? getRarityStyle(item.rarity) : null;

                if (!isUnlocked && isMtxZone) {
                  return (
                    <div key={i} className="eq-slot eq-slot-mtx" onClick={handlePurchaseMtxSlot} title="Purchase to unlock">
                      <svg viewBox="0 0 40 40" width={16} height={16}><polygon points="20,4 26,16 38,18 29,27 31,38 20,32 9,38 11,27 2,18 14,16" fill="#7aa2f7" opacity=".5"/></svg>
                      <span className="eq-slot-label">Purchase</span>
                    </div>
                  );
                }
                if (!isUnlocked) {
                  const unlock = SLOT_UNLOCKS.find(u => u.slot === i);
                  return (
                    <div key={i} className="eq-slot eq-slot-locked" title={unlock?.label}>
                      <svg viewBox="0 0 40 40" width={18} height={18}>
                        <rect x="10" y="20" width="20" height="16" rx="3" fill="#7982a9" stroke="#4a5070" strokeWidth="0.8"/>
                        <path d="M14 20 L14 14 Q14 8, 20 8 Q26 8, 26 14 L26 20" fill="none" stroke="#7982a9" strokeWidth="3" strokeLinecap="round"/>
                        <circle cx="20" cy="28" r="2.5" fill="#0d0f14"/>
                        <rect x="19" y="28" width="2" height="4" rx="0.5" fill="#0d0f14"/>
                      </svg>
                      <span className="eq-slot-label">{unlock?.label}</span>
                    </div>
                  );
                }
                if (!item) {
                  return (
                    <div key={i} className="eq-slot eq-slot-empty">
                      <span className="eq-slot-plus">+</span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="eq-slot eq-slot-filled"
                    style={{ borderColor: style.color + '80', boxShadow: style.glow }}
                    onClick={() => handleUnequip(i)}
                    title={`${item.name} — ${item.description}\nClick to unequip`}>
                    <span className="eq-slot-name" style={{ color: style.color }}>{item.name}</span>
                    <span className="eq-slot-rarity" style={{ color: style.color }}>{style.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="inv-hdr">Dungeon Loot</div>
          <p className="inv-sub">Equip items to activate their effects.</p>
          {Object.keys(inventory).length === 0 ? (
            <div className="inv-empty">No loot yet. Complete skills to find items!</div>
          ) : (
            <div className="inv-grid">
              {LOOT_TABLE
                .filter(item => inventory[item.id] > 0)
                .sort((a, b) => {
                  const order = ["legendary", "epic", "rare", "uncommon", "common"];
                  return order.indexOf(a.rarity) - order.indexOf(b.rarity);
                })
                .map(item => {
                  const style = getRarityStyle(item.rarity);
                  return (
                    <div key={item.id} className="inv-item"
                      style={{ borderColor: style.color + '60', boxShadow: style.glow }}>
                      <div className="inv-item-hdr">
                        <span className="inv-item-name" style={{ color: style.color }}>
                          {item.name}
                        </span>
                        <span className="inv-item-qty">x{inventory[item.id]}</span>
                      </div>
                      <div className="inv-item-rarity" style={{ color: style.color }}>
                        {style.label}
                      </div>
                      <div className="inv-item-desc">{item.description}</div>
                      {(() => {
                        const eqCount = getEquippedCount(equipped, item.id);
                        const available = (inventory[item.id] || 0) - eqCount;
                        const hasEmptySlot = equipped.slice(0, unlockedSlots).some(id => id === null);
                        return (
                          <div className="inv-item-actions">
                            {eqCount > 0 && <span className="inv-item-equipped">{eqCount} equipped</span>}
                            {available > 0 && hasEmptySlot && (
                              <button className="inv-equip-btn" onClick={() => handleQuickEquip(item.id)}>Equip</button>
                            )}
                            {available <= 0 && eqCount > 0 && <span className="inv-item-all-eq">All equipped</span>}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* ── UPGRADES TAB ── */}
      {tab === "upgrades" && (
        <div className="upgrades">
          <div className="up-hdr">Profession Upgrades</div>
          <p className="up-sub">Spend specialty materials to upgrade your professions.</p>
          <div className="up-grid">
            {VENTURES.map((v, i) => {
              const vs = ventures[i];
              const unlocked = vs.owned > 0;
              if (!unlocked) return null;
              const currentTier = profUpgrades[i] || 0;
              const atMax = currentTier >= UPGRADE_TIERS.length - 1;
              const current = UPGRADE_TIERS[currentTier];
              const next = atMax ? null : UPGRADE_TIERS[currentTier + 1];
              const m = materials[i] || { t1: 0, t2: 0, t3: 0 };
              const sm = SPECIALTY_MATERIALS[i];
              const canUpgrade = next && m.t1 >= next.t1 && m.t2 >= next.t2 && m.t3 >= next.t3;
              const tPath = profTransforms[i];
              const tree = TRANSFORM_TREES[i];
              const canTransform = currentTier >= 4 && !tPath; // Master+ and not yet transformed

              // Helper to check if a transform is affordable
              const canAffordTransform = (path) => {
                const tf = tree[path];
                const cost = tf.cost;
                if ((m.t3 || 0) < cost.t3) return false;
                if (cost.cross) {
                  const crossM = materials[cost.cross.ventureId] || { t1: 0, t2: 0, t3: 0 };
                  if ((crossM[cost.cross.tier] || 0) < cost.cross.qty) return false;
                }
                if (cost.crossAll) {
                  for (let j = 0; j < 10; j++) {
                    if (j === i) continue;
                    const otherM = materials[j] || { t1: 0, t2: 0, t3: 0 };
                    if ((otherM[cost.crossAll.tier] || 0) < cost.crossAll.qty) return false;
                  }
                }
                return true;
              };

              return (
                <div key={i} className="up-card" style={{borderLeftColor: tPath ? tree[tPath].color : v.color}}>
                  <div className="up-card-top">
                    <div className="up-card-name" style={{color: tPath ? tree[tPath].color : v.color}}>
                      {tPath ? tree[tPath].name : v.name}
                    </div>
                    <div className="up-card-tier">{current.name === "—" ? "No Rank" : current.name}</div>
                  </div>
                  {current.revBonus > 0 && (
                    <div className="up-card-bonuses">
                      <span className="up-bonus">+{Math.round(current.revBonus * 100)}% rev</span>
                      {current.speedBonus > 0 && <span className="up-bonus">-{Math.round(current.speedBonus * 100)}% time</span>}
                      {tPath && tree[tPath].revMult > 1 && <span className="up-bonus" style={{color:'var(--gd)'}}>×{tree[tPath].revMult} transform</span>}
                      {tPath && tree[tPath].speedMult > 1 && <span className="up-bonus" style={{color:'var(--accent)'}}>×{tree[tPath].speedMult} speed</span>}
                    </div>
                  )}
                  {/* Active transform passive display */}
                  {tPath && (
                    <div className="up-passive">
                      <span className="up-passive-name">{tree[tPath].passive}</span>
                      <span className="up-passive-desc">{tree[tPath].passiveDesc}</span>
                    </div>
                  )}
                  {/* Transform choice - available at Master IV+ with no transform */}
                  {canTransform && (
                    <div className="up-transform">
                      <div className="up-transform-label">Choose Transformation</div>
                      {["a", "b"].map(path => {
                        const tf = tree[path];
                        const affordable = canAffordTransform(path);
                        const cost = tf.cost;
                        return (
                          <div key={path} className="up-tf-option" style={{borderColor: tf.color + '40'}}>
                            <div className="up-tf-name" style={{color: tf.color}}>{tf.name}</div>
                            <div className="up-tf-stats">
                              {tf.revMult > 1 && <span className="up-bonus">×{tf.revMult} rev</span>}
                              {tf.speedMult > 1 && <span className="up-bonus" style={{color:'var(--accent)'}}>×{tf.speedMult} speed</span>}
                            </div>
                            <div className="up-tf-passive"><strong>{tf.passive}:</strong> {tf.passiveDesc}</div>
                            <div className="up-cost-row">
                              <span className={`up-cost ${(m.t3||0) >= cost.t3 ? 'up-cost-ok' : 'up-cost-no'}`} style={{color: sm.t3.color}}>
                                {m.t3||0}/{cost.t3} {sm.t3.name}
                              </span>
                              {cost.cross && (
                                <span className={`up-cost ${((materials[cost.cross.ventureId]||{})[cost.cross.tier]||0) >= cost.cross.qty ? 'up-cost-ok' : 'up-cost-no'}`}
                                  style={{color: SPECIALTY_MATERIALS[cost.cross.ventureId][cost.cross.tier].color}}>
                                  {(materials[cost.cross.ventureId]||{})[cost.cross.tier]||0}/{cost.cross.qty} {SPECIALTY_MATERIALS[cost.cross.ventureId][cost.cross.tier].name}
                                </span>
                              )}
                              {cost.crossAll && <span className="up-cost up-cost-no" style={{color:'var(--txd)'}}>{cost.crossAll.qty}× every other {cost.crossAll.tier === 't3' ? 'T3 catalyst' : 'T2 material'}</span>}
                            </div>
                            <button className={`up-btn ${affordable ? 'up-btn-transform' : ''}`} disabled={!affordable} onClick={() => handleTransformProfession(i, path)}>
                              {affordable ? `Transform` : "Need Materials"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* Normal upgrade path */}
                  {next ? (
                    <div className="up-card-next">
                      <div className="up-next-label">Next: <strong>{next.name}</strong></div>
                      <div className="up-cost-row">
                        {next.t1 > 0 && <span className={`up-cost ${m.t1 >= next.t1 ? 'up-cost-ok' : 'up-cost-no'}`} style={{color: sm.t1.color}}>{m.t1}/{next.t1} {sm.t1.name}</span>}
                        {next.t2 > 0 && <span className={`up-cost ${m.t2 >= next.t2 ? 'up-cost-ok' : 'up-cost-no'}`} style={{color: sm.t2.color}}>{m.t2}/{next.t2} {sm.t2.name}</span>}
                        {next.t3 > 0 && <span className={`up-cost ${m.t3 >= next.t3 ? 'up-cost-ok' : 'up-cost-no'}`} style={{color: sm.t3.color}}>{m.t3}/{next.t3} {sm.t3.name}</span>}
                      </div>
                      <button className={`up-btn ${canUpgrade ? 'up-btn-go' : ''}`} disabled={!canUpgrade} onClick={() => handleUpgradeProfession(i)}>
                        {canUpgrade ? `Upgrade to ${next.name}` : "Need Materials"}
                      </button>
                    </div>
                  ) : (
                    <div className="up-card-max">GRANDMASTER</div>
                  )}
                </div>
              );
            })}
          </div>
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

      </div>

      {/* ── LOOT TOAST ── */}
      {lootToast && (
        <div className={`loot-toast ${lootToast.fadeOut ? 'loot-toast-out' : ''}`}
          style={{ borderColor: getRarityStyle(lootToast.item.rarity).color }}>
          <span className="loot-toast-rarity"
            style={{ color: getRarityStyle(lootToast.item.rarity).color }}>
            {getRarityStyle(lootToast.item.rarity).label}
          </span>
          <span className="loot-toast-name"
            style={{ color: getRarityStyle(lootToast.item.rarity).color }}>
            {lootToast.item.name}
          </span>
          <span className="loot-toast-desc">{lootToast.item.description}</span>
        </div>
      )}

      {/* ── WATCH INFO MODAL ── */}
      {showWatchInfo && (
        <div className="watch-modal-overlay" onClick={() => setShowWatchInfo(false)}>
          <div className="watch-modal" onClick={e => e.stopPropagation()}>
            <div className="watch-modal-header">
              <span className="watch-modal-title">Dungeon Clock</span>
              <button className="watch-modal-close" onClick={() => setShowWatchInfo(false)}>X</button>
            </div>
            <p className="watch-modal-desc">
              The dungeon runs on a day/night cycle based on your local time.
              Each profession has a preferred watch — during that watch they earn
              <span className="watch-highlight"> +25% revenue</span> and
              <span className="watch-highlight"> +50% material drops</span>.
            </p>
            <div className="watch-modal-grid">
              {WATCHES.map((w, wi) => {
                const active = getCurrentWatch() === wi;
                const profs = VENTURES.filter((_, vi) => PROF_WATCH[vi] === wi);
                return (
                  <div key={w.name} className={`watch-modal-card ${active ? 'watch-modal-card-active' : ''}`}>
                    <div className="watch-modal-card-head">
                      <span>{w.icon} {w.name}</span>
                      <span className="watch-modal-hours">{w.hours[0]}:00 - {w.hours[w.hours.length-1]}:59</span>
                    </div>
                    {active && <span className="watch-modal-now">ACTIVE NOW</span>}
                    <div className="watch-modal-profs">
                      {profs.map(p => (
                        <span key={p.id} className="watch-modal-prof" style={{color: p.color}}>{p.name}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── SETTINGS MODAL ── */}
      {showSettings && (
        <div className="watch-modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="watch-modal" onClick={e => e.stopPropagation()}>
            <div className="watch-modal-header">
              <span className="watch-modal-title">Settings</span>
              <button className="watch-modal-close" onClick={() => setShowSettings(false)}>X</button>
            </div>

            <div className="settings-section">
              <label className="settings-label">Theme</label>
              <div className="settings-theme-row">
                {["dark", "light"].map(t => (
                  <button key={t} className={`settings-theme-btn ${theme === t ? 'settings-theme-active' : ''}`}
                    onClick={() => setTheme(t)}>
                    {t === "dark" ? "Dark" : "Light"}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section">
              <label className="settings-label">Brightness</label>
              <div className="settings-slider-row">
                <input type="range" min="0.5" max="1.5" step="0.05" value={brightness}
                  className="settings-slider"
                  onChange={e => setBrightness(parseFloat(e.target.value))} />
                <span className="settings-slider-val">{Math.round(brightness * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <div className="ft">
        <span className="ft-text">Castle Clicker v0.3</span>
        <button className="ft-reset" onClick={handleHardReset}>Reset</button>
      </div>

      {/* Particle overlay */}
      <div ref={particleContainerRef} className="particle-container" />

      {/* Bottom nav spacer */}
      <div style={{ height: 64 }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STYLES — All CSS in one template literal.
   Uses CSS custom properties for easy theming / dark mode.
   ═══════════════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Almendra:wght@400;700&family=Fira+Code:wght@400;600&display=swap');
@font-face { font-family:'GothicByte'; src:url('/assets/GothicByte.ttf') format('truetype'); font-display:swap; }
@font-face { font-family:'EnchantedLand'; src:url('/assets/EnchantedLand.otf') format('opentype'); font-display:swap; }

.cc {
  --bg: #1a1b26; --bg2: #1f2030;
  --sf: #24283b; --sf2: #2a2f45;
  --bd: #33384d; --bd2: #444b63;
  --gd: #ff9e64; --gdl: #ffcfa8; --gdd: #cc7a3f;
  --gm: #bb9af7; --gmd: #7c3aed;
  --gn: #9ece6a; --rd: #f7768e;
  --tx: #c0caf5; --txd: #7982a9; --txb: #e0e4f5;
  --accent: #7aa2f7;
  --mod-skills: #e0af68; --mod-allies: #bb9af7; --mod-loot: #f7768e; --mod-upgrades: #7dcfff; --mod-ascend: #cfc9c2;
  font-family: 'Almendra', serif;
  background: var(--bg); color: var(--tx);
  min-height: 100vh; min-height: 100dvh; max-width: 480px;
  margin: 0 auto; user-select: none;
  position: relative; overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}
.cc-content { position:relative; flex:1; min-height:0; }
.cc-content::before { content:''; position:fixed; top:0; left:50%; transform:translateX(-50%); width:100%; max-width:480px; height:100vh; height:100dvh; background:url('/assets/backgrounds/dungeon_bg.png') center/cover no-repeat; z-index:0; pointer-events:none; opacity:0.15; animation:bg-flicker 4s ease-in-out infinite; }
@keyframes bg-flicker { 0%,100%{opacity:0.15;} 30%{opacity:0.18;} 50%{opacity:0.13;} 70%{opacity:0.17;} 85%{opacity:0.14;} }
.cc * { position: relative; z-index: 1; box-sizing: border-box; }

/* Header */
.hd { background: linear-gradient(180deg,#24283b,#1a1b26); border-bottom: 1px solid var(--bd2); padding: 10px 16px 10px; position: sticky; top: 0; z-index: 20; box-shadow: 0 4px 24px rgba(0,0,0,.5); }
.hd::after { content:''; position:absolute; bottom:-3px; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,rgba(255,158,100,.4),rgba(122,162,247,.3),transparent); }
.hd-brand { display:flex; justify-content:center; margin-bottom:6px; perspective:500px; }
.hd-title-wrap { display:flex; flex-direction:column; align-items:center; line-height:1; transform:rotateX(12deg); transform-style:preserve-3d; filter:drop-shadow(0 6px 16px rgba(0,0,0,.8)) drop-shadow(0 2px 0 rgba(0,0,0,.9)); }
.hd-title-castle { font-family:'GothicByte',serif; font-size:26px; letter-spacing:14px; color:#94a3b8; text-shadow:0 1px 3px rgba(0,0,0,.6); }
.hd-title-clicker { font-family:'Cinzel',serif; font-size:44px; font-weight:900; letter-spacing:4px; color:#fbbf24; text-shadow: 0 1px 0 #b45309, 0 2px 0 #92400e, 0 3px 0 #78350f, 0 4px 0 #5c2d0a, 0 5px 10px rgba(0,0,0,.6), 0 8px 20px rgba(0,0,0,.4); margin-top:-4px; }
.hd-stats { display:flex; justify-content:space-between; align-items:center; }
.hd-watch { font-family:'Fira Code',monospace; font-size:10px; color:var(--txd); padding:3px 8px; border-radius:10px; background:rgba(255,255,255,.05); border:1px solid var(--bd); display:inline-flex; align-items:center; gap:5px; }
.watch-info-btn { width:16px; height:16px; border-radius:50%; border:1px solid rgba(255,255,255,.4); background:rgba(255,255,255,.15); color:#fff; font-size:10px; font-family:'Inter',sans-serif; font-style:normal; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding:0 0 1px 0; line-height:1; transition:all .2s; }
.watch-info-btn:hover { background:rgba(255,255,255,.3); color:#fff; border-color:var(--gold); }

/* Watch Info Modal */
.watch-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.7); z-index:100; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(3px); animation:fadeIn .15s ease; }
.watch-modal { background:linear-gradient(180deg,#1a1f30,#111520); border:1px solid var(--bd2); border-radius:12px; padding:20px; max-width:380px; width:90%; box-shadow:0 8px 32px rgba(0,0,0,.6); }
.watch-modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
.watch-modal-title { font-family:'Cinzel',serif; font-size:16px; color:var(--tx); }
.watch-modal-close { background:none; border:1px solid var(--bd); color:var(--txd); width:24px; height:24px; border-radius:6px; cursor:pointer; font-size:12px; display:flex; align-items:center; justify-content:center; transition:all .2s; }
.watch-modal-close:hover { border-color:#c0392b; color:#c0392b; }
.watch-modal-desc { font-size:12px; color:var(--txd); line-height:1.5; margin:0 0 14px; }
.watch-highlight { color:var(--gold); font-weight:600; }
.watch-modal-grid { display:flex; flex-direction:column; gap:8px; }
.watch-modal-card { background:rgba(255,255,255,.03); border:1px solid var(--bd); border-radius:8px; padding:10px 12px; }
.watch-modal-card-active { border-color:var(--gold); box-shadow:0 0 8px rgba(240,176,0,.15); }
.watch-modal-card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; font-size:13px; color:var(--tx); font-family:'Cinzel',serif; }
.watch-modal-hours { font-family:'Fira Code',monospace; font-size:10px; color:var(--txm); }
.watch-modal-now { font-size:9px; font-weight:700; color:var(--gold); letter-spacing:1px; margin-bottom:4px; display:inline-block; }
.watch-modal-profs { display:flex; flex-wrap:wrap; gap:4px 8px; }
.watch-modal-prof { font-size:11px; }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }

/* Settings cog */
.settings-cog { position:absolute; left:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:#9a9a9a; cursor:pointer; padding:4px; transition:all .3s; z-index:21; }
.settings-cog:hover { color:#fff; transform:translateY(-50%) rotate(45deg); }

/* Settings modal extras */
.settings-section { margin-bottom:16px; }
.settings-label { display:block; font-family:'Cinzel',serif; font-size:12px; color:var(--tx); margin-bottom:8px; letter-spacing:.5px; }
.settings-theme-row { display:flex; gap:8px; }
.settings-theme-btn { flex:1; padding:8px; font-family:'Cinzel',serif; font-size:12px; font-weight:700; background:rgba(255,255,255,.05); border:1px solid var(--bd); color:var(--txd); border-radius:8px; cursor:pointer; transition:all .2s; }
.settings-theme-btn:hover { border-color:var(--bd2); color:var(--tx); }
.settings-theme-active { background:linear-gradient(180deg,#ffcfa8,#ff9e64) !important; color:#1a1b26 !important; border-color:#1a1b26 !important; }
.settings-slider-row { display:flex; align-items:center; gap:12px; }
.settings-slider { flex:1; -webkit-appearance:none; appearance:none; height:6px; border-radius:3px; background:rgba(255,255,255,.1); outline:none; }
.settings-slider::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%; background:linear-gradient(180deg,#ffcfa8,#ff9e64); border:2px solid #1a1b26; cursor:pointer; }
.settings-slider::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:linear-gradient(180deg,#ffcfa8,#ff9e64); border:2px solid #1a1b26; cursor:pointer; }
.settings-slider-val { font-family:'Fira Code',monospace; font-size:12px; color:var(--tx); min-width:40px; text-align:right; }

/* Light theme */
.cc-light {
  --bg: #e8e4de; --bg2: #ddd8d0;
  --sf: #d0cbc2; --sf2: #c8c2b8;
  --bd: #b8b0a4; --bd2: #a09888;
  --gd: #cc7a3f; --gdl: #e89050; --gdd: #aa6020;
  --tx: #2a2520; --txd: #6a6058; --txb: #1a1510;
  --accent: #4a6aaa;
  color: var(--tx);
  background: var(--bg);
}
.cc-light .hd { background:linear-gradient(180deg,#d0cbc2,#c4beb4); border-bottom-color:#a09888; box-shadow:0 4px 16px rgba(0,0,0,.12); }
.cc-light .bnav { background:linear-gradient(180deg,#2a2520,#1a1510); }
.cc-light .watch-modal { background:linear-gradient(180deg,#ddd8d0,#d0cbc2); }
.cc-light .watch-modal-card { background:rgba(0,0,0,.04); }
.cc-light .bar-out { background:#c4beb4; }
.cc-light .qty { background:linear-gradient(180deg,#c8c2b8,#b8b0a4); color:#2a2520; border-color:#a09888; }
.cc-light .qty:hover { border-color:#8a8070; }
.cc-light .settings-theme-btn { background:rgba(0,0,0,.06); border-color:#a09888; color:#6a6058; }
.cc-light .settings-slider { background:rgba(0,0,0,.12); }
.cc-light .watch-info-btn { border-color:rgba(0,0,0,.3); background:rgba(0,0,0,.1); color:#2a2520; }
.cc-light .settings-cog { color:#6a6058; }
.cc-light .settings-cog:hover { color:#2a2520; }
.hd-gold-box { display:flex; align-items:baseline; gap:6px; }
.hd-amount { font-family:'Cinzel',serif; font-size:24px; font-weight:900; color:var(--gdl); text-shadow:0 2px 8px rgba(251,191,36,.3); }
.hd-gems { font-family:'Fira Code',monospace; font-size:11px; color:var(--gm); padding:4px 10px; border-radius:12px; background:rgba(192,132,252,.12); border:1px solid rgba(192,132,252,.25); cursor:pointer; display:flex; align-items:center; gap:4px; transition:all .2s; }
.hd-gems:active { background:rgba(192,132,252,.2); }

/* Bottom Navigation */
.bnav { position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:480px; display:flex; background:linear-gradient(180deg,#1a1a1a,#0e0e0e); border-top:2px solid #f0b000; z-index:30; padding:4px 0; padding-bottom:max(4px, env(safe-area-inset-bottom)); box-shadow:0 -4px 24px rgba(0,0,0,.6),0 -1px 12px rgba(240,176,0,.1); }
.bnav::before { content:''; position:absolute; top:-3px; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,rgba(255,158,100,.25),rgba(122,162,247,.2),transparent); }
.bnav-btn { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; padding:8px 0 6px; background:none; border:none; cursor:pointer; color:#9a9a9a; transition:color .2s; -webkit-tap-highlight-color:transparent; }
.bnav-btn:active { transform:scale(.95); }
.bnav-icon { font-size:20px; line-height:1; }
.bnav-label { font-family:'Cinzel',serif; font-size:9px; font-weight:700; letter-spacing:.5px; text-shadow:0 1px 2px rgba(0,0,0,.4); }
.bnav-on { color:inherit; }
.bnav-on .bnav-icon { filter:drop-shadow(0 0 8px currentColor); }
.bnav-on .bnav-label { text-shadow:0 0 8px currentColor; }

/* Buy Quantity */
.qty-row { display:flex; gap:6px; padding:8px 12px; justify-content:flex-end; background:var(--bg2); }
.qty { padding:8px 16px; font-family:'Fira Code',monospace; font-size:12px; font-weight:700; background:linear-gradient(180deg,#222,#151515); color:#c0c0c0; border:2px solid #444; border-radius:8px; cursor:pointer; transition:all .15s; min-height:36px; -webkit-tap-highlight-color:transparent; box-shadow:0 2px 4px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.08); text-shadow:0 1px 2px rgba(0,0,0,.5); }
.qty:hover { border-color:#666; color:#e0e0e0; }
.qty:active { transform:scale(.95); }
.qty-on { background:linear-gradient(180deg,#ffcfa8,#ff9e64) !important; color:#1a1b26 !important; border-color:#1a1b26 !important; box-shadow:0 2px 12px rgba(255,158,100,.4),inset 0 1px 0 rgba(255,255,255,.3) !important; text-shadow:none !important; }

/* Venture List */
.vent-list { padding:4px 8px 20px; }
.vrow { display:flex; align-items:center; gap:6px; padding:8px 6px 8px 10px; margin-bottom:4px; background:linear-gradient(135deg,var(--sf),var(--sf2)); border:1px solid var(--bd); border-left:4px solid var(--bd); border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.03); transition:all .3s; }
.vrow:hover { border-color:var(--bd2); }
.vrow-locked { opacity:.55; backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); background:rgba(36,40,59,.4) !important; border-color:rgba(51,56,77,.3) !important; border-left-color:rgba(51,56,77,.4) !important; }
.vrow-afford { opacity:1; backdrop-filter:none; -webkit-backdrop-filter:none; border-color:rgba(52,211,153,.8) !important; border-left-color:rgba(52,211,153,1) !important; animation:row-glow 1.5s ease-in-out infinite; }
.vrow-can-buy { border-color:rgba(251,191,36,.5) !important; box-shadow:0 2px 8px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.03),0 0 12px rgba(251,191,36,.15); }
.vrow-watch { border-color:rgba(255,140,0,.6) !important; box-shadow:0 0 6px rgba(255,100,0,.3),0 0 14px rgba(255,60,0,.15),inset 0 0 12px rgba(255,80,0,.05); animation:fire-border 2s ease-in-out infinite; }
.vrow-watch::before { content:''; position:absolute; inset:-1px; border-radius:8px; padding:1px; background:linear-gradient(90deg,rgba(255,60,0,.5),rgba(255,180,0,.7),rgba(255,80,0,.5),rgba(255,200,50,.6),rgba(255,60,0,.5)); background-size:300% 100%; animation:fire-shimmer 3s linear infinite; -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none; z-index:2; }
@keyframes fire-border { 0%,100% { box-shadow:0 0 6px rgba(255,100,0,.3),0 0 14px rgba(255,60,0,.15),inset 0 0 12px rgba(255,80,0,.05); } 50% { box-shadow:0 0 10px rgba(255,100,0,.45),0 0 22px rgba(255,60,0,.25),inset 0 0 16px rgba(255,80,0,.08); } }
@keyframes fire-shimmer { 0% { background-position:0% 50%; } 100% { background-position:300% 50%; } }
@keyframes row-glow { 0%,100% { box-shadow:0 0 8px rgba(52,211,153,.3), 0 0 2px rgba(52,211,153,.5); border-color:rgba(52,211,153,.5); } 50% { box-shadow:0 0 20px rgba(52,211,153,.5), 0 0 8px rgba(52,211,153,.7); border-color:rgba(52,211,153,1); } }

/* Icon Badge */
.badge-wrap { display:flex; flex-direction:column; align-items:center; flex-shrink:0; cursor:pointer; }
.badge-wrap:active .badge { transform:scale(.92); }
.badge { width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:2px solid; box-shadow:0 2px 8px rgba(0,0,0,.3),inset 0 -2px 4px rgba(0,0,0,.2),inset 0 2px 4px rgba(255,255,255,.1); transition:transform .1s; overflow:hidden; }
.badge-ct { font-family:'Fira Code',monospace; font-size:10px; font-weight:700; color:var(--txb); text-shadow:0 1px 3px rgba(0,0,0,.8); margin-top:3px; }

/* Venture Middle */
.vmid { flex:1; min-width:0; cursor:pointer; }
.vname { font-family:'Cinzel',serif; font-size:12px; font-weight:700; color:var(--txb); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; text-shadow:0 1px 2px rgba(0,0,0,.4); }
.auto-tag { font-family:'Fira Code',monospace; font-size:8px; font-weight:700; color:var(--gn); margin-left:6px; padding:1px 5px; border-radius:3px; background:rgba(52,211,153,.12); }
.watch-tag { font-size:10px; margin-left:4px; filter:drop-shadow(0 0 3px rgba(255,200,50,.5)); }

/* Progress Bar */
.bar-out { height:14px; background:#1a1b26; border-radius:7px; overflow:hidden; border:1px solid var(--bd); box-shadow:inset 0 2px 4px rgba(0,0,0,.4); margin-bottom:3px; position:relative; }
.bar-in { height:100%; border-radius:6px; position:relative; overflow:hidden; }
.bar-in::after { content:''; position:absolute; inset:0; background:repeating-linear-gradient(-45deg,transparent,transparent 4px,rgba(255,255,255,.08) 4px,rgba(255,255,255,.08) 8px); animation:stripe .8s linear infinite; }
@keyframes stripe { 0%{background-position:0 0} 100%{background-position:16px 0} }
.bar-time { position:absolute; right:6px; top:50%; transform:translateY(-50%); font-family:'Fira Code',monospace; font-size:9px; font-weight:600; color:var(--txb); text-shadow:0 1px 3px rgba(0,0,0,.8); z-index:2; }

/* Milestone */
.vms { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); }
.vms-n { color:var(--gd); }

/* Material Badges */
.vmat-row { display:flex; flex-wrap:wrap; gap:4px; margin-top:2px; }
.vmat { font-family:'Fira Code',monospace; font-size:8px; font-weight:600; padding:1px 5px; border-radius:3px; background:rgba(255,255,255,.06); white-space:nowrap; }
.vmat-t2 { background:rgba(255,255,255,.10); }
.vmat-t3 { background:rgba(255,255,255,.15); text-shadow:0 0 6px currentColor; }

/* Buy Button */
.buy-btn { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px 12px; min-width:82px; min-height:58px; background:linear-gradient(180deg,#33384d,#24283b); border:2px solid #1a1b26; border-radius:10px; cursor:pointer; font-family:'Fira Code',monospace; transition:all .15s; flex-shrink:0; box-shadow:0 3px 8px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06); -webkit-tap-highlight-color:transparent; }
.buy-btn:active:not(:disabled) { transform:scale(.93); }
.buy-btn:disabled { opacity:.4; cursor:default; }
.buy-btn-go { background:linear-gradient(180deg,#9ece6a,#6fa33e); border-color:#2a3a15; box-shadow:0 3px 8px rgba(0,0,0,.4),0 0 14px rgba(158,206,106,.25),inset 0 1px 0 rgba(255,255,255,.15); }
.buy-btn-go:active { box-shadow:0 1px 4px rgba(0,0,0,.4),0 0 8px rgba(158,206,106,.2),inset 0 1px 0 rgba(255,255,255,.1); }
.buy-q { font-size:13px; font-weight:700; color:var(--txb); }
.buy-btn-go .buy-q { color:#1a2a0a; }
.buy-c { font-size:10px; color:var(--gdd); margin-top:2px; display:flex; align-items:center; gap:1px; }
.buy-btn-go .buy-c { color:#2a3a15; }
.buy-l { font-size:9px; color:var(--txd); margin-top:1px; text-transform:uppercase; letter-spacing:.5px; font-weight:700; }
.buy-btn-go .buy-l { color:#354a1e; }

/* Companions */
.comp-list { padding:12px 12px 20px; }
.comp-hdr { text-align:center; font-family:'Cinzel',serif; font-size:14px; color:var(--txd); margin-bottom:4px; letter-spacing:1px; }
.comp-sub { text-align:center; font-size:11px; color:var(--txd); margin:0 0 16px; opacity:.7; }
.comp-row { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; margin-bottom:4px; background:var(--sf); border:1px solid var(--bd); border-radius:8px; }
.comp-info { display:flex; align-items:center; gap:10px; }
.comp-icon { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid; box-shadow:0 2px 6px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1); }
.comp-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; color:var(--txb); }
.comp-desc { font-size:10px; color:var(--txd); font-style:italic; }
.comp-hired { font-family:'Fira Code',monospace; font-size:11px; color:var(--gn); font-weight:700; }
.comp-locked { font-size:11px; color:var(--txd); }
.comp-btn { padding:10px 18px; font-family:'Cinzel',serif; font-size:11px; font-weight:700; background:linear-gradient(180deg,var(--sf2),var(--sf)); color:var(--gd); border:1px solid var(--bd); border-radius:6px; cursor:pointer; transition:all .15s; display:flex; align-items:center; gap:2px; min-height:40px; -webkit-tap-highlight-color:transparent; }
.comp-btn:hover:not(:disabled) { border-color:var(--gd); }
.comp-btn:disabled { opacity:.3; cursor:default; }

/* Upgrades */
.upgrades { padding:12px 12px 20px; }
.up-hdr { text-align:center; font-family:'Cinzel',serif; font-size:14px; color:var(--txd); margin-bottom:4px; letter-spacing:1px; }
.up-sub { text-align:center; color:var(--txd); font-size:11px; margin:0 auto 12px; opacity:.7; }
.up-grid { display:flex; flex-direction:column; gap:8px; }
.up-card { background:var(--sf); border:1px solid var(--bd); border-left:4px solid var(--bd); border-radius:8px; padding:10px 12px; }
.up-card-top { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px; }
.up-card-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; }
.up-card-tier { font-family:'Fira Code',monospace; font-size:10px; color:var(--txd); }
.up-card-bonuses { display:flex; gap:8px; margin-bottom:6px; }
.up-bonus { font-family:'Fira Code',monospace; font-size:9px; color:var(--gn); padding:1px 6px; border-radius:3px; background:rgba(158,206,106,.1); }
.up-card-next { }
.up-next-label { font-family:'Fira Code',monospace; font-size:10px; color:var(--txd); margin-bottom:4px; }
.up-next-label strong { color:var(--txb); }
.up-cost-row { display:flex; flex-wrap:wrap; gap:4px 8px; margin-bottom:8px; }
.up-cost { font-family:'Fira Code',monospace; font-size:9px; font-weight:600; }
.up-cost-ok { opacity:1; }
.up-cost-no { opacity:.5; }
.up-btn { width:100%; padding:8px; font-family:'Cinzel',serif; font-size:11px; font-weight:700; background:linear-gradient(180deg,#33384d,#24283b); color:var(--txd); border:2px solid #1a1b26; border-radius:8px; cursor:pointer; transition:all .15s; }
.up-btn:disabled { opacity:.4; cursor:default; }
.up-btn-go { background:linear-gradient(180deg,#9ece6a,#6fa33e); color:#1a2a0a; border-color:#2a3a15; box-shadow:0 2px 10px rgba(158,206,106,.25); }
.up-btn-go:active { transform:scale(.97); }
.up-card-max { font-family:'Cinzel',serif; font-size:12px; font-weight:900; text-align:center; color:var(--gd); letter-spacing:2px; padding:6px 0; text-shadow:0 0 8px rgba(255,158,100,.3); }
.up-passive { margin:4px 0 6px; padding:4px 8px; border-radius:6px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); }
.up-passive-name { font-family:'Cinzel',serif; font-size:10px; font-weight:700; color:var(--gd); margin-right:6px; }
.up-passive-desc { font-size:9px; color:var(--txd); }
.up-transform { margin:8px 0; }
.up-transform-label { font-family:'Cinzel',serif; font-size:11px; color:var(--gd); text-align:center; margin-bottom:6px; letter-spacing:1px; }
.up-tf-option { background:rgba(255,255,255,.03); border:1px solid var(--bd); border-radius:8px; padding:8px 10px; margin-bottom:6px; }
.up-tf-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; margin-bottom:2px; }
.up-tf-stats { display:flex; gap:6px; margin-bottom:3px; }
.up-tf-passive { font-size:9px; color:var(--txd); margin-bottom:6px; line-height:1.4; }
.up-tf-passive strong { color:var(--txb); }
.up-btn-transform { background:linear-gradient(180deg,#ff9e64,#cc7a3f); color:#1a1b26; border-color:#4a2a10; box-shadow:0 2px 10px rgba(255,158,100,.25); }
.up-btn-transform:active { transform:scale(.97); }

/* Prestige */
.prest { padding:24px 16px 20px; text-align:center; }
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
.ft { display:flex; justify-content:space-between; align-items:center; padding:8px 16px; border-top:1px solid var(--bd); background:var(--bg2); }
.ft-text { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); }
.ft-reset { font-family:'Fira Code',monospace; font-size:9px; color:var(--rd); background:none; border:1px solid rgba(239,68,68,.2); border-radius:4px; padding:6px 14px; cursor:pointer; min-height:36px; }

/* Scrollbar */
.cc ::-webkit-scrollbar { width:4px; }
.cc ::-webkit-scrollbar-track { background:transparent; }
.cc ::-webkit-scrollbar-thumb { background:var(--bd); border-radius:2px; }

/* Loot Toast */
.loot-toast { position:fixed; top:140px; left:50%; transform:translateX(-50%); background:var(--bg2); border:2px solid; border-radius:10px; padding:10px 20px; z-index:50; text-align:center; min-width:220px; max-width:360px; animation:toast-in .3s ease-out; box-shadow:0 4px 20px rgba(0,0,0,.6); }
.loot-toast-out { animation:toast-out .7s ease-in forwards; }
@keyframes toast-in { from { opacity:0; transform:translateX(-50%) translateY(-20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
@keyframes toast-out { from { opacity:1; } to { opacity:0; transform:translateX(-50%) translateY(-20px); } }
.loot-toast-rarity { font-family:'Fira Code',monospace; font-size:9px; text-transform:uppercase; letter-spacing:1.5px; display:block; margin-bottom:2px; }
.loot-toast-name { font-family:'Cinzel',serif; font-size:14px; font-weight:700; display:block; }
.loot-toast-desc { font-size:10px; color:var(--txd); margin-top:4px; display:block; }

/* Inventory Tab */
.inv-panel { padding:12px 12px 20px; }
.inv-hdr { text-align:center; font-family:'Cinzel',serif; font-size:14px; color:var(--txd); margin-bottom:4px; letter-spacing:1px; }
.inv-sub { text-align:center; font-size:11px; color:var(--txd); margin:0 0 16px; opacity:.7; }
/* Materials Grid */
.mat-grid { display:flex; flex-direction:column; gap:6px; }
.mat-card { background:var(--sf); border:1px solid var(--bd); border-radius:8px; padding:8px 12px; }
.mat-card-hdr { font-family:'Cinzel',serif; font-size:11px; font-weight:700; margin-bottom:4px; }
.mat-card-items { display:flex; flex-direction:column; gap:3px; }
.mat-entry { display:flex; align-items:center; gap:6px; }
.mat-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.mat-dot-t2 { width:7px; height:7px; }
.mat-dot-t3 { width:8px; height:8px; }
.mat-name { font-family:'Fira Code',monospace; font-size:10px; color:var(--txd); flex:1; }
.mat-ct { font-family:'Fira Code',monospace; font-size:11px; font-weight:700; color:var(--txb); }

.inv-empty { text-align:center; color:var(--txd); font-size:12px; padding:40px 20px; opacity:.5; }
.inv-grid { display:flex; flex-direction:column; gap:6px; }
.inv-item { background:var(--sf); border:1px solid var(--bd); border-radius:8px; padding:10px 12px; transition:border-color .2s; }
.inv-item-hdr { display:flex; justify-content:space-between; align-items:baseline; }
.inv-item-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; }
.inv-item-qty { font-family:'Fira Code',monospace; font-size:11px; color:var(--txd); }
.inv-item-rarity { font-family:'Fira Code',monospace; font-size:9px; text-transform:uppercase; letter-spacing:1px; margin:2px 0; }
.inv-item-desc { font-size:10px; color:var(--txd); font-style:italic; }
.inv-item-actions { display:flex; align-items:center; justify-content:space-between; margin-top:6px; }
.inv-equip-btn { font-family:'Cinzel',serif; font-size:10px; font-weight:700; padding:4px 12px; border-radius:6px; border:1px solid var(--accent,#7aa2f7); color:var(--accent,#7aa2f7); background:rgba(122,162,247,.1); cursor:pointer; transition:all .2s; }
.inv-equip-btn:hover { background:rgba(122,162,247,.25); color:#fff; }
.inv-item-equipped { font-family:'Fira Code',monospace; font-size:9px; color:var(--gn,#9ece6a); }
.inv-item-all-eq { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); font-style:italic; }

/* ── Equipment Panel ── */
.eq-panel { padding:12px 12px 8px; }
.eq-hdr { text-align:center; font-family:'Cinzel',serif; font-size:14px; color:var(--txb,#c0caf5); margin-bottom:8px; letter-spacing:1px; }
.eq-count { font-family:'Fira Code',monospace; font-size:11px; color:var(--txd,#565f89); margin-left:6px; }
.eq-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:12px; }
.eq-slot { background:var(--sf,#1a1b26); border:1px solid var(--bd,#292e42); border-radius:8px; aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4px; cursor:pointer; transition:all .2s; overflow:hidden; }
.eq-slot-empty { border-style:dashed; border-color:var(--bd2,#3b4261); }
.eq-slot-empty:hover { border-color:var(--accent,#7aa2f7); background:rgba(122,162,247,.08); }
.eq-slot-plus { font-size:20px; color:var(--bd2,#3b4261); font-weight:300; }
.eq-slot-filled { border-width:2px; }
.eq-slot-filled:hover { filter:brightness(1.15); }
.eq-slot-name { font-family:'Cinzel',serif; font-size:9px; font-weight:700; text-align:center; line-height:1.2; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.eq-slot-rarity { font-family:'Fira Code',monospace; font-size:7px; text-transform:uppercase; letter-spacing:.5px; margin-top:2px; }
.eq-slot-locked { opacity:.4; cursor:default; background:rgba(0,0,0,.2); }
.eq-slot-label { font-size:8px; color:var(--txd,#565f89); text-align:center; margin-top:4px; line-height:1.2; }
.eq-slot-mtx { opacity:.5; cursor:pointer; border-style:dotted; border-color:var(--accent,#7aa2f7); }
.eq-slot-mtx:hover { opacity:.7; border-color:#9bb8fa; }

/* ── Particles ── */
.particle-container {
  position: fixed;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 100%; max-width: 480px;
  height: 100vh; height: 100dvh;
  pointer-events: none;
  z-index: 40;
  overflow: hidden;
}
.particle {
  position: absolute;
  pointer-events: none;
  will-change: transform, opacity;
}
.particle-ripple {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 2px solid var(--p-color);
  margin-left: -20px; margin-top: -20px;
  animation: p-ripple 0.5s ease-out forwards;
}
@keyframes p-ripple {
  0%   { transform: scale(0.3); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}
.particle-coin {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff8, var(--p-color));
  box-shadow: 0 0 4px var(--p-color);
  margin-left: -4px; margin-top: -4px;
  animation: p-coin 0.7s ease-out forwards;
}
@keyframes p-coin {
  0%   { transform: translate(0, 0) scale(1); opacity: 1; }
  60%  { opacity: 0.8; }
  100% { transform: translate(var(--p-tx), var(--p-ty)) scale(0.3); opacity: 0; }
}
.particle-gold-text {
  font-family: 'Cinzel', serif;
  font-size: 14px;
  font-weight: 900;
  color: var(--p-color);
  text-shadow: 0 1px 4px rgba(0,0,0,.8), 0 0 8px var(--p-color);
  white-space: nowrap;
  transform: translateX(-50%);
  animation: p-gold-text 1.0s ease-out forwards;
}
@keyframes p-gold-text {
  0%   { transform: translateX(-50%) translateY(0) scale(0.8); opacity: 1; }
  20%  { transform: translateX(-50%) translateY(-8px) scale(1.1); opacity: 1; }
  100% { transform: translateX(-50%) translateY(-50px) scale(0.9); opacity: 0; }
}
`;

