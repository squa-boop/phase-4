from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'Users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(512), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'organizer' or 'attendee'


    def __repr__(self):
        return f'<User {self.username}>'

    # Check password method
    def check_password(self, password):
        return check_password_hash(self.password, password)

    # Set password hash method
    def set_password(self, password):
        self.password = generate_password_hash(password)


class Event(db.Model):
    __tablename__ = 'events'
    event_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), default='active')  # active, cancelled, completed

    # Organizer is a foreign key that links to the User model
    organizer_id = db.Column(db.Integer, db.ForeignKey('Users.user_id'), nullable=False)
    organizer = db.relationship('Users', backref='events')

    def __repr__(self):
        return f'<Event {self.title}>'

class RSVP(db.Model):
    __tablename__ = 'rsvps'
    rsvp_id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.user_id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)  # 'confirmed' or 'declined'

    event = db.relationship('Event', backref='rsvps')
    user = db.relationship('Users', backref='rsvps')

    def __repr__(self):
        return f'<RSVP {self.user.username} for {self.event.title}>'

