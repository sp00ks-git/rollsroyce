import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/questionnaires">Questionnaires</Link>
          </li>
          <li>
            <Link to="/documents">Documents</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
