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
- **Java 17 (or higher)**
- **Gradle**
- **MySQL**

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

3. **Install Dependencies**:

   Run the following command to install the project dependencies:

   ```bash
   npm install
   ```
   
   This will install all the required packages listed in the package.json file.


4. **Configure the MySQL Database**:

   Ensure that MySQL is running and create a new database named revex_insights. Then, configure the database connection in ```backend/src/main/resources/application.properties```:

   ~~~
   spring.datasource.url=jdbc:mysql://localhost:3306/revex_insights
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>
   ~~~
   
   After setting up the database and configurations, execute the scripts in /sql-script directory in this order to populate the database tables:
   1. ```DDL.sql```
   2. ```insert_department_sql_statements_part_1.sql```
   3. ```insert_fund_sql_statements_part_1.sql```
   4. ```insert_ledger_sql_statements_part_1.sql```

5. 

## Running the Project

1. **Frontend React Application**:

   To start the react frontend app, run:
   
   ```bash
   npm start
   ```
   This will start the project on http://localhost:3000 by default.


2. **Backend Java Spring Boot Application**:

   For the backend Application, you can build the project using the Gradle wrapper included in the repository
   
   **For Unix/Linux/macOS**:
   ```bash
   ./gradlew build
   ```
   **For Windows**:
   ```bash
   gradlew.bat build
   ```
   This command will download all necessary dependencies, compile the project, and run tests.
   
   **To run the application for MacOS users**:
   ```bash
   ./gradlew bootRun
   ```
   **For Windows**:
   ```bash
   gradlew.bat bootRun
   ```
   The application should now be running an accessible at http://localhost:8080.


3. Troubleshooting
   1. **Port Conflicts**: Ensure that port 8080 is not being used by another application. You can change the port by updating server.port in ```backend/src/main/resources/application.properties```.
   2. **Database Connectivity**: Ensure your MySQL database is running and the connection details are correct.

## CI/CD Pipeline

We have integrated a CI/CD pipeline to streamline the development and deployment process through the GitHub Actions to push to the Docker Hub. The pipeline automatically triggers on every push or pull request to the repository, ensuring that all code changes are tested and deployed efficiently.

### Key Features:
* Automated Testing: The pipeline runs all the test cases to verify that the new code does not break any existing functionality.
* Build and Deployment: Upon successful testing, the application is automatically built and deployed to the staging/production environment.
* Notifications: Developers receive notifications on the status of the build and deployment, helping to maintain the quality and reliability of the application.
* Rollback mechanism: The repository will be updated with tags to allow reverting to previous tags and the CI/CD pipeline will correctly push it to the Docker Hub
  
### How to Trigger the Pipeline:
Simply push your changes to the repository or create a pull request. The pipeline will automatically run, and you can monitor its progress through your CI/CD service
