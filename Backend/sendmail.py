import sys
import json
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
import asyncio

sender=""
password=""
n = len(sys.argv)
emailListString=sys.argv[1]
emailList=json.loads(emailListString)
# emailList=None

# try:
    
#     emailList=json.loads(emailListString)
# except Exception as e:
#     print('The error occured is : ',e)

async def create_message():
    now = datetime.now()
    message_text = "Hello student, your attendance is marked as PRESENT on " + now.strftime("%d/%m/%Y %H:%M:%S")
    return message_text

async def send_email(message_text,receiver):
    message = MIMEText(message_text)
    message['From'] = sender
    message['To'] = receiver
    message['Subject'] = "Attendance Marked"
    print('Reciever is: ',receiver)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.sendmail(sender, receiver, message.as_string())
        # print("Email sent successfully")
        
    except Exception as e:
        print("An error occurred:", e)
        
        
    finally:
        server.quit()

async def main():
    # Create message asynchronously
    if n<1:
        print(0)
    else:
        for i in emailList:

            message_text = await create_message()
            # print("Message:", message_text)
    
            # Send email asynchronously
            await send_email(message_text,i)
        print('1')


# Run the asyncio event loop
asyncio.run(main())