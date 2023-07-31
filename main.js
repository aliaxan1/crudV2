


let dataFromApi = [];   //array to store data from API
const link = "https://reqres.in/api/users";  //link to API


itemsPerPage=4;

async function getData(pageNo) {
    const response = await fetch(link + `?page=${pageNo}` );
    const data = await response.json();
    let reqData = data.data;
    return reqData;
}   //function to get data from API

for(let pageNo=1;pageNo<3;pageNo++){
    
    getData(pageNo)  //calling the function
        .then((data) => {
           if (pageNo == 1) {
                abc = data;
                // console.log(abc);
           } 
            if (pageNo == 2) {
                dataFromApi = [...abc,...data];
                showdata(dataFromApi);
                
                
            }

        })
        .catch((error) => {
            console.log(error);
         });  //adding data to the table          

}


function loadTable(event){
    const liElement = event.target.closest('li'); 
    const value = liElement.getAttribute('value');
    const itemsPerPage = 4;
    let pageBtnNO = value;
    startElement = ((pageBtnNO-1)*itemsPerPage)+1;
    endElement = pageBtnNO*itemsPerPage;
    console.log(startElement,endElement);
    document.getElementsByTagName('tbody')[0].innerHTML = "";
    for (let i = startElement-1; i < endElement; i++) {
        // clear the complete table
        
        addRowToTable(dataFromApi[i]);        
    }
}; 





//show complete api data
function showdata(data){
    document.getElementsByTagName('tbody')[0].innerHTML = "";
    for (data in dataFromApi) {
        addRowToTable(dataFromApi[data]);        
    }
} 



// Function to add a new row to the table

function addRowToTable(data) {
    var table = document.getElementsByTagName('tbody')[0];
    var row = table.insertRow();
    
    // Create and insert cells with the form data
    var firstNameCell = row.insertCell();
    var lastNameCell = row.insertCell();
    var rollNoCell = row.insertCell();
    // var cityCell = row.insertCell();
    // var phoneNoCell = row.insertCell();
    var imageCell = row.insertCell();
    const actionCell = row.insertCell();
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editUser(index));
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", () => deleteUser(data));
        actionCell.appendChild(deleteButton);

    firstNameCell.innerHTML = data.first_name;
    lastNameCell.innerHTML = data.last_name;
    rollNoCell.innerHTML = data.id;
    // cityCell.innerHTML = data.city;
    // phoneNoCell.innerHTML = data.phone;
    
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
    // var city = document.getElementById("validationDefault03").value;
    // var phoneNo = document.getElementById("validationDefault04").value;
    var image = document.getElementById("validationDefault05").value;
    
    // Create an object to hold the data
    var formData = {
        first_name: firstName,
        last_name: lastName,
        id: rollNo,
        // city: city,
        // phoneNo: phoneNo,
        avatar: image
    };
    
   
    addRowToTable(formData);
    
   
    document.getElementById("myForm").reset();
});
// Function to delete a user
function deleteUser(data) {
    // Remove the user from the array
    console.log(data);
    dataFromApi.splice(dataFromApi.indexOf(data), 1);

    // Render users in the table
     showdata(dataFromApi);
    console.log(dataFromApi);
    // window.location.reload();
}