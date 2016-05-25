(function () {
    $(init);
    
    function init() {
        // alert("Hello from jQuery");
        $.ajax({
            url: "http://food2fork.com/api/search?key=d437cb742498086f536580cbe90b0e27&q=shredded%20chicken",
            success: renderRecipes
        });
    }
    
    function renderRecipes(response) {
        console.log(response);
        
    }


})();