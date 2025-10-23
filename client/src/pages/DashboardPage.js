import React from 'react';
import SideMenu from '../components/SideMenu';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <SideMenu />
      <main className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </main>
    </div>
  );
};

export default DashboardPage;
