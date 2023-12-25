(async function () {
    // Clock
    const clock = document.getElementById("clock");
    const formatter = new Intl.DateTimeFormat(undefined, {
        timeStyle: "medium",
    });

    setInterval(() => {
        clock.textContent = formatter.format(new Date());
    }, 100);

    // Cast
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            try {
                const tag = document.createElement("script");
                tag.async = true;
                tag.src = src;
                tag.addEventListener("load", () => resolve());
                tag.addEventListener("error", () => reject());
                document.head.appendChild(tag);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Check if we are on a Chromecast
    if (navigator.userAgent.includes("CrKey")) {
        await loadScript("//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js");
        cast.framework.CastReceiverContext.getInstance().start();
    } else {
        window["__onGCastApiAvailable"] = (isAvailable) => {
            if (isAvailable) {
                cast.framework.CastContext.getInstance().setOptions({
                    receiverApplicationId: "F65B2EC2",
                    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
                });
            }
        };
        await loadScript("//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1");
    }
})();
