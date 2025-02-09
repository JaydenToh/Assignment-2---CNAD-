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
CREATE LOGIN [Datasphere_User] WITH PASSWORD = 'localhost';
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




CREATE TABLE Clinics (
    ClinicID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(255),
    Location NVARCHAR(255),
    Contact NVARCHAR(50)
);

CREATE TABLE Doctors (
    DoctorID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(255),
    Specialty NVARCHAR(255),
    AvailableTimes NVARCHAR(MAX),
    ClinicID INT FOREIGN KEY REFERENCES Clinics(ClinicID)
);

CREATE TABLE Appointments (
    AppointmentID INT PRIMARY KEY IDENTITY,
    UserID INT,
    ClinicID INT FOREIGN KEY REFERENCES Clinics(ClinicID),
    DoctorID INT FOREIGN KEY REFERENCES Doctors(DoctorID),
    AppointmentTime NVARCHAR(50),
    Type NVARCHAR(50)
);

INSERT INTO Clinics (Name, Location, Contact)
VALUES
    ('Central 24-HR Clinic (Clementi)', '450 Clementi Ave 3, #01-291, Singapore 120450', '6773 2925'),
    ('Central 24-HR Clinic (Hougang)', '681 Hougang Ave 8, #01-829, Singapore 530681', '6387 6965'),
    ('Central 24-HR Clinic (Jurong West)', '492 Jurong West Street 41, #01-54, Singapore 640492', '6565 7484'),
    ('Central 24-HR Clinic (Woodlands / Marsiling)', '303 Woodlands Street 31, #01-185, Singapore 730303', '6365 2908'),
    ('Central 24-HR Clinic (Pasir Ris)', '446 Pasir Ris Drive 6, #01-122, Singapore 510446', '6582 2640'),
    ('Central 24-HR Clinic (Pioneer North)', '959 Jurong West Street 92, #01-160, Singapore 640959', '6251 2775'),
    ('Central 24-HR Clinic (Tampines)', '201D Tampines Street 21, #01-1151, Singapore 524201', '6968 7001'),
    ('Central 24-HR Clinic (Woodlands)', '768 Woodlands Ave 6, #02-06A, Singapore 730768', '6365 4895'),
    ('Central 24-HR Clinic (Yishun)', '701A Yishun Ave 5, #01-04, Singapore 761701', '6759 7985'),
    ('M Lam Clinic', '739 Geylang Road, Singapore 389649', '6748 1949'),
    ('Macpherson Medical Clinic', '78 Circuit Road #01-488, Singapore 370078', '6746 3913'),
    ('Sunbeam Medical Clinic', '443C Fajar Road #01-76, Singapore 673443', '6610 0968'),
    ('Tang Family Clinic', '84 Jalan Jurong Kechil, Singapore 598593', '6468 0118'),
    ('Goh Clinic & Surgery', 'Blk 204 Hougang Street 21 #01-101, Singapore 530204', '6386 3836'),
    ('Drs Lim & Chan Clinic (Hougang)', 'Blk 106 Hougang Avenue 1 #01-1235, Singapore 530106', '6280 0990');

INSERT INTO Doctors (Name, Specialty, AvailableTimes, ClinicID)
VALUES
    -- Central 24-HR Clinic (Clementi)
    ('Dr. Adrian Tan', 'General Practitioner', '08:00-12:00,14:00-18:00', 1),
    ('Dr. Cheryl Lim', 'Cardiologist', '10:00-14:00,16:00-20:00', 1),
    
    -- Central 24-HR Clinic (Hougang)
    ('Dr. Benjamin Lee', 'Orthopedic Specialist', '09:00-13:00,15:00-19:00', 2),
    ('Dr. Amanda Koh', 'Dermatologist', '08:00-12:00,14:00-18:00', 2),
    
    -- Central 24-HR Clinic (Jurong West)
    ('Dr. Daniel Wong', 'Neurologist', '10:00-14:00,16:00-20:00', 3),
    ('Dr. Rachel Ng', 'Pediatrician', '08:00-12:00,14:00-18:00', 3),

    -- Central 24-HR Clinic (Pasir Ris)
    ('Dr. Jason Tan', 'Endocrinologist', '09:00-13:00,15:00-19:00', 5),
    ('Dr. Susan Teo', 'Psychiatrist', '10:00-14:00,16:00-20:00', 5),

    -- Macpherson Medical Clinic
    ('Dr. Henry Goh', 'Gastroenterologist', '08:00-12:00,14:00-18:00', 11),
    ('Dr. Kelly Tan', 'General Practitioner', '09:00-13:00,15:00-19:00', 11),

    -- Tang Family Clinic
    ('Dr. Alvin Yeo', 'Urologist', '10:00-14:00,16:00-20:00', 13),
    ('Dr. Joanne Toh', 'Ophthalmologist', '08:00-12:00,14:00-18:00', 13),

    -- Sunbeam Medical Clinic
    ('Dr. Charles Lim', 'Rheumatologist', '09:00-13:00,15:00-19:00', 12),
    ('Dr. Veronica Chan', 'Gynecologist', '10:00-14:00,16:00-20:00', 12),

    -- Goh Clinic & Surgery
    ('Dr. Edwin Lee', 'Pulmonologist', '08:00-12:00,14:00-18:00', 14),
    ('Dr. Michelle Phua', 'General Practitioner', '09:00-13:00,15:00-19:00', 14),

    -- Drs Lim & Chan Clinic (Hougang)
    ('Dr. Kenneth Chan', 'Oncologist', '10:00-14:00,16:00-20:00', 15),
    ('Dr. Serena Yeo', 'General Practitioner', '08:00-12:00,14:00-18:00', 15);

ALTER TABLE Appointments ADD VerificationKey NVARCHAR(50);

INSERT INTO Appointments (UserID, ClinicID, DoctorID, AppointmentTime, Type, VerificationKey)
VALUES 
    (1, 1, 1, '2024-02-10 10:00 AM', 'Virtual', 'SECRET123'),
    (2, 2, 3, '2024-02-12 02:00 PM', 'In-Person', 'CONFIRM456');
