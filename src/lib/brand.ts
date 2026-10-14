// Change the brand name in one place.
export const BRAND = {
  name: "FORM & STILL",
  short: "Form & Still",
  tagline: "Objects for a more considered everyday.",
  email: "hello@formandstill.example",
};

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const SHIPPING = {
  freeThreshold: 2500,
  standard: 149,
  express: 249,
};

export const DISCOUNTS: Record<string, number> = { STILL10: 0.1, WELCOME15: 0.15 };
