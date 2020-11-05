import smtplib
from django.core.wsgi import *
#from config.wsgi import *
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.template.loader import render_to_string
#from django.contrib.auth.models import User
from django.conf import settings
settings.configure()

def send_email():
    try:
        # Establecemos conexion con el servidor smtp de gmail
        mailServer = smtplib.SMTP(settings.EMAIL_HOST,settings.EMAIL_PORT)
        print(mailServer.ehlo())
        mailServer.starttls()
        print(mailServer.ehlo())
        mailServer.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        print('Conectando ....')

        # Construimos el mensaje simple
        email_to = "jona.castro.millananco@gmail.com"

        mensaje = MIMEMultipart()
        mensaje['From']= settings.EMAIL_HOST_USER
        mensaje['To']= email_to
        mensaje['Subject']="Bienvenido a solotodo"

        content = render_to_string('bienvenida_email.html')
        # Adjuntamos el texto
        mensaje.attach(MIMEText(content, 'html'))

        # Envio del mensaje
        mailServer.sendmail("jona.castro.millananco@gmail.com",
                            email_to,
                            mensaje.as_string())
        print('Correo enviado :D')
    except Exception as e:
        print(e)

send_email()
