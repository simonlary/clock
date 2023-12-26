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
    const formatter = new Intl.DateTimeFormat(undefined, {
        timeStyle: "medium",
    });

    text.textContent = formatter.format(new Date());
    setInterval(() => {
        text.textContent = formatter.format(new Date());
        svg.setAttribute("viewBox", `0 -12 ${Math.ceil(text.getBBox().width)} 13`);
    }, 100);
}

async function initReceiver() {
    await loadScript("//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js");
    cast.framework.CastReceiverContext.getInstance().start();
}

async function initSender() {
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

initClock();
if (navigator.userAgent.includes("CrKey")) {
    initReceiver();
} else {
    initSender();
}
