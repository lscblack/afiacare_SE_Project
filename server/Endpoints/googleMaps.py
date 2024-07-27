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
            contact_details = {
                'phone': element['tags'].get('phone') or element['tags'].get('contact:phone'),
                'website': element['tags'].get('website') or element['tags'].get('contact:website'),
                'address': element['tags'].get('addr:street') or element['tags'].get('addr:full')
            }
            amenities.append({
                'name': name, 
                'location': (lat, lon), 
                'link': google_maps_link, 
                'contact_details': contact_details
            })
    
    return amenities


@router.get("/me/near_by_hospitals/{lat}&{lon}")
async def near_by_hospitals(user: user_dependency, db: db_dependency,lat:float,lon:float):
    hospitals = get_nearby_amenities(lat, lon, "hospital")
    return {"hospitals": hospitals,"lat":lat,"lon":lon}

@router.get("/me/near_by_pharmacies/{lat}&{lon}")
async def near_by_pharmacies(user: user_dependency, db: db_dependency,lat:float,lon:float):
    pharmacies = get_nearby_amenities(lat, lon, "pharmacy")
    return {"pharmacies": pharmacies,"lat":lat,"lon":lon}