class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
    this.frequency = 0;
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
    return currentNode;
  }

  _allWordsHelper(prefix, node, allWords) {
    if (node.endOfWord) {
      allWords.push({ word: prefix, frequency: node.frequency });
    }
    for (let child in node.children) {
      this._allWordsHelper(prefix + child, node.children[child], allWords);
    }
  }

  predictWords(prefix) {
    let targetNode = this._getRemainingTree(prefix);
    if (!targetNode) return [];
    let allWords = [];
    this._allWordsHelper(prefix, targetNode, allWords);
    allWords.sort((a, b) => b.frequency - a.frequency);
    return allWords.map((item) => `${item.word} (${item.frequency})`);
  }

  useWord(word) {
    let node = this._getRemainingTree(word);
    if (node && node.endOfWord) {
      node.frequency += 1;
      return node.frequency;
    }

    return null;
  }

  getWordCount() {
    let allWords = [];
    this._allWordsHelper("", this.root, allWords);
    return allWords.length;
  }
}

export default AutoCompleteTrie;
