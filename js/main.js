$(document).ready(function() {
    // 加载头部组件
    $("#header").load("components/header.html", function() {
        // 加载完成后激活当前导航链接
        activateNavLinks();
        // 检查初始滚动位置
        checkScroll();
    });
    
    // 加载页脚组件
    $("#footer").load("components/footer.html");
    
    // 绑定窗口滚动事件
    $(window).on('scroll', function() {
        checkScroll();
    });
    
    // 检查滚动位置并相应更新UI
    function checkScroll() {
        var scroll = $(window).scrollTop();
        
        // 导航栏样式变化
        if (scroll > 50) {
            $(".navbar").addClass("navbar-scrolled");
            $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
        } else {
            $(".navbar").removeClass("navbar-scrolled");
            $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
        }
        
        // 显示/隐藏回到顶部按钮
        if (scroll > 300) {
            $(".back-to-top").fadeIn();
        } else {
            $(".back-to-top").fadeOut();
        }
    }
    
    // 轮播图动画效果重置
    $('#heroCarousel').on('slide.bs.carousel', function (e) {
        // 当前激活的轮播项
        var activeItem = $(e.relatedTarget);
        
        // 移除旧动画
        $('.carousel-item').find('.hero-bg img').css('animation', 'none');
        
        // 根据轮播项索引设置不同的动画
        setTimeout(function() {
            var index = activeItem.index();
            var animation = 'kenburns 15s ease forwards';
            
            if (index === 1) {
                animation = 'kenburns-right 15s ease forwards';
            } else if (index === 2) {
                animation = 'kenburns-left 15s ease forwards';
            }
            
            activeItem.find('.hero-bg img').css('animation', animation);
        }, 50);
    });
    
    // 回到顶部按钮点击事件
    $(document).on('click', '.back-to-top', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    // 平滑滚动到锚点
    $(document).on('click', 'a[href*="#"]:not([href="#"])', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
                return false;
            }
        }
    });
    
    // 激活当前页面对应的导航链接
    function activateNavLinks() {
        var currentPage = window.location.pathname.split("/").pop();
        
        if (currentPage === "" || currentPage === "index.html") {
            $(".nav-link[href='index.html']").addClass("active");
        } else {
            $(".nav-link[href='" + currentPage + "']").addClass("active");
        }
    }
    
    // 轮播图初始化
    $('.carousel').carousel({
        interval: 5000
    });

    // 合作伙伴LOGO悬停效果
    $('.partner-logo').hover(
        function() {
            $(this).css('transform', 'scale(1.15)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // 跟踪墙滚动功能
    const slider = $('.testimonials-slider');
    const items = $('.testimonial-item');
    const itemWidth = items.outerWidth(true);
    const visibleItems = Math.min(4, items.length); // 最多显示4个
    let currentPosition = 0;
    const totalItems = items.length;
    let isAnimating = false; // 添加动画状态标志

    // 克隆元素，实现无缝循环
    // 在开头添加最后几个元素的克隆
    const lastItems = items.slice(-visibleItems).clone(true);
    lastItems.prependTo(slider);
    
    // 在结尾添加前几个元素的克隆
    const firstItems = items.slice(0, visibleItems).clone(true);
    firstItems.appendTo(slider);
    
    // 调整初始位置，从克隆的元素后开始
    currentPosition = -visibleItems * itemWidth;
    slider.css('transform', `translateX(${currentPosition}px)`);

    // 初始化滑块宽度（包括克隆的元素）
    slider.css('width', (totalItems + visibleItems * 2) * itemWidth);

    // 左右滚动控制 - 改为平滑循环
    $('.slider-next').click(function() {
        if (isAnimating) return; // 如果正在动画中，忽略点击
        isAnimating = true;
        
        currentPosition -= itemWidth;
        slider.css('transition', 'transform 0.5s ease');
        slider.css('transform', `translateX(${currentPosition}px)`);
        
        // 检测是否滚动到克隆区域
        setTimeout(() => {
            // 如果滚动到了末尾克隆区域
            if (currentPosition <= -(totalItems + visibleItems) * itemWidth) {
                // 无过渡效果地跳回实际内容区域
                slider.css('transition', 'none');
                currentPosition = -visibleItems * itemWidth;
                slider.css('transform', `translateX(${currentPosition}px)`);
            }
            isAnimating = false;
        }, 500); // 与过渡时间相同
    });

    $('.slider-prev').click(function() {
        if (isAnimating) return; // 如果正在动画中，忽略点击
        isAnimating = true;
        
        currentPosition += itemWidth;
        slider.css('transition', 'transform 0.5s ease');
        slider.css('transform', `translateX(${currentPosition}px)`);
        
        // 检测是否滚动到克隆区域
        setTimeout(() => {
            // 如果滚动到了开头克隆区域
            if (currentPosition > -visibleItems * itemWidth) {
                // 无过渡效果地跳回实际内容区域
                slider.css('transition', 'none');
                currentPosition = -(totalItems + visibleItems - 1) * itemWidth;
                slider.css('transform', `translateX(${currentPosition}px)`);
            }
            isAnimating = false;
        }, 500); // 与过渡时间相同
    });

    // 添加自动播放功能
    let slideInterval = setInterval(autoSlide, 5000); // 5秒切换一次
    
    function autoSlide() {
        if (!isAnimating) { // 只有在没有动画时才自动切换
            $('.slider-next').click(); // 触发下一张按钮点击
        }
    }
    
    // 鼠标悬停时暂停自动播放，移开后继续
    $('.testimonials-container').hover(
        function() {
            clearInterval(slideInterval);
        },
        function() {
            slideInterval = setInterval(autoSlide, 5000);
        }
    );

    // 响应式调整
    $(window).resize(function() {
        // 重新计算项目宽度
        const newItemWidth = $('.testimonial-item').outerWidth(true);
        
        // 调整滑块宽度
        slider.css('width', (totalItems + visibleItems * 2) * newItemWidth);
        
        // 重新定位到正确位置
        currentPosition = -visibleItems * newItemWidth;
        slider.css('transition', 'none');
        slider.css('transform', `translateX(${currentPosition}px)`);
    });
}); 