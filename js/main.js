
$(document).ready(function() {
    let page = 1;

    $(".side-bar ul li, header ul li").click(function(event){
        event.stopImmediatePropagation();
        location.reload();
    })

    if ($(window).width() > 600) {
        $(".search").click(function(event){
            event.stopImmediatePropagation();
            $("html, body").css("overflow", "hidden");
            document.body.insertAdjacentHTML("afterbegin", `
            <div class="search-window">
                <div>
                    <input type="text" autocomplete="off" id="search" placeholder="Search a movie"/>
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="var(--orange)" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
                </div>
            </div>`);
            $(".search-window").click(function(event){
                $("html, body").css("overflow", "auto");
                $(this).remove();
            })
    
            $(".search-window > div").click(function(event){
                event.stopImmediatePropagation();
            })

            let searchEl = document.getElementById("search");

            searchEl.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    search(this.value);
                }
            });

            $(".search-window svg").click(function(event){
                event.stopImmediatePropagation();
                search(searchEl.value);
            })

            function search(movie) {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzM5NzQwMjk2YTdkNWU5YTRlYjhlZjU1ODZiMzJjMiIsIm5iZiI6MTcyMjgzMzQyMC41NDUxODcsInN1YiI6IjY2YTcyZWU0YWNkYzZjZGFmYWIxOWRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y6XhJVKCh3d3Uti3TcxV3qzwW5NZhJonFbK7z3as5jM'
                    }
                };

                fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US`, options)
                .then(response => response.json())
                .then(response => {
                    response = response.results;

                    document.getElementById("main").innerHTML = "";
                    $(".page-navigation").hide();

                    let x = 0;
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].release_date != '') {
                            let releaseDate = new Date(response[j].release_date);
                            let year = releaseDate.getFullYear();
                            year = year.toString();
                            
                            if (response[j].poster_path != null) {
                                url = `https://image.tmdb.org/t/p/w400${response[j].poster_path}`;
            
                                document.getElementById("main").insertAdjacentHTML("afterbegin", `
                                <div>
                                    <div class="movie" data-id='${response[j].id}'>
                                        <img src="${url}" alt="${response[j].title}"/>
                                        <p class="text-center"><span>(${year})</span><br>${response[j].title} </p>
                                    </div>
                                </div>`);

                                x += 1;
                            }
                        }
                    }

                    $(".movie").on("click", function(event){
                        event.stopImmediatePropagation();
                        let data = $(this).data("id");
    
                        $("html, body").css("overflow", "hidden");
                        
                        document.body.insertAdjacentHTML("afterbegin", `
                        <div class="watch-window">
                            <div>
                                <div class="close-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--orange)" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                                    </svg>
                                </div>
                                <iframe src="https://vidsrc.me/embed/movie?tmdb=${data}" allowfullscreen></iframe>
                            </div>
                        </div>`);
    
                        $(".close-button").click(function(event){
                            event.stopImmediatePropagation();
                            $("html, body").css("overflow", "auto");
                            $(".watch-window").remove();
                        })
                    })

                    if (x == 0) {
                        document.getElementById("main").insertAdjacentHTML("afterbegin", `
                        <div>Not found</div>`);
                    }

                    $(".search-window").remove();
                    $("html, body").css("overflow", "auto");
                })
            }
        })

    } else {

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
    }

    fetchMovies(page);
    
    function fetchMovies(n) {

        fetch(`https://vidsrc.xyz/movies/latest/page-${n}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data = data.result;
            document.getElementById("main").innerHTML = "";
    
            for (let i = 0; i < data.length; i++) {
                let origTitle = data[i].title;
                let title = origTitle.replace(/\s\d{4}$/, '');
        
                let yearMatch = origTitle.match(/\b(\d{4})\b$/);
        
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzM5NzQwMjk2YTdkNWU5YTRlYjhlZjU1ODZiMzJjMiIsIm5iZiI6MTcyMjgzMzQyMC41NDUxODcsInN1YiI6IjY2YTcyZWU0YWNkYzZjZGFmYWIxOWRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y6XhJVKCh3d3Uti3TcxV3qzwW5NZhJonFbK7z3as5jM'
                    }
                };

                if (yearMatch[1] > 2000) {
                    //search movie thumbnail..
                    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&include_adult=false&language=en-US`, options)
                    .then(response => response.json())
                    .then(response => {
                        response = response.results;
                        let found = false;
                    
                        for (let j = 0; j < response.length; j++) {
                            let releaseDate = new Date(response[j].release_date);
                            let year = releaseDate.getFullYear();
                            year = year.toString();
                            
                            if (response[j].title.includes(title) && year == yearMatch[1]) {
                                found = true;
                                

                                if (response[j].poster_path != null) {
                                    url = `https://image.tmdb.org/t/p/w400${response[j].poster_path}`;
                                    let res = data[i].tmdb_id;

                                    document.getElementById("main").insertAdjacentHTML("afterbegin", `
                                    <div>
                                        <div class="movie" data-id='${res}'>
                                            <img src="${url}" alt="${origTitle}"/>
                                            <p class="text-center"><span>(${year})</span><br>${title} </p>
                                        </div>
                                    </div>`);
                                }

                                break;
                            }
                        
                        }
        
                        $(".movie").on("click", function(event){
                            event.stopImmediatePropagation();
                            let data = $(this).data("id");
        
                            $("html, body").css("overflow", "hidden");
                            
                            document.body.insertAdjacentHTML("afterbegin", `
                            <div class="watch-window">
                                <div>
                                    <div class="close-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--orange)" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                                        </svg>
                                    </div>
                                    <iframe src="https://vidsrc.me/embed/movie?tmdb=${data}" allowfullscreen></iframe>
                                </div>
                            </div>`);
        
                            $(".close-button").click(function(event){
                                event.stopImmediatePropagation();
                                $("html, body").css("overflow", "auto");
                                $(".watch-window").remove();
                            })
                        })
        
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

                        $("#page").html(n);
        
                        if (!found) {
                            //console.log(origTitle);
                        }
                    })
                }
            }

        })
    }

    $("#next").click(function(event){
        event.stopImmediatePropagation();
        page += 1;
        fetchMovies(page);
    })

    $("#prev").click(function(event){
        event.stopImmediatePropagation();

        if (page > 1) {
            page -= 1;
            fetchMovies(page);
        }
        
    })
})

