const AutoCompleteTrie = require("../shared/AutoCompleteTrie");
const readline = require("readline");

const trie = new AutoCompleteTrie();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

function showHelp() {
  console.log("Commands:");
  console.log("  add <word>        - Add word to dictionary");
  console.log("  find <word>       - Check if word exists");
  console.log("  complete <prefix> - Get completions");
  console.log("  help              - Show this message");
  console.log("  exit              - Quit program\n");
}

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands\n");
rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  const parts = input.split(" ");
  const command = parts[0].toLowerCase();
  const argument = parts[1];

  switch (command) {
    case "exit":
      console.log("Goodbye!");
      process.exit(0);
      break;

    case "help":
      showHelp();
      break;

    case "add":
      if (!argument) {
        console.log("✗ Error: Please provide a word to add. (e.g., add cat)");
      } else {
        trie.addWord(argument);
        console.log(`✓ Added '${argument}' to dictionary\n`);
      }
      break;

    case "find":
      if (!argument) {
        console.log("✗ Error: Please provide a word to find.");
      } else {
        const exists = trie.findWord(argument);
        if (exists) {
          console.log(`✓ '${argument}' exists in dictionary\n`);
        } else {
          console.log(`✗ '${argument}' not found in dictionary\n`);
        }
      }
      break;

    case "complete":
      if (!argument) {
        console.log("✗ Error: Please provide a prefix for completion.");
      } else {
        const results = trie.predictWords(argument);
        if (results.length > 0) {
          console.log(`Suggestions for '${argument}': ${results.join(", ")}\n`);
        } else {
          console.log(`✗ No suggestions found for '${argument}'\n`);
        }
      }
      break;

    case "use":
      if (!argument) {
        console.log("✗ Error: Please provide a word to use.");
      } else {
        const newFreq = trie.useWord(argument);
        if (newFreq !== null) {
          console.log(
            `✓ Incremented usage for '${argument}' (now ${newFreq})\n`,
          );
        } else {
          console.log(
            `✗ '${argument}' does not exist in dictionary. Add it first.\n`,
          );
        }
      }
      break;

    default:
      if (command) {
        console.log(
          `✗ Unknown command: '${command}'. Type 'help' for available commands.\n`,
        );
      }
      break;
  }

  rl.prompt();
});
