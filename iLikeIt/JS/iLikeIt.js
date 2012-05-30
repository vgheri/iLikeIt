//iLikeIt v0.1.0 | (c) 2012 Valerio Gheri | http://www.opensource.org/licenses/mit-license
/*var iLikeIt = */(function ($) {
    /* 
    * Get a text representation of the vote cast by the user
    */
    function getStarShortTextDescription(starId) {
        var description;
        switch (starId) {
            case "1":
                description = "Awful";
                break;
            case "2":
                description = "Nothing special";
                break;
            case "3":
                description = "Not bad";
                break;
            case "4":
                description = "Nice";
                break;
            case "5":
                description = "I like it!";
                break;
            default:
                description = "Unknown rate";
                break;
        }
        return description;
    }

    /*
    * Show the user its rating by coloring (mouse over) or uncoloring (mouse out) the stars
    */
    function displayRating(selectedId, mouseIn) {
        var activeImage = $(".active img");
        if (activeImage.data("vote") === null || activeImage.data("vote") === undefined) {
            var divs = $(".star-container div").slice(0, parseInt(selectedId)).each(function (item) {
                if (mouseIn) {
                    $(this).find("img").attr("src", '/Content/images/full_star.png');
                }
                else {
                    $(this).find("img").attr("src", '/Content/images/empty_star.png');
                }
            });
            if (mouseIn) {
                $(".star-text").text(getStarShortTextDescription(selectedId));
            }
            else {
                $(".star-text").text("");
            }
        }
    }

    /*
    * Reset the vote panel
    */
    function resetStarContainer() {
        var divs = $(".star-container div").slice(0, 5).each(function (item) {
            $(this).find("img").attr("src", '/Content/images/empty_star.png');
        });
        $(".carousel-vote-title").text("Vote");
        $(".star-text").text("");
    }

    /* 
    * Preload the vote panel with the vote already cast by the user, if any.
    */
    function preloadRating() {
        var activeImage = $(".active img");
        var vote = activeImage.data("vote");
        resetStarContainer();
        if (vote != null && vote != undefined) {
            var divs = $(".star-container div").slice(0, parseInt(vote)).each(function (item) {
                $(this).find("img").attr("src", '/Content/images/full_star.png');
            });
            $(".carousel-vote-title").text("Average rating");
            $(".star-text").text(getStarShortTextDescription(vote));
        }
        return true;
    }

    /* 
    *  Register the vote cast by the user submitting it to the server.
    *  On success, we display the average rating.
    *  On error, we display an alert to the user and reset the vote panel
    */
    function registerVote(star) {
        var votedImage = $(".active img");
        // If the user didn't vote yet, then we can register the vote
        if (votedImage.data("vote") === null || votedImage.data("vote") === undefined) {
            $(".carousel-vote-title").text("Submitting your vote...");
            $.ajax({
                type: 'POST',
                url: 'Home/RegisterVote',
                data: '{"imageName":"' + votedImage.src + '", "star":"' + star.attr("id") + '"}',
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    votedImage.data("vote", msg);
                    preloadRating();
                },
                error: function () {
                    alert("Ooops, an error has occurred. Please try again and if the problem persists... well it's just a proof of concept app, what did you expect?");
                    resetStarContainer();
                    return false;
                }
            });
        }
    }

    function createVotingDiv() {
        var votingDiv = '<div class="center carousel-vote">';
        votingDiv += '<span class="carousel-vote-title">Vote</span>';
        votingDiv += '<span class="star-text"></span>';
        votingDiv += '<div class="star-container">';
        votingDiv += '<div class="vote-item"><img id="1" class="star" src="/Content/images/empty_star.png")" alt="1" /></div>';
        votingDiv += '<div class="vote-item"><img id="2" class="star" src="/Content/images/empty_star.png")" alt="2" /></div>';
        votingDiv += '<div class="vote-item"><img id="3" class="star" src="/Content/images/empty_star.png")" alt="3" /></div>';
        votingDiv += '<div class="vote-item"><img id="4" class="star" src="/Content/images/empty_star.png")" alt="4" /></div>';
        votingDiv += '<div class="vote-item"><img id="5" class="star" src="/Content/images/empty_star.png")" alt="5" /></div>';
        votingDiv += '</div></div>';
        return votingDiv;
    }

    $.fn.iLikeIt = function () {

        var div = createVotingDiv();

        var element = $(this);
        element.append(div);
        //$("#myCarousel").append(div);

        element.carousel({
            interval: false,
            pause: "hover"
        });
        element.carousel('pause');

        $(".carousel-vote").on("mouseenter", function () {
            preloadRating();
        });

        $(".vote-item").on("mouseover", "img", function () {
            var elem = $(this);
            displayRating(elem.attr("id"), true);
        });

        $(".vote-item").on("mouseout", "img", function () {
            var elem = $(this);
            displayRating(elem.attr("id"), false);
        });

        $(".vote-item").on("click", "img", function () {
            var elem = $(this);
            registerVote(elem);
        });

        return this; //allow chaining
    }
} (jQuery));