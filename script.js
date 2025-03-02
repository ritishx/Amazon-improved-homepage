document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && menuClose && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Carousel Functionality
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    
    if (carouselItems.length > 0 && carouselPrev && carouselNext) {
        let currentSlide = 0;
        
        function showSlide(index) {
            carouselItems.forEach(item => item.classList.remove('active'));
            
            if (index < 0) {
                currentSlide = carouselItems.length - 1;
            } else if (index >= carouselItems.length) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            
            carouselItems[currentSlide].classList.add('active');
        }
        
        carouselPrev.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
        
        carouselNext.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });
        
        // Auto slide every 5 seconds
        setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    // Mobile Category Tabs
    const tabs = document.querySelectorAll('.tab');
    
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Here you would typically show/hide content based on the selected tab
                const tabId = this.getAttribute('data-tab');
                console.log(`Tab selected: ${tabId}`);
            });
        });
    }
    
    // Add to Cart Animation
    const productCards = document.querySelectorAll('.product-card, .recommendation-card');
    const cartCount = document.querySelectorAll('.cart-count');
    
    if (productCards.length > 0 && cartCount.length > 0) {
        productCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Only trigger if clicking on the product image or name
                const target = e.target;
                if (target.classList.contains('product-img') || 
                    target.classList.contains('recommendation-img') ||
                    target.classList.contains('product-name') ||
                    target.classList.contains('recommendation-name')) {
                    
                    e.preventDefault();
                    
                    // Update cart count
                    cartCount.forEach(count => {
                        let currentCount = parseInt(count.textContent);
                        count.textContent = currentCount + 1;
                        
                        // Add animation class
                        count.classList.add('cart-update');
                        setTimeout(() => {
                            count.classList.remove('cart-update');
                        }, 300);
                    });
                }
            });
        });
    }
    
    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        // Enhance lazy loading with blur-up effect
        function loadImage(img) {
            const src = img.getAttribute('data-src');
            if (!src) return;
            
            // Create a low-quality placeholder
            const lowQualitySrc = `${src}?w=50&q=10`;
            
            // Load low quality version first
            img.style.filter = 'blur(5px)';
            img.src = lowQualitySrc;
            
            // Then load high quality version
            const highQualityImg = new Image();
            highQualityImg.src = src;
            highQualityImg.onload = function() {
                img.src = src;
                img.style.filter = 'none';
                img.style.transition = 'filter 0.3s ease';
            };
            
            img.removeAttribute('data-src');
        }

        // Update the intersection observer callback
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '50px 0px 100px 0px'
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    }
    
    // Add hover effect for product cards
    const allCards = document.querySelectorAll('.category-card, .product-card, .home-card, .recommendation-card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});