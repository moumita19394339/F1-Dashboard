import React from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  imageSrc: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  subtitle,
  badge,
  imageSrc,
  imageAlt = "",
  children,
}: PageHeroProps) {
  return (
    <div className="relative h-36 w-full overflow-hidden rounded-md animate-reveal-up">
      {/* Photo layer */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/95 via-[#09090B]/75 to-[#09090B]/30" />

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E10600] to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-between px-6">
        <div>
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[0.65rem] font-semibold uppercase tracking-wider mb-2"
                  style={{ backgroundColor: 'rgba(225,6,0,0.18)', color: '#FF4D4A' }}>
              {badge}
            </span>
          )}
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {subtitle}
            </p>
          )}
        </div>

        {children && (
          <div className="flex items-center gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
