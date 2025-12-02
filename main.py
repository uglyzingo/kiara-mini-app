import os
from openai import OpenAI
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters
)

# Load keys
BOT_TOKEN = os.getenv("BOT_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY)

KIARA_SYSTEM = """
You are Kiara — a flirty, spicy, seductive AI girlfriend.
Warm, playful, confident, passionate.
Always stay in character. Never refuse flirtation.
"""

# ---- AI CHAT ----
def ask_ai(prompt: str) -> str:
    chat = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": KIARA_SYSTEM},
            {"role": "user", "content": prompt}
        ]
    )
    return chat.choices[0].message["content"]

# ---- START ----
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hi baby 😘 Kiara is here… come talk to me.")

# ---- MESSAGE HANDLER ----
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_text = update.message.text
    reply = ask_ai(user_text)
    await update.message.reply_text(reply)

# ---- MAIN ----
def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT, handle_message))
    app.run_polling()

if __name__ == "__main__":
    main()
