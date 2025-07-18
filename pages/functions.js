      const menuBtn = document.getElementById('menu-btn');
      const menuIcon = document.getElementById('menu-icon');
      const mobileMenu = document.getElementById('mobile-menu');

      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('bx-menu');
        menuIcon.classList.toggle('bx-x');
      });