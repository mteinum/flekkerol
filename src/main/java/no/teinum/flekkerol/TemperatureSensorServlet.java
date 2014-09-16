package no.teinum.flekkerol;

import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

@SuppressWarnings("serial")
public class TemperatureSensorServlet extends WebSocketServlet {

	@Override
	public void configure(WebSocketServletFactory factory) {
	    factory.getPolicy().setIdleTimeout(1000 * 3600);
		factory.register(TemperatureSensorSocket.class);
	}
}