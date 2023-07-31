let abc = null;

async function getData() {
    const response = await fetch("https://reqres.in/api/users");
    const data = await response.json();
    let reqData = data.data;
    abc = reqData;
    return reqData;
}

getData()
    .then((data) => {
        console.log(data);
        abc = data;

        // Add data from API response to the table
        for (let i = 0; i < abc.length; i++) {
            addRowToTable(abc[i]);
        }
    })
    .catch((error) => {
        console.log(error);
    });







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

    firstNameCell.innerHTML = data.first_name;
    lastNameCell.innerHTML = data.last_name;
    rollNoCell.innerHTML = data.id;
    cityCell.innerHTML = data.city;
    phoneNoCell.innerHTML = data.phone;
    
    // console.log(data.avatar);

    if (data.avatar == "") {
        imageCell.innerHTML = `<img src="" alt="image not uploaded" width="100px" height="100px">`;
    }else{
        imageCell.innerHTML = `<img src="${data.avatar}" alt="image" width="100px" height="100px">`;
    }
    
    
}

// Function to handle form submission
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get the form input values
    var firstName = document.getElementById("validationDefault01").value;
    var lastName = document.getElementById("validationDefault02").value;
    var rollNo = document.getElementById("validationDefault06").value;
    var city = document.getElementById("validationDefault03").value;
    var phoneNo = document.getElementById("validationDefault04").value;
    var image = document.getElementById("validationDefault05").value;
    
    // Create an object to hold the data
    var formData = {
        first_name: firstName,
        last_name: lastName,
        id: rollNo,
        city: city,
        phoneNo: phoneNo,
        avatar: image
    };
    
   
    addRowToTable(formData);
    
   
    document.getElementById("myForm").reset();
});s