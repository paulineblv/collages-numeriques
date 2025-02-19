const log = document.getElementById("log");
const input = document.querySelector("input");
const elements = document.getElementsByClassName("disparait");

//inclinaison message de base -------------------------------------------------------------
Array.from(elements).forEach(img => {
    const angle = Math.floor(Math.random() * 5) - 2;
    img.style.transform = "rotate(" + angle + "deg)";
});

//sélection des fonds ----------------------------------------------------------------
$(function() {
    $('.content').hide();
    $('#background-select').change(function() {
       $('.content').hide();
       $('#' + $(this).val()).show();
    });
 });

 //déroulement crédits

 var positionXcredits = window.innerWidth - 20;
 var positionXcreditsApres = window.innerWidth - 425;
 document.getElementById("rectangle-credits").style.left =  positionXcredits + "px";
document.getElementById("rectangle-credits").addEventListener("mouseenter", showCredits);
document.getElementById("rectangle-credits").addEventListener("mouseout", hideCredits);

function showCredits() {
    document.getElementById("rectangle-credits").style.left = positionXcreditsApres + "px";
}

function hideCredits() {
    document.getElementById("rectangle-credits").style.left = positionXcredits + "px";
}

//effacer message de base -------------------------------------------------------------
input.addEventListener("click", eraseMessage);

function eraseMessage(event) {
    Array.from(elements).forEach(element => {
        element.style.display = "none";
    });
}



//fonction de génération de collages -------------------------------------------------------------
input.addEventListener("keypress", logKey);

function logKey(e) {

    //   log.textContent += ` ${e.key}`;

    //insertion des espaces -------------------------------------------------------------
    if (e.key === ' ') {
        var div = document.createElement('div');
        document.getElementById('pic').appendChild(div);
        div.classList.add("espace");

        //insertion des lettres -------------------------------------------------------------
    } else if (e.key === 'Enter') {
        var div = document.createElement('div');
        document.getElementById('pic').appendChild(div);
        div.classList.add("enter");

    } else if (e.key === "Delete") {
        console.log("coucou");

    } else {
        var lettre = e.key.toLowerCase();
        var lettreMaj = e.key.toUpperCase();



        console.log(lettre);


        var img = document.createElement('img');
        img.src = "medias/Lettres/" + lettreMaj + "/" + lettre + ".png";
        img.classList.add("images");

        document.getElementById('pic').appendChild(img);

        

        //angle des images -------------------------------------------------------------
        const images = document.getElementsByTagName("img");

        Array.from(images).forEach(img => {
            if (!img.closest('.content')) {
                const angle = Math.floor(Math.random() * 5) - 2;
                img.style.transform = "rotate(" + angle + "deg)";
            }
        });


    }




}

//Pouvoir supprimer au fur et à mesure

document.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
        const picContainer = document.getElementById('pic');
        const elements = picContainer.children; 
        
        if (elements.length > 0) {
            const lastElement = elements[elements.length - 1]; 
            picContainer.removeChild(lastElement);
        }
    }
});