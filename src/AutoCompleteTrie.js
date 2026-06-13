class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
  }
}

class AutoCompleteTrie {
  constructor() {
    this.root = new TrieNode("");
  }
}

module.exports = AutoCompleteTrie;
