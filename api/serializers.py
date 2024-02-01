from rest_framework import serializers

from .models import Product, Inventory, Inbound, Outbound

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class InboundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inbound
        fields = '__all__'

class OutboundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outbound
        fields = '__all__'

         