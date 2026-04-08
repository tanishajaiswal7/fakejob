import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

# Global model variables
model = None
vectorizer = None
MODEL_PATH = 'models/fraud_model.pkl'
VECTORIZER_PATH = 'models/tfidf_vectorizer.pkl'

def load_or_train_model():
    """Load model from disk or train a new one"""
    global model, vectorizer
    
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        try:
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
            with open(VECTORIZER_PATH, 'rb') as f:
                vectorizer = pickle.load(f)
            print("✅ Model loaded from disk")
            return
        except Exception as e:
            print(f"⚠️  Error loading model: {e}, training new model")
    
    # Train model with sample data
    train_model()

def train_model():
    """Train a new Logistic Regression model"""
    global model, vectorizer
    
    # Training data - job descriptions with labels
    # 1 = fraud/fake, 0 = legitimate
    training_texts = [
        # Fraud examples
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
        
        # Legitimate examples
        "Senior Software Engineer. 5+ years experience required. Competitive salary. Submit resume.",
        "Marketing Manager position. Lead a team of 5. Based in New York office.",
        "Financial Analyst. Bachelor's degree in Finance or related field. Full benefits.",
        "UX Designer. Portfolio required. Remote work available. Salary $80,000-$120,000.",
        "Project Manager. PMP certification preferred. Work with Fortune 500 companies.",
        "Data Scientist. Machine learning experience required. Competitive compensation.",
        "Customer Service Representative. High school diploma minimum. Full-time position.",
        "Software Developer. JavaScript, React experience. Remote position available.",
        "Sales Executive. 3 years sales experience. Base salary plus commission.",
        "HR Specialist. SHRM certification preferred. Benefits include health insurance."
    ]
    
    training_labels = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  # Fraud (1)
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0   # Legitimate (0)
    ]
    
    # Create vectorizer and transform texts
    vectorizer = TfidfVectorizer(max_features=100, lowercase=True, stop_words='english')
    X = vectorizer.fit_transform(training_texts)
    
    # Train Logistic Regression model
    model = LogisticRegression(max_iter=200, random_state=42)
    model.fit(X, training_labels)
    
    # Create models directory if it doesn't exist
    os.makedirs('models', exist_ok=True)
    
    # Save model
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
    with open(VECTORIZER_PATH, 'wb') as f:
        pickle.dump(vectorizer, f)
    
    print("✅ Model trained and saved")

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Predict if a job description is fraudulent"""
    try:
        data = request.get_json()
        job_description = data.get('job_description', '')
        
        if not job_description:
            return jsonify({
                'success': False,
                'error': 'job_description is required'
            }), 400
        
        if not model or not vectorizer:
            return jsonify({
                'success': False,
                'error': 'Model not loaded'
            }), 500
        
        # Transform text using vectorizer
        X = vectorizer.transform([job_description])
        
        # Get prediction probability
        probability = model.predict_proba(X)[0]
        fraud_probability = float(probability[1])  # Probability of being fraud (class 1)
        
        # Get confidence
        confidence = float(max(probability))
        
        return jsonify({
            'success': True,
            'fraud_probability': fraud_probability,
            'confidence': confidence,
            'prediction': 'fraud' if fraud_probability > 0.5 else 'legitimate'
        })
    
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/stats', methods=['GET'])
def stats():
    """Get model statistics"""
    if not model:
        return jsonify({'error': 'Model not loaded'}), 500
    
    return jsonify({
        'model_type': 'LogisticRegression',
        'features': len(vectorizer.get_feature_names_out()) if vectorizer else 0,
        'training_samples': 20
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚀 Starting AI Service...")
    load_or_train_model()
    port = int(os.getenv('AI_PORT', 5001))
    app.run(debug=True, port=port, host='0.0.0.0')
