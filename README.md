# Job-Tracker : Job Application Tracker

A web application built with **React**, **Firebase**, **Redux Toolkit**, and **Material UI** that allows users to track their job applications and enables administrators to manage all submitted applications.

---

## Features

### User

- Sign up / Login with Firebase Authentication.
- Add, view, and manage personal job applications.
- Applications are saved in Firestore.
- Data is cached with Redux Persist, so applications remain accessible offline (read-only).

### Admin

- Access a dedicated **Admin Dashboard**.
- View all applications submitted by users.
- See associated user emails with each application.
- Update application statuses (Applied, Interview, Accepted, Rejected).
- Delete applications.
- Protected access (only admins can view the dashboard).

---

## Tech Stack

- **Frontend**: React, React Router, Material UI
- **State Management**: Redux Toolkit + Redux Persist
- **Backend**: Firebase Firestore + Firebase Auth
- **Other Libraries**: SweetAlert2 (for confirmation modals)

### Challenges & Learning

**Time Spent:**  
The project took approximately **10–12 hours** in total, including design, development, and testing of all features.

**Biggest Challenge:**  
The most challenging part was **handling offline state with Redux**.

- Ensuring that applications remain accessible when the internet connection is lost.
- Making sure offline data does not overwrite Firestore data accidentally.
- Separating the displayed state from the actual database data to avoid conflicts.

This required careful state management and planning of Redux logic.
