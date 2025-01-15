let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

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
            <p class="address">${street}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;


    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}


gridContainer.addEventListener('click', e => {
    // The click is not on the gridContainer itself
    if(e.target !== gridContainer){
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});


modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});


//index.html.remove(employeeHTML && modalHTML);


card.addEventListener('click', (event) => {
    const personCard = event.target.closest('.card');
    if(!personCard) return;

    const personName = personCard.dataset.name;
    const person = people.find(
        (people) => people.name === personName
    );
    displayModal(person);
});



function displayModal(person){
    const modalHTML = `
        <img class"avatar" src="${person.large}" />
            <div class="text-container">
            <h2 class="name">${person.name.first} ${person.name.last}</h2>
            <p class="email">${person.email}</p>
            <p class="address">${person.address}</p>
            <hr />
            <p>${person.phone}</p>
            <p class="address">${street}, ${state}, ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/ ${date.getDate()}/ ${date.getFullYear()}</p>
        </div>
    `;

    modalContent.innerHTML = modalHTML;
    overlay.classList.add('open');
}


// This closes the overlay when the mouse click is outside of the person's card
modalClose.addEventListener('click', (event) => {
    const isOutside = !event.target.closest('.modal-close');
    if(isOutside){
        overlay.classList.remove('open');
    }
});


// The overlay will close/disappear upon the push of the Escape key/button
document.addEventListener('click', (event) => {
    if(event.key === 'Escape'){
        overlay.classList.remove('open');
    }
});