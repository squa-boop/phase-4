import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from models import db
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from datetime import timedelta
from flask_cors import CORS



# Import blueprints
from view.user import user_bp
from view.event import event_bp
from view.rsvp import rsvp_bp
from view.auth import auth_bp

app = Flask(__name__)

# Enable CORS globally for specific origins (optional)
CORS(app)

# Flask database configuration using environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "postgresql://app_db_dt61_user:rgy1nMRTGMJIfRTw2apka2MREEXQxw60@dpg-cuftokqj1k6c73fuo73g-a.oregon-postgres.render.com/app_db_dt61")
migrate = Migrate(app, db)
db.init_app(app)

# JWT configuration using environment variables
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "default-secret-key")  # Secret key from environment
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)
jwt.init_app(app)

# Register blueprints
app.register_blueprint(user_bp)
app.register_blueprint(event_bp)
app.register_blueprint(rsvp_bp)
app.register_blueprint(auth_bp)

# Example protected route using JWT
@app.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user = get_jwt_identity()  # Get user identity from the JWT token
    return jsonify(current_user), 200  # Return current user data as JSON

if __name__ == "__main__":
    app.run(debug=True)
