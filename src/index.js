const clock = document.getElementById("clock");
const formatter = new Intl.DateTimeFormat();

setInterval(() => {
	clock.textContent = formatter.format(new Date());
}, 500);
