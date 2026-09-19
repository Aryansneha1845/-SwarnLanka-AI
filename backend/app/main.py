from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title='SwarnLanka AI API',
    description='AI-powered civic intelligence platform',
    version='1.0.0'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/')
def root():
    return {'message': 'SwarnLanka AI API is running', 'status': 'online'}

@app.get('/health')
def health():
    return {'status': 'healthy'}

# Routers will be included here
# from app.routes import reports, ai, dashboard
# app.include_router(reports.router, prefix='/api/reports')
