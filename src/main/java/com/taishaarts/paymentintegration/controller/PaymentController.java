package com.taishaarts.paymentintegration.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Controller
public class PaymentController {

	@GetMapping("/")
	public String showHome() {
		return "home";
	}
	
	@PostMapping("/createorder")
	@ResponseBody
	public String paymentstart(@RequestBody Map<String,Object>data) throws Exception {
		System.out.println("started");
		double amt=Double.parseDouble(data.get("amount").toString());
		RazorpayClient client=new RazorpayClient("rzp_test_dWqHy8uMf2EYWA", "v0CsXbbyBmXq6k0M3EUiGXR0");
		JSONObject ob=new JSONObject();
		ob.put("amount", amt*100);
		ob.put("currency", "INR");
		ob.put("receipt", "TA_14523");
		Order order=client.Orders.create(ob);
		return order.toString();
	}
	
	@GetMapping("/responseorder")
	public String Responseorder() {
		return "report";
	}
	
}
