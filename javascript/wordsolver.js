    const englishWords = [
      // ... (use a larger dictionary)
      "hand", "had", "dah", "and", "ah", "ha", "ad", "an", "da", "nah",
      "cat", "bat", "act", "tab", "cab", "can", "tan", "ant", "tan", "nat",
      // ...
    ];

    function solveWords() {
      var inputLetters = document.getElementById("inputLetters").value.toLowerCase();

      if (inputLetters.trim() !== "") {
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
            var length = word.length.toString();
            results[length] = results[length] || [];
            results[length].push(word);
          }
        }

        displayResults(results);
      } else {
        alert("Please enter letters!");
      }
    }

    function displayResults(results) {
      var resultElement = document.getElementById("result");
      resultElement.innerHTML = "";

      for (var length in results) {
        if (results.hasOwnProperty(length)) {
          resultElement.innerHTML += `<p>${length} letter: ${results[length].join(", ")}</p>`;
        }
      }
    }