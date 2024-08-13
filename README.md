# RexEx Insights

This README will guide you through the setup and usage of the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [CI/CD Pipeline](#cicd-pipeline)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have [Node.js](https://nodejs.org/) installed (version 20.13.1 or higher).
- **npm**: npm is the package manager for Node.js, and it usually comes with Node.js. You can check if it's installed by running `npm -v` in your terminal.
- **Git**: Ensure you have Git installed to clone the repository.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Darrensow/RevEx-Insights.git
   ```

   Replace your-username and your-repo-name with your GitHub username and the repository name.

2. **Navigate to the Project Directory**:

```bash
cd RevEx-Insights
```

3. **Install Dependencies:

Run the following command to install the project dependencies:

```bash
npm install
```
This will install all the required packages listed in the package.json file.

## Running the Project
   
To start the development server, run:

```bash
npm start
```
This will start the project on http://localhost:3000 by default.

## CI/CD Pipeline

We have integrated a CI/CD pipeline to streamline the development and deployment process through the GitHub Actions to push to the Docker Hub. The pipeline automatically triggers on every push or pull request to the repository, ensuring that all code changes are tested and deployed efficiently.

### Key Features:
* Automated Testing: The pipeline runs all the test cases to verify that the new code does not break any existing functionality.
* Build and Deployment: Upon successful testing, the application is automatically built and deployed to the staging/production environment.
* Notifications: Developers receive notifications on the status of the build and deployment, helping to maintain the quality and reliability of the application.
* Rollback mechanism: The repository will be updated with tags to allow reverting to previous tags and the CI/CD pipeline will correctly push it to the Docker Hub
  
### How to Trigger the Pipeline:
Simply push your changes to the repository or create a pull request. The pipeline will automatically run, and you can monitor its progress through your CI/CD service
