import requests
from flask import Flask, render_template, request, jsonify

from config import TELEGRAM_CHAT_ID, TELEGRAM_API_URL


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/services")
def services():
    return render_template("services.html")


@app.route("/team")
def team():
    return render_template("team.html")


@app.route("/prices")
def prices():
    return render_template("prices.html")


@app.route("/profilaktyka")
def profilaktyka():
    return render_template("profilaktyka.html")


@app.route("/treatment")
def treatment():
    return render_template("treatment.html")


@app.route("/endodontics")
def endodontics():
    return render_template("endodontics.html")


@app.route("/surgery")
def surgery():
    return render_template("surgery.html")


@app.route("/orthopedics")
def orthopedics():
    return render_template("orthopedics.html")


@app.route("/orthopedics-main")
def orthopedics_main():
    return render_template("orthodontics_main.html")


@app.route("/orthodontics")
def orthodontics():
    return render_template("orthodontics.html")


@app.route("/therapeutic")
def therapeutic():
    return render_template("therapeutic.html")


@app.route("/implant")
def implant():
    return render_template("implantation.html")


@app.route("/api/appointment", methods=["POST"])
def api_appointment():
    name = request.form.get("name", "").strip()
    phone = request.form.get("phone", "").strip()
    message = request.form.get("message", "").strip()

    if not name or not phone:
        return jsonify({"ok": False, "error": "Missing required fields"}), 400

    text = f"Нова заявка із сайту:\nІм'я: {name}\nТелефон: {phone}\nПовідомлення: {message or '-'}"
    payload = {"chat_id": TELEGRAM_CHAT_ID, "text": text, "parse_mode": "HTML"}
    resp = requests.post(TELEGRAM_API_URL, data=payload, timeout=10)

    if resp.status_code != 200:
        return (
            jsonify({"ok": False, "error": "Telegram API error", "details": resp.text}),
            502,
        )

    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
