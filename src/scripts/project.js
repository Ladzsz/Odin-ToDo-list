//making the array

let projects = [];

//making the construcotr

class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

const formsubmit = document.querySelector('#projectForm button[type="submit"]');


//event listener when suvbmit on form is clicked
formsubmit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission

    //grabbing form
    let form = document.getElementById('projectModal');

    //making form display none
    form.style.display = "none";

    //grabbing name and description
    let Pname = document.getElementById('projectName').value;

    let Pdesc = document.getElementById('projectDescription').value;

    //creating new project object
    const project = new Project(Pname, Pdesc);

    console.log(`name: ${project.name}`);
    console.log(`desc: ${project.description}`);
});