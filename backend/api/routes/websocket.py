from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.websocket_service import manager

router = APIRouter()

@router.websocket("/ws/{client_type}")
async def websocket_endpoint(websocket: WebSocket, client_type: str):
    """
    WebSocket endpoint for real-time updates
    
    client_type: 'admin', 'citizen', or 'worker'
    """
    if client_type not in ['admin', 'citizen', 'worker']:
        await websocket.close(code=1008)
        return

    await manager.connect(websocket, client_type)
    
    try:
        while True:
            # Keep connection alive and handle incoming messages
            data = await websocket.receive_text()
            # Echo back for now (can add message handling logic)
            await manager.send_personal_message({
                'type': 'ack',
                'message': 'Message received'
            }, websocket)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, client_type)
