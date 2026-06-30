from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.http import JsonResponse
from .models import Order, Review
from .forms import OrderForm
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
        form = OrderForm(request.POST)
        if form.is_valid():
            order = form.save()
            messages.success(request, f'Order placed successfully! Order ID: #{order.id}')
            return redirect('orders')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, error)

    return render(request, 'orders.html')