"use client";

import React, { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Widget boundary error:", error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-8 border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3 text-signal">
            <AlertTriangle size={20} />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {this.props.fallbackTitle ?? "Failed to load section"}
            </h3>
          </div>
          <p className="mt-2 text-sm text-muted">
            This module encountered an issue while loading. You can attempt to refresh it.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-4 inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-signal hover:text-signal"
          >
            <RefreshCw size={13} /> Retry Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
