# AutoComplete Trie App 🌳

An interactive Command Line Interface (CLI) application that implements a custom **Trie (Prefix Tree)** data structure to provide fast, optimized auto-complete word suggestions.

## 🚀 Overview
Traditional dictionary searches can be slow ($O(N)$ time complexity). This project solves that by using a Trie, reducing the search and insertion time down to **$O(m)$** (where $m$ is the length of the word), completely independent of the total number of words stored in the dictionary.

## ✨ Features
* **Custom Trie Data Structure:** Built from scratch using JavaScript objects and nodes.
* **Fast Insertion & Lookup:** Add and find words in the dictionary instantly.
* **Smart Auto-Complete:** Type a prefix to instantly get an array of all possible full-word completions.
* **Ranked Suggestions (Bonus):** Tracks the frequency of selected words and returns the most popular suggestions first!
* **Interactive Console UI:** A continuous CLI loop providing real-time feedback for the user.
* **Fully Tested:** Comprehensive unit testing covering all tree operations and edge cases.

## 📁 Project Structure
```text
├── src/
│   ├── AutoCompleteTrie.js   # The core Trie logic and Node structure
│   └── consoleApp.js         # Interactive CLI user interface
├── tests/
│   └── AutoCompleteTrie.test.js  # Unit tests
└── README.md
