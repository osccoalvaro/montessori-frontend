/*=============== SHOW MODAL ===============*/
const showModal = (openButton, modalContent) => {
    const openBtn = document.getElementById(openButton),
        modalContainer = document.getElementById(modalContent);

    if (openBtn && modalContainer) {
        openBtn.addEventListener("click", () => {
            modalContainer.classList.add("show-modal");

            // Bloquea el scroll y ajusta el margen
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${scrollBarWidth}px`;
        });
    }
};
showModal("open-modal", "modal-container");

/*=============== CLOSE MODAL ===============*/
const closeBtn = document.querySelectorAll(".close-modal");

function closeModal() {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove("show-modal");

    // Habilita el scroll y resetea el margen
    document.body.style.overflow = "";
    document.body.style.marginRight = "";
}
closeBtn.forEach((c) => c.addEventListener("click", closeModal));


/*DRAGG AN DROP*/
const pdfContainer = document.getElementById('pdf-container');

// Variables para controlar el arrastre
let isDragging = false;
let startY;
let scrollTop;

pdfContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.pageY - pdfContainer.offsetTop; // Posición inicial del cursor
    scrollTop = pdfContainer.scrollTop; // Posición inicial del scroll
    pdfContainer.style.cursor = 'grabbing'; // Cambia el cursor
});

pdfContainer.addEventListener('mouseleave', () => {
    isDragging = false; // Desactiva el arrastre si el mouse sale del contenedor
    pdfContainer.style.cursor = 'grab';
});

pdfContainer.addEventListener('mouseup', () => {
    isDragging = false; // Desactiva el arrastre al soltar el mouse
    pdfContainer.style.cursor = 'grab';
});

pdfContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // No hace nada si no está en modo arrastre
    e.preventDefault(); // Previene el comportamiento predeterminado
    const y = e.pageY - pdfContainer.offsetTop; // Posición actual del cursor
    const walk = (y - startY) * 1.5; // Movimiento del scroll (ajustable con el multiplicador)
    pdfContainer.scrollTop = scrollTop - walk; // Aplica el desplazamiento
}); 
