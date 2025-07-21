#  Project Tracker Frontend

This is the **frontend** for the Project Tracker app.  
It connects with the Django backend and lets users manage:

- Clients
-  Projects
-  Tech Team
-  Managers
-  Feedback

---

##  Authentication

You can **log in** using:

- Google Sign-In (Firebase)
- Username and Password (JWT cookie saved in browser)

---

##  Tech Stack

| Layer        | Tech Used         |
|--------------|------------------|
| Framework    | Next.js (App Router) |
| Styling      | Tailwind CSS     |
| HTTP Client  | Axios            |
| Auth         | Firebase Google Auth + JWT |
| Routing      | Protected Routes |

---
## Structure - frontend
``` text
frontend/
├── app/
│   ├── page.jsx                   
│   ├── client/
│   │   └── page.jsx             
│   ├── project/
│   │   └── page.jsx            
│   ├── techteam/
│   │   └── page.jsx             
│   ├── manager/
│   │   └── page.jsx              
│   ├── feedback/
│   │   └── page.js             
│   └── about/
│       └── page.jsx             
│
├── components/
│   ├── LoginModel.jsx          
│   ├── ProjectComponent.jsx    
│   ├── TechTeamComponent.jsx    
│   ├── FeedbackComponent.jsx
│   ├── ClientComponent.jsx    
│   └── ManageComponent.jsx      
│
├── lib/
│   ├── axios.js                 
│   └── firebase.js              
│
└── package.json                 # Project metadata, dependencies, and scripts

```



##  File/Route Purpose Table

| **Path**                       | **Purpose**                                   |
|-------------------------------|-----------------------------------------------|
| `app/page.js`                 | Homepage with Google Login/Logout, protected route access, and navigation buttons|
| `app/client/page.js`          | Protected route that renders `ClientComponent.jsx` for submitting and viewing client data |
| `app/project/page.js`         | Protected route that renders `ProjectComponent.jsx` for submitting and viewing project data  |
| `app/techteam/page.js`        | Protected route that renders `TechTeamComponent.jsx` for submitting and viewing techtem data |
| `app/manager/page.js`         | Protected route that renders `ManageComponent.jsx` for submitting and viewing manager data    |
| `app/feedback/page.js`        | Protected route that renders `FeedbackComponent.jsx` for submitting and viewing feedback  data  |
| `app/about/page.js`           | Static About page                             |
| `components/LoginModel.jsx`        |  Modal for logging in via Google (Firebase) or username/password (API); sets user state |
| `components/ProjectComponent.jsx` | Handles displaying, adding, editing, and deleting projects using a modal form and table UI |
| `components/TechTeamComponent.jsx`|Handles displaying, adding, editing, and deleting techteam using a modal form and table UI |
| `components/FeedbackComponent.jsx`| Handles displaying, adding, editing, and deleting feedback using a modal form and table UI|
| `components/ManageComponent.jsx`| Handles displaying, adding, editing, and deleting managers using a modal form and table UI     |
| `components/ClientComponent.jsx`| Handles displaying, adding, editing, and deleting clients using a modal form and table UI |
| `lib/firebase.js`             | Firebase config for Google Auth               |
| `lib/axios.js`                | Axios config with API base URL                |


