package no.teinum.flekkerol;

import java.io.IOException;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Logger;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.json.JSONObject;

@WebSocket(maxTextMessageSize = 64 * 1024)
public class TemperatureSensorSocket extends WebSocketAdapter {

	private static final Logger LOGGER = Logger
			.getLogger(TemperatureSensorSocket.class.getName());
	
	// list of clients connected to this client
	private ConcurrentLinkedQueue<TemperatureClientSocket> _clients =
			new ConcurrentLinkedQueue<TemperatureClientSocket>();
	
	public void addClient(TemperatureClientSocket client){
		_clients.add(client);
	}
	
	public void removeClient(TemperatureClientSocket client){
		_clients.remove(client);
	}

	private String _sensorId;
	
	public String getSensorId(){ return _sensorId; }
	
	@Override
	public void onWebSocketClose(int statusCode, String reason) {
		LOGGER.info("onWebSocketClose " + statusCode + ", " + reason);

		SensorRegistry.remove(this);
		
		JSONObject obj = new JSONObject();
		
		obj.put("type", "sensor-remove")
		   .put("data", getSensorId());

		ClientRegistry.broadcast(obj);
	}

	@Override
	public void onWebSocketConnect(Session sess) {
		LOGGER.info("onWebSocketConnect " + sess);
	}

	@Override
	public void onWebSocketError(Throwable cause) {
		LOGGER.info("onWebSocketError " + cause);
	}
	
	private void registerSensor(String id){
		_sensorId = id;
		SensorRegistry.add(this);
		
		JSONObject obj = new JSONObject();
		
		obj.put("type", "sensor-add")
		   .put("data", id);
		
		ClientRegistry.broadcast(obj);
	}
	
	private void sendSensorData(String value){
		JSONObject obj = new JSONObject();
		
		JSONObject data = new JSONObject();
		data.put("sensor-id", getSensorId());
		data.put("value", value);
		
		obj.put("type", "sensor-data");
		obj.put("data", data);
		
		for (TemperatureClientSocket client : _clients) {
			try {
				client.send(obj);
			} catch (IOException e) {
				_clients.remove(client);
			}
		}
	}

	@Override
	public void onWebSocketText(String message) {
		
		LOGGER.info(message);

		String[] parts = message.split(":");
		String command = parts[0];

		if (command.equals("ping")) {
			// keep socket alive
		}
		else if (command.equals("id")){
			registerSensor(parts[1]);
		}
		else if (command.equals("temperature"))
		{
			sendSensorData(parts[1]);
		}
		else {
			LOGGER.info("unknown: " + message);
		}
	}
}
