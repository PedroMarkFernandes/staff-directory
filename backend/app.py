from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app) # Enables CORS for all routes
# Random staff data
staff_data = [              
    {
        "id": 1,
        "research_area": "Artificial Intelligence",
        "email": "john.smith@university.edu"
    },
    {
        "id": 2,
        "research_area": "Data Science",
        "email": "sarah.lee@university.edu"
    }
]

# Home route                
@app.route('/')
def home():         
    return "Welcome to the Staff API!"

# Route to get all staff
@app.route('/staff')
def get_staff():
    return jsonify(staff_data)

if __name__ == '__main__':
    app.run(debug=True)
# Use the command python app.py
# Access the API at http://127.0.0.1:5000/staff
# This will return the staff data in JSON format.       
