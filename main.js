//global variables
let dataFromApi = [];
const link = "https://reqres.in/api/users";

// API to fetch data
async function apiCall(pageNo) {
  const response = await fetch(link + `?page=${pageNo}`);
  const data = await response.json();
  let reqData = data.data;
  return reqData;
}   //function to get data from API (one call)



// function to get data from API  [IIFE]
let callCount = 0;
(async (calls) => {
  let tempArr = [];
  callCount = calls + 1;
  for (let pageNo = 1; pageNo < callCount; pageNo++) {

    apiCall(pageNo)  //calling the function
      .then((data) => {
        if (pageNo == 1) {
          tempArr = data;
          // console.log(abc);
        }
        if (pageNo == 2) {
          dataFromApi = [...tempArr, ...data];
          pagination(dataFromApi);
          
        }

      })
      .catch((error) => {
        console.log("error", error);
      });  //adding data to the table          

  }
})(2); // number of calls to API







//pagination
let itemsPerPage = 4;

pagination = (data) => {

  let Pages = data.length / itemsPerPage;
  let totalPages = Math.ceil(Pages);
  pageBtnCreation(totalPages);
  chunkFunc(data);
}





pageBtnCreation = (totalPages) => {
  for (let i = 1; i <= totalPages; i++) {
    let ul = document.getElementById('pagination');
    ul.innerHTML += `<li class="page-item"  value='${i}' id='page${i}' onclick="changePageNo(event);"><a class="page-link" >${i}</a></li>`;
  }

}



// data chunk to display on table

chunkFunc = (data) => {
  let chunk = [];
  let value = 1;
  itemsPerPage = 4;
  let pageNO = value;

  changePageNo = (event) => {
    pageNO = event.target.parentElement.value;
    startElement = 0;
    endElement = 0;
    showChunkedTable();
  }



  showChunkedTable = () => {
    let startElement = ((pageNO - 1) * itemsPerPage) + 1;
    let endElement = pageNO * itemsPerPage;
    document.getElementsByTagName('tbody')[0].innerHTML = "";// clear the complete table
    for (let i = startElement - 1; i < endElement; i++) {
      chunk.push(data[i]);
    }
    showdata(chunk);
    chunk = [];
  }
  showChunkedTable();

};

// Render data on table  
showdata = (data) => {
  document.getElementsByTagName('tbody')[0].innerHTML = "";
  data.forEach((element) => {
    addRowToTable(element);
  });
};
addRowToTable = (element) => {    //function to add row to table
  let table = document.getElementsByTagName('tbody')[0];
  let row = table.insertRow();
  var firstNameCell = row.insertCell();
  var lastNameCell = row.insertCell();
  var rollNoCell = row.insertCell();
  var imageCell = row.insertCell();
  const actionCell = row.insertCell();
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editUser(element));
  actionCell.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.addEventListener("click", () => deleteUser(element));
  actionCell.appendChild(deleteButton);

  firstNameCell.innerHTML = element.first_name;
  lastNameCell.innerHTML = element.last_name;
  rollNoCell.innerHTML = element.id;
  if (element.avatar == "") {
    imageCell.innerHTML = `<img src="" alt="image not uploaded" width="100px" height="100px">`;
  } else {
    imageCell.innerHTML = `<img src="${element.avatar}" alt="image" width="100px" height="100px">`;
  }
};



//                   OPERATIONS ON TABLE DATA
// add row data
 submitForm = (event) => {
  event.preventDefault();
  var formData = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    id: document.getElementById("rollNo").value,
    avatar: document.getElementById("image").value,
  };
  dataFromApi.push(formData);
  document.getElementsByTagName('tbody')[0].innerHTML = "";
  document.getElementById('pagination').innerHTML = "";
  pagination(dataFromApi);

  document.getElementById("myForm").reset();
  fetch(link , {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log("data created",data);
    })
    .catch((error) => {
        console.log("error:data not created",error);
    });

};
// edit row data




// delete row data

 deleteUser = (data) => {
  // Remove the user from the array
  console.log(data);
  dataFromApi.splice(dataFromApi.indexOf(data), 1);
  console.log(dataFromApi.indexOf(data));
  console.log(dataFromApi);
  document.getElementsByTagName('tbody')[0].innerHTML = "";
  document.getElementById('pagination').innerHTML = "";
  // Render users in the table
  pagination(dataFromApi);

}


// search Functionality
let searchResult = [];
document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var searchValue = document.getElementById("search").value;
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
