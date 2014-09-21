package no.teinum.flekkerol;

import java.util.logging.Logger;

import org.eclipse.jetty.websocket.servlet.ServletUpgradeRequest;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeResponse;
import org.eclipse.jetty.websocket.servlet.WebSocketCreator;

// Vi har klienter som kjører i nettleser
// Vi har sensorer som kjører på Raspberry Pi
//
// 1. Når en sensor kobles opp, skal vi registrere denne med sensorid
// 2. En klient skal kunne få en liste med tilkoblet sensorer
// 3. En klient skal kunne abonnere på data fra sensoren
// 4. Dersom vi mister forbindelsen med en sensor må klienten ha beskjed
// 5. Dersom klienten kobles fra, vil sensoren ta den bort fra sin liste
//    grunnet io feil.
// 6. Når en sensor kobles til skal alle klienter få beskjed
//    På denne måten kan vi gjøre en "resubscribe" dersom sensor kobles av/på
//
//
//


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
