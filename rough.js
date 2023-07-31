let arr = []   //array to store data from API
async function getData() {
    const response = await fetch("https://reqres.in/api/users");
    const data = await response.json();
    let reqData = data.data;
    return reqData;
}   //function to get data from API
getData()  //calling the function
    .then((data) => {
       
        arr = data;
        console.log(arr);
        // for (let i = 0; i < arr.length; i++) {
        //     addRowToTable(arr[i]);
        // }
    }
    )
    .catch((error) => {
        console.log(error);
    }
    );  //adding data to the table
