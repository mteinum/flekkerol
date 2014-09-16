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
	
	private Session _session;

	@Override
	public void onWebSocketClose(int statusCode, String reason) {
		super.onWebSocketClose(statusCode, reason);
		
		LOGGER.info("onWebSocketClose " + statusCode + ", " + reason);
		
	}

	@Override
	public void onWebSocketConnect(Session sess) {
		super.onWebSocketConnect(sess);
		
		_session = sess;
		
		LOGGER.info("onWebSocketConnect " + sess);
		
	}

	@Override
	public void onWebSocketError(Throwable cause) {
		super.onWebSocketError(cause);
		
		LOGGER.info("onWebSocketError " + cause);
	}

	@Override
	public void onWebSocketText(String message) {
		super.onWebSocketText(message);
		
		if (message.equals("ping")) {
		}
		else{
			// echo back
			try {
				_session.getRemote().sendString(message);
			} catch (IOException e) {
				LOGGER.info("failure " + e);
			}
		}
	}
	
	
}
