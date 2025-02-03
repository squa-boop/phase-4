from flask import Blueprint, request, jsonify
from models import db, Event, RSVP
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

event_bp = Blueprint("event_bp", __name__)

# Create Event
@event_bp.route("/event", methods=['POST'])
@jwt_required()
def create_event():
    current_user_id = get_jwt_identity()  # Get the current user's ID (the organizer)
    data = request.get_json()

    # Create the event and assign the current_user_id as the organizer
    event = Event(
        title=data['title'], 
        description=data['description'], 
        date=datetime.strptime(data['date'], '%Y-%m-%d %H:%M:%S'),
        location=data['location'],
        organizer_id=current_user_id  # Assign organizer
    )

    db.session.add(event)
    db.session.commit()

    return jsonify({"message": "Event created successfully!"}), 201

# View All Events (GET /api/events)
@event_bp.route('/api/events', methods=['GET'])
@jwt_required()  # Ensure that the request is authenticated
def get_all_events():
    current_user_id = get_jwt_identity()  # Get the user making the request

    # Fetch all events from the database
    events = Event.query.all()

    if not events:
        return jsonify({"message": "No events found."}), 404

    # Prepare event data to send to frontend
    events_data = []
    for event in events:
        events_data.append({
            "event_id": event.event_id,  # Ensure to use event.event_id as the primary key
            "title": event.title,
            "description": event.description,
            "date": event.date,
            "location": event.location,
            "status": event.status  # Optional, can include the status of the event
        })

    # Return events data as JSON
    return jsonify(events_data), 200


# Edit Event (Only organizer can edit)
@event_bp.route('/<int:event_id>', methods=['PUT'])
@jwt_required()
def edit_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    # Ensure the user is the organizer of the event
    if event.organizer_id != current_user_id:
        return jsonify({"message": "You are not authorized to edit this event."}), 403

    data = request.get_json()

    # Validate and update the date if provided
    new_date_str = data.get('date', None)
    if new_date_str:
        try:
            event.date = datetime.strptime(new_date_str, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return jsonify({"message": "Invalid date format. Use 'YYYY-MM-DD HH:MM:SS'."}), 400

    event.title = data.get('title', event.title)
    event.description = data.get('description', event.description)
    event.location = data.get('location', event.location)

    db.session.commit()

    return jsonify({"message": "Event details updated successfully!"}), 200


# Delete Event (Only organizer can delete)
@event_bp.route('/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    # Ensure the user is the organizer of the event
    if event.organizer_id != current_user_id:
        return jsonify({"message": "You are not authorized to delete this event."}), 403

    # Delete any RSVPs associated with the event (if applicable)
    RSVP.query.filter_by(event_id=event_id).delete()

    db.session.delete(event)
    db.session.commit()

    return jsonify({"message": "Event deleted successfully!"}), 200

