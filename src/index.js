const clock = document.getElementById("clock");
const formatter = new Intl.DateTimeFormat(undefined, {
	timeStyle: "medium",
});

setInterval(() => {
	clock.textContent = formatter.format(new Date());
}, 100);
