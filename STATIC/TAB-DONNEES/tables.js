document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.dropbtn').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
                this.classList.remove('active');
            } else {
                closeAllDropdowns();
                dropdownContent.style.display = 'block';
                this.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.table-dropdown-content a').forEach(function(link) {
        link.addEventListener('click', function() {
            closeAllDropdowns();
        });
    });

    document.addEventListener('click', function() {
        closeAllDropdowns();
    });

    function closeAllDropdowns() {
        document.querySelectorAll('.table-dropdown-content').forEach(function(dropdown) {
            dropdown.style.display = 'none';
        });
        document.querySelectorAll('.dropbtn').forEach(function(button) {
            button.classList.remove('active');
        });
    }
});
