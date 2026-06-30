import re
from django import forms
from .models import Order


class OrderForm(forms.ModelForm):
    """Validated form for placing a customer order."""

    class Meta:
        model = Order
        fields = [
            'customer_name', 'customer_phone', 'customer_address',
            'special_instructions',
            'coffee_item', 'coffee_qty',
            'tea_item', 'tea_qty',
            'shake_item', 'shake_qty',
            'snack_item', 'snack_qty',
            'payment_method', 'total_amount',
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

    def clean(self):
        cleaned_data = super().clean()
        coffee_qty = cleaned_data.get('coffee_qty', 0)
        tea_qty = cleaned_data.get('tea_qty', 0)
        shake_qty = cleaned_data.get('shake_qty', 0)
        snack_qty = cleaned_data.get('snack_qty', 0)

        if coffee_qty + tea_qty + shake_qty + snack_qty == 0:
            raise forms.ValidationError("Please select at least one item to order.")

        return cleaned_data


