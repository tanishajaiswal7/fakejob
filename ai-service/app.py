import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle

# Load environment variables
load_dotenv()

# Initialize app
app = Flask(__name__)
CORS(app)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
MODEL_PATH = 'models/fraud_model.pkl'
VECTORIZER_PATH = 'models/tfidf_vectorizer.pkl'
THRESHOLD = float(os.getenv("FRAUD_THRESHOLD", 0.5))

# Global model variables
model = None
vectorizer = None


def load_or_train_model():
    """Load model from disk or train a new one"""
    global model, vectorizer

    try:
        if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
            with open(VECTORIZER_PATH, 'rb') as f:
                vectorizer = pickle.load(f)

            logger.info("✅ Model loaded from disk")
            return

        logger.warning("⚠️ Model not found. Training new model...")
        train_model()

    except Exception as e:
        logger.error(f"❌ Error loading model: {e}")
        train_model()


def train_model():
    """Train a new Logistic Regression model"""
    global model, vectorizer

    training_texts = [
        # Fraud
        "Work from home, make $5000 per week guaranteed. No experience needed.",
        "Limited time offer! Register now for exclusive training. $99 fee required.",
        "Easy money! Bitcoin investment opportunity. Double your money in 30 days.",
        "Urgent hiring! Need 100 workers immediately. Send $200 registration fee.",
        "Become an independent distributor! Earn while you sleep. Investment required.",
        "Get certified and guaranteed job placement. Only $500 training fee!",
        "Work at home data entry. $50 per hour. No experience necessary.",
        "Paid to take surveys online. Make thousands monthly from your couch.",
        "MLM opportunity: Sell products and recruit others. Build passive income!",
        "Western Union payment required. International job opportunity.",

        # Legit
        "Senior Software Engineer. 5+ years experience required. Competitive salary.",
        "Marketing Manager position. Lead a team of 5. Based in office.",
        "Financial Analyst. Bachelor's degree required. Full benefits.",
        "UX Designer. Portfolio required. Remote work available.",
        "Project Manager. PMP certification preferred.",
        "Data Scientist. Machine learning experience required.",
        "Customer Service Representative. Full-time position.",
        "Software Developer. React experience required.",
        "Sales Executive. Base salary plus commission.",
        "HR Specialist. Benefits included."
    ]

    training_labels = [1]*10 + [0]*10

    vectorizer = TfidfVectorizer(max_features=200, lowercase=True, stop_words='english')
    X = vectorizer.fit_transform(training_texts)

    model = LogisticRegression(max_iter=300, random_state=42)
    model.fit(X, training_labels)

    os.makedirs('models', exist_ok=True)

    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)

    with open(VECTORIZER_PATH, 'wb') as f:
        pickle.dump(vectorizer, f)

    logger.info("✅ Model trained and saved")


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'model_loaded': model is not None
    })


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        if not data or 'job_description' not in data:
            return jsonify({
                'success': False,
                'error': 'job_description is required'
            }), 400

        job_description = data['job_description'].strip()

        if not job_description:
            return jsonify({
                'success': False,
                'error': 'job_description cannot be empty'
            }), 400

        if model is None or vectorizer is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded'
            }), 500

        X = vectorizer.transform([job_description])
        probabilities = model.predict_proba(X)[0]

        fraud_probability = float(probabilities[1])
        confidence = float(max(probabilities))

        prediction = 'fraud' if fraud_probability > THRESHOLD else 'legitimate'

        return jsonify({
            'success': True,
            'prediction': prediction,
            'fraud_probability': fraud_probability,
            'confidence': confidence,
            'threshold_used': THRESHOLD
        })

    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({
            'success': False,
            'error': 'Prediction failed'
        }), 500


@app.route('/stats', methods=['GET'])
def stats():
    if model is None or vectorizer is None:
        return jsonify({'error': 'Model not loaded'}), 500

    return jsonify({
        'model_type': 'LogisticRegression',
        'features': len(vectorizer.get_feature_names_out()),
        'training_samples': 20
    })


@app.errorhandler(404)
def not_found(_):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(_):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    logger.info("🚀 Starting AI Service...")
    load_or_train_model()

    port = int(os.getenv('AI_PORT', 5001))
    debug_mode = os.getenv('DEBUG', 'True') == 'True'

    app.run(debug=debug_mode, port=port, host='0.0.0.0')
