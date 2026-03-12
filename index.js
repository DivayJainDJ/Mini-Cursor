import { GoogleGenAI } from "@google/genai";
import { exec } from "child_process";
import 'dotenv/config'
import os from "os";
import util from "util"
import readlineSync from "readline-sync"

const platform=os.platform();

const execute = util.promisify(exec);

const ai = new GoogleGenAI({});

async function executeCommand({command}){
    try{
    const {stdout,stderr} = await execute(command);
    if(stderr){
        return `Error: ${stderr}`;
    }
    return `Success: ${stdout}`
    }
    catch(err){
        return `Error: ${err}`;
    }

}

const commandExecuter={
    name:"executeCommand",
    description:"It takes any shell/terminal command and execute it.It will help us to create,read,write,update and delete any folder and file",
    parameters:{
        type:"object",
        properties:{
            command:{
                type:"string",
                description:"It is the terminal/shell command.Ex: mkdir calculator,touch calculator/index.js etc."
            }
        },
        required:['command']
    }
}

const History=[];

async function buildWebsite(){
    while(true){
    const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:History,
        config: { 
            systemInstruction:`You are an elite full-stack web development assistant specializing in creating production-ready, modern web applications. Your expertise encompasses industry-standard practices, clean code architecture, and seamless user experiences.

Core Responsibilities:
- Analyze user requirements with precision and translate them into actionable development tasks
- Execute shell/terminal commands systematically to build complete web applications
- Ensure cross-platform compatibility (Current OS: ${platform})
- Implement best practices for file structure, code organization, and maintainability
- Handle multi-line file operations efficiently using appropriate shell commands
- Proactively identify and resolve errors throughout the development lifecycle

Critical Workflow Requirement:
After creating any file (HTML, CSS, or JavaScript), you MUST immediately write complete, functional content to that file. Do not create empty files and stop - always follow file creation with content writing in the same workflow sequence.

Development Workflow:
1. Project Initialization: Create a well-structured project directory with semantic naming conventions
   Example: mkdir calculator-app

2. File Structure Setup: Establish the foundational files following industry standards
   - HTML: touch calculator-app/index.html
   - CSS: touch calculator-app/styles.css (or assets/css/main.css for larger projects)
   - JavaScript: touch calculator-app/script.js (or assets/js/main.js for modular architecture)

3. Content Implementation (CRITICAL - Execute immediately after file creation):
   - IMMEDIATELY after creating HTML file, write complete HTML content with proper document structure, meta tags, semantic elements, and all necessary markup
   - IMMEDIATELY after creating CSS file, write complete CSS with modern techniques (Flexbox/Grid, responsive design, CSS variables), styling for all elements, and proper formatting
   - IMMEDIATELY after creating JavaScript file, write complete JavaScript following ES6+ standards with error handling, event listeners, and all necessary functionality
   - Use appropriate shell commands for multi-line writes: cat with heredoc, echo with proper escaping, or file redirection
   - Example for writing HTML: cat > calculator-app/index.html << 'EOF'
     [complete HTML content here]
     EOF
   - Example for writing CSS: cat > calculator-app/styles.css << 'EOF'
     [complete CSS content here]
     EOF
   - Example for writing JS: cat > calculator-app/script.js << 'EOF'
     [complete JavaScript content here]
     EOF

4. Quality Assurance: Review, test, and refine the implementation
   - Verify cross-browser compatibility
   - Ensure responsive design principles
   - Optimize for performance and accessibility
   - Fix any errors or edge cases

Technical Standards:
- Use platform-appropriate commands (considering ${platform} environment)
- Implement proper error handling and validation
- Follow semantic HTML5 standards
- Apply modern CSS methodologies
- Write maintainable, documented JavaScript code
- Ensure responsive and accessible design patterns

Command Execution Guidelines:
- Execute commands sequentially and verify each step
- ALWAYS write complete content immediately after creating any file - never leave files empty
- Use appropriate methods for multi-line file writes (heredoc with cat, echo with proper escaping, or file redirection)
- Handle file paths correctly for the target operating system
- Verify command success before proceeding to the next step
- Continue executing commands until all files are created AND populated with complete, functional content

Important: Your workflow should be: Create file → Write content → Create next file → Write content. Never create multiple empty files and then write to them later. Always complete each file fully before moving to the next.

Your goal is to deliver professional, production-ready web applications that demonstrate industry best practices and exceptional code quality.
For Windows, write multi-line HTML like this:

            echo ^<!DOCTYPE html^> > calculator\\index.html
            echo ^<html^> >> calculator\\index.html
            echo ^<head^> >> calculator\\index.html
            echo   ^<title^>Calculator^</title^> >> calculator\\index.html
            echo   ^<link rel="stylesheet" href="style.css"^> >> calculator\\index.html
            echo ^</head^> >> calculator\\index.html
            echo ^<body^> >> calculator\\index.html
            echo   ^<div id="calculator"^>^</div^> >> calculator\\index.html
            echo   ^<script src="script.js"^>^</script^> >> calculator\\index.html
            echo ^</body^> >> calculator\\index.html
            echo ^</html^> >> calculator\\index.html
            

        For Mac/Linux, write multi-line HTML like this:

        cat > calculator/index.html << 'EOF'
        <!DOCTYPE html>
        <html>
        <head>
        <title>Calculator</title>
        <link rel="stylesheet" href="style.css">
        </head>
        <body>
        <div id="calculator"></div>
        <script src="script.js"></script>
        </body>
        </html>
        EOF
`,
            tools:[
            {
                functionDeclarations:[commandExecuter]
            }
            ]
        },
    });

    if(result.functionCalls&&result.functionCalls.length>0){
        const functionCall = result.functionCalls[0];
        const {name,args} = functionCall;
        const response = await executeCommand(args);
        const functionResponsePart = {
            name: functionCall.name,
            response: {
              result: response,
            },
          };
      
          // Send the function response back to the model.
          History.push({
            role: "model",
            parts: [
              {
                functionCall: functionCall,
              },
            ],
          });
          History.push({
            role: "user",
            parts: [
              {
                functionResponse: functionResponsePart,
              },
            ],
          });
    }
    else{
        console.log(result.text);
        History.push({
            role:"model",
            parts:[{text:result.text}]
        })
        break;
    }
}
}

while(true){
    const question=readlineSync.question("Ask me anything --> ");
    if(question=='exit'){
        break;
    }

    History.push({
        role:'user',
        parts:[{text:question}]
    })

    await buildWebsite();
}

//Create a leetcode type platform where we have a landing page for a coding problem which is present on left side,compiler on right side create proper buttons for submit and run the code and make the ui in dark mode and attractive with active functionality
//I wanted to create a clone platform of a platform that keeps the resources,projects,utilities which help us in our college.It have three main exploration tabs on landing page named Resources,Projects and Utilities and also have a menu button on top for redirecting to resources ,projects,utilities and contact.Make the ui in dark mode and attractive with every functionality working and the reference site to clone is https://riserit.vercel.app/.Please try to replicate it and have proper responsiveness everywhere.