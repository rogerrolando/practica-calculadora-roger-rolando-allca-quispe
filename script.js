let display = document.getElementById('result');
let shouldResetDisplay = false;

// Función para agregar valores al display
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    display.value += value;
}

// Función para limpiar el display
function clearDisplay() {
    display.value = '';
    shouldResetDisplay = false;
}

// Función para eliminar el último carácter
function deleteLast() {
    display.value = display.value.slice(0, -1);
    shouldResetDisplay = false;
}

// Función para calcular el resultado
function calculate() {
    try {
        // Reemplazar × por * para la evaluación
        let expression = display.value.replace(/×/g, '*');
        
        // Validar expresión segura
        if (/[^0-9+\-*/.()]/.test(expression)) {
            throw new Error('Expresión inválida');
        }
        
        // Evaluar la expresión
        let result = eval(expression);
        
        // Mostrar resultado o error
        if (isFinite(result)) {
            display.value = result;
        } else {
            display.value = 'Error';
        }
        
        // Activar el reset para la próxima operación
        shouldResetDisplay = true;
    } catch (error) {
        display.value = 'Error';
        shouldResetDisplay = true;
    }
}

// Event listener para teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Números y operadores básicos
    if (/[0-9+\-*/.=]/.test(key)) {
        if (key === '=' || key === 'Enter') {
            calculate();
        } else {
            appendToDisplay(key);
        }
    }
    
    // Tecla Escape para limpiar
    if (key === 'Escape') {
        clearDisplay();
    }
    
    // Tecla Backspace para borrar
    if (key === 'Backspace') {
        deleteLast();
    }
});