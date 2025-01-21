let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');



// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))



// Employee function that displays employee data
function displayEmployees(employeeData){
    employees = employeeData;
    let employeeHTML = '';

    // This Loops through each employee
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        let street = employee.street;


        // Below is the template literal
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                    
                </div>
            </div>
        `
    });

    // This inserts the employeeHTML directly into the HTML of the grid container.
    gridContainer.innerHTML = employeeHTML;
}


// The modal display function
function displayModal(index){
    let {name, dob, phone, email, location:{city, street, state, postcode}, picture} = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    
    modalContainer.innerHTML = modalHTML;
    overlay.classList.remove("hidden");
}


// Click an employee card and the modal will display.
gridContainer.addEventListener('click', e => {
    if(e.target !== gridContainer){
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});



// Click the X on the modal and you return to the employees list
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});



//Click the overlay, the modal closes but doesn't return to the directory
overlay.addEventListener('click', () => {
     gridContainer.classList.add('open');
});



// This closes the overlay when the mouse click is outside of the person's
// card
// modalClose.addEventListener('click', (event) => {
//     const isOutside = !event.target.closest('.modal-close');
//     if(isOutside){
//         overlay.classList.remove('open');
//     }
// });


// The overlay will close/disappear upon the push of the Escape key/button
document.addEventListener('click', (event) => {
    if(event.key === 'Escape'){
        overlay.classList.remove('open');
    }
});