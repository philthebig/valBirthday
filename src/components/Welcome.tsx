import { config } from '../config';
import { huntStops } from '../data/hunt';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="welcome">
      <div className="welcome__sparkles" aria-hidden="true">
        ✨ 🎂 👶 ✨
      </div>
      <p className="welcome__eyebrow">Joyeux {config.age}e anniversaire</p>
      <h1 className="welcome__title">{config.recipientName}</h1>
      <p className="welcome__subtitle">{config.huntSubtitle}</p>
      {config.familyTagline && <p className="welcome__family">{config.familyTagline}</p>}
      <div className="welcome__card">
        <p className="welcome__message">{config.birthdayMessage}</p>
      </div>
      <button type="button" className="btn btn--primary btn--pulse" onClick={onStart}>
        Commencer l'aventure 🗺️
      </button>
      <p className="welcome__footer">
        {huntStops.length} énigmes à deviner — la destination reste secrète jusqu'à ce que tu trouves!
      </p>
    </div>
  );
}
