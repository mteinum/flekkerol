package no.teinum.flekkerol;

import java.io.IOException;
import java.util.logging.Logger;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

@WebSocket(maxTextMessageSize = 64 * 1024)
public class TemperatureSensorSocket extends WebSocketAdapter {
	
	private static final Logger LOGGER = 
            Logger.getLogger(TemperatureSensorSocket.class.getName());

	@Override
	public void onWebSocketClose(int statusCode, String reason) {
		super.onWebSocketClose(statusCode, reason);
		
		LOGGER.info("onWebSocketClose " + statusCode + ", " + reason);
		
	}

	@Override
	public void onWebSocketConnect(Session sess) {
		super.onWebSocketConnect(sess);
		
		LOGGER.info("onWebSocketConnect " + sess);
		
		try {
			sess.getRemote().sendString("Hello WebSocket");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void onWebSocketError(Throwable cause) {
		super.onWebSocketError(cause);
		
		LOGGER.info("onWebSocketError " + cause);
	}

	@Override
	public void onWebSocketText(String message) {
		super.onWebSocketText(message);
		
		LOGGER.info("onWebSocketText: " + message);
	}
	
	
}
