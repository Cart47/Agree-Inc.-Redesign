function screenSettings() {
    return {
        vW : $(window).innerWidth(),
        vH : $(window).innerHeight()
    }
}

function setupScreen () {
    
    var screen = screenSettings();
    
     var slider = new BeaverSlider({
                    type: "slider",
                    structure: {
                        container: {
                            id: "agree-slider",
                            width: screen.vW,
                            height: 600
                        },
                        controls: {
                            containerClass: "control-container",
                            elementClass: "control-element",
                            elementActiveClass: "control-element-active",
                            previewMode: false
                        },
                        messages: {
                            containerClass: "message-container",
                            left: '5%',
                            bottom: 50
                        }
                    },
                    content: {
                        images: ["images/garden.jpg","images/flower.jpg", "images/dock.jpg"],
                        messages: ["<h3>Conflict</h3>Conflict inevitably impacts individuals and organizations as they attempt to negotiate the effect of constant change on their lives. Conflict is a form of competitive behavior involving actual or perceived differences in interests or limited resources.<br/><br/>Conflict, when well managed, is a dynamic catalyst for positive change. When mismanaged it produces hostility, stress and other costs to individuals and organizations. These costs include not just dollars and cents but lost opportunities, damaged or destroyed relationships, low satisfaction and high recurrence levels. In any conflict situation there will always be a right next step.  Effective conflict management leads parties to identify and take that step.","<h3>Our Approach</h3>Agree focuses on helping clients make better decisions through the use of appropriate conflict management processes. Experience has shown that this approach will significantly reduce the cost of conflict management. At the same time, processes which emphasize principled negotiation, consensus building and collaboration tend to empower and increase the effectiveness of all involved.","<h3>Our Mission</h3>Agree provides the highest quality conflict management services to individuals, business, and government organizations with a focus on effectiveness and value. Agree encourages the use of appropriate decision making processes with an emphasis on collaboration, Partnering and consensus."]
                    },
                    animation: {
                        effects: effectSets["carousel: slideOver"],
                        interval: 5000,
                        initialInterval: 4000,
                        waitAllImages: true,
                        changeSameMessage: false,
                        showMessages: "simple",
                        messageAnimationDirection: "up",
                        messageAnimationDuration: 600,
                        messageAnimationMaxHorLength: 200,
                        messageAnimationMaxVerLength: 100,
                        changeMessagesAfter: 1
                    }
                });
    
        $('.service-icon').equalize();
    
    if(pageName != "home") {
        $( "header img" ).addClass("main-logo");
        $( ".nav>li>a" ).addClass("fixed-link");
        $( "header" ).addClass("fixed-nav");
    }
    
    if(pageName == "knowledge-center") {
//        $('.article').equalize('outerHeight');
//        $('.article').masonry({
//          // options
//            itemSelector: '.grid-item',
//            columnWidth: 200,
//            gutter: 20
//        });
        
        var $grid = $('.article'),
            $filterOptions = $('.article-filter');

          $grid.shuffle({
            itemSelector: '.grid-item',
            columnWidth: 200,
            gutterWidth: 20  
          }),
              
            $grid.on('loading.shuffle done.shuffle shrink.shuffle shrunk.shuffle filter.shuffle filtered.shuffle sorted.shuffle layout.shuffle', function(evt, shuffle) {
      // Make sure the browser has a console
              if ( window.console && window.console.log && typeof window.console.log === 'function' ) {
                //console.log( 'Shuffle:', evt.type );
              }
            });
        
        setupFilters($filterOptions, $grid);
        
        $('#article-sort').ddslick({
            onSelected: function(data){
                //console.log(data);
                sortArticles(data.selectedData.value, $grid);
            }
        });
    }
}

function setupFilters (options, grid) {
    var $btns = options.children();
    $('.article-filter button').eq(0).addClass('active'); 
    $btns.on('click', function() {
      var $this = $(this),
          isActive = $this.hasClass( 'active' ),
          article = isActive ? '' : $this.data('article'),
          buttons = $('.article-filter button');    
    
        if ( !isActive ) {
            buttons.removeClass('active');  
        }
        if ( isActive && $this != buttons.eq(0) ) {
            buttons.eq(0).addClass('active');
        }
        
        if ( isActive && buttons.eq(0) ) 
        {
            console.log("first");
        }
        else 
        {
            console.log("second");
            $this.toggleClass('active');
        }
      // Filter elements
        if(article != ""){
          grid.shuffle( 'shuffle', function ($el, shuffle){
            return $el.data('article') == article;  
          });
        } 
        else 
        {
            grid.shuffle( 'shuffle', 'all');        
        }
    });

    $btns = null;
}

function sortArticles(data, grid) {
    // Sorting options
      var sort = data,
          opts = {};

      // We're given the element wrapped in jQuery
      if ( sort === 'date-created' ) {
        opts = {
          reverse: true,
          by: function($el) {
            return $el.data('date-created');
          }
        };
      } else if ( sort === 'title' ) {
        opts = {
          by: function($el) {
            return $el.data('title').toLowerCase();
          }
        };
      }

      // Filter elements
      grid.shuffle('sort', opts);
  }



$(document).ready(function(){
    
    // Mobile Menu
    var $mobileMenu = $(".mobile-menu>ul");
    $mobileMenu.html($(".left-menu>nav>ul").html() + $(".right-menu>nav>ul").html());

    //$mobileMenu.find(".noNavArrow").remove();

    $mobileMenu.parent().meanmenu({
        meanMenuContainer: 'header',
        meanScreenWidth: 767,
        meanRevealPosition: 'left',
        meanRevealColour: 'rgb(0,70,0)', 
    });
    
    setupScreen();
    
});

$(window).resize(function(){
   
    $('#agree-slider').html('');
    setupScreen();
   
});


$(window).on('scroll', function() {
    
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = 150; 
    
    if(pageName == "home") {
    
        if(y_scroll_pos > scroll_pos_test) {
            $( "header img" ).addClass("main-logo");

            $( ".nav>li>a" ).addClass("fixed-link");

            $( "header" ).addClass("fixed-nav");
        }

        if(y_scroll_pos < scroll_pos_test) {
            $( "header img" ).removeClass("main-logo");

            $( ".nav>li>a" ).removeClass("fixed-link");

            $( "header" ).removeClass("fixed-nav");
        }
    }
    
});
                 