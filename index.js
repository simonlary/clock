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

function initClock() {
    const svg = document.querySelector("svg");
    const text = document.querySelector("text");
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeStyle: "medium",
        hourCycle: "h23",
    });

    function updateTime() {
        text.textContent = formatter.format(new Date());
        svg.setAttribute("viewBox", `0 -12 ${Math.ceil(text.getBBox().width)} 13`);
        requestAnimationFrame(updateTime);
    }
    updateTime();
}

async function initReceiver() {
    await loadScript("//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js");
    const options = new cast.framework.CastReceiverOptions();
    options.disableIdleTimeout = true;
    cast.framework.CastReceiverContext.getInstance().start(options);
}

async function initSender() {
    window["__onGCastApiAvailable"] = (isAvailable) => {
        if (isAvailable) {
            cast.framework.CastContext.getInstance().setOptions({
                receiverApplicationId: "F65B2EC2",
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
            });
            document.body.appendChild(document.createElement("google-cast-launcher"));
        }
    };
    await loadScript("//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1");
}

initClock();
if (navigator.userAgent.includes("CrKey")) {
    initReceiver();
} else {
    initSender();
}
