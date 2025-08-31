// Quote Calculator JavaScript

// Pricing configuration
const pricingConfig = {
    'bim-modelling': {
        basePrice: 500,
        areaMultiplier: 2, // per 1000 sqft
        projectTypeMultipliers: {
            'residential': 1.0,
            'commercial': 1.2,
            'industrial': 1.5,
            'healthcare': 1.3,
            'educational': 1.1,
            'mixed-use': 1.4,
            'other': 1.0
        },
        inputFileMultipliers: {
            'sketch': 1.3,
            'image': 1.2,
            'pdf': 1.1,
            'cad': 1.0,
            'existing-model': 0.8
        }
    },
    'bim-automation': {
        basePrice: 300,
        taskMultiplier: 150, // per task
        automationTypeMultipliers: {
            'dynamo': 1.0,
            'python': 1.2,
            'both': 1.5
        }
    },
    'bim-coordination': {
        basePrice: 400,
        areaMultiplier: 1.5, // per 1000 sqft
        coordinationTypeMultipliers: {
            'clash-detection': 1.0,
            'coordination-model': 1.2,
            'both-coordination': 1.8
        },
        disciplineMultipliers: {
            '2': 1.0,
            '3': 1.3,
            '4': 1.6,
            '5': 2.0
        }
    },
    'quantities-costing': {
        basePrice: 300,
        areaMultiplier: 1.2, // per 1000 sqft
        serviceTypeMultipliers: {
            'quantities': 1.0,
            'costing': 1.2,
            'both-costing': 1.8
        },
        elementMultipliers: {
            'structural': 0.3,
            'architectural': 0.25,
            'mep': 0.4,
            'finishes': 0.2,
            'furniture': 0.15
        }
    },
    '3d-visualization': {
        basePrice: 200,
        imagePrice: 50, // per image
        videoPrice: 100, // per minute
        resolutionMultipliers: {
            'hd': 1.0,
            '4k': 1.5,
            '8k': 2.5
        },
        videoQualityMultipliers: {
            'hd': 1.0,
            '4k': 1.3
        }
    }
};

// Currency exchange rates (simplified - in real app, use live rates)
const currencyRates = {
    'USD': 1.0,
    'EUR': 0.85,
    'GBP': 0.73,
    'INR': 74.5,
    'CAD': 1.25,
    'AUD': 1.35
};

const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'INR': '₹',
    'CAD': 'C$',
    'AUD': 'A$'
};

// Global variables
let selectedService = null;
let currentQuote = 0;
let selectedCurrency = 'USD';
let cart = [];
let selectedPaymentMethod = 'card'; // Default to card payment

// DOM Elements
const serviceOptions = document.querySelectorAll('.service-option');
const serviceDetails = document.getElementById('service-details');
const quoteSummary = document.getElementById('quote-summary');
const paymentSection = document.getElementById('payment-section');

// Initialize the quote calculator
document.addEventListener('DOMContentLoaded', function() {
    initializeQuoteCalculator();
    setupEventListeners();
});

function initializeQuoteCalculator() {
    // Hide all service forms initially
    hideAllServiceForms();
    
    // Show default state
    updateQuoteSummary('None', 'Please select a service to see pricing details', []);
}

function setupEventListeners() {
    // Service selection
    serviceOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectService(option.dataset.service);
        });
    });

    // Currency selection
    const currencySelector = document.getElementById('currency-selector');
    if (currencySelector) {
        currencySelector.addEventListener('change', (e) => {
            selectedCurrency = e.target.value;
            if (selectedService) {
                calculateAndUpdateQuote();
            }
            // Update cart display with new currency
            if (cart.length > 0) {
                updateCartDisplay();
                updateCartModal();
            }
        });
    }

    // Form input listeners for real-time pricing updates
    setupFormListeners();
    
    // File upload
    setupFileUpload();
    
    // Submit button
    document.getElementById('submit-quote-btn').addEventListener('click', handleQuoteSubmission);
    
    // Cart functionality
    setupCartEventListeners();
    
    // Payment functionality
    setupPaymentEventListeners();
}

function selectService(serviceType) {
    // Remove previous selection
    serviceOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    const selectedOption = document.querySelector(`[data-service="${serviceType}"]`);
    selectedOption.classList.add('selected');
    
    selectedService = serviceType;
    
    // Show corresponding form
    showServiceForm(serviceType);
    
    // Update quote summary
    updateQuoteSummary(getServiceDisplayName(serviceType), 'Please fill in the details below to get your quote', []);
    
    // Scroll to service details
    serviceDetails.scrollIntoView({ behavior: 'smooth' });
}

function showServiceForm(serviceType) {
    // Hide all forms first
    hideAllServiceForms();
    
    // Show the selected form
    const formId = `${serviceType}-form`;
    const form = document.getElementById(formId);
    if (form) {
        form.style.display = 'block';
    }
}

function hideAllServiceForms() {
    const forms = document.querySelectorAll('.service-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });
}

function setupFormListeners() {
    // BIM Modelling listeners
    setupBIMModellingListeners();
    
    // BIM Automation listeners
    setupBIMAutomationListeners();
    
    // BIM Coordination listeners
    setupBIMCoordinationListeners();
    
    // Quantities & Costing listeners
    setupQuantitiesCostingListeners();
    
    // 3D Visualization listeners
    setup3DVisualizationListeners();
}

function setupBIMModellingListeners() {
    const projectType = document.getElementById('project-type');
    const bimArea = document.getElementById('bim-area');
    const bimAreaUnit = document.getElementById('bim-area-unit');
    const inputFileType = document.getElementById('input-file-type');
    
    [projectType, bimArea, bimAreaUnit, inputFileType].forEach(element => {
        if (element) {
            element.addEventListener('change', calculateBIMModellingPrice);
            element.addEventListener('input', calculateBIMModellingPrice);
        }
    });
}

function setupBIMAutomationListeners() {
    const automationTasks = document.getElementById('automation-tasks');
    const automationType = document.getElementById('automation-type');
    
    [automationTasks, automationType].forEach(element => {
        if (element) {
            element.addEventListener('change', calculateBIMAutomationPrice);
            element.addEventListener('input', calculateBIMAutomationPrice);
        }
    });
}

function setupBIMCoordinationListeners() {
    const coordinationType = document.getElementById('coordination-type');
    const coordinationArea = document.getElementById('coordination-area');
    const coordinationAreaUnit = document.getElementById('coordination-area-unit');
    const disciplines = document.getElementById('disciplines');
    
    [coordinationType, coordinationArea, coordinationAreaUnit, disciplines].forEach(element => {
        if (element) {
            element.addEventListener('change', calculateBIMCoordinationPrice);
            element.addEventListener('input', calculateBIMCoordinationPrice);
        }
    });
}

function setupQuantitiesCostingListeners() {
    const costingType = document.getElementById('costing-type');
    const costingArea = document.getElementById('costing-area');
    const costingAreaUnit = document.getElementById('costing-area-unit');
    const elementCheckboxes = document.querySelectorAll('#quantities-costing-form input[type="checkbox"]');
    
    [costingType, costingArea, costingAreaUnit].forEach(element => {
        if (element) {
            element.addEventListener('change', calculateQuantitiesCostingPrice);
            element.addEventListener('input', calculateQuantitiesCostingPrice);
        }
    });
    
    elementCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateQuantitiesCostingPrice);
    });
}

function setup3DVisualizationListeners() {
    const visualizationType = document.getElementById('visualization-type');
    const imageCount = document.getElementById('image-count');
    const imageResolution = document.getElementById('image-resolution');
    const videoDuration = document.getElementById('video-duration');
    const videoQuality = document.getElementById('video-quality');
    
    [visualizationType, imageCount, imageResolution, videoDuration, videoQuality].forEach(element => {
        if (element) {
            element.addEventListener('change', calculate3DVisualizationPrice);
            element.addEventListener('input', calculate3DVisualizationPrice);
        }
    });
    
    // Add listener for visualization type to show/hide sections
    if (visualizationType) {
        visualizationType.addEventListener('change', toggleVisualizationSections);
    }
}

function toggleVisualizationSections() {
    const visualizationType = document.getElementById('visualization-type').value;
    const imagesSection = document.getElementById('images-section');
    const videosSection = document.getElementById('videos-section');
    
    // Hide both sections initially
    imagesSection.style.display = 'none';
    videosSection.style.display = 'none';
    
    // Show relevant sections based on selection
    if (visualizationType === 'images' || visualizationType === 'both-visualization') {
        imagesSection.style.display = 'block';
    }
    
    if (visualizationType === 'videos' || visualizationType === 'both-visualization') {
        videosSection.style.display = 'block';
    }
}

function calculateBIMModellingPrice() {
    if (selectedService !== 'bim-modelling') return;
    
    const projectType = document.getElementById('project-type').value;
    const area = parseFloat(document.getElementById('bim-area').value) || 0;
    const areaUnit = document.getElementById('bim-area-unit').value;
    const inputFileType = document.getElementById('input-file-type').value;
    
    if (!projectType || !area || !inputFileType) {
        updateQuoteSummary('BIM Modelling', 'Please fill in all required fields', []);
        return;
    }
    
    // Convert area to sqft for calculations
    let areaInSqft = area;
    if (areaUnit === 'sqm') {
        areaInSqft = area * 10.764;
    }
    
    const config = pricingConfig['bim-modelling'];
    let totalPrice = config.basePrice;
    
    // Area calculation
    const areaMultiplier = (areaInSqft / 1000) * config.areaMultiplier;
    totalPrice += areaMultiplier * 1000;
    
    // Apply multipliers
    totalPrice *= config.projectTypeMultipliers[projectType];
    totalPrice *= config.inputFileMultipliers[inputFileType];
    
    const breakdown = [
        { name: 'Base Price', price: config.basePrice },
        { name: `Area (${areaInSqft.toFixed(0)} sqft)`, price: areaMultiplier * 1000 },
        { name: `${getProjectTypeDisplayName(projectType)} Multiplier`, price: totalPrice - (config.basePrice + areaMultiplier * 1000) }
    ];
    
    updateQuoteSummary('BIM Modelling', `Project: ${getProjectTypeDisplayName(projectType)} | Area: ${areaInSqft.toFixed(0)} sqft`, breakdown, totalPrice);
}

function calculateBIMAutomationPrice() {
    if (selectedService !== 'bim-automation') return;
    
    const tasks = parseInt(document.getElementById('automation-tasks').value) || 0;
    const automationType = document.getElementById('automation-type').value;
    
    if (!tasks || !automationType) {
        updateQuoteSummary('BIM Automation', 'Please fill in all required fields', []);
        return;
    }
    
    const config = pricingConfig['bim-automation'];
    let totalPrice = config.basePrice;
    
    // Task calculation
    const taskPrice = tasks * config.taskMultiplier;
    totalPrice += taskPrice;
    
    // Apply automation type multiplier
    totalPrice *= config.automationTypeMultipliers[automationType];
    
    const breakdown = [
        { name: 'Base Price', price: config.basePrice },
        { name: `${tasks} Tasks`, price: taskPrice },
        { name: `${getAutomationTypeDisplayName(automationType)} Multiplier`, price: totalPrice - (config.basePrice + taskPrice) }
    ];
    
    updateQuoteSummary('BIM Automation', `${tasks} tasks | ${getAutomationTypeDisplayName(automationType)}`, breakdown, totalPrice);
}

function calculateBIMCoordinationPrice() {
    if (selectedService !== 'bim-coordination') return;
    
    const coordinationType = document.getElementById('coordination-type').value;
    const area = parseFloat(document.getElementById('coordination-area').value) || 0;
    const areaUnit = document.getElementById('coordination-area-unit').value;
    const disciplines = document.getElementById('disciplines').value;
    
    if (!coordinationType || !area || !disciplines) {
        updateQuoteSummary('BIM Coordination', 'Please fill in all required fields', []);
        return;
    }
    
    // Convert area to sqft for calculations
    let areaInSqft = area;
    if (areaUnit === 'sqm') {
        areaInSqft = area * 10.764;
    }
    
    const config = pricingConfig['bim-coordination'];
    let totalPrice = config.basePrice;
    
    // Area calculation
    const areaMultiplier = (areaInSqft / 1000) * config.areaMultiplier;
    totalPrice += areaMultiplier * 1000;
    
    // Apply multipliers
    totalPrice *= config.coordinationTypeMultipliers[coordinationType];
    totalPrice *= config.disciplineMultipliers[disciplines];
    
    const breakdown = [
        { name: 'Base Price', price: config.basePrice },
        { name: `Area (${areaInSqft.toFixed(0)} sqft)`, price: areaMultiplier * 1000 },
        { name: `${getCoordinationTypeDisplayName(coordinationType)}`, price: totalPrice - (config.basePrice + areaMultiplier * 1000) }
    ];
    
    updateQuoteSummary('BIM Coordination', `${getCoordinationTypeDisplayName(coordinationType)} | ${disciplines} disciplines`, breakdown, totalPrice);
}

function calculateQuantitiesCostingPrice() {
    if (selectedService !== 'quantities-costing') return;
    
    const costingType = document.getElementById('costing-type').value;
    const area = parseFloat(document.getElementById('costing-area').value) || 0;
    const areaUnit = document.getElementById('costing-area-unit').value;
    const selectedElements = Array.from(document.querySelectorAll('#quantities-costing-form input[type="checkbox"]:checked')).map(cb => cb.value);
    
    if (!costingType || !area || selectedElements.length === 0) {
        updateQuoteSummary('Quantities & Costing', 'Please fill in all required fields', []);
        return;
    }
    
    // Convert area to sqft for calculations
    let areaInSqft = area;
    if (areaUnit === 'sqm') {
        areaInSqft = area * 10.764;
    }
    
    const config = pricingConfig['quantities-costing'];
    let totalPrice = config.basePrice;
    
    // Area calculation
    const areaMultiplier = (areaInSqft / 1000) * config.areaMultiplier;
    totalPrice += areaMultiplier * 1000;
    
    // Apply service type multiplier
    totalPrice *= config.serviceTypeMultipliers[costingType];
    
    // Apply element multipliers
    const elementMultiplier = selectedElements.reduce((sum, element) => sum + config.elementMultipliers[element], 0);
    totalPrice *= (1 + elementMultiplier);
    
    const breakdown = [
        { name: 'Base Price', price: config.basePrice },
        { name: `Area (${areaInSqft.toFixed(0)} sqft)`, price: areaMultiplier * 1000 },
        { name: `${getCostingTypeDisplayName(costingType)}`, price: totalPrice - (config.basePrice + areaMultiplier * 1000) }
    ];
    
    updateQuoteSummary('Quantities & Costing', `${getCostingTypeDisplayName(costingType)} | ${selectedElements.length} elements`, breakdown, totalPrice);
}

function calculate3DVisualizationPrice() {
    if (selectedService !== '3d-visualization') return;
    
    const visualizationType = document.getElementById('visualization-type').value;
    
    if (!visualizationType) {
        updateQuoteSummary('3D Visualization', 'Please select visualization type', []);
        return;
    }
    
    const config = pricingConfig['3d-visualization'];
    let totalPrice = config.basePrice;
    const breakdown = [{ name: 'Base Price', price: config.basePrice }];
    
    if (visualizationType === 'images' || visualizationType === 'both-visualization') {
        const imageCount = parseInt(document.getElementById('image-count').value) || 0;
        const imageResolution = document.getElementById('image-resolution').value;
        
        if (imageCount > 0) {
            const imagePrice = imageCount * config.imagePrice * config.resolutionMultipliers[imageResolution];
            totalPrice += imagePrice;
            breakdown.push({ name: `${imageCount} Images (${imageResolution.toUpperCase()})`, price: imagePrice });
        }
    }
    
    if (visualizationType === 'videos' || visualizationType === 'both-visualization') {
        const videoDuration = parseInt(document.getElementById('video-duration').value) || 0;
        const videoQuality = document.getElementById('video-quality').value;
        
        if (videoDuration > 0) {
            const videoPrice = videoDuration * config.videoPrice * config.videoQualityMultipliers[videoQuality];
            totalPrice += videoPrice;
            breakdown.push({ name: `${videoDuration} min Video (${videoQuality.toUpperCase()})`, price: videoPrice });
        }
    }
    
    const summary = getVisualizationSummary(visualizationType);
    updateQuoteSummary('3D Visualization', summary, breakdown, totalPrice);
}

function getVisualizationSummary(type) {
    let summary = '';
    
    if (type === 'images' || type === 'both-visualization') {
        const imageCount = parseInt(document.getElementById('image-count').value) || 0;
        const imageResolution = document.getElementById('image-resolution').value;
        summary += `${imageCount} images (${imageResolution.toUpperCase()})`;
    }
    
    if (type === 'videos' || type === 'both-visualization') {
        const videoDuration = parseInt(document.getElementById('video-duration').value) || 0;
        const videoQuality = document.getElementById('video-quality').value;
        if (summary) summary += ' | ';
        summary += `${videoDuration} min video (${videoQuality.toUpperCase()})`;
    }
    
    return summary || 'Please specify details';
}

function updateQuoteSummary(serviceName, details, breakdown, totalPrice = 0) {
    document.getElementById('selected-service-name').textContent = serviceName;
    
    const detailsElement = document.getElementById('service-details-summary');
    detailsElement.innerHTML = `<p>${details}</p>`;
    
    const breakdownElement = document.getElementById('pricing-breakdown');
    if (breakdown.length > 0) {
        breakdownElement.innerHTML = breakdown.map(item => 
            `<div class="pricing-item">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${formatCurrency(item.price)}</span>
            </div>`
        ).join('');
    } else {
        breakdownElement.innerHTML = '';
    }
    
    currentQuote = totalPrice;
    document.getElementById('total-price').textContent = formatCurrency(totalPrice);
    document.getElementById('advance-amount').textContent = formatCurrency(totalPrice * 0.2);
    
    // Show cart actions if quote is calculated
    if (totalPrice > 0) {
        document.getElementById('add-to-cart-btn').style.display = 'flex';
        if (cart.length > 0) {
            document.getElementById('view-cart-btn').style.display = 'flex';
        }
    } else {
        document.getElementById('add-to-cart-btn').style.display = 'none';
    }
}

function setupFileUpload() {
    const fileInput = document.getElementById('project-files');
    const uploadArea = document.querySelector('.upload-area');
    
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#3b82f6';
        uploadArea.style.background = 'rgba(59, 130, 246, 0.05)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#d1d5db';
        uploadArea.style.background = '#f9fafb';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#d1d5db';
        uploadArea.style.background = '#f9fafb';
        
        const files = e.dataTransfer.files;
        fileInput.files = files;
        handleFileSelect();
    });
}

function handleFileSelect() {
    const fileInput = document.getElementById('project-files');
    const uploadArea = document.querySelector('.upload-area');
    const files = fileInput.files;
    
    if (files.length > 0) {
        uploadArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: #10b981;"></i>
            <p>${files.length} file(s) selected</p>
            <small>${Array.from(files).map(f => f.name).join(', ')}</small>
        `;
    } else {
        uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Drag & drop files here or click to browse</p>
            <small>Supported formats: PDF, CAD, Images, ZIP</small>
        `;
    }
}

function handleQuoteSubmission() {
    const submitBtn = document.getElementById('submit-quote-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate processing
    setTimeout(() => {
        // Show success message
        showNotification('Quote submitted successfully! We will contact you within 24 hours.', 'success');
        
        // Reset form
        resetQuoteForm();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function resetQuoteForm() {
    // Reset service selection
    serviceOptions.forEach(option => option.classList.remove('selected'));
    selectedService = null;
    
    // Hide forms
    hideAllServiceForms();
    
    // Reset quote summary
    updateQuoteSummary('None', 'Please select a service to see pricing details', []);
    
    // Hide cart actions
    document.getElementById('add-to-cart-btn').style.display = 'none';
    document.getElementById('view-cart-btn').style.display = 'none';
    
    // Reset all form inputs
    document.querySelectorAll('input, select, textarea').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    // Reset file upload
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Drag & drop files here or click to browse</p>
        <small>Supported formats: PDF, CAD, Images, ZIP</small>
    `;
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Helper functions for display names
function getServiceDisplayName(service) {
    const names = {
        'bim-modelling': 'BIM Modelling',
        'bim-automation': 'BIM Automation',
        'bim-coordination': 'BIM Coordination',
        'quantities-costing': 'Quantities & Costing',
        '3d-visualization': '3D Visualization'
    };
    return names[service] || service;
}

function getProjectTypeDisplayName(type) {
    const names = {
        'residential': 'Residential',
        'commercial': 'Commercial',
        'industrial': 'Industrial',
        'healthcare': 'Healthcare',
        'educational': 'Educational',
        'mixed-use': 'Mixed Use',
        'other': 'Other'
    };
    return names[type] || type;
}

function getAutomationTypeDisplayName(type) {
    const names = {
        'dynamo': 'Dynamo Script',
        'python': 'Python Script',
        'both': 'Dynamo & Python'
    };
    return names[type] || type;
}

function getCoordinationTypeDisplayName(type) {
    const names = {
        'clash-detection': 'Clash Detection',
        'coordination-model': 'Coordination Model',
        'both-coordination': 'Clash Detection & Coordination'
    };
    return names[type] || type;
}

function getCostingTypeDisplayName(type) {
    const names = {
        'quantities': 'Quantities Only',
        'costing': 'Costing Only',
        'both-costing': 'Quantities & Costing'
    };
    return names[type] || type;
}

// Currency conversion function
function convertCurrency(amount, fromCurrency = 'USD', toCurrency = selectedCurrency) {
    const usdAmount = amount / currencyRates[fromCurrency];
    return usdAmount * currencyRates[toCurrency];
}

function formatCurrency(amount, currency = selectedCurrency) {
    const convertedAmount = convertCurrency(amount, 'USD', currency);
    const symbol = currencySymbols[currency];
    
    if (currency === 'INR') {
        return `${symbol}${Math.round(convertedAmount).toLocaleString()}`;
    } else {
        return `${symbol}${convertedAmount.toFixed(2)}`;
    }
}

// Cart Functions
function setupCartEventListeners() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const viewCartBtn = document.getElementById('view-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
    
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', openCartModal);
    }
    
    // Close cart modal when clicking outside
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
    
    // Close cart modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal && cartModal.classList.contains('show')) {
            closeCartModal();
        }
    });
}

function addToCart() {
    if (!selectedService || currentQuote <= 0) {
        showNotification('Please select a service and calculate the quote first', 'error');
        return;
    }
    
    const cartItem = {
        id: Date.now(),
        service: selectedService,
        serviceName: getServiceDisplayName(selectedService),
        priceUSD: convertCurrency(currentQuote, selectedCurrency, 'USD'), // Store original USD price
        details: getServiceDetails(),
        currency: selectedCurrency
    };
    
    cart.push(cartItem);
    updateCartDisplay();
    showNotification('Service added to cart successfully!', 'success');
}

function getServiceDetails() {
    let details = '';
    
    switch (selectedService) {
        case 'bim-modelling':
            const projectType = document.getElementById('project-type').value;
            const area = document.getElementById('bim-area').value;
            const areaUnit = document.getElementById('bim-area-unit').value;
            details = `${getProjectTypeDisplayName(projectType)} | ${area} ${areaUnit}`;
            break;
        case 'bim-automation':
            const tasks = document.getElementById('automation-tasks').value;
            const automationType = document.getElementById('automation-type').value;
            details = `${tasks} tasks | ${getAutomationTypeDisplayName(automationType)}`;
            break;
        case 'bim-coordination':
            const coordinationType = document.getElementById('coordination-type').value;
            const coordinationArea = document.getElementById('coordination-area').value;
            details = `${getCoordinationTypeDisplayName(coordinationType)} | ${coordinationArea} sqft`;
            break;
        case 'quantities-costing':
            const costingType = document.getElementById('costing-type').value;
            const costingArea = document.getElementById('costing-area').value;
            details = `${getCostingTypeDisplayName(costingType)} | ${costingArea} sqft`;
            break;
        case '3d-visualization':
            const visualizationType = document.getElementById('visualization-type').value;
            details = getVisualizationSummary(visualizationType);
            break;
    }
    
    return details;
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const viewCartBtn = document.getElementById('view-cart-btn');
    
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    
    if (viewCartBtn) {
        if (cart.length > 0) {
            viewCartBtn.style.display = 'flex';
        } else {
            viewCartBtn.style.display = 'none';
        }
    }
}

function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    updateCartModal();
    cartModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartAdvance = document.getElementById('cart-advance');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = formatCurrency(0);
        cartAdvance.textContent = formatCurrency(0);
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + convertCurrency(item.priceUSD, 'USD', selectedCurrency), 0);
    const advance = total * 0.2;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.serviceName}</h4>
                <p>${item.details}</p>
            </div>
            <div class="cart-item-price">
                ${formatCurrency(convertCurrency(item.priceUSD, 'USD', selectedCurrency))}
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    cartTotal.textContent = formatCurrency(total);
    cartAdvance.textContent = formatCurrency(advance);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    updateCartModal();
    showNotification('Item removed from cart', 'info');
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    updateCartModal();
    showNotification('Cart cleared', 'info');
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    closeCartModal();
    openPaymentModal();
}

// Payment Functions
function setupPaymentEventListeners() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectPaymentMethod(option.dataset.method);
        });
    });
    
    // Card input formatting
    const cardNumber = document.getElementById('card-number');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCvv = document.getElementById('card-cvv');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
    }
    
    if (cardExpiry) {
        cardExpiry.addEventListener('input', formatCardExpiry);
    }
    
    if (cardCvv) {
        cardCvv.addEventListener('input', formatCardCvv);
    }
    
    // Close payment modal when clicking outside
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                closePaymentModal();
            }
        });
    }
    
    // Close payment modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && paymentModal && paymentModal.classList.contains('show')) {
            closePaymentModal();
        }
    });
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Remove previous selection
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    document.querySelector(`[data-method="${method}"]`).classList.add('selected');
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
}

function formatCardExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
}

function formatCardCvv(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
}

function openPaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    updatePaymentModal();
    paymentModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    paymentModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function updatePaymentModal() {
    const total = cart.reduce((sum, item) => sum + convertCurrency(item.priceUSD, 'USD', selectedCurrency), 0);
    const advance = total * 0.2;
    
    document.getElementById('payment-total').textContent = formatCurrency(total);
    document.getElementById('payment-advance').textContent = formatCurrency(advance);
}

function processPayment() {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    const cardholderName = document.getElementById('cardholder-name').value;
    
    // Validate card number (basic validation)
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13 || cardNumber.replace(/\s/g, '').length > 19) {
        showNotification('Please enter a valid card number', 'error');
        return;
    }
    
    // Validate expiry date
    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        showNotification('Please enter a valid expiry date (MM/YY)', 'error');
        return;
    }
    
    // Validate CVV
    if (!cardCvv || cardCvv.length < 3 || cardCvv.length > 4) {
        showNotification('Please enter a valid CVV', 'error');
        return;
    }
    
    // Validate cardholder name
    if (!cardholderName || cardholderName.trim().length < 2) {
        showNotification('Please enter a valid cardholder name', 'error');
        return;
    }
    
    const payBtn = document.querySelector('.pay-now-btn');
    const originalText = payBtn.innerHTML;
    
    // Show loading state
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
    payBtn.disabled = true;
    
    // Simulate payment processing with better feedback
    setTimeout(() => {
        // Simulate payment validation
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const advance = total * 0.2;
        
        // Show success message with payment details
        showNotification(`Payment successful! Advance payment of ${formatCurrency(advance)} processed. We will contact you within 24 hours.`, 'success');
        
        // Clear cart
        cart = [];
        updateCartDisplay();
        
        // Close modals
        closePaymentModal();
        
        // Reset form
        resetQuoteForm();
        
        // Reset button
        payBtn.innerHTML = originalText;
        payBtn.disabled = false;
        
        // Clear payment form
        document.getElementById('card-number').value = '';
        document.getElementById('card-expiry').value = '';
        document.getElementById('card-cvv').value = '';
        document.getElementById('cardholder-name').value = '';
    }, 3000);
}

// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});
