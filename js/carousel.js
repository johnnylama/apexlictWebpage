
  $(document).ready(function(){
    $('.team-carousel').owlCarousel({
      loop: true,
      margin: 24,
      nav: true,
      dots: false,
      navText: [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>'
      ],
      responsive: {
        0:   { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 }
      }
    });
  });


