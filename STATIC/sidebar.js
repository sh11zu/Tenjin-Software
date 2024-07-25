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

    // Ensure the sidebar state is applied immediately
    function applySidebarState() {
        var sidebarState = localStorage.getItem('sidebarState');
        if (sidebarState === 'collapsed') {
            sidebar.classList.add('collapsed', 'no-transition');
            mainContent.classList.add('collapsed', 'no-transition');
            toggleBtn.classList.add('open');
        } else {
            sidebar.classList.remove('collapsed', 'no-transition');
            mainContent.classList.remove('collapsed', 'no-transition');
            toggleBtn.classList.remove('open');
        }
    }

    // Apply the sidebar state as soon as possible
    applySidebarState();

    // Remove the no-transition class after the page has loaded
    setTimeout(function() {
        sidebar.classList.remove('no-transition');
        mainContent.classList.remove('no-transition');
    }, 100); // 100ms delay

    toggleBtn.addEventListener('click', toggleSidebar);
    setActiveLink(); // Call the function to set the active link
});
