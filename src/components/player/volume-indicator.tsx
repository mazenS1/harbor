import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useT } from "@/lib/i18n";
import { NORMAL_FRACTION, VOL_MAX, boostColor, fractionFromValue } from "./transport/transport-utils";

export type VolumeIndicatorState = {
  visible: boolean;
  volume: number;
  muted: boolean;
  seq: number;
};

export function VolumeIndicator({ state }: { state: VolumeIndicatorState }) {
  const t = useT();
  const volume = Math.max(0, Math.min(VOL_MAX, state.volume));
  const muted = state.muted || volume <= 0;
  const fillPct = muted ? 0 : fractionFromValue(volume) * 100;
  const pct = Math.round((muted ? 0 : volume) * 100);
  const boosting = !muted && volume > 1.001;
  const color = boostColor(volume);
  const Icon = muted ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div
      key={state.seq}
      className={`pointer-events-none absolute left-1/2 top-8 z-30 flex min-w-[11rem] -translate-x-1/2 items-center gap-3 rounded-full border border-white/12 bg-black/78 py-2 ps-3 pe-4 text-white shadow-[0_18px_48px_-18px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-[opacity,transform] duration-200 ease-out ${
        state.visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12">
        <Icon size={18} strokeWidth={2.15} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            {t("Volume")}
          </span>
          <span
            className="font-mono text-[13px] font-bold tabular-nums leading-none"
            style={{ color: boosting ? color : "rgba(255,255,255,0.92)" }}
          >
            {muted ? t("Muted") : `${pct}%`}
          </span>
        </span>
        <span className="relative h-1.5 overflow-hidden rounded-full bg-white/15">
          <span
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-150 ease-out"
            style={{ width: `${fillPct}%`, background: boosting ? color : "rgba(255,255,255,0.92)" }}
          />
          <span
            className="absolute inset-y-[-2px] w-px bg-white/35"
            style={{ left: `${NORMAL_FRACTION * 100}%` }}
          />
        </span>
      </span>
    </div>
  );
}
