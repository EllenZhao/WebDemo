//判断是否引用了JQuery的JS文件
if (typeof jQuery == "undefined") {
    alert("slider工具需要JQuery的支持，请引用JQuery文件！");
} else {
    var Slider = function (config) {
        var defaultConfig = {
            renderTo: "",       //渲染到的目标DIV，默认渲染到BODY中并显示到最后
            width: null,        //宽度
            height: null,       //高度
            x: null,            //X坐标
            y: null,            //Y坐标
            images: [],         //图片列表
            showIndex: true,
            displayTime: 5000   //每张图片显示时间，默认5秒
        };

        $.extend(defaultConfig, config);

        var renderTo = defaultConfig.renderTo;
        var width = defaultConfig.width;
        var height = defaultConfig.height;
        var x = defaultConfig.x;
        var y = defaultConfig.y;
        var images = defaultConfig.images;
        var showIndex = defaultConfig.showIndex;
        var displayTime = defaultConfig.displayTime;
        var currentIndex = 0;

        this.setWidth = function (value) {
            defaultConfig.width = value;
            width = value;
        }
        this.getWidth = function () {
            return width;
        }

        if (typeof Slider._initialized == "undefined") {
            //将Slider渲染到目标DIV中
            var sliderTarget;
            if (renderTo != null && renderTo.trim() != "") {
                sliderTarget = $("#" + renderTo);
            } else {
                $("body").append("<div id='slider'></div>")
                sliderTarget = $("#slider");
            }
            sliderTarget.css({
                "position": "relative",
                "margin": "0 auto 0 auto"
            });

            //添加显示图片的列表
            sliderTarget.append("<ul id='slider-list'></ul>")
            var sliderList = $("#slider-list");
            sliderList.css({
                "list-style": "none",
                "margin": "0 0 0 -40px",
                "position": "relative"
            });

            sliderTarget.append("<div id='preBtn'>&lt;</div>")
            var preBtn = $("#preBtn");
            preBtn.css({
                "width": "50px",
                "height": "100px",
                "background-color": "black",
                "opacity": "0.5",
                "position": "absolute",
                "left": "0px",
                "top": "50%",
                "color": "white",
                "text-align": "center",
                "line-height": "100px",
                "font-size": "30px",
                "cursor": "pointer",
                "margin-top": "-50px"
            });

            preBtn.click(function () {
                clearInterval(timer);
                currentIndex--;
                animate(currentIndex);
                timer = setInterval(function () {
                    currentIndex++;
                    animate(currentIndex);
                }, displayTime);
            });

            sliderTarget.append("<div id='nextBtn'>&gt;</div>")
            var nextBtn = $("#nextBtn");
            nextBtn.css({
                "width": "50px",
                "height": "100px",
                "background-color": "black",
                "opacity": "0.5",
                "position": "absolute",
                "right": "0px",
                "top": "50%",
                "color": "white",
                "text-align": "center",
                "line-height": "100px",
                "font-size": "30px",
                "cursor": "pointer",
                "margin-top": "-50px"
            });

            nextBtn.click(function () {
                clearInterval(timer);
                currentIndex++;
                animate(currentIndex);
                timer = setInterval(function () {
                    currentIndex++;
                    animate(currentIndex);
                }, displayTime);
            });

            //小圆点层
            sliderTarget.append("<div id='index-panel'></div>")
            var indexPanel = $("#index-panel");
            indexPanel.css({
                "height": "50px",
                "position": "absolute",
                "bottom": "0px",
                "left": "0px",
                "right": "0px",
                "text-align": "center"
            });

            //添加图片
            for (var i = 0; i < images.length; i++) {
                var img = "<img src='" + images[i].src + "' />";
                sliderList.append("<li class='slider-panel' data-index=" + i + "></li>")
                var sliderPanel = $(".slider-panel:last");
                sliderPanel.append(img);
                indexPanel.append("<span data-index=" + i + "></span>");
                var sliderBtn = $("#index-panel span");
                sliderBtn.css({
                    "width": "12px",
                    "height": "12px",
                    "background-color": "gray",
                    "border-radius": "50%",
                    "display": "inline-block",
                    "margin": "0 4px",
                    "cursor": "pointer"
                });

                $("#index-panel span:first").css("background-color", "red");
            }

            $(".slider-panel").hover(function () {
                clearInterval(timer);
                //$(".slider-panel").css("cursor","pointer");
            }, function () {
                timer = setInterval(function () {
                    currentIndex++;
                    animate(currentIndex);
                }, displayTime);
            });

            $("#index-panel span").click(function (e) {
                clearInterval(timer);
                currentIndex = e.target.getAttribute("data-index");
                animate(currentIndex);
                timer = setInterval(function () {
                    currentIndex++;
                    animate(currentIndex);
                }, displayTime);
            });

            function animate(index) {
                if (currentIndex == images.length) {
                    currentIndex = 0;
                }
                if (currentIndex < 0) {
                    currentIndex = images.length - 1;
                }
                sliderList.find("li").hide().eq(currentIndex).fadeToggle(800);
                indexPanel.find("span").css("background-color", "gray").eq(currentIndex).css("background-color", "red")
            }

            var timer = setInterval(function () {
                currentIndex++;
                animate(currentIndex);
            }, displayTime);

            //隐藏除第一张以外的所有图片
            $(".slider-panel:not(:first)").hide();

            //设置图片宽度
            if (width == null) {
                $(".slider-panel img").css("width", "100%");
            } else if (typeof width == "number") {
                $(".slider-panel img").css("width", width + "px");
                sliderTarget.css("width", width + "px");
            } else if (typeof width == "string" && width.endsWith("%")) {
                $(".slider-panel img").css("width", width);
                sliderTarget.css("width", width);
            }

            //设置图片高度
            if (height == null) {
                $(".slider-panel img").css("height", "100%");
            } else if (typeof height == "number") {
                $(".slider-panel img").css("height", height + "px");
            } else if (typeof height == "string" && height.endsWith("%")) {
                $(".slider-panel img").css("height", height);
            }

        }
        Slider._initialized = true;
    }
}