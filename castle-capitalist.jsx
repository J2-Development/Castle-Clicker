import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
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
  // Revenue scales ~8-12x per tier so new ventures are always worth buying (Kongregate principle).
  // Milestones then pull players back to stack old ventures — creating oscillating decisions.
  { id:0, name:"Torch Scavenging",     color:"#e8a023", colorDark:"#a06810", baseCost:4,             baseRevenue:1,            baseTime:1000,    unlockCost:0 },
  { id:1, name:"Goblin Pickpocketing",  color:"#6dba4a", colorDark:"#3d7a22", baseCost:60,           baseRevenue:20,           baseTime:3000,    unlockCost:200 },
  { id:2, name:"Mushroom Foraging",     color:"#c74f8e", colorDark:"#8a2a5e", baseCost:1400,         baseRevenue:400,          baseTime:6000,    unlockCost:5000 },
  { id:3, name:"Skeleton Looting",      color:"#8bb8d0", colorDark:"#4a7a94", baseCost:36000,        baseRevenue:7000,         baseTime:10000,   unlockCost:130000 },
  { id:4, name:"Trap Disarming",        color:"#e85d3a", colorDark:"#a33820", baseCost:950000,       baseRevenue:160000,       baseTime:20000,   unlockCost:3500000 },
  { id:5, name:"Potion Brewing",        color:"#a855f7", colorDark:"#6a2aaa", baseCost:26000000,     baseRevenue:3000000,      baseTime:36000,   unlockCost:100000000 },
  { id:6, name:"Dragon Taming",         color:"#ef4444", colorDark:"#991b1b", baseCost:750000000,    baseRevenue:60000000,     baseTime:60000,   unlockCost:1500000000 },
  { id:7, name:"Dungeon Expansion",     color:"#14b8a6", colorDark:"#0d7a6e", baseCost:22000000000,  baseRevenue:1200000000,   baseTime:96000,   unlockCost:15000000000 },
  { id:8, name:"Demon Gate Siege",      color:"#f97316", colorDark:"#b45210", baseCost:700000000000, baseRevenue:24000000000,  baseTime:150000,  unlockCost:500000000000 },
  { id:9, name:"Elder God Pact",        color:"#6366f1", colorDark:"#4338ca", baseCost:25000000000000,baseRevenue:500000000000,baseTime:240000,  unlockCost:15000000000000 },
];

// Revenue multiplied at ownership thresholds (sawtooth spikes)
// Spaced out, earned not given — big spikes are rare dopamine hits
const MILESTONES = [
  { at:10,   mult:1.5 }, // early bump — quick dopamine hit
  { at:25,   mult:2 },
  { at:50,   mult:2 },
  { at:100,  mult:2 },   // triple digits feel huge (softened to make room for 150)
  { at:150,  mult:1.5 }, // continuous mid-game reward
  { at:200,  mult:2 },
  { at:250,  mult:1.5 }, // continuous mid-game reward
  { at:300,  mult:2 },   // softened from 3×
  { at:400,  mult:1.5 }, // continuous mid-game reward
  { at:500,  mult:2 },   // softened from 3×
  { at:600,  mult:1.5 }, // continuous mid-game reward
  { at:750,  mult:2 },
  { at:850,  mult:1.5 }, // continuous mid-game reward
  { at:1000, mult:2 },   // softened from 3×
  { at:1500, mult:2 },
  { at:2000, mult:4 },   // late-game spike
  { at:3000, mult:3 },
  { at:5000, mult:3 },
];

// Cost to recruit each companion (auto-runner)
// Priced as a mid-tier luxury — you feel it when you buy one
// Priced at ~150-300x the profession unlock cost so companions arrive
// mid-investment, not after you've fully saturated the profession.
// Previous values for Dungeon/Demon/Elder were 1300-2700x — unreachable.
const COMPANION_COSTS = [
  2500, 60000, 800000, 20000000, 500000000,
  15000000000, 400000000000, 3000000000000,
  100000000000000, 3000000000000000,
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
// First prestige gem is now earned at 1B lifetime gold — reachable in a couple hours
// of play rather than weeks. Previous value (1e12) was tuned for an obsolete economy
// and put first prestige functionally out of reach for mid-game players.
const PRESTIGE_BASE = 3e9;
// Every Soul Gem earned gives +2% gold permanently (uncapped). This is the "angels"
// model from AdVenture Capitalist: prestige currency should have inherent power so
// the very first prestige delivers a visible, felt reward before any skill spending.
const GEM_GOLD_BONUS = 0.02;

// Cost scaling
const COST_EXPONENT = 1.07;       // each unit costs 7% more — matches AdVenture Capitalist standard

// Offline earnings multiplier (1.0 = full, 0.25 = quarter)
const OFFLINE_EFFICIENCY = 0.25;

// Max offline time counted (8 hours in ms)
const OFFLINE_CAP = 8 * 60 * 60 * 1000;

// Save key for localStorage / AsyncStorage
const SAVE_KEY = "castle_clicker_v9"; // bumped: skill tree, achievements, events

// ═══ PRESTIGE SKILL TREE ═══
const SKILL_TREE = [
  // Tier 1 — 0 gems spent to unlock
  { id:"st_gold1",     tier:1, cost:1, name:"Gilded Touch",       desc:"+10% all gold",                    effect:{ type:"goldMult", value:0.10 } },
  { id:"st_speed1",    tier:1, cost:1, name:"Swift Hands",        desc:"+10% all speed",                   effect:{ type:"speedMult", value:0.10 } },
  { id:"st_drops1",    tier:1, cost:1, name:"Lucky Find",         desc:"+10% drop rates",                  effect:{ type:"dropRate", value:0.10 } },
  { id:"st_startgold", tier:1, cost:1, name:"Inherited Wealth",   desc:"Start with 5,000g after ascend",   effect:{ type:"startGold", value:5000 } },
  // Tier 2 — 3 gems spent to unlock
  { id:"st_gold2",     tier:2, cost:2, name:"Midas Blessing",     desc:"+25% all gold",                    effect:{ type:"goldMult", value:0.25 } },
  { id:"st_speed2",    tier:2, cost:2, name:"Haste Enchantment",  desc:"+20% all speed",                   effect:{ type:"speedMult", value:0.20 } },
  { id:"st_autobuy1",  tier:2, cost:2, name:"Loyal Squire",       desc:"Auto-unlock first 2 professions",  effect:{ type:"autoBuy", value:2 } },
  { id:"st_matdrop1",  tier:2, cost:2, name:"Prospector",         desc:"+25% material drops",              effect:{ type:"matDrop", value:0.25 } },
  // Tier 3 — 8 gems spent to unlock
  { id:"st_gold3",     tier:3, cost:3, name:"Dragon's Hoard",     desc:"+50% all gold",                    effect:{ type:"goldMult", value:0.50 } },
  { id:"st_speed3",    tier:3, cost:3, name:"Time Warp",          desc:"+30% all speed",                   effect:{ type:"speedMult", value:0.30 } },
  { id:"st_slot",      tier:3, cost:3, name:"Arsenal Expansion",  desc:"+1 equipment slot",                effect:{ type:"bonusSlot", value:1 } },
  { id:"st_offline",   tier:3, cost:3, name:"Dream Worker",       desc:"Offline efficiency doubled",       effect:{ type:"offlineEff", value:0.25 } },
  { id:"st_drops2",    tier:3, cost:2, name:"Treasure Sense",     desc:"+30% drop rates",                  effect:{ type:"dropRate", value:0.30 } },
  // Tier 4 — 15 gems spent to unlock
  { id:"st_gold4",     tier:4, cost:4, name:"Philosopher's Stone", desc:"2x all gold",                     effect:{ type:"goldMult", value:1.00 } },
  { id:"st_autobuy2",  tier:4, cost:4, name:"Master Recruiter",   desc:"Auto-unlock first 5 professions",  effect:{ type:"autoBuy", value:5 } },
  { id:"st_companion", tier:4, cost:5, name:"Bound Souls",        desc:"Keep first 2 companions on ascend",effect:{ type:"keepCompanions", value:2 } },
  { id:"st_startgold2",tier:4, cost:4, name:"Royal Treasury",     desc:"Start with 500,000g after ascend", effect:{ type:"startGold", value:500000 } },
  { id:"st_prestige",  tier:4, cost:5, name:"Ascendant Power",    desc:"+50% gems earned on ascend",       effect:{ type:"gemBonus", value:0.50 } },
];
const SKILL_TIER_REQS = { 1:0, 2:3, 3:8, 4:15 };

const getSkillBonuses = (skills) => {
  const b = { goldMult:0, speedMult:0, dropRate:0, matDrop:0, startGold:0, autoBuy:0, bonusSlot:0, offlineEff:0, keepCompanions:0, gemBonus:0 };
  for (const sid of Object.keys(skills)) {
    const sk = SKILL_TREE.find(s => s.id === sid);
    if (!sk) continue;
    const e = sk.effect;
    if (e.type === "autoBuy" || e.type === "keepCompanions") b[e.type] = Math.max(b[e.type], e.value);
    else b[e.type] = (b[e.type] || 0) + e.value;
  }
  return b;
};

const getGemsSpent = (skills) => Object.keys(skills).reduce((sum, sid) => {
  const sk = SKILL_TREE.find(s => s.id === sid);
  return sum + (sk ? sk.cost : 0);
}, 0);

// ═══ ACHIEVEMENTS ═══
const ACHIEVEMENT_BONUS = 0.01; // +1% all gold per achievement
const ACHIEVEMENTS = [
  // Gold milestones
  { id:"ach_gold1",   name:"Pocket Change",     desc:"Earn 1,000 lifetime gold",              check: s => s.lifetimeGold >= 1e3 },
  { id:"ach_gold2",   name:"Small Fortune",      desc:"Earn 1,000,000 lifetime gold",          check: s => s.lifetimeGold >= 1e6 },
  { id:"ach_gold3",   name:"Dragon's Hoard",     desc:"Earn 1 billion lifetime gold",          check: s => s.lifetimeGold >= 1e9 },
  { id:"ach_gold4",   name:"Infinite Wealth",    desc:"Earn 1 trillion lifetime gold",         check: s => s.lifetimeGold >= 1e12 },
  // Venture ownership
  { id:"ach_own25",   name:"Getting Started",    desc:"Own 25 of any profession",              check: s => s.ventures.some(v => v.owned >= 25) },
  { id:"ach_own100",  name:"Committed",          desc:"Own 100 of any profession",             check: s => s.ventures.some(v => v.owned >= 100) },
  { id:"ach_own500",  name:"Obsessed",           desc:"Own 500 of any profession",             check: s => s.ventures.some(v => v.owned >= 500) },
  { id:"ach_all10",   name:"Diversified",        desc:"Own all 10 professions",                check: s => s.ventures.filter(v => v.owned > 0).length >= 10 },
  // Companions
  { id:"ach_comp1",   name:"First Ally",         desc:"Recruit 1 companion",                   check: s => s.ventures.filter(v => v.hasCompanion).length >= 1 },
  { id:"ach_comp5",   name:"Party Leader",       desc:"Recruit 5 companions",                  check: s => s.ventures.filter(v => v.hasCompanion).length >= 5 },
  { id:"ach_comp10",  name:"Army Commander",     desc:"Recruit all 10 companions",             check: s => s.ventures.filter(v => v.hasCompanion).length >= 10 },
  // Loot
  { id:"ach_loot10",  name:"Collector",          desc:"Find 10 unique items",                  check: s => Object.keys(s.inventory).length >= 10 },
  { id:"ach_loot25",  name:"Hoarder",            desc:"Find 25 unique items",                  check: s => Object.keys(s.inventory).length >= 25 },
  { id:"ach_rare",    name:"Rare Find",          desc:"Find a rare or better item",            check: s => s.hasFoundRare },
  // Prestige
  { id:"ach_asc1",    name:"First Ascension",    desc:"Ascend once",                           check: s => s.totalAscensions >= 1 },
  { id:"ach_asc5",    name:"Seasoned Ascender",  desc:"Ascend 5 times",                        check: s => s.totalAscensions >= 5 },
  { id:"ach_asc10",   name:"Eternal Returner",   desc:"Ascend 10 times",                       check: s => s.totalAscensions >= 10 },
  { id:"ach_gems10",  name:"Gem Collector",      desc:"Earn 10 total Soul Gems",               check: s => s.totalGems >= 10 },
  { id:"ach_gems50",  name:"Gem Lord",           desc:"Earn 50 total Soul Gems",               check: s => s.totalGems >= 50 },
  // Upgrades
  { id:"ach_upg1",    name:"Apprentice",         desc:"Reach Apprentice in any profession",    check: s => s.profUpgrades.some(t => t >= 1) },
  { id:"ach_upg5",    name:"Master Craftsman",   desc:"Reach Master in any profession",        check: s => s.profUpgrades.some(t => t >= 4) },
  { id:"ach_upgall",  name:"Jack of All",        desc:"Reach Journeyman in all professions",   check: s => s.profUpgrades.every(t => t >= 2) },
  // Activity
  { id:"ach_click100",name:"Restless Fingers",   desc:"Manually start 100 cycles",             check: s => s.manualClicks >= 100 },
  { id:"ach_click1k", name:"Carpal Tunnel",      desc:"Manually start 1,000 cycles",           check: s => s.manualClicks >= 1000 },
  { id:"ach_event5",  name:"Event Hunter",       desc:"Activate 5 dungeon events",             check: s => s.eventsActivated >= 5 },
  { id:"ach_event20", name:"Thrill Seeker",      desc:"Activate 20 dungeon events",            check: s => s.eventsActivated >= 20 },

  // ── HARD / ENDGAME ──
  // Gold milestones (extreme)
  { id:"ach_gold5",         name:"Pocket Pharaoh",      desc:"Earn 100 trillion lifetime gold",                    check: s => s.lifetimeGold >= 1e14 },
  { id:"ach_gold6",         name:"Digital Godhood",     desc:"Earn 1 quadrillion lifetime gold",                   check: s => s.lifetimeGold >= 1e15 },
  // Gold-at-once
  { id:"ach_hoard_1b",      name:"Midas Touch",         desc:"Hold 1 billion gold at once",                        check: s => s.gold >= 1e9 },
  { id:"ach_hoard_1t",      name:"Dragon Hoard",        desc:"Hold 1 trillion gold at once",                       check: s => s.gold >= 1e12 },
  // Ownership
  { id:"ach_own1k",         name:"Legion",              desc:"Own 1,000 of any profession",                        check: s => s.ventures.some(v => v.owned >= 1000) },
  { id:"ach_ownall100",     name:"Thousand Strong",     desc:"Own 100 of every profession",                        check: s => s.ventures.every(v => v.owned >= 100) },
  { id:"ach_ownall500",     name:"Host of Heroes",      desc:"Own 500 of every profession",                        check: s => s.ventures.every(v => v.owned >= 500) },
  // Profession mastery
  { id:"ach_upg_gm",        name:"Grandmaster",         desc:"Reach Grandmaster in any profession",                check: s => s.profUpgrades.some(t => t >= 5) },
  { id:"ach_upg_master_all",name:"Master of Trades",    desc:"Reach Master in every profession",                   check: s => s.profUpgrades.every(t => t >= 4) },
  { id:"ach_upg_gm_all",    name:"Peerless",            desc:"Reach Grandmaster in every profession",              check: s => s.profUpgrades.every(t => t >= 5) },
  // Prestige (extreme)
  { id:"ach_gems100",       name:"Gem Baron",           desc:"Earn 100 total Soul Gems",                           check: s => s.totalGems >= 100 },
  { id:"ach_gems500",       name:"Gem Emperor",         desc:"Earn 500 total Soul Gems",                           check: s => s.totalGems >= 500 },
  { id:"ach_asc25",         name:"Ascension Addict",    desc:"Ascend 25 times",                                    check: s => s.totalAscensions >= 25 },
  { id:"ach_asc50",         name:"Cycle of Eternity",   desc:"Ascend 50 times",                                    check: s => s.totalAscensions >= 50 },
  // Loot completionist
  { id:"ach_legendary",     name:"First Legendary",     desc:"Find a legendary item",                              check: s => Object.keys(s.inventory).some(id => LOOT_BY_ID[id]?.rarity === "legendary") },
  { id:"ach_all_legendary", name:"Legendary Hoarder",   desc:"Find every legendary item",                          check: s => LOOT_TABLE.filter(i => i.rarity === "legendary").every(i => s.inventory[i.id]) },
  { id:"ach_loot_all",      name:"Completionist",       desc:"Find every item in the loot table",                  check: s => LOOT_TABLE.every(i => s.inventory[i.id]) },
  // Transformation
  { id:"ach_transform_any", name:"Metamorphosis",       desc:"Transform any profession",                           check: s => s.profTransforms.some(t => t != null) },
  { id:"ach_transform_all", name:"Ultimate Evolution",  desc:"Transform every profession",                         check: s => s.profTransforms.every(t => t != null) },
  // Skill tree
  { id:"ach_skill_all",     name:"Scholar Supreme",     desc:"Unlock every skill tree node",                       check: s => Object.keys(s.unlockedSkills).length >= SKILL_TREE.length },
  // Misc extreme
  { id:"ach_mtx_all",       name:"Deep Pockets",        desc:"Purchase all 4 bonus equipment slots",               check: s => s.mtxSlots >= 4 },
  { id:"ach_click10k",      name:"Click Machine",       desc:"Manually start 10,000 cycles",                       check: s => s.manualClicks >= 10000 },
  { id:"ach_event50",       name:"Festival Goer",       desc:"Activate 50 dungeon events",                         check: s => s.eventsActivated >= 50 },
  { id:"ach_event200",      name:"Event Devotee",       desc:"Activate 200 dungeon events",                        check: s => s.eventsActivated >= 200 },
  { id:"ach_mat_tier3_any", name:"Catalyst Collector",  desc:"Earn 10 of any tier-3 specialty material",           check: s => Object.values(s.materials).some(m => m && (m.t3 || 0) >= 10) },
  { id:"ach_mat_tier3_all", name:"Master Alchemist",    desc:"Earn a tier-3 specialty material from every profession", check: s => Array.from({length:10}, (_,i) => i).every(i => ((s.materials[i] || {}).t3 || 0) >= 1) },
  // Tier upgrades
  { id:"ach_apprentice1",   name:"First Rank",          desc:"Upgrade a profession to Apprentice",                 check: s => (s.profUpgrades || []).some(t => t >= 1) },
  { id:"ach_journeyman1",   name:"Skilled Tradesman",   desc:"Upgrade a profession to Journeyman",                 check: s => (s.profUpgrades || []).some(t => t >= 2) },
  { id:"ach_expert1",       name:"Master of the Craft", desc:"Upgrade a profession to Expert",                     check: s => (s.profUpgrades || []).some(t => t >= 3) },
  { id:"ach_master1",       name:"Sovereign",           desc:"Upgrade a profession to Master",                     check: s => (s.profUpgrades || []).some(t => t >= 4) },
  { id:"ach_grandmaster1",  name:"Legend Forged",       desc:"Upgrade a profession to Grandmaster",                check: s => (s.profUpgrades || []).some(t => t >= 5) },
  { id:"ach_apprentice_all",name:"The Whole Castle",    desc:"Every profession at Apprentice or higher",           check: s => (s.profUpgrades || []).length >= 10 && s.profUpgrades.every(t => t >= 1) },
  // Sacrifice
  { id:"ach_sacrifice1",    name:"First Offering",      desc:"Sacrifice an item at the altar",                     check: s => Object.values(s.consumedBuffs || {}).some(v => v > 0) },
  { id:"ach_sacrifice_gold",name:"Altar of Power",      desc:"Accumulate +50% permanent gold from sacrifices",     check: s => (s.consumedBuffs?.goldMultiplier || 0) >= 0.50 },
];

// Maps achievement id → icon number in /assets/achievements/. 30 hand-drawn
// icons split across three themes: jewelry (1-10), wealth (11-20), combat (21-30).
// Related achievements share icons along each tier progression.
const ACH_ICONS = {
  // Gold / wealth progression
  ach_gold1:11, ach_gold2:12, ach_gold3:13, ach_gold4:14, ach_gold5:15, ach_gold6:16,
  ach_hoard_1b:17, ach_hoard_1t:18,
  // Soul Gems — endgame pouches / chests
  ach_gems10:17, ach_gems50:18, ach_gems100:19, ach_gems500:20,
  // Events — treasure discoveries
  ach_event5:11, ach_event20:13, ach_event50:15, ach_event200:18,
  // MTX slots
  ach_mtx_all:20,
  // Loot discovery (jewelry set)
  ach_rare:1, ach_loot10:2, ach_loot25:3,
  ach_legendary:4, ach_all_legendary:5, ach_loot_all:6,
  // Sacrifice (altar offerings)
  ach_sacrifice1:7, ach_sacrifice_gold:8,
  // Materials / alchemy
  ach_mat_tier3_any:9, ach_mat_tier3_all:10,
  // Ownership (shield set)
  ach_own25:21, ach_own100:22, ach_own500:23, ach_own1k:24,
  ach_all10:25, ach_ownall100:26, ach_ownall500:27,
  // Tier mastery
  ach_upg1:21, ach_apprentice1:21,
  ach_journeyman1:22,
  ach_expert1:23,
  ach_upg5:24, ach_master1:24,
  ach_upg_gm:25, ach_grandmaster1:25,
  ach_upgall:26, ach_apprentice_all:26,
  ach_upg_master_all:27,
  ach_upg_gm_all:28,
  // Companions — allies
  ach_comp1:22, ach_comp5:25, ach_comp10:28,
  // Transforms
  ach_transform_any:28, ach_transform_all:29,
  // Skill tree
  ach_skill_all:30,
  // Ascension
  ach_asc1:22, ach_asc5:24, ach_asc10:26, ach_asc25:28, ach_asc50:30,
  // Activity / clicks
  ach_click100:21, ach_click1k:23, ach_click10k:25,
};
const getAchievementIcon = id => (ACH_ICONS[id] ? `/assets/achievements/${ACH_ICONS[id]}.png` : null);

// ═══ DUNGEON EVENTS ═══
const DUNGEON_EVENTS = [
  { id:"treasure_goblin", name:"Treasure Goblin",  desc:"10x gold for 30 seconds!",         duration:30000, color:"#fbbf24", effect:{ goldMult:10 } },
  { id:"material_storm",  name:"Material Storm",   desc:"5x material drops for 45 seconds!", duration:45000, color:"#14b8a6", effect:{ matMult:5 } },
  { id:"loot_frenzy",     name:"Loot Frenzy",      desc:"5x drop rates for 30 seconds!",    duration:30000, color:"#a855f7", effect:{ dropMult:5 } },
  { id:"speed_demon",     name:"Speed Demon",      desc:"All cycles halved for 30 seconds!", duration:30000, color:"#ef4444", effect:{ speedMult:2 } },
  { id:"boss_raid",       name:"Boss Raid",         desc:"Click rapidly! Earn gold per click!",duration:10000, color:"#f97316", effect:{ bossRaid:true } },
];
const EVENT_SPAWN_MIN = 2 * 60 * 1000;
const EVENT_SPAWN_MAX = 5 * 60 * 1000;
const EVENT_EXPIRE_TIME = 15000;

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

// cycleTimeFactor compensates for slow professions: a 240s cycle drops
// 240x more materials than a 1s cycle so wall-clock farming time is equal.
const rollMaterialDrop = (ventureIndex, owned, watchBonus = 1, cycleTimeFactor = 1) => {
  const levelBonus = Math.floor(owned / 10);
  const drops = {};
  for (const tier of ["t3", "t2", "t1"]) {
    const rate = MAT_DROP_RATES[tier] * (1 + levelBonus * MAT_LEVEL_SCALING[tier]) * watchBonus * cycleTimeFactor;
    // Support rates > 1: guaranteed floor + fractional chance for remainder
    const guaranteed = Math.floor(rate);
    const remainder = rate - guaranteed;
    let count = guaranteed;
    if (Math.random() < remainder) count++;
    if (count > 0) drops[tier] = (drops[tier] || 0) + count;
  }
  return Object.keys(drops).length > 0 ? drops : null;
};

// ═══ PROFESSION UPGRADES ═══
// Apprentice is the "real unlock" — doubles base revenue so old professions
// genuinely pay off after their first material upgrade. Each subsequent tier
// adds meaningful growth: GM caps at 11× rev + 1.4× speed = ~15× total power.
// synergyBonus is a percent bonus applied to ALL higher-tier professions.
// Direction is old → new: pushing Torch to Apprentice buffs every profession above it.
// Stacks additively across sources. Capped naturally by there only being 5 tiers.
// dropBonus is a drop-rate multiplier applied to loot AND material rolls on this
// profession only — tying the tier loop to the material loop so upgrades compound.
const UPGRADE_TIERS = [
  { name:"—",            t1:0,    t2:0,   t3:0,  revBonus:0,       speedBonus:0,    synergyBonus:0,    dropBonus:0    },
  { name:"Apprentice",   t1:50,   t2:0,   t3:0,  revBonus:4.00,    speedBonus:0.05, synergyBonus:0.25, dropBonus:0.10 }, // ×5 rev, +25% synergy, +10% drops
  { name:"Journeyman",   t1:200,  t2:25,  t3:0,  revBonus:19.00,   speedBonus:0.15, synergyBonus:0.75, dropBonus:0.25 }, // ×20 rev, +75% synergy, +25% drops
  { name:"Expert",       t1:600,  t2:80,  t3:0,  revBonus:99.00,   speedBonus:0.25, synergyBonus:2.00, dropBonus:0.50 }, // ×100 rev, +200% synergy, +50% drops
  { name:"Master",       t1:1500, t2:250, t3:3,  revBonus:499.00,  speedBonus:0.35, synergyBonus:5.00, dropBonus:1.00 }, // ×500 rev, +500% synergy, +100% drops
  { name:"Grandmaster",  t1:4000, t2:700, t3:10, revBonus:2499.00, speedBonus:0.45, synergyBonus:15.00, dropBonus:2.00 }, // ×2500 rev, +1500% synergy, +200% drops
];

// Badge colors for profession upgrade tiers. Shown on profession rows once upgraded.
// Index matches UPGRADE_TIERS index; tier 0 shows no badge.
const TIER_BADGE_STYLES = [
  null, // tier 0 — no badge
  { label:"Bronze",   color:"#e8a87c", bg:"linear-gradient(135deg,#cd7f32,#8b4513)", glow:"rgba(205,127,50,.5)"   },
  { label:"Silver",   color:"#e8e8e8", bg:"linear-gradient(135deg,#e0e0e0,#8a8a8a)", glow:"rgba(192,192,192,.5)"   },
  { label:"Gold",     color:"#fff4a0", bg:"linear-gradient(135deg,#ffd700,#b8860b)", glow:"rgba(255,215,0,.6)"     },
  { label:"Platinum", color:"#f5f5f5", bg:"linear-gradient(135deg,#e5e4e2,#a0a0a8)", glow:"rgba(229,228,226,.6)"   },
  { label:"Diamond",  color:"#e0f7ff", bg:"linear-gradient(135deg,#b9f2ff,#5ab8d8)", glow:"rgba(185,242,255,.7)"   },
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
  { id:6, a:{ name:"Dragon Riding",        color:"#4fc3f7", colorDark:"#2090c0", revMult:1,   speedMult:3,   passive:"Aerial Survey",        passiveDesc:"+25% all loot drop rates",                                           cost:{t3:2, cross:{ventureId:4, tier:"t2", qty:3}} },
         b:{ name:"Dragon Breeding",        color:"#8b0000", colorDark:"#5a0000", revMult:4,   speedMult:1,   passive:"Brood Mother",         passiveDesc:"Every 100 cycles, permanently +1% revenue to this profession",       cost:{t3:2, cross:{ventureId:6, tier:"t1", qty:50}} } },
  { id:7, a:{ name:"Realm Architecture",    color:"#f5f5dc", colorDark:"#b0b090", revMult:3,   speedMult:1,   passive:"Grand Architect",      passiveDesc:"Every 5th profession upgrade costs 50% less materials",              cost:{t3:2, cross:{ventureId:4, tier:"t2", qty:3}} },
         b:{ name:"Void Tunneling",         color:"#2a0845", colorDark:"#1a0030", revMult:1,   speedMult:2,   passive:"Dimensional Shortcut", passiveDesc:"All profession cycle times reduced 3% globally",                     cost:{t3:2, cross:{ventureId:9, tier:"t2", qty:3}} } },
  { id:8, a:{ name:"Demon Pact Brokering",  color:"#cc3300", colorDark:"#881a00", revMult:3,   speedMult:1,   passive:"Infernal Contract",    passiveDesc:"+15% revenue from ALL professions, but Demon cycle time doubled",    cost:{t3:2, cross:{ventureId:9, tier:"t2", qty:3}} },
         b:{ name:"Hellfire Conquest",      color:"#ffee00", colorDark:"#bbaa00", revMult:1,   speedMult:2,   passive:"Scorched Earth",       passiveDesc:"10% chance per cycle to grant 2x materials from all profs for 60s",  cost:{t3:2, cross:{ventureId:6, tier:"t2", qty:3}} } },
  { id:9, a:{ name:"Cosmic Ascension",     color:"#ffffff", colorDark:"#aaaaaa", revMult:5,   speedMult:1,   passive:"Transcendence",        passiveDesc:"+50% Soul Gems earned on prestige",                                 cost:{t3:3, crossAll:{tier:"t2", qty:2}} },
         b:{ name:"Eldritch Dominion",      color:"#2a1a4a", colorDark:"#1a0a30", revMult:1,   speedMult:3,   passive:"The Deep",             passiveDesc:"3x material drops during Abyss watch (11pm-4am)",                   cost:{t3:3, crossAll:{tier:"t3", qty:1}} } },
];

// ═══ TRANSFORM PASSIVE BONUSES ═══
// Aggregates static bonuses from all active transform passives.
// Per-cycle procs (Pyroclasm, Big Score, etc.) are handled in the game loop.
const getTransformPassives = (profTransforms) => {
  const p = {
    globalGoldMult: 0,     // Infernal Contract: +15% all revenue
    globalSpeedMult: 0,    // Dimensional Shortcut: +3%
    globalDropMult: 0,     // Aerial Survey: +25% all drop rates
    globalMatMult: 0,      // Crystalline Growth: +10%
    gemBonus: 0,           // Ancient Knowledge: +30%, Transcendence: +50%
    offlineGoldMult: 0,    // Fortification: +50%
    costReduction: 0,      // Weakening Toxin: -5%
    nightSpeedBonus: 0,    // Lunar Tide: +5% during Dusk/Abyss
    demonSpeedPenalty: false, // Infernal Contract: 2x Demon cycle
    abyssMatMult: 0,       // The Deep: +200% mats during Abyss watch
    graveRobber: false,    // Grave Robber: +25% Bone Shard from Skeleton
  };
  for (let i = 0; i < profTransforms.length; i++) {
    const path = profTransforms[i];
    if (!path) continue;
    const tf = TRANSFORM_TREES[i][path];
    switch (tf.passive) {
      case "Lunar Tide":          p.nightSpeedBonus += 0.05; break;
      case "Grave Robber":        p.graveRobber = true; break;
      case "Crystalline Growth":  p.globalMatMult += 0.10; break;
      case "Ancient Knowledge":   p.gemBonus += 0.30; break;
      case "Fortification":       p.offlineGoldMult += 0.50; break;
      case "Weakening Toxin":     p.costReduction += 0.05; break;
      case "Aerial Survey":       p.globalDropMult += 0.25; break;
      case "Dimensional Shortcut":p.globalSpeedMult += 0.03; break;
      case "Infernal Contract":   p.globalGoldMult += 0.15; p.demonSpeedPenalty = true; break;
      case "Transcendence":       p.gemBonus += 0.50; break;
      case "The Deep":            p.abyssMatMult += 2.0; break;
    }
  }
  return p;
};

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
  legendary: 0.000001,
};
const DROP_LEVEL_BONUS = 0.005; // +0.5% per skill level, multiplicative

// Fraction of an item's effect granted as a permanent buff when sacrificed.
// Scales by rarity so rare sacrifices feel impactful.
const CONSUME_FRACTIONS = { common: 0.20, uncommon: 0.25, rare: 0.30, epic: 0.40, legendary: 0.50 };

const LOOT_TABLE = [
  // ── Common ── (16 items)
  // Global
  { id:"rusty_coin_pouch",  name:"Rusty Coin Pouch",  rarity:"common", icon:"/assets/loot/rusty_coin_pouch.png", description:"+3% gold from all professions",           effects:[{ type:"goldMultiplier", target:"all", value:0.03 }]},
  { id:"copper_ring",       name:"Copper Ring",        rarity:"common", icon:"/assets/loot/copper_ring.png", description:"+2% gold from all professions",           effects:[{ type:"goldMultiplier", target:"all", value:0.02 }]},
  { id:"frayed_rope",       name:"Frayed Rope",        rarity:"common", icon:"/assets/loot/frayed_rope.png", description:"+3% speed for all professions",           effects:[{ type:"speedBoost",     target:"all", value:0.03 }]},
  { id:"cracked_gem",       name:"Cracked Gem",        rarity:"common", icon:"/assets/loot/cracked_gem.png", description:"+1% drop rates",                          effects:[{ type:"dropRateBoost",  target:"all", value:0.01 }]},
  { id:"minor_rune",        name:"Minor Rune",         rarity:"common", icon:"/assets/loot/minor_rune.png", description:"+2% drop rates",                          effects:[{ type:"dropRateBoost",  target:"all", value:0.02 }]},
  // Targeted
  { id:"worn_gloves",       name:"Worn Gloves",        rarity:"common", icon:"/assets/loot/worn_gloves.png", description:"+3% speed for all professions",           effects:[{ type:"speedBoost",     target:"all", value:0.03 }]},
  { id:"tattered_map",      name:"Tattered Map",       rarity:"common", icon:"/assets/loot/tattered_map.png", description:"+2% drop rates",                          effects:[{ type:"dropRateBoost",  target:"all", value:0.02 }]},
  { id:"spore_poultice",    name:"Spore Poultice",     rarity:"common", icon:"/assets/loot/spore_poultice.png", description:"+2% speed for all professions",           effects:[{ type:"speedBoost",     target:"all", value:0.02 }]},
  { id:"mushroom_cap",      name:"Mushroom Cap",       rarity:"common", icon:"/assets/loot/mushroom_cap.png", description:"+3% gold from all professions",           effects:[{ type:"goldMultiplier", target:"all", value:0.03 }]},
  { id:"dull_blade",        name:"Dull Blade",         rarity:"common", icon:"/assets/loot/dull_blade.png", description:"+4% gold from all professions",           effects:[{ type:"goldMultiplier", target:"all", value:0.04 }]},
  { id:"skeleton_key",      name:"Skeleton Key",       rarity:"common", icon:"/assets/loot/skeleton_key.png", description:"+2% drop rates",                          effects:[{ type:"dropRateBoost",  target:"all", value:0.02 }]},
  { id:"broken_lockpick",   name:"Broken Lockpick",    rarity:"common", icon:"/assets/loot/broken_lockpick.png", description:"+4% speed for all professions",           effects:[{ type:"speedBoost",     target:"all", value:0.04 }]},
  { id:"drake_whistle",     name:"Drake Whistle",      rarity:"common", icon:"/assets/loot/drake_whistle.png", description:"+4% gold from all professions",           effects:[{ type:"goldMultiplier", target:"all", value:0.04 }]},
  { id:"blueprint_scrap",   name:"Blueprint Scrap",    rarity:"common", icon:"/assets/loot/blueprint_scrap.png", description:"+3% speed for all professions",           effects:[{ type:"speedBoost",     target:"all", value:0.03 }]},
  { id:"hellfire_ember",    name:"Hellfire Ember",      rarity:"common", icon:"/assets/loot/hellfire_ember.png", description:"+3% gold from all professions",           effects:[{ type:"goldMultiplier", target:"all", value:0.03 }]},
  { id:"star_map",          name:"Star Map",            rarity:"common", icon:"/assets/loot/star_map.png", description:"+3% drop rates",                          effects:[{ type:"dropRateBoost",  target:"all", value:0.03 }]},

  // ── Uncommon ── (12 items)
  // Global
  { id:"goblin_lucky_charm", name:"Goblin's Lucky Charm", rarity:"uncommon", icon:"/assets/loot/goblin_lucky_charm.png", description:"+8% gold from all professions",        effects:[{ type:"goldMultiplier", target:"all", value:0.08 }]},
  { id:"silver_compass",     name:"Silver Compass",       rarity:"uncommon", icon:"/assets/loot/silver_compass.png", description:"+6% speed for all professions",        effects:[{ type:"speedBoost",     target:"all", value:0.06 }]},
  { id:"whispering_skull",   name:"Whispering Skull",     rarity:"uncommon", icon:"/assets/loot/whispering_skull.png", description:"Skill levels count +15% for drops",    effects:[{ type:"xpBoost",        target:"all", value:0.15 }]},
  { id:"enchanted_satchel",  name:"Enchanted Satchel",    rarity:"uncommon", icon:"/assets/loot/enchanted_satchel.png", description:"+5% drop rates",                       effects:[{ type:"dropRateBoost",  target:"all", value:0.05 }]},
  // Targeted
  { id:"shadow_dagger",      name:"Shadow Dagger",        rarity:"uncommon", icon:"/assets/loot/shadow_dagger.png", description:"+15% Goblin Pickpocketing gold",       effects:[{ type:"goldMultiplier", target:1,     value:0.15 }]},
  { id:"torch_oil",          name:"Torch Oil Flask",      rarity:"uncommon", icon:"/assets/loot/torch_oil.png", description:"-10% Torch Scavenging cooldown",       effects:[{ type:"speedBoost",     target:0,     value:0.10 }]},
  { id:"alchemists_flask",   name:"Alchemist's Flask",    rarity:"uncommon", icon:"/assets/loot/alchemists_flask.png", description:"+12% Potion Brewing gold",             effects:[{ type:"goldMultiplier", target:5,     value:0.12 }]},
  { id:"bubbling_retort",    name:"Bubbling Retort",      rarity:"uncommon", icon:"/assets/loot/bubbling_retort.png", description:"+8% speed for Potion Brewing",         effects:[{ type:"speedBoost",     target:5,     value:0.08 }]},
  { id:"wyvern_fang",        name:"Wyvern Fang",          rarity:"uncommon", icon:"/assets/loot/wyvern_fang.png", description:"+12% Dragon Taming gold",              effects:[{ type:"goldMultiplier", target:6,     value:0.12 }]},
  { id:"mystic_lens",        name:"Mystic Lens",          rarity:"uncommon", icon:"/assets/loot/mystic_lens.png", description:"+10% Dungeon Expansion gold",          effects:[{ type:"goldMultiplier", target:7,     value:0.10 }]},
  { id:"ember_stone",        name:"Ember Stone",          rarity:"uncommon", icon:"/assets/loot/ember_stone.png", description:"+10% Demon Gate Siege gold",           effects:[{ type:"goldMultiplier", target:8,     value:0.10 }]},
  { id:"eldritch_sigil",     name:"Eldritch Sigil",       rarity:"uncommon", icon:"/assets/loot/eldritch_sigil.png", description:"+10% Elder God Pact gold",             effects:[{ type:"goldMultiplier", target:9,     value:0.10 }]},

  // ── Rare ── (6 items)
  { id:"shadow_step_boots",  name:"Shadow Step Boots",    rarity:"rare", icon:"/assets/loot/shadow_step_boots.png", description:"3% chance for a bonus cycle on completion",    effects:[{ type:"instantComplete", target:"all", value:0.03 }]},
  { id:"alchemist_stone",    name:"Alchemist Stone",      rarity:"rare", icon:"/assets/loot/alchemist_stone.png", description:"2x Potion Brewing gold",                      effects:[{ type:"goldMultiplier",  target:5,     value:1.00 }]},
  { id:"bone_whistle",       name:"Bone Whistle",         rarity:"rare", icon:"/assets/loot/bone_whistle.png", description:"Skeleton levels count double for drops",       effects:[{ type:"xpBoost",         target:3,     value:1.00 }]},
  { id:"dragon_scale_shield",name:"Dragon Scale Shield",  rarity:"rare", icon:"/assets/loot/dragon_scale_shield.png", description:"+20% Dragon Taming gold, +10% speed",         effects:[{ type:"goldMultiplier", target:6, value:0.20 }, { type:"speedBoost", target:6, value:0.10 }]},
  { id:"void_shard",         name:"Void Shard",           rarity:"rare", icon:"/assets/loot/void_shard.png", description:"+15% all drop rates",                         effects:[{ type:"dropRateBoost",   target:"all", value:0.15 }]},
  { id:"runic_hammer",       name:"Runic Hammer",         rarity:"rare", icon:"/assets/loot/runic_hammer.png", description:"+25% Trap Disarming gold",                    effects:[{ type:"goldMultiplier",  target:4,     value:0.25 }]},

  // ── Epic ── (4 items)
  { id:"chain_lightning",    name:"Chain Lightning Scroll", rarity:"epic", icon:"/assets/loot/chain_lightning.png", description:"6% chance to auto-trigger adjacent profession", effects:[{ type:"chainRun",        target:"all", value:0.06 }]},
  { id:"phoenix_feather",    name:"Phoenix Feather",        rarity:"epic", icon:"/assets/loot/phoenix_feather.png", description:"5% chance for a bonus cycle + 2x gold on that cycle",effects:[{ type:"instantComplete", target:"all", value:0.05 }, { type:"goldMultiplier", target:"all", value:0.15 }]},
  { id:"greater_void_shard", name:"Greater Void Shard",     rarity:"epic", icon:"/assets/loot/greater_void_shard.png", description:"+30% all drop rates, +20% all speed",           effects:[{ type:"dropRateBoost",   target:"all", value:0.30 }, { type:"speedBoost", target:"all", value:0.20 }]},
  { id:"warlords_signet",    name:"Warlord's Signet",       rarity:"epic", icon:"/assets/loot/warlords_signet.png", description:"+20% gold all, +10% speed all",                effects:[{ type:"goldMultiplier", target:"all", value:0.20 }, { type:"speedBoost", target:"all", value:0.10 }]},

  // ── Legendary ── (3 items)
  { id:"crown_dungeon_lord",  name:"Crown of the Dungeon Lord",  rarity:"legendary", icon:"/assets/loot/crown_dungeon_lord.png", description:"+30% all gold, +20% all speed",          effects:[{ type:"goldMultiplier", target:"all", value:0.30 }, { type:"speedBoost", target:"all", value:0.20 }]},
  { id:"elder_gods_eye",      name:"Elder God's Eye",            rarity:"legendary", icon:"/assets/loot/elder_gods_eye.png", description:"All drop rates doubled",                  effects:[{ type:"dropRateBoost",  target:"all", value:1.00 }]},
  { id:"blade_forgotten_king",name:"Blade of the Forgotten King",rarity:"legendary", icon:"/assets/loot/blade_forgotten_king.png", description:"0.5% chance for 50x gold on completion", effects:[{ type:"critGold",       target:"all", value:0.005}]},
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

// Per-slot unlock rules. Slots 0-3 are base, 4-7 come from progression,
// 8-11 are MTX/skill-bonus slots and must be purchased/earned explicitly.
const isSlotUnlocked = (i, tGems, pUpgrades, mSlots, skillSlots = 0) => {
  if (i < 4) return true;
  if (i === 4) return tGems >= 5;
  if (i === 5) return pUpgrades.some(t => t >= 2);
  if (i === 6) return tGems >= 25;
  if (i === 7) return pUpgrades.filter(t => t >= 3).length >= 3;
  if (i >= 8 && i <= 11) return (i - 8) < (mSlots + skillSlots);
  return false;
};

const getUnlockedSlotCount = (tGems, pUpgrades, mSlots, skillSlots = 0) => {
  let count = 0;
  for (let i = 0; i < 12; i++) {
    if (isSlotUnlocked(i, tGems, pUpgrades, mSlots, skillSlots)) count++;
  }
  return count;
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
 * Sum the synergy bonuses from every profession BELOW `targetIndex` in the
 * venture ladder. Each lower profession's tier upgrade contributes its
 * synergyBonus value; tier 0 contributes nothing. Result is a raw additive
 * bonus — callers add 1 to turn it into a multiplier.
 */
const getIncomingSynergy = (profUpgrades, targetIndex) => {
  let total = 0;
  for (let j = 0; j < targetIndex; j++) {
    const tier = profUpgrades[j] || 0;
    total += UPGRADE_TIERS[tier].synergyBonus;
  }
  return total;
};

/**
 * Revenue per cycle for a venture at given count and prestige multiplier.
 * `synergyMult` is the pre-computed (1 + incoming synergy) multiplier.
 */
const getRevenue = (venture, count, prestigeMultiplier, upgradeTier = 0, transformPath = null, lootGoldMult = 1, synergyMult = 1) => {
  const upgradeBonus = 1 + UPGRADE_TIERS[upgradeTier].revBonus;
  const transformBonus = transformPath ? TRANSFORM_TREES[venture.id][transformPath].revMult : 1;
  return venture.baseRevenue * count * getMilestoneMultiplier(count) * prestigeMultiplier * upgradeBonus * transformBonus * lootGoldMult * synergyMult;
};

const getEffectiveCycleTime = (venture, upgradeTier = 0, transformPath = null, lootSpeedMult = 1) => {
  const speedReduction = UPGRADE_TIERS[upgradeTier].speedBonus;
  const transformSpeed = transformPath ? TRANSFORM_TREES[venture.id][transformPath].speedMult : 1;
  return Math.max(100, venture.baseTime * (1 - speedReduction) / transformSpeed / lootSpeedMult);
};

/**
 * Maximum units buyable with current gold.
 * Closed-form: max = floor(log_r[g(r-1)/(b·r^k) + 1])
 * +1 check compensates for Math.floor in getUnitCost
 */
const getMaxBuyable = (baseCost, owned, gold) => {
  const r = COST_EXPONENT;
  const bRk = baseCost * Math.pow(r, owned);
  let n = Math.floor(Math.log(gold * (r - 1) / bRk + 1) / Math.log(r));
  if (n < 0) return 0;
  // Floor rounding in getUnitCost can allow one more — check
  if (getBulkCost(baseCost, owned, n + 1) <= gold) n++;
  return n;
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
const isItemRelevant = (item, unlockedSet) =>
  item.effects.some(e => e.target === "all" || unlockedSet.has(e.target));

const rollLootDrop = (ventureIndex, skillLevel, dropRateMult = 1, xpMult = 1, unlockedSet = null) => {
  const levelBonus = 1 + (skillLevel * xpMult) * DROP_LEVEL_BONUS;
  const tiers = ["legendary", "epic", "rare", "uncommon", "common"];
  for (const tier of tiers) {
    if (Math.random() < DROP_RATES[tier] * levelBonus * dropRateMult) {
      const tierItems = LOOT_TABLE.filter(item =>
        item.rarity === tier && (!unlockedSet || isItemRelevant(item, unlockedSet))
      );
      if (tierItems.length === 0) continue; // no relevant items this tier, try next
      return tierItems[Math.floor(Math.random() * tierItems.length)];
    }
  }
  return null;
};

const getRarityStyle = (rarity) => RARITY_TIERS[rarity] || RARITY_TIERS.common;

/** Aggregate all loot bonuses from inventory for a given venture. */
const getLootBonuses = (equippedArr, ventureIndex) => {
  let goldMult = 0, speedBonus = 0, dropRateBonus = 0, xpBonus = 0;
  let critChance = 0, instantChance = 0, chainChance = 0;
  for (let s = 0; s < equippedArr.length; s++) {
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

/** Aggregate all permanent buffs from sacrificed items. Same shape as getLootBonuses. */
const getConsumedBonuses = (consumed) => {
  if (!consumed) return { goldMult:1, speedMult:1, dropRateMult:1, xpMult:1, critChance:0, instantChance:0, chainChance:0 };
  return {
    goldMult:     1 + (consumed.goldMultiplier  || 0),
    speedMult:    1 + (consumed.speedBoost      || 0),
    dropRateMult: 1 + (consumed.dropRateBoost   || 0),
    xpMult:       1 + (consumed.xpBoost         || 0),
    critChance:        consumed.critGold         || 0,
    instantChance:     consumed.instantComplete  || 0,
    chainChance:       consumed.chainRun         || 0,
  };
};


// ═══ MAIN GAME ═══
/* ═══════════════════════════════════════════════════════════════
   Castle Clicker — Main Game Component
   An idle/incremental dungeon game inspired by Adventure Capitalist.
   
   Web prototype (React). Architecture designed to port cleanly to
   React Native + Expo for iOS/Android release.
   ═══════════════════════════════════════════════════════════════ */


// ── Tutorial Steps ──
const TUTORIAL_STEPS = [
  {
    title: "Welcome, Adventurer",
    text: "Welcome to Castle Clicker! Build your dungeon empire by running professions, recruiting companions, and collecting loot.",
    icon: "\u2694",
  },
  {
    title: "Professions",
    text: "Tap a profession to start a cycle. When the progress bar fills, you earn gold. Buy more to increase revenue and unlock new tiers.",
    icon: "\u2692",
  },
  {
    title: "Companions",
    text: "Recruit companions in the Allies tab to auto-run professions for you. They keep earning gold even while you're away.",
    icon: "\uD83D\uDEE1",
  },
  {
    title: "Equipment & Loot",
    text: "Completing professions has a chance to drop loot. Equip items in the Loot tab to boost your gold income, speed, and drop rates.",
    icon: "\uD83C\uDF81",
  },
  {
    title: "Forging",
    text: "Collect 10 of the same item and forge them into a random item of the next rarity tier. Common \u2192 Uncommon \u2192 Rare \u2192 Epic \u2192 Legendary.",
    icon: "\u2728",
  },
  {
    title: "Sacrifice",
    text: "Destroy a loot item to gain a permanent buff that survives ascension. Rarer items grant a larger fraction of their effect. Equip, forge, or sacrifice \u2014 choose wisely.",
    icon: "\uD83D\uDD25",
  },
  {
    title: "Upgrades & Mastery",
    text: "In the Upgrades tab, spend specialty materials to advance your professions through mastery tiers \u2014 each tier unlocks powerful bonuses.",
    icon: "\u2B06",
  },
  {
    title: "Ascending",
    text: "When you've earned enough gold, ascend to reset your progress in exchange for Soul Gems. Gems give permanent multipliers to all earnings.",
    icon: "\u2726",
  },
  {
    title: "Dungeon Clock",
    text: "The dungeon runs on a day/night cycle. Each profession gets bonus gold and material drops during its preferred time window.",
    icon: "\u231A",
  },
  {
    title: "Ready to Begin",
    text: "Start by tapping Torch Scavenging to earn your first gold. Then buy more torches and work toward unlocking the next profession. Good luck!",
    icon: "\uD83D\uDD25",
  },
];

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
  const [showAchievements, setShowAchievements] = useState(false);
  const [firstApprenticeSeen, setFirstApprenticeSeen] = useState(false);
  const [showFirstApprenticeModal, setShowFirstApprenticeModal] = useState(null);
  const [firstForgeSeen, setFirstForgeSeen] = useState(false);
  const [showFirstForgeModal, setShowFirstForgeModal] = useState(null);
  const [firstAscendSeen, setFirstAscendSeen] = useState(false);
  const [showFirstAscendModal, setShowFirstAscendModal] = useState(false);
  const [firstEquipSeen, setFirstEquipSeen] = useState(false);
  const [showFirstEquipModal, setShowFirstEquipModal] = useState(null);
  const [firstAllySeen, setFirstAllySeen] = useState(false);
  const [showFirstAllyModal, setShowFirstAllyModal] = useState(null);
  const [firstSacrificeSeen, setFirstSacrificeSeen] = useState(false);
  const [showFirstSacrificeModal, setShowFirstSacrificeModal] = useState(null);
  const [consumedBuffs, setConsumedBuffs] = useState({});
  const [equipPickerSlot, setEquipPickerSlot] = useState(null);
  const [offlineEarnings, setOfflineEarnings] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [loading, setLoading] = useState(true);
  // Skill tree, achievements, events
  const [unlockedSkills, setUnlockedSkills] = useState({});
  const [achievements, setAchievements] = useState({});
  const [totalAscensions, setTotalAscensions] = useState(0);
  const [manualClicks, setManualClicks] = useState(0);
  const [eventsActivated, setEventsActivated] = useState(0);
  const [achievementToast, setAchievementToast] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [prestSub, setPrestSub] = useState('ascend');
  const [milestoneToast, setMilestoneToast] = useState(null);
  const [brightness, setBrightness] = useState(() => parseFloat(localStorage.getItem('cc-brightness') || '1'));

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
  const unlockedSkillsRef = useRef(unlockedSkills);
  const activeEventRef = useRef(activeEvent);
  const firstForgeSeenRef = useRef(firstForgeSeen);
  const consumedBuffsRef = useRef(consumedBuffs);
  const eventTimerRef = useRef(null);
  const pendingDropsRef = useRef([]);
  const pendingMatsRef = useRef([]);
  const particleContainerRef = useRef(null);
  const hdRef = useRef(null);
  const pendingCompletionsRef = useRef([]);
  // Transform passive tracking refs (session-level, reset on reload/prestige)
  const pyroCyclesRef = useRef(0);        // Pyroclasm: cycles since last trigger
  const broodCyclesRef = useRef(0);       // Brood Mother: cycles since last +1%
  const broodBonusRef = useRef(0);        // Brood Mother: accumulated permanent bonus
  const goldenDraughtLastRef = useRef(0); // Golden Draught: timestamp of last trigger
  const scorchedUntilRef = useRef(0);     // Scorched Earth: timestamp buff expires
  const lastParticleTimeRef = useRef(new Array(VENTURES.length).fill(0));
  // Toasts (achievements/loot) queued while an event is on-screen so they don't steal focus.
  const pendingToastsRef = useRef({ ach: [], loot: [] });

  goldRef.current = gold;
  venturesRef.current = ventures;
  gemsRef.current = prestigeGems;
  inventoryRef.current = inventory;
  hasFoundRareRef.current = hasFoundRare;
  materialsRef.current = materials;
  profUpgradesRef.current = profUpgrades;
  profTransformsRef.current = profTransforms;
  equippedRef.current = equipped;
  unlockedSkillsRef.current = unlockedSkills;
  activeEventRef.current = activeEvent;
  firstForgeSeenRef.current = firstForgeSeen;
  consumedBuffsRef.current = consumedBuffs;

  // Derived skill tree values
  const skillBonuses = getSkillBonuses(unlockedSkills);
  const gemsSpent = getGemsSpent(unlockedSkills);
  const gemsAvailable = prestigeGems - gemsSpent;
  const achievementCount = Object.keys(achievements).length;
  const prestigeMultiplier = 1 + (totalGems * GEM_GOLD_BONUS) + skillBonuses.goldMult + achievementCount * ACHIEVEMENT_BONUS;

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

  // Measure header height → CSS var so the event banner can stick just below it.
  useLayoutEffect(() => {
    const el = hdRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty('--hd-h', `${el.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let hasSave = false;
    try {
      const raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem("castle_clicker_v8") || localStorage.getItem("castle_clicker_v7") || localStorage.getItem("castle_clicker_v6") || localStorage.getItem("castle_clicker_v5");
      if (raw) {
        hasSave = true;
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
        if (save.unlockedSkills) setUnlockedSkills(save.unlockedSkills);
        if (save.achievements) setAchievements(save.achievements);
        if (save.totalAscensions != null) setTotalAscensions(save.totalAscensions);
        if (save.manualClicks != null) setManualClicks(save.manualClicks);
        if (save.eventsActivated != null) setEventsActivated(save.eventsActivated);
        if (save.firstApprenticeSeen) setFirstApprenticeSeen(true);
        if (save.firstForgeSeen) setFirstForgeSeen(true);
        if (save.firstAscendSeen) setFirstAscendSeen(true);
        if (save.firstEquipSeen) setFirstEquipSeen(true);
        if (save.firstAllySeen) setFirstAllySeen(true);
        if (save.firstSacrificeSeen) setFirstSacrificeSeen(true);
        if (save.consumedBuffs) setConsumedBuffs(save.consumedBuffs);
        if (save.tutorialDone) hasSave = true;

        // Offline earnings
        if (save.lastSave && save.ventures) {
          const elapsed = Math.min(Date.now() - save.lastSave, OFFLINE_CAP);
          if (elapsed > 5000) {
            let offlineGold = 0;
            const savedSkills = save.unlockedSkills || {};
            const savedSkillB = getSkillBonuses(savedSkills);
            const savedAchCount = Object.keys(save.achievements || {}).length;
            const savedTotalGems = save.totalGems || 0;
            const pm = 1 + (savedTotalGems * GEM_GOLD_BONUS) + savedSkillB.goldMult + savedAchCount * ACHIEVEMENT_BONUS;
            const offEff = OFFLINE_EFFICIENCY + savedSkillB.offlineEff;
            const savedUpg = save.profUpgrades || Array(10).fill(0);
            const savedTrans = save.profTransforms || Array(10).fill(null);
            const savedEquipped = save.equipped || Array(12).fill(null);
            const savedConsumed = getConsumedBonuses(save.consumedBuffs);
            const savedWatch = getCurrentWatch();
            save.ventures.forEach((vs, i) => {
              if (vs.hasCompanion && vs.owned > 0) {
                const loot = getLootBonuses(savedEquipped, i);
                const comboGold = loot.goldMult + (savedConsumed.goldMult - 1);
                const comboSpeed = loot.speedMult + (savedConsumed.speedMult - 1);
                const synergyMult = 1 + getIncomingSynergy(savedUpg, i);
                const rev = getRevenue(VENTURES[i], vs.owned, pm, savedUpg[i] || 0, savedTrans[i] || null, comboGold, synergyMult);
                const ct = getEffectiveCycleTime(VENTURES[i], savedUpg[i] || 0, savedTrans[i] || null, comboSpeed * (1 + savedSkillB.speedMult));
                const cycles = Math.floor(elapsed / ct);
                const inWatch = isProfInWatch(i, savedWatch);
                offlineGold += rev * cycles * (inWatch ? 1.25 : 1) * offEff;
              }
            });
            if (offlineGold > 0) {
              setGold(g => g + offlineGold);
              setLifetimeGold(l => l + offlineGold);
              setOfflineEarnings(offlineGold);
            }
          }
        }
      }
    } catch (e) { /* corrupted save, start fresh */ }

    if (!hasSave) setShowTutorial(true);
    setTimeout(() => setLoading(false), 1800);
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
          unlockedSkills: unlockedSkillsRef.current,
          achievements,
          totalAscensions,
          manualClicks,
          eventsActivated,
          firstApprenticeSeen,
          firstForgeSeen,
          firstAscendSeen,
          firstEquipSeen,
          firstAllySeen,
          firstSacrificeSeen,
          consumedBuffs,
          lastSave: Date.now(),
        }));
      } catch (e) {}
    }, 5000);
    return () => clearInterval(interval);
  }, [totalGems, lifetimeGold, mtxSlots]);

  // Save immediately on page close
  useEffect(() => {
    const saveNow = () => {
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
          unlockedSkills: unlockedSkillsRef.current,
          achievements,
          totalAscensions,
          manualClicks,
          eventsActivated,
          firstApprenticeSeen,
          firstForgeSeen,
          firstAscendSeen,
          firstEquipSeen,
          firstAllySeen,
          firstSacrificeSeen,
          consumedBuffs,
          lastSave: Date.now(),
        }));
      } catch (e) {}
    };
    window.addEventListener('beforeunload', saveNow);
    return () => window.removeEventListener('beforeunload', saveNow);
  }, [totalGems, lifetimeGold, mtxSlots]);

  // ═══ ACHIEVEMENT CHECKER ═══
  useEffect(() => {
    const state = { gold, lifetimeGold, ventures, inventory, hasFoundRare, totalGems, totalAscensions, profUpgrades, profTransforms, materials, unlockedSkills, mtxSlots, manualClicks, eventsActivated, consumedBuffs };
    let newUnlocks = null;
    for (const ach of ACHIEVEMENTS) {
      if (achievements[ach.id]) continue;
      if (ach.check(state)) {
        if (!newUnlocks) newUnlocks = { ...achievements };
        newUnlocks[ach.id] = true;
        if (activeEventRef.current) {
          pendingToastsRef.current.ach.push({ id: ach.id, name: ach.name, desc: ach.desc });
        } else {
          setAchievementToast({ id: ach.id, name: ach.name, desc: ach.desc, fadeOut: false });
        }
      }
    }
    if (newUnlocks) setAchievements(newUnlocks);
  }, [gold, lifetimeGold, ventures, inventory, hasFoundRare, totalGems, totalAscensions, profUpgrades, profTransforms, materials, unlockedSkills, mtxSlots, manualClicks, eventsActivated, consumedBuffs]);

  useEffect(() => {
    if (!achievementToast) return;
    const t1 = setTimeout(() => setAchievementToast(p => p ? { ...p, fadeOut: true } : null), 3000);
    const t2 = setTimeout(() => setAchievementToast(null), 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [achievementToast?.name]);

  // When an event ends, flush any toasts queued during it one at a time.
  useEffect(() => {
    if (activeEvent) return;
    const pending = pendingToastsRef.current;
    if (pending.ach.length === 0 && pending.loot.length === 0) return;
    pendingToastsRef.current = { ach: [], loot: [] };
    const timers = [];
    let delay = 400; // small breathing room after the event clears
    pending.ach.forEach(a => {
      timers.push(setTimeout(() => setAchievementToast({ ...a, fadeOut: false }), delay));
      delay += 4000;
    });
    pending.loot.forEach(item => {
      timers.push(setTimeout(() => setLootToast({ item, fadeOut: false }), delay));
      delay += 4000;
    });
    return () => { timers.forEach(clearTimeout); };
  }, [activeEvent]);

  // ═══ DUNGEON EVENTS ═══
  useEffect(() => {
    if (activeEvent) return;
    const delay = EVENT_SPAWN_MIN + Math.random() * (EVENT_SPAWN_MAX - EVENT_SPAWN_MIN);
    eventTimerRef.current = setTimeout(() => {
      const evt = DUNGEON_EVENTS[Math.floor(Math.random() * DUNGEON_EVENTS.length)];
      setActiveEvent({ ...evt, state: 'pending', timeLeft: EVENT_EXPIRE_TIME, spawnedAt: Date.now() });
    }, delay);
    return () => clearTimeout(eventTimerRef.current);
  }, [activeEvent]);

  useEffect(() => {
    if (!activeEvent) return;
    if (activeEvent.state === 'pending') {
      const interval = setInterval(() => {
        setActiveEvent(prev => {
          if (!prev || prev.state !== 'pending') return prev;
          const elapsed = Date.now() - prev.spawnedAt;
          if (elapsed >= EVENT_EXPIRE_TIME) return null;
          return { ...prev, timeLeft: EVENT_EXPIRE_TIME - elapsed };
        });
      }, 100);
      return () => clearInterval(interval);
    }
    if (activeEvent.state === 'active') {
      const interval = setInterval(() => {
        setActiveEvent(prev => {
          if (!prev || prev.state !== 'active') return prev;
          const elapsed = Date.now() - prev.activatedAt;
          if (elapsed >= prev.duration) return null;
          return { ...prev, timeLeft: prev.duration - elapsed };
        });
      }, 100);
      return () => clearInterval(interval);
    }
    if (activeEvent.state === 'boss') {
      const timeout = setTimeout(() => {
        const clicks = activeEventRef.current?.bossClicks || 0;
        const vs = venturesRef.current;
        let totalRev = 0;
        vs.forEach((v, i) => {
          if (v.owned > 0) {
            const synergyMult = 1 + getIncomingSynergy(profUpgradesRef.current, i);
            totalRev += getRevenue(VENTURES[i], v.owned, prestigeMultiplier, profUpgradesRef.current[i] || 0, profTransformsRef.current[i] || null, 1, synergyMult);
          }
        });
        const reward = Math.min(clicks, 60) * Math.max(totalRev, 1) * 0.1;
        setGold(g => g + reward);
        setLifetimeGold(l => l + reward);
        setActiveEvent(null);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [activeEvent?.state, activeEvent?.id]);

  const handleActivateEvent = () => {
    if (!activeEvent || activeEvent.state !== 'pending') return;
    setEventsActivated(prev => prev + 1);
    if (activeEvent.effect.bossRaid) {
      setActiveEvent(prev => ({ ...prev, state: 'boss', bossClicks: 0, activatedAt: Date.now(), timeLeft: 10000 }));
    } else {
      setActiveEvent(prev => ({ ...prev, state: 'active', activatedAt: Date.now(), timeLeft: prev.duration }));
    }
  };

  const handleBossClick = () => {
    if (!activeEvent || activeEvent.state !== 'boss') return;
    setActiveEvent(prev => prev ? { ...prev, bossClicks: (prev.bossClicks || 0) + 1 } : null);
  };

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
      const sk = getSkillBonuses(unlockedSkillsRef.current);
      const evt = activeEventRef.current;
      const evtGold = (evt?.state === 'active' && evt.effect.goldMult) ? evt.effect.goldMult : 1;
      const evtDrop = (evt?.state === 'active' && evt.effect.dropMult) ? evt.effect.dropMult : 1;
      const evtSpeed = (evt?.state === 'active' && evt.effect.speedMult) ? evt.effect.speedMult : 1;
      const evtMat = (evt?.state === 'active' && evt.effect.matMult) ? evt.effect.matMult : 1;
      const unlockedSet = new Set();
      for (let u = 0; u < prev.length; u++) if (prev[u].owned > 0) unlockedSet.add(u);
      const con = getConsumedBonuses(consumedBuffsRef.current);
      const tp = getTransformPassives(profTransformsRef.current);
      const isNight = currentWatch === 2 || currentWatch === 3; // Dusk or Abyss
      const isAbyss = currentWatch === 3;
      const scorchedActive = Date.now() < scorchedUntilRef.current;
      // Mana Siphon: pre-compute highest base revenue across all running professions
      let manaSiphonBaseRev = 0;
      if (profTransformsRef.current[4] === 'b') {
        for (let j = 0; j < prev.length; j++) {
          if (prev[j].owned > 0) {
            const sM = 1 + getIncomingSynergy(profUpgradesRef.current, j);
            const r = getRevenue(VENTURES[j], prev[j].owned, prestigeMultiplier, profUpgradesRef.current[j] || 0, profTransformsRef.current[j] || null, 1, sM);
            if (r > manaSiphonBaseRev) manaSiphonBaseRev = r;
          }
        }
      }
      const chainTriggers = [];
      const freeOwnedGains = []; // Raise Dead: [{ventureIdx, count}]
      const next = prev.map((vs, i) => {
        if (vs.owned === 0 || (!vs.running && !vs.hasCompanion)) return vs;

        const upgTier = profUpgradesRef.current[i] || 0;
        const tPath = profTransformsRef.current[i] || null;
        const loot = getLootBonuses(eq, i);
        const tierDropMult = 1 + UPGRADE_TIERS[upgTier].dropBonus;
        // Combine equipped + consumed + transform passive bonuses
        const comboGold = loot.goldMult + (con.goldMult - 1) + tp.globalGoldMult;
        const comboSpeed = loot.speedMult + (con.speedMult - 1) + tp.globalSpeedMult
          + (isNight ? tp.nightSpeedBonus : 0);
        const comboDrop = loot.dropRateMult + (con.dropRateMult - 1) + tp.globalDropMult;
        const comboXp = loot.xpMult + (con.xpMult - 1);
        const comboCrit = loot.critChance + con.critChance;
        const comboInstant = loot.instantChance + con.instantChance;
        const comboChain = loot.chainChance + con.chainChance;
        // Infernal Contract: Demon (idx 8) cycle time doubled
        const demonPenalty = (tp.demonSpeedPenalty && i === 8) ? 0.5 : 1;
        const totalSpeedMult = comboSpeed * (1 + sk.speedMult) * evtSpeed * demonPenalty;
        const totalDropMult = comboDrop * (1 + sk.dropRate) * evtDrop * tierDropMult;
        const totalMatMult = (1 + sk.matDrop) * evtMat * (1 + tp.globalMatMult)
          * (isAbyss ? (1 + tp.abyssMatMult) : 1)
          * (scorchedActive ? 2 : 1);
        const cycleTime = getEffectiveCycleTime(VENTURES[i], upgTier, tPath, totalSpeedMult);
        let newProgress = vs.progress + dt;
        const inWatch = isProfInWatch(i, currentWatch);

        if (newProgress >= cycleTime) {
          const cycles = Math.floor(newProgress / cycleTime);
          const synergyMult = 1 + getIncomingSynergy(profUpgradesRef.current, i);
          // Brood Mother: accumulated permanent revenue bonus for Dragon
          const broodMult = (i === 6 && profTransformsRef.current[6] === 'b') ? (1 + broodBonusRef.current) : 1;
          const baseRev = getRevenue(VENTURES[i], vs.owned, prestigeMultiplier, upgTier, tPath, comboGold * broodMult, synergyMult);
          let rev = baseRev * cycles * (inWatch ? 1.25 : 1) * evtGold;

          // ── Transform passive procs ──
          const myTransform = profTransformsRef.current[i];
          const myPassive = myTransform ? TRANSFORM_TREES[i][myTransform].passive : null;

          // Big Score (Goblin B): 1% chance per cycle for 50x gold
          if (myPassive === "Big Score") {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < 0.01) rev += baseRev * 49 * (inWatch ? 1.25 : 1) * evtGold;
            }
          }

          // Mana Siphon (Trap B): each cycle steals 5% of highest-revenue profession
          if (myPassive === "Mana Siphon") {
            rev += manaSiphonBaseRev * 0.05 * cycles * (inWatch ? 1.25 : 1) * evtGold;
          }

          // Golden Draught (Potion A): once per hour, 10x gold on next cycle
          if (myPassive === "Golden Draught") {
            const now = Date.now();
            if (now - goldenDraughtLastRef.current >= 3600000) {
              goldenDraughtLastRef.current = now;
              rev += baseRev * 9 * (inWatch ? 1.25 : 1) * evtGold; // 10x = base + 9x bonus
            }
          }

          // Pyroclasm (Torch A): every 10th cycle → start 2 random professions
          if (myPassive === "Pyroclasm") {
            pyroCyclesRef.current += cycles;
            const triggers = Math.floor(pyroCyclesRef.current / 10);
            pyroCyclesRef.current %= 10;
            for (let t = 0; t < triggers; t++) {
              chainTriggers.push(Math.floor(Math.random() * 10));
              chainTriggers.push(Math.floor(Math.random() * 10));
            }
          }

          // Contagion (Mushroom A): 15% chance per cycle to auto-start idle profession
          if (myPassive === "Contagion") {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < 0.15) chainTriggers.push(Math.floor(Math.random() * 10));
            }
          }

          // Raise Dead (Skeleton A): 5% chance per cycle for +1 free owned level
          if (myPassive === "Raise Dead") {
            let gained = 0;
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < 0.05) gained++;
            }
            if (gained > 0) freeOwnedGains.push({ idx: i, count: gained });
          }

          // Brood Mother (Dragon B): every 100 cycles → +1% permanent revenue
          if (myPassive === "Brood Mother") {
            broodCyclesRef.current += cycles;
            const procs = Math.floor(broodCyclesRef.current / 100);
            broodCyclesRef.current %= 100;
            if (procs > 0) broodBonusRef.current += procs * 0.01;
          }

          // Scorched Earth (Demon B): 10% chance per cycle for 2x materials for 60s
          if (myPassive === "Scorched Earth") {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < 0.10) {
                scorchedUntilRef.current = Math.max(scorchedUntilRef.current, Date.now() + 60000);
              }
            }
          }

          // Grave Robber (Goblin A): +25% Bone Shard (t1) drops from Skeleton (handled in mat drop below)

          // Crit gold — per cycle, chance for 50x on that cycle
          if (comboCrit > 0) {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < comboCrit) rev += baseRev * 49 * (inWatch ? 1.25 : 1) * evtGold;
            }
          }

          // Instant complete — bonus cycle of revenue + drops
          if (comboInstant > 0) {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < comboInstant) {
                rev += baseRev * (inWatch ? 1.25 : 1) * evtGold;
                const drop = rollLootDrop(i, vs.owned, totalDropMult, comboXp, unlockedSet);
                if (drop) pendingDropsRef.current.push(drop);
                const ctf = VENTURES[i].baseTime / 1000;
                const matDrop = rollMaterialDrop(i, vs.owned, (inWatch ? 1.5 : 1) * totalDropMult * totalMatMult, ctf);
                if (matDrop) pendingMatsRef.current.push({ ventureId: i, drops: matDrop });
              }
            }
          }

          earnedRef.current += rev;
          pendingCompletionsRef.current.push({ ventureIndex: i, revenue: rev, color: VENTURES[i].color });

          // Loot rolls — one per completed cycle
          for (let c = 0; c < cycles; c++) {
            const drop = rollLootDrop(i, vs.owned, totalDropMult, comboXp, unlockedSet);
            if (drop) pendingDropsRef.current.push(drop);
            // Material drops — cycleTimeFactor normalises wall-clock farming across fast/slow professions
            const ctf = VENTURES[i].baseTime / 1000;
            const matDrop = rollMaterialDrop(i, vs.owned, (inWatch ? 1.5 : 1) * totalDropMult * totalMatMult, ctf);
            if (matDrop) pendingMatsRef.current.push({ ventureId: i, drops: matDrop });
          }

          // Chain run — queue adjacent profession triggers
          if (comboChain > 0) {
            for (let c = 0; c < cycles; c++) {
              if (Math.random() < comboChain) {
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
      // First-forge teaching moment: any non-legendary item crossing 10 for the first time.
      if (!firstForgeSeenRef.current) {
        const pre = inventoryRef.current || {};
        const counts = { ...pre };
        for (const drop of drops) counts[drop.id] = (counts[drop.id] || 0) + 1;
        const trigger = drops.find(d =>
          d.rarity !== 'legendary' &&
          (pre[d.id] || 0) < COMBINE_COST &&
          counts[d.id] >= COMBINE_COST
        );
        if (trigger) {
          firstForgeSeenRef.current = true;
          setFirstForgeSeen(true);
          setShowFirstForgeModal({ item: trigger });
        }
      }
      // First-sacrifice teaching moment: any item crossing 3 copies (enough to consider sacrificing extras).
      if (!firstSacrificeSeen) {
        const pre = inventoryRef.current || {};
        const counts = { ...pre };
        for (const drop of drops) counts[drop.id] = (counts[drop.id] || 0) + 1;
        const trigger = drops.find(d => (pre[d.id] || 0) < 3 && counts[d.id] >= 3);
        if (trigger) {
          setFirstSacrificeSeen(true);
          setShowFirstSacrificeModal({ item: trigger });
        }
      }
      // Show toast for the rarest drop
      const rarityOrder = ["legendary", "epic", "rare", "uncommon", "common"];
      const rarest = drops.sort((a, b) =>
        rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
      )[0];
      if (activeEventRef.current) {
        pendingToastsRef.current.loot.push(rarest);
      } else {
        setLootToast({ item: rarest, fadeOut: false });
      }
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

  // Milestone toast auto-dismiss
  useEffect(() => {
    if (!milestoneToast) return;
    const fade = setTimeout(() => setMilestoneToast(t => t ? { ...t, fadeOut: true } : null), 2500);
    const remove = setTimeout(() => setMilestoneToast(null), 3200);
    return () => { clearTimeout(fade); clearTimeout(remove); };
  }, [milestoneToast?.name, milestoneToast?.at]);

  // ═══ ACTIONS ═══
  const handleBuyVenture = (idx) => {
    const v = VENTURES[idx];
    const vs = ventures[idx];
    const qty = buyQty === -1 ? Math.max(1, getMaxBuyable(v.baseCost, vs.owned, gold)) : buyQty;
    const cost = getBulkCost(v.baseCost, vs.owned, qty);
    if (gold < cost) return;
    setGold(g => g - cost);
    const oldOwned = vs.owned;
    const newOwned = vs.owned + qty;
    setVentures(prev => prev.map((s, i) => i === idx ? { ...s, owned: s.owned + qty } : s));
    // Check if a milestone was crossed
    const crossed = MILESTONES.filter(m => oldOwned < m.at && newOwned >= m.at);
    if (crossed.length > 0) {
      const highest = crossed[crossed.length - 1];
      setMilestoneToast({ name: v.name, at: highest.at, mult: highest.mult, fadeOut: false });
    }
  };

  const handleStartVenture = (idx, e) => {
    const vs = ventures[idx];
    if (vs && vs.owned > 0 && !vs.running) setManualClicks(c => c + 1);
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
    if (!firstAllySeen) {
      setFirstAllySeen(true);
      setShowFirstAllyModal({ ventureIdx: idx });
    }
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
    // First-Apprentice teaching moment: the very first tier-0 → tier-1 upgrade
    // triggers an explainer modal so players understand the rebalanced economy.
    if (currentTier === 0 && !firstApprenticeSeen) {
      setFirstApprenticeSeen(true);
      setShowFirstApprenticeModal({ ventureIdx });
    }
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

  // First time the player could profitably ascend → teaching modal.
  useEffect(() => {
    if (!firstAscendSeen && pendingGems > 0) {
      setFirstAscendSeen(true);
      setShowFirstAscendModal(true);
    }
  }, [pendingGems, firstAscendSeen]);

  const handlePrestige = () => {
    if (pendingGems <= 0) return;
    const earnedGems = Math.floor(pendingGems * (1 + skillBonuses.gemBonus));
    setPrestigeGems(g => g + earnedGems);
    setTotalGems(t => t + earnedGems);
    setTotalAscensions(a => a + 1);
    setGold(skillBonuses.startGold > 0 ? skillBonuses.startGold : 4);
    setLifetimeGold(0);
    setMaterials({});
    setProfUpgrades(Array(10).fill(0));
    setProfTransforms(Array(10).fill(null));
    // Auto-buy ventures and keep companions from skill tree
    const ab = skillBonuses.autoBuy;
    const kc = skillBonuses.keepCompanions;
    setVentures(createInitialState().map((vs, i) => ({
      ...vs,
      owned: i < ab ? Math.max(vs.owned, 1) : vs.owned,
      hasCompanion: i < kc ? ventures[i].hasCompanion : false,
    })));
  };

  const handleHardReset = () => {
    if (!confirm("Hard reset everything? This erases ALL progress including Soul Gems.")) return;
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem("castle_clicker_v8");
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
    setUnlockedSkills({});
    setAchievements({});
    setTotalAscensions(0);
    setManualClicks(0);
    setEventsActivated(0);
    setActiveEvent(null);
    setConsumedBuffs({});
  };

  const handleBuySkill = (skillId) => {
    const sk = SKILL_TREE.find(s => s.id === skillId);
    if (!sk || unlockedSkills[skillId]) return;
    if (gemsAvailable < sk.cost) return;
    if (gemsSpent < SKILL_TIER_REQS[sk.tier]) return;
    setUnlockedSkills(prev => ({ ...prev, [skillId]: true }));
  };

  // ═══ DERIVED VALUES ═══
  const unlockedSlots = getUnlockedSlotCount(totalGems, profUpgrades, mtxSlots, skillBonuses.bonusSlot);
  const hasAffordableAlly = ventures.some((vs, i) => !vs.hasCompanion && vs.owned > 0 && gold >= COMPANION_COSTS[i]);

  const slotUnlockCheck = (i) => isSlotUnlocked(i, totalGems, profUpgrades, mtxSlots, skillBonuses.bonusSlot);

  const handleEquip = (itemId, slotIndex) => {
    if (!slotUnlockCheck(slotIndex)) return;
    const totalOwned = inventory[itemId] || 0;
    const alreadyEquipped = getEquippedCount(equipped, itemId);
    if (alreadyEquipped >= totalOwned) return;
    setEquipped(prev => { const next = [...prev]; next[slotIndex] = itemId; return next; });
    if (!firstEquipSeen) {
      setFirstEquipSeen(true);
      setShowFirstEquipModal({ itemId });
    }
  };

  const handleUnequip = (slotIndex) => {
    setEquipped(prev => { const next = [...prev]; next[slotIndex] = null; return next; });
  };

  const handleQuickEquip = (itemId) => {
    const slot = equipped.findIndex((id, i) => id === null && slotUnlockCheck(i));
    if (slot === -1) return;
    handleEquip(itemId, slot);
  };

  const handlePurchaseMtxSlot = () => {
    if (mtxSlots >= 4) return;
    setMtxSlots(prev => Math.min(4, prev + 1));
  };

  // ═══ ITEM COMBINING ═══
  const COMBINE_COST = 10; // 10 of same rarity → 1 random of next rarity
  const RARITY_ORDER = ["common", "uncommon", "rare", "epic", "legendary"];

  const handleCombineItem = (itemId) => {
    const item = LOOT_BY_ID[itemId];
    if (!item) return;
    const owned = (inventory[itemId] || 0) - getEquippedCount(equipped, itemId);
    if (owned < COMBINE_COST) return;
    const rarityIdx = RARITY_ORDER.indexOf(item.rarity);
    if (rarityIdx < 0 || rarityIdx >= RARITY_ORDER.length - 1) return; // can't combine legendaries
    const nextRarity = RARITY_ORDER[rarityIdx + 1];
    const candidates = LOOT_TABLE.filter(i => i.rarity === nextRarity);
    if (candidates.length === 0) return;
    const result = candidates[Math.floor(Math.random() * candidates.length)];
    setInventory(prev => {
      const next = { ...prev };
      next[itemId] = (next[itemId] || 0) - COMBINE_COST;
      if (next[itemId] <= 0) delete next[itemId];
      next[result.id] = (next[result.id] || 0) + 1;
      return next;
    });
    setLootToast({ item: result, fused: true });
    setTimeout(() => setLootToast(null), 3000);
  };

  const handleConsumeItem = (itemId) => {
    const item = LOOT_BY_ID[itemId];
    if (!item) return;
    const owned = (inventory[itemId] || 0) - getEquippedCount(equipped, itemId);
    if (owned < 1) return;
    const frac = CONSUME_FRACTIONS[item.rarity] || 0.20;
    // Remove 1 from inventory
    setInventory(prev => {
      const next = { ...prev };
      next[itemId] = (next[itemId] || 0) - 1;
      if (next[itemId] <= 0) delete next[itemId];
      return next;
    });
    // Add fractional buffs permanently
    setConsumedBuffs(prev => {
      const next = { ...prev };
      for (const e of item.effects) {
        next[e.type] = (next[e.type] || 0) + e.value * frac;
      }
      return next;
    });
    setLootToast({ item, sacrificed: true });
    setTimeout(() => setLootToast(null), 3000);
  };

  const handleTutorialClose = () => {
    setShowTutorial(false);
    setTutorialStep(0);
  };

  // ═══ RENDER ═══

  if (loading) {
    return (
      <div className="cc">
        <style>{STYLES}</style>
        <div className="load-screen">
          <img src="/assets/ui/loading_bg.png" alt="" className="load-bg" />
          <div className="load-overlay">
            <div className="load-title">
              <span className="load-castle-text">CASTLE</span>
              <span className="load-clicker-text">CLICKER</span>
            </div>
            <div className="load-bar-track">
              <div className="load-bar-fill"/>
            </div>
            <div className="load-sub">Entering the dungeon...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cc">
      <style>{STYLES}</style>

      {/* ── TUTORIAL OVERLAY ── */}
      {showTutorial && (
        <div className="tut-overlay">
          <div className="tut-card">
            <div className="tut-progress">
              {TUTORIAL_STEPS.map((_, i) => (
                <div key={i} className={`tut-dot ${i === tutorialStep ? 'tut-dot-on' : ''} ${i < tutorialStep ? 'tut-dot-done' : ''}`} />
              ))}
            </div>
            <div className="tut-icon">{TUTORIAL_STEPS[tutorialStep].icon}</div>
            <div className="tut-title">{TUTORIAL_STEPS[tutorialStep].title}</div>
            <div className="tut-text">{TUTORIAL_STEPS[tutorialStep].text}</div>
            <div className="tut-actions">
              {tutorialStep > 0 && (
                <button className="tut-btn tut-btn-back" onClick={() => setTutorialStep(s => s - 1)}>Back</button>
              )}
              {tutorialStep < TUTORIAL_STEPS.length - 1 ? (
                <button className="tut-btn tut-btn-next" onClick={() => setTutorialStep(s => s + 1)}>Next</button>
              ) : (
                <button className="tut-btn tut-btn-start" onClick={handleTutorialClose}>Begin Adventure</button>
              )}
            </div>
            <button className="tut-skip" onClick={handleTutorialClose}>Skip Tutorial</button>
          </div>
        </div>
      )}

      <div className="cc-brightness" style={brightness !== 1 ? { filter: `brightness(${brightness})` } : undefined}>

      {/* ── HEADER ── */}
      <div className="hd" ref={hdRef}>
        <button className="settings-cog" onClick={() => setShowSettings(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5.5h3l.4 2 .6.3 1.8-1 2.1 2.1-1 1.8.3.6 2 .4v3l-2 .4-.3.6 1 1.8-2.1 2.1-1.8-1-.6.3-.4 2h-3l-.4-2-.6-.3-1.8 1-2.1-2.1 1-1.8-.3-.6-2-.4v-3l2-.4.3-.6-1-1.8L4.6 1.9l1.8 1 .6-.3.4-2zM8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/></svg>
        </button>
        <button className="trophy-btn" onClick={() => setShowAchievements(true)} title="Achievements">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1h8v1.5h2.5v3A2.5 2.5 0 0 1 12 8V9a4 4 0 0 1-3.25 3.93V14H11v1.5H5V14h2.25v-1.07A4 4 0 0 1 4 9V8a2.5 2.5 0 0 1-2.5-2.5v-3H4V1zm0 2.5H3v2a1 1 0 0 0 1 1v-3zm8 0v3a1 1 0 0 0 1-1v-2h-1z"/></svg>
          <span className="trophy-count">{achievementCount}</span>
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
            className={`bnav-btn ${tab === t.key ? 'bnav-on' : ''} ${t.key === 'companions' && hasAffordableAlly && tab !== 'companions' ? 'bnav-pulse' : ''}`}
            style={tab === t.key ? { color: `var(--mod-${t.mod})` } : undefined}
            onClick={() => setTab(t.key)}
          >
            <span className="bnav-icon">{t.icon}</span>
            <span className="bnav-label">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="cc-content">

      {/* ── DUNGEON EVENT BANNER ── */}
      {activeEvent && activeEvent.state === 'pending' && (
        <div className="event-banner event-pending" style={{ borderColor: activeEvent.color }} onClick={handleActivateEvent}>
          <span className="event-title" style={{ color: activeEvent.color }}>{activeEvent.name}</span>
          <span className="event-desc">{activeEvent.desc}</span>
          <span className="event-timer">Click to activate! ({(activeEvent.timeLeft / 1000).toFixed(1)}s)</span>
        </div>
      )}
      {activeEvent && activeEvent.state === 'active' && (
        <div className="event-banner event-active" style={{ borderColor: activeEvent.color }}>
          <span className="event-title" style={{ color: activeEvent.color }}>{activeEvent.name}</span>
          <div className="event-countdown-bar">
            <div className="event-countdown-fill" style={{ width: `${(activeEvent.timeLeft / activeEvent.duration * 100)}%`, background: activeEvent.color }} />
          </div>
          <span className="event-remaining">{(activeEvent.timeLeft / 1000).toFixed(0)}s remaining</span>
        </div>
      )}
      {activeEvent && activeEvent.state === 'boss' && (
        <div className="event-banner event-boss" style={{ borderColor: activeEvent.color }} onClick={handleBossClick}>
          <span className="event-title" style={{ color: activeEvent.color }}>BOSS RAID!</span>
          <span className="event-clicks">{activeEvent.bossClicks || 0}</span>
          <span className="event-timer">{(activeEvent.timeLeft / 1000).toFixed(1)}s</span>
          <span className="event-desc">TAP RAPIDLY!</span>
        </div>
      )}

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
            const loot = getLootBonuses(equipped, i);
            const con = getConsumedBonuses(consumedBuffs);
            const comboGold = loot.goldMult + (con.goldMult - 1);
            const comboSpeed = loot.speedMult + (con.speedMult - 1);
            const effCycle = getEffectiveCycleTime(v, upgTier, tPath, comboSpeed);
            const pct = unlocked ? Math.min(100, (vs.progress / effCycle) * 100) : 0;
            const remaining = unlocked && vs.running ? Math.max(0, effCycle - vs.progress) : effCycle;
            const inWatch = unlocked && isProfInWatch(i, getCurrentWatch());
            const incomingSynergy = getIncomingSynergy(profUpgrades, i);
            const synergyMult = 1 + incomingSynergy;
            const revPerCycle = unlocked ? getRevenue(v, vs.owned, prestigeMultiplier, upgTier, tPath, comboGold, synergyMult) * (inWatch ? 1.25 : 1) : 0;

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
                    {upgTier > 0 && TIER_BADGE_STYLES[upgTier] && (
                      <span
                        className="tier-badge"
                        style={{
                          background: TIER_BADGE_STYLES[upgTier].bg,
                          color: TIER_BADGE_STYLES[upgTier].color,
                          boxShadow: `0 0 6px ${TIER_BADGE_STYLES[upgTier].glow}`,
                        }}
                      >
                        {TIER_BADGE_STYLES[upgTier].label}
                      </span>
                    )}
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
                      {incomingSynergy > 0 && (
                        <span className="vms-syn" title="Bonus from lower-tier profession upgrades (synergy)">
                          +{Math.round(incomingSynergy * 100)}% synergy
                        </span>
                      )}
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
              <div key={v.id} className="comp-row"
                style={{ borderLeftColor: v.color }}>
                <div className="comp-info">
                  <div className="comp-icon"
                    style={{
                      background: `linear-gradient(135deg, ${v.color}33, ${v.colorDark}55)`,
                      borderColor: v.color + '88',
                    }}
                  >
                    <CompanionPortrait index={i} color={v.color} size={52} />
                  </div>
                  <div>
                    <div className="comp-name" style={{ color: v.color }}>{COMPANION_NAMES[i]}</div>
                    <div className="comp-desc">{COMPANION_DESCS[i]}</div>
                    <div className="comp-prof">{v.name}</div>
                  </div>
                </div>
                {vs.hasCompanion ? (
                  <span className="comp-hired">✦ RECRUITED</span>
                ) : vs.owned === 0 ? (
                  <span className="comp-locked">🔒 Locked</span>
                ) : (
                  <button className={`comp-btn ${canAfford ? 'comp-btn-afford' : ''}`} disabled={!canAfford} onClick={() => handleBuyCompanion(i)}>
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
                const isUnlocked = isSlotUnlocked(i, totalGems, profUpgrades, mtxSlots, skillBonuses.bonusSlot);
                const isMtxZone = i >= 8;
                const itemId = equipped[i];
                const item = itemId ? LOOT_BY_ID[itemId] : null;
                const style = item ? getRarityStyle(item.rarity) : null;

                if (!isUnlocked && isMtxZone) {
                  return (
                    <div key={i} className="eq-slot eq-slot-mtx" onClick={handlePurchaseMtxSlot} title="Purchase to unlock">
                      <svg viewBox="0 0 40 40" width={16} height={16}><polygon points="20,4 26,16 38,18 29,27 31,38 20,32 9,38 11,27 2,18 14,16" fill="#c0a040" opacity=".8"/></svg>
                      <span className="eq-slot-label">Purchase</span>
                    </div>
                  );
                }
                if (!isUnlocked) {
                  const unlock = SLOT_UNLOCKS.find(u => u.slot === i);
                  let progressLabel = unlock?.label;
                  if (unlock?.type === "prestige") progressLabel = `${unlock.label} (Have: ${totalGems})`;
                  else if (unlock?.type === "mastery") progressLabel = `${unlock.label} (Have: ${profUpgrades.filter(t => t >= 2).length > 0 ? 'Yes' : 'No'})`;
                  else if (unlock?.type === "mastery3") progressLabel = `${unlock.label} (${profUpgrades.filter(t => t >= 3).length}/3)`;
                  return (
                    <div key={i} className="eq-slot eq-slot-locked" title={progressLabel}>
                      <svg viewBox="0 0 40 40" width={18} height={18}>
                        <rect x="10" y="20" width="20" height="16" rx="3" fill="#7982a9" stroke="#4a5070" strokeWidth="0.8"/>
                        <path d="M14 20 L14 14 Q14 8, 20 8 Q26 8, 26 14 L26 20" fill="none" stroke="#7982a9" strokeWidth="3" strokeLinecap="round"/>
                        <circle cx="20" cy="28" r="2.5" fill="#0d0f14"/>
                        <rect x="19" y="28" width="2" height="4" rx="0.5" fill="#0d0f14"/>
                      </svg>
                      <span className="eq-slot-label">{progressLabel}</span>
                    </div>
                  );
                }
                if (!item) {
                  return (
                    <div key={i} className="eq-slot eq-slot-empty" onClick={() => setEquipPickerSlot(i)}>
                      <span className="eq-slot-plus">+</span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="eq-slot eq-slot-filled"
                    style={{ borderColor: style.color + '80', boxShadow: style.glow }}
                    onClick={() => handleUnequip(i)}
                    title={`${item.name} — ${item.description}\nClick to unequip`}>
                    {item.icon && <img src={item.icon} alt={item.name} className="eq-slot-icon" style={{ imageRendering: 'pixelated' }} />}
                    <span className="eq-slot-name" style={{ color: style.color }}>{item.name}</span>
                    <span className="eq-slot-rarity" style={{ color: style.color }}>{style.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── PERMANENT SACRIFICE BUFFS ── */}
          {Object.keys(consumedBuffs).length > 0 && (() => {
            const labels = [];
            if (consumedBuffs.goldMultiplier)  labels.push({ label: `+${(consumedBuffs.goldMultiplier * 100).toFixed(1)}% gold`,       color: '#f0c030' });
            if (consumedBuffs.speedBoost)      labels.push({ label: `+${(consumedBuffs.speedBoost * 100).toFixed(1)}% speed`,           color: '#5eead4' });
            if (consumedBuffs.dropRateBoost)   labels.push({ label: `+${(consumedBuffs.dropRateBoost * 100).toFixed(1)}% drop rates`,   color: '#a855f7' });
            if (consumedBuffs.xpBoost)         labels.push({ label: `+${(consumedBuffs.xpBoost * 100).toFixed(1)}% XP bonus`,           color: '#60a5fa' });
            if (consumedBuffs.critGold)        labels.push({ label: `+${(consumedBuffs.critGold * 100).toFixed(2)}% crit chance`,        color: '#fbbf24' });
            if (consumedBuffs.instantComplete) labels.push({ label: `+${(consumedBuffs.instantComplete * 100).toFixed(2)}% bonus cycle`, color: '#f472b6' });
            if (consumedBuffs.chainRun)        labels.push({ label: `+${(consumedBuffs.chainRun * 100).toFixed(2)}% chain chance`,       color: '#fb923c' });
            return labels.length > 0 ? (
              <div className="sacrifice-summary">
                <div className="sacrifice-hdr">Sacrifice Buffs <span className="sacrifice-sub">(permanent)</span></div>
                <div className="sacrifice-tags">
                  {labels.map((l, idx) => (
                    <span key={idx} className="sacrifice-tag" style={{ color: l.color, borderColor: l.color + '40' }}>{l.label}</span>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

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
                        {item.icon && <img src={item.icon} alt="" className="inv-item-icon" style={{ imageRendering: 'pixelated' }} />}
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
                        const hasEmptySlot = equipped.some((id, idx) => id === null && slotUnlockCheck(idx));
                        const rarityIdx = RARITY_ORDER.indexOf(item.rarity);
                        const canCombine = rarityIdx >= 0 && rarityIdx < RARITY_ORDER.length - 1 && available >= COMBINE_COST;
                        return (
                          <div className="inv-item-actions">
                            {eqCount > 0 && <span className="inv-item-equipped">{eqCount} equipped</span>}
                            {available > 0 && hasEmptySlot && (
                              <button className="inv-equip-btn" onClick={() => handleQuickEquip(item.id)}>Equip</button>
                            )}
                            {available <= 0 && eqCount > 0 && <span className="inv-item-all-eq">All equipped</span>}
                            {canCombine && (
                              <button className="inv-combine-btn" onClick={() => handleCombineItem(item.id)}
                                title={`Combine ${COMBINE_COST} into 1 ${RARITY_ORDER[rarityIdx + 1]}`}>
                                Forge {COMBINE_COST} &rarr; 1 {RARITY_TIERS[RARITY_ORDER[rarityIdx + 1]].label}
                              </button>
                            )}
                            {rarityIdx >= 0 && rarityIdx < RARITY_ORDER.length - 1 && available > 0 && available < COMBINE_COST && (
                              <span className="inv-combine-progress">{available}/{COMBINE_COST} to forge</span>
                            )}
                            {available > 0 && (() => {
                              const frac = CONSUME_FRACTIONS[item.rarity] || 0.20;
                              const buffDesc = item.effects.map(e => {
                                const pct = (e.value * frac * 100);
                                const label = e.type === 'goldMultiplier' ? 'gold' : e.type === 'speedBoost' ? 'speed' : e.type === 'dropRateBoost' ? 'drops' : e.type === 'xpBoost' ? 'XP' : e.type === 'critGold' ? 'crit' : e.type === 'instantComplete' ? 'bonus cycle' : e.type === 'chainRun' ? 'chain' : e.type;
                                return `+${pct >= 1 ? pct.toFixed(1) : pct.toFixed(2)}% ${label}`;
                              }).join(', ');
                              return (
                                <button className="inv-sacrifice-btn" onClick={() => handleConsumeItem(item.id)}
                                  title={`Sacrifice 1 for permanent: ${buffDesc}`}>
                                  Sacrifice &rarr; {buffDesc}
                                </button>
                              );
                            })()}
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
                      {current.dropBonus > 0 && (
                        <span className="up-bonus up-bonus-drop" title="Boost to loot and material drop rates on this profession">
                          +{Math.round(current.dropBonus * 100)}% drops
                        </span>
                      )}
                      {current.synergyBonus > 0 && i < VENTURES.length - 1 && (
                        <span className="up-bonus up-bonus-syn" title={`Adds to every higher-tier profession (${VENTURES.length - 1 - i} of them)`}>
                          +{Math.round(current.synergyBonus * 100)}% synergy &rarr; higher
                        </span>
                      )}
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
                      <div className="up-next-gains">
                        <span className="up-next-gain">×{(1 + next.revBonus).toFixed(0)} rev</span>
                        {next.speedBonus > current.speedBonus && (
                          <span className="up-next-gain">-{Math.round((next.speedBonus - current.speedBonus) * 100)}% time</span>
                        )}
                        {next.dropBonus > current.dropBonus && (
                          <span className="up-next-gain up-next-gain-drop">
                            +{Math.round((next.dropBonus - current.dropBonus) * 100)}% drops
                          </span>
                        )}
                        {next.synergyBonus > current.synergyBonus && i < VENTURES.length - 1 && (
                          <span className="up-next-gain up-next-gain-syn">
                            +{Math.round((next.synergyBonus - current.synergyBonus) * 100)}% synergy &rarr; {VENTURES.length - 1 - i} higher
                          </span>
                        )}
                      </div>
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
          {/* Sub-tab toggle */}
          <div className="prest-subtabs">
            <button className={prestSub === 'ascend' ? 'prest-subtab-on' : 'prest-subtab'} onClick={() => setPrestSub('ascend')}>Ascension</button>
            <button className={prestSub === 'skills' ? 'prest-subtab-on' : 'prest-subtab'} onClick={() => setPrestSub('skills')}>Skills</button>
            <button className={prestSub === 'achievements' ? 'prest-subtab-on' : 'prest-subtab'} onClick={() => setPrestSub('achievements')}>
              Achievements ({achievementCount}/{ACHIEVEMENTS.length})
            </button>
          </div>

          {prestSub === 'ascend' && (
            <>
              <div className="prest-title">DUNGEON ASCENSION</div>
              <p className="prest-sub">
                Sacrifice all progress to earn <strong style={{ color: 'var(--gm)' }}>Soul Gems</strong>.
                Every gem gives <strong style={{ color: 'var(--gm)' }}>+{Math.round(GEM_GOLD_BONUS * 100)}% gold forever</strong>, plus you can spend them on permanent skills.
              </p>
              <div className="prest-grid">
                <div className="prest-stat">
                  <div className="prest-label">Available Gems</div>
                  <div className="prest-val" style={{ color: 'var(--gm)' }}><SoulGemIcon size={18} /> {gemsAvailable}</div>
                </div>
                <div className="prest-stat">
                  <div className="prest-label">Power</div>
                  <div className="prest-val">{prestigeMultiplier.toFixed(2)}x</div>
                </div>
                <div className="prest-stat">
                  <div className="prest-label">Gems on Ascend</div>
                  <div className="prest-val" style={{ color: 'var(--gm)' }}>+{pendingGems}{skillBonuses.gemBonus > 0 ? ` (+${Math.round(skillBonuses.gemBonus*100)}% bonus)` : ''}</div>
                </div>
                <div className="prest-stat">
                  <div className="prest-label">Ascensions</div>
                  <div className="prest-val">{totalAscensions}</div>
                </div>
              </div>
              {/* Power breakdown so players can see where their multiplier comes from */}
              <div className="prest-breakdown">
                <div className="prest-break-row">
                  <span>From Soul Gems ({totalGems} × {Math.round(GEM_GOLD_BONUS * 100)}%)</span>
                  <span style={{ color: 'var(--gm)' }}>+{Math.round(totalGems * GEM_GOLD_BONUS * 100)}%</span>
                </div>
                <div className="prest-break-row">
                  <span>From Skills</span>
                  <span style={{ color: 'var(--mod-skills)' }}>+{Math.round(skillBonuses.goldMult * 100)}%</span>
                </div>
                <div className="prest-break-row">
                  <span>From Achievements ({achievementCount})</span>
                  <span style={{ color: 'var(--gn)' }}>+{Math.round(achievementCount * ACHIEVEMENT_BONUS * 100)}%</span>
                </div>
                {pendingGems > 0 && (
                  <div className="prest-break-row prest-break-preview">
                    <span>After Ascend (+{Math.floor(pendingGems * (1 + skillBonuses.gemBonus))} gems)</span>
                    <span style={{ color: 'var(--gm)' }}>
                      {(1 + ((totalGems + Math.floor(pendingGems * (1 + skillBonuses.gemBonus))) * GEM_GOLD_BONUS) + skillBonuses.goldMult + achievementCount * ACHIEVEMENT_BONUS).toFixed(2)}x
                    </span>
                  </div>
                )}
              </div>
              <button className="prest-btn" disabled={pendingGems <= 0} onClick={handlePrestige}>
                {pendingGems > 0 ? `ASCEND (+${Math.floor(pendingGems * (1 + skillBonuses.gemBonus))} Gems)` : "Gather more gold to ascend"}
              </button>
              {(() => {
                const nextGemThreshold = Math.pow(totalGems + 1, 2) * PRESTIGE_BASE;
                const progress = Math.min(1, lifetimeGold / nextGemThreshold);
                return (
                  <>
                    <div className="prest-progress-wrap">
                      <div className="prest-progress-bar" style={{ width: `${(progress * 100).toFixed(1)}%` }} />
                      <span className="prest-progress-text">{(progress * 100).toFixed(1)}%</span>
                    </div>
                    <p className="prest-hint">
                      Next gem at: <GoldCoinIcon />{formatNumber(nextGemThreshold)} lifetime gold
                      ({formatNumber(lifetimeGold)} / {formatNumber(nextGemThreshold)})
                    </p>
                  </>
                );
              })()}
            </>
          )}

          {prestSub === 'skills' && (
            <div className="skill-tree">
              <div className="skill-tree-title">Soul Gem Skills</div>
              <div className="skill-tree-budget">
                <SoulGemIcon size={12} /> {gemsAvailable} available / {gemsSpent} spent
              </div>
              {[1,2,3,4].map(tier => {
                const tierSkills = SKILL_TREE.filter(s => s.tier === tier);
                const tierUnlocked = gemsSpent >= SKILL_TIER_REQS[tier];
                return (
                  <div key={tier} className={`skill-tier ${tierUnlocked ? '' : 'skill-tier-locked'}`}>
                    <div className="skill-tier-label">
                      Tier {tier} {!tierUnlocked && <span className="skill-tier-req">({SKILL_TIER_REQS[tier]} gems spent to unlock)</span>}
                    </div>
                    <div className="skill-tier-grid">
                      {tierSkills.map(sk => {
                        const owned = !!unlockedSkills[sk.id];
                        const canBuy = tierUnlocked && !owned && gemsAvailable >= sk.cost;
                        return (
                          <button key={sk.id}
                            className={`skill-node ${owned ? 'skill-owned' : ''} ${canBuy ? 'skill-buyable' : ''}`}
                            disabled={!canBuy && !owned}
                            onClick={() => canBuy && handleBuySkill(sk.id)}>
                            <span className="skill-cost"><SoulGemIcon size={10} /> {sk.cost}</span>
                            <span className="skill-name">{sk.name}</span>
                            <span className="skill-desc">{sk.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {prestSub === 'achievements' && (
            <div className="ach-panel">
              <div className="ach-bonus">+{achievementCount}% gold from {achievementCount} achievements</div>
              <div className="ach-list">
                {ACHIEVEMENTS.map(ach => {
                  const unlocked = !!achievements[ach.id];
                  const iconUrl = getAchievementIcon(ach.id);
                  return (
                    <div key={ach.id} className={`ach-card ${unlocked ? 'ach-unlocked' : 'ach-locked'}`}>
                      <div className="ach-icon">
                        {iconUrl
                          ? <img src={iconUrl} alt="" className="ach-icon-img" />
                          : (unlocked ? '\u2726' : '\uD83D\uDD12')}
                      </div>
                      <div className="ach-info">
                        <span className="ach-name">{unlocked ? ach.name : '???'}</span>
                        <span className="ach-desc">{unlocked ? ach.desc : 'Keep playing to discover...'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      </div>

      {/* ── OFFLINE EARNINGS BANNER ── */}
      {offlineEarnings && (
        <div className="offline-banner" onClick={() => setOfflineEarnings(null)}>
          <div className="offline-title">Welcome Back</div>
          <div className="offline-amount">
            Your companions earned <GoldCoinIcon size={14} /> <strong>{formatNumber(offlineEarnings)}</strong> while you were away
          </div>
          <div className="offline-dismiss">tap to dismiss</div>
        </div>
      )}

      {/* ── ACHIEVEMENT TOAST ── */}
      {achievementToast && (
        <div className={`achievement-toast ${achievementToast.fadeOut ? 'loot-toast-out' : ''}`}>
          {(() => {
            const iconUrl = getAchievementIcon(achievementToast.id);
            return iconUrl
              ? <img src={iconUrl} alt="" className="ach-toast-img" />
              : <span className="ach-toast-icon">{'\u2726'}</span>;
          })()}
          <span className="ach-toast-label">Achievement Unlocked</span>
          <span className="ach-toast-name">{achievementToast.name}</span>
          <span className="ach-toast-desc">{achievementToast.desc}</span>
        </div>
      )}

      {/* ── MILESTONE TOAST ── */}
      {milestoneToast && (
        <div className={`milestone-toast ${milestoneToast.fadeOut ? 'loot-toast-out' : ''}`}>
          <span className="milestone-toast-title">Milestone Reached</span>
          <span className="milestone-toast-name">{milestoneToast.name}</span>
          <span className="milestone-toast-desc">{milestoneToast.mult}x revenue at {milestoneToast.at} owned</span>
        </div>
      )}

      {/* ── LOOT TOAST ── */}
      {lootToast && (
        <div className={`loot-toast ${lootToast.fadeOut ? 'loot-toast-out' : ''}`}
          style={{ borderColor: getRarityStyle(lootToast.item.rarity).color }}>
          {lootToast.item.icon && <img src={lootToast.item.icon} alt="" className="loot-toast-icon" style={{ imageRendering: 'pixelated' }} />}
          {lootToast.fused && <span className="loot-toast-fused">Forged!</span>}
          {lootToast.sacrificed && <span className="loot-toast-fused" style={{color:'#ef4444'}}>Sacrificed!</span>}
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

      {/* ── EQUIP PICKER MODAL ── */}
      {equipPickerSlot !== null && (
        <div className="watch-modal-overlay" onClick={() => setEquipPickerSlot(null)}>
          <div className="watch-modal equip-picker" onClick={e => e.stopPropagation()}>
            <div className="watch-modal-header">
              <span className="watch-modal-title">Equip to Slot {equipPickerSlot + 1}</span>
              <button className="watch-modal-close" onClick={() => setEquipPickerSlot(null)}>X</button>
            </div>
            {(() => {
              const available = LOOT_TABLE.filter(item => {
                const owned = inventory[item.id] || 0;
                const eqCount = getEquippedCount(equipped, item.id);
                return owned - eqCount > 0;
              }).sort((a, b) => {
                const order = ["legendary", "epic", "rare", "uncommon", "common"];
                return order.indexOf(a.rarity) - order.indexOf(b.rarity);
              });
              if (available.length === 0) {
                return <div className="ep-empty">No items available to equip. Find loot by completing professions!</div>;
              }
              return (
                <div className="ep-list">
                  {available.map(item => {
                    const style = getRarityStyle(item.rarity);
                    const owned = inventory[item.id] || 0;
                    const eqCount = getEquippedCount(equipped, item.id);
                    return (
                      <div key={item.id} className="ep-item" style={{ borderColor: style.color, boxShadow: style.glow }}
                        onClick={() => { handleEquip(item.id, equipPickerSlot); setEquipPickerSlot(null); }}>
                        {item.icon && <img src={item.icon} alt="" className="ep-item-icon" style={{ imageRendering: 'pixelated' }} />}
                        <div className="ep-item-info">
                          <span className="ep-item-name" style={{ color: style.color }}>{item.name}</span>
                          <span className="ep-item-desc">{item.description}</span>
                        </div>
                        <div className="ep-item-meta">
                          <span className="ep-item-rarity" style={{ color: style.color }}>{style.label}</span>
                          <span className="ep-item-qty">x{owned - eqCount}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
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

      {/* ── ACHIEVEMENTS MODAL ── */}
      {showAchievements && (
        <div className="watch-modal-overlay" onClick={() => setShowAchievements(false)}>
          <div className="watch-modal ach-modal" onClick={e => e.stopPropagation()}>
            <div className="watch-modal-header">
              <span className="watch-modal-title">Achievements ({achievementCount}/{ACHIEVEMENTS.length})</span>
              <button className="watch-modal-close" onClick={() => setShowAchievements(false)}>X</button>
            </div>
            <div className="ach-panel">
              <div className="ach-bonus">+{achievementCount}% gold from {achievementCount} achievements</div>
              <div className="ach-list">
                {ACHIEVEMENTS.map(ach => {
                  const unlocked = !!achievements[ach.id];
                  const iconUrl = getAchievementIcon(ach.id);
                  return (
                    <div key={ach.id} className={`ach-card ${unlocked ? 'ach-unlocked' : 'ach-locked'}`}>
                      <div className="ach-icon">
                        {iconUrl
                          ? <img src={iconUrl} alt="" className="ach-icon-img" />
                          : (unlocked ? '\u2726' : '\uD83D\uDD12')}
                      </div>
                      <div className="ach-info">
                        <span className="ach-name">{unlocked ? ach.name : '???'}</span>
                        <span className="ach-desc">{unlocked ? ach.desc : 'Keep playing to discover...'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FIRST APPRENTICE TEACHING MODAL ── */}
      {showFirstApprenticeModal && (() => {
        const v = VENTURES[showFirstApprenticeModal.ventureIdx];
        const higherCount = VENTURES.length - 1 - showFirstApprenticeModal.ventureIdx;
        return (
          <div className="watch-modal-overlay" onClick={() => setShowFirstApprenticeModal(null)}>
            <div className="watch-modal first-app-modal" onClick={e => e.stopPropagation()} style={{borderColor: v.color}}>
              <div className="first-app-hdr" style={{background: `linear-gradient(135deg, ${v.colorDark}66, ${v.color}33)`}}>
                <div className="first-app-badge" style={{background: 'linear-gradient(135deg,#cd7f32,#8b4513)', boxShadow: '0 0 20px rgba(205,127,50,.5)'}}>APPRENTICE</div>
                <div className="first-app-title">{v.name} has ranked up!</div>
                <div className="first-app-sub">You've unlocked your first profession tier. This is where the real game begins.</div>
              </div>
              <div className="first-app-body">
                <div className="first-app-reward">
                  <div className="first-app-reward-icon" style={{color: v.color}}>&#9733;</div>
                  <div className="first-app-reward-text">
                    <strong>{v.name}</strong> now earns <strong style={{color:'var(--gd)'}}>×5 gold</strong>, runs <strong style={{color:'var(--accent)'}}>5% faster</strong>, and rolls <strong style={{color:'#f7768e'}}>+10% drops</strong>.
                  </div>
                </div>
                {higherCount > 0 && (
                  <div className="first-app-reward">
                    <div className="first-app-reward-icon" style={{color:'var(--accent)'}}>&#10148;</div>
                    <div className="first-app-reward-text">
                      Every higher profession ({higherCount} of them) gets a permanent <strong style={{color:'var(--accent)'}}>+25% synergy bonus</strong>.
                    </div>
                  </div>
                )}
                <div className="first-app-teach">
                  <div className="first-app-teach-title">How Progression Works Now</div>
                  <ul className="first-app-teach-list">
                    <li><strong>Tier upgrades</strong> are your main power lever. Each tier multiplies a profession's revenue up to <strong>×2500</strong> at Grandmaster.</li>
                    <li><strong>Synergies</strong> flow upward. Upgrading old professions buffs every newer one you unlock.</li>
                    <li><strong>Materials</strong> come from running cycles. Keep your old professions spinning — their drops fund the upgrades that make you stronger.</li>
                  </ul>
                </div>
              </div>
              <button className="first-app-btn" onClick={() => setShowFirstApprenticeModal(null)}>
                Let's go
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── FIRST FORGE TEACHING MODAL ── */}
      {showFirstForgeModal && (() => {
        const item = showFirstForgeModal.item;
        const rarityStyle = getRarityStyle(item.rarity);
        const nextRarity = RARITY_ORDER[RARITY_ORDER.indexOf(item.rarity) + 1];
        const nextStyle = nextRarity ? getRarityStyle(nextRarity) : rarityStyle;
        return (
          <div className="watch-modal-overlay" onClick={() => setShowFirstForgeModal(null)}>
            <div className="watch-modal first-app-modal" onClick={e => e.stopPropagation()} style={{borderColor: rarityStyle.color}}>
              <div className="first-app-hdr" style={{background: `linear-gradient(135deg, ${rarityStyle.color}33, ${nextStyle.color}33)`}}>
                <div className="first-app-badge" style={{background: `linear-gradient(135deg, ${rarityStyle.color}, ${nextStyle.color})`, boxShadow: `0 0 20px ${rarityStyle.color}80`}}>FORGE UNLOCKED</div>
                <div className="first-app-title">10 × {item.name}</div>
                <div className="first-app-sub">You've stockpiled enough of one item to forge it into something stronger.</div>
              </div>
              <div className="first-app-body">
                <div className="first-app-reward">
                  {item.icon && <img src={item.icon} alt="" style={{width:32, height:32, imageRendering:'pixelated', flexShrink:0}} />}
                  <div className="first-app-reward-text">
                    Head to the <strong style={{color:'var(--gd)'}}>Loot</strong> tab. Any item with 10+ copies shows a <strong>Forge 10 &rarr; 1</strong> button — it consumes 10 and rolls a random item of the next rarity.
                  </div>
                </div>
                <div className="first-app-teach">
                  <div className="first-app-teach-title">The Rarity Ladder</div>
                  <ul className="first-app-teach-list">
                    <li><strong>Common &rarr; Uncommon &rarr; Rare &rarr; Epic &rarr; Legendary.</strong> Each tier is a meaningful jump in power.</li>
                    <li>The result is <strong>random</strong> within the target tier — you might get something useful, or duplicates you can forge again.</li>
                    <li>Forging is <strong>optional</strong>. Equipped pieces don't count toward the stack, so hold onto what you're using.</li>
                  </ul>
                </div>
              </div>
              <button className="first-app-btn" onClick={() => setShowFirstForgeModal(null)} style={{background: `linear-gradient(135deg, ${rarityStyle.color}, ${nextStyle.color})`, boxShadow: `0 4px 16px ${rarityStyle.color}4d`}}>
                Got it
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── FIRST SACRIFICE TEACHING MODAL ── */}
      {showFirstSacrificeModal && (() => {
        const item = showFirstSacrificeModal.item;
        const rarityStyle = getRarityStyle(item.rarity);
        const frac = CONSUME_FRACTIONS[item.rarity] || 0.20;
        const buffPreview = item.effects.map(e => {
          const pct = (e.value * frac * 100);
          const label = e.type === 'goldMultiplier' ? 'gold' : e.type === 'speedBoost' ? 'speed' : e.type === 'dropRateBoost' ? 'drops' : e.type;
          return `+${pct >= 1 ? pct.toFixed(1) : pct.toFixed(2)}% ${label}`;
        }).join(', ');
        return (
          <div className="watch-modal-overlay" onClick={() => setShowFirstSacrificeModal(null)}>
            <div className="watch-modal first-app-modal" onClick={e => e.stopPropagation()} style={{borderColor: '#ef4444'}}>
              <div className="first-app-hdr" style={{background: 'linear-gradient(135deg, rgba(239,68,68,.25), rgba(168,85,247,.2))'}}>
                <div className="first-app-badge" style={{background: 'linear-gradient(135deg,#ef4444,#a855f7)', boxShadow: '0 0 20px rgba(239,68,68,.5)'}}>SACRIFICE UNLOCKED</div>
                <div className="first-app-title">The Altar Awaits</div>
                <div className="first-app-sub">You have enough duplicates to sacrifice one for a permanent bonus.</div>
              </div>
              <div className="first-app-body">
                <div className="first-app-reward">
                  {item.icon && <img src={item.icon} alt="" style={{width:32, height:32, imageRendering:'pixelated', flexShrink:0}} />}
                  <div className="first-app-reward-text">
                    Sacrificing <strong style={{color: rarityStyle.color}}>{item.name}</strong> would permanently grant <strong style={{color:'#ef4444'}}>{buffPreview}</strong>.
                  </div>
                </div>
                <div className="first-app-teach">
                  <div className="first-app-teach-title">How Sacrifice Works</div>
                  <ul className="first-app-teach-list">
                    <li><strong>Destroy 1 item</strong> to gain a fraction of its effect as a <strong>permanent buff</strong> that survives ascension.</li>
                    <li>Rarer items grant a <strong>larger fraction</strong> — common 20%, uncommon 25%, rare 30%, epic 40%, legendary 50%.</li>
                    <li>Sacrifice stacks — feed the altar 10 commons and those tiny buffs add up.</li>
                    <li>Choose wisely: <strong>Equip</strong> for full power, <strong>Forge</strong> to gamble for upgrades, or <strong>Sacrifice</strong> for permanent growth.</li>
                  </ul>
                </div>
              </div>
              <button className="first-app-btn" onClick={() => setShowFirstSacrificeModal(null)} style={{background: 'linear-gradient(135deg,#ef4444,#a855f7)', boxShadow: '0 4px 16px rgba(239,68,68,.4)'}}>
                Got it
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── FIRST ASCEND TEACHING MODAL ── */}
      {showFirstAscendModal && (() => {
        const gemBonus = Math.round(GEM_GOLD_BONUS * 100);
        return (
          <div className="watch-modal-overlay" onClick={() => setShowFirstAscendModal(false)}>
            <div className="watch-modal first-app-modal" onClick={e => e.stopPropagation()} style={{borderColor: 'var(--gm)'}}>
              <div className="first-app-hdr" style={{background: 'linear-gradient(135deg, rgba(192,132,252,.3), rgba(122,162,247,.2))'}}>
                <div className="first-app-badge" style={{background: 'linear-gradient(135deg,#c084fc,#7aa2f7)', boxShadow: '0 0 20px rgba(192,132,252,.5)'}}>ASCEND READY</div>
                <div className="first-app-title">You can now Ascend</div>
                <div className="first-app-sub">You've earned enough lifetime gold to break through. This is how idle games get huge.</div>
              </div>
              <div className="first-app-body">
                <div className="first-app-reward">
                  <div className="first-app-reward-icon" style={{color:'var(--gm)'}}><SoulGemIcon /></div>
                  <div className="first-app-reward-text">
                    Ascending <strong style={{color:'#f7768e'}}>resets</strong> your gold, professions, and materials — but every <strong style={{color:'var(--gm)'}}>Soul Gem</strong> you collect gives a permanent <strong style={{color:'var(--gd)'}}>+{gemBonus}% gold</strong> bonus, forever.
                  </div>
                </div>
                <div className="first-app-reward">
                  <div className="first-app-reward-icon" style={{color:'var(--accent)'}}>&#10148;</div>
                  <div className="first-app-reward-text">
                    Gems also unlock the <strong>Skill Tree</strong> — permanent upgrades you keep through every ascension.
                  </div>
                </div>
                <div className="first-app-teach">
                  <div className="first-app-teach-title">When To Ascend</div>
                  <ul className="first-app-teach-list">
                    <li><strong>Don't rush it.</strong> Your next gem costs 4× the lifetime gold of the previous one — wait until you're hitting a wall.</li>
                    <li>Check the <strong>Ascend</strong> tab any time to see pending gems and your new multiplier preview.</li>
                    <li><strong>Equipped loot</strong> and <strong>achievements</strong> survive the reset. Your runs get faster every cycle.</li>
                  </ul>
                </div>
              </div>
              <button className="first-app-btn" onClick={() => setShowFirstAscendModal(false)} style={{background: 'linear-gradient(135deg,#c084fc,#7aa2f7)', boxShadow: '0 4px 16px rgba(192,132,252,.4)'}}>
                Understood
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── FIRST EQUIP TEACHING MODAL ── */}
      {showFirstEquipModal && (() => {
        const item = LOOT_BY_ID[showFirstEquipModal.itemId];
        if (!item) return null;
        const rarityStyle = getRarityStyle(item.rarity);
        return (
          <div className="watch-modal-overlay" onClick={() => setShowFirstEquipModal(null)}>
            <div className="watch-modal first-app-modal" onClick={e => e.stopPropagation()} style={{borderColor: rarityStyle.color}}>
              <div className="first-app-hdr" style={{background: `linear-gradient(135deg, ${rarityStyle.color}33, ${rarityStyle.color}11)`}}>
                <div className="first-app-badge" style={{background: `linear-gradient(135deg, ${rarityStyle.color}, ${rarityStyle.color}aa)`, boxShadow: `0 0 20px ${rarityStyle.color}80`}}>FIRST EQUIP</div>
                <div className="first-app-title">{item.name} equipped</div>
                <div className="first-app-sub">Equipped gear is where your real power curve lives.</div>
              </div>
              <div className="first-app-body">
                <div className="first-app-reward">
                  {item.icon && <img src={item.icon} alt="" style={{width:32, height:32, imageRendering:'pixelated', flexShrink:0}} />}
                  <div className="first-app-reward-text">
                    <strong>{item.name}</strong> is now active: <em style={{color: rarityStyle.color}}>{item.description}</em>
                  </div>
                </div>
                <div className="first-app-teach">
                  <div className="first-app-teach-title">How Loadouts Work</div>
                  <ul className="first-app-teach-list">
                    <li><strong>Slots stack.</strong> You can equip multiple copies of the same item across slots — the bonuses add up.</li>
                    <li><strong>More slots unlock</strong> as you earn Soul Gems and upgrade professions. Mid-game you'll be juggling 6+ slots.</li>
                    <li><strong>Equipped items are safe</strong> from forging — the stack you see counts only unequipped copies.</li>
                  </ul>
                </div>
              </div>
              <button className="first-app-btn" onClick={() => setShowFirstEquipModal(null)} style={{background: `linear-gradient(135deg, ${rarityStyle.color}, ${rarityStyle.color}aa)`, boxShadow: `0 4px 16px ${rarityStyle.color}4d`}}>
                Got it
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── FIRST ALLY TEACHING MODAL ── */}
      {showFirstAllyModal && (() => {
        const v = VENTURES[showFirstAllyModal.ventureIdx];
        return (
          <div className="watch-modal-overlay" onClick={() => setShowFirstAllyModal(null)}>
            <div className="watch-modal first-app-modal" onClick={e => e.stopPropagation()} style={{borderColor: v.color}}>
              <div className="first-app-hdr" style={{background: `linear-gradient(135deg, ${v.colorDark}66, ${v.color}33)`}}>
                <div className="first-app-badge" style={{background: `linear-gradient(135deg, ${v.color}, ${v.colorDark})`, boxShadow: `0 0 20px ${v.color}80`}}>ALLY HIRED</div>
                <div className="first-app-title">{v.name} runs itself</div>
                <div className="first-app-sub">Your first ally is on the job. Welcome to idle mode.</div>
              </div>
              <div className="first-app-body">
                <div className="first-app-reward">
                  <div className="first-app-reward-icon" style={{color: v.color}}>&#9733;</div>
                  <div className="first-app-reward-text">
                    <strong>{v.name}</strong> now <strong style={{color:'var(--gd)'}}>auto-runs</strong> every cycle forever. No more clicking to start runs — the gold flows on its own.
                  </div>
                </div>
                <div className="first-app-teach">
                  <div className="first-app-teach-title">What Changes Now</div>
                  <ul className="first-app-teach-list">
                    <li><strong>Offline progress</strong> kicks in for this profession. Earnings accrue even when the app is closed.</li>
                    <li><strong>Hire more allies</strong> from the <strong>Allies</strong> tab — one per profession. Priority is usually your top earners first.</li>
                    <li>Allies stack with everything else — <strong>tier upgrades</strong>, <strong>loot</strong>, <strong>synergies</strong> still apply.</li>
                  </ul>
                </div>
              </div>
              <button className="first-app-btn" onClick={() => setShowFirstAllyModal(null)} style={{background: `linear-gradient(135deg, ${v.color}, ${v.colorDark})`, boxShadow: `0 4px 16px ${v.color}4d`}}>
                Let's go
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── SETTINGS MODAL ── */}
      {showSettings && (
        <div className="watch-modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="watch-modal" onClick={e => e.stopPropagation()}>
            <div className="watch-modal-header">
              <span className="watch-modal-title">Settings</span>
              <button className="watch-modal-close" onClick={() => setShowSettings(false)}>X</button>
            </div>

            <div className="settings-section">
              <button className="settings-tutorial-btn" onClick={() => { setShowSettings(false); setShowTutorial(true); setTutorialStep(0); }}>
                View Tutorial
              </button>
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
  --gold: #fbbf24; --txm: #7a8ba9;
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
.cc * { position: relative; box-sizing: border-box; }

/* Header */
.hd { background: linear-gradient(180deg,#24283b,#1a1b26); border-bottom: 1px solid var(--bd2); padding: 10px 16px 10px; position: sticky; top: 0; z-index: 20; box-shadow: 0 4px 24px rgba(0,0,0,.5); }
.hd::after { content:''; position:absolute; bottom:-3px; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,rgba(255,158,100,.4),rgba(122,162,247,.3),transparent); }
.hd-brand { display:flex; justify-content:center; margin-bottom:6px; perspective:500px; }
.hd-title-wrap { display:flex; flex-direction:column; align-items:center; line-height:1; transform:rotateX(12deg); transform-style:preserve-3d; filter:drop-shadow(0 6px 16px rgba(0,0,0,.8)) drop-shadow(0 2px 0 rgba(0,0,0,.9)); }
.hd-title-castle { font-family:'GothicByte',serif; font-size:26px; letter-spacing:14px; color:#94a3b8; text-shadow:0 1px 3px rgba(0,0,0,.6); }
.hd-title-clicker { font-family:'Cinzel',serif; font-size:44px; font-weight:900; letter-spacing:4px; color:#fbbf24; text-shadow: 0 1px 0 #b45309, 0 2px 0 #92400e, 0 3px 0 #78350f, 0 4px 0 #5c2d0a, 0 5px 10px rgba(0,0,0,.6), 0 8px 20px rgba(0,0,0,.4); margin-top:-4px; }
.hd-stats { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:8px; }
.hd-stats > .hd-gold-box { justify-self:start; }
.hd-stats > .hd-gems { justify-self:end; }
.hd-watch { font-family:'Fira Code',monospace; font-size:10px; color:var(--txd); padding:3px 8px; border-radius:10px; background:rgba(255,255,255,.05); border:1px solid var(--bd); display:inline-flex; align-items:center; gap:5px; }
.watch-info-btn { width:16px; height:16px; border-radius:50%; border:1px solid rgba(255,255,255,.4); background:rgba(255,255,255,.15); color:#fff; font-size:10px; font-family:'Inter',sans-serif; font-style:normal; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding:0 0 1px 0; line-height:1; transition:all .2s; }
.watch-info-btn:hover { background:rgba(255,255,255,.3); color:#fff; border-color:var(--gold); }
.trophy-btn { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:#c0a040; cursor:pointer; padding:4px; display:flex; align-items:center; gap:4px; z-index:21; transition:all .2s; min-width:32px; min-height:32px; justify-content:center; }
.trophy-btn:hover { color:#fbbf24; filter:drop-shadow(0 0 6px #fbbf24); }
.trophy-btn:active { transform:translateY(-50%) scale(.9); }
.trophy-count { font-family:'Fira Code',monospace; font-size:10px; font-weight:700; color:inherit; line-height:1; }
.ach-modal { max-width:480px; max-height:80vh; overflow-y:auto; }

@media (max-width:400px) {
  .hd-amount { font-size:18px; }
  .hd-title-clicker { font-size:34px; }
  .hd-watch { font-size:8px; padding:2px 6px; }
  .hd-stats { gap:4px; }
}

/* Watch Info Modal */
.watch-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.7); z-index:100; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(3px); animation:fadeIn .15s ease; }
.watch-modal { background:linear-gradient(180deg,#1a1f30,#111520); border:1px solid var(--bd2); border-radius:12px; padding:20px; max-width:380px; width:90%; box-shadow:0 8px 32px rgba(0,0,0,.6); }
.first-app-modal { padding:0; max-width:440px; border-width:2px; overflow:hidden; }
.first-app-hdr { padding:22px 24px 18px; text-align:center; border-bottom:1px solid var(--bd); }
.first-app-badge { display:inline-block; font-family:'Cinzel',serif; font-size:11px; font-weight:900; letter-spacing:2px; color:#fff4d1; padding:6px 14px; border-radius:14px; border:1px solid rgba(0,0,0,.35); text-shadow:0 1px 2px rgba(0,0,0,.5); margin-bottom:10px; }
.first-app-title { font-family:'Cinzel',serif; font-size:20px; font-weight:900; color:var(--tx); margin-bottom:6px; }
.first-app-sub { font-family:'Fira Code',monospace; font-size:11px; color:var(--txd); line-height:1.5; }
.first-app-body { padding:18px 24px; }
.first-app-reward { display:flex; gap:12px; align-items:flex-start; margin-bottom:14px; }
.first-app-reward-icon { font-size:20px; line-height:1; flex-shrink:0; margin-top:1px; }
.first-app-reward-text { font-family:'Fira Code',monospace; font-size:12px; color:var(--tx); line-height:1.5; }
.first-app-teach { margin-top:18px; padding:14px; background:rgba(255,255,255,.03); border:1px solid var(--bd); border-radius:8px; }
.first-app-teach-title { font-family:'Cinzel',serif; font-size:12px; font-weight:700; color:var(--gd); letter-spacing:1px; text-transform:uppercase; margin-bottom:10px; }
.first-app-teach-list { margin:0; padding-left:18px; font-family:'Fira Code',monospace; font-size:11px; color:var(--txd); line-height:1.6; }
.first-app-teach-list li { margin-bottom:6px; }
.first-app-teach-list li:last-child { margin-bottom:0; }
.first-app-teach-list strong { color:var(--tx); }
.first-app-btn { display:block; width:calc(100% - 48px); margin:0 24px 24px; padding:14px; font-family:'Cinzel',serif; font-size:14px; font-weight:900; letter-spacing:1.5px; color:#fff; background:linear-gradient(135deg,#cd7f32,#8b4513); border:2px solid rgba(255,255,255,.15); border-radius:10px; cursor:pointer; box-shadow:0 4px 16px rgba(205,127,50,.3); transition:all .2s; text-transform:uppercase; }
.first-app-btn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(205,127,50,.5); }
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
.watch-modal-prof { font-size:11px; color:var(--tx); }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }

/* Settings cog */
.settings-cog { position:absolute; left:12px; top:50%; transform:translateY(-50%); background:none; border:none; color:#9a9a9a; cursor:pointer; padding:4px; transition:all .3s; z-index:21; }
.settings-cog:hover { color:#fff; transform:translateY(-50%) rotate(45deg); }

/* Settings modal extras */
.settings-section { margin-bottom:16px; }
.settings-label { display:block; font-family:'Cinzel',serif; font-size:12px; color:var(--tx); margin-bottom:8px; letter-spacing:.5px; }
.settings-slider-row { display:flex; align-items:center; gap:12px; }
.settings-slider { flex:1; -webkit-appearance:none; appearance:none; height:6px; border-radius:3px; background:rgba(255,255,255,.1); outline:none; }
.settings-slider::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%; background:linear-gradient(180deg,#ffcfa8,#ff9e64); border:2px solid #1a1b26; cursor:pointer; }
.settings-slider::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:linear-gradient(180deg,#ffcfa8,#ff9e64); border:2px solid #1a1b26; cursor:pointer; }
.settings-slider-val { font-family:'Fira Code',monospace; font-size:12px; color:var(--tx); min-width:40px; text-align:right; }


.hd-gold-box { display:flex; align-items:baseline; gap:6px; }
.hd-amount { font-family:'Cinzel',serif; font-size:24px; font-weight:900; color:var(--gdl); text-shadow:0 2px 8px rgba(251,191,36,.3); }
.hd-gems { font-family:'Fira Code',monospace; font-size:11px; color:var(--gm); padding:4px 10px; border-radius:12px; background:rgba(192,132,252,.12); border:1px solid rgba(192,132,252,.25); cursor:pointer; display:flex; align-items:center; gap:4px; transition:all .2s; }
.hd-gems:active { background:rgba(192,132,252,.2); }

/* Bottom Navigation */
.bnav { position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:480px; display:flex; background:linear-gradient(180deg,#1a1a1a,#0e0e0e); border-top:2px solid var(--gd); z-index:30; padding:4px 0; padding-bottom:max(4px, env(safe-area-inset-bottom)); box-shadow:0 -4px 24px rgba(0,0,0,.6),0 -1px 12px rgba(255,158,100,.1); }
.bnav::before { content:''; position:absolute; top:-3px; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,rgba(255,158,100,.25),rgba(122,162,247,.2),transparent); }
.bnav-btn { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; padding:8px 0 6px; background:none; border:none; cursor:pointer; color:#9a9a9a; transition:color .2s; -webkit-tap-highlight-color:transparent; }
.bnav-btn:active { transform:scale(.95); }
.bnav-icon { font-size:20px; line-height:1; }
.bnav-label { font-family:'Cinzel',serif; font-size:9px; font-weight:700; letter-spacing:.5px; text-shadow:0 1px 2px rgba(0,0,0,.4); }
.bnav-on { color:inherit; }
.bnav-on .bnav-icon { filter:drop-shadow(0 0 8px currentColor); }
.bnav-on .bnav-label { text-shadow:0 0 8px currentColor; font-weight:900; border-bottom:2px solid currentColor; padding-bottom:1px; }
.bnav-pulse { color:var(--mod-allies) !important; animation:bnav-pulse 1.4s ease-in-out infinite; }
.bnav-pulse .bnav-icon { filter:drop-shadow(0 0 6px var(--mod-allies)) drop-shadow(0 0 12px var(--mod-allies)); }
.bnav-pulse .bnav-label { text-shadow:0 0 8px var(--mod-allies); font-weight:900; }
@keyframes bnav-pulse {
  0%, 100% { transform:translateY(0); filter:brightness(1); }
  50%      { transform:translateY(-2px); filter:brightness(1.35); }
}

/* Buy Quantity */
.qty-row { display:flex; gap:6px; padding:8px 12px; justify-content:flex-end; background:var(--bg2); }
.qty { padding:8px 16px; font-family:'Fira Code',monospace; font-size:12px; font-weight:700; background:linear-gradient(180deg,#222,#151515); color:#c0c0c0; border:2px solid #444; border-radius:8px; cursor:pointer; transition:all .15s; min-height:36px; -webkit-tap-highlight-color:transparent; box-shadow:0 2px 4px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.08); text-shadow:0 1px 2px rgba(0,0,0,.5); }
.qty:hover { border-color:#666; color:#e0e0e0; }
.qty:active { transform:scale(.95); }
.qty-on { background:linear-gradient(180deg,#ffcfa8,#ff9e64) !important; color:#1a1b26 !important; border-color:#1a1b26 !important; box-shadow:0 2px 12px rgba(255,158,100,.4),inset 0 1px 0 rgba(255,255,255,.3) !important; text-shadow:none !important; }

/* Venture List */
.vent-list { padding:12px 8px 20px; }
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
.tier-badge { font-family:'Cinzel',serif; font-size:9px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; margin-left:6px; padding:2px 7px; border-radius:10px; border:1px solid rgba(0,0,0,.35); text-shadow:0 1px 1px rgba(0,0,0,.5); vertical-align:middle; }

/* Progress Bar */
.bar-out { height:14px; background:#1a1b26; border-radius:7px; overflow:hidden; border:1px solid var(--bd); box-shadow:inset 0 2px 4px rgba(0,0,0,.4); margin-bottom:3px; position:relative; }
.bar-in { height:100%; border-radius:6px; position:relative; overflow:hidden; }
.bar-in::after { content:''; position:absolute; inset:0; background:repeating-linear-gradient(-45deg,transparent,transparent 4px,rgba(255,255,255,.08) 4px,rgba(255,255,255,.08) 8px); background-size:16px 100%; animation:stripe 1.2s linear infinite; }
@keyframes stripe { 0%{background-position:0 0} 100%{background-position:16px 0} }
.bar-time { position:absolute; right:6px; top:50%; transform:translateY(-50%); font-family:'Fira Code',monospace; font-size:9px; font-weight:600; color:var(--txb); text-shadow:0 1px 3px rgba(0,0,0,.8); z-index:2; }

/* Milestone */
.vms { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); display:flex; align-items:center; flex-wrap:wrap; gap:4px; }
.vms-n { color:var(--gd); }
.vms-syn { color:var(--gn); font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(52,211,153,.1); letter-spacing:.3px; }

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
.comp-row { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; margin-bottom:6px; background:var(--sf); border:1px solid var(--bd); border-left:4px solid var(--bd); border-radius:8px; }
.comp-info { display:flex; align-items:center; gap:12px; }
.comp-icon { width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid; box-shadow:0 2px 8px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.1); overflow:hidden; flex-shrink:0; }
.comp-prof { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); margin-top:1px; }
.comp-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; color:var(--txb); }
.comp-desc { font-size:10px; color:var(--txd); font-style:italic; }
.comp-hired { font-family:'Fira Code',monospace; font-size:11px; color:var(--gn); font-weight:700; }
.comp-locked { font-size:11px; color:var(--txd); }
.comp-btn { padding:10px 18px; font-family:'Cinzel',serif; font-size:11px; font-weight:700; background:linear-gradient(180deg,var(--sf2),var(--sf)); color:var(--txd); border:2px solid var(--bd); border-radius:6px; cursor:pointer; transition:all .2s; display:flex; align-items:center; gap:2px; min-height:40px; -webkit-tap-highlight-color:transparent; }
.comp-btn:hover:not(:disabled) { border-color:var(--gd); }
.comp-btn:disabled { opacity:.3; cursor:default; }
.comp-btn-afford { background:linear-gradient(180deg,#9ece6a,#6fa33e); color:#1a2a0a; border-color:#2a3a15; box-shadow:0 3px 8px rgba(0,0,0,.4),0 0 14px rgba(158,206,106,.25); }
.comp-btn-afford:hover { filter:brightness(1.1); box-shadow:0 3px 8px rgba(0,0,0,.4),0 0 20px rgba(158,206,106,.35); }

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
.up-bonus-syn { color:var(--accent); background:rgba(122,162,247,.12); }
.up-bonus-drop { color:#f7768e; background:rgba(247,118,142,.1); }
.up-next-gains { display:flex; flex-wrap:wrap; gap:4px; margin:4px 0 6px; }
.up-next-gain { font-family:'Fira Code',monospace; font-size:9px; color:var(--gd); padding:1px 5px; border-radius:3px; background:rgba(224,175,104,.1); }
.up-next-gain-syn { color:var(--accent); background:rgba(122,162,247,.12); }
.up-next-gain-drop { color:#f7768e; background:rgba(247,118,142,.1); }
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
.prest-progress-wrap { position:relative; height:14px; background:#1a1b26; border-radius:7px; overflow:hidden; border:1px solid var(--bd); margin-top:16px; margin-bottom:8px; }
.prest-progress-bar { height:100%; background:linear-gradient(90deg,var(--gmd),var(--gm)); border-radius:6px; transition:width .5s ease; }
.prest-progress-text { position:absolute; right:8px; top:50%; transform:translateY(-50%); font-family:'Fira Code',monospace; font-size:9px; color:var(--txb); text-shadow:0 1px 3px rgba(0,0,0,.8); z-index:2; }
.prest-hint { font-family:'Fira Code',monospace; font-size:10px; color:var(--txd); margin-top:8px; display:flex; align-items:center; justify-content:center; gap:3px; flex-wrap:wrap; }
.prest-breakdown { background:var(--sf); border:1px solid var(--bd); border-radius:10px; padding:12px 14px; margin-top:14px; }
.prest-break-row { display:flex; justify-content:space-between; align-items:center; font-family:'Fira Code',monospace; font-size:11px; color:var(--txd); padding:4px 0; }
.prest-break-row + .prest-break-row { border-top:1px dashed rgba(255,255,255,.05); }
.prest-break-row span:last-child { font-weight:700; }
.prest-break-preview { margin-top:4px; padding-top:8px !important; border-top:1px solid var(--bd) !important; color:var(--txb); }
.prest-break-preview span:last-child { font-family:'Cinzel',serif; font-size:14px; }

/* Footer */
.ft { display:flex; justify-content:space-between; align-items:center; padding:8px 16px; border-top:1px solid var(--bd); background:var(--bg2); }
.ft-text { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); }
.ft-reset { font-family:'Fira Code',monospace; font-size:9px; color:var(--rd); background:none; border:1px solid rgba(239,68,68,.2); border-radius:4px; padding:6px 14px; cursor:pointer; min-height:36px; }

/* Focus & Accessibility */
.cc button:focus-visible, .cc .eq-slot:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
.watch-info-btn { min-width:28px; min-height:28px; }
.watch-modal-close { min-width:32px; min-height:32px; }
.settings-cog { min-width:32px; min-height:32px; display:flex; align-items:center; justify-content:center; }

/* Scrollbar */
.cc ::-webkit-scrollbar { width:4px; }
.cc ::-webkit-scrollbar-track { background:transparent; }
.cc ::-webkit-scrollbar-thumb { background:var(--bd); border-radius:2px; }

/* Loot Toast */
.loot-toast { position:fixed; top:140px; left:50%; transform:translateX(-50%); background:var(--bg2); border:2px solid; border-radius:10px; padding:10px 20px; z-index:50; text-align:center; min-width:220px; max-width:360px; animation:toast-in .3s ease-out; box-shadow:0 4px 20px rgba(0,0,0,.6); pointer-events:none; }
.loot-toast-out { animation:toast-out .7s ease-in forwards; }
@keyframes toast-in { from { opacity:0; transform:translateX(-50%) translateY(-20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
@keyframes toast-out { from { opacity:1; } to { opacity:0; transform:translateX(-50%) translateY(-20px); } }
.loot-toast-icon { width:40px; height:40px; margin-bottom:4px; }
.loot-toast-rarity { font-family:'Fira Code',monospace; font-size:9px; text-transform:uppercase; letter-spacing:1.5px; display:block; margin-bottom:2px; }
.loot-toast-name { font-family:'Cinzel',serif; font-size:14px; font-weight:700; display:block; }
.loot-toast-desc { font-size:10px; color:var(--txd); margin-top:4px; display:block; }

/* Offline Earnings Banner */
.offline-banner { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:linear-gradient(135deg,#1a1f30,#111520); border:2px solid var(--gd); border-radius:14px; padding:20px 32px 24px; z-index:60; text-align:center; min-width:280px; max-width:360px; animation:toast-in .4s ease-out; box-shadow:0 8px 40px rgba(0,0,0,.7),0 0 20px rgba(255,158,100,.15); cursor:pointer; }
.offline-title { font-family:'Cinzel',serif; font-size:18px; font-weight:900; color:var(--gd); letter-spacing:2px; margin-bottom:10px; }
.offline-amount { font-size:13px; color:var(--tx); line-height:1.6; display:flex; align-items:center; justify-content:center; gap:4px; flex-wrap:wrap; }
.offline-amount strong { color:var(--gdl); font-size:16px; }
.offline-dismiss { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); margin-top:12px; opacity:.5; }

/* Milestone Toast */
.milestone-toast { position:fixed; top:140px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,#2a2000,#1a1500); border:2px solid var(--gold); border-radius:10px; padding:10px 20px; z-index:50; text-align:center; min-width:220px; max-width:360px; animation:toast-in .3s ease-out; box-shadow:0 4px 20px rgba(0,0,0,.6),0 0 12px rgba(251,191,36,.15); pointer-events:none; }
.milestone-toast-title { font-family:'Fira Code',monospace; font-size:9px; text-transform:uppercase; letter-spacing:1.5px; display:block; margin-bottom:2px; color:var(--gold); }
.milestone-toast-name { font-family:'Cinzel',serif; font-size:14px; font-weight:700; display:block; color:var(--txb); }
.milestone-toast-desc { font-size:10px; color:var(--txd); margin-top:4px; display:block; }

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
.inv-item-icon { width:32px; height:32px; flex-shrink:0; margin-right:8px; }
.inv-item-hdr { display:flex; align-items:center; }
.inv-item-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; flex:1; }
.inv-item-qty { font-family:'Fira Code',monospace; font-size:11px; color:var(--txd); }
.inv-item-rarity { font-family:'Fira Code',monospace; font-size:9px; text-transform:uppercase; letter-spacing:1px; margin:2px 0; }
.inv-item-desc { font-size:10px; color:var(--txd); font-style:italic; }
.inv-item-actions { display:flex; align-items:center; justify-content:space-between; margin-top:6px; }
.inv-equip-btn { font-family:'Cinzel',serif; font-size:10px; font-weight:700; padding:4px 12px; border-radius:6px; border:1px solid var(--accent,#7aa2f7); color:var(--accent,#7aa2f7); background:rgba(122,162,247,.1); cursor:pointer; transition:all .2s; }
.inv-equip-btn:hover { background:rgba(122,162,247,.25); color:#fff; }
.inv-item-equipped { font-family:'Fira Code',monospace; font-size:9px; color:var(--gn,#9ece6a); }
.inv-item-all-eq { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); font-style:italic; }
.inv-combine-btn { font-family:'Cinzel',serif; font-size:10px; font-weight:700; padding:4px 12px; border-radius:6px; border:1px solid #a855f7; color:#a855f7; background:rgba(168,85,247,.1); cursor:pointer; transition:all .2s; }
.inv-combine-btn:hover { background:rgba(168,85,247,.25); color:#e9d5ff; border-color:#c084fc; }
.inv-combine-progress { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); font-style:italic; }
.inv-sacrifice-btn { font-family:'Cinzel',serif; font-size:10px; font-weight:700; padding:4px 12px; border-radius:6px; border:1px solid #ef4444; color:#ef4444; background:rgba(239,68,68,.1); cursor:pointer; transition:all .2s; }
.inv-sacrifice-btn:hover { background:rgba(239,68,68,.25); color:#fca5a5; border-color:#f87171; }
.sacrifice-summary { background:rgba(239,68,68,.06); border:1px solid rgba(239,68,68,.15); border-radius:10px; padding:10px 14px; margin-bottom:12px; }
.sacrifice-hdr { font-family:'Cinzel',serif; font-size:13px; font-weight:700; color:#ef4444; margin-bottom:6px; }
.sacrifice-sub { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); font-weight:400; margin-left:4px; }
.sacrifice-tags { display:flex; flex-wrap:wrap; gap:6px; }
.sacrifice-tag { font-family:'Fira Code',monospace; font-size:10px; padding:2px 8px; border:1px solid; border-radius:4px; background:rgba(0,0,0,.2); }
.loot-toast-fused { font-family:'Fira Code',monospace; font-size:9px; text-transform:uppercase; letter-spacing:1.5px; display:block; margin-bottom:2px; color:#a855f7; }

/* ── Equip Picker Modal ── */
.equip-picker { max-width:420px; max-height:70vh; display:flex; flex-direction:column; }
.equip-picker .watch-modal-title { color:#e2e8ff; font-size:18px; }
.ep-list { overflow-y:auto; display:flex; flex-direction:column; gap:6px; padding:4px 0; max-height:50vh; scrollbar-width:thin; }
.ep-list::-webkit-scrollbar { width:3px; }
.ep-list::-webkit-scrollbar-thumb { background:var(--bd); border-radius:2px; }
.ep-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:var(--sf,#1a1b26); border:2px solid; border-radius:8px; cursor:pointer; transition:all .2s; }
.ep-item:hover { filter:brightness(1.2); }
.ep-item-icon { width:32px; height:32px; flex-shrink:0; }
.ep-item-info { flex:1; min-width:0; }
.ep-item-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; display:block; }
.ep-item-desc { font-size:10px; color:var(--txd); display:block; margin-top:2px; }
.ep-item-meta { text-align:right; flex-shrink:0; }
.ep-item-rarity { font-family:'Fira Code',monospace; font-size:9px; text-transform:uppercase; letter-spacing:.5px; display:block; }
.ep-item-qty { font-family:'Fira Code',monospace; font-size:9px; color:var(--txd); display:block; margin-top:2px; }
.ep-empty { text-align:center; color:var(--txd); font-size:12px; padding:30px 20px; opacity:.5; }

/* ── Equipment Panel ── */
.eq-panel { padding:12px 12px 8px; }
.eq-hdr { text-align:center; font-family:'Cinzel',serif; font-size:14px; color:var(--txb,#c0caf5); margin-bottom:8px; letter-spacing:1px; }
.eq-count { font-family:'Fira Code',monospace; font-size:11px; color:var(--txd,#565f89); margin-left:6px; }
.eq-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:12px; }
.eq-slot { background:#3a2d42; border:2px solid #7a6b8a; border-radius:8px; aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4px; cursor:pointer; transition:all .2s; overflow:hidden; }
.eq-slot-empty { border-style:dashed; border-color:#7a6b8a; }
.eq-slot-empty:hover { border-color:var(--accent,#7aa2f7); background:rgba(122,162,247,.12); }
.eq-slot-plus { font-size:20px; color:var(--bd2,#3b4261); font-weight:300; }
.eq-slot-filled { border-width:2px; }
.eq-slot-filled:hover { filter:brightness(1.15); }
.eq-slot-icon { width:28px; height:28px; flex-shrink:0; }
.eq-slot-name { font-family:'Cinzel',serif; font-size:9px; font-weight:700; text-align:center; line-height:1.2; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.eq-slot-rarity { font-family:'Fira Code',monospace; font-size:7px; text-transform:uppercase; letter-spacing:.5px; margin-top:2px; }
.eq-slot-locked { opacity:.5; cursor:default; background:#1e2a32; border-color:#4a6070; }
.eq-slot-label { font-size:8px; color:var(--txd,#565f89); text-align:center; margin-top:4px; line-height:1.2; }
.eq-slot-mtx { opacity:.7; cursor:pointer; border-style:dotted; background:#2a2418; border-color:#8a7030; }
.eq-slot-mtx:hover { opacity:.9; border-color:#c0a040; background:#342e1e; }
.eq-slot-mtx .eq-slot-label { color:#c0a040; }

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

/* ── Loading Screen ── */
.load-screen { position:fixed; inset:0; background:#0c0e14; z-index:200; animation:load-fade 0.4s ease 1.5s forwards; overflow:hidden; }
@keyframes load-fade { to { opacity:0; pointer-events:none; } }
.load-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; opacity:0; animation:load-bg-in 1.2s ease-out 0.1s forwards; }
@keyframes load-bg-in { to { opacity:1; } }
.load-overlay { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; padding-bottom:15vh; background:linear-gradient(to top, rgba(8,10,16,.95) 0%, rgba(8,10,16,.6) 30%, rgba(8,10,16,.1) 60%, transparent 100%); }
.load-title { text-align:center; margin-bottom:24px; animation:load-title-in .8s ease-out .3s both; }
@keyframes load-title-in { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
.load-castle-text { display:block; font-family:'Cinzel',serif; font-size:36px; font-weight:900; color:#e2e8ff; letter-spacing:10px; text-shadow:0 2px 20px rgba(0,0,0,.8),0 0 40px rgba(122,162,247,.15); }
.load-clicker-text { display:block; font-family:'Cinzel',serif; font-size:15px; font-weight:700; color:#f0b000; letter-spacing:14px; margin-top:6px; text-shadow:0 0 20px rgba(240,176,0,.3); }
.load-bar-track { width:220px; height:3px; background:rgba(255,255,255,.08); border-radius:2px; overflow:hidden; }
.load-bar-fill { height:100%; width:0; background:linear-gradient(90deg,#f0b000,#ffcc44); border-radius:2px; animation:load-progress 1.6s ease-out forwards; box-shadow:0 0 8px rgba(240,176,0,.4); }
@keyframes load-progress { to { width:100%; } }
.load-sub { font-family:'Fira Code',monospace; font-size:10px; color:#6a7090; margin-top:14px; letter-spacing:1.5px; animation:load-title-in .8s ease-out .5s both; }

/* ── Tutorial ── */
.tut-overlay { position:fixed; inset:0; background:rgba(0,0,0,.85); z-index:150; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px); animation:fadeIn .3s ease; }
.tut-card { background:linear-gradient(180deg,#1a1f30,#0e1018); border:1px solid #2a3050; border-radius:16px; padding:32px 28px 24px; max-width:360px; width:90%; text-align:center; box-shadow:0 12px 48px rgba(0,0,0,.7); animation:tut-slide .4s ease; }
@keyframes tut-slide { from { opacity:0; transform:translateY(20px) scale(.95); } to { opacity:1; transform:translateY(0) scale(1); } }
.tut-progress { display:flex; gap:6px; justify-content:center; margin-bottom:20px; }
.tut-dot { width:8px; height:8px; border-radius:50%; background:#2a3050; transition:all .3s; }
.tut-dot-on { background:#f0b000; box-shadow:0 0 8px rgba(240,176,0,.4); transform:scale(1.3); }
.tut-dot-done { background:#6fa33e; }
.tut-icon { font-size:40px; margin-bottom:12px; line-height:1; }
.tut-title { font-family:'Cinzel',serif; font-size:20px; font-weight:900; color:#e2e8ff; margin-bottom:10px; letter-spacing:1px; }
.tut-text { font-size:13px; color:#a0aac0; line-height:1.7; margin-bottom:24px; }
.tut-actions { display:flex; gap:10px; justify-content:center; }
.tut-btn { font-family:'Cinzel',serif; font-size:13px; font-weight:700; padding:10px 24px; border-radius:8px; cursor:pointer; transition:all .2s; min-width:100px; }
.tut-btn-back { background:transparent; border:1px solid #3a4466; color:#8090b0; }
.tut-btn-back:hover { border-color:#5a6690; color:#c0caf5; }
.tut-btn-next { background:linear-gradient(180deg,#3a5080,#2a3860); border:1px solid #4a6090; color:#e2e8ff; }
.tut-btn-next:hover { background:linear-gradient(180deg,#4a60a0,#3a4880); box-shadow:0 0 12px rgba(122,162,247,.2); }
.tut-btn-start { background:linear-gradient(180deg,#9ece6a,#6fa33e); border:1px solid #2a3a15; color:#1a2a0a; }
.tut-btn-start:hover { filter:brightness(1.1); box-shadow:0 0 16px rgba(158,206,106,.3); }
.tut-skip { display:block; margin:16px auto 0; background:none; border:none; color:#565f89; font-family:'Fira Code',monospace; font-size:10px; cursor:pointer; transition:color .2s; }
.tut-skip:hover { color:#8090b0; }

/* Settings tutorial button */
.settings-tutorial-btn { width:100%; padding:8px 0; font-family:'Cinzel',serif; font-size:12px; font-weight:700; background:transparent; border:1px solid #3a4466; color:#8090b0; border-radius:6px; cursor:pointer; transition:all .2s; }
.settings-tutorial-btn:hover { border-color:#5a6690; color:#e2e8ff; }

/* ── Prestige Sub-tabs ── */
.prest-subtabs { display:flex; gap:0; margin-bottom:16px; border-radius:8px; overflow:hidden; border:1px solid var(--bd); }
.prest-subtab, .prest-subtab-on { flex:1; padding:8px 4px; font-family:'Cinzel',serif; font-size:10px; font-weight:700; background:var(--sf); border:none; color:var(--txd); cursor:pointer; transition:all .2s; }
.prest-subtab-on { background:var(--gm,#bb9af7); color:#1a1b26; }
.prest-subtab:hover { background:var(--sf2); }

/* ── Skill Tree ── */
.skill-tree { padding:4px 0; }
.skill-tree-title { text-align:center; font-family:'Cinzel',serif; font-size:16px; font-weight:900; color:var(--gm); letter-spacing:2px; margin-bottom:8px; }
.skill-tree-budget { text-align:center; font-family:'Fira Code',monospace; font-size:11px; color:var(--txd); margin-bottom:16px; display:flex; align-items:center; justify-content:center; gap:4px; }
.skill-tier { margin-bottom:16px; }
.skill-tier-locked { opacity:.35; pointer-events:none; }
.skill-tier-label { font-family:'Fira Code',monospace; font-size:10px; color:var(--txd); text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; }
.skill-tier-req { color:var(--gm); }
.skill-tier-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.skill-node { background:var(--sf); border:2px solid var(--bd); border-radius:8px; padding:10px 8px; text-align:center; cursor:default; transition:all .2s; }
.skill-node:disabled { cursor:default; }
.skill-buyable { cursor:pointer; border-color:var(--gm); }
.skill-buyable:hover { background:rgba(187,154,247,.1); box-shadow:0 0 12px rgba(187,154,247,.2); }
.skill-owned { background:rgba(187,154,247,.15); border-color:var(--gm); box-shadow:inset 0 0 12px rgba(187,154,247,.1); }
.skill-cost { font-family:'Fira Code',monospace; font-size:9px; color:var(--gm); display:flex; align-items:center; justify-content:center; gap:2px; margin-bottom:4px; }
.skill-name { font-family:'Cinzel',serif; font-size:11px; font-weight:700; color:var(--txb); display:block; margin-bottom:2px; }
.skill-desc { font-size:9px; color:var(--txd); display:block; }
.skill-owned .skill-name { color:var(--gm); }

/* ── Achievements ── */
.ach-panel { padding:4px 0; }
.ach-bonus { font-family:'Fira Code',monospace; font-size:11px; color:var(--gold,#fbbf24); text-align:center; margin-bottom:12px; }
.ach-list { display:flex; flex-direction:column; gap:6px; }
.ach-card { display:flex; align-items:center; gap:10px; background:var(--sf); border:1px solid var(--bd); border-radius:8px; padding:10px 12px; transition:all .2s; }
.ach-unlocked { border-color:rgba(251,191,36,.3); background:rgba(251,191,36,.05); }
.ach-locked { opacity:.4; }
.ach-icon { font-size:18px; flex-shrink:0; width:44px; height:44px; display:flex; align-items:center; justify-content:center; }
.ach-icon-img { width:44px; height:44px; object-fit:contain; display:block; filter:drop-shadow(0 2px 4px rgba(0,0,0,.5)); }
.ach-locked .ach-icon-img { filter:grayscale(1) brightness(.55) drop-shadow(0 2px 4px rgba(0,0,0,.5)); }
.ach-info { flex:1; min-width:0; }
.ach-name { font-family:'Cinzel',serif; font-size:12px; font-weight:700; color:var(--txb); display:block; }
.ach-desc { font-size:10px; color:var(--txd); display:block; margin-top:2px; }
.ach-unlocked .ach-name { color:var(--gold,#fbbf24); }

/* Achievement Toast */
.achievement-toast { position:fixed; top:100px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,#2a2000,#1a1500); border:2px solid var(--gold,#fbbf24); border-radius:10px; padding:12px 24px; z-index:55; text-align:center; min-width:240px; max-width:360px; animation:toast-in .3s ease-out; box-shadow:0 4px 20px rgba(0,0,0,.6),0 0 20px rgba(251,191,36,.2); pointer-events:none; }
.ach-toast-icon { font-size:24px; display:block; margin-bottom:4px; }
.ach-toast-img { width:56px; height:56px; object-fit:contain; display:block; margin:0 auto 4px; filter:drop-shadow(0 2px 6px rgba(251,191,36,.4)); }
.ach-toast-label { font-family:'Fira Code',monospace; font-size:8px; text-transform:uppercase; letter-spacing:2px; color:var(--gold,#fbbf24); display:block; margin-bottom:4px; }
.ach-toast-name { font-family:'Cinzel',serif; font-size:15px; font-weight:900; color:#fff; display:block; }
.ach-toast-desc { font-size:10px; color:var(--txd); margin-top:4px; display:block; }

/* ── Dungeon Events ── */
.event-banner { position:sticky; top:var(--hd-h,112px); z-index:25; margin:0 0 8px; padding:12px 16px; border:2px solid; border-radius:10px; text-align:center; cursor:pointer; box-shadow:0 4px 24px rgba(0,0,0,.6); background:linear-gradient(135deg,#1a1f30,#0e1018); }
.event-pending { animation:event-pulse 1s ease-in-out infinite alternate; }
@keyframes event-pulse { from { box-shadow:0 4px 24px rgba(0,0,0,.6); } to { box-shadow:0 4px 32px rgba(0,0,0,.6),0 0 24px var(--evt-glow,rgba(251,191,36,.3)); } }
.event-title { font-family:'Cinzel',serif; font-size:16px; font-weight:900; display:block; letter-spacing:2px; text-shadow:0 0 12px currentColor; }
.event-desc { font-size:11px; color:var(--txd); display:block; margin-top:4px; }
.event-timer { font-family:'Fira Code',monospace; font-size:10px; color:var(--txb); display:block; margin-top:4px; }
.event-countdown-bar { height:4px; background:rgba(255,255,255,.1); border-radius:2px; overflow:hidden; margin-top:8px; }
.event-countdown-fill { height:100%; border-radius:2px; transition:width .1s linear; }
.event-remaining { font-family:'Fira Code',monospace; font-size:10px; color:var(--txb); margin-top:4px; display:block; }
.event-clicks { font-family:'Cinzel',serif; font-size:32px; font-weight:900; color:var(--gold,#fbbf24); display:block; line-height:1; }
.event-boss { animation:boss-shake 0.08s ease-in-out infinite; user-select:none; -webkit-user-select:none; }
@keyframes boss-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-2px)} 75%{transform:translateX(2px)} }
.event-active { cursor:default; }
`;

