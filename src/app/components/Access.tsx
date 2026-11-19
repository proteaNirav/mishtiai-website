import React, { useEffect, useRef, useState } from "react";

const INTAKE_PATH = "/api/early-access";
const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const PRIVACY_MAIL = "niraventp@gmail.com";

type Status = "idle" | "sending" | "success" | "error";

type IntakeConfig = {
  enabled: boolean;
  siteKey: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          theme?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

function isLocalHost() {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${TURNSTILE_SCRIPT}"]`,
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("turnstile")), {
        once: true,
      });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile"));
    document.head.appendChild(script);
  });
}

export function Access() {
  const [config, setConfig] = useState<IntakeConfig | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const [token, setToken] = useState("");
  const widgetHost = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadConfig() {
      try {
        const response = await fetch(INTAKE_PATH, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("unavailable");
        const data = (await response.json()) as IntakeConfig;
        if (!cancelled) {
          setConfig({
            enabled: Boolean(data.enabled && data.siteKey),
            siteKey: data.siteKey || "",
          });
        }
      } catch {
        if (!cancelled) setConfig({ enabled: false, siteKey: "" });
      }
    }
    loadConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!config?.enabled || !config.siteKey || !widgetHost.current) return;
    let removed = false;

    async function mountWidget() {
      try {
        await loadTurnstile();
        if (removed || !widgetHost.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(widgetHost.current, {
          sitekey: config.siteKey,
          theme: "dark",
          callback: (value) => setToken(value),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      } catch {
        if (isLocalHost()) setToken("dev-local");
      }
    }

    mountWidget();
    const timeout = window.setTimeout(() => {
      if (!token && isLocalHost()) setToken("dev-local");
    }, 8000);

    return () => {
      removed = true;
      window.clearTimeout(timeout);
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [config]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorDetail("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
      processingAcknowledged: data.get("intake_processing_acknowledged") === "yes",
      turnstileToken: token || (isLocalHost() ? "dev-local" : ""),
    };

    try {
      const response = await fetch(INTAKE_PATH, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Mishti-Intake": "1",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (response.ok && result.ok) {
        setStatus("success");
        form.reset();
        setToken(isLocalHost() ? "dev-local" : "");
        if (widgetId.current && window.turnstile) {
          window.turnstile.reset(widgetId.current);
        }
        return;
      }
      setStatus("error");
      setErrorDetail(result.error || "submit_failed");
    } catch {
      setStatus("error");
      setErrorDetail("network");
    }
  }

  const intakeReady = Boolean(config?.enabled);
  const canSubmit = intakeReady && (Boolean(token) || isLocalHost()) && status !== "sending";

  return (
    <section id="access" className="py-24 px-6 bg-background">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
          Limited Early Access
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Get Access to Controlled AI Execution
        </h2>
        <p className="text-muted-foreground mb-10">
          Submit an early-access request for review. Access is not automatic, and no
          response deadline is guaranteed. This public website does not grant access
          to the separate private Founder Console.
        </p>

        <div className="mb-10 text-left max-w-[700px] mx-auto">
          <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• We review your use case and system requirements</li>
            <li>• We evaluate fit for governed AI execution</li>
            <li>• We may email you for more details if the request is suitable for the current pilot</li>
            <li>• Selected teams get guided onboarding access</li>
          </ul>
        </div>

        {config && !intakeReady && (
          <p className="mb-8 text-sm text-muted-foreground">
            Same-origin intake is not active on this host yet. Email{" "}
            <a
              className="underline text-primary"
              href={`mailto:${PRIVACY_MAIL}?subject=Mishti%20AI%20Access%20Request`}
            >
              {PRIVACY_MAIL}
            </a>{" "}
            for early-access questions.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left" action={INTAKE_PATH} method="post">
          <label className="sr-only" htmlFor="access-name">
            Full name
          </label>
          <input
            id="access-name"
            type="text"
            name="name"
            placeholder="Full Name"
            required
            autoComplete="name"
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
          />

          <label className="sr-only" htmlFor="access-email">
            Work email
          </label>
          <input
            id="access-email"
            type="email"
            name="email"
            placeholder="Work Email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
          />

          <label className="sr-only" htmlFor="access-company">
            Company
          </label>
          <input
            id="access-company"
            type="text"
            name="company"
            placeholder="Company / Organization"
            autoComplete="organization"
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
          />

          <label className="sr-only" htmlFor="access-message">
            Use case
          </label>
          <textarea
            id="access-message"
            name="message"
            placeholder="What do you want to use Mishti AI for?"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
          />

          <div className="hidden" aria-hidden="true">
            <label htmlFor="access-website">Website</label>
            <input id="access-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="space-y-2 rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="intake_processing_acknowledged"
                value="yes"
                required
                className="mt-1"
              />
              <span>
                I understand that this request, including my contact details and
                message, is submitted to Mishti AI on this same website for review.
                Cloudflare provides bot protection and stores the submission for the
                operator. See the{" "}
                <a className="underline text-primary" href="#privacy">
                  privacy information
                </a>
                .
              </span>
            </label>
            <p>
              Please share only business information needed to evaluate your request.
              Do not include passwords, secrets, health information, or confidential data.
            </p>
          </div>

          <div ref={widgetHost} className="flex justify-center min-h-[65px]" />

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-60"
          >
            {status === "sending" ? "Submitting..." : "Submit Access Request"}
          </button>

          {status === "success" && (
            <p className="text-[#14f195] text-center">
              Request received. We will review it; no response deadline is guaranteed.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-center">
              Something went wrong{errorDetail ? ` (${errorDetail})` : ""}. Please email{" "}
              <a className="underline" href={`mailto:${PRIVACY_MAIL}`}>{PRIVACY_MAIL}</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
