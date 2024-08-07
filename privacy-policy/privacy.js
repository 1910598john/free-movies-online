$(document).ready(function(){
    setTimeout(() => {
        $(".preload-logo").animate({
            "opacity" : "0"
        }, "fast")
        $(".preload").addClass("preload2");
    }, 1000)
    
    setTimeout(function () {
        $(".preload-logo").remove();
        $(".preload").remove();
    }, 2000);
})