from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.http import JsonResponse
from .models import Order, Review
import json

def index(request):
    """Home page view"""
    featured_reviews = Review.objects.filter(is_featured=True)[:3]
    context = {
        'featured_reviews': featured_reviews
    }
    return render(request, 'index.html', context)

def menu(request):
    """Menu page view"""
    return render(request, 'menu.html')

def about(request):
    """About page view"""
    return render(request, 'about.html')

def blogs(request):
    """Blogs/Reviews page view"""
    featured_reviews = Review.objects.filter(is_featured=True)[:2]
    all_reviews = Review.objects.all()[:12]  # Limit to 12 reviews for better performance
    
    context = {
        'featured_reviews': featured_reviews,
        'all_reviews': all_reviews
    }
    return render(request, 'blogs.html', context)

def orders(request):
    """Orders page view"""
    if request.method == 'POST':
        try:
            # Extract form data
            order_data = {
                'customer_name': request.POST.get('customer_name'),
                'customer_phone': request.POST.get('customer_phone'),
                'customer_address': request.POST.get('customer_address'),
                'special_instructions': request.POST.get('special_instructions', ''),
                'coffee_item': request.POST.get('coffee_item', ''),
                'coffee_qty': int(request.POST.get('coffee_qty', 0)),
                'tea_item': request.POST.get('tea_item', ''),
                'tea_qty': int(request.POST.get('tea_qty', 0)),
                'shake_item': request.POST.get('shake_item', ''),
                'shake_qty': int(request.POST.get('shake_qty', 0)),
                'snack_item': request.POST.get('snack_item', ''),
                'snack_qty': int(request.POST.get('snack_qty', 0)),
                'payment_method': request.POST.get('payment_method', 'UPI'),
                'total_amount': float(request.POST.get('total_amount', 0))
            }
            
            # Create order
            order = Order.objects.create(**order_data)
            
            messages.success(request, f'Order placed successfully! Order ID: #{order.id}')
            return redirect('orders')
            
        except Exception as e:
            messages.error(request, f'Error placing order: {str(e)}')
    
    return render(request, 'orders.html')
