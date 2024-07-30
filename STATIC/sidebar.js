document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const menuItems = document.querySelectorAll('.menu-item');
    const dropdownToggle = document.querySelectorAll('.has-dropdown');
    const dropdownItems = document.querySelectorAll('.menu-item-dropdown a');

    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
        toggleBtn.classList.toggle('open');
        
        // Save sidebar state to local storage
        localStorage.setItem('sidebarState', sidebar.classList.contains('collapsed') ? 'collapsed' : 'expanded');
    }

    function setActiveLink() {
        var path = window.location.pathname.split('/').pop();
        menuItems.forEach(function(item) {
            if (item.querySelector('a') && item.querySelector('a').getAttribute('href').includes(path)) {
                item.classList.add('active');
                // Check if the item is in a dropdown menu
                if (item.closest('.menu-item-dropdown')) {
                    item.closest('.menu-item-dropdown').previousElementSibling.classList.add('active');
                    item.closest('.menu-item-dropdown').previousElementSibling.classList.add('dropdown-active');
                }
            } else {
                item.classList.remove('active');
                item.classList.remove('dropdown-active');
            }
        });

        dropdownItems.forEach(function(item) {
            if (item.getAttribute('href').includes(path)) {
                item.classList.add('selected');
                const dropdown = item.closest('.menu-item-dropdown');
                dropdown.classList.add('show');
                const arrow = dropdown.previousElementSibling.querySelector('.arrow');
                if (arrow) {
                    arrow.classList.add('down');
                }
                // Add active class to the parent item
                dropdown.previousElementSibling.classList.add('active');
                dropdown.previousElementSibling.classList.add('dropdown-active');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    dropdownToggle.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const dropdown = item.nextElementSibling;
            const arrow = item.querySelector('.arrow');
            dropdown.classList.toggle('show');
            arrow.classList.toggle('down');
        });
    });

    menuItems.forEach(function(item) {
        if (!item.classList.contains('has-dropdown')) {
            item.addEventListener('click', function(event) {
                event.preventDefault();

                // Save the current sidebar state
                localStorage.setItem('sidebarState', sidebar.classList.contains('collapsed') ? 'collapsed' : 'expanded');

                // Disable transitions
                sidebar.classList.add('no-transition');
                mainContent.classList.add('no-transition');

                // Add a slight delay to allow the no-transition class to take effect
                setTimeout(function() {
                    window.location.href = item.querySelector('a').getAttribute('href');
                }, 10); // 10ms delay to ensure no transition is seen
            });
        }
    });

    toggleBtn.addEventListener('click', toggleSidebar);
    setActiveLink(); // Call the function to set the active link
});

document.addEventListener('DOMContentLoaded', function () {
    const userNameElement = document.getElementById('userName');
    const userProfileElement = document.getElementById('userProfile');

    const userName = userNameElement.textContent.trim();
    const initials = userName.split(' ').map(name => name.charAt(0)).join('');

    userProfileElement.textContent = initials;
    userProfileElement.style.display = 'flex';
    userProfileElement.style.alignItems = 'center';
    userProfileElement.style.justifyContent = 'center';
    userProfileElement.style.width = '50px';
    userProfileElement.style.height = '50px';
    userProfileElement.style.borderRadius = '50%';
    userProfileElement.style.backgroundColor = '#4A5C6A';
    userProfileElement.style.color = 'white';
    userProfileElement.style.fontSize = '1.5rem';
    userProfileElement.style.fontWeight = 'bold';
});
