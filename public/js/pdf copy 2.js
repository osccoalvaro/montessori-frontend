/*=============== SHOW MODAL ===============*/
const openButtons = document.querySelectorAll('.open-modal'); // Selecciona todos los botones con la clase 'open-modal'
const modalContainer = document.getElementById('modal-container'); // Contenedor del popup

function disableScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth; // Calcula el ancho de la barra de scroll
    document.body.style.overflow = 'hidden'; // Deshabilita el scroll
    document.body.style.marginRight = `${scrollBarWidth}px`; // Compensa el ancho de la barra de scroll
}

function enableScroll() {
    document.body.style.overflow = ''; // Habilita el scroll
    document.body.style.marginRight = ''; // Elimina la compensación
}

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        modalContainer.classList.add('show-modal'); // Muestra el modal
        disableScroll(); // Deshabilita el scroll con compensación
    });
});

/*=============== CLOSE MODAL ===============*/
const closeBtn = document.querySelectorAll('.close-modal');

function closeModal() {
    modalContainer.classList.remove('show-modal'); // Oculta el modal
    enableScroll(); // Habilita el scroll nuevamente
}

closeBtn.forEach(c => c.addEventListener('click', closeModal));


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