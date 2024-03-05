import pytest
import sys

sys.path.append("../")
from app import create_app as proj

@pytest.fixture
def client():
    app = proj()
    
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_midi_data(client):
    response = client.get('/v1/api/midis')
    assert response.status_code == 200
    assert response.data == b'List of MIDIs'