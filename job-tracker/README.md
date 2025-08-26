# JobTracker

## Description

JobTracker is a job application management app that allows users to register, create job applications, track the status of each application, and view their personal application list. Additionally, there is an Admin Panel to view all applications. The app uses React, Firebase (Authentication and Firestore), and Redux for state management.

### Features

- User registration and login.
- View and update application status.
- Delete applications.
- Filter applications by status.
- Display user information with a generated avatar.
- Admin Panel to view all applications.
- Offline support using Redux for user (applications remain visible if the internet connection is lost).

### Technologies Used

- React + React Router
- Firebase Authentication & Firestore
- Redux Toolkit
- Material UI for styling
- SweetAlert2

---

### Challenges & Learning

**Time Spent:**  
The project took approximately **4 - 4 and half days** in total, including design, development, and testing of all features.

**Biggest Challenge:**  
The most challenging part was **handling offline state with Redux**.

- Ensuring that applications remain accessible when the internet connection is lost.
- Making sure offline data does not overwrite Firestore data accidentally.
- Separating the displayed state from the actual database data to avoid conflicts.  
  This required careful state management and planning of Redux logic.
