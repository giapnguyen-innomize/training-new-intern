# Training

This project provides information and is a place to store the results of the training process for new interns

# DAY 2

## NX Workspace

- What are the benefits of a monorepo?
  - The main benefit of using a monorepo is code sharing and reusability.
  - By storing all code for related projects or components in a single repository, developers can easily share and reuse code across different parts of the software.
  - This promotes consistency, reduces duplication, and simplifies maintenance of shared components and libraries.
- What is Nx workspace?
  - Nx workspace is a development environment provided by the Nx toolset, designed for building and managing monorepos.
  - Nx workspace provides a structured environment for developing multiple projects within a single repository.
- Folder structure of Nx Workspace?
  - myorg/  
    ├── apps/  
    ├── libs/  
    ├── tools/  
    ├── nx.json  
    └── tsconfig.base.json
  - `/apps/` contains the application projects. This is the main entry point for a runnable application.
  - `/libs/` contains the library projects.
  - `/tools/` contains scripts that act on your code base.
  - `/nx.json` configures the Nx CLI itself. It tells Nx what needs to be cached, how to run tasks etc.
  - `/tsconfig.base.json` sets up the global TypeScript settings and creates aliases for each library to aid when creating TS/JS imports.
- How many Library Types of Nx Workspace?
  1. Application Libraries
  - These libraries contain code that compiles to an executable application.
  - Application libraries contain the source code for the application itself and are intended to be runnable.
  2. Feature Libraries
  - Feature libraries contain code that encapsulates specific features or functionalities within an application.
  - They are reusable across multiple applications within the workspace and can be imported and utilized as needed.
  3. UI Libraries
  - These libraries contain reusable UI components, styles, and assets that can be shared across multiple applications within the workspace.
  - UI libraries help enforce consistency in the user interface and promote code reuse across projects.

## Project structure (Mirai)

This is the [structure of the Mirai](https://docs.google.com/document/d/1Z-2Xbalflmdkh8goqpnbECfZ4tGmDSN4s4ZjsKVxIW8/edit?usp=sharing) project, let's take a look at it

## eslint

- What is ESLint used for?
  - ESLint is an tool for JavaScript and TypeScript developers, helping them write cleaner, more reliable code and maintain consistent coding standards across projects.
  - It plays a crucial role in ensuring code quality, improving productivity, and reducing maintenance overhead in software development projects.

## prettier

- What is the Prettier?
  - Prettier is an open-source code formatter that automatically formats code to ensure consistent styling and formatting conventions.
  - It supports a wide range of programming languages, prettier parses your code and reprints it according to a predefined set of rules, ensuring that all code in a project adheres to the same formatting standards.
- What is the use of Prettier?

- What is the Prettier?
  - Prettier simplifies the task of code formatting and helps teams enforce coding standards and best practices.
  - By automating formatting tasks and promoting consistency, Prettier improves code quality, readability, and developer productivity in software development projects.

## Style guide

### Airbnb JavaScript Style Guide

Please refer here: https://github.com/airbnb/javascript

### Google TypeScript Style Guide

Please refer here: https://google.github.io/styleguide/tsguide.html
