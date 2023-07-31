async function apiData() {
    const response = await fetch("https://reqres.in/api/users");
    const data = await response.json();
    return data.data;
  }
apiData().then((data) => {});
// Function to add a new row to the table
function addRowToTable(data) {
    var table = document.getElementsByTagName('tbody')[0];
    var row = table.insertRow();
    
    // Create and insert cells with the form data
    var firstNameCell = row.insertCell();
    var lastNameCell = row.insertCell();
    var rollNoCell = row.insertCell();
    var cityCell = row.insertCell();
    var phoneNoCell = row.insertCell();
    var imageCell = row.insertCell();

    firstNameCell.innerHTML = data.firstName;
    lastNameCell.innerHTML = data.lastName;
    rollNoCell.innerHTML = data.rollNo;
    cityCell.innerHTML = data.city;
    phoneNoCell.innerHTML = data.phoneNo;
    
    console.log(data.image);

    if (data.image == "") {
        imageCell.innerHTML = `<img src="" alt="image not uploaded" width="100px" height="100px">`;
    }else{
        imageCell.innerHTML = `<img src="${data.image}" alt="image" width="100px" height="100px">`;
    }
    
    
}


// Function to handle form submission
 function formSubmission() {
    
    
    // Get the form input values
    var firstName = document.getElementById("validationDefault01").value;
    var lastName = document.getElementById("validationDefault02").value;
    var rollNo = document.getElementById("validationDefault06").value;
    var city = document.getElementById("validationDefault03").value;
    var phoneNo = document.getElementById("validationDefault04").value;
    var image = document.getElementById("validationDefault05").value;
    
    // Create an object to hold the data
    var formData = {
        firstName: firstName,
        lastName: lastName,
        rollNo: rollNo,
        city: city,
        phoneNo: phoneNo,
        image: image
    };
    
    // Add the data to the table
    addRowToTable(formData);
    
    // Reset the form after submission
    document.getElementById("myForm").reset();
};

// Function to handle form submission
document.getElementById("myForm").addEventListener("submit",(event)=> {
    formSubmission();
    event.preventDefault(); // Prevent form submission
});
