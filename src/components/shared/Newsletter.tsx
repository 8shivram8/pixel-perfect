import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  return (
    <section id="newsletter" className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <h2 className="display text-4xl md:col-span-6 md:text-6xl">A little more intention, in your inbox.</h2>
        <div className="md:col-span-5 md:col-start-8 md:pt-4">
          {state === "done" ? (
            <div aria-live="polite">
              <p className="display text-3xl">Thank you.</p>
              <p className="mt-3 text-sm text-ink-muted">You’re on the list as {email}. (Demo — no email will be sent.)</p>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
              }}
            >
              <label htmlFor="nl-email" className="eyebrow text-ink-muted">Email address</label>
              <div className="mt-3 flex border-b border-ink-muted/50 focus-within:border-ink-foreground">
                <input id="nl-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} placeholder="you@example.com" className="flex-1 bg-transparent py-3 text-base outline-none placeholder:text-ink-muted/60" aria-invalid={state === "error"} />
                <button className="text-sm font-semibold tracking-wide">Subscribe →</button>
              </div>
              {state === "error" && <p className="mt-2 text-xs text-terracotta">Please enter a valid email address.</p>}
              <p className="mt-5 text-xs leading-relaxed text-ink-muted">One letter a month: new objects, small rituals, nothing more. Unsubscribe any time. We never share your address.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
