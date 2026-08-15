const contactForm = document.getElementById('contactForm');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const dniInput = document.getElementById('dni');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');
const gradoInput = document.getElementById('grado');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async e => {
  e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

  // Deshabilitar el botón
  submitBtn.disabled = true;
  submitBtn.classList.remove("bg-blue", "hover:scale-110", "cursor-pointer", "shadow-blue-500/50");
  submitBtn.classList.add("bg-blue-disabled", "shadow-blue-500/20");

  // Obtener y convertir la fecha actual en formato horario Perú
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('es-PE', {
    timeZone: 'America/Lima',
  });
  try {
    const response = await fetch('https://montessori-backend.vercel.app/send-message', {
    //const response = await fetch('http://localhost:3000/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        dni: dniInput.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
        grado: gradoInput.value,
        date: formattedDate,
      }),   
    });
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Uno de nuestros asesores se comunicará contigo',
      });
      // Limpiar los valores de los inputs
      clearInputs();
      reEnableButton();
    } else {
      const errorData = await response.json();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Hubo un problema al enviar el mensaje: ${errorData.error}`,
      });
      reEnableButton();
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al enviar el mensaje.',
    });
    reEnableButton();
  }
});

// Reactivar botón en caso de error
function reEnableButton() {
  submitBtn.disabled = false;
  submitBtn.classList.remove("bg-blue-disabled", "shadow-blue-500/20");
  submitBtn.classList.add("bg-blue", "hover:scale-110", "cursor-pointer", "shadow-blue-500/50");
}

// Función para limpiar los inputs y eliminar la clase focus
function clearInputs() {
  const inputs = document.querySelectorAll(".input");
  inputs.forEach(input => {
    input.value = "";
    let parent = input.parentNode;
    parent.classList.remove("focus");
  });
}