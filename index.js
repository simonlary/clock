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
    const options = new cast.framework.CastReceiverOptions();
    options.disableIdleTimeout = true;
    cast.framework.CastReceiverContext.getInstance().start(options);
}

async function initSender() {
    window["__onGCastApiAvailable"] = (isAvailable) => {
        if (isAvailable) {
            // Setup the options
            cast.framework.CastContext.getInstance().setOptions({
                receiverApplicationId: "F65B2EC2",
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
            });

            // Add the cast button
            document.body.appendChild(document.createElement("google-cast-launcher"));

            // Send a regular ping when connected so the app doesn't disconnect
            // let interval = null;
            // let requestId = 0;
            // cast.framework.CastContext.getInstance().addEventListener(
            //     cast.framework.CastContextEventType.SESSION_STATE_CHANGED, // TODO: Also check on start if there is already a session
            //     (event) => {
            //         console.log(event.sessionState);
            //         if (event.sessionState === cast.framework.SessionState.SESSION_STARTED) {
            //             interval = setInterval(() => {
            //                 cast.framework.CastContext.getInstance()
            //                     .getCurrentSession()
            //                     .sendMessage("urn:x-cast:com.google.cast.media", {
            //                         type: "GET_STATUS",
            //                         requestId: requestId++,
            //                     })
            //                     .then(
            //                         () => console.log("ping"),
            //                         (error) => console.error(error)
            //                     );
            //             }, 1000);
            //         } else if (event.sessionState === cast.framework.SessionState.SESSION_ENDING) {
            //             clearInterval(interval);
            //         }
            //     }
            // );
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
