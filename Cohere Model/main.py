import cohere
import pyttsx3

# Initialize Cohere client
co = cohere.Client("6nig59e8Gw37JOwki24qp9bdjnmRtjLmxt4MGpwN")  # Replace with your actual API key

# Initialize text-to-speech engine
tts = pyttsx3.init()
tts.setProperty('rate', 150)
tts.setProperty('volume', 1.0)

# Function to generate reply using co.chat()
def get_cohere_reply(user_input):
    try:
        response = co.chat(
            model='command-r',
            message=user_input,
        )
        return response.text.strip()
    except Exception as e:
        return f"Error: {str(e)}"

# Function to speak
def speak(text):
    print("Bot:", text)


# Function to handle reply
def reply_to_message(user_input):
    bot_reply = get_cohere_reply(user_input)
    speak(bot_reply)

# Start chatbot
print("Chatbot is ready!")
initial_question = "How are you feeling today?"
speak(initial_question)

# First interaction
user_response = input("You: ")
reply_to_message(user_response)

# Continuous chat loop
while True:
    user_msg = input("You: ")
    if user_msg.lower() == 'exit':
        break
    reply_to_message(user_msg)
