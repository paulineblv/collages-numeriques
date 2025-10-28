const log = document.getElementById("log");
const input = document.querySelector("input");
const elements = document.getElementsByClassName("disparait");



var truc;

let l = [];
let nbre = [];
$(document).ready(function () {


	
    truc = $("#pic")[0]; // global variable
    var getCanvas; // global variable
    $("#btn-Convert-Html2Image").on('click', function () {
        
        html2canvas(truc, {
        onrendered: function (canvas) {
        $("#previewImage").append(canvas);
                   getCanvas = canvas;
        }
            });
    

        var imgageData = getCanvas.toDataURL("image/jpeg");
        // Now browser starts downloading it instead of just showing it
        var newData = imgageData.replace(/^data:image\/jpeg/, "data:application/octet-stream");
        $("#btn-Convert-Html2Image").attr("download", "your_pic_name.png").attr("href", newData);

        
        });
         

        Papa.parse("tableau.csv", {
            download: true,
            header: true,
            delimiter: ";", 
            step: function (row) {
                console.log("Lettre lue :", JSON.stringify(row.data[0].Lettre)); 
                l.push(row.data[0].Lettre);
                nbre.push(parseInt(row.data[0].Nombre));
            },
            complete: function (results) {
            }
        });
});

//inclinaison message de base -------------------------------------------------------------
Array.from(elements).forEach(img => {
    const angle = Math.floor(Math.random() * 5) - 2;
    img.style.transform = "rotate(" + angle + "deg)";
});

//sélection des fonds avec image personnalisée ----------------------------------------
$(function () {
    $('.content').hide();

    $('#background-select').change(function () {
        const selected = $(this).val();

        if (selected === "custom") {
            $('#custom-bg-upload').click(); // Ouvre le sélecteur d'image
        } else {
            $('.content').hide();

            if (selected === "") {
                // Fond blanc = rien d'affiché
                $('#pic').css("background-image", "");
            } else {
                $('#' + selected).show();
                $('#pic').css("background-image", ""); // Retire fond custom
            }
        }
    });

    $('#custom-bg-upload').on("change", function (event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#pic').css({
                    "background-image": `url(${e.target.result})`,
                    "background-size": "cover",
                    "background-repeat": "no-repeat",
                    "background-position": "center"
                });

                // Cacher les autres fonds
                $('.content').hide();
            };
            reader.readAsDataURL(file);
        }
    });
});


 //déroulement crédits ----------------------------------------------------------------

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
    if (e.key === ' ') {
        const div = document.createElement('div');
        div.classList.add("espace");
        document.getElementById('pic').appendChild(div);
        return;
    }

    if (e.key === 'Enter') {
        const div = document.createElement('div');
        div.classList.add("enter");
        document.getElementById('pic').appendChild(div);
        return;
    }

    if (e.key === "Delete") {
        return;
    }

    const lettreBrute = e.key;
    const lettreMaj = lettreBrute.toUpperCase();
    const lettreMin = lettreBrute.toLowerCase();

    // Debug : voir la touche tapée
    console.log("Lettre pressée :", JSON.stringify(lettreMaj));

    // Normalisation et recherche dans le tableau
    let index = 0;
    let match = false;
    for (let i = 0; i < l.length; i++) {
        if (lettreMaj.normalize("NFD") === l[i].normalize("NFD")) {
            index = Math.floor(Math.random() * nbre[i]);
            match = true;
            break;
        }
    }

    if (!match) {
        console.warn("Caractère non trouvé dans le CSV :", lettreMaj);
        return;
    }

    // Mapping caractères spéciaux vers des noms de dossier compatibles
    const nomDossier = mapCaractereSpecial(lettreMaj);
    const nomFichier = mapCaractereSpecial(lettreMin) + index;

    const img = document.createElement('img');
    const cheminImage = "medias/Lettres/" + encodeURIComponent(nomDossier) + "/" + encodeURIComponent(nomFichier) + ".png";
    console.log("Image source :", cheminImage);

    img.src = cheminImage;
    img.classList.add("images");

    // Si l’image n’existe pas
    img.onerror = function () {
        console.warn("Image introuvable :", img.src);
        img.src = "medias/Lettres/defaut.png";
    };

    document.getElementById('pic').appendChild(img);

    // Inclinaison
    const angle = Math.floor(Math.random() * 5) - 2;
    img.style.transform = "rotate(" + angle + "deg)";
}

// Fonction utilitaire pour mapper les caractères spéciaux vers des noms de dossier compatibles
function mapCaractereSpecial(char) {
    const map = {
        ":": "colon",
        "?": "question",
        "-": "dash",
        "À": "A_grave",
        "à": "a_grave",
        "-": "tiret"
        // Ajoute ici d'autres remplacements si besoin
    };
    return map[char] || char;
}


//Pouvoir supprimer au fur et à mesure ----------------------------------------------------------------

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

// faire son propre tableau

