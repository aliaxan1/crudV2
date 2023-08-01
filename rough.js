let notSearch = true;
var searchResult = [];
let tempArr = [];   //array to store data temporarily from API
let dataFromApi = [];   //array to store data from API
const link = "https://reqres.in/api/users";  //link to API


itemsPerPage = 4;


const fetchTableData = () => {
    // function to fetch data from API
}

async function getData(pageNo) {
    const response = await fetch(link + `?page=${pageNo}`);
    const data = await response.json();
    let reqData = data.data;
    console.log("reqData", reqData);
    return reqData;
}   //function to get data from API

for (let pageNo = 1; pageNo < 3; pageNo++) {

    getData(pageNo)  //calling the function
        .then((data) => {
            if (pageNo == 1) {
                tempArr = data;
            }
            if (pageNo == 2) {
                dataFromApi = [...tempArr, ...data];
                showdata(dataFromApi);


            }

        })
        .catch((error) => {
            console.log("error", error);
        });  //adding data to the table          

}


function loadTable(event) {
    const liElement = event.target.closest('li');
    const value = liElement.getAttribute('value');
    const itemsPerPage = 4;
    let pageBtnNO = value;
    startElement = ((pageBtnNO - 1) * itemsPerPage) + 1;
    endElement = pageBtnNO * itemsPerPage;
    // console.log(startElement,endElement);
    document.getElementsByTagName('tbody')[0].innerHTML = "";// clear the complete table
    for (let i = startElement - 1; i < endElement; i++) {


        addRowToTable(dataFromApi[i]);
    }
};





//show complete api data
function showdata(data) {
    document.getElementsByTagName('tbody')[0].innerHTML = "";
    if (notSearch) {
        for (data in dataFromApi) {
            addRowToTable(dataFromApi[data]);
        }
    } else {
        for (data in searchResult) {
            addRowToTable(searchResult[data]);
        }
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
    } else {
        imageCell.innerHTML = `<img src="${data.avatar}" alt="image" width="100px" height="100px">`;
    }


}

// Function to handle form submission
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    // Get the form input values
    var firstName = document.getElementById("validationDefault01").value;
    var lastName = document.getElementById("validationDefault02").value;
    var rollNo = document.getElementById("validationDefault06").value;
    var image = document.getElementById("validationDefault05").value;
    // Create an object to hold the data
    var formData = {
        first_name: firstName,
        last_name: lastName,
        id: rollNo,
        avatar: image
    };
    let pageNooo = 1;
    fetch(link + + `?page=${pageNooo}`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
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


document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var searchValue = document.getElementById("search").value;
    // console.log("121332",searchValue);
    ;
    // console.log("dataFromApi",dataFromApi);
    // // console.log("dataaaa",data);
    for (var i = 0; i < dataFromApi.length; i++) {
        if (dataFromApi[i].first_name.toLowerCase().includes(searchValue.toLowerCase())) {
            searchResult.push(dataFromApi[i]);
        }
    }
    notSearch = false;
    showdata(searchResult);
    document.getElementById("searchForm").reset();
    searchResult = [];
});