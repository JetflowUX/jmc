import React from 'react';

interface Badge {
  label: string;
  icon?: string; // optional SVG path or URL
}

interface TrustBadgesProps {
  badges: Badge[];
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ badges }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-4">
      {badges.map((b, i) => (
        <div key={i} className="flex items-center text-white">
          {b.icon && <img src={b.icon} alt={b.label} className="h-6 w-6 mr-2" />}
          <span className="text-sm font-medium">{b.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
