import mug from "@/assets/p-mug.jpg";
import candle from "@/assets/p-candle.jpg";
import mat from "@/assets/p-mat.jpg";
import stand from "@/assets/p-stand.jpg";
import planter from "@/assets/p-planter.jpg";
import notebook from "@/assets/p-notebook.jpg";
import tissue from "@/assets/p-tissue.jpg";
import tray from "@/assets/p-tray.jpg";
import hero from "@/assets/hero.jpg";
import editorial from "@/assets/editorial.jpg";
import evening from "@/assets/evening.jpg";
import materials from "@/assets/materials.jpg";

export const images = { mug, candle, mat, stand, planter, notebook, tissue, tray, hero, editorial, evening, materials };

export type CategorySlug = "desk" | "drinkware" | "living" | "plants" | "stationery" | "workspace" | "gifts";

export const categories: { slug: CategorySlug | "all"; name: string; intro: string; image: string }[] = [
  { slug: "all", name: "All Products", intro: "Every object we make, gathered in one quiet place.", image: hero },
  { slug: "desk", name: "Desk Accessories", intro: "Trays, holders and mats that give each thing on your desk a place.", image: tray },
  { slug: "drinkware", name: "Drinkware", intro: "Stoneware made for the first cup and the slow refill.", image: mug },
  { slug: "living", name: "Candles & Living", intro: "Soft light and gentle scent for the hours after work.", image: evening },
  { slug: "plants", name: "Plants & Planters", intro: "Small greens in honest, weighty planters.", image: planter },
  { slug: "stationery", name: "Stationery", intro: "Paper goods for lists, ideas and the long view.", image: notebook },
  { slug: "workspace", name: "Laptop & Workspace", intro: "Ergonomic pieces that disappear into a well-made desk.", image: stand },
  { slug: "gifts", name: "Gifts & Bundles", intro: "Composed sets, ready to give — or keep.", image: editorial },
];

export type Color = { name: string; hex: string };
export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: CategorySlug;
  images: string[];
  colors: Color[];
  badge?: "Bestseller" | "New";
  inStock: boolean;
  newness: number; // higher = newer
  featured: number; // lower = more featured
  short: string;
  description: string;
  material: string;
  dimensions: string;
  care: string;
  includes?: string[];
};

const C = {
  porcelain: { name: "Porcelain", hex: "#EFEBE3" },
  ink: { name: "Ink", hex: "#232220" },
  olive: { name: "Olive", hex: "#858875" },
  clay: { name: "Clay", hex: "#B76E52" },
  stone: { name: "Stone", hex: "#CFC8BC" },
  graphite: { name: "Graphite", hex: "#4A4946" },
  silver: { name: "Silver", hex: "#C9C9C6" },
  oak: { name: "Oak", hex: "#C9A57A" },
  amber: { name: "Amber", hex: "#8A4B22" },
};

export const products: Product[] = [
  { id: "p1", slug: "sculpt-ceramic-mug", name: "Sculpt Ceramic Mug", price: 799, category: "drinkware", images: [mug, materials, hero], colors: [C.porcelain, C.ink, C.clay], badge: "Bestseller", inStock: true, newness: 3, featured: 1,
    short: "A speckled stoneware mug with a softly sculpted handle.", description: "Thrown in a weighty stoneware body and finished in a satin speckled glaze, Sculpt holds a generous pour and sits comfortably in two hands. The wave-formed handle was drawn to rest naturally against the fingers.", material: "Stoneware, satin glaze", dimensions: "Ø 8.5 cm × H 9.5 cm · 350 ml", care: "Dishwasher and microwave safe. Avoid sudden temperature changes." },
  { id: "p2", slug: "still-soy-candle", name: "Still Soy Candle", price: 999, category: "living", images: [candle, evening], colors: [C.amber], badge: "Bestseller", inStock: true, newness: 4, featured: 2,
    short: "Soy wax in smoked amber glass. Santal, cedar and a little smoke.", description: "A slow, even burn in a reusable amber vessel. Notes of sandalwood and cedar settle a room without filling it.", material: "Soy wax blend, cotton wick, amber glass", dimensions: "Ø 7.5 cm × H 9 cm · 180 g · approx. 40 h", care: "Trim the wick to 5 mm before each burn. Never leave unattended." },
  { id: "p3", slug: "everyday-desk-mat", name: "Everyday Desk Mat", price: 1499, category: "desk", images: [mat, hero], colors: [C.graphite, C.stone], inStock: true, newness: 5, featured: 3,
    short: "Dense wool-blend felt bound in a vegan leather edge.", description: "A quiet surface for keyboard, mouse and notebook. The felt dampens sound and the bound edge keeps it flat for years.", material: "Wool-blend felt, vegan leather binding", dimensions: "80 × 35 cm · 4 mm", care: "Spot clean with a damp cloth. Air dry flat." },
  { id: "p4", slug: "form-laptop-stand", name: "Form Laptop Stand", price: 2499, category: "workspace", images: [stand, hero], colors: [C.silver, C.graphite], badge: "New", inStock: true, newness: 9, featured: 4,
    short: "A single folded line of aluminium that lifts your screen to eye level.", description: "Raises most 11–16\" laptops by 15 cm for a more upright posture. Silicone pads protect the finish; the open spine lets air move.", material: "Anodised aluminium, silicone pads", dimensions: "26 × 22 × 15 cm · 1.1 kg", care: "Wipe with a soft dry cloth." },
  { id: "p5", slug: "little-green-planter", name: "Little Green Planter", price: 599, category: "plants", images: [planter, hero], colors: [C.stone, C.porcelain], inStock: true, newness: 6, featured: 5,
    short: "A small pothos in a matte cement-finish planter.", description: "Easy-going and forgiving, the pothos trails gently as it grows. Supplied in a nursery pot that sits inside the planter.", material: "Cement-finish ceramic, live plant", dimensions: "Planter Ø 12 cm × H 11 cm", care: "Bright indirect light. Water when the top soil feels dry." },
  { id: "p6", slug: "daily-notes-notebook", name: "Daily Notes Notebook", price: 399, category: "stationery", images: [notebook, hero], colors: [C.olive, C.ink, C.clay], badge: "Bestseller", inStock: true, newness: 2, featured: 6,
    short: "A5 linen-bound notebook with 192 dotted pages.", description: "Smooth 100 gsm paper that takes fountain pen ink well, a lay-flat binding and an elastic closure.", material: "Linen cover, 100 gsm paper", dimensions: "A5 · 14.8 × 21 cm · 192 pages", care: "Keep away from moisture." },
  { id: "p7", slug: "softline-tissue-holder", name: "Softline Tissue Holder", price: 699, category: "desk", images: [tissue, hero], colors: [C.porcelain, C.oak], inStock: true, newness: 7, featured: 7,
    short: "A rounded tissue box cover with a solid oak lid.", description: "Hides the packaging, keeps the essentials. The oak lid lifts away for refilling.", material: "Matte ABS body, oak lid", dimensions: "25 × 13.5 × 9 cm", care: "Wipe clean. Oil the lid occasionally." },
  { id: "p8", slug: "essential-desk-tray", name: "Essential Desk Tray", price: 899, category: "desk", images: [tray, materials], colors: [C.stone], inStock: true, newness: 8, featured: 8,
    short: "A shallow travertine-look tray for pens, keys and small things.", description: "Cast in a resin-stone composite with the pitted texture of natural travertine — weighty, cool to touch and lighter than stone.", material: "Resin-stone composite", dimensions: "24 × 11 × 2.5 cm", care: "Wipe with a damp cloth." },
  { id: "p9", slug: "ritual-espresso-cup", name: "Ritual Espresso Cup", price: 549, category: "drinkware", images: [mug, materials], colors: [C.porcelain, C.ink], badge: "New", inStock: true, newness: 10, featured: 9,
    short: "A small handle-free cup for espresso and cortado.", description: "The same speckled stoneware as Sculpt, scaled for short coffees.", material: "Stoneware, satin glaze", dimensions: "Ø 6.5 cm × H 6 cm · 90 ml", care: "Dishwasher safe." },
  { id: "p10", slug: "ember-travel-candle", name: "Ember Travel Candle", price: 599, category: "living", images: [candle, evening], colors: [C.amber], inStock: false, newness: 1, featured: 10,
    short: "A smaller pour of our Still blend for desks and shelves.", description: "The Still scent in a compact vessel — about 18 hours of soft light.", material: "Soy wax blend, cotton wick, amber glass", dimensions: "Ø 6 cm × H 6.5 cm · 90 g", care: "Trim the wick before each burn." },
  { id: "p11", slug: "felt-mouse-pad", name: "Felt Mouse Pad", price: 649, category: "workspace", images: [mat], colors: [C.graphite, C.stone], inStock: true, newness: 4, featured: 11,
    short: "A compact felt pad with a bound edge.", description: "A tracking-friendly felt surface in a size that fits beside any keyboard.", material: "Wool-blend felt, vegan leather binding", dimensions: "25 × 20 cm · 4 mm", care: "Spot clean." },
  { id: "p12", slug: "year-planner-diary", name: "Year Planner Diary", price: 899, category: "stationery", images: [notebook], colors: [C.olive, C.ink], inStock: true, newness: 6, featured: 12,
    short: "An undated weekly planner with a linen cover.", description: "Week-to-a-spread layout, monthly overviews and two ribbon markers. Start any time.", material: "Linen cover, 90 gsm paper", dimensions: "A5 · 224 pages", care: "Keep dry." },
  { id: "p13", slug: "the-focus-set", name: "The Focus Set", price: 3999, category: "gifts", images: [hero, stand, mat], colors: [], badge: "Bestseller", inStock: true, newness: 5, featured: 13,
    short: "Laptop stand, desk mat and notebook — a calmer desk in one box.", description: "Everything you need to reset a working surface, packed in our recycled-board gift box.", material: "See individual items", dimensions: "Gift box 40 × 30 × 18 cm", care: "See individual items.", includes: ["Form Laptop Stand", "Everyday Desk Mat", "Daily Notes Notebook"] },
  { id: "p14", slug: "the-slow-morning-set", name: "The Slow Morning Set", price: 2099, category: "gifts", images: [editorial, mug, candle], colors: [], inStock: true, newness: 7, featured: 14,
    short: "Mug, candle and notebook for unhurried mornings.", description: "A ritual in three parts — coffee, light and a page to think on.", material: "See individual items", dimensions: "Gift box 30 × 22 × 14 cm", care: "See individual items.", includes: ["Sculpt Ceramic Mug", "Still Soy Candle", "Daily Notes Notebook"] },
  { id: "p15", slug: "the-new-workspace-set", name: "The New Workspace Set", price: 2899, category: "gifts", images: [tray, tissue, planter], colors: [], badge: "New", inStock: true, newness: 9, featured: 15,
    short: "Tray, tissue holder, planter and mug for a new desk.", description: "A housewarming for the desk — four pieces that make a new space feel lived in.", material: "See individual items", dimensions: "Gift box 40 × 30 × 18 cm", care: "See individual items.", includes: ["Essential Desk Tray", "Softline Tissue Holder", "Little Green Planter", "Sculpt Ceramic Mug"] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getById = (id: string) => products.find((p) => p.id === id);
export const bestsellers = products.filter((p) => ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].includes(p.id));
export const bundles = products.filter((p) => p.category === "gifts");

export const priceRanges = [
  { id: "u700", label: "Under ₹700", min: 0, max: 699 },
  { id: "700-1500", label: "₹700 – ₹1,500", min: 700, max: 1500 },
  { id: "o1500", label: "Over ₹1,500", min: 1501, max: Infinity },
];
