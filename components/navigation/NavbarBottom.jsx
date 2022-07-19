import Link from 'next/link';
import React from 'react';
import { navBarItems, navBarMobileItems } from './NavbarItems';
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from 'react-icons/ai';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  const toggleNav = () => setNav(!nav);
  // Handle hiding the mobile menu when clicking outside of the menu icon
  useEffect(() => {
    const closeNav = (e) => {
      !e.target.classList.contains('menu-icon') && setNav(false);
    };
    document.addEventListener('click', closeNav);

    return () => {
      document.removeEventListener('click', closeNav);
    };
  }, []);

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 80) {
        setColor('green-400');
        setTextColor('black');
      } else {
        setColor('transparent');
        setTextColor('black');
      }
    };

    window.addEventListener('scroll', changeColor);
  }, []);

  return (
    <div
      className={`fixed left-0 bottom-0 sm:top-0 sm:bottom-auto w-full z-10 ease-in duration-300 bg-${color}`}
    >
      {/* Navbar */}
      <div className='max-w-[1240px] flex justify-between items-center pb-8 text-white m-auto'>
        {/* MobileIcon */}
        {/* <div className='block sm:hidden z-2' onClick={toggleNav}>
          {nav ? (
            <AiOutlineMenuFold size={30} className='menu-icon' />
          ) : (
            <AiOutlineMenuUnfold size={30} className='menu-icon' />
          )}
        </div> */}
        {/* DesktopNav */}
        {/* <ul className='hidden sm:flex gap-4 text-lg'>
          {navBarItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <a className='strokeMe'>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul> */}
        {/* DesktopNav */}

        {/* MobileNav */}
        <div
          className={`sm:hidden absolute flex left-0 w-full items-center text-lg bg-green-400 z-10`}
        >
          <ul className='flex flex-row w-full justify-evenly '>
            {navBarMobileItems.map((item) => (
              <li
                key={item.name}
                className='p-5 strokeMe text-xl font-bold border-x-2 border-black'
              >
                <Link href={item.href}>
                  <a>{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* MobileNav */}
      </div>
      {/* Navbar */}
    </div>
  );
}
