from django.db import models
from django.utils import timezone

# Create your models here.

class Order(models.Model):
    """Model for customer orders"""
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=20)
    customer_address = models.TextField()
    special_instructions = models.TextField(blank=True, null=True)
    
    # Menu items
    coffee_item = models.CharField(max_length=50, blank=True, null=True)
    coffee_qty = models.PositiveIntegerField(default=0)
    tea_item = models.CharField(max_length=50, blank=True, null=True)
    tea_qty = models.PositiveIntegerField(default=0)
    shake_item = models.CharField(max_length=50, blank=True, null=True)
    shake_qty = models.PositiveIntegerField(default=0)
    snack_item = models.CharField(max_length=50, blank=True, null=True)
    snack_qty = models.PositiveIntegerField(default=0)
    
    payment_method = models.CharField(max_length=20, default='UPI')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    created_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, default='pending')
    
    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"

class Review(models.Model):
    """Model for customer reviews"""
    name = models.CharField(max_length=100)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    review_text = models.TextField()
    profession = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    is_featured = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Review by {self.name} - {self.rating} stars"
    
    class Meta:
        ordering = ['-created_at']