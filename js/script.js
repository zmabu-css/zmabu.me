'use strict';



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});




/**
 * Header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});



/**
 * Element tilt effect
 */

const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {

  /** get tilt element center position */
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${tiltPosY - (tiltPosY * 2)}deg)`;

}

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});



/**
 * Tab content
 */

const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {

  if (!(lastActiveTabBtn === this)) {

    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent = document.querySelector(`[data-tab-content="${this.dataset.tabBtn}"]`);

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;

  }

}

addEventOnElements(tabBtns, "click", filterContent);



/**
 * Custom cursor
 */

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [...document.querySelectorAll("button"), ...document.querySelectorAll("a")];

window.addEventListener("mousemove", function (event) {

  const posX = event.clientX;
  const posY = event.clientY;

  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);

});

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});

// Adjusted JavaScript for Slider Navigation
document.addEventListener('DOMContentLoaded', () => {
  const sliderList = document.querySelector('.slider-list');
  const sliderItems = document.querySelectorAll('.slider-item');

  const slideRightBtn = document.getElementById('slideRight');
  const slideLeftBtn = document.getElementById('slideLeft');

  // Function to calculate total width of all slider items
  function calculateScrollWidth() {
    let totalWidth = 0;
    sliderItems.forEach((item) => {
      totalWidth += item.getBoundingClientRect().width; 
    });
    return totalWidth;
  }

  function scrollSlider(direction) {
    const maxScrollLeft = calculateScrollWidth() - sliderList.offsetWidth;
    const scrollAmount = sliderList.offsetWidth / 3; 

    if (direction === 'right') {
      sliderList.scrollBy({ left: scrollAmount, top: 0, behavior: 'smooth' });
    } else {
      sliderList.scrollBy({ left: -scrollAmount, top: 0, behavior: 'smooth' });
    }

    // Disable buttons at start/end
    slideRightBtn.disabled = sliderList.scrollLeft >= maxScrollLeft;
    slideLeftBtn.disabled = sliderList.scrollLeft <= 0;
  }

  // Event listeners for buttons
  slideRightBtn.addEventListener('click', () => scrollSlider('right'));
  slideLeftBtn.addEventListener('click', () => scrollSlider('left'));
});

// Listen for click on "Project Details" links
document.querySelectorAll('.btn[href="#videoOverlay"]').forEach((button) => {
  button.addEventListener('click', function(e) {
      e.preventDefault();
      const videoSrc = this.getAttribute('data-video-src'); // Assume you have a data attribute for video src
      const description = this.getAttribute('data-description'); // And one for description

      document.getElementById('videoElement').src = videoSrc;
      document.querySelector('.video-description').textContent = description;
      document.getElementById('videoOverlay').style.display = 'flex';
  });
});

// Close Video Overlay
document.getElementById('videoOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
      this.style.display = 'none';
      document.getElementById('videoElement').pause();
  }
});


