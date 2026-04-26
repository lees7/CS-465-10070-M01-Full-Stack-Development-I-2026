# CS-465-10070-M01-Full-Stack-Development-I-2026

# Student name: Seunghwan Lee
# Student number: 3371249
Architecture

In this full stack project, I worked with multiple types of frontend development, including server-rendered pages using Express HTML and a more dynamic single-page application (SPA) built with Angular. The Express HTML approach delivers content from the server each time a request is made, which makes it simpler but less interactive. In contrast, the SPA loads a single HTML page and dynamically updates content using JavaScript, creating a smoother and faster user experience. While Express HTML is easier to implement for basic functionality, the SPA provides better performance and responsiveness, especially for applications that require frequent user interaction.

The backend uses a NoSQL MongoDB database because of its flexibility and scalability. Unlike relational databases, MongoDB stores data in JSON-like documents, which makes it easier to work with dynamic and evolving data structures. This was especially useful in the project because the data models could be adjusted without needing to redesign a rigid schema. Additionally, MongoDB integrates well with JavaScript-based technologies, making it a natural fit for a full stack application using Node.js and Angular.

Functionality

JSON (JavaScript Object Notation) is different from JavaScript in that it is a data format rather than a programming language. While JavaScript is used to create logic and functionality, JSON is used to store and transfer data between the frontend and backend. In this project, JSON acts as the bridge between the client and server, allowing the frontend to send requests and receive structured responses from the API.

During the development process, I refactored code multiple times to improve functionality and efficiency. For example, I reorganized API service calls into reusable modules instead of repeating similar code across components. I also broke down UI elements into reusable Angular components, which made the application easier to maintain and scale. The main benefits of reusable UI components include reduced redundancy, improved consistency across the application, and easier debugging and updates.

Testing

In a full stack application, API testing involves verifying that endpoints correctly handle different HTTP methods such as GET, POST, PUT, and DELETE. Each endpoint must be tested to ensure it returns the correct data and handles errors appropriately. Testing becomes more complex when security layers, such as authentication, are added. For example, endpoints that require a valid login token must be tested for both authorized and unauthorized access.

Methods refer to the type of HTTP request being made, while endpoints are the specific URLs where those requests are sent. Security adds another layer by restricting access to certain endpoints, requiring proper authentication before data can be accessed or modified. In this project, implementing secure login authentication highlighted the importance of protecting sensitive data and ensuring that only authorized users can perform administrative actions.

Reflection

This course has helped me move closer to my professional goals by giving me hands-on experience with full stack development. I gained practical skills in building both frontend and backend systems, connecting them through APIs, and implementing authentication for security. I also developed a better understanding of how real-world applications are structured and deployed.

Some of the most valuable skills I learned include working with Angular for frontend development, using Node.js and Express for backend services, managing data with MongoDB, and implementing secure authentication. I also improved my ability to debug, test, and refactor code. These skills make me a more marketable candidate because they demonstrate my ability to build complete, functional web applications and adapt to modern development practices.
