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

    $(".side-bar ul li, header ul li, .logo-container").click(function(event){
        event.stopImmediatePropagation();
        window.open("../", "_self");
    })

    function swapElements(el1, el2) {
        // Get the parent node of the elements
        const parent1 = el1.parentNode;
        const parent2 = el2.parentNode;
    
        // Get the next sibling of the elements
        const sibling1 = el1.nextSibling === el2 ? el1 : el1.nextSibling;
        const sibling2 = el2.nextSibling === el1 ? el2 : el2.nextSibling;
    
        // Move el1 to the position of el2
        parent2.insertBefore(el1, sibling2);
    
        // Move el2 to the position of el1
        parent1.insertBefore(el2, sibling1);
    }
    
    // Usage
    const element1 = document.getElementById('copyright');
    const element2 = document.getElementById('tmdb');
    swapElements(element1, element2);

    let hidden = true;

    $(".bars").click(function(event){
        event.stopImmediatePropagation();
        if (hidden) {
            $(".side-bar").animate({
                "left" : "0",
            }, 500);
            hidden = false;
        } else {
            $(".side-bar").animate({
                "left" : "-81vw",
            }, 500);
            hidden = true;
        }
    })
})