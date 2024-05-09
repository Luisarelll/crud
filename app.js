const form = document.getElementById('formRegister');
const idInput = document.getElementById('idInput');
const typeInput = document.getElementById('typeInput');
const brandInput = document.getElementById('brandInput');
const modelInput = document.getElementById('modelInput');
const colorInput = document.getElementById('colorInput');
const yearInput = document.getElementById('yearInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const id = idInput.value;
    const type = typeInput.value;
    const brand = brandInput.value;   
    const model = modelInput.value;
    const color = colorInput.value;
    const year = yearInput.value;

    if(id && type && brand && model && color && year) {
        const newData = {id, type, brand, model, color, year};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }else{
        alert('No Pueden Existir Campos Vacios!')
    }
})

function saveDataToLocalStorage() {
    localStorage.setItem('formData',JSON.stringify(data));
}


function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function (item, index){
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const typeCell = document.createElement('td');
        const brandCell = document.createElement('td');
        const modelCell = document.createElement('td');
        const colorCell = document.createElement('td');
        const yearCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        idCell.textContent = item.id;
        typeCell.textContent = item.type;
        brandCell.textContent = item.brand;
        modelCell.textContent = item.model;
        colorCell.textContent = item.color;
        yearCell.textContent = item.year;
        editButton.textContent = 'Update';
        deleteButton.textContent = 'Delete';

        editButton.classList.add("button", 'button--secondary');
        deleteButton.classList.add("button", 'button--tertiary');

        editButton.addEventListener('click', function(){
            editData(index);
        })

        deleteButton.addEventListener('click', function(){
            deleteData(index);
        })

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton)

        row.appendChild(idCell);
        row.appendChild(typeCell);
        row.appendChild(brandCell);
        row.appendChild(modelCell);
        row.appendChild(colorCell);
        row.appendChild(yearCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    })
}

function editData(index) {
    const item = data[index];
    idInput.value = item.id;
    typeInput.value = item.type;
    brandInput.value = item.brand;
    modelInput.value = item.model;
    colorInput.value = item.color;
    yearInput.value = item.year;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();