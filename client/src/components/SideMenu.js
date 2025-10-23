import React, { useState } from 'react';
import './SideMenu.css';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleMenu} className="toggle-btn">
        {isOpen ? '<' : '>'}
      </button>
      <nav>
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/questionnaires">Questionnaires</a>
          </li>
          <li>
            <a href="/documents">Documents</a>
          </li>
          <li>
            <a href="/reports">Reports</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
