/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
'use strict';

const openWindow = document.querySelectorAll('.open-window');
const popUp = document.querySelector('.popup')!;
const hamburgerMenu = document.querySelector('.hamburger')!;
const navBar = document.querySelector('nav')!;
const windowElem = document.querySelector<HTMLElement>('.window')!;

openWindow.forEach((button) => {
    button.addEventListener('click', function (event) {
        popUp.querySelector('h2')!.textContent = (
            event.target! as HTMLElement
        ).textContent;
        windowElem.style.display = 'block';
    });
});

document.querySelector('#close')!.addEventListener('click', function () {
    windowElem.style.display =
        windowElem.style.display === 'none' ? 'flex' : 'none';
});

hamburgerMenu.addEventListener('click', () => {
    navBar.style.display = navBar.style.display === 'none' ? 'flex' : 'none';
    if (navBar.style.display === 'flex') {
        navBar.querySelectorAll('span').forEach((item) => {
            item.addEventListener('click', () => {
                navBar.style.display = 'none';
            });
        });
    }
});

window.addEventListener('resize', () => {
    navBar.style.display = window.matchMedia('(max-width: 1000px)').matches
        ? 'none'
        : 'block';
});
