import AutoCompleteTrie from "../shared/AutoCompleteTrie.js";

const trie = new AutoCompleteTrie();

const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions-list");
const newWordInput = document.getElementById("new-word-input");
const addWordBtn = document.getElementById("add-word-btn");
const wordCountNumber = document.getElementById("word-count-number");

function updateWordCountDisplay() {
  wordCountNumber.textContent = trie.getWordCount();
}

function renderSuggestions(predictions, currentPrefix) {
  suggestionsList.innerHTML = "";
  if (predictions.length === 0 || currentPrefix === "") {
    suggestionsList.style.display = "none";
    return;
  }

  predictions.forEach((predictionString) => {
    const word = predictionString.split(" ")[0];

    const frequencyMatch = predictionString.match(/\s\(\d+\)$/);
    const frequencyText = frequencyMatch ? frequencyMatch[0] : "";

    const li = document.createElement("li");
    if (word.toLowerCase().startsWith(currentPrefix.toLowerCase())) {
      const prefixLength = currentPrefix.length;
      const highlightedPart = word.substring(0, prefixLength);
      const remainingPart = word.substring(prefixLength);

      // הרכבת ה-HTML עם תגית ה-span של המרקר
      li.innerHTML = `<span class="highlight">${highlightedPart}</span>${remainingPart}${frequencyText}`;
    } else {
      // אם מכל סיבה שהיא זה לא מתחיל בזה, נציג כטקסט רגיל
      li.textContent = predictionString;
    }

    li.addEventListener("click", () => {
      searchInput.value = word;
      trie.useWord(word);
      suggestionsList.style.display = "none";
      updateAutocomplete();
    });
    suggestionsList.appendChild(li);
  });
  suggestionsList.style.display = "block";
}

function updateAutocomplete() {
  const query = searchInput.value.trim();
  const predictions = trie.predictWords(query);
  renderSuggestions(predictions, query);
}

// האזנה לאירועים
searchInput.addEventListener("input", updateAutocomplete);

const notificationBanner = document.getElementById("notification-banner");
const addedWordPlaceholder = document.getElementById("added-word-placeholder");
let notificationTimeout;

function showSuccessNotification(word) {
  // אם יש טיימר קודם שרץ (למשל אם לחצו פעמיים מהר), נבטל אותו
  clearTimeout(notificationTimeout);

  // עדכון הטקסט בתוך הבאנר
  addedWordPlaceholder.textContent = word;

  // הצגת הבאנר
  notificationBanner.style.display = "flex";

  // העלמת הבאנר באופן אוטומטי לאחר 3 שניות (3000 מילישניות)
  notificationTimeout = setTimeout(() => {
    notificationBanner.style.display = "none";
  }, 3000);
}

addWordBtn.addEventListener("click", () => {
  const newWord = newWordInput.value.trim();
  if (newWord) {
    trie.addWord(newWord);
    newWordInput.value = "";

    updateWordCountDisplay();
    updateAutocomplete();

    showSuccessNotification(newWord);
  }
});

updateWordCountDisplay();

document.addEventListener("click", (e) => {
  if (e.target !== searchInput && e.target !== suggestionsList) {
    suggestionsList.style.display = "none";
  }
});
