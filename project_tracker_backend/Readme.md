# Project Tracker – Backend

This is the backend for the **Project Tracker** application, built using **Django REST Framework**. It includes CRUD APIs for managing clients, projects, managers, tech team, and feedback.

The backend supports **two authentication methods**:
- Google Sign-In via Firebase
- Username/Password login with JWT stored in cookies

---

## Tech Stack

- **Backend**: Django & Django REST Framework
- **Auth**:
  - Firebase Google Authentication
  - Username & Password (JWT Token with cookie)
- **Database**: MySQL
- **API Format**: JSON (RESTful)

---

## Features

- JWT & Firebase Authentication
- Secure cookie-based login
- CRUD operations for:
  - Clients
  - Projects
  - Managers
  - Tech Team
  - Feedback
- Route protection using `IsAuthenticated`

---

## Base URL

`http://localhost:8000/api/`

## Endpoint Summary

| Entity     | List & Create             | Detail (Retrieve, Update, Delete)     |
|------------|---------------------------|----------------------------------------|
| Clients    | `GET/POST /clients/`        | `GET/PUT/DELETE /clients/<id>/`         |
| Projects   | `GET/POST /projects/`      | `GET/PUT/DELETE /projects/<id>/`        |
| Managers   | `GET/POST /managers/`      | `GET/PUT/DELETE /managers/<id>/`        |
| Tech Team  | `GET/POST /techteam/`       | `GET/PUT/DELETE /techteam/<id>/`        |
| Feedback   | `GET/POST /feedback/`       | `GET/PUT/DELETE /feedback/<id>/`        |

---


## Clients

### `GET /clients/` – List Clients

**Success (200 OK):**
```json
{
  "message": "Clients retrieved successfully.",
  "data": [{ "name": "string", "company": "string", "email": "string" }]
}
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Unable to fetch clients at the moment. Please try again later." }
```
```bash
curl -X GET http://localhost:8000/api/clients/
```

### `POST /clients/` – Create Clients

**Success (201 Created):**
```json
{
  "message": "Clients created successfully.",
  "data": { "name": "Divya", "company": "Wonder Solutions", "email": "divya@gmail.com" }
}
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid data provided." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while creating clients." }
```
```bash
curl -X POST http://localhost:8000/api/clients/ \
  -H "Content-Type: application/json" \
  -d '{ "name": "Divya", "company": "Wonder Solutions", "email": "divya@gmail.com" }'
```

### `GET /clients/<id>/` – Retrieve Clients

**Success (200 OK):**
```json
{
  "message": "Clients fetched successfully.",
  "data": { "name": "Divya", "company": "Wonder Solutions", "email": "divya@gmail.com" }
}
```
**Failure (404 Not Found):**
```json
{ "error": "Clients not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while fetching clients." }
```
```bash
curl -X GET http://localhost:8000/api/clients/1/
```

### `PUT /clients/<id>/` – Update Clients

**Success (200 OK):**
```json
{
"message": "Clients updated successfully."
 "data": { "name": "Divyaa", "company": "Wonder Solutions", "email": "divya@gmail.com" } 
 }
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid update data." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while updating clients." }
```
```bash
curl -X PUT http://localhost:8000/api/clients/1/ \
  -H "Content-Type: application/json" \
  -d '{ "name": "Divya", "company": "Wonder Solutions", "email": "divya@gmail.com" }'
```

### `DELETE /clients/<id>/` – Delete Clients

**Success (204 No Content):**
```json
{ "message": "Clients deleted successfully." }
```
**Failure (404 Not Found):**
```json
{ "error": "Clients not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while deleting clients." }
```
```bash
curl -X DELETE http://localhost:8000/api/clients/1/
```

## Projects

### `GET /projects/` – List Projects

**Success (200 OK):**
```json
{
  "message": "Projects retrieved successfully.",
  "data": {"title": "string", "description": "string", "status": "string", "start_date": "Date", "end_date": "Date", "client": int, "manager": int }
}
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Unable to fetch projects at the moment. Please try again later." }
```
```bash
curl -X GET http://localhost:8000/api/projects/
```

### `POST /projects/` – Create Projects

**Success (201 Created):**
```json
{
  "message": "Projects created successfully.",
  "data": { "title": "Mobile App Redesign", "description": "UI/UX redesign", "status": "In Progress", "start_date": "2025-01-01", "end_date": "2025-06-01", "client": 2, "manager": 2 }
}
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid data provided." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while creating projects." }
```
```bash
curl -X POST http://localhost:8000/api/projects/ \
  -H "Content-Type: application/json" \
  -d '{ "title": "Mobile App Redesign", "description": "UI/UX redesign", "status": "In Progress", "start_date": "2025-01-01", "end_date": "2025-06-01", "client": 2, "manager": 2 }'
```

### `GET /projects/<id>/` – Retrieve Projects

**Success (200 OK):**
```json
{
  "message": "Projects fetched successfully.",
  "data": { "title": "string", "description": "string", "status": "string", "start_date": "Date", "end_date": "Date", "client": int, "manager": int  }
}
```
**Failure (404 Not Found):**
```json
{ "error": "Projects not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while fetching projects." }
```
```bash
curl -X GET http://localhost:8000/api/projects/1/
```

### `PUT /projects/<id>/` – Update Projects

**Success (200 OK):**
```json
{ 
  "message": "Projects updated successfully."
  "data": {"title": "string", "description": "string", "status": "string", "start_date": "Date", "end_date": "Date", "client": int, "manager": int  }
}
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid update data." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while updating projects." }
```
```bash
curl -X PUT http://localhost:8000/api/projects/1/ \
  -H "Content-Type: application/json" \
  -d '{ "title": "Mobile App Redesign", "description": "UI/UX redesign", "status": "In Progress", "start_date": "2025-01-01", "end_date": "2025-06-01", "client": 2, "manager": 2 }'
```

### `DELETE /projects/<id>/` – Delete Projects

**Success (204 No Content):**
```json
{ "message": "Projects deleted successfully." }
```
**Failure (404 Not Found):**
```json
{ "error": "Projects not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while deleting projects." }
```
```bash
curl -X DELETE http://localhost:8000/api/projects/1/
```

## Managers

### `GET /managers/` – List Managers

**Success (200 OK):**
```json
{
  "message": "Managers retrieved successfully.",
  "data": { "name": "string", "email": "string", "department": "String" }
}
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Unable to fetch managers at the moment. Please try again later." }
```
```bash
curl -X GET http://localhost:8000/api/managers/
```

### `POST /managers/` – Create Managers

**Success (201 Created):**
```json
{
  "message": "Managers created successfully.",
  "data": { "name": "Alice", "email": "alice@gmail.com", "department": "Engineering" }
}
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid data provided." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while creating managers." }
```
```bash
curl -X POST http://localhost:8000/api/managers/ \
  -H "Content-Type: application/json" \
  -d '{ "name": "Alice", "email": "alice@gmail.com", "department": "Engineering" }'
```

### `GET /managers/<id>/` – Retrieve Managers

**Success (200 OK):**
```json
{
  "message": "Managers fetched successfully.",
  "data": {  "name": "string", "email": "string", "department": "String"}
}
```
**Failure (404 Not Found):**
```json
{ "error": "Managers not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while fetching managers." }
```
```bash
curl -X GET http://localhost:8000/api/managers/1/
```

### `PUT /managers/<id>/` – Update Managers

**Success (200 OK):**
```json
{ 
  "message": "Managers updated successfully." 
  "data" :{ "name": "Alice", "email": "alice@gmail.com", "department": "Engineering" }
  }
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid update data." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while updating managers." }
```
```bash
curl -X PUT http://localhost:8000/api/managers/1/ \
  -H "Content-Type: application/json" \
  -d '{ "name": "Alice", "email": "alice@gmail.com", "department": "Engineering" }'
```

### `DELETE /managers/<id>/` – Delete Managers

**Success (204 No Content):**
```json
{ "message": "Managers deleted successfully." }
```
**Failure (404 Not Found):**
```json
{ "error": "Managers not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while deleting managers." }
```
```bash
curl -X DELETE http://localhost:8000/api/managers/1/
```

## Tech Team

### `GET /techteam/` – List Tech Team

**Success (200 OK):**
```json
{
  "message": "Tech Team retrieved successfully.",
  "data": { "name": "String", "roll": "string", "email": "string", "project": int }
}
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Unable to fetch tech team at the moment. Please try again later." }
```
```bash
curl -X GET http://localhost:8000/api/techteam/
```

### `POST /techteam/` – Create Tech Team

**Success (201 Created):**
```json
{
  "message": "Tech Team created successfully.",
  "data": { "name": "Sam", "roll": "Backend Developer", "email": "sam@gmail.com", "project": 2 }
}
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid data provided." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while creating tech team." }
```
```bash
curl -X POST http://localhost:8000/api/techteam/ \
  -H "Content-Type: application/json" \
  -d '{ "name": "Sam", "roll": "Backend Developer", "email": "sam@gmail.com", "project": 2 }'
```

### `GET /techteam/<id>/` – Retrieve Tech Team

**Success (200 OK):**
```json
{
  "message": "Tech Team fetched successfully.",
  "data": { "name": "String", "roll": "string", "email": "string", "project": int }
}
```
**Failure (404 Not Found):**
```json
{ "error": "Tech Team not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while fetching tech team." }
```
```bash
curl -X GET http://localhost:8000/api/techteam/1/
```

### `PUT /techteam/<id>/` – Update Tech Team

**Success (200 OK):**
```json
{ "message": "Tech Team updated successfully."
   "data": { "name": "String", "roll": "string", "email": "string", "project": int }
    }
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid update data." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while updating tech team." }
```
```bash
curl -X PUT http://localhost:8000/api/techteam/1/ \
  -H "Content-Type: application/json" \
  -d '{ "name": "Sam", "roll": "Backend Developer", "email": "sam@gmail.com", "project": 2 }'
```

### `DELETE /techteam/<id>/` – Delete Tech Team

**Success (204 No Content):**
```json
{ "message": "Tech Team deleted successfully." }
```
**Failure (404 Not Found):**
```json
{ "error": "Tech Team not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while deleting tech team." }
```
```bash
curl -X DELETE http://localhost:8000/api/techteam/1/
```

## Feedback

### `GET /feedback/` – List Feedback

**Success (200 OK):**
```json
{
  "message": "Feedback retrieved successfully.",
  "data": { "comments": "string", "ratings": int, "project": int, "client": int  }
}
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Unable to fetch feedback at the moment. Please try again later." }
```
```bash
curl -X GET http://localhost:8000/api/feedback/
```

### `POST /feedback/` – Create Feedback

**Success (201 Created):**
```json
{
  "message": "Feedback created successfully.",
  "data": { "comments": "Great service", "ratings": 5, "project": 2, "client": 2 }
}
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid data provided." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while creating feedback." }
```
```bash
curl -X POST http://localhost:8000/api/feedback/ \
  -H "Content-Type: application/json" \
  -d '{ "comments": "Great service", "ratings": 5, "project": 2, "client": 2 }'
```

### `GET /feedback/<id>/` – Retrieve Feedback

**Success (200 OK):**
```json
{
  "message": "Feedback fetched successfully.",
  "data": { "comments": "string", "ratings": int, "project": int, "client": int }
}
```
**Failure (404 Not Found):**
```json
{ "error": "Feedback not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while fetching feedback." }
```
```bash
curl -X GET http://localhost:8000/api/feedback/1/
```

### `PUT /feedback/<id>/` – Update Feedback

**Success (200 OK):**
```json
{ "message": "Feedback updated successfully."
   "data" :{ "comments": "Great service", "ratings": 5, "project": 2, "client": 2 }
    }
```
**Failure (400 Bad Request):**
```json
{ "error": "Invalid update data." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while updating feedback." }
```
```bash
curl -X PUT http://localhost:8000/api/feedback/1/ \
  -H "Content-Type: application/json" \
  -d '{ "comments": "Great service", "ratings": 5, "project": 2, "client": 2 }'
```

### `DELETE /feedback/<id>/` – Delete Feedback

**Success (204 No Content):**
```json
{ "message": "Feedback deleted successfully." }
```
**Failure (404 Not Found):**
```json
{ "error": "Feedback not found." }
```
**Failure (500 Internal Server Error):**
```json
{ "error": "Server error while deleting feedback." }
```
```bash
curl -X DELETE http://localhost:8000/api/feedback/1/
```
