import React from 'react';
import { satelliteData } from '../data/satellites';
import type { OrbitType } from '../data/satellites';

interface NavMenuProps {
  activeOrbit: OrbitType;
  setActiveOrbit: (orbit: OrbitType) => void;
}

const orbitTypes: OrbitType[] = ['LEO', 'MEO', 'GEO', 'POLAR', 'SSO'];

const NavMenu: React.FC<NavMenuProps> = ({ activeOrbit, setActiveOrbit }) => {
  return (
    <div className="center-nav-container">
      <div className="center-nav-menu">
        {orbitTypes.map((type) => (
          <button
            key={type}
            className={`center-nav-button ${activeOrbit === type ? 'active' : ''}`}
            onClick={() => setActiveOrbit(type)}
            style={{ 
              color: satelliteData[type].color,
              borderColor: activeOrbit === type ? satelliteData[type].color : undefined,
              textShadow: activeOrbit === type ? `0 0 8px ${satelliteData[type].color}` : undefined
            }}
          >
            {satelliteData[type].title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
