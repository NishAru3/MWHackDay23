// // ... Your existing JavaScript code ...

// // Modal functionality
// const modal = document.getElementById("myModal");
// const openModalBtn = document.getElementById("openModalButton");
// const closeModalBtn = document.getElementsByClassName("close")[0];

// // Open the modal
// openModalBtn.addEventListener("click", function() {
//     modal.style.display = "block";
// });

// // Close the modal when the close button or outside modal area is clicked
// closeModalBtn.addEventListener("click", function() {
//     modal.style.display = "none";
// });

// window.addEventListener("click", function(event) {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// });

// // ... Your existing JavaScript code ...
// Modal functionality
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalButton");
const closeModalBtn = document.getElementsByClassName("close")[0];

// Open the modal
openModalBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

// Close the modal when the close button or outside modal area is clicked
closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// ... Your other JavaScript code ...
