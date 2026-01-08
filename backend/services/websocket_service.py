from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict, List
import json
import asyncio

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {
            'admin': [],
            'citizen': [],
            'worker': []
        }

    async def connect(self, websocket: WebSocket, client_type: str):
        await websocket.accept()
        self.active_connections[client_type].append(websocket)
        print(f"New {client_type} connection. Total: {len(self.active_connections[client_type])}")

    def disconnect(self, websocket: WebSocket, client_type: str):
        self.active_connections[client_type].remove(websocket)
        print(f"{client_type} disconnected. Total: {len(self.active_connections[client_type])}")

    async def broadcast(self, message: dict, client_type: str = None):
        """Broadcast message to specific client type or all"""
        message_str = json.dumps(message)
        
        if client_type:
            connections = self.active_connections.get(client_type, [])
        else:
            connections = [conn for conns in self.active_connections.values() for conn in conns]

        disconnected = []
        for connection in connections:
            try:
                await connection.send_text(message_str)
            except:
                disconnected.append(connection)

        # Clean up disconnected clients
        for conn in disconnected:
            for client_type, conns in self.active_connections.items():
                if conn in conns:
                    conns.remove(conn)

    async def send_personal_message(self, message: dict, websocket: WebSocket):
        await websocket.send_text(json.dumps(message))

manager = ConnectionManager()

async def notify_new_incident(incident_data: dict):
    """Notify all admin clients about new incident"""
    await manager.broadcast({
        'type': 'new_incident',
        'data': incident_data
    }, client_type='admin')

async def notify_mission_assigned(worker_id: int, mission_data: dict):
    """Notify specific worker about new mission"""
    # TODO: Implement worker-specific messaging
    await manager.broadcast({
        'type': 'mission_assigned',
        'data': mission_data
    }, client_type='worker')

async def notify_incident_completed(incident_id: int):
    """Notify all citizens about completed incident"""
    await manager.broadcast({
        'type': 'incident_completed',
        'data': {'incident_id': incident_id}
    }, client_type='citizen')
