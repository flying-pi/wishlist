from hashlib import md5
from time import time

from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_418_IM_A_TEAPOT)

from wishlist_backend.models import VerificationToken, Wish, UserKey
from wishlist_backend.serializers import WishSerializer
from wishlist_backend.tasks import send_confirmation_mail

User = get_user_model()


def create_auth_response(user):
    token, created = Token.objects.get_or_create(user=user)
    return redirect(f'{settings.FRONT_URL}?token={token}')


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def signup(request: Request) -> Response:
    name = request.data['username']
    username = request.data['email']
    password = request.data['password']
    new_user = User.objects.create(username=username)
    new_user.set_password(password)
    new_user.save()
    authed_user = authenticate(request, username=username, password=password)
    authed_user.is_active = False
    authed_user.first_name = name
    authed_user.email = username
    authed_user.save()
    send_confirmation_mail.apply_async(args=[authed_user.id])
    return Response({}, status=HTTP_200_OK)


@api_view(['GET'])
@csrf_exempt
@permission_classes([AllowAny])
def mail_confirmation(request: Request, token: str) -> Response:
    token_info = VerificationToken.objects.get(token=token)
    if not (token_info and token_info.is_valid):
        return Response({}, status=HTTP_418_IM_A_TEAPOT)
    token_info.is_valid = False
    token_info.save()
    user = token_info.user
    user.is_active = True
    user.save()
    key = UserKey.objects.create(user=user)
    token, created = Token.objects.get_or_create(user=user)
    return redirect(f'{settings.FRONT_URL}?token={token}&key={key.key.hex}')


@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def login(request: Request):
    user = authenticate(request, username=request.data['email'], password=request.data['password'])
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': str(token), 'key': UserKey.objects.get(user=user).key.hex}, HTTP_200_OK)


@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def user_info(request: Request):
    return Response(
        {
            'email': request.user.email,
        },
        HTTP_200_OK
    )


@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def upload_image(request: Request):
    up_file = request.FILES['file']
    filename = f'{settings.MEDIA_ROOT}{str(time())}{md5(up_file.name.encode()).hexdigest()}.{up_file.name.split(".")[-1]}'
    with open(filename, 'wb+') as out:
        for chunk in up_file.chunks():
            out.write(chunk)
    return Response(
        {
            'file': filename,
        },
        HTTP_200_OK
    )


class WishList(generics.ListAPIView):
    serializer_class = WishSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Wish.objects.filter(owner__userkey__key=self.kwargs.get('user_key'))


class WishDetail(generics.UpdateAPIView, generics.DestroyAPIView, generics.CreateAPIView):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# curl -X POST -d '{ "email":"name1", "username":"username", "password":"password" }' -H "Content-Type: application/json"  0.0.0.0:8080/signup/
# curl -X POST -d '{ "email":"name1", "username":"username", "password":"password" }' -H "Content-Type: application/json"  0.0.0.0:8080/login/
# curl -X POST -d '{ "email":"name1", "username":"username", "password":"password" }' -H "Content-Type: application/json"  -H "Authorization: Token f1faec3ba43cb8838e68d325abbe2ca5c89e80f5" 0.0.0.0:8080/user/info/
