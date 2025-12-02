// Componente de grafos decorativos para uso em diferentes seções
// Cores da marca: #01304A (azul escuro), #669BBB (azul claro), #780000 (vinho), #C1121F (vermelho), #FAF0D6 (creme)

interface GraphDecorationProps {
  position?: 'left' | 'right' | 'both';
  color?: 'blue' | 'red' | 'light';
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
}

const GraphDecoration = ({ 
  position = 'both', 
  color = 'blue',
  size = 'medium',
  opacity = 0.1
}: GraphDecorationProps) => {
  
  const getColor = () => {
    switch (color) {
      case 'red': return '#780000';
      case 'light': return '#FAF0D6';
      default: return '#01304A';
    }
  };
  
  const getSize = () => {
    switch (size) {
      case 'small': return { width: 300, height: 350 };
      case 'large': return { width: 600, height: 700 };
      default: return { width: 450, height: 520 };
    }
  };
  
  const fillColor = getColor();
  const dimensions = getSize();
  
  const LeftGraph = () => (
    <svg 
      className="absolute -left-20 top-1/4 pointer-events-none hidden md:block"
      style={{ 
        width: dimensions.width, 
        height: dimensions.height,
        opacity 
      }}
      viewBox="0 0 300 350"
    >
      {/* Linhas de conexão - expandidas verticalmente */}
      <g stroke={fillColor} strokeWidth="1" fill="none">
        {/* Rede superior */}
        <line x1="60" y1="30" x2="130" y2="50" />
        <line x1="130" y1="50" x2="180" y2="30" />
        <line x1="180" y1="30" x2="240" y2="60" />
        {/* Rede central-superior */}
        <line x1="20" y1="100" x2="80" y2="80" />
        <line x1="80" y1="80" x2="130" y2="50" />
        <line x1="80" y1="80" x2="60" y2="130" />
        <line x1="60" y1="130" x2="130" y2="150" />
        <line x1="130" y1="150" x2="180" y2="120" />
        <line x1="180" y1="120" x2="240" y2="60" />
        <line x1="180" y1="120" x2="220" y2="150" />
        {/* Rede central */}
        <line x1="20" y1="180" x2="80" y2="160" />
        <line x1="80" y1="160" x2="60" y2="130" />
        <line x1="80" y1="160" x2="150" y2="200" />
        <line x1="150" y1="200" x2="130" y2="150" />
        <line x1="150" y1="200" x2="200" y2="180" />
        <line x1="200" y1="180" x2="220" y2="150" />
        {/* Rede inferior */}
        <line x1="20" y1="250" x2="60" y2="230" />
        <line x1="60" y1="230" x2="80" y2="160" />
        <line x1="60" y1="230" x2="100" y2="260" />
        <line x1="100" y1="260" x2="150" y2="200" />
        <line x1="100" y1="260" x2="160" y2="280" />
        <line x1="160" y1="280" x2="200" y2="250" />
        <line x1="200" y1="250" x2="200" y2="180" />
        {/* Rede base */}
        <line x1="40" y1="310" x2="100" y2="260" />
        <line x1="100" y1="330" x2="160" y2="280" />
        <line x1="160" y1="280" x2="220" y2="310" />
      </g>
      
      {/* Nós */}
      <g fill={fillColor}>
        <circle cx="60" cy="30" r="4" />
        <circle cx="130" cy="50" r="5">
          <animate attributeName="r" values="5;7;5" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="30" r="4" />
        <circle cx="240" cy="60" r="4" />
        <circle cx="20" cy="100" r="3" />
        <circle cx="80" cy="80" r="4" />
        <circle cx="60" cy="130" r="5" />
        <circle cx="130" cy="150" r="4" />
        <circle cx="180" cy="120" r="5">
          <animate attributeName="r" values="5;6;5" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="220" cy="150" r="4" />
        <circle cx="20" cy="180" r="4" />
        <circle cx="80" cy="160" r="4" />
        <circle cx="150" cy="200" r="5">
          <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="180" r="4" />
        <circle cx="20" cy="250" r="3" />
        <circle cx="60" cy="230" r="4" />
        <circle cx="100" cy="260" r="5" />
        <circle cx="160" cy="280" r="4" />
        <circle cx="200" cy="250" r="4" />
        <circle cx="40" cy="310" r="3" />
        <circle cx="100" cy="330" r="4" />
        <circle cx="220" cy="310" r="3" />
      </g>
    </svg>
  );
  
  const RightGraph = () => (
    <svg 
      className="absolute -right-20 top-1/4 pointer-events-none hidden md:block"
      style={{ 
        width: dimensions.width, 
        height: dimensions.height,
        opacity 
      }}
      viewBox="0 0 300 350"
    >
      {/* Linhas de conexão - expandidas verticalmente */}
      <g stroke={fillColor} strokeWidth="1" fill="none">
        {/* Rede superior */}
        <line x1="240" y1="30" x2="170" y2="50" />
        <line x1="170" y1="50" x2="120" y2="30" />
        <line x1="120" y1="30" x2="60" y2="60" />
        {/* Rede central-superior */}
        <line x1="280" y1="100" x2="220" y2="80" />
        <line x1="220" y1="80" x2="170" y2="50" />
        <line x1="220" y1="80" x2="240" y2="130" />
        <line x1="240" y1="130" x2="170" y2="150" />
        <line x1="170" y1="150" x2="120" y2="120" />
        <line x1="120" y1="120" x2="60" y2="60" />
        <line x1="120" y1="120" x2="80" y2="150" />
        {/* Rede central */}
        <line x1="280" y1="180" x2="220" y2="160" />
        <line x1="220" y1="160" x2="240" y2="130" />
        <line x1="220" y1="160" x2="150" y2="200" />
        <line x1="150" y1="200" x2="170" y2="150" />
        <line x1="150" y1="200" x2="100" y2="180" />
        <line x1="100" y1="180" x2="80" y2="150" />
        {/* Rede inferior */}
        <line x1="280" y1="250" x2="240" y2="230" />
        <line x1="240" y1="230" x2="220" y2="160" />
        <line x1="240" y1="230" x2="200" y2="260" />
        <line x1="200" y1="260" x2="150" y2="200" />
        <line x1="200" y1="260" x2="140" y2="280" />
        <line x1="140" y1="280" x2="100" y2="250" />
        <line x1="100" y1="250" x2="100" y2="180" />
        {/* Rede base */}
        <line x1="260" y1="310" x2="200" y2="260" />
        <line x1="200" y1="330" x2="140" y2="280" />
        <line x1="140" y1="280" x2="80" y2="310" />
      </g>
      
      {/* Nós */}
      <g fill={fillColor}>
        <circle cx="240" cy="30" r="4" />
        <circle cx="170" cy="50" r="5">
          <animate attributeName="r" values="5;7;5" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="30" r="4" />
        <circle cx="60" cy="60" r="4" />
        <circle cx="280" cy="100" r="3" />
        <circle cx="220" cy="80" r="4" />
        <circle cx="240" cy="130" r="5" />
        <circle cx="170" cy="150" r="4" />
        <circle cx="120" cy="120" r="5">
          <animate attributeName="r" values="5;6;5" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="150" r="4" />
        <circle cx="280" cy="180" r="4" />
        <circle cx="220" cy="160" r="4" />
        <circle cx="150" cy="200" r="5">
          <animate attributeName="r" values="5;7;5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="180" r="4" />
        <circle cx="280" cy="250" r="3" />
        <circle cx="240" cy="230" r="4" />
        <circle cx="200" cy="260" r="5" />
        <circle cx="140" cy="280" r="4" />
        <circle cx="100" cy="250" r="4" />
        <circle cx="260" cy="310" r="3" />
        <circle cx="200" cy="330" r="4" />
        <circle cx="80" cy="310" r="3" />
      </g>
    </svg>
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {(position === 'left' || position === 'both') && <LeftGraph />}
      {(position === 'right' || position === 'both') && <RightGraph />}
    </div>
  );
};

export default GraphDecoration;
