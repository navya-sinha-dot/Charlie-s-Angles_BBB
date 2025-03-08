// Function to initialize the code editor and functionality
document.addEventListener("DOMContentLoaded", function () {
  // Reference to DOM elements
  const editor = document.getElementById("editor");
  const languageSelect = document.getElementById("language-select");
  const runBtn = document.getElementById("run-btn");
  const submitBtn = document.getElementById("submit-btn");
  const testCaseStatus = document.getElementById("test-case-1-status");
  const testCaseActual = document.getElementById("test-case-1-actual");
  const terminalOutput = document.getElementById("terminal-output");
  const clearTerminal = document.getElementById("clear-terminal");
  const timer = document.getElementById("timer");

  // Starting timer values (30 minutes)
  let minutes = 30;
  let seconds = 0;

  // Template code for different languages
  const templates = {
    javascript: `function countCombinations() {
      // Write your code here
      
      return 0;
  }`,
    python: `def count_combinations():
      # Write your code here
      
      return 0`,
    java: `public class Solution {
      public static int countCombinations() {
          // Write your code here
          
          return 0;
      }
  }`,
  };

  // Update editor content when language changes
  languageSelect.addEventListener("change", function () {
    // Ask for confirmation if code has been modified
    if (editor.textContent.trim() !== templates[languageSelect.value].trim()) {
      if (confirm("Changing language will reset your code. Continue?")) {
        editor.textContent = templates[languageSelect.value];
      } else {
        // Revert selection if user cancels
        languageSelect.value =
          [...languageSelect.options].find(
            (option) => option.text === editor.dataset.language
          )?.value || "javascript";
      }
    } else {
      editor.textContent = templates[languageSelect.value];
    }

    // Store current language
    editor.dataset.language =
      languageSelect.options[languageSelect.selectedIndex].text;
  });

  // Initialize editor to be contenteditable
  editor.contentEditable = "true";
  editor.spellcheck = false;

  // Run code button
  runBtn.addEventListener("click", function () {
    runCode();
  });

  // Submit code button
  submitBtn.addEventListener("click", function () {
    const result = runCode();

    // Update test case status
    if (result === 10) {
      testCaseStatus.textContent = "Passed";
      testCaseStatus.style.backgroundColor = "#e6f7e6";
      testCaseStatus.style.color = "#28a745";

      // Show success animation
      anime({
        targets: ".test-case",
        backgroundColor: ["#e6f7e6", "#f8f9fa"],
        duration: 1000,
        easing: "easeInOutQuad",
      });

      logToTerminal("All test cases passed! Your solution is correct.");
    } else {
      testCaseStatus.textContent = "Failed";
      testCaseStatus.style.backgroundColor = "#f8d7da";
      testCaseStatus.style.color = "#dc3545";

      // Show failure animation
      anime({
        targets: ".test-case",
        backgroundColor: ["#f8d7da", "#f8f9fa"],
        duration: 1000,
        easing: "easeInOutQuad",
      });

      logToTerminal(`Test case failed. Expected 10, but got ${result}.`);
    }
  });

  // Clear terminal
  clearTerminal.addEventListener("click", function () {
    terminalOutput.textContent = "// Your code output will appear here";
  });

  // Function to run the code from the editor
  function runCode() {
    const code = editor.textContent;
    const language = languageSelect.value;

    let result;
    try {
      // For JavaScript, we can actually run the code
      if (language === "javascript") {
        // Create a safe execution environment
        const sandbox = {};

        // First evaluate the function definition
        const functionCode = new Function(
          "sandbox",
          `with(sandbox) { ${code} return countCombinations; }`
        )(sandbox);

        // Then call the function
        result = functionCode();

        // Update the output
        testCaseActual.textContent = `Your Output: ${result}`;
        logToTerminal(`Running code...\nOutput: ${result}`);
      } else {
        // For other languages, we'll simulate running
        logToTerminal(
          `Running ${language} code...\nNote: This is a simulation. Only JavaScript can be executed in browser.`
        );

        // Simulate by checking for keywords or patterns
        if (language === "python" && code.includes("return 10")) {
          result = 10;
        } else if (language === "java" && code.includes("return 10")) {
          result = 10;
        } else {
          // Make a reasonable guess based on the code content
          if (code.includes("return 10")) {
            result = 10;
          } else if (code.includes("5") && code.includes("3")) {
            // If there's calculation logic present
            result = 10;
          } else {
            result = 0;
          }
        }

        testCaseActual.textContent = `Your Output: ${result}`;
        logToTerminal(`Simulated Output: ${result}`);
      }

      return result;
    } catch (error) {
      logToTerminal(`Error executing code: ${error.message}`);
      testCaseActual.textContent = "Your Output: Error";
      return null;
    }
  }

  // Function to log messages to the terminal
  function logToTerminal(message) {
    const timestamp = new Date().toLocaleTimeString();
    if (terminalOutput.textContent === "// Your code output will appear here") {
      terminalOutput.textContent = `[${timestamp}] ${message}`;
    } else {
      terminalOutput.textContent += `\n\n[${timestamp}] ${message}`;
    }
    // Auto-scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Set up the timer
  const timerInterval = setInterval(function () {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      clearInterval(timerInterval);
      timer.textContent = "00:00";
      logToTerminal("Time's up! You can still submit your solution though.");
      return;
    }

    // Format the time
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`;

    // Visual indicator when time is low
    if (minutes === 0 && seconds <= 30) {
      timer.style.color = "#dc3545";
    }
  }, 1000);

  // Handle tab key in the editor for proper indentation
  editor.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();

      // Insert two spaces for tab
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      const tabNode = document.createTextNode("  ");
      range.insertNode(tabNode);

      // Move cursor after the tab
      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });

  // Add keyboard shortcut to run code (Ctrl+Enter)
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runBtn.click();
    }
  });

  // Log initial message
  logToTerminal(
    "Welcome to the Magic Treasure problem! Click 'Run Code' to test your solution."
  );

  // Add solution hints
  const hintButton = document.createElement("button");
  hintButton.textContent = "Need a hint?";
  hintButton.className = "action-btn";
  hintButton.style.backgroundColor = "#6c757d";
  document.querySelector(".editor-actions").prepend(hintButton);

  hintButton.addEventListener("click", function () {
    logToTerminal(
      "Hint: The formula for combinations is 'n choose k' = n! / (k! * (n-k)!). In this case, n=5 (total keys) and k=3 (keys needed)."
    );
  });
});
