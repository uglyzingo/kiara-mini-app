// Telegram WebApp integration
const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

if (tg) {
  tg.expand(); // expands to full height
  tg.ready();  // lets Telegram know the app is ready
}

// Function to send an action back to your bot
function sendAction(action) {
  if (!tg) {
    console.log("Action:", action);
    alert("Telegram WebApp works only inside Telegram. Action: " + action);
    return;
  }

  tg.sendData(JSON.stringify({
    type: "kiara_action",
    action: action
  }));
}

// MAIN UI EVENT HANDLERS
document.addEventListener("DOMContentLoaded", () => {

  // Follow button
  const followBtn = document.getElementById("followBtn");
  followBtn.addEventListener("click", () => {
    sendAction("follow");
  });

  // Chat button
  const chatBtn = document.getElementById("chatBtn");
  chatBtn.addEventListener("click", () => {
    sendAction("chat");
    if (tg) tg.close(); // return to Telegram chat
  });

  // Quick buttons
  const quickButtons = document.querySelectorAll(".quick-btn");
  quickButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      sendAction(action);
    });
  });

});
