// En el componente Admin
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Sidebar from './Sidebar.jsx';
import { AiOutlineMenu } from "react-icons/ai";
import fakNews from '../../assets/faknews-logo.svg';

function Menu() {
  const [title, setTitle] = useState('');

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setContent('');
  };

  const handleToggleSidebar = () => {
    sidebar.classList.toggle('show-sidebar')
    pages.classList.toggle('show-pages')
  };

  useEffect(() => {
    if (title) {
      handleSearch();
    } 
  }, [title]);

  return (
    <>
      <Sidebar handleSectionChange={handleSectionChange} />
      <header className="header">
        <div className="header__container container">
          <div className="header__toggle" id="header-toggle" onClick={handleToggleSidebar}>
            <AiOutlineMenu />
          </div>
          <a href="#" className="header__logo">
            <img src={fakNews} alt="" />
          </a>
        </div>
      </header>
      <div className='headerspace'></div>
    </>
  );
}

export default Menu;