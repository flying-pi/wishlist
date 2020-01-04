@api_view(['GET'])
@csrf_exempt
@permission_classes([AllowAny])
def tile_list(request):

    tilelist = MBTiles.objects.all().values()

    return  Response({'list': tilelist}, status=HTTP_200_OK)
