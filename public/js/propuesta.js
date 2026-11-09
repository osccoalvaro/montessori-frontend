
const tabsData = [

    /* =========================================
       INICIAL
       ========================================= */

    {
        title: "Inicial",

        description:
            "Un espacio seguro para aprender, explorar y crecer con propósito desde el inicio de su etapa escolar.",

        iconImage: "img/monoinicial.png",

        bentoImages: [
            "img/inicial1a_o.webp",
            "img/inicial2_o.webp",
            "img/inicial3_o.webp"
        ],

        features: [
            {
                icon: "img/ludico.svg",
                title: "Aprendizaje lúdico",
                description: "Actividades lúdicas que favorecen el aprendizaje."
            },
            {
                icon: "img/comunicacion.svg",
                title: "Habilidades",
                description: "Desarrollo comunicativo, matemático y en inglés."
            },
            {
                icon: "img/auxiliar.svg",
                title: "Auxiliar en aula",
                description: "Apoyo para actividades complementarias."
            },
            {
                icon: "img/alivio.svg",
                title: "Soporte emocional",
                description: "Acompañamiento de un Departamento de Psicología."
            },
            {
                icon: "img/ingles.svg",
                title: "Inglés",
                description: "Experiencias dinámicas para aprender inglés."
            },
            {
                icon: "img/facil-usar.svg",
                title: "Autonomía",
                description: "Fomentamos autonomía, seguridad y convivencia."
            }
        ]
    },


    /* =========================================
       PRIMARIA
       ========================================= */

    {
        title: "Primaria",

        description:
            "Potenciamos el aprendizaje, autonomía y habilidades socioemocionales para que cada estudiante crezca seguro.",

        iconImage: "img/monoprimaria.png",

        bentoImages: [
            "img/primaria1_o.webp",
            "img/primaria2_o.webp",
            "img/primaria3_o.webp"
        ],

  features: [
    {
        icon: "img/ludico.svg",
        title: "Lectura y matemática",
        description: "Aprendizaje integral con énfasis en lectura y matemáticas."
    },
    {
        icon: "img/auxiliar.svg",
        title: "Trabajo colaborativo",
        description: "Desarrollamos comunicación, responsabilidad y respeto."
    },
    {
        icon: "img/kinder.svg",
        title: "Aulas interactivas",
        description: "Clases más dinámicas, visuales e interactivas."
    },
    {
        icon: "img/alivio.svg",
        title: "Soporte emocional",
        description: "Acompañamiento de un Departamento de Psicología."
    },
    {
        icon: "img/ingles.svg",
        title: "Inglés",
        description: "Fortalecemos progresivamente las habilidades en inglés."
    },
    {
        icon: "img/facil-usar.svg",
        title: "Autonomía",
        description: "Fomentamos responsabilidad, confianza y autonomía."
    }
]
    },


    /* =========================================
       SECUNDARIA
       ========================================= */

    {
        title: "Secundaria",

        description:
            "Programas especializados que preparan a los estudiantes para el éxito universitario y profesional.",

        iconImage: "img/monosec4t3.png",

        bentoImages: [
            "img/secundaria1_o.webp",
            "img/secundaria2_o.webp",
            "img/secundaria3_o.webp"
        ],

       features: [
    {
        icon: "img/check.svg",
        title: "Pensamiento crítico",
        description: "Fortalecemos comprensión lectora y razonamiento matemático."
    },
    {
        icon: "img/proyecto.svg",
        title: "Proyectos",
        description: "Desarrollamos investigación, argumentación y trabajo en equipo."
    },
    {
        icon: "img/universidad.svg",
        title: "Orientación vocacional",
        description: "Orientamos a los estudiantes en su elección profesional."
    },
    {
        icon: "img/alivio.svg",
        title: "Soporte emocional",
        description: "Acompañamiento de un Departamento de Psicología."
    },
    {
        icon: "img/ingles.svg",
        title: "Inglés",
        description: "Desarrollamos competencias comunicativas en inglés."
    },
    {
        icon: "img/proyeccion.svg",
        title: "Proyección",
        description: "Preparamos a nuestros estudiantes para nuevos desafíos."
    }
]
    }

];


/* =========================================
   VARIABLES
   ========================================= */

let bentoIndex = 0;
let bentoInterval;
let tabTimeout;

let dragStartX = 0;
let dragStartY = 0;
let isDragging = false;


/* =========================================
   ELEMENTOS DEL DOM
   ========================================= */

const textContainer = document.getElementById("tab-text-container");
const titleEl = document.getElementById("tab-title");
const descEl = document.getElementById("tab-description");
const iconImageEl = document.getElementById("tab-nivel-image");
const bentoContainer = document.getElementById("options-container");
const buttons = document.querySelectorAll(".tab-btn");


/* =========================================
   ACTUALIZAR CARACTERÍSTICAS
   ========================================= */

function updateFeatures(index) {

    const features = tabsData[index].features;

    features.forEach((feature, i) => {

        const number = i + 1;

        const icon = document.getElementById(
            `digitalizacion-icono-${number}`
        );

        const title = document.getElementById(
            `digitalizacion-titulo-${number}`
        );

        const description = document.getElementById(
            `digitalizacion-descripcion-${number}`
        );


        icon.src = feature.icon;
        icon.alt = feature.title;

        title.textContent = feature.title;

        description.textContent = feature.description;

    });
}


/* =========================================
   CAMBIAR DE NIVEL
   ========================================= */

function changeTab(index) {

    clearTimeout(tabTimeout);

    const tab = tabsData[index];


    /* Animación de salida */
    textContainer.classList.add("fade-out");


    /* Actualizar botón activo */

    buttons.forEach((button, i) => {

        button.classList.toggle(
            "active",
            i === index
        );

    });


    /* Cambiar contenido */

    tabTimeout = setTimeout(() => {

        titleEl.textContent = tab.title;

        descEl.textContent = tab.description;

        iconImageEl.src = tab.iconImage;

        iconImageEl.alt = tab.title;


        /* NUEVO:
           Actualizar los 6 bloques */

        updateFeatures(index);


        /* Mostrar contenido */

        textContainer.classList.remove("fade-out");


        /* Actualizar Bento */

        updateBento(index, bentoIndex);

    }, 200);
}


/* =========================================
   CREAR / ACTUALIZAR BENTO
   ========================================= */

function updateBento(index, targetImageIndex = 0) {

    const images = tabsData[index].bentoImages;

    bentoContainer.innerHTML = "";


    if (targetImageIndex >= images.length) {
        targetImageIndex = 0;
    }


    bentoIndex = targetImageIndex;


    images.forEach((image, i) => {

        const option = document.createElement("div");

        option.classList.add("option");


        if (i === bentoIndex) {
            option.classList.add("active");
        }


        option.style.backgroundImage = `url("${image}")`;


        /* =========================================
           CLICK / TAP
           ========================================= */

        option.addEventListener("click", () => {

            // Si hubo un desplazamiento, no lo tratamos como click
            if (isDragging) {
                return;
            }

            setBentoActive(i);

            startBentoAutoSlide();

        });


        /* =========================================
           INICIO DEL GESTO
           ========================================= */

        option.addEventListener("pointerdown", (event) => {

            dragStartX = event.clientX;
            dragStartY = event.clientY;

            isDragging = false;

            option.setPointerCapture(event.pointerId);

        });


        /* =========================================
           MOVIMIENTO
           ========================================= */

        option.addEventListener("pointermove", (event) => {

            const deltaX = event.clientX - dragStartX;
            const deltaY = event.clientY - dragStartY;


            // Distancia mínima para considerar que realmente está arrastrando
            if (Math.abs(deltaX) > 10) {

                // Evita confundir un movimiento vertical con horizontal
                if (Math.abs(deltaX) > Math.abs(deltaY)) {

                    isDragging = true;

                }

            }

        });


        /* =========================================
           FINALIZAR GESTO
           ========================================= */

        option.addEventListener("pointerup", (event) => {

            const deltaX = event.clientX - dragStartX;
            const deltaY = event.clientY - dragStartY;


            // Solo consideramos swipe si el movimiento fue principalmente horizontal
            if (
                isDragging &&
                Math.abs(deltaX) > Math.abs(deltaY)
            ) {

                const minimumSwipe = 50;


                /* =====================================
                   DESLIZAR HACIA LA IZQUIERDA
                   ===================================== */

                if (deltaX < -minimumSwipe) {

                    nextBentoImage();

                }


                /* =====================================
                   DESLIZAR HACIA LA DERECHA
                   ===================================== */

                else if (deltaX > minimumSwipe) {

                    previousBentoImage();

                }

            }


            // Pequeño retraso para evitar que pointerup
            // sea interpretado como click
            setTimeout(() => {

                isDragging = false;

            }, 50);

        });


        /* =========================================
           CANCELAR GESTO
           ========================================= */

        option.addEventListener("pointercancel", () => {

            isDragging = false;

        });


        bentoContainer.appendChild(option);

    });


    startBentoAutoSlide();
}

/* =========================================
   ACTIVAR IMAGEN BENTO
   ========================================= */

function setBentoActive(index) {

    const options =
        bentoContainer.querySelectorAll(".option");


    if (!options.length || !options[index]) {
        return;
    }


    options.forEach(option => {

        option.classList.remove("active");

    });


    options[index].classList.add("active");

    bentoIndex = index;
}




/* =========================================
   SIGUIENTE IMAGEN
   ========================================= */

function nextBentoImage() {

    const images = tabsData[
        [...buttons].findIndex(button =>
            button.classList.contains("active")
        )
    ].bentoImages;


    if (!images.length) {
        return;
    }


    bentoIndex =
        (bentoIndex + 1) % images.length;


    setBentoActive(bentoIndex);

    startBentoAutoSlide();
}


/* =========================================
   IMAGEN ANTERIOR
   ========================================= */

function previousBentoImage() {

    const images = tabsData[
        [...buttons].findIndex(button =>
            button.classList.contains("active")
        )
    ].bentoImages;


    if (!images.length) {
        return;
    }


    bentoIndex =
        (bentoIndex - 1 + images.length) % images.length;


    setBentoActive(bentoIndex);

    startBentoAutoSlide();
}


/* =========================================
   SLIDER AUTOMÁTICO
   ========================================= */

function startBentoAutoSlide() {

    clearInterval(bentoInterval);


    bentoInterval = setInterval(() => {

        const options =
            bentoContainer.querySelectorAll(".option");


        if (!options.length) {
            return;
        }


        bentoIndex =
            (bentoIndex + 1) % options.length;


        setBentoActive(bentoIndex);

    }, 5000);
}


/* =========================================
   EVENTOS DE LOS TABS
   ========================================= */

buttons.forEach((button, index) => {

    button.addEventListener("click", () => {

        changeTab(index);

    });

});


/* =========================================
   INICIALIZAR
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateBento(0, 0);

    updateFeatures(0);

});
