// TABLE
const table = document.getElementById('myTable');
const editBtn = document.querySelector('.edit-btn');
const saveBtn = document.querySelector('.save-btn');
const addBtn = document.querySelector('.add-btn');

let isEditing = false;
let currentRow = null;

editBtn.addEventListener('click', () => {
  isEditing = !isEditing;
  if (isEditing) {
    editBtn.disabled = true;
    saveBtn.disabled = false;
    addBtn.disabled = false;
    table.querySelectorAll('td[contenteditable="false"]').forEach(cell => {
      cell.contentEditable = true;
    });
    table.querySelectorAll('tr').forEach(row => {
        row.classList.add('delete-row');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        row.querySelector('td:last-child').appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => {
          deleteRow(row);
        });
      });
  } else {
    editBtn.disabled = false;
    saveBtn.disabled = true;
    addBtn.disabled = true;
    table.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
      cell.contentEditable = false;
    });
    table.querySelectorAll('tr').forEach(row => {
      row.classList.remove('delete-row');
      row.querySelector('td:last-child button').remove();
    });
  }
});

saveBtn.addEventListener('click', () => {
  isEditing = false;
  editBtn.disabled = false;
  saveBtn.disabled = true;
  addBtn.disabled = false;
  table.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
    cell.contentEditable = false;
  });
  table.querySelectorAll('tr').forEach(row => {
    row.classList.remove('delete-row');
    row.querySelector('td:last-child button').remove();
  });
});

addBtn.addEventListener('click', () => {
  if (isEditing) {
    const tbody = table.querySelector('tbody');
    const newRow = tbody.insertRow();
    newRow.innerHTML = `
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td><button class="delete-btn">Delete</button></td>
    `;
    newRow.querySelector('td:last-child button').addEventListener('click', () => {
      deleteRow(newRow);
    });
  }
});

table.addEventListener('click', (event) => {
  if (event.target.tagName === 'TD' && !event.target.classList.contains('delete-cell')) {
    const cells = event.target.parentElement.querySelectorAll('td');
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.toggle('active', cells[i] === event.target);
    }
    currentRow = event.target.parentElement;
    addBtn.disabled = true; // Disable the Add button when editing a row
  }
});

function deleteRow(row) {
  if (isEditing) {
    row.remove();
  }
}
