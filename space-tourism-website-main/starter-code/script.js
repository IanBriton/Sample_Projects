"use strict";
//Selection of the hamburger
const menuBtn = document.querySelector(".menu-btn");
const imgHamburger = document.querySelector(".hamburger-image");
const menuNav = document.querySelector(".nav-links");
const menuItems = document.querySelectorAll(".nav-link");

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  menuNav.classList.toggle("open");
  menuItems.forEach((item) => {
    item.classList.toggle("open");
  });

  if (menuNav.classList.contains("open")) {
    imgHamburger.src = "./assets/shared/icon-close.svg";
  } else {
    imgHamburger.src = "./assets/shared/icon-hamburger.svg";
  }
}
