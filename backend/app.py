from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app) # Enables CORS for all routes
# Random staff data
staff_data = [              
    {
        "id": 1,
        "research_area": "Artificial Intelligence",
    },
    {
        "id": 2,
        "research_area": "Data Science",
    }
    ,
    {
        "id": 3,
        "research_area": "Cybersecurity",
    },
    {
        "id": 4,
        "research_area": "Machine Learning",
    },
    {
        "id": 5,
        "research_area": "Web Development",
    },
    {
        "id": 6,
        "research_area": "Cloud Computing",
    },
    {
        "id": 7,
        "research_area": "Blockchain Technology",
    },
    {
        "id": 8,
        "research_area": "Internet of Things",
    },
    {
        "id": 9,
        "research_area": "Augmented Reality",
    },
    {
        "id": 10,
        "research_area": "Virtual Reality",
    }
]

# Home route                
@app.route('/')
def home():         
    return "Welcome to the Staff API!"

# Gets all staff or filter by research area
@app.route('/staff')
def get_staff():
    area = request.args.get("area")  # Gets the 'area' query parameter
    if area:
        filtered = [person for person in staff_data if person["research_area"].lower() == area.lower()]
        return jsonify(filtered)
    return jsonify(staff_data)

# Route to get staff member by ID
@app.route('/staff/<int:staff_id>')
def get_staff_by_id(staff_id):
    # Searches for a staff member with matching ID
    for member in staff_data:
        if member["id"] == staff_id:
            return jsonify(member)
    return jsonify({"error": "Staff member not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)
# This runs the Flask app in debug mode      
