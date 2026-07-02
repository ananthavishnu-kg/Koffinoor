from django.db import models
from django.utils import timezone

# Create your models here.

class Order(models.Model):
    """Model for customer orders"""
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=20)
    customer_address = models.TextField()
    special_instructions = models.TextField(blank=True, null=True)

    payment_method = models.CharField(max_length=20, default='UPI')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, default='pending')

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"


class OrderItem(models.Model):
    """A single dish within an order — supports any number of items."""
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    item_name = models.CharField(max_length=100)
    item_price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.item_name}"

    @property
    def subtotal(self):
        return self.item_price * self.quantity


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