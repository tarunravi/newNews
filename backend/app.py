from flask import Flask, redirect, render_template, request, url_for, Response, request, jsonify
from flask_cors import CORS, cross_origin
import os
import openai

app = Flask(__name__)
cors = CORS(app)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    print("hello")
    if request.method == "POST":
        article = request.form["article"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(article),
            temperature=0.7,
  max_tokens=1000,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0

        )
        print(response.choices)
        return ' '.join([i.text for i in response.choices])
    return "bruh"


def generate_prompt(article):
    return """Provide a one sentence title for this article and after that summarize this article in 5-10 bullet points: {}""".format(
        article
    )
