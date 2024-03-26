# Frontend task

Your task is to make an app that displays 3-week treatment program. Treatment program used as input is described in JSON file and the desired output is presented in a design.

## Input Format

Example input for the 3-week treatment program is located in [examples/program.json](examples/program.json). The input has the following format:

```json
{
  "week<number>": [{
    "weekday": "MONDAY" || "TUESDAY" || "WEDNESDAY" || "THURSDAY" || "FRIDAY" || "SATURDAY" || "SUNDAY",
    "title": "Title for the daily activity",
    "completed": true || false
  }, ...]
}
```

Input contains three weeks. Each week contains multiple activities. Each activity has three fields: `weekday` indicates the day of week for the activity, `title` is a short description of the daily activity and `completed` indicates whether the user has done the activity.

## Output Design

![](examples/design.png)

Treatment program is visualised on a calendar. The calendar is always displaying current ongoing month and displays today as active with a different background color (14th in the picture above).

The treatment program starts on the first full week of the month and continues for three weeks. The activity of the day is displayed under the day number. The day number will have different color depending on whether it has an activity or not.

If a user has not completed an activity in the past, the activity will be moved to the current day. There can be only one activity per day. Thus if there are multiple incomplete activities in the past, the first incomplete activity will be displayed today, the second tomorrow, and so forth. For the previous days only completed activities will be displayed.

Your app should match the design in the picture above using the following specs:

### Colors

* Black: `rgba(0, 0, 0, 0.8)`
* Green: `rgb(93, 175, 116)`
* White: `rgb(255, 255, 255)`

### Text Styles

* `h1` [Fjalla One 700](https://fonts.google.com/?query=Fjalla+One) `48px / 1.3`
* `h2` [Libre Franklin 700](https://fonts.google.com/?query=Libre+Franklin) `64px`
* `h3` [Libre Franklin 400](https://fonts.google.com/?query=Libre+Franklin) `10px / 1.2`
* `th` [Work Sans 700](https://fonts.google.com/?query=Work+Sans) `16px`

## Tech

Project must use React. Otherwise feel free to use any tools and 3rd party libraries you like.

## Delivering

Make a pull request of your task and leave it open when you are done :slightly_smiling_face:

You should at least update the `README.md` with installation and running instructions. Also consider how you demonstrate that your app is working as intended.

**Remember to check that you have committed all required files and instructions before submitting the pull request** :white_check_mark: Good way to check this is to clone the repository into different folder and follow the instructions you have written to run the app.


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

