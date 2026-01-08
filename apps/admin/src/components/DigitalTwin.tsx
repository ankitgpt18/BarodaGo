import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './DigitalTwin.css'

// Replace with your Mapbox token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiYmFyb2RhZ28iLCJhIjoiY2xrMTIzNDU2In0.example'

interface Incident {
    id: number
    latitude: number
    longitude: number
    category: string
    severity: number
    status: string
}

function DigitalTwin() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [incidents, setIncidents] = useState<Incident[]>([])

    useEffect(() => {
        if (!mapContainer.current) return

        // Initialize map centered on Vadodara
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [73.1812, 22.3072], // Vadodara coordinates
            zoom: 12,
            pitch: 45,
            bearing: -17.6
        })

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

        // Add 3D buildings
        map.current.on('load', () => {
            if (!map.current) return

            const layers = map.current.getStyle().layers
            const labelLayerId = layers?.find(
                (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
            )?.id

            map.current.addLayer(
                {
                    id: '3d-buildings',
                    source: 'composite',
                    'source-layer': 'building',
                    filter: ['==', 'extrude', 'true'],
                    type: 'fill-extrusion',
                    minzoom: 13,
                    paint: {
                        'fill-extrusion-color': '#334155',
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            )

            // Load ward boundaries from GeoJSON
            loadWardBoundaries()

            // Load incident markers
            loadIncidentMarkers()
        })

        return () => {
            map.current?.remove()
        }
    }, [])

    const loadWardBoundaries = () => {
        if (!map.current) return

        // TODO: Load actual GeoJSON from backend
        // For now, we'll add a sample boundary
        map.current.addSource('wards', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        })

        map.current.addLayer({
            id: 'ward-boundaries',
            type: 'line',
            source: 'wards',
            paint: {
                'line-color': '#6366f1',
                'line-width': 2,
                'line-opacity': 0.6
            }
        })
    }

    const loadIncidentMarkers = () => {
        if (!map.current) return

        // Sample incidents (replace with API call)
        const sampleIncidents: Incident[] = [
            { id: 1, latitude: 22.3072, longitude: 73.1812, category: 'pothole', severity: 8, status: 'pending' },
            { id: 2, latitude: 22.3172, longitude: 73.1912, category: 'garbage', severity: 5, status: 'in_progress' },
            { id: 3, latitude: 22.2972, longitude: 73.1712, category: 'streetlight', severity: 3, status: 'pending' }
        ]

        setIncidents(sampleIncidents)

        sampleIncidents.forEach(incident => {
            if (!map.current) return

            const el = document.createElement('div')
            el.className = `incident-marker severity-${incident.severity >= 7 ? 'high' : incident.severity >= 4 ? 'medium' : 'low'}`
            el.innerHTML = getCategoryIcon(incident.category)

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="incident-popup">
          <h4>${incident.category.toUpperCase()}</h4>
          <p><strong>Severity:</strong> ${incident.severity}/10</p>
          <p><strong>Status:</strong> ${incident.status}</p>
          <button class="btn btn-primary btn-sm">View Details</button>
        </div>
      `)

            new mapboxgl.Marker(el)
                .setLngLat([incident.longitude, incident.latitude])
                .setPopup(popup)
                .addTo(map.current)
        })
    }

    const getCategoryIcon = (category: string): string => {
        const icons: Record<string, string> = {
            pothole: '🕳️',
            garbage: '🗑️',
            streetlight: '💡',
            stray_cattle: '🐄',
            sewer: '🚰',
            water_supply: '💧',
            road_damage: '🛣️'
        }
        return icons[category] || '📍'
    }

    return (
        <div className="digital-twin-container">
            <div ref={mapContainer} className="map-container" />
            <div className="map-legend">
                <h4>Severity Levels</h4>
                <div className="legend-item">
                    <span className="legend-dot severity-high"></span>
                    <span>High (7-10)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot severity-medium"></span>
                    <span>Medium (4-6)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot severity-low"></span>
                    <span>Low (1-3)</span>
                </div>
            </div>
        </div>
    )
}

export default DigitalTwin
