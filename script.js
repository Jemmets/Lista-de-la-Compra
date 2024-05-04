// Selecting DOM elements
const addBtn = document.getElementById('add'); // Button to add new items
const clearBtn = document.getElementById('clear'); // Button to clear all items
const input = document.getElementById('userInput'); // Input field for new items
const shoppingList = document.getElementById('shoppingList'); // List to display items
const emptyMessage = document.querySelector('.empty-message'); // Empty list message

// Event listener for the "Add Item" button
addBtn.addEventListener('click', addItem);

// Event listener for the "Clear" button
clearBtn.addEventListener('click', clearItems);

// Load items from local storage when the page loads
loadItemsFromLocalStorage();

// Event listener for toggling the "done" style (line-through) on an item
shoppingList.addEventListener('click', toggleDone);

// Event listener for deleting an item on double-click
shoppingList.addEventListener('dblclick', deleteItem);

// Function to add a new item to the list
function addItem() {
    // Check if the input field is not empty
    if (input.value.trim() !== '') {
        // Create a new list item
        const newItem = document.createElement('li');
        // Set the text content of the new item to the value entered in the input field
        newItem.textContent = input.value.trim();

        // Add a delete button to the new item
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>'; // Add delete icon
        deleteBtn.classList.add('delete'); // Add a class for styling
        newItem.appendChild(deleteBtn); // Append the delete button to the new item

        // Append the new item to the shopping list
        shoppingList.appendChild(newItem);

        // Save the updated list items to local storage
        saveItemsToLocalStorage();

        // Clear the input field after adding the item
        input.value = '';

        // Hide the empty list message
        emptyMessage.style.display = 'none';
    }
}

// Function to delete an item from the list
function deleteItem(event) {
    const item = event.target.closest('li'); // Get the closest list item ancestor of the clicked element
    if (item) {
        item.remove(); // Remove the item itself from the list

        // Save the updated list items to local storage
        saveItemsToLocalStorage();

        // Show the empty list message if there are no items left
        if (shoppingList.childElementCount === 0) {
            emptyMessage.style.display = 'block';
        }
    }
}

// Function to toggle the "done" style (line-through) on an item
function toggleDone(event) {
    const clickedElement = event.target;

    // Check if the clicked element is a list item or a child of a list item
    if (clickedElement.tagName === 'LI') {
        clickedElement.classList.toggle('done');
    } else if (clickedElement.parentElement.tagName === 'LI') {
        clickedElement.parentElement.classList.toggle('done');
    }

    // Save the updated list items to local storage
    saveItemsToLocalStorage();
}

// Function to save the list items to local storage
function saveItemsToLocalStorage() {
    const items = shoppingList.querySelectorAll('li');
    const itemList = [];
    items.forEach(item => {
        itemList.push(item.textContent);
    });
    localStorage.setItem('shoppingListItems', JSON.stringify(itemList));
}

// Function to load the list items from local storage
function loadItemsFromLocalStorage() {
    const storedItems = JSON.parse(localStorage.getItem('shoppingListItems'));
    if (storedItems && storedItems.length > 0) {
        storedItems.forEach(itemText => {
            const newItem = document.createElement('li');
            newItem.textContent = itemText;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
            deleteBtn.classList.add('delete');
            newItem.appendChild(deleteBtn);

            shoppingList.appendChild(newItem);
        });

        // Hide the empty list message
        emptyMessage.style.display = 'none';
    } else {
        // Show the empty list message if there are no items
        emptyMessage.style.display = 'block';
    }
}

// Function to clear all items from the list and local storage
function clearItems() {
    shoppingList.innerHTML = ''; // Clear the list
    localStorage.removeItem('shoppingListItems'); // Clear the local storage

    // Show the empty list message
    emptyMessage.style.display = 'block';
}
