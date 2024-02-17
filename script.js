

const save = document.getElementById('save');

save.addEventListener('click', function () {
    // Array to store form data
    const formData = [];

    // Select all form input elements
    const inputs = document.querySelectorAll('.formInput');

    // Loop through each form input
    inputs.forEach(input => {
        // Get label text
        const labelElement = input.querySelector('label');
        const label = labelElement ? labelElement.innerText : '';

        // Check if label is present
        if (label) {
            // Get input type
            const inputElement = input.querySelector('input, select, textarea');
            const type = inputElement ? (inputElement.type || inputElement.tagName.toLowerCase()) : '';

            // Get input value
            const value = inputElement ? inputElement.value : '';

            // Array to store select options
            let options = [];
            if (type === 'select') {
                const selectOptions = input.querySelectorAll('select option');
                selectOptions.forEach(option => {
                    options.push(option.value);
                });
            }

            // Get placeholder text
            const placeholder = inputElement ? (type === 'textarea' ? 'Enter your text here' : inputElement.placeholder) : '';

            // Push form data object into formData array
            formData.push({
                id: uuidv4(),
                type: type,
                label: label,
                placeholder: placeholder,
                options: options.length > 0 ? options : undefined,
                value: value
            });
        }
    });

    // Log formData as JSON string
    console.log(JSON.stringify(formData,null,13));
});  





// Function to generate a unique ID
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// Event listener for deleting form inputs
const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.parentElement.parentElement.remove();
    });
});




// Event listener for adding form inputs
const formInput = document.getElementById('form-input');
formInput.addEventListener('click', function () {
    const newDiv = document.createElement('div');
    newDiv.classList.add('formInput', 'child');
    newDiv.setAttribute('draggable', true);
    newDiv.innerHTML = `
      <div class="inputInfo">
        <label for="">sample input</label>
        <div>
          <button class="delete">delete</button>
          <button class="update">update</button>
        </div>
      </div>
      <input type="text" class="formInput formCommon select-info">
    `;
    document.getElementById('form').appendChild(newDiv);
   
});

// Event listener for adding select inputs
const select = document.getElementById('select');
select.addEventListener('click', function () {
    const newDiv = document.createElement('div');
    newDiv.classList.add('formInput', 'child');
    newDiv.setAttribute('draggable', true);
    newDiv.innerHTML = `
    <div class="inputInfo ">
        <label for="">sample input</label>
        <div>
            <button class="delete">delete</button>
            <button class="update">update</button>
        </div>
    </div>
    <select type="text" class="formInput formCommon select-info">
        <option value="name1">name1</option>
        <option value="name2">name2</option>
        <option value="name3">name3</option>
    </select>
    `;
    document.getElementById('form').appendChild(newDiv);
  
});

// Event listener for adding text area inputs
const textArea = document.getElementById('textArea');
textArea.addEventListener('click', function () {
    const newDiv = document.createElement('div');
    newDiv.classList.add('formInput', 'child');
    newDiv.setAttribute('draggable', true);
    newDiv.innerHTML = `
    <div class="inputInfo">
        <label for="">sample input</label>
        <div>
            <button class="delete">delete</button>
            <button class="update">update</button>
        </div>
    </div>
    <textarea class="formInput formCommon" style="height: 200px;"></textarea>
    `;
    document.getElementById('form').appendChild(newDiv);
  
});



    const updateButtons = document.querySelectorAll('.update');
    updateButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const outerContainer = this.closest('.formInput');
            const label = outerContainer.querySelector('label');
            const text = prompt('Enter text:');
            if (text !== null) {
                label.innerText = text;
            }
        });
    });


// Drag and drop functionality
const parent = document.querySelector('.parent');

parent.addEventListener('dragstart', function (e) {
    dragged = e.target;
    e.target.classList.add('dragging');
});

parent.addEventListener('dragover', function (e) {
    e.preventDefault(); // Allow drop
});

parent.addEventListener('dragenter', function (e) {
    if (e.target.classList.contains('child')) {
        e.target.style.backgroundColor = "#ccc";
    }
});

parent.addEventListener('dragleave', function (e) {
    if (e.target.classList.contains('child')) {
        e.target.style.backgroundColor = "";
    }
});

parent.addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('child')) {
        e.target.style.backgroundColor = "";
        if (e.target.nextSibling === dragged) {
            parent.insertBefore(dragged, e.target.nextSibling.nextSibling);
        } else {
            parent.insertBefore(dragged, e.target.nextSibling);
        }
    }
});

parent.addEventListener('dragend', function (e) {
    dragged.classList.remove('dragging');
});
