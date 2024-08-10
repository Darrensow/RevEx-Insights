# CREATE DATABASE revex_insights;

USE revex_insights;

-- Create department table
CREATE TABLE department (
    department_id           INT
        PRIMARY KEY,
    department_name         VARCHAR(255),
    department_name_key     VARCHAR(255)
);

-- Create fund table
CREATE TABLE fund (
    fund_id                 INT
        PRIMARY KEY,
    fund_description        VARCHAR(255),
    fund_description_key    VARCHAR(255)
);

-- Create ledger table
CREATE TABLE ledger (
    id                      INT
        PRIMARY KEY,
    general_ledger_date     DATE,
    amount                  DECIMAL(15, 2),
    ledger_description      VARCHAR(255),
    fund_id                 INT,
    department_id           INT,
    FOREIGN KEY (fund_id)
        REFERENCES fund(fund_id),
    FOREIGN KEY (department_id)
        REFERENCES department(department_id)
);
