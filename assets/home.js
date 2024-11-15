function mostrarAlerta() {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.textContent =
    "Deslízame hacia la izquierda o hacia la derecha para eliminarme!";

  // Variables para el arrastre
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  // Agrega eventos para el arrastre
  alert.addEventListener("mousedown", (e) => startDrag(e.clientX, alert));
  alert.addEventListener("touchstart", (e) =>
    startDrag(e.touches[0].clientX, alert)
  );

  document.addEventListener("mousemove", (e) => drag(e.clientX, alert));
  document.addEventListener("touchmove", (e) =>
    drag(e.touches[0].clientX, alert)
  );

  document.addEventListener("mouseup", () => endDrag(alert));
  document.addEventListener("touchend", () => endDrag(alert));

  document.getElementById("alertContainer").appendChild(alert);

  function startDrag(x, element) {
    startX = x;
    isDragging = true;
    element.classList.add("dragging");
  }

  function drag(x, element) {
    if (!isDragging) return;

    currentX = x - startX; // Calcula la distancia arrastrada
    element.style.transform = `translateX(${currentX}px)`; // Aplica el desplazamiento
  }

  function endDrag(element) {
    if (!isDragging) return;

    isDragging = false;
    element.classList.remove("dragging");

    // Verifica si se deslizó lo suficiente para eliminar
    if (currentX > 100) {
      element.style.transform = `translateX(100%)`;
      element.style.opacity = 0;
      setTimeout(() => element.remove(), 300); // Elimina del DOM
    } else if (currentX < -100) {
      element.style.transform = `translateX(-100%)`;
      element.style.opacity = 0;
      setTimeout(() => element.remove(), 300); // Elimina del DOM
    } else {
      // Regresa a la posición inicial si no fue suficiente
      element.style.transform = `translateX(0)`;
    }
  }
}
