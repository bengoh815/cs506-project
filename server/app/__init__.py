from flask import Flask
from .routes.midi_routes import midi_bp

def create_app():
    app = Flask(__name__)

    # Configure your app, register blueprints, etc.
    # app.config['SECRET_KEY'] = 'your_secret_key'

    app.register_blueprint(midi_bp, url_prefix='/v1/api') 

    return app