"use client";

import { useState } from "react";
import { Copy, Check, MessageSquareQuote } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import type { ReplyVariant } from "@/lib/types";

interface Props {
  reply: ReplyVariant;
  highlighted?: boolean;
}

export function ReplyCard({ reply, highlighted }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(reply.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard can fail silently in unsupported contexts
    }
  };

  return (
    <Card
      className={
        highlighted
          ? "border-ember-500/40 shadow-glow"
          : ""
      }
    >
      <CardHeader>
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500/10 text-ember-300">
              <MessageSquareQuote className="h-3.5 w-3.5" />
            </span>
            <CardTitle>{reply.title}</CardTitle>
          </div>
          {highlighted && (
            <Badge tone="ember">Your preferred tone</Badge>
          )}
        </div>
        <p className="text-xs leading-relaxed text-ink-muted">{reply.useCase}</p>
      </CardHeader>
      <CardBody>
        <div className="rounded-xl border border-bg-border/70 bg-bg-soft/50 p-4">
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">
            {reply.text}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {reply.badges.map((b) => (
              <Badge key={b} tone="success">
                {b}
              </Badge>
            ))}
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onCopy}
            aria-live="polite"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy reply
              </>
            )}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
