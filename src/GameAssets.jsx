/**
 * Castle Clicker — Game Asset Components
 *
 * Provides <VentureIcon>, <CompanionPortrait>, <CurrencyIcon>
 * that load AI-generated images from /assets/ with graceful
 * fallback to colored placeholder circles when images aren't
 * generated yet.
 */

import { useState } from "react";

// ── Asset path maps (match generate-assets.mjs output) ──

const VENTURE_FILES = [
  "ventures/torch.png",
  "ventures/goblin_dagger.png",
  "ventures/mushroom.png",
  "ventures/skeleton.png",
  "ventures/trap_gear.png",
  "ventures/potion.png",
  "ventures/dragon.png",
  "ventures/dungeon_gate.png",
  "ventures/demon_gate.png",
  "ventures/void_portal.png",
];

const COMPANION_FILES = [
  "companions/squire_finn_sprite.png",
  "companions/rogue_nyx_sprite.png",
  "companions/fungi_sage_sprite.png",
  "companions/bone_collector_sprite.png",
  "companions/trapmaster_vex_sprite.png",
  "companions/chest_warden_sprite.png",
  "companions/dragonkeeper_ash_sprite.png",
  "companions/lich_morrn_sprite.png",
  "companions/demon_binder_kael_sprite.png",
  "companions/void_priest_zara_sprite.png",
];

const UI_FILES = {
  goldCoin: "ui/gold_coin.png",
  soulGem: "ui/soul_gem.png",
  locked: "ui/locked_icon.png",
  auto: "ui/auto_badge.png",
};

// ── Base path for assets ──
const ASSET_BASE = "/assets";

// ── Reusable image component with fallback ──
function GameImage({ src, alt, size, fallbackColor, style, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${fallbackColor}88, ${fallbackColor}33)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.4,
          ...style,
        }}
        title={alt}
      >
        ?
      </div>
    );
  }

  return (
    <img
      src={`${ASSET_BASE}/${src}`}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: "cover",
        borderRadius: "50%",
        imageRendering: "auto",
        ...style,
      }}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}

// ── Exported Components ──

/**
 * Venture icon by index (0–9).
 * Drop-in replacement for the SVG icon components.
 */
export function VentureIcon({ index, color = "#888", size = 28 }) {
  const file = VENTURE_FILES[index];
  if (!file) return null;

  return (
    <GameImage
      src={file}
      alt={`venture-${index}`}
      size={size}
      fallbackColor={color}
    />
  );
}

/**
 * Companion portrait by index (0–9).
 */
export function CompanionPortrait({ index, color = "#888", size = 22 }) {
  const file = COMPANION_FILES[index];
  if (!file) return null;

  return (
    <GameImage
      src={file}
      alt={`companion-${index}`}
      size={size}
      fallbackColor={color}
      style={{ borderRadius: "50%" }}
    />
  );
}

/**
 * Gold coin icon (replaces GoldCoin SVG).
 */
export function GoldCoinIcon({ size = 14 }) {
  return (
    <GameImage
      src={UI_FILES.goldCoin}
      alt="gold"
      size={size}
      fallbackColor="#f0c030"
      style={{ verticalAlign: "middle", marginRight: 2, display: "inline-block" }}
    />
  );
}

/**
 * Soul gem icon (replaces SoulGem SVG).
 */
export function SoulGemIcon({ size = 14 }) {
  return (
    <GameImage
      src={UI_FILES.soulGem}
      alt="soul gem"
      size={size}
      fallbackColor="#c084fc"
      style={{ verticalAlign: "middle", marginRight: 2, display: "inline-block" }}
    />
  );
}

/**
 * Background image URL helper.
 */
export function getBackgroundUrl(name) {
  return `${ASSET_BASE}/backgrounds/${name}.png`;
}
