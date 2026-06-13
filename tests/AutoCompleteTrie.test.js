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
