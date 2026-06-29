interface ProgressBarProps {
  progress: number;
  current: number;
  total: number;
  label?: string;
  full?: boolean;
}

export function ProgressBar({
  progress,
  current,
  total,
  label = 'Énigmes résolues',
  full = false,
}: ProgressBarProps) {
  const pct = full ? 100 : progress;
  return (
    <div
      className={['progress', full && 'progress--full'].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={full ? total : current}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      <div className="progress__labels">
        <span className="progress__label">{label}</span>
        <span className="progress__count">
          {full ? total : current} / {total}
        </span>
      </div>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
