package no.teinum.flekkerol;

import java.io.IOException;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.eclipse.jetty.websocket.api.WebSocketException;
import org.json.JSONObject;

public class ClientRegistry {
	static ConcurrentLinkedQueue<TemperatureClientSocket> _broadcast = new ConcurrentLinkedQueue<TemperatureClientSocket>();

	public static void add(TemperatureClientSocket client){
		_broadcast.add(client);
	}
	
	public static void remove(TemperatureClientSocket client){
		_broadcast.remove(client);
	}
	
	public static void broadcast(JSONObject obj){
		for (TemperatureClientSocket s : _broadcast) {
			try {
				s.send(obj);
			} catch (IOException e) {
				// det logges og ryddes opp i s.send
			}
			catch (WebSocketException e){
			}
		}
	}
}
