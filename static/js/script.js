/**
 * Koffinoor Cafe - Main JavaScript File
 * Handles all interactive functionality for the website
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Koffinoor Cafe JavaScript Loaded!');
    
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeFlashMessages();
    initializeOrderForm();
    initializeMobileMenu();
    initializeScrollEffects();
});

/**
 * Navigation functionality
 */
function initializeNavigation() {
    // Highlight active navigation links
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href.includes('index'))) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    
    if (mobileToggle && navRight) {
        mobileToggle.addEventListener('click', function() {
            navRight.classList.toggle('mobile-active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navRight.classList.remove('mobile-active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
}

/**
 * Scroll effects and animations
 */
function initializeScrollEffects() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Fade-in animations using Intersection Observer
 */
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Flash message functionality
 */
function initializeFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        const closeButton = message.querySelector('.flash-close');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideFlashMessage(message);
        }, 5000);
        
        // Close button functionality
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                hideFlashMessage(message);
            });
        }
    });
}

/**
 * Hide flash message with animation
 */
function hideFlashMessage(message) {
    message.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 300);
}

 /**
 * Order form functionality with multiple item support
 */
function initializeOrderForm() {
    const orderForm = document.getElementById('orderForm');
    console.log('Order form element:', orderForm);
    if (!orderForm) {
        console.error('Order form not found!');
        return;
    }
    
    // Store all selected items
    window.orderItems = {
        coffee: [],
        tea: [],
        shake: [],
        snack: []
    };
    
    console.log('Order items initialized:', window.orderItems);
    
    // Initialize add item buttons
    const addButtons = document.querySelectorAll('.btn-add-item');
    console.log('Found add buttons:', addButtons.length);
    
    addButtons.forEach(button => {
        console.log('Setting up button for category:', button.dataset.category);
        button.addEventListener('click', function() {
            console.log('Button clicked for category:', this.dataset.category);
            const category = this.dataset.category;
            addItemToCategory(category);
        });
    });
    
    function addItemToCategory(category) {
        console.log('addItemToCategory called with:', category);
        
        const selectionDiv = document.getElementById(`${category}-selection`);
        const select = selectionDiv.querySelector('.item-select');
        const qtyInput = selectionDiv.querySelector('.qty-input');
        
        console.log('Selection div:', selectionDiv);
        console.log('Select element:', select);
        console.log('Qty input:', qtyInput);
        
        const selectedOption = select.options[select.selectedIndex];
        const quantity = parseInt(qtyInput.value) || 1;
        
        console.log('Selected option:', selectedOption);
        console.log('Selected value:', selectedOption.value);
        
        if (!selectedOption.value) {
            alert(`Please select a ${category} item first`);
            return;
        }
        
        const itemData = {
            id: selectedOption.value,
            name: selectedOption.text.split(' — ')[0],
            price: parseInt(selectedOption.dataset.price),
            quantity: quantity,
            subtotal: parseInt(selectedOption.dataset.price) * quantity
        };
        
        console.log('Item data created:', itemData);
        
        // Check if item already exists, if so, update quantity
        const existingIndex = window.orderItems[category].findIndex(item => item.id === itemData.id);
        if (existingIndex !== -1) {
            window.orderItems[category][existingIndex].quantity += quantity;
            window.orderItems[category][existingIndex].subtotal = 
                window.orderItems[category][existingIndex].price * window.orderItems[category][existingIndex].quantity;
        } else {
            window.orderItems[category].push(itemData);
        }
        
        console.log('Updated order items:', window.orderItems);
        
        // Reset form
        select.selectedIndex = 0;
        qtyInput.value = 1;
        
        // Update display
        updateCategoryDisplay(category);
        updateOrderSummary();
    }
    
    function updateCategoryDisplay(category) {
        const addedItemsDiv = document.getElementById(`${category}-added-items`);
        const subtotalSpan = document.getElementById(`${category}_subtotal`);
        
        // Clear current display
        addedItemsDiv.innerHTML = '';
        
        let categoryTotal = 0;
        
        // Display added items
        window.orderItems[category].forEach((item, index) => {
            categoryTotal += item.subtotal;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'added-item';
            itemDiv.innerHTML = `
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-info">₹${item.price} × ${item.quantity} = ₹${item.subtotal}</span>
                </div>
                <div class="item-actions">
                    <button type="button" class="btn-edit-qty" onclick="editItemQuantity('${category}', ${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="btn-remove-item" onclick="removeItem('${category}', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            addedItemsDiv.appendChild(itemDiv);
        });
        
        // Update category total
        subtotalSpan.textContent = `₹${categoryTotal}`;
    }
    
    // Global functions for item management
    window.removeItem = function(category, index) {
        window.orderItems[category].splice(index, 1);
        updateCategoryDisplay(category);
        updateOrderSummary();
    };
    
    window.editItemQuantity = function(category, index) {
        const newQuantity = prompt('Enter new quantity:', window.orderItems[category][index].quantity);
        if (newQuantity && parseInt(newQuantity) > 0) {
            window.orderItems[category][index].quantity = parseInt(newQuantity);
            window.orderItems[category][index].subtotal = 
                window.orderItems[category][index].price * parseInt(newQuantity);
            updateCategoryDisplay(category);
            updateOrderSummary();
        }
    };
    
    function updateOrderSummary() {
        const orderSummary = document.getElementById('orderSummary');
        const subtotalAmount = document.getElementById('subtotalAmount');
        const deliveryFee = document.getElementById('deliveryFee');
        const gstAmount = document.getElementById('gstAmount');
        const totalAmount = document.getElementById('totalAmount');
        const hiddenTotalAmount = document.getElementById('hiddenTotalAmount');
        
        if (!orderSummary) return;
        
        let subtotal = 0;
        let allItems = [];
        
        // Collect all items from all categories
        Object.keys(window.orderItems).forEach(category => {
            window.orderItems[category].forEach(item => {
                subtotal += item.subtotal;
                allItems.push(item);
            });
        });
        
        // Update order summary content
        if (allItems.length === 0) {
            orderSummary.innerHTML = '<p class="empty-order">No items selected</p>';
        } else {
            let summaryHTML = '<div class="order-items">';
            allItems.forEach(item => {
                summaryHTML += `
                    <div class="summary-item">
                        <span class="item-name">${item.name} × ${item.quantity}</span>
                        <span class="item-price">₹${item.subtotal}</span>
                    </div>
                `;
            });
            summaryHTML += '</div>';
            orderSummary.innerHTML = summaryHTML;
        }
        
        // Calculate totals
        const delivery = subtotal >= 500 ? 0 : 30;
        const gst = Math.round(subtotal * 0.05);
        const total = subtotal + delivery + gst;
        
        // Update amounts
        if (subtotalAmount) subtotalAmount.textContent = `₹${subtotal}`;
        if (deliveryFee) {
            deliveryFee.textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
        }
        if (gstAmount) gstAmount.textContent = `₹${gst}`;
        if (totalAmount) totalAmount.innerHTML = `<strong>₹${total}</strong>`;
        if (hiddenTotalAmount) hiddenTotalAmount.value = total;
    }





/**
 * Form validation
 */
function setupFormValidation() {
    const form = document.getElementById('orderForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const customerName = document.getElementById('customer_name');
        const customerPhone = document.getElementById('customer_phone');
        const customerAddress = document.getElementById('customer_address');
        
        let isValid = true;
        let errorMessage = '';
        
        // Validate customer name
        if (!customerName || !customerName.value.trim()) {
            errorMessage += 'Please enter your full name.\n';
            isValid = false;
        }
        
        // Validate phone number
        if (!customerPhone || !customerPhone.value.trim()) {
            errorMessage += 'Please enter your phone number.\n';
            isValid = false;
        } else if (!/^[\+]?[\d\s\-\(\)]{10,15}$/.test(customerPhone.value.trim())) {
            errorMessage += 'Please enter a valid phone number.\n';
            isValid = false;
        }
        
        // Validate address
        if (!customerAddress || !customerAddress.value.trim()) {
            errorMessage += 'Please enter your delivery address.\n';
            isValid = false;
        }
        
        // Check if at least one item is selected
        const totalElement = document.getElementById('totalAmount');
        if (totalElement && totalElement.textContent === '₹0') {
            errorMessage += 'Please select at least one item to order.\n';
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
            alert(errorMessage);
            return false;
        }
        
        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
            submitButton.disabled = true;
        }
    });
}

/**
 * Review form star rating functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const starInputs = document.querySelectorAll('.star-rating input');
    const starLabels = document.querySelectorAll('.star-rating label');
    
    starLabels.forEach((label, index) => {
        label.addEventListener('mouseenter', function() {
            highlightStars(index);
        });
        
        label.addEventListener('click', function() {
            const input = document.getElementById(this.getAttribute('for'));
            if (input) {
                input.checked = true;
            }
        });
    });
    
    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        starRating.addEventListener('mouseleave', function() {
            const checkedInput = this.querySelector('input:checked');
            if (checkedInput) {
                const checkedIndex = Array.from(starInputs).indexOf(checkedInput);
                highlightStars(checkedIndex);
            } else {
                resetStars();
            }
        });
    }
});

/**
 * Highlight stars for rating
 */
function highlightStars(index) {
    const starLabels = document.querySelectorAll('.star-rating label');
    starLabels.forEach((label, i) => {
        if (i <= index) {
            label.style.color = '#c6a664'; // gold-bronze color
        } else {
            label.style.color = '#ddd';
        }
    });
}

/**
 * Reset star colors
 */
function resetStars() {
    const starLabels = document.querySelectorAll('.star-rating label');
    starLabels.forEach(label => {
        label.style.color = '#ddd';
    });
}

/**
 * Utility function to show notifications
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `flash-message flash-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="flash-close">&times;</button>
    `;
    
    const flashContainer = document.querySelector('.flash-messages') || createFlashContainer();
    flashContainer.appendChild(notification);
    
    // Add event listener for close button
    const closeButton = notification.querySelector('.flash-close');
    closeButton.addEventListener('click', () => {
        hideFlashMessage(notification);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideFlashMessage(notification);
    }, 5000);
}

/**
 * Create flash message container if it doesn't exist
 */
function createFlashContainer() {
    const container = document.createElement('div');
    container.className = 'flash-messages';
    document.body.appendChild(container);
    return container;
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Add CSS for slide out animation
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .navbar {
        transition: transform 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .nav-right {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 250px;
            height: calc(100vh - 80px);
            background: var(--coffee);
            flex-direction: column;
            padding: 2rem 1rem;
            transition: right 0.3s ease;
            z-index: 999;
        }
        
        .nav-right.mobile-active {
            right: 0;
        }
        
        .nav-link {
            padding: 1rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
`;
document.head.appendChild(style);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeAnimations,
        initializeOrderForm,
        showNotification,
        debounce
    };
}}
