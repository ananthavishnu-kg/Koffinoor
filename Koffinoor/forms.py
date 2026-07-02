import re
import json
from django import forms
from .models import Order


class OrderForm(forms.ModelForm):
    """Validated form for placing a customer order."""

    cart_data = forms.CharField(widget=forms.HiddenInput(), required=True)

    class Meta:
        model = Order
        fields = [
            'customer_name', 'customer_phone', 'customer_address',
            'special_instructions', 'payment_method', 'total_amount',
        ]
        widgets = {
            'customer_address': forms.Textarea(attrs={'rows': 3}),
            'special_instructions': forms.Textarea(attrs={'rows': 2}),
        }

    def clean_customer_name(self):
        name = self.cleaned_data['customer_name'].strip()
        if len(name) < 2:
            raise forms.ValidationError("Please enter a valid name.")
        return name

    def clean_customer_phone(self):
        phone = self.cleaned_data['customer_phone'].strip()
        digits_only = re.sub(r'\D', '', phone)
        if len(digits_only) < 10:
            raise forms.ValidationError("Please enter a valid phone number (at least 10 digits).")
        return phone

    def clean_customer_address(self):
        address = self.cleaned_data['customer_address'].strip()
        if len(address) < 10:
            raise forms.ValidationError("Please enter a complete delivery address.")
        return address

    def clean_total_amount(self):
        amount = self.cleaned_data['total_amount']
        if amount <= 0:
            raise forms.ValidationError("Order total must be greater than zero.")
        return amount

    def clean_cart_data(self):
        raw = self.cleaned_data['cart_data']
        try:
            items = json.loads(raw)
        except (ValueError, TypeError):
            raise forms.ValidationError("Invalid cart data. Please add items from the menu.")

        if not items or not isinstance(items, list):
            raise forms.ValidationError("Your cart is empty. Please add at least one item.")

        for item in items:
            if not all(k in item for k in ('name', 'price', 'qty')):
                raise forms.ValidationError("Invalid item data in cart.")
            try:
                price = float(item['price'])
                qty = int(item['qty'])
            except (ValueError, TypeError):
                raise forms.ValidationError("Invalid price or quantity in cart.")
            if price <= 0 or qty <= 0:
                raise forms.ValidationError("Cart items must have valid price and quantity.")

        return items