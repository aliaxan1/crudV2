async function apiData() {
    const response = await fetch("https://reqres.in/api/users");
    const data = await response.json();
    return data.data;
  }
// JavaScript code for CRUD operations
document.addEventListener('DOMContentLoaded', () => {
    // Sample data for initial rendering
    let records = [];
  
    // Function to render table rows
    function renderTable() {
      const tableBody = document.querySelector("#dataTable tbody");
      tableBody.innerHTML = "";
  
      records.forEach(function(record) {
        const row = `<tr>
                      <td>${record.firstName}</td>
                      <td>${record.lastName}</td>
                      <td>${record.rollNo}</td>
                      <td>${record.city}</td>
                      <td>${record.phoneNo}</td>
                      <td><img src="${record.image}" alt="not loaded" width="100" height="100"></td>
                    </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }
  
    // Function to add a new record
    function addRecord(firstName, lastName, rollNo, city, phoneNo, image) {
      records.push({ firstName, lastName, rollNo, city, phoneNo, image });
      renderTable();
    }
  
    // Event listener for the create button in the modal
    const createBtn = document.getElementById("create-btn");
    createBtn.addEventListener("click", function(event) {
      event.preventDefault();
      const firstName = document.getElementById("validationDefault01").value;
      const lastName = document.getElementById("validationDefault02").value;
      const rollNo = document.getElementById("validationDefault06").value;
      const city = document.getElementById("validationDefault03").value;
      const phoneNo = document.getElementById("validationDefault04").value;
      const image = document.getElementById("validationDefault05").value; // Note: File input won't provide the actual file path for security reasons. You'll need to handle this differently in a real application.
  
      addRecord(firstName, lastName, rollNo, city, phoneNo, image);
      document.getElementById("exampleModal").classList.remove("show");
      document.getElementById("exampleModal").style.display = "none";
      document.body.classList.remove("modal-open");
      document.getElementsByClassName("modal-backdrop")[0].remove();
    });
  
    // Fetch data from the API and populate the table
    async function fetchDataAndPopulateTable() {
      try {
        const data = await apiData();
        records = data.map(user => ({
          firstName: user.first_name,
          lastName: user.last_name,
          rollNo: user.id,
          city: user.email,
          phoneNo: user.phone,
          image: user.avatar
        }));
        renderTable();
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    }
  
    // Initialize the table on page load
    fetchDataAndPopulateTable();
  });
  