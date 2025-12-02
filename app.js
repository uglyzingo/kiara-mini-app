// Initialize Telegram WebApp
let tg = null;

document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
    } else {
        console.error("Telegram WebApp not detected");
    }

    // CHAT BUTTON (works already)
    const chatBtn = document.getElementById("chatBtn");
    if (chatBtn) {
        chatBtn.addEventListener("click", () => {
            sendAction("chat");
            if (tg) tg.close();
        });
    }

    // FOLLOW BUTTON
    const followBtn = document.getElementById("followBtn");
    if (followBtn) {
        followBtn.addEventListener("click", () => {
            sendAction("follow");
        });
    }

    // QUICK ACTION BUTTONS
    const quickButtons = document.querySelectorAll(".quick-btn");
    quickButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.action;
            console.log("BUTTON CLICKED:", action); // debug
            sendAction(action);
        });
    });
});


// FUNCTION: SEND ACTION TO TELEGRAM BOT
function sendAction(action) {
    if (!tg) {
        console.error("Telegram WebApp not initialized.");
        alert("Error: Mini App not inside Telegram.");
        return;
    }

    console.log("Sending data to bot:", action);

    tg.sendData(
        JSON.stringify({
            type: "kiara_action",
            action: action
        })
    );
}
