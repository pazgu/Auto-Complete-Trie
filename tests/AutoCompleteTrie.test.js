const AutoCompleteTrie = require("../src/AutoCompleteTrie");
describe("AutoCompleteTrie - addWord", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
  });

  test("1. Should add a basic word successfully", () => {
    trie.addWord("cat");

    expect(trie.root.children["c"]).toBeDefined();
    expect(trie.root.children["c"].children["a"]).toBeDefined();
    expect(trie.root.children["c"].children["a"].children["t"]).toBeDefined();

    expect(trie.root.children["c"].endOfWord).toBe(false);
    expect(trie.root.children["c"].children["a"].endOfWord).toBe(false);
    expect(trie.root.children["c"].children["a"].children["t"].endOfWord).toBe(
      true,
    );
  });

  test("2. Should handle words with shared prefixes correctly", () => {
    trie.addWord("cat");
    trie.addWord("car");

    let nodeC = trie.root.children["c"];
    let nodeA = nodeC.children["a"];

    expect(nodeC).toBeDefined();
    expect(nodeA).toBeDefined();

    expect(nodeA.children["t"]).toBeDefined();
    expect(nodeA.children["r"]).toBeDefined();

    expect(nodeA.children["t"].endOfWord).toBe(true);
    expect(nodeA.children["r"].endOfWord).toBe(true);
  });

  test("3. Should handle repeated letters properly", () => {
    trie.addWord("aaa");

    let firstA = trie.root.children["a"];
    let secondA = firstA.children["a"];
    let thirdA = secondA.children["a"];

    expect(firstA).toBeDefined();
    expect(secondA).toBeDefined();
    expect(thirdA).toBeDefined();

    expect(firstA.endOfWord).toBe(false);
    expect(thirdA.endOfWord).toBe(true);
  });

  test("4. Should handle an empty string", () => {
    trie.addWord("");

    expect(trie.root.endOfWord).toBe(true);
    expect(Object.keys(trie.root.children).length).toBe(0);
  });
});

describe("AutoCompleteTrie - findWord", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    trie.addWord("apple");
  });

  test("1. Should return true for a word that exists", () => {
    expect(trie.findWord("cat")).toBe(true);
    expect(trie.findWord("apple")).toBe(true);
  });

  test("2. Should return false for a word that does not exist at all", () => {
    expect(trie.findWord("dog")).toBe(false);
    expect(trie.findWord("banana")).toBe(false);
  });

  test("3. Should return false for a prefix that is not a full word", () => {
    expect(trie.findWord("ca")).toBe(false);
    expect(trie.findWord("app")).toBe(false);
  });
});

describe("AutoCompleteTrie - _getRemainingTree (Helper)", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    trie.addWord("cat");
  });

  test("Should return the correct node for a valid prefix", () => {
    const node = trie._getRemainingTree("ca");

    expect(node).not.toBeNull();
    expect(node.children["t"]).toBeDefined();
  });

  test("Should return null for a non-existent prefix", () => {
    const node = trie._getRemainingTree("dog");
    expect(node).toBeNull();
  });
});

describe("AutoCompleteTrie - _allWordsHelper (Helper)", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
  });

  test("Should recursively collect all words from a given node into the array", () => {
    const startingNode = trie._getRemainingTree("ca");
    const resultArray = [];

    trie._allWordsHelper("ca", startingNode, resultArray);

    expect(resultArray).toContain("cat");
    expect(resultArray).toContain("car");
    expect(resultArray.length).toBe(2);
  });
});

describe("AutoCompleteTrie - predictWords", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    trie.addWord("cart");
    trie.addWord("dog");
    trie.addWord("apple");
  });

  test("1. Should return all words matching a given prefix", () => {
    const predictions = trie.predictWords("ca");

    expect(predictions).toContain("cat");
    expect(predictions).toContain("car");
    expect(predictions).toContain("cart");

    expect(predictions).not.toContain("dog");
    expect(predictions.length).toBe(3);
  });

  test("2. Should return an empty array if the prefix does not exist", () => {
    const predictions = trie.predictWords("xyz");
    expect(predictions).toEqual([]);
  });

  test("3. Should return the word itself if the prefix is a complete word with no deeper children", () => {
    const predictions = trie.predictWords("cart");
    expect(predictions).toEqual(["cart"]);
  });
});
