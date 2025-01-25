jQuery(document).ready(function($) {


    /*======= Skillset *=======*/
    
    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);
            
        });

    });
    
    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    $("#rss-feeds").rss(
    
        //Change this to your own rss feeds
        "http://feeds.feedburner.com/TechCrunch/startups",
        
        {
        // how many entries do you want?
        // default: 4
        // valid values: any integer
        limit: 3,
        
        // the effect, which is used to let the entries appear
        // default: 'show'
        // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
        effect: 'slideFastSynced',
        
        // outer template for the html transformation
        // default: "<ul>{entries}</ul>"
        // valid values: any string
        layoutTemplate: "<div class='item'>{entries}</div>",
        
        // inner template for each entry
        // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
        // valid values: any string
        entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        
        }
    );
    
    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "caseyscarborough", selector: "#ghfeed" });


});


document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('sideNavbar');
  
    function checkOverlap() {
      const sections = document.querySelectorAll('section'); // 獲取所有段落內容
      let isOverlapping = false;
  
      sections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
  
        // 檢查是否有交疊
        if (
          navbarRect.right > sectionRect.left &&
          navbarRect.left < sectionRect.right &&
          navbarRect.bottom > sectionRect.top &&
          navbarRect.top < sectionRect.bottom
        ) {
          isOverlapping = true;
        }
      });
  
      // 根據檢測結果隱藏或顯示導覽列
      if (isOverlapping) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
    }
  
    // 監聽畫面大小變化或滾動時重新檢測
    window.addEventListener('resize', checkOverlap);
    window.addEventListener('scroll', checkOverlap);
  
    // 初次檢測
    checkOverlap();
  });
  