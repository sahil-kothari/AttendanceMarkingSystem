import asyncio
import smtplib
from email.mime.text import MIMEText
from datetime import datetime

sender = ""
receiver = ""
password = ""

async def create_message():
    now = datetime.now()
    message_text = "Hello student, your attendance is marked as PRESENT on " + now.strftime("%d/%m/%Y %H:%M:%S")
    return message_text

async def send_email(message_text):
    message = MIMEText(message_text)
    message['From'] = sender
    message['To'] = receiver
    message['Subject'] = "Attendance Marked"

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        
        server.sendmail(sender, receiver, message.as_string())
        print("Email sent successfully")
        
    except Exception as e:
        print("An error occurred:", e)
        
    finally:
        server.quit()

async def main():
    # Create message asynchronously
    message_text = await create_message()
    print("Message:", message_text)
    
    # Send email asynchronously
    await send_email(message_text)

# Run the asyncio event loop
asyncio.run(main())