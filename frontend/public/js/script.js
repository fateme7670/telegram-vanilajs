let sidebarContactItems = document.querySelectorAll('.sidebar__contact-item');
let sidebarCategoriesItem = document.querySelectorAll(
  '.sidebar__categories-item',
);
let chatHeader = document.querySelector('.chat__header');
let sideBarMenuBtn = document.querySelector('.sidebar__menu');
let sideBarMenuContext = document.querySelector('.setting-menu');
let sideBarParent = document.querySelector('.costom-col-3');
let chatContainer = document.querySelector('.chat');
let chatContent = document.querySelector('.chat__content');
let contactMenu = document.querySelector('.contact-menu');
let chatMenu = document.querySelector('.chat-menu');
let chatContentWrapper = document.querySelectorAll('.chat__content-wrapper');
let sidebarCloseBtn = document.querySelector('.sidebar-close-button');
let mainConainer = document.querySelector('.costom-col-9');

document.addEventListener('click', () => {
  contactMenu.classList.remove('contact-menu--active');
  chatMenu.classList.remove('chat-menu--active');
});

let previousSelectedItem = null;

sidebarContactItems.forEach((item) => {
  item.addEventListener('click', function (e) {
    chatHeader.classList.add('chat__header--active');
    chatContent.classList.add('chat__content--active');
    closeSideBarHandler();

    // Remove active class from the previously selected item
    if (previousSelectedItem) {
      previousSelectedItem.children[0].classList.remove(
        'sidebar__contact-link--selected',
      );
    }

    // Add active class to the currently clicked item
    item.children[0].classList.add('sidebar__contact-link--selected');

    // Update the previous selected item to the current one
    previousSelectedItem = item;
  });
});

sidebarCategoriesItem.forEach((item) => {
  item.addEventListener('click', function (e) {
    let activeSidebarCategoriesItem = document.querySelector(
      '.sidebar__categories-item.sidebar__categories-item--active',
    );
    activeSidebarCategoriesItem.classList.remove(
      'sidebar__categories-item--active',
    );
    e.currentTarget.classList.add('sidebar__categories-item--active');

    let categoryName = e.currentTarget.dataset.categoryName;
    let selectedCategory = document.querySelector(
      `.data-category-${categoryName}`,
    );
    let selectedCategoryActive = document.querySelector(
      `.sidebar__contact.sidebar__contact--active`,
    );
    selectedCategoryActive.classList.remove('sidebar__contact--active');
    selectedCategory.classList.add('sidebar__contact--active');
  });
});
chatContentWrapper.forEach((item) => {
  item.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    const menuHeight = chatMenu.offsetHeight;
    const menuWidth = chatMenu.offsetWidth;
    const pageHeight = window.innerHeight;
    const pageWidth = window.innerWidth;

    let top = event.pageY;
    let left = event.pageX;

    // Ensure the menu stays within the bottom edge of the window
    if (top + menuHeight > pageHeight) {
      top = pageHeight - menuHeight - 10; // 10 pixels as margin
    }

    // Ensure the menu stays within the right edge of the window
    if (left + menuWidth > pageWidth) {
      left = pageWidth - menuWidth - 10; // 10 pixels as margin
    }

    // Ensure the menu stays within the top edge of the window
    if (top < 0) {
      top = 10; // 10 pixels as margin
    }

    // Ensure the menu stays within the left edge of the window
    if (left < 0) {
      left = 10; // 10 pixels as margin
    }

    chatMenu.style.top = top + 'px';
    chatMenu.style.left = left + 'px';
    chatMenu.classList.toggle('chat-menu--active');
  });
});

// newlines
sideBarMenuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  sideBarMenuContext.style.top = e.pageY + 35 + 'px';
  sideBarMenuContext.style.left = e.pageX - 5 + 'px';
  sideBarMenuContext.classList.toggle('setting-menu--active');
});

chatContainer.addEventListener('mouseenter', (e) => {
  sideBarMenuContext.classList.remove('setting-menu--active');
});

sidebarCloseBtn.addEventListener('click', () => {
  closeSideBarHandler();
});

function closeSideBarHandler() {
  sideBarParent.classList.toggle('sideBar-hide');
  mainConainer.classList.toggle('container-hide');
}
function addLocation(id, x, y) {
  var mapElem = L.map(id).setView([x, y], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapElem);

  L.marker([x, y]).addTo(mapElem);
}

// addLocation("map-receiver", 35.66464633787121, 51.34911246735852);
// addLocation("map-sender", 36.841781928656516, 54.43292097321089);