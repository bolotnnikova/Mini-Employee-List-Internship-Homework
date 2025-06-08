//Una Bolotņikova
//Finished:07.06.25
//EXTRAS:
//1. 
//One of the things I added was a light/dark mode toggle, this simple change adds a layer of moderness to the app.  
//By cicking the icon, the user has the option of switching the apps color scheme, 
//which can be helpful in different lighting environments, improving accessibility and comfort of the app.
//The background, text, modal, cards, and search bar adapts to the selected theme. 
//2. 
//I also added a Quick Email feature to make contacting employees easier and faster.
//When a user clicks on an employee card, the modal includes a clickable email address. 
//This small improvement gives any team member the option to reach out instantly. 
//It’s a subtle yet practical change, to boost efficiency.
//3.
//Finally I added profile pictures for each employee, to make the app more visually engaging and 
//would help users recognize colleagues quicker (incase they dont know their names).

//LOADS EMPLOYEES FROM Employee.json
document.addEventListener('DOMContentLoaded', () => {
    if (typeof employees === 'undefined' || !Array.isArray(employees)) {
        console.error("Employee data not found or is not an array. Make sure employees.js is loaded correctly.");
        document.getElementById('employeeListContainer').innerHTML = '<p style="color: red; text-align: center;">Error: Could not load employee data.</p>';
        return;
}

const employeeListContainer= document.getElementById('employeeListContainer');
const searchInput= document.getElementById('searchInput');
const modal= document.getElementById('employeeModal');
const modalName= document.getElementById('modalName');
const modalTitle= document.getElementById('modalTitle');
const modalEmail= document.getElementById('modalEmail');
const modalStartDate= document.getElementById('modalStartDate');
const closeButton= document.querySelector('.close-button');

function renderEmployees(employeeArray) {
    employeeListContainer.innerHTML= ''; 

    if (employeeArray.length === 0) {
        employeeListContainer.innerHTML= '<p style="text-align: center;">No employees found.</p>';
    return;
}

employeeArray.forEach(employee => {
    const card = document.createElement('div');
    card.classList.add('employee-card');

    //PICTURES
    const imgElement = document.createElement('img');
    imgElement.src = employee.photo;
    imgElement.alt = `${employee.name}'s photo`;
    imgElement.classList.add('employee-card-photo');
    card.appendChild(imgElement);


    card.dataset.employeeId = employee.id;

    const nameElement = document.createElement('h3');
    nameElement.textContent = employee.name;

    const titleElement = document.createElement('p');
    titleElement.textContent = employee.title;

    card.appendChild(nameElement);
    card.appendChild(titleElement);

    card.addEventListener('click', () => showEmployeeDetails(employee.id));

    employeeListContainer.appendChild(card);
});
}

//Employee details in modal
function showEmployeeDetails(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        modalName.textContent = employee.name;
        modalTitle.textContent = employee.title;
        modalEmail.textContent = employee.email;

        //QUICK EMAIL
        const emailLink = document.getElementById("modalEmail");
        emailLink.textContent = employee.email;
        emailLink.href = `mailto:${employee.email}`;

        modalStartDate.textContent = employee.startDate;
        modal.style.display = 'flex';
}
}

function closeModal() {
    modal.style.display = 'none';
}

closeButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
    closeModal();}
});

//SEARCH
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(searchTerm));
    renderEmployees(filteredEmployees);});
///////////////////////////////////////////////////////

renderEmployees(employees);

});

//EXTRAS
//LIGHT-DARK MODE
let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})
////////////////////////////////////////////////////////////////