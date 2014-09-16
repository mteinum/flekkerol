package no.teinum.flekkerol;

import org.json.JSONException;
import org.json.JSONObject;

@SuppressWarnings("serial")
public class HelloServlet extends JsonHttpServlet {

	@Override
	protected JSONObject getRootObject() throws JSONException {
		
		JSONObject obj = new JSONObject();
		
		obj.put("message", "RDWHAHB");
		
		return obj;
	}
}
