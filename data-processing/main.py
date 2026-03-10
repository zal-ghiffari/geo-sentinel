import re
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse

app = FastAPI(title="GEO-SENTINEL Strategic Extraction API")

# --- CORS CONFIG ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONFIG ---
JSON_KEYFILE = "credentials.json"
SPREADSHEET_ID = "1tZskfiFyzOU5v7x5hAd5anwHp2yLJWuo6sx9t58PiRo" 

class NewsInput(BaseModel):
    title: str
    url: str
    source: str

# --- HELPER FUNCTIONS ---

def get_sheet_client():
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name(JSON_KEYFILE, scope)
    return gspread.authorize(creds).open_by_key(SPREADSHEET_ID).sheet1

def format_label(text):
    """Mengubah 'military_bases' menjadi 'Military Bases'"""
    return text.replace('_', ' ').title()

def save_to_sheets(data_list):
    try:
        sheet = get_sheet_client()
        sheet.append_row(data_list)
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

def extract_media_name(url: str) -> str:
    try:
        domain = urlparse(url).netloc.replace('www.', '')
        return domain.split('.')[0].capitalize()
    except: return "Unknown"

def extract_intel(title: str):
    # 1. Mapping Negara & Geocode (Termasuk Indonesia)
    country_map = {
        'Iran': (r"(?i)\b(Iran|Iranian|Tehran|IRGC|Persian|Khamenei)\b", "IR"),
        'United States': (r"(?i)\b(US|USA|United States|America|Washington|Pentagon|Biden|Trump)\b", "US"),
        'Israel': (r"(?i)\b(Israel|Israeli|Tel Aviv|IDF|Mossad|Netanyahu)\b", "IL"),
        'Australia': (r"(?i)\b(Australia|Australian|Canberra)\b", "AU"),
        'Saudi Arabia': (r"(?i)\b(Saudi Arabia|Riyadh|KSA)\b", "SA"),
        'Yemen': (r"(?i)\b(Yemen|Sanaa|Houthi)\b", "YE"),
        'Russia': (r"(?i)\b(Russia|Russian|Moscow)\b", "RU"),
        'China': (r"(?i)\b(China|Chinese|Beijing)\b", "CN"),
        'Lebanon': (r"(?i)\b(Lebanon|Hezbollah|Beirut)\b", "LB"),
        'Indonesia': (r"(?i)\b(Indonesia|Indonesian|Jakarta|Prabowo|TNI)\b", "ID"),
        'India': (r"(?i)\b(India|Indian|New Delhi|Modi|Bollywood|Bharat)\b", "IN"),
        'United Kingdom': (r"(?i)\b(UK|United Kingdom|Britain|British|London|Downing Street)\b", "GB"),
        'North Korea': (r"(?i)\b(North Korea|DPRK|Pyongyang|Kim Jong Un)\b", "KP"),
        'South Korea': (r"(?i)\b(South Korea|ROK|Seoul)\b", "KR"),
        'Ukraine': (r"(?i)\b(Ukraine|Ukrainian|Kyiv|Zelensky)\b", "UA"),
        'Germany': (r"(?i)\b(Germany|German|Berlin|Bundestag)\b", "DE"),
        'France': (r"(?i)\b(France|French|Paris|Macron)\b", "FR"),
        'Japan': (r"(?i)\b(Japan|Japanese|Tokyo)\b", "JP"),
        'Turkey': (r"(?i)\b(Turkey|Turkish|Ankara|Erdogan)\b", "TR"),
        'Syria': (r"(?i)\b(Syria|Syrian|Damascus|Assad)\b", "SY"),
        'Iraq': (r"(?i)\b(Iraq|Iraqi|Baghdad)\b", "IQ"),
        'Pakistan': (r"(?i)\b(Pakistan|Pakistani|Islamabad)\b", "PK"),
        'Taiwan': (r"(?i)\b(Taiwan|Taiwanese|Taipei)\b", "TW"),
        'Palestine': (r"(?i)\b(Palestine|Palestinian|Gaza|West Bank|Ramallah|Hamas|Fatah|Abbas)\b", "PS")
    }
    
    # 2. Assets Breakdown
    asset_patterns = {
        'Drones': r"(?i)(drone|uav|shahed|reaper|bayraktar)",
        'Aircraft': r"(?i)(aircraft|fighter jet|bomber|f-35|f-22|sukhoi)",
        'Tank': r"(?i)(tank|armored vehicle|apc|abrams|leopard)",
        'Missile': r"(?i)(missile|rudal|rocket|ballistic|interceptor)",
        'Nuclear': r"(?i)(nuclear|uranium|enrichment|centrifuge|atomic|iaea)",
        'Datacentre': r"(?i)(datacentre|data center|server|compute cluster|gpu cluster)",
        'Warship': r"(?i)(warship|carrier|destroyer|submarine|vessel|fleet)",
        'Oil': r"(?i)(oil|crude|petroleum|tanker|refinery|brent|fuel)",
        'Pipeline': r"(?i)(pipeline|nord stream|tapi|gas pipe)",
        'Satellite': r"(?i)(satellite|orbital|spaceport|rocket launch)"
    }
    
    # 3. Strategic Topic Patterns (Detailed Breakdown)
    topic_patterns = {
        # Armed Conflict & Military
        'Armed Conflict Events': r"(?i)(armed conflict|clash|skirmish|battle|uppsala|combat)",
        'Displacement Flows': r"(?i)(refugee|displacement|migrant|fleeing|border crossing)",
        'Military Bases': r"(?i)(military base|installation|nato base|outpost|garrison)",
        'Military Activity': r"(?i)(military activity|troop movement|deployment|live tracking)",
        'Nuclear Sites': r"(?i)(nuclear plant|weapons facility|enrichment site)",
        'Gamma Irradiators': r"(?i)(gamma irradiator|industrial irradiator|cobalt-60)",
        
        # Infrastructure & Cyber
        'Undersea Cables': r"(?i)(undersea cable|fiber optic cable|backbone route|submarine cable)",
        'Internet Outages': r"(?i)(internet blackout|outage|service disruption|connectivity loss)",
        'AI Data Centers': r"(?i)(ai compute|10,000 gpus|h100|compute cluster)",
        'Cyber Threats': r"(?i)(cyber attack|hacking|security event|ransomware|malware)",
        
        # Transport & Trade
        'Ship Traffic': r"(?i)(vessel tracking|ais positions|maritime traffic)",
        'Trade Routes': r"(?i)(shipping lane|strategic chokepoint|trade route|strait of hormuz|suez canal)",
        'Aviation': r"(?i)(aviation|airport delay|ground stop|faa alert|flight disruption)",
        
        # Natural & Economic
        'Natural Events': r"(?i)(earthquake|storm|volcano|flood|nasa eonet|usgs)",
        'Active Fires': r"(?i)(wildfire|fire perimeter|nasa firms|forest fire)",
        'Economic Centers': r"(?i)(stock exchange|central bank|wall street|financial hub)",
        'Critical Minerals': r"(?i)(critical mineral|mineral deposit|lithium mine|cobalt mine|rare earth)",
        
        # Overlays
        'Strategic Waterways': r"(?i)(chokepoint|malacca strait|bab al-mandab|strategic water)"
    }

    found_c, found_g, found_a, found_t = [], [], [], []
    
    # Countries
    for name, (p, c) in country_map.items():
        if re.search(p, title): 
            found_c.append(name)
            found_g.append(c)
    
    # Assets (Formatted)
    for k, p in asset_patterns.items():
        if re.search(p, title): found_a.append(format_label(k))
            
    # Topics (Formatted)
    for k, p in topic_patterns.items():
        if re.search(p, title): found_t.append(format_label(k))

    return {
        'country': ", ".join(found_c),
        'geocode': ", ".join(found_g),
        'assets': ", ".join(found_a),
        'topics': ", ".join(found_t)
    }

# --- ENDPOINTS ---

@app.get("/data")
async def read_all_data():
    """Membaca semua data dari Google Sheets dan mengembalikannya sebagai JSON"""
    try:
        sheet = get_sheet_client()
        # Mengambil semua record (baris pertama dianggap sebagai header/kunci)
        records = sheet.get_all_records()
        return {
            "status": "Success",
            "total_records": len(records),
            "data": records
        }
    except Exception as e:
        return {"status": "Error", "message": str(e)}

@app.post("/extract")
async def process_news(news: NewsInput):
    media = extract_media_name(news.url)
    intel = extract_intel(news.title)
    
    # Final data row for Sheet
    row = [
        news.title, 
        media, 
        news.source, 
        intel['country'], 
        intel['geocode'], 
        intel['assets'], 
        intel['topics'], 
        news.url
    ]
    
    success = save_to_sheets(row)
    
    return {
        "status": "Success" if success else "Error saving",
        "data": {
            "title": news.title,
            "media": media,
            **intel
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)