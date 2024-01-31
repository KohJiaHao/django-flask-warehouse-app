from django.db import models

# Create your models here.
class Product(models.Model):
    id = models.CharField(max_length=50, primary_key = True)
    sku = models.CharField(max_length=8, default = "", unique=True)
    name = models.CharField(max_length=50)