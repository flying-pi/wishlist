from smtplib import SMTPException
from uuid import uuid4

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.urls import reverse

from wishlist_backend.celery_app import app
from wishlist_backend.models import VerificationToken


User = get_user_model()


@app.task(autoretry_for=(SMTPException,))
def send_confirmation_mail(user_id):
    user = User.objects.get(pk=user_id)
    token_info = VerificationToken.objects.create(
        user=user,
        token=uuid4().hex,
        is_valid=True
    )
    confirmation_url = f'{settings.FRONT_URL}{reverse("email_confirmation", kwargs={"token":token_info.token})}'
    send_mail(
        'Confirmation email',
        f'Hello, welcome to WL, your wishlist, to finish registration please follow by link {confirmation_url}',
        settings.EMAIL_ADMIN_MAIL,
        [user.email],
        fail_silently=False,
    )
