package no.teinum.flekkerol;

import java.util.concurrent.ConcurrentLinkedQueue;

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
			s.send(obj);
		}
	}
}
