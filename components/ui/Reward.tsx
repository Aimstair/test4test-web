import { Coins, Flame } from "lucide-react";

/** The app's token icon (lucide Coins, #EAB308). */
export function TokenIcon({ className = "size-[1em]" }: { className?: string }) {
  return <Coins className={`inline-block shrink-0 text-token ${className}`} aria-label="tokens" role="img" />;
}

/** The app's karma icon (lucide Flame, #EF4444). */
export function KarmaIcon({ className = "size-[1em]" }: { className?: string }) {
  return <Flame className={`inline-block shrink-0 text-karma ${className}`} aria-label="karma" role="img" />;
}

/** "+20 🪙" style amount: number followed by the token or karma icon. */
export function Reward({
  value,
  kind,
  className = "",
  iconClassName = "size-[1em]",
}: {
  value: string | number;
  kind: "token" | "karma";
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-[0.25em] whitespace-nowrap ${className}`}>
      {value}
      {kind === "token" ? <TokenIcon className={iconClassName} /> : <KarmaIcon className={iconClassName} />}
    </span>
  );
}

/** Renders copy where ":token:" and ":karma:" are replaced by their icons. */
export function IconText({ text, iconClassName = "size-[1em]" }: { text: string; iconClassName?: string }) {
  const parts = text.split(/(:token:|:karma:)/);
  return (
    <>
      {parts.map((p, i) =>
        p === ":token:" ? (
          <TokenIcon key={i} className={`mx-[0.15em] -mt-[0.1em] align-middle ${iconClassName}`} />
        ) : p === ":karma:" ? (
          <KarmaIcon key={i} className={`mx-[0.15em] -mt-[0.1em] align-middle ${iconClassName}`} />
        ) : (
          p
        ),
      )}
    </>
  );
}
