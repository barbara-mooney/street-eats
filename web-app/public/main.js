
function sendNewPass() {
	event.preventDefault();
	var url = window.location;
	var model = new URLSearchParams(url.search).get('model');
	var token = new URLSearchParams(url.search).get('access_token');
	var userId = new URLSearchParams(url.search).get('userId');
	var new_pass = document.getElementById('new_pass').value;
	var confirm = document.getElementById('confirm').value;
	console.log('token:', token, '-userId:', userId);
	if(new_pass != '' && confirm != '' && new_pass == confirm){
		console.log(model);
		axios.post(`http://192.168.1.34:3000/api/${model}/reset-password?access_token=${token}&userId=${userId}`, {
			newPassword: new_pass
		}).then((response) => {
			console.log(response);
		}, (error) => {
			console.log(error);
		});
		alert('Your password has been successfully reset. Head back to the app to log in.');
	}
};
