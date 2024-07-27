from fastapi import APIRouter, HTTPException
import requests
from db.connection import db_dependency
from db.VerifyToken import user_dependency

router = APIRouter(prefix="/apis", tags=["User Management"])


# Helper function to get nearby amenities
def get_nearby_amenities(lat, lon, amenity, radius=5000):
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    (
      node["amenity"="{amenity}"](around:{radius},{lat},{lon});
      way["amenity"="{amenity}"](around:{radius},{lat},{lon});
      relation["amenity"="{amenity}"](around:{radius},{lat},{lon});
    );
    out center;
    """
    response = requests.get(overpass_url, params={'data': overpass_query})
    if response.status_code == 200:
        data = response.json()
    else:
        raise HTTPException(status_code=500, detail="Error fetching data from Overpass API")
    
    amenities = []
    for element in data['elements']:
        if 'tags' in element and 'name' in element['tags']:
            name = element['tags']['name']
            if element['type'] == 'node':
                lat, lon = element['lat'], element['lon']
            elif 'center' in element:
                lat, lon = element['center']['lat'], element['center']['lon']
            else:
                continue

            google_maps_link = f"https://www.google.com/maps/search/?api=1&query={lat},{lon}"
            amenities.append({'name': name, 'location': (lat, lon), 'link': google_maps_link})
    
    return amenities

def get_my_location():
    try:
        response = requests.get('http://ipinfo.io/json')
        if response.status_code == 200:
            data = response.json()
            lat, lon = data['loc'].split(',')
            return float(lat), float(lon)
        else:
            raise HTTPException(status_code=500, detail="Error fetching location")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")

@router.get("/me/near_by_hospitals")
async def near_by_hospitals(user: user_dependency, db: db_dependency):
    lat, lon = get_my_location()
    hospitals = get_nearby_amenities(lat, lon, "hospital")
    return {"hospitals": hospitals}

@router.get("/me/near_by_pharmacies")
async def near_by_pharmacies(user: user_dependency, db: db_dependency):
    lat, lon = get_my_location()
    pharmacies = get_nearby_amenities(lat, lon, "pharmacy")
    return {"pharmacies": pharmacies}