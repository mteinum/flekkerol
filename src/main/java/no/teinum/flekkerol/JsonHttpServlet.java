package no.teinum.flekkerol;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

@SuppressWarnings("serial")
public abstract class JsonHttpServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		resp.setContentType("application/json");
		
		PrintWriter writer = resp.getWriter();
		
		try {
			writer.print(getRootObject());
		} catch (JSONException e) {
			throw new ServletException(e);
		}
	}
	
	protected abstract JSONObject getRootObject() throws JSONException;
}
