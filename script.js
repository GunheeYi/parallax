document.addEventListener('DOMContentLoaded', function() {
    // MATHHHHH
    function randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값은 제외, 최솟값은 포함
    }

    var interval = 300;
    var indent = 100;
    var xIndex = 0;

    var scene = document.getElementById("scene");
    // var BBox = ;
    var W = window.innerWidth, H = window.innerHeight;

    Object.prototype.add = function(n, v) {
        if(this.tagName=="svg") {
            n = document.createElementNS("http://www.w3.org/2000/svg", n);
        } else {
            n = document.createElement("img").setAttribute("src", n);
        }
        for (var p in v) n.setAttribute(p, v[p]);

        this.appendChild(n);
    }

    document.body.add("./example.svg")

    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#666666', depth: 80});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#555555', depth: 90});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#777777', depth: 70});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#888888', depth: 60});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#999999', depth: 50});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#aaaaaa', depth: 40});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#bbbbbb', depth: 30});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#cccccc', depth: 20});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#dddddd', depth: 10});
    scene.add('rect', { X: W/2, Y: H/2, width: 80, height: 80, fill:'#eeeeee', depth: 0});


    function newHouse(c, r) {
        var house = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var width = randomInt(200, 250);
        var height = randomInt(200, 250);
        house.setAttribute("class", "redHover");
        house.setAttribute("width", width);
        house.setAttribute("height", height);
        house.setAttribute("x", indent + xIndex);
        xIndex += width;
        house.setAttribute("y", indent + interval * (c + 1) - height);
        house.setAttribute("class", "houseColor" + randomInt(1, 5));
        return house;
    }

    for (var c = 0; c < 5; c++) {
        for (var r = 0; r < 5; r++) {
            // scene.appendChild(newHouse(c, r));
        }
        xIndex = 0;
    }

    function parallex(el, W, H, x, y) {
        if (el.hasAttribute("depth")) {
            let d = Number(el.getAttribute("depth"));
            let scale = (1 - d/50) * 0.2;
            el.setAttribute("x", Number(el.getAttribute("X")) + ( x - W/2) * scale );
            el.setAttribute("y", Number(el.getAttribute("Y")) + ( y - H/2) * scale );
        }
        
        Array.from(el.children).forEach(c => {
            parallex(c, W, H, x, y);
        });
    };

    scene.addEventListener('mousemove', e => {
        parallex(scene, W, H, e.offsetX, e.offsetY);
    })

})


