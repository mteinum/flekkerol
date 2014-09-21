package no.teinum.flekkerol;

import java.util.logging.Logger;

import org.eclipse.jetty.websocket.servlet.ServletUpgradeRequest;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeResponse;
import org.eclipse.jetty.websocket.servlet.WebSocketCreator;

public class TemperatureSensorCreator implements WebSocketCreator {

	private static final Logger LOGGER = Logger
			.getLogger(TemperatureSensorCreator.class.getName());
	
	@Override
	public Object createWebSocket(ServletUpgradeRequest req,
			ServletUpgradeResponse resp) {
		
		LOGGER.info("TemperatureSensorCreator " + req);
		
		for (String subprotocol : req.getSubProtocols()){
			LOGGER.info("subProtocol: " + subprotocol);
			
			if (subprotocol.equals("sensor")){
				resp.setAcceptedSubProtocol(subprotocol);
				
				return new TemperatureSensorSocket();
			}
		}

		return new TemperatureClientSocket();
	}
}
