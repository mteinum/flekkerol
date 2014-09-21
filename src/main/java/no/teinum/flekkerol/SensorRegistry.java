package no.teinum.flekkerol;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentLinkedQueue;

public class SensorRegistry {
	
	static ConcurrentLinkedQueue<TemperatureSensorSocket> _sensors = new ConcurrentLinkedQueue<TemperatureSensorSocket>();
	
	public static TemperatureSensorSocket getSensor(String id){
		for (TemperatureSensorSocket sensor : _sensors){
			if (sensor.getSensorId().equals(id))
				return sensor;
		}
		
		return null;
	}
	
	public static ArrayList<String> getSensorList(){
		ArrayList<String> sensorList = new ArrayList<String>();
		
		for (TemperatureSensorSocket sensor : _sensors){
			sensorList.add(sensor.getSensorId());
		}
		
		return sensorList;
	}
	
	public static void add(TemperatureSensorSocket socket){
		_sensors.add(socket);
	}
	
	public static void remove(TemperatureSensorSocket socket){
		_sensors.remove(socket);
	}
}
