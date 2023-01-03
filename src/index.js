// Clock
const clock = document.getElementById("clock");
const formatter = new Intl.DateTimeFormat(undefined, {
	timeStyle: "medium",
});

setInterval(() => {
	clock.textContent = formatter.format(new Date());
}, 100);

// Cast
function loadScript(url) {
	const script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}
function loadScriptContent(content) {
	const script = document.createElement("script");
	script.innerText = content;
	document.body.appendChild(script);
}

// Check if we are on a Chromecast
if (navigator.userAgent.includes("CrKey")) {
	loadScript("//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js");
	loadScriptContent("cast.framework.CastReceiverContext.getInstance().start();");
} else {
	window["__onGCastApiAvailable"] = (isAvailable) => {
		console.log("__onGCastApiAvailable");
		if (isAvailable) {
			console.log("isAvailable");
			cast.framework.CastContext.getInstance().setOptions({
				receiverApplicationId: "F65B2EC2",
				autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
			});
		}
	};
	loadScript("//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1");
}
