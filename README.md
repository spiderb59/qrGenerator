**Visitor Pass Generator**

This is a visitor pass generator embedded with QR generation which holds the data for visitor.

### Completion till now; 
(May 2,2024)
1. Data can be inserted via form
2. The pass will be generated as pdf and stored in folders.

### Prerequisites: 
1. Node.js and npm installed on your machine
2. MySQL database server installed and running

### Installation

Will complete all steps  once completed. 
For now: 
1. Clone the repo or download as zip. 
2. Go to directory
3. npm install (To install depedencies)
4. Create Database and edit config/database.js for database configuration.
5. Create a table (Only one table till date, May 2, 2024)
```sql
CREATE TABLE visitor_details (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pass_path VARCHAR(255) NOT NULL
);
```
7. node server.js to start the server. 

### Features (Upcoming)

- **Visitor Pass:** Soon, additional features will be added to the QR generator. Users will be able to add details such as name and time the QR code was generated, and this information will be embedded into the QR code. The generated QR code will serve as a visitor pass. (Created) 
  
- **Scan Recording:** When the QR code is scanned, the data will be stored in a database in another application. This will allow for recording the time of each scan.

- **Usage Restrictions:** The visitor pass QR code will have certain usage restrictions. It will only be valid for the day it is created.

### Development

This project is developed using HTML, CSS, NodeJs, MYSQL. 

### Contributing

Contributions to enhance the features or improve the code are welcome. Please feel free to submit pull requests or open issues if you encounter any problems.

### License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify it according to your needs.
