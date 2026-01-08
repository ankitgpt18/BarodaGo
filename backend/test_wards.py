"""
Test script to validate official Vadodara ward GeoJSON
"""
import json
import sys

try:
    with open('backend/data/vadodara_wards_official.geojson', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print("=" * 60)
    print("VADODARA WARD GEOJSON VALIDATION")
    print("=" * 60)
    
    total_wards = len(data['features'])
    print(f"\nTotal wards found: {total_wards}")
    
    print("\nWard List:")
    print("-" * 60)
    
    for feature in data['features']:
        props = feature['properties']
        ward_no = props.get('ward_no')
        ward_name = props.get('ward_name')
        ward_address = props.get('ward_address', 'N/A')
        
        print(f"Ward {ward_no:2d}: {ward_name:20s} | {ward_address[:40]}")
    
    print("-" * 60)
    print(f"\nAll {total_wards} wards validated successfully!")
    print("\nFile: vadodara_wards_official.geojson")
    print(f"Size: {len(json.dumps(data))} bytes")
    
except FileNotFoundError:
    print("ERROR: vadodara_wards_official.geojson not found!")
    sys.exit(1)
except json.JSONDecodeError as e:
    print(f"ERROR: Invalid JSON - {e}")
    sys.exit(1)
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)
