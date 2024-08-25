
# MERN Full Stack - [MERN Blog Application](https://dhuy-blog.onrender.com/) 

This project is a blog application built with the MERN stack, designed for a smooth experience on all devices. It includes secure login with JSON Web Tokens and Google OAuth. Admins can easily manage posts, comments, and users with MongoDB, and the website adapts well to different screen sizes. 

**Link demo:** [dHuy-blog](https://dhuy-blog.onrender.com/)

#### 1. Frontend Development:
- React.js & Tailwind CSS: Setting up and developing a responsive user interface with React.js and Tailwind CSS.
- Dynamic Routing: Implementing dynamic pages using React Router Dom.
- Dark Mode Integration: Enhancing user experience with a fully functional dark mode.

#### 2. Authentication & State Management:
- JSON Web Tokens (JWT) & Google OAuth: Implementing secure user authentication mechanisms.
- Redux Toolkit: Utilizing Redux Toolkit for efficient state management.

#### 3. Backend Development:
- Admin Dashboard: Developing a secure admin dashboard with role-based access to manage posts, comments, and users.
- CRUD Operations: Implementing CRUD operations for various functionalities using MongoDB.

#### 4. Security & Responsiveness:
- Client & Backend Security: Securing both frontend and backend components, particularly for sensitive pages like the admin dashboard.
- Responsive Design: Ensuring the website is fully responsive across multiple devices.

#### 5. Advanced Features:
- Advanced Search Functionality: Integrating search features, allowing users to search by title, limit results, and sort through a sidebar using MongoDB queries.
- Comment Management: Enabling users to leave, edit, and delete comments on post pages.




## Features

***User Features:***

**Account Management**

- Sign Up / Log In / Log Out: Users can create an account, log in, and securely log out.
- Profile Management: Users can update their profile, including changing their avatar and editing personal details.

**User Experience:**

- Theme Switching: Users can switch between light and dark modes.
- Post Search: Users can search for posts by title or category.
- Sort Results: Users can sort search results based on various criteria.
- Engagement: Users can like comments on posts to interact with the content.

**Personalization:**
- Comment Management: Users can leave, edit, and delete their comments on posts.

**Admin Features:**
**Content Management:**

- CRUD Operations for Posts: Admins can create, read, update, and delete posts.
- Post Management: Admins have the ability to manage all posts, ensuring content quality and relevance.

**User and Comment Management:**

- User Management: Admins can manage user accounts, including banning or promoting users.
- Comment Management: Admins can oversee and moderate all comments.

**Analytics and Insights:**

- View Statistics: Admins can access various statistics, such as user activity, post popularity, and engagement metrics.
## Tech Stack

- **Client:** React, Redux, TailwindCSS

- **Server:** Node, Express, MongoDB


## Installation

Download file.zip or clone my-project

```bash
  git clone https://github.com/DucHuy2102/mern-blog-app.git
  cd my-project
```
You need to open **two terminals**: one for running the backend and another for the frontend.

- **Setting Up the Backend:**
In the first terminal:
```bash
    cd server
    npm i
    npm run dev
```
Then, you have to create a **.env** file in the **server directory** and add the following environment variables:

```bash
MONGODB = <your_mongodb_connection_string>
JWT_SECRET = <your_jwt_secret>
```

- **Setting Up the frontend:** 
In the second terminal:
```bash
    cd client
    yarn  
    yarn dev
``` 
Then, create a **.env** file in the **client directory** and add the following environment variable:
```bash
    VITE_FIREBASE_API_KEY = <your_firebase_api_key>
``` 
If you encounter any issues related to Firebase, such as authentication errors or database connectivity problems, ensure the following:

- Check the Firebase Project Settings: Make sure that your Firebase API key, project ID, and other related settings match the configuration in your Firebase console.
- Update the Firebase Configuration: If necessary, replace the placeholders in your .env file with the correct values from your Firebase project.
- Consult Firebase Documentation: Refer to the official Firebase documentation for troubleshooting and additional setup steps.

If you continue to experience issues, verify that all Firebase services being used (like Firestore, Authentication, etc.) are properly set up in the Firebase console.
## Support

For any inquiries or support, please feel free to contact me via email at duchuytv2102@gmail.com (Đức Huy Nguyễn)

