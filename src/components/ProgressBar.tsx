interface ProgressBarProps {
  progress: number;
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ progress, current, total, label = 'Énigmes résolues' }: ProgressBarProps) {
  return (
    <div className="progress" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div className="progress__labels">
        <span className="progress__label">{label}</span>
        <span className="progress__count">
          {current} / {total}
        </span>
      </div>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
