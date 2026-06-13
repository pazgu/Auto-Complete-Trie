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

  addWord(word) {
    let currentNode = this.root;
    for (let char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode(char);
      }
      currentNode = currentNode.children[char];
    }
    currentNode.endOfWord = true;
  }

  findWord(word) {
    let targetNode = this._getRemainingTree(word);
    if (!targetNode) return false;
    return targetNode.endOfWord;
  }

  _getRemainingTree(prefix) {
    let currentNode = this.root;
    for (let char of prefix) {
      if (!currentNode.children[char]) {
        return null;
      }
      currentNode = currentNode.children[char];
    }
    if (currentNode.endOfWord) return currentNode.endOfWord;
  }

  _getRemainingTree(prefix) {
    let currentNode = this.root;
    for (let char of prefix) {
      if (!currentNode.children[char]) {
        return null;
      }
      currentNode = currentNode.children[char];
    }
    return currentNode;
  }
}

module.exports = AutoCompleteTrie;
