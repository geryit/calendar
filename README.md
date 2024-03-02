# Next.js Calendar Application

Welcome to Meru, a modern web application built with Next.js, featuring a fully interactive calendar interface, comprehensive component documentation via Storybook, and a robust testing framework through Jest.

## Features

- Dynamic Calendar Interface
- Component Visualization with Storybook
- Unit and Integration Testing with Jest and Testing Library

## Prerequisites

To run this project, you'll need:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

Alternatively, you can use [Yarn](https://yarnpkg.com/) as your package manager.

## Installation

First, clone the repository to your local machine:

```bash
git clone https://github.com/meru-health/technical-assignment-goksel-eryigit.git
cd technical-assignment-goksel-eryigit
```

Then install the dependencies:

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `.next` folder.

### `npm run start`

Starts the built application in production mode.

### `npm run lint`

Runs ESLint to catch linting errors in your code.

### `npm run storybook`

Launches the Storybook for viewing and interacting with the components.

### `npm run build-storybook`

Builds the Storybook for production.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run test:coverage`

Runs the tests and collects coverage information.
Open coverage/lcov-report/index.html to view the coverage report.

## Usage

The `Calendar` component is a central part of this application, providing a dynamic view of weekly activities. To customize the calendar, you can pass the following props to the `Calendar` component:

- `weeklyProgram`: An object containing the activities for each day of the week.
- `currentDateRaw`: Type: `string` | `number` | `Date` | `dayjs.Dayjs` | `null` | `undefined` : The current date to display in the calendar. Defaults to the current date.
- `shouldMoveIncompleteActivitiesToPresent`: A boolean to determine if past incomplete activities should be moved to the current day. Defaults to `true`.

