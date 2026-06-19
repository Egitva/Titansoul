import json
from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

app.mount("/images", StaticFiles(directory="images"), name="images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/data")
async def get_data(fname: str = Query(None)):
    try:
        with open("data/db.json", encoding="utf-8") as f:
            data = json.load(f)
        
        cards = data.get("data", [])
        
        # Фильтрация по поиску
        if fname:
            fname_lower = fname.lower()
            cards = [
                card for card in cards 
                if fname_lower in card.get("name", "").lower()
            ]
        
        return {"data": cards}
    
    except Exception as e:
        return {"error": str(e)}
