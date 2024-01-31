from django.db import models

# Create your models here.
TRANSPORT_STATUSES = [("Pending", "Pending"), ("Completed", "Completed")]

class Product(models.Model):
    sku = models.CharField(max_length=8, default = "", primary_key = True)
    name = models.CharField(max_length=50)

class Inventory(models.Model):
    prod_sku = models.ForeignKey(Product, on_delete=models.PROTECT)
    location = models.CharField(max_length=50)
    qty = models.IntegerField(null=False)


class Product_Category(models.Model):
    prod_sku = models.ForeignKey(Product, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)

class Inbound(models.Model):
    reference = models.CharField(max_length=50, primary_key=True)
    date_received = models.DateField()
    prod_sku = models.ForeignKey(Product, on_delete=models.PROTECT)
    qty = models.IntegerField(null=False)
    supplier = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    remarks = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=TRANSPORT_STATUSES, default='Pending')

class Outbound(models.Model):
    reference = models.CharField(max_length=50, primary_key=True)
    date_shipped = models.DateField()
    prod_sku = models.ForeignKey(Product, on_delete=models.PROTECT)
    qty = models.IntegerField(null=False)
    location = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)
    remarks = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=TRANSPORT_STATUSES, default='Pending')