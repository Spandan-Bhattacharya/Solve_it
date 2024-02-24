 // Get the modal
 var modal = document.getElementById("instructionsModal");

 // When the user clicks on the Instructions tab, open the modal
 function openInstructions() {
   modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 function closeInstructions() {
   modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }