'use client'

import React, { useEffect, useState } from "react";
import classes from "./BurgerMenu.module.scss";
import Link from "next/link";
import { BurgerMenuItems } from "../lib/BurgerMenu.helpers";
import { Button } from "@/shared/Button";

export function BurgerMenu({localizedTitles, btn} : {localizedTitles: string[], btn: string}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [width, setWidth] = useState<number | null>(null);;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {width !== null && width < 1355 && (
        <div className={classes.burgerMenu}>
      <button className={`${classes.burgerMenu__icon} ${isOpen ? classes.burgerMenu__icon__active : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={`${classes.burgerMenu__icon__line} ${isOpen ? classes.burgerMenu__icon__active__line : ''}`}></span>
        <span className={`${classes.burgerMenu__icon__line} ${isOpen ? classes.burgerMenu__icon__active__line : ''}`}></span>
        <span className={`${classes.burgerMenu__icon__line} ${isOpen ? classes.burgerMenu__icon__active__line : ''}`}></span>
      </button>
      <ul className={classes.burgerMenu__list} style={{ height: isOpen ? "auto" : "0", transition: "height 0.3s ease" }}>
        {BurgerMenuItems.map((item, index) => (
          <li className={classes.burgerMenu__list__item} key={item.href}>
            <Link className={classes.burgerMenu__list__item__link} href={item.href} prefetch>{localizedTitles?.[index] ?? item.title}</Link>
          </li>
        ))}
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0'}}>
          <Link href="/login">
            <Button style={{width: '95%', borderRadius: '8px'}} text={btn} />
          </Link>
        </div>
      </ul>
    </div>
      )}
      </>
  );
}
