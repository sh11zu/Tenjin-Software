document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-button');
    const editModal = document.getElementById("editModal");
    const addModal = document.getElementById("addModal");
    const cancelButton = document.getElementById("cancelButton");
    const saveButton = document.getElementById("saveButton");
    const addCancelButton = document.getElementById("addCancelButton");
    const addSaveButton = document.getElementById("addSaveButton");
    const editInput = document.getElementById("editInput");
    const addInput = document.getElementById("addInput");
    const editModalTitle = document.getElementById("editModalTitle");
    const addModalTitle = document.getElementById("addModalTitle");
    let currentElement = null;
    let currentBloc = null;

    menuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click event from propagating to the window

            // If the button is currently a close button, revert it to the ellipsis
            if (button.classList.contains('close')) {
                resetButton(button);
                return;
            }

            // Close all other context menus and reset other close buttons
            menuButtons.forEach(btn => {
                if (btn !== button) {
                    resetButton(btn);
                }
            });

            // Toggle the clicked context menu
            const contextMenu = button.nextElementSibling;
            const isVisible = contextMenu.style.display === 'block';
            
            // Toggle selected state
            button.classList.toggle('selected', !isVisible);
            
            contextMenu.style.display = isVisible ? 'none' : 'block';
        });
    });

    window.addEventListener('click', () => {
        // Close all context menus when clicking outside, except if they are in close mode
        menuButtons.forEach(button => {
            if (!button.classList.contains('close')) {
                button.classList.remove('selected');
                button.nextElementSibling.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.context-menu').forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click event from propagating to the window
        });
    });

    // Handle context menu actions
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const action = item.textContent.trim();
            const bloc = item.closest('.bloc');
            const elements = bloc.querySelectorAll('.element');
            const button = bloc.querySelector('.menu-button');
            const blocTitle = bloc.querySelector('.title span').textContent;

            const titles = {
                "Catégories REG": "Catégorie REG",
                "Catégories SPE": "Catégorie SPE",
                "États de parution": "Etat de parution",
                "Emplacements": "Emplacement"
            };
            const titleType = titles[blocTitle] || "élément";

            if (action === 'Editer' || action === 'Supprimer') {
                button.classList.add('close');
                button.innerHTML = '<i class="fas fa-times"></i>';
                
                elements.forEach(element => {
                    let editIcon = element.querySelector('.edit-icon');
                    let deleteCheckbox = element.querySelector('.delete-checkbox');

                    if (!editIcon) {
                        editIcon = document.createElement('i');
                        editIcon.className = 'fas fa-pencil-alt edit-icon';
                        element.appendChild(editIcon);

                        editIcon.addEventListener('click', () => {
                            currentElement = element;
                            editInput.value = element.textContent.trim();
                            editModalTitle.textContent = `Editer ${titleType}`;
                            editModal.style.display = "block";
                            editInput.select(); // Automatically select the text
                        });
                    }
                    
                    if (!deleteCheckbox) {
                        deleteCheckbox = document.createElement('input');
                        deleteCheckbox.type = 'checkbox';
                        deleteCheckbox.className = 'delete-checkbox';
                        element.appendChild(deleteCheckbox);
                    }

                    editIcon.style.display = 'none';
                    deleteCheckbox.style.display = 'none';

                    if (action === 'Editer') {
                        editIcon.style.display = 'inline-block';
                    } else if (action === 'Supprimer') {
                        deleteCheckbox.style.display = 'inline-block';
                        deleteCheckbox.checked = false; // Uncheck any previously checked boxes
                    }
                });

                // Show delete button when action is 'Supprimer'
                if (action === 'Supprimer') {
                    let deleteButton = bloc.querySelector('.delete-button');
                    if (!deleteButton) {
                        deleteButton = document.createElement('button');
                        deleteButton.className = 'delete-button';
                        deleteButton.textContent = 'Supprimer';
                        button.parentElement.insertBefore(deleteButton, button);
                    }
                    deleteButton.style.display = 'inline-block';
                    deleteButton.disabled = true; // Initially disable the delete button
                    deleteButton.classList.add('disabled');

                    // Add event listeners to checkboxes
                    const checkboxes = bloc.querySelectorAll('.delete-checkbox');
                    checkboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', () => {
                            const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
                            deleteButton.disabled = !anyChecked;
                            deleteButton.classList.toggle('disabled', !anyChecked);
                        });
                    });

                    // Add event listener to delete button for confirmation and deletion
                    deleteButton.addEventListener('click', () => {
                        const confirmation = confirm('Êtes-vous sûr de vouloir supprimer les éléments sélectionnés ?');
                        if (confirmation) {
                            checkboxes.forEach(checkbox => {
                                if (checkbox.checked) {
                                    checkbox.closest('.element').remove();
                                }
                            });
                            resetButton(button);
                        }
                    });
                }
            }

            // Handle "Ajouter" action
            if (action === 'Ajouter') {
                currentBloc = bloc;
                addInput.value = ''; // Clear the input field
                addModalTitle.textContent = `Ajouter ${titleType}`;
                addModal.style.display = "block";
                addInput.focus(); // Automatically focus on the input
            }

            // Close the context menu after selection
            const contextMenu = item.closest('.context-menu');
            contextMenu.style.display = 'none';
        });
    });

    function resetButton(button) {
        button.classList.remove('selected', 'close');
        button.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
        const contextMenu = button.nextElementSibling;
        contextMenu.style.display = 'none';
        
        const bloc = button.closest('.bloc');
        const elements = bloc.querySelectorAll('.element');

        elements.forEach(element => {
            const editIcon = element.querySelector('.edit-icon');
            const deleteCheckbox = element.querySelector('.delete-checkbox');

            if (editIcon) {
                editIcon.style.display = 'none';
            }
            if (deleteCheckbox) {
                deleteCheckbox.style.display = 'none';
                deleteCheckbox.checked = false; // Uncheck all checkboxes
            }
        });

        const deleteButton = bloc.querySelector('.delete-button');
        if (deleteButton) {
            deleteButton.style.display = 'none';
        }
    }

    // When the user clicks on "Annuler" in edit modal, close the modal
    cancelButton.onclick = function() {
        editModal.style.display = "none";
    }

    // When the user clicks on "Annuler" in add modal, close the modal
    addCancelButton.onclick = function() {
        addModal.style.display = "none";
    }

    // When the user clicks on "Sauvegarder", update the element text and close the modal
    saveButton.onclick = function() {
        if (currentElement) {
            currentElement.firstChild.textContent = editInput.value;
            const button = currentElement.closest('.bloc').querySelector('.menu-button');
            resetButton(button); // Reset the bloc state after saving
        }
        editModal.style.display = "none";
    }

    // When the user clicks on "Ajouter", add the new element to the bloc and close the modal
    addSaveButton.onclick = function() {
        if (currentBloc) {
            const newElement = document.createElement('div');
            newElement.className = 'element';
            newElement.textContent = addInput.value;
            currentBloc.querySelector('.content').appendChild(newElement);
            const button = currentBloc.querySelector('.menu-button');
            resetButton(button); // Reset the bloc state after adding
        }
        addModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == editModal) {
            editModal.style.display = "none";
        }
        if (event.target == addModal) {
            addModal.style.display = "none";
        }
    }
});
