from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework import status
from .models import Product, Inventory, Inbound, Outbound
from .serializers import ProductSerializer, InventorySerializer, InboundSerializer, OutboundSerializer
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def main(request):
    return HttpResponse("This is the root URL for Django API")

@permission_classes([AllowAny])
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)
        print(request)
        print(user)
        if user is not None:
            auth_login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
def logout(request):
    auth_logout(request)
    return JsonResponse({'message': 'Logout successful'})


class ProductView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer 

class InventoryList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):

        if not self.request.user.has_perm('api.view_inventory'):
            # Return a response indicating permission denied
            return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        
        snippets = Inventory.objects.all()
        serializer = InventorySerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # data = JSONParser().parse(request)
        serializer = InventorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InboundView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
    # queryset = Inbound.objects.all()
    serializer_class = InboundSerializer 

    def get_queryset(self):
        queryset = Inbound.objects.all()
        query_params = self.request.query_params

        # Apply filters based on the query parameters
        for param, value in query_params.items():
            if param in ['status']:
                filter_kwargs = {param: value}
                print(filter_kwargs)
                queryset = queryset.filter(**filter_kwargs)

        return queryset

class OutboundView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
    queryset = Outbound.objects.all()
    serializer_class = OutboundSerializer
