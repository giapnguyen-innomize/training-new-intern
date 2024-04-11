# Training

This project provides information and is a place to store the results of the training process for new interns

# DAY 2

## NX Workspace

- Benefits of a monorepo
  - The main benefit of using a monorepo is code sharing and reusability.
  - By storing all code for related projects or components in a single repository, developers can easily share and reuse code across different parts of the software.
  - This promotes consistency, reduces duplication, and simplifies maintenance of shared components and libraries.
- Nx workspace is
  - A development environment provided by the Nx toolset, designed for building and managing monorepos.
  - Nx workspace provides a structured environment for developing multiple projects within a single repository.
- Folder structure of Nx Workspace

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
    NX workspace defines 4 types of libraries:

- Feature libraries:

  - Developers should consider feature libraries as libraries that implement smart UI (with access to data sources) for specific business use cases or pages in an application.

- UI libraries:

  - A UI library contains only presentational components (also called "dumb" components).

- Data-access libraries:

  - A data-access library contains code for interacting with a back-end system. It also includes all the code related to state management.

- Utility libraries:
  - A utility library contains low-level utilities used by many libraries and applications.

## Project structure (Mirai)

## eslint

- ESLint is an tool for JavaScript and TypeScript developers, helping them write cleaner, more reliable code and maintain consistent coding standards across projects.
- It plays a crucial role in ensuring code quality, improving productivity, and reducing maintenance overhead in software development projects.

## prettier

- Prettier is an open-source code formatter that automatically formats code to ensure consistent styling and formatting conventions.
- It supports a wide range of programming languages, prettier parses your code and reprints it according to a predefined set of rules, ensuring that all code in a project adheres to the same formatting standards.

- Prettier use for simplifies the task of code formatting and helps teams enforce coding standards and best practices.
- By automating formatting tasks and promoting consistency, Prettier improves code quality, readability, and developer productivity in software development projects.

## Style guide

### Airbnb JavaScript Style Guide

Please refer here: https://github.com/airbnb/javascript

### Google TypeScript Style Guide

Please refer here: https://google.github.io/styleguide/tsguide.html
