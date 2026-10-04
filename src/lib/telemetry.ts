/**
 * Centralized Client-Side Telemetry & Core Web Vitals Monitoring
 */

export type MetricRating = "good" | "needs-improvement" | "poor";

export interface WebVitalMetric {
  id: string;
  name: "CLS" | "FCP" | "FID" | "INP" | "LCP" | "TTFB";
  value: number;
  rating: MetricRating;
  delta: number;
}

export function logMetric(metric: WebVitalMetric) {
  if (process.env.NODE_ENV === "development") {
    const color =
      metric.rating === "good"
        ? "#10b981"
        : metric.rating === "needs-improvement"
          ? "#f59e0b"
          : "#ef4444";
    console.log(
      `%c[Web Vitals] ${metric.name}: ${Math.round(metric.value * 100) / 100} (${metric.rating})`,
      `color: ${color}; font-weight: bold;`,
    );
  }

  // Dispatch custom event for extensible monitoring / analytics integrations
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("sheesh:web-vital", { detail: metric }),
    );
  }
}

export function captureClientError(error: Error, context?: Record<string, unknown>) {
  console.error("[Runtime Telemetry]", error, context);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("sheesh:error", {
        detail: {
          message: error.message,
          stack: error.stack,
          context,
          timestamp: Date.now(),
        },
      }),
    );
  }
}
