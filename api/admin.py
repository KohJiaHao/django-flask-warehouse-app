from django.contrib import admin

from .models import *

# Register your models here.

admin.site.register(Product)
admin.site.register(Inventory)
admin.site.register(Product_Category)
admin.site.register(Inbound)
admin.site.register(Outbound)