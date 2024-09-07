**ToDo List Application**
This is a full-stack ToDo application that allows users to create tasks, track their progress through different stages (Pending, In Progress, Completed), and interact with the task management system via a drag-and-drop interface. This project uses React for the front end and a backend API for task management.

**Features**
Add new tasks with a name and description.
View tasks categorized under "Pending," "In Progress," and "Completed."
Drag-and-drop tasks between categories.
Mark tasks as started or completed.
Uses a backend API for task updates.
Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (v14 or later)
npm or yarn
A backend API server for managing tasks (this guide assumes you have it set up separately).

**Set Up Environment Variables**
Create a .env file in the root directory of the project and configure the following environment variables:
**Copy code**
REACT_APP_URL=http://localhost:8000/api/v1/   # Backend API URL
Run the Application
To start the development server, run: **npm start**
**Available Scripts**
In the project directory, you can run the following scripts:

npm start or yarn start
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

npm run build or yarn build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for best performance.

**Technologies Used**
Frontend: React, HTML, CSS, JavaScript
State Management: useState, useEffect
API: Fetch API for interacting with the backend
