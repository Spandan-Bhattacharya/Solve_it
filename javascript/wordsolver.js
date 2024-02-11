// Function to fetch the dataset from the JSON file
function fetchDataset() {
  return fetch("../javascript/wordsolverDataset/dataset.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching dataset:", error);
      return [];
    });
}

// Using async/await to handle the asynchronous fetch
async function solveWords() {
  var inputLetters = document
    .getElementById("inputLetters")
    .value.toLowerCase();

  if (inputLetters.trim() !== "") {
    try {
      const englishWords = await fetchDataset();

      var results = {};

      for (var i = 0; i < englishWords.length; i++) {
        var word = englishWords[i];
        var isValid = true;

        for (var j = 0; j < word.length; j++) {
          if (inputLetters.indexOf(word[j]) === -1) {
            isValid = false;
            break;
          }
        }
        
        if (isValid) {
          // comparing the count of letters in input word and the new word
          mapping_input_letters = {};
          mapping_new_word = {};
          for (var j = 0; j < inputLetters.length; j++)
            mapping_input_letters[inputLetters[j]] = (mapping_input_letters[inputLetters[j]] || 0) + 1;

          for (var j = 0; j < word.length; j++)
            mapping_new_word[word[j]] = (mapping_new_word[word[j]] || 0) + 1;

          var isValid = true;
          for (var key in mapping_new_word) {
            if (mapping_input_letters[key] < mapping_new_word[key]) {
              isValid = false;
              break;
            }
          }
          if (isValid) {
            var length = word.length.toString();
            results[length] = results[length] || [];
            results[length].push(word);
          }
        }
      }
      
      displayResults(results);
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    alert("Please enter letters!");
  }
}

// Function to display the results
function displayResults(results) {
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = "";

  for (var length in results) {
    if (results.hasOwnProperty(length)) {
      resultElement.innerHTML += `<li><b>${length} letter:</b> ${results[length].join(
        ", "
      )}</li>`;
    }
  }
}

// function to redirect to home
function homeRedirect () {
  window.location.href = '../index.html';
}
