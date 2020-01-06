from django.contrib import admin

from wishlist_backend.models import VerificationToken, Wish, UserKey

admin.site.register(VerificationToken)
admin.site.register(Wish)
admin.site.register(UserKey)
