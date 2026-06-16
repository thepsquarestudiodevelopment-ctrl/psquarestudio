document.addEventListener('DOMContentLoaded', function () {
    // Initialize testimonial slider
    const testimonialSlider = new Swiper('.td-testimonial-slider', {
        loop: true,
        speed: 500,
        allowTouchMove: false,
        on: {
            slideChange: function () {
                updateTestimonialImage(this.activeIndex);
            },
            init: function () {
                // Initialize the image on page load
                updateTestimonialImage(this.activeIndex);
            }
        }
    });

    // Navigation controls
    document.querySelector('.td-testimonial-prev').addEventListener('click', function () {
        testimonialSlider.slidePrev();
    });

    document.querySelector('.td-testimonial-next').addEventListener('click', function () {
        testimonialSlider.slideNext();
    });

    // Function to update testimonial image based on active slide
    function updateTestimonialImage(activeIndex) {
        // Define image paths for each testimonial
        const images = [
            'assets/img/testimonial/testimonial1.jpg',
            'assets/img/testimonial/testimonial2.jpg', // You'll need to add this image
            'assets/img/testimonial/testimonial3.jpg'  // You'll need to add this image
        ];

        // Get the actual slide index (accounting for loop)
        const realIndex = testimonialSlider.realIndex;

        // Update the main testimonial image
        const mainImage = document.getElementById('testimonial-main-img');
        if (mainImage && images[realIndex]) {
            mainImage.src = images[realIndex];

            // Add fade effect for smooth transition
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 150);
        }
    }

    // Initialize brand slider
    const brandSlider = new Swiper('.td-brand-slide-active', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            }
        }
    });
});