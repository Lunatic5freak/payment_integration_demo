const initiate_payment=()=>{
	let amount=$("#amount").val();
	console.log("payment started");
	$.ajax(
		{
			url:'/createorder',
			data:JSON.stringify({amount:amount}),
			contentType:'application/json',
			type:'post',
			dataType:'json',
			success:function(response){
				console.log(response);
				if(response.status=="created"){
					var options={
						"key":"rzp_test_dWqHy8uMf2EYWA",
						"amount":response.amount,
						"currency":"INR",
						"name":"GRIP",
						"description":"Payble amount",
						"image":"https://www.google.com/search?q=image&sxsrf=ALeKk03ecBZSI1LJMibsxK-tizRmU6tG7Q:1612021890502&tbm=isch&source=iu&ictx=1&fir=gOUAFhrbQ2nYQM%252COXvyXJop1qSGqM%252C_&vet=1&usg=AI4_-kRLbWkqdRB29HRE3S76BoeuW4jnMQ&sa=X&ved=2ahUKEwiz15zBgcTuAhVMVH0KHZ3jCeAQ9QF6BAgsEAE#imgrc=gOUAFhrbQ2nYQM",
						"order_id":response.id,
						"handler":function(response){
								console.log(response.razorpay_payment_id)
								console.log(response.razorpay_order_id);
								console.log(response.razorpay_signature);
								window.location='https://grippaymentapp.herokuapp.com/responseorder'
								// $.ajax({url:"/responseorder",
								// 	type:'get'
								// })
								// alert("payment sucessfull")
						},
						"theme":"#3399cc"
					};
					//let rzp=new Razorpay(options);
					 var rzp1 = new Razorpay(options);
					rzp1.on('payment.failed', function (response){
        				alert(response.error.code);
        				alert(response.error.description);
       					alert(response.error.source);
        				alert(response.error.step);
        				alert(response.error.reason);
        				alert(response.error.metadata.order_id);
        				alert(response.error.metadata.payment_id);
					});
					rzp1.open();
				}
			},
			error:function(error){
				alert("something went wrong");
				console.log(error);
			}
		}
	)
}
