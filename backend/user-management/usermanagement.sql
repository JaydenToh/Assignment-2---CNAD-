USE master;
GO

-- Drop user in Datasphere Database if it exists.
USE [Datasphere];
IF EXISTS (SELECT * FROM sys.database_principals WHERE name = 'Datasphere_User')
BEGIN
    DROP USER [Datasphere_User];
END
GO

-- Drop Login if it exists
IF EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'Datasphere_User')
BEGIN
    DROP LOGIN [Datasphere_User];
END    
GO

-- Create new Login
CREATE LOGIN [Datasphere_User] WITH PASSWORD = 'Fullstack';
GO

-- Switch to the Datasphere database
USE [Datasphere];
GO

-- Create new user in Datasphere database
CREATE USER [Datasphere_User] FOR LOGIN [Datasphere_User];
GO

-- Grant db_owner role to the new user in the database
ALTER ROLE db_owner ADD MEMBER [Datasphere_User];
GO

-- Grant server role of sysadmin to the login
ALTER SERVER ROLE sysadmin ADD MEMBER [Datasphere_User];
GO

-- Kill existing connections to the Datasphere database
USE master;
GO

DECLARE @databaseName NVARCHAR(50) = N'Datasphere';
DECLARE @killcommand NVARCHAR(MAX) = '';

SELECT @killcommand = @killcommand + 'KILL ' + CONVERT(VARCHAR(5), session_id) + ';'
FROM sys.dm_exec_sessions
WHERE database_id = DB_ID(@databaseName);

EXEC sp_executesql @killcommand;
GO

-- Drop the Datasphere database if it exists
IF EXISTS(SELECT * FROM sys.databases WHERE NAME = 'Datasphere')
BEGIN
    DROP DATABASE Datasphere;
END
GO

-- Create Datasphere database
CREATE DATABASE Datasphere;
GO

USE Datasphere;
GO

-- Create endUser Table
CREATE TABLE dbo.endUser (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    userName VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(20) NOT NULL,
    preferredLunch VARCHAR(255) NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user')),  -- Only 'admin' or 'user' allowed
	age INT NULL,
	interest VARCHAR(255) NULL
);


-- Insert Sample Data into endUser Table
INSERT INTO dbo.endUser (userName, email, password, contactNumber, preferredLunch, role)
VALUES 
    ('Jon', 'jon@gmail.com', '123', '89224444', NULL, 'user'),
    ('Alice', 'alice@gmail.com', '456', '88445566', 'Vegetarian', 'admin'),
    ('Sam', 'sam@hotmail.com', '111111', '87332211', 'Vegan', 'user'),
	('Aiman', 'aiman@gmail.com', '$2a$10$ajIOsXDjOpLSNJ9EE55gAOqNhT0hAsquWmh5fsMXserpcPoGn3Xo2', '89099154', 'Vegan', 'user');


