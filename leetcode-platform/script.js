document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const languageSelector = document.getElementById('language');
    const runButton = document.getElementById('run-button');
    const submitButton = document.getElementById('submit-button');
    const outputConsole = document.getElementById('output');

    // Initialize CodeMirror
    const editor = CodeMirror.fromTextArea(codeEditor, {
        lineNumbers: true,
        mode: "javascript", // Default mode
        theme: "dracula",
        indentUnit: 4,
        tabSize: 4,
        autoCloseBrackets: true,
        matchBrackets: true,
    });

    // Set initial code for JavaScript
    editor.setValue(`function twoSum(nums, target) {
    // Write your code here
    // For example:
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Example usage (for testing in console)
// const nums = [2, 7, 11, 15];
// const target = 9;
// console.log(twoSum(nums, target)); // Expected: [0, 1]`);

    // Update CodeMirror mode on language change
    languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        let mode = "javascript";
        let defaultCode = "// Write your code here";

        switch (selectedLanguage) {
            case "python":
                mode = "python";
                defaultCode = `def two_sum(nums, target):
    # Write your code here
    # For example:
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Example usage (for testing in console)
# nums = [2, 7, 11, 15]
# target = 9
# print(two_sum(nums, target)) # Expected: [0, 1]`;
                break;
            case "java":
                mode = "text/x-java";
                defaultCode = `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        // For example:
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
}

// Example usage (for testing in console)
// int[] nums = {2, 7, 11, 15};
// int target = 9;
// Solution sol = new Solution();
// int[] result = sol.twoSum(nums, target);
// System.out.println(java.util.Arrays.toString(result)); // Expected: [0, 1]`;
                break;
            case "javascript":
            default:
                mode = "javascript";
                defaultCode = `function twoSum(nums, target) {
    // Write your code here
    // For example:
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Example usage (for testing in console)
// const nums = [2, 7, 11, 15];
// const target = 9;
// console.log(twoSum(nums, target)); // Expected: [0, 1]`;
                break;
        }
        editor.setOption("mode", mode);
        editor.setValue(defaultCode);
    });

    // Run Code functionality (simulated)
    runButton.addEventListener('click', () => {
        const code = editor.getValue();
        const language = languageSelector.value;
        outputConsole.textContent = "Running code...\n\n";

        // Basic simulation - In a real application, this would send code to a backend compiler
        try {
            let result = "";
            if (language === "javascript") {
                // For JS, we can try to eval, but it's not safe for real platforms
                // For demonstration, we'll just show the code run in a mock environment
                // In a real scenario, this would be executed server-side.
                const mockNums = [2, 7, 11, 15];
                const mockTarget = 9;
                // WARNING: eval is dangerous and should not be used in production with user input.
                // This is purely for a basic front-end demonstration.
                const func = new Function('nums', 'target', code + '; return twoSum(nums, target);');
                result = "Output: " + JSON.stringify(func(mockNums, mockTarget));
                outputConsole.textContent += `Test Case: nums = [2,7,11,15], target = 9\n` + result + `\n` + `
Expected: [0,1]`;
            } else if (language === "python") {
                 outputConsole.textContent += `Python simulation output:\n`+
                                            `Test Case: nums = [2,7,11,15], target = 9\n`+
                                            `Output: [0,1]\n`+
                                            `Expected: [0,1]`;
            } else if (language === "java") {
                outputConsole.textContent += `Java simulation output:\n`+
                                            `Test Case: nums = [2,7,11,15], target = 9\n`+
                                            `Output: [0,1]\n`+
                                            `Expected: [0,1]`;
            }
            
        } catch (error) {
            outputConsole.textContent += `Error: ${error.message}`; 
        }
    });

    // Submit functionality (simulated)
    submitButton.addEventListener('click', () => {
        const code = editor.getValue();
        const language = languageSelector.value;
        outputConsole.textContent = "Submitting code...\n\n";

        // In a real application, this would send code to a backend for evaluation against test cases
        setTimeout(() => {
            outputConsole.textContent += `Code submitted for ${language}.\nRunning against test cases...\n\n`;
            outputConsole.textContent += `Test 1: Passed\n`;
            outputConsole.textContent += `Test 2: Passed\n`;
            outputConsole.textContent += `Test 3: Failed (Wrong Answer)\n`;
            outputConsole.textContent += `
Status: Accepted (3/4 test cases passed)`;
        }, 1500); // Simulate network delay
    });
});
