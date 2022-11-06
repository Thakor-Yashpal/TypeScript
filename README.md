# TypeScript

Prerequisites
To complete this tutorial, you will need the following:

The latest version of Node installed on your machine. You can accomplish this by following the How to Install Node.js and Create a Local Development Environment tutorial.
Familiarity with npm. npm comes with Node. To learn more about working with npm, check out this How To Use Node.js Modules with npm and package.json tutorial.
Step 1 — Starting the TypeScript Project
To begin your TypeScript project, you will need to create a directory for your project:

mkdir typescript-project
Now change into your project directory:

cd typescript-project
With your project directory set up, you can install TypeScript:

npm i typescript --save-dev
It is important to include the --save-dev flag because it saves TypeScript as a development dependency. This means that TypeScript is absolutely required for the development of your project.

With TypeScript installed, you can initialize your TypeScript project by using the following command:

npx tsc --init
npm also includes a tool called npx, which will run executable packages. npx allows us to run packages without having to install them globally.

The tsc command is used here because it is the built-in TypeScript compiler. When you write code in TypeScript, running tsc will transform or compile your code into JavaScript.

Using the --init flag in the above command will initialize your project by creating a tsconfig.json file in your typescript-project project directory. This tsconfig.json file will allow you to configure further and customize how TypeScript and the tsc compiler interact. You can remove, add, and change configurations in this file to best meet your needs.

Open tsconfig.json in your editor:

nano tsconfig.json
You, and you will find the default configuration. There will be many options, most of which are commented out:

typescript-project/tsconfig.json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Enable incremental compilation */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */
    
    . . .
  }
}
You can customize your TypeScript configuration. In the tsconfig.json file. For instance, you might consider uncommenting the outDir entry and setting it to "./build", which will put all of your compiled TypeScript files into that directory.

With TypeScript installed and your tsconfig.json file in place, you can now move on to coding your TypeScript app and compiling it.

Note: Step 3 below will replace many of your configurations with sensible defaults, but these changes will get you started right away.

Step 2 — Compiling the TypeScript Project
You can now begin coding your TypeScript project. Open a new file named index.ts in youreditor. Write the following TypeScript code in index.ts:

typescript-project/index.ts
const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}
With this TypeScript code in place, your project is ready to be compiled. Run tsc from your project’s directory:

npx tsc
You will notice that the compiled JavaScript index.js file and the index.js.map sourcemap file have both been added to the build folder if you specified that in the tsconfig.js file.

Open index.js and you will find the following compiled JavaScript code:

typescript-project/build/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const world = 'world';
function hello(who = world) {
    return `Hello ${who}! `;
}
exports.hello = hello;
Running the TypeScript compiler every time you make a change can be tedious. To fix this, you can put the compiler in watch mode. Setting the compiler to watch mode means that your TypeScript file will be recompiled every time changes are made.

You can activate watch mode using the following command:

npx tsc -w
You’ve learned how the TypeScript compiler works, and you are now able to successfully compile your TypeScript files. You can take your TypeScript projects to the next level by introducing a linter into your workflow.

Step 3 — Using Google TypeScript Style to Lint and Correct Your Code
Using a linter when coding will help you to quickly find inconsistencies, syntax errors, and omissions in your code. Additionally, a style guide will not only help you ensure that your code is well-formed and consistent but allows you to use additional tools to enforce that style. A common tool for these is eslint, which works well with many IDEs to help during the development process.

With your project now set up, you can use other tools in the TypeScript ecosystem to help and avoid having to set up linting and configuration in the tsconfig.json file by hand. Google TypeScript Style is one such tool. Google TypeScript Style, known as GTS, is a style guide, linter, and automatic code corrector all in one. Using GTS will help you to quickly bootstrap a new TypeScript project and avoid focusing on small, organizational details to focus on designing your project. GTS also offers opinionated default configuration. This means that you won’t have to do much configuration customization.

Begin by installing GTS:

npm i gts --save-dev
From here, initialize GTS using the following command:

npx gts init
The above command will generate everything you need to get started with your TypeScript, including a tsconfig.json file and a linting setup. A package.json file will also be generated if you don’t have one in place already.

Running npx gts init will also add helpful npm scripts to your package.json file. For example, you can now run npm run compile to compile your TypeScript project. To check for linting errors, you can now run npm run check.

Note: Installing TypeScript before installing GTS ensures that you have the most recent version of TypeScript when developing your application. As a result of GTS development moving more slowly than that of TypeScript, you may find that it will suggest downgrading TypeScript in your dev dependencies. You can instruct GTS not to overwrite this value if you need the newer features.

Additionally, as the eslint TypeScript linter has a range of supported versions of TypeScript, newer versions of the language may fall outside of this range. In this case, eslint will warn you of such. There is a good chance that it will continue to work just fine, but if you do run into problems, you can downgrade your version of TypeScript by specifying it when you install. For example, npm i typescript@4.4.2 --save-dev.

GTS is now installed and properly integrated into your TypeScript project. Using GTS on future projects will allow you to quickly set up new TypeScript projects with the necessary configurations in place.

As GTS provides an opinionated, no-configuration approach, it will use its own sensible linting and fixing rules. These follow many best practices, but if you find yourself needing to modify the rules in any way, you can do so by extending the default eslint rules. To do so, create a file in your project directory named .eslintrc which extends the style rules:

---
extends:
  - './node_modules/gts'
This will allow you to add to or modify the style rules provided by GTS.

Conclusion
In this tutorial, you began a TypeScript project with customized configurations. You also integrated Google TypeScript Style into your TypeScript project. Using GTS will help you to quickly get up and running with a new TypeScript project. With GTS, you won’t need to manually set up configuration or integrate a linter into your workflow.
