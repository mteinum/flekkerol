package no.teinum.flekkerol;

import java.io.IOException;
import java.util.logging.Logger;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.json.JSONArray;
import org.json.JSONObject;

public class TemperatureClientSocket extends WebSocketAdapter {

	private static final Logger LOGGER = Logger
			.getLogger(TemperatureClientSocket.class.getName());
	
	private Session _session;

	@Override
	public void onWebSocketClose(int statusCode, String reason) {
		LOGGER.info("onWebSocketClose " + statusCode + ", " + reason);

		ClientRegistry.remove(this);
	}

	@Override
	public void onWebSocketConnect(Session sess) {
		LOGGER.info("onWebSocketConnect " + sess);
		_session = sess;
		ClientRegistry.add(this);
	}

	@Override
	public void onWebSocketError(Throwable cause) {
		LOGGER.info("onWebSocketError " + cause);
	}

	private void send(String message) throws IOException {
		LOGGER.info("send " + message);
		try {
			_session.getRemote().sendString(message);
		} catch (IOException e) {
			ClientRegistry.remove(this);
			throw e;
		}
	}
	
	public void send(JSONObject root) throws IOException {
		send(root.toString());
	}
	
	private void sendSensorList(){
		JSONObject root = new JSONObject();
        JSONArray ids = new JSONArray();

        root.put("type", "sensor-list");
        root.put("data", ids);
        
        for (String id : SensorRegistry.getSensorList()){
        	ids.put(id);
        }
		
        try {
			send(root);
		} catch (IOException e) {
		}
	}
	
	private void sendClientBroadcast(String message){
		JSONObject obj = new JSONObject();
		obj.put("type", "client-broadcast");
		obj.put("data", message);
		
		ClientRegistry.broadcast(obj);
	}

	@Override
	public void onWebSocketText(String message) {
		String[] parts = message.split(":");
		String command = parts[0];

		if (command.equals("ping")) {
			// keep socket alive
		} else if (command.equals("sensor-list")) {
			sendSensorList();
		} else if (command.equals("subscribe")) {

			TemperatureSensorSocket socket = SensorRegistry.getSensor(parts[1]);

			if (socket != null) {
				socket.addClient(this);
			}

		} else if (command.equals("unsubscribe")) { // ikke sikkert vi trenger
													// denne
			TemperatureSensorSocket socket = SensorRegistry
					.getSensor(parts[1]);

			if (socket != null) {
				socket.removeClient(this);
			}

		} else {
			sendClientBroadcast(message);
		}
	}
}