jQuery(document).ready(function ($) {
    //wrap each one of your filter in a .cd-gallery-container div container
    bouncy_filter($('.cd-gallery-container'));

    function bouncy_filter($container) {
        $container.each(function () {
            var $this = $(this);
            var filter_list_container = $this.children('.cd-filter'),
                filter_values = filter_list_container.find('li:not(.placeholder) a'),
                filter_list_placeholder = filter_list_container.find('.placeholder a'),
                filter_list_placeholder_text = filter_list_placeholder.text(),
                filter_list_placeholder_default_value = 'Selezionare',
                gallery_item_wrapper = $this.children('.cd-gallery').find('.cd-item-wrapper');

            //store gallery items
            var gallery_elements = {};
            filter_values.each(function () {
                var filter_type = $(this).data('type');
                gallery_elements[filter_type] = gallery_item_wrapper.find('li[data-type="' + filter_type + '"]');
            });

            //detect click event
            filter_list_container.on('click', function (event) {
                event.preventDefault();
                //detect which filter item was selected
                var selected_filter = $(event.target).data('type');

                //check if user has clicked the placeholder item (for mobile version)
                if ($(event.target).is(filter_list_placeholder) || $(event.target).is(filter_list_container)) {

                    (filter_list_placeholder_default_value === filter_list_placeholder.text()) ? filter_list_placeholder.text(filter_list_placeholder_text): filter_list_placeholder.text(filter_list_placeholder_default_value);
                    filter_list_container.toggleClass('is-open');

                    //check if user has clicked a filter already selected 
                } else if (filter_list_placeholder.data('type') == selected_filter) {

                    filter_list_placeholder.text($(event.target).text());
                    filter_list_container.removeClass('is-open');

                } else {
                    //close the dropdown (mobile version) and change placeholder text/data-type value
                    filter_list_container.removeClass('is-open');
                    filter_list_placeholder.text($(event.target).text()).data('type', selected_filter);
                    filter_list_placeholder_text = $(event.target).text();

                    //add class selected to the selected filter item
                    filter_values.removeClass('selected');
                    $(event.target).addClass('selected');

                    //give higher z-index to the gallery items selected by the filter
                    show_selected_items(gallery_elements[selected_filter]);

                    //rotate each item-wrapper of the gallery
                    //at the end of the animation hide the not-selected items in the gallery amd rotate back the item-wrappers

                    // fallback added for IE9
                    var is_explorer_9 = navigator.userAgent.indexOf('MSIE 9') > -1;

                    if (is_explorer_9) {
                        hide_not_selected_items(gallery_elements, selected_filter);
                        gallery_item_wrapper.removeClass('is-switched');
                    } else {
                        gallery_item_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                            hide_not_selected_items(gallery_elements, selected_filter);
                            gallery_item_wrapper.removeClass('is-switched');
                        });
                    }
                }
            });
        });
    }
});

function show_selected_items(selected_elements) {
    selected_elements.addClass('is-selected');
}

function hide_not_selected_items(gallery_containers, filter) {
    $.each(gallery_containers, function (key, value) {
        if (key !== filter) {
            $(this).removeClass('is-visible is-selected').addClass('is-hidden');

        } else {
            $(this).addClass('is-visible').removeClass('is-hidden is-selected');
        }
    });
}

//acá va el código del modal, si no funciona debe haber algo mal acá

// tomar el modal
var modal = document.getElementById('myModal');
//tomar la imagen dentro del modal
var modalImg = document.getElementById("img01");
//tomar el texto
var captionText = document.getElementById("caption");


var numpreguntas = [5, 5, 5, 5, 5, 5, 5, 5, 5];

var cat1preguntas = [
    'Chi ha composto l\'opera "la traviata"?',
    'Quale movimento artistico è venuto dopo il Rinascimento?',
    'Qual è il museo più importante di Firenze?',
    'Quale scrittore colombiano è intrinsecamente legato al realismo magico?',
    'In quale materiale è scolpito "Il David" da Michelangelo Buonarroti?',
    'Qual è l\'equivalente romano di Zeus?',
    'Qual è il dio della guerra nella mitologia romana?',
    'A quale movimento artistico appartiene il Duomo di Milano e la cattedrale di Lourdes a Bogotá?',
    'Chi è stato l\'autore della scultura "La Pietà"?',
    'Chi era il figlio di Venere nella mitologia dei Romani?',
    'Come si chiama il pittore italiano che ha dipinto "La nascita di Venere"?',
    'Quale scrittore colombiano ha scritto il libro "María"?'
];

var cat2preguntas = [
    'In quale regione della Colombia si parla la lingua Ticuna?',
    'Dove si trovano gli indigeni Embera?',
    'Qual è il primo popolo in Colombia che diventa indipendente dalla Spagna?',
    'Quale città italiana fu distrutta da un\'eruzione vulcanica?',
    'Qual è l\'isola più grande del Mediterraneo?',
    'Come si chiamano le montagne nel nord Italia?',
    'In quale città italiana si trova il "Castel dell’Ovo"?',
    'Come si chiamano le vette più alte della Sierra Nevada de Santa Marta?',
    'Qual è l\'area più piovosa della Colombia?',
    'Con quale paese la Colombia ha avuto una disputa territoriale e la delimitazione marittima negli ultimi anni?',
    'Di fronte a quale città è l\'isola di Capri?',
    'Qual è il più piccolo stato indipendente al mondo?'
];

var cat3preguntas = [
    'In quale contesto storico nasce il neorealismo italiano?',
    'A cosa si opponeva questo movimento cinematografico?',
    'Il neo-realismo italiano ha influenzato quella corrente cinematografica importante?'
];

var cat4preguntas = [
    'Dov\'è il gran premio della Formula 1 d\'Italia?',
    'Quali squadre di calcio affrontano nel gioco noto come il derby d\'Italia?',
    'Ciò che è dovuto la forte rivalità tra Juventus FC e SSC Napoli?'
];

var cat5preguntas = [
    'Quando è stata fondata la repubblica italiana? ',
    'Quale evento ha iniziato il Medioevo?',
    'Chi era il capo del movimento fascista in Italia?',
    'chi è l\'attuale presidente d\'Italia?',
    'Qual è la religione ufficiale in Italia?'
];

var cat6preguntas = [
    'Qual è il nome del chimico italiano che ha un numero, molto usato in chimica, chiamato in suo onore?',
    'Qual è il secondo pianeta più vicino al sole nel nostro sistema solare?',
    'A quale velocità viaggia la luce?',
    'A quale numero si riferisce la parola google?',
    'Per i colori in RGB, di che colore è la combinazione di tutti i colori?',
    'Per i colori in CMYK, di che colore è la combinazione di tutti i colori?'
];

var preguntas = [
    cat1preguntas,
    cat2preguntas,
    cat3preguntas,
    cat4preguntas,
    cat5preguntas,
    cat6preguntas
];

var cat1respuestas = [
    'R. Questa opera è stata creata da Giuseppe Verdi.',
    'R. Il barocco.',
    'R. Gabriel García Márquez. ',
    'R. Gabriel García Márquez. ',
    'R. Il David è una celebre scultura realizzata in marmo.',
    'R. Giove.',
    'R. Marte è il dio della guerra, dei duelli e degli spargimenti di sangue.',
    'R. All’\'arte gotica.',
    'R. La Pietà vaticana è una scultura marmorea di Michelangelo Buonarroti.',
    'R. Cupido.',
    'R. La Nascita di Venere è un\'opera iconica di Sandro Botticelli.',
    'R. María è un romanzo di Jorge Isaacs. '
];

var cat2respuestas = [
    'R. Il popolo di Tikuna si trova nel sud della Colombia, nel dipartimento di Amazonas.',
    'R. Questa città abita in alcune zone della costa del Pacifico.',
    'R. Palenque. ',
    'R. Pompeya.',
    'R. La Sicilia è la principale isola italiana e la più grande del Mediterraneo.',
    'R. Le Alpi sono la catena montuosa più importante d\'Europa.',
    'R. Il Castel dell\'Ovo è il castello più antico della città di Napoli.',
    'R. La vetta Simón Bolívar e la vetta Cristóbal Colón.',
    'R. Il Chocó si trova nell\'ecoregione che probabilmente ha la più alta piovosità del pianeta.',
    'R. Il Nicaragua.',
    'R. Napoli.',
    'R. Il Vaticano è una città-Stato indipendente dell\'Europa. È il più piccolo stato sovrano.'
];

var cat3respuestas = [
    'R.  Il neorealismo italiano nacque nel dopoguerra nel 1945.',
    'R. Il neorealismo italiano si opponeva al cinema artificiale, nella sua narrativa e nella sua estetica.',
    'R. La nuova ondata francese/ Nouvelle Vague.'
];

var cat4respuestas = [
    'R. Autodromo Nazionale di Monza, Monza, Italia. È uno dei più vecchi premi della formula 1.',
    'R. Juventus FC VS Intenazionale Milano.',
    'R. Alla divisione tra nord e sud Italia.'
];

var cat5respuestas = [
    'R.  1946, dopo le referendum per finire il fascismo.',
    'R. la caduta dell\'Impero Romano d\'Occidente.',
    'R. Benito Mussolini.',
    'R. Sergio Matarella.',
    'Non c\'è nessuna. Anche il vaticano è nell’Italia, il cattolicesimo non è la religione ufficiale d\'Italia.'
];

var cat6respuestas = [
    'R.   Amadeo Avogadro, il suo numero è la quantità che ha un mol di qualcosa.',
    'R.   Venere, primo è Mercurio, secondo Venere, terzo la Terra, poi Marte, Giove, Saturno, Urano  e Nettuno. ',
    'R. 300 000 km/s. La luce è una onda elettromagnete e, così, viaggia con la.velocità di questo tipo di onda.',
    'R. 1 seguito di 100 zeri.',
    'R. Bianco.',
    'R. Nero.'
];

var respuestas = [
    cat1respuestas,
    cat2respuestas,
    cat3respuestas,
    cat4respuestas,
    cat5respuestas,
    cat6respuestas
];

var id = [];
//var pos =[];
var img;
//var curans;
var i;
var j;
for (i = 1; i <= preguntas.length; i++) {
    for (j = 1; j <= preguntas[i - 1].length; j++) {
        if(j < 10){
            id.push("i0" + j + i);
        } else {
            id.push("i" + j + i);
        }
    }
}


img = document.getElementById(id[0]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[0].charAt(3) - 1][id[0].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[0].charAt(3) - 1][id[0].substr(1,2) - 1];
}
img = document.getElementById(id[1]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[1].charAt(3) - 1][id[1].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[1].charAt(3) - 1][id[1].substr(1,2) - 1];
}
img = document.getElementById(id[2]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[2].charAt(3) - 1][id[2].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[2].charAt(3) - 1][id[2].substr(1,2) - 1];
}
img = document.getElementById(id[3]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[3].charAt(3) - 1][id[3].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[3].charAt(3) - 1][id[3].substr(1,2) - 1];
}
img = document.getElementById(id[4]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[4].charAt(3) - 1][id[4].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[4].charAt(3) - 1][id[4].substr(1,2) - 1];
}
img = document.getElementById(id[5]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[5].charAt(3) - 1][id[5].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[5].charAt(3) - 1][id[5].substr(1,2) - 1];
}
img = document.getElementById(id[6]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[6].charAt(3) - 1][id[6].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[6].charAt(3) - 1][id[6].substr(1,2) - 1];
}
img = document.getElementById(id[7]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[7].charAt(3) - 1][id[7].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[7].charAt(3) - 1][id[7].substr(1,2) - 1];
}
img = document.getElementById(id[8]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[8].charAt(3) - 1][id[8].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[8].charAt(3) - 1][id[8].substr(1,2) - 1];
}
img = document.getElementById(id[9]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[9].charAt(3) - 1][id[9].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[9].charAt(3) - 1][id[9].substr(1,2) - 1];
}
img = document.getElementById(id[10]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[10].charAt(3) - 1][id[10].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[10].charAt(3) - 1][id[10].substr(1,2) - 1];
}
img = document.getElementById(id[11]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[11].charAt(3) - 1][id[11].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[11].charAt(3) - 1][id[11].substr(1,2) - 1];
}
img = document.getElementById(id[12]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[12].charAt(3) - 1][id[12].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[12].charAt(3) - 1][id[12].substr(1,2) - 1];
}
img = document.getElementById(id[13]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[13].charAt(3) - 1][id[13].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[13].charAt(3) - 1][id[13].substr(1,2) - 1];
}
img = document.getElementById(id[14]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[14].charAt(3) - 1][id[14].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[14].charAt(3) - 1][id[14].substr(1,2) - 1];
}
img = document.getElementById(id[15]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[15].charAt(3) - 1][id[15].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[15].charAt(3) - 1][id[15].substr(1,2) - 1];
}
img = document.getElementById(id[16]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[16].charAt(3) - 1][id[16].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[16].charAt(3) - 1][id[16].substr(1,2) - 1];
}
img = document.getElementById(id[17]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[17].charAt(3) - 1][id[17].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[17].charAt(3) - 1][id[17].substr(1,2) - 1];
}
img = document.getElementById(id[18]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[18].charAt(3) - 1][id[18].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[18].charAt(3) - 1][id[18].substr(1,2) - 1];
}
img = document.getElementById(id[19]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[19].charAt(3) - 1][id[19].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[19].charAt(3) - 1][id[19].substr(1,2) - 1];
}
img = document.getElementById(id[20]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[20].charAt(3) - 1][id[20].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[20].charAt(3) - 1][id[20].substr(1,2) - 1];
}
img = document.getElementById(id[21]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[21].charAt(3) - 1][id[21].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[21].charAt(3) - 1][id[21].substr(1,2) - 1];
}
img = document.getElementById(id[22]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[22].charAt(3) - 1][id[22].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[22].charAt(3) - 1][id[22].substr(1,2) - 1];
}
img = document.getElementById(id[23]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[23].charAt(3) - 1][id[23].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[23].charAt(3) - 1][id[23].substr(1,2) - 1];
}
img = document.getElementById(id[24]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[24].charAt(3) - 1][id[24].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[24].charAt(3) - 1][id[24].substr(1,2) - 1];
}
img = document.getElementById(id[25]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[25].charAt(3) - 1][id[25].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[25].charAt(3) - 1][id[25].substr(1,2) - 1];
}
img = document.getElementById(id[26]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[26].charAt(3) - 1][id[26].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[26].charAt(3) - 1][id[26].substr(1,2) - 1];
}
img = document.getElementById(id[27]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[27].charAt(3) - 1][id[27].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[27].charAt(3) - 1][id[27].substr(1,2) - 1];
}
img = document.getElementById(id[28]);
img.onclick = function () {
    modal.style.display = "block";
    modalImg.innerHTML = preguntas[id[28].charAt(3) - 1][id[28].substr(1,2) - 1];
    captionText.innerHTML = respuestas[id[28].charAt(3) - 1][id[28].substr(1,2) - 1];
}
img = document.getElementById(id[29]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[29].charAt(3) - 1][id[29].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[29].charAt(3) - 1][id[29].substr(1,2) - 1];
}
/*
img = document.getElementById(id[30]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[30].charAt(3) - 1][id[30].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[30].charAt(3) - 1][id[30].substr(1,2) - 1];
}
img = document.getElementById(id[31]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[31].charAt(3) - 1][id[31].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[31].charAt(3) - 1][id[31].substr(1,2) - 1];
}
img = document.getElementById(id[32]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[32].charAt(3) - 1][id[32].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[32].charAt(3) - 1][id[32].substr(1,2) - 1];
}
img = document.getElementById(id[33]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[33].charAt(3) - 1][id[33].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[33].charAt(3) - 1][id[33].substr(1,2) - 1];
}
img = document.getElementById(id[34]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[34].charAt(3) - 1][id[34].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[34].charAt(3) - 1][id[34].substr(1,2) - 1];
}
img = document.getElementById(id[35]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[35].charAt(3) - 1][id[35].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[35].charAt(3) - 1][id[35].substr(1,2) - 1];
}
img = document.getElementById(id[36]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[36].charAt(3) - 1][id[36].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[36].charAt(3) - 1][id[36].substr(1,2) - 1];
}
img = document.getElementById(id[37]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[37].charAt(3) - 1][id[37].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[37].charAt(3) - 1][id[37].substr(1,2) - 1];
}
img = document.getElementById(id[38]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[38].charAt(3) - 1][id[38].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[38].charAt(3) - 1][id[38].substr(1,2) - 1];
}
img = document.getElementById(id[39]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[39].charAt(3) - 1][id[39].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[39].charAt(3) - 1][id[39].substr(1,2) - 1];
}
img = document.getElementById(id[40]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[40].charAt(3) - 1][id[40].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[40].charAt(3) - 1][id[40].substr(1,2) - 1];
}
img = document.getElementById(id[41]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[41].charAt(3) - 1][id[41].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[41].charAt(3) - 1][id[41].substr(1,2) - 1];
}
img = document.getElementById(id[42]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[42].charAt(3) - 1][id[42].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[42].charAt(3) - 1][id[42].substr(1,2) - 1];
}
img = document.getElementById(id[43]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[43].charAt(3) - 1][id[43].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[43].charAt(3) - 1][id[43].substr(1,2) - 1];
}
img = document.getElementById(id[44]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[44].charAt(3) - 1][id[44].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[44].charAt(3) - 1][id[44].substr(1,2) - 1];
}
img = document.getElementById(id[45]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[45].charAt(3) - 1][id[45].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[45].charAt(3) - 1][id[45].substr(1,2) - 1];
}
img = document.getElementById(id[46]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[46].charAt(3) - 1][id[46].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[46].charAt(3) - 1][id[46].substr(1,2) - 1];
}
img = document.getElementById(id[47]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[47].charAt(3) - 1][id[47].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[47].charAt(3) - 1][id[47].substr(1,2) - 1];
}
/*
img = document.getElementById(id[48]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[48].charAt(3) - 1][id[48].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[48].charAt(3) - 1][id[48].substr(1,2) - 1];
}
img = document.getElementById(id[49]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[49].charAt(3) - 1][id[49].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[49].charAt(3) - 1][id[49].substr(1,2) - 1];
}
img = document.getElementById(id[50]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[50].charAt(3) - 1][id[50].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[50].charAt(3) - 1][id[50].substr(1,2) - 1];
}
img = document.getElementById(id[51]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[51].charAt(3) - 1][id[51].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[51].charAt(3) - 1][id[51].substr(1,2) - 1];
}
img = document.getElementById(id[52]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[52].charAt(3) - 1][id[52].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[52].charAt(3) - 1][id[52].substr(1,2) - 1];
}
img = document.getElementById(id[53]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[53].charAt(3) - 1][id[53].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[53].charAt(3) - 1][id[53].substr(1,2) - 1];
}
img = document.getElementById(id[54]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[54].charAt(3) - 1][id[54].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[54].charAt(3) - 1][id[54].substr(1,2) - 1];
}
img = document.getElementById(id[55]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[55].charAt(3) - 1][id[55].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[55].charAt(3) - 1][id[55].substr(1,2) - 1];
}
img = document.getElementById(id[56]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[56].charAt(3) - 1][id[56].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[56].charAt(3) - 1][id[56].substr(1,2) - 1];
}
img = document.getElementById(id[57]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[57].charAt(3) - 1][id[57].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[57].charAt(3) - 1][id[57].substr(1,2) - 1];
}
img = document.getElementById(id[58]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[58].charAt(3) - 1][id[58].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[58].charAt(3) - 1][id[58].substr(1,2) - 1];
}
img = document.getElementById(id[59]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[59].charAt(3) - 1][id[59].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[59].charAt(3) - 1][id[59].substr(1,2) - 1];
}
img = document.getElementById(id[60]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[60].charAt(3) - 1][id[60].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[60].charAt(3) - 1][id[60].substr(1,2) - 1];
}
img = document.getElementById(id[61]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[61].charAt(3) - 1][id[61].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[61].charAt(3) - 1][id[61].substr(1,2) - 1];
}
img = document.getElementById(id[62]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[62].charAt(3) - 1][id[62].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[62].charAt(3) - 1][id[62].substr(1,2) - 1];
}
img = document.getElementById(id[63]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[63].charAt(3) - 1][id[63].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[63].charAt(3) - 1][id[63].substr(1,2) - 1];
}
img = document.getElementById(id[64]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[64].charAt(3) - 1][id[64].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[64].charAt(3) - 1][id[64].substr(1,2) - 1];
}
img = document.getElementById(id[65]);
img.onclick = function () {
	modal.style.display = "block";	modalImg.innerHTML = preguntas[id[65].charAt(3) - 1][id[65].substr(1,2) - 1];
	captionText.innerHTML = respuestas[id[65].charAt(3) - 1][id[65].substr(1,2) - 1];
}
*/




// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

//when the user clicks aoutside, close
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
