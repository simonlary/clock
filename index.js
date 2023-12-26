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
    const clock = document.querySelector("text");
    const formatter = new Intl.DateTimeFormat(undefined, {
        timeStyle: "medium",
    });

    setInterval(() => {
        clock.textContent = formatter.format(new Date());
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
