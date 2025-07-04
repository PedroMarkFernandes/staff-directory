# Staff Directory Web App

## 📝 Overview

This project is a responsive web application that displays a directory of staff members by combining data from a custom Python Flask API and the [randomuser.me](https://randomuser.me) external API. The UI is built with Bootstrap and enhanced with FontAwesome for icons.


![Screenshot of Staff Directory](screenshot.png)

## 🖼️ Technologies Used

- HTML, CSS, JavaScript  
- Bootstrap 5  
- FontAwesome  
- Flask (Python)  
- RandomUser.me API  
- GitHub Pages (for deployment)

---

## 🧠 How to Run in Codespaces

> This app uses a Flask backend and GitHub Pages for the frontend. The frontend is already hosted, but to run the backend locally in Codespaces:

In Github Codespaces, 

1. Install dependencies:
pip install -r backend/requirements.txt 

2. Switch to Backend folder which contains the Flask API: 
cd backend

3. Run Flask server:
flask run --host=0.0.0.0 --port=8000

IMPORTANT: Make sure port 8000 is public

When the Flask server starts, ensure that the 8000 port is set to Public in the Codespaces Port Tab. 
If the port is Private, the frontend will not be able to fetch data from the Backend API

4. View working frontend
🌐 Frontend (GitHub Pages): [View App](https://pedromarkfernandes.github.io/staff-directory/)
---

## 🚀 Features

- Responsive layout using Bootstrap grid and card components
- Reusable UI card component using modular JavaScript
- Combined fetch from both external (randomuser.me) and internal (Flask) API
- Filter staff by research area
- Error handling with Bootstrap alerts
- Modal view for detailed staff information
- FontAwesome icons for a polished interface
- Hosted via GitHub Pages (frontend) and Flask API (Codespaces-ready)

---

## 🌐 Flask API Documentation

My backend API is written in Flask and serves staff data. Here are the endpoints:

### `GET /` or `GET /staff`
Returns all staff members
Example: GET http://localhost:5000/

### `GET /?area=`
Returns staff filtered by research area using a query parameter. (case-insensitive match)
Example: GET /?area=Cybersecurity

### `GET /staff/<id>`
Returns details for a single staff member.

Example: GET http://localhost:5000/staff/3

---

## 🗂 Project Structure
```
staff-directory/
├── index.html  # Frontend UI
├── script.js   # Frontend JavaScript
├── style.css   # Custom styling
├── screenshot.png  # Screenshot for README
├── README.md   # This file
├── backend/
│   ├── app.py  # Flask backend API
│   └── requirements.txt   # Backend dependencies
├── .devcontainer/
│   ├── devcontainer.json  # Codespaces port auto-forwarding setup
```
---