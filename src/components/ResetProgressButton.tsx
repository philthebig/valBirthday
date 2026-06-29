interface ResetProgressButtonProps {
  onReset: () => void;
  variant?: 'ghost' | 'inline' | 'prominent';
}

export function ResetProgressButton({ onReset, variant = 'ghost' }: ResetProgressButtonProps) {
  const handleClick = () => {
    const ok = window.confirm(
      'Réinitialiser toute la progression, les photos et les énigmes?\n\nCette action est irréversible.',
    );
    if (ok) onReset();
  };

  if (variant === 'inline') {
    return (
      <button type="button" className="reset-inline" onClick={handleClick}>
        ↺ Réinitialiser (test)
      </button>
    );
  }

  if (variant === 'prominent') {
    return (
      <button type="button" className="btn btn--ghost btn--reset-prominent" onClick={handleClick}>
        ↺ Réinitialiser la progression (test)
      </button>
    );
  }

  return (
    <button type="button" className="btn btn--ghost btn--reset" onClick={handleClick}>
      ↺ Réinitialiser la progression
    </button>
  );
}
