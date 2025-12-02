import { Startup } from '../types';
import { getSectorStyle, getSectorIcon } from '../data/startups';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface StartupCardProps {
  startup: Startup;
  index: number;
}

const StartupCard = ({ startup, index }: StartupCardProps) => {
  const style = getSectorStyle(index);
  const icon = getSectorIcon(startup.sector);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex-shrink-0 w-[320px] md:w-[380px] pt-4 pb-4"
    >
      {/* Card Container com hover lift usando margin ao invés de transform para não cortar */}
      <div 
        className="relative h-[420px] md:h-[480px] rounded-2xl overflow-hidden transition-all duration-300 ease-out cursor-pointer"
        style={{ 
          backgroundColor: style.bg,
          marginTop: isHovered ? '0px' : '12px',
          marginBottom: isHovered ? '12px' : '0px',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0,0,0,0.35)' 
            : '0 10px 30px -10px rgba(0,0,0,0.2)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20h20v20H20V20zM0 0h20v20H0V0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative p-6 flex flex-col h-full">
          {/* Top Section */}
          <div className="flex items-start justify-between mb-4">
            {/* Sector Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${style.accent}30` }}
            >
              {icon}
            </div>

            {/* Category Badge */}
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ 
                backgroundColor: startup.category === 'incubada' ? '#FAF0D6' : 'transparent',
                color: startup.category === 'incubada' ? style.bg : '#FAF0D6',
                border: startup.category === 'incubada' ? 'none' : '1px solid rgba(250,240,214,0.5)'
              }}
            >
              {startup.category === 'incubada' ? 'Incubada' : 'Pré-Incubada'}
            </span>
          </div>

          {/* Startup Name */}
          <h3 
            className="text-2xl md:text-3xl font-bold font-playfair mb-2 leading-tight"
            style={{ color: '#FAF0D6' }}
          >
            {startup.name}
          </h3>

          {/* Sector */}
          <p 
            className="text-sm font-medium mb-4 opacity-70"
            style={{ color: '#FAF0D6' }}
          >
            {startup.sector}
          </p>

          {/* Description */}
          <p 
            className="text-sm leading-relaxed flex-grow opacity-80"
            style={{ color: '#FAF0D6' }}
          >
            {startup.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4 mb-4">
            {startup.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{ 
                  backgroundColor: 'rgba(250,240,214,0.1)',
                  color: '#FAF0D6',
                  border: '1px solid rgba(250,240,214,0.2)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div 
            className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid rgba(250,240,214,0.2)' }}
          >
            {startup.founded && (
              <span className="text-xs opacity-60" style={{ color: '#FAF0D6' }}>
                Desde {startup.founded}
              </span>
            )}
            
            {startup.website && (
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ 
                  backgroundColor: 'rgba(250,240,214,0.15)',
                  color: '#FAF0D6'
                }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Accent line at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: style.accent }}
        />
      </div>
    </div>
  );
};

export default StartupCard;
