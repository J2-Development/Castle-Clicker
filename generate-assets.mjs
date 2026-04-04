#!/usr/bin/env node
/**
 * Castle Capitalist — AI Asset Generator (Google Gemini)
 *
 * Generates all game art assets using Google Gemini's image generation.
 * Run:  npm run generate-assets
 *
 * Reads GEMINI_API_KEY from .env file automatically.
 * Assets are saved to /public/assets/ and referenced by the game at runtime.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// ─── Load .env ───────────────────────────────────────────────
try {
  const envPath = path.resolve(".env");
  const envFile = fs.readFileSync(envPath, "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq > 0) {
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch {}

// ─── Config ───────────────────────────────────────────────────
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("ERROR: Set GEMINI_API_KEY environment variable.");
  console.error("  Get one at: https://aistudio.google.com/apikey");
  process.exit(1);
}

const OUTPUT_DIR = path.resolve("public/assets");
const MANIFEST_PATH = path.resolve("public/assets/manifest.json");

// Shared style preamble — research-informed for consistency across all assets
// Key principles: warm torchlight from upper-left, cool blue-purple shadows,
// bold silhouettes readable at 40px, dark backgrounds matching game UI (#0d0f14)
const ART_STYLE_ICON = [
  "dark fantasy game icon, stylized illustration with painterly texture",
  "bold silhouette on dark background, circular composition",
  "warm torchlight rim lighting from upper left",
  "rich saturated signature color as primary accent",
  "cool blue-purple shadows for depth",
  "slight glow effect on focal point",
  "clean edges suitable for small display (40-56px)",
  "no text, no letters, centered subject",
  "dark stone background (#0d0f14)",
].join(", ");

const ART_STYLE_PORTRAIT = [
  "dark fantasy dungeon setting, bust portrait",
  "stylized illustration with bold outlines and painterly texture",
  "warm torchlight from upper left illuminating face",
  "detailed face and expression, game character art style",
  "cool blue-purple shadows on far side",
  "dark stone background with subtle ambient glow",
  "high detail, no text, square composition",
].join(", ");

const ART_STYLE_BG = [
  "dark fantasy dungeon interior, atmospheric perspective",
  "torch-lit with warm amber/orange light sources",
  "painterly digital illustration, game background",
  "moody lighting with cool blue-purple shadows",
  "stone architecture, sense of depth and scale",
  "no characters, no text",
].join(", ");

// ─── Asset Definitions ───────────────────────────────────────
// Each entry: { filename, subfolder, prompt, size }
// size is the desired WxH in pixels (Gemini will generate roughly this)

const ASSETS = {
  // ── Venture Icons (shown as 56px badges in-game) ──
  // Each uses the venture's signature color as primary accent.
  // Must pass the "silhouette test" — recognizable when squinting.
  ventures: [
    {
      filename: "torch.png",
      prompt: `A single flaming medieval torch mounted on a dungeon stone wall bracket, fire flickering with amber (#e8a023) and gold embers rising, bold torch silhouette, ${ART_STYLE_ICON}`,
    },
    {
      filename: "goblin_dagger.png",
      prompt: `A goblin's curved green-tinted (#6dba4a) dagger with poison dripping from blade, a small leather coin pouch tied to handle with gold coins spilling, bold weapon silhouette, ${ART_STYLE_ICON}`,
    },
    {
      filename: "mushroom.png",
      prompt: `A cluster of magical glowing mushrooms in vibrant pink-magenta (#c74f8e), bioluminescent spores floating upward, growing from cracked dungeon stone, bold fungal silhouette, ${ART_STYLE_ICON}`,
    },
    {
      filename: "skeleton.png",
      prompt: `An ancient skeleton warrior skull wearing a rusted iron helmet, one glowing cyan (#8bb8d0) eye socket, cobwebs and dust, bold skull silhouette centered, ${ART_STYLE_ICON}`,
    },
    {
      filename: "trap_gear.png",
      prompt: `A complex dungeon trap mechanism with interlocking bronze and iron gears, orange-red (#e85d3a) accent on central gear, chains and spring mechanism, bold mechanical silhouette, ${ART_STYLE_ICON}`,
    },
    {
      filename: "potion.png",
      prompt: `A bubbling alchemist potion in a round glass flask, swirling purple (#a855f7) liquid with golden sparkles inside, cork stopper, wisps of magical violet vapor, bold flask silhouette, ${ART_STYLE_ICON}`,
    },
    {
      filename: "dragon.png",
      prompt: `A fierce dragon head in profile, crimson red (#ef4444) scales, glowing amber eyes with slit pupils, smoke curling from nostrils, sharp swept-back horns, bold dragon silhouette, ${ART_STYLE_ICON}`,
    },
    {
      filename: "dungeon_gate.png",
      prompt: `An imposing stone dungeon archway with teal (#14b8a6) glowing runes carved into pillars, heavy iron portcullis half-raised, mysterious teal light beyond, bold arch silhouette, ${ART_STYLE_ICON}`,
    },
    {
      filename: "demon_gate.png",
      prompt: `A hellish volcanic portal with cracked obsidian frame, rivers of molten orange (#f97316) lava flowing around it, demonic runes glowing, heat distortion, bold portal silhouette, ${ART_STYLE_ICON}`,
    },
    {
      filename: "void_portal.png",
      prompt: `A swirling cosmic void portal, deep indigo and violet (#6366f1) energy spiraling inward to a bright white singularity, eldritch symbols orbiting, bold vortex silhouette, ${ART_STYLE_ICON}`,
    },
  ],

  // ── Companion Portraits (shown as 40px circles in-game) ──
  // Each companion's signature color should match their venture tier.
  // Warm torchlight from upper-left, cool shadows on right side.
  companions: [
    {
      filename: "squire_finn.png",
      prompt: `Young human squire boy with messy brown hair, holding a lit torch casting warm amber (#e8a023) light on his face, eager determined expression, simple leather armor with a torch emblem buckle, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "rogue_nyx.png",
      prompt: `Sly elven rogue woman with short dark hair and pointed ears, green (#6dba4a) hooded cloak, mischievous smirk, twin daggers crossed at collar, shadowy green-tinted lighting, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "fungi_sage.png",
      prompt: `Ancient mushroom-person sage, humanoid made of bark and fungus with glowing pink-magenta (#c74f8e) mushroom cap as hat, wise old eyes peering out, bioluminescent spores drifting upward, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "bone_collector.png",
      prompt: `Gaunt undead skeleton servant in tattered robes, glowing cyan (#8bb8d0) eyes in hollow sockets, carrying a sack of bones over shoulder, loyal dutiful expression not menacing, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "trapmaster_vex.png",
      prompt: `Clever gnome engineer with wild copper hair, brass goggles pushed up on forehead, orange-red (#e85d3a) sparks flying from a tiny gear in hand, soot-stained face, excited inventive grin, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "chest_warden.png",
      prompt: `Stout dwarf treasure guardian in heavy purple-tinted (#a855f7) plate armor, thick braided beard with gold rings woven in, stern protective expression, glowing amethyst chest emblem on breastplate, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "dragonkeeper_ash.png",
      prompt: `Scarred dragonborn warrior with dark crimson (#ef4444) scales, ember-orange eyes, battle-worn but noble expression, dragon tooth necklace, wisps of smoke rising from nostrils, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "lich_morrn.png",
      prompt: `Elegant lich sorcerer with a teal-glowing (#14b8a6) skull face beneath dark ornate hood, regal bearing, arcane teal energy crackling around bony fingers, ethereal and ancient, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "demon_binder_kael.png",
      prompt: `Tiefling warlock with orange-red skin, curved ram horns, burning orange (#f97316) eyes, dark ritual tattoos glowing on face and neck, hellfire reflected in irises, intense focused expression, ${ART_STYLE_PORTRAIT}`,
    },
    {
      filename: "void_priest_zara.png",
      prompt: `Ethereal void priestess with pale lavender skin, white glowing eyes with no pupils, flowing indigo (#6366f1) robes and hair that dissolves into cosmic stardust at the edges, serene otherworldly, ${ART_STYLE_PORTRAIT}`,
    },
  ],

  // ── Currency & UI Icons ──
  ui: [
    {
      filename: "gold_coin.png",
      prompt: `A single shiny gold coin with a castle tower emblem stamped on face, metallic amber (#f0c030) luster, slight golden glow, simple clean icon, ${ART_STYLE_ICON}`,
    },
    {
      filename: "soul_gem.png",
      prompt: `A single floating purple soul gem crystal, faceted amethyst (#c084fc) shape, inner violet glow pulsing, ethereal wisps of soul energy swirling around it, ${ART_STYLE_ICON}`,
    },
    {
      filename: "locked_icon.png",
      prompt: `A rusty iron padlock with heavy chains, dungeon-style lock with a faint amber keyhole glow, cold iron against dark stone, ${ART_STYLE_ICON}`,
    },
    {
      filename: "auto_badge.png",
      prompt: `A small circular emerald green (#4ade80) glowing rune badge with an infinity symbol etched in light, magical automation ward, green energy wisps, ${ART_STYLE_ICON}`,
    },
  ],

  // ── Backgrounds & Headers ──
  backgrounds: [
    {
      filename: "header_bg.png",
      prompt: `Wide panoramic view of a dark medieval castle interior great hall, massive stone pillars, flickering torches on walls casting warm amber pools of light, cobwebs, atmospheric fog, looking down a long corridor into darkness, cinematic composition, 3:1 aspect ratio banner, ${ART_STYLE_BG}`,
    },
    {
      filename: "dungeon_bg.png",
      prompt: `Dark dungeon chamber with wet stone walls, moss growing in mortar cracks, iron torch sconces with dying flames, puddles reflecting warm firelight, atmospheric perspective fading to cool shadow in the distance, portrait orientation tall format, ${ART_STYLE_BG}`,
    },
    {
      filename: "prestige_bg.png",
      prompt: `An ethereal cosmic void space with swirling purple (#c084fc) nebula clouds, floating amethyst crystal shards, mystical energy streams in violet and indigo, a glowing ascension portal in center, otherworldly transcendence scene, dark fantasy cosmic art, no text`,
    },
  ],
};

// ─── Generator ────────────────────────────────────────────────

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generateImage(genAI, asset, subfolder) {
  const outDir = path.join(OUTPUT_DIR, subfolder);
  await ensureDir(outDir);

  const outPath = path.join(outDir, asset.filename);

  // Skip if already generated
  if (fs.existsSync(outPath)) {
    console.log(`  SKIP  ${subfolder}/${asset.filename} (already exists)`);
    return { file: `${subfolder}/${asset.filename}`, status: "skipped" };
  }

  console.log(`  GEN   ${subfolder}/${asset.filename}`);
  console.log(`        "${asset.prompt.slice(0, 80)}..."`);

  // Models to try in order: gemini-2.0-flash (native image gen),
  // then gemini-2.5-flash-image (dedicated image model)
  const MODELS = [
    { name: "gemini-2.0-flash", config: { responseModalities: ["image", "text"] } },
    { name: "gemini-2.5-flash-image", config: { responseModalities: ["image", "text"] } },
  ];

  for (const modelDef of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelDef.name,
        generationConfig: modelDef.config,
      });

      const response = await model.generateContent(asset.prompt);
      const parts = response.response.candidates?.[0]?.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          await fs.promises.writeFile(outPath, buffer);
          console.log(`  DONE  ${subfolder}/${asset.filename} (${(buffer.length / 1024).toFixed(1)} KB) [${modelDef.name}]`);
          return { file: `${subfolder}/${asset.filename}`, status: "generated" };
        }
      }

      console.log(`  RETRY ${subfolder}/${asset.filename} (no image from ${modelDef.name}, trying next...)`);
    } catch (err) {
      console.log(`  RETRY ${subfolder}/${asset.filename} (${modelDef.name}: ${err.message.slice(0, 60)}...)`);
    }
  }

  console.error(`  FAIL  ${subfolder}/${asset.filename} — all models failed`);
  return { file: `${subfolder}/${asset.filename}`, status: "failed" };
}

async function main() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Castle Capitalist — AI Asset Generator (Gemini)");
  console.log("═══════════════════════════════════════════════════\n");

  const genAI = new GoogleGenerativeAI(API_KEY);

  await ensureDir(OUTPUT_DIR);

  const manifest = {};
  const categories = Object.entries(ASSETS);
  let total = 0;
  let generated = 0;
  let failed = 0;
  let skipped = 0;

  for (const [category, assets] of categories) {
    console.log(`\n── ${category.toUpperCase()} (${ assets.length} assets) ──`);
    manifest[category] = [];

    for (const asset of assets) {
      total++;
      const result = await generateImage(genAI, asset, category);
      manifest[category].push(result);

      if (result.status === "generated") generated++;
      else if (result.status === "skipped") skipped++;
      else failed++;

      // Rate limiting — small delay between requests
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  // Write manifest
  await fs.promises.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log("\n═══════════════════════════════════════════════════");
  console.log(`  COMPLETE: ${generated} generated, ${skipped} skipped, ${failed} failed (${total} total)`);
  console.log(`  Manifest: ${MANIFEST_PATH}`);
  console.log("═══════════════════════════════════════════════════\n");

  if (failed > 0) {
    console.log("To retry failed assets, delete them and run again.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
