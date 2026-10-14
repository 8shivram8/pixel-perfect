import { DISCOUNTS, SHIPPING } from "./brand";

export function totals(subtotal: number, code: string | null, method: "standard" | "express" = "standard") {
  const rate = code ? DISCOUNTS[code] ?? 0 : 0;
  const discount = Math.round(subtotal * rate);
  const after = subtotal - discount;
  let shipping = subtotal === 0 ? 0 : after >= SHIPPING.freeThreshold ? 0 : SHIPPING.standard;
  if (method === "express" && subtotal > 0) shipping += SHIPPING.express;
  return { discount, shipping, total: after + shipping, remainingForFree: Math.max(0, SHIPPING.freeThreshold - after) };
}
