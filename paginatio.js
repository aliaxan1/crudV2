// Import the API data
import {getData} from './apiData.js';

// Get the table element
const table = document.getElementById('dataTable');

// Get the search input element
const searchInput = document.getElementById('search');

// Get the create record button
const createRecordButton = document.getElementById('create-btn');

// Create a function to fetch the records from the API
const fetchRecords = async () => {
  const records = await getData();

  // Add the records to the table
  for (const record of records) {
    const row = document.createElement('tr');

    for (const key in record) {
      const cell = document.createElement('td');
      cell.textContent = record[key];
      row.appendChild(cell);
    }

    table.appendChild(row);
  }
};

// Create a function to handle the search input
const handleSearch = () => {
  const searchTerm = searchInput.value.toLowerCase();

  // Clear the table
  table.innerHTML = '';

  // Only fetch the records that match the search term
  fetchRecords().then(records => {
    for (const record of records) {
      if (record.name.toLowerCase().includes(searchTerm)) {
        const row = document.createElement('tr');

        for (const key in record) {
          const cell = document.createElement('td');
          cell.textContent = record[key];
          row.appendChild(cell);
        }

        table.appendChild(row);
      }
    }
  });
};

// Create a function to handle the create record button
const handleCreateRecord = () => {
  // Get the form data
  const formData = new FormData(document.getElementById('myForm'));

  // Submit the form data to the API
  apiData.createRecord(formData).then(() => {
    // Clear the form
    document.getElementById('myForm').reset();

    // Fetch the records from the API
    fetchRecords();
  });
};

// Initialize the functions
fetchRecords();
searchInput.addEventListener('input', handleSearch);
createRecordButton.addEventListener('click', handleCreateRecord);
