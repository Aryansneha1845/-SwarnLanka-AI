ROUTING = {
    'pothole': 'Road Maintenance',
    'road_damage': 'Road Maintenance',
    'garbage': 'Waste Management',
    'streetlight': 'Electrical Department',
    'water_leakage': 'Water Department',
    'fallen_tree': 'Parks / Disaster Management',
    'traffic_signal': 'Traffic Department',
}

def route_department(category: str) -> str:
    return ROUTING.get(category.lower(), 'General Administration')
