console.log('Script cargado.');

document.getElementById('calc-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue
    console.log('Formulario enviado. Calculando con valores aleatorios...');

    // --- 1. Leer valores del formulario ---
    const edad = parseFloat(document.getElementById('edad').value) || 0;
    const breslow = parseFloat(document.getElementById('breslow').value) || 0;
    const mitosis = parseFloat(document.getElementById('mitosis').value) || 0;
    
    // Valores de selects (convertidos a número)
    const ulceracion = parseInt(document.getElementById('ulceracion').value, 10);
    const invasion_lv = parseInt(document.getElementById('invasion_lv').value, 10);
    const invasion_perineural = parseInt(document.getElementById('invasion_perineural').value, 10);

    // Para las variables categóricas, asignamos un valor numérico simple como placeholder
    // En un modelo real, esto se manejaría con "dummy variables" (one-hot encoding)
    const localizacion = document.getElementById('localizacion').value;
    const subtipo = document.getElementById('subtipo').value;

    const localizacionMap = {
        'cabeza_cuello': 1,
        'tronco': 2,
        'eess': 3,
        'eeii': 4,
        'genitales': 5
    };
    const localizacionValor = localizacionMap[localizacion] || 0;

    const subtipoMap = {
        'nodular': 1,
        'acral': 2,
        'ssm': 3,
        'lmm': 4,
        'otros': 5
    };
    const subtipoValor = subtipoMap[subtipo] || 0;


    // --- 2. Coeficientes del Modelo (Valores Aleatorios de Ejemplo) ---
    // Cuando tengas los reales, solo debes cambiar estos números.
    const coef = {
        intercepto: -1.5, // Término independiente
        edad: 0.02,
        breslow: 0.7,
        mitosis: 0.1,
        ulceracion: 0.5,
        invasion_lv: 0.6,
        invasion_perineural: 0.4,
        localizacion: -0.1, // Un solo coeficiente para el grupo de localización
        subtipo: 0.15      // Un solo coeficiente para el grupo de subtipo
    };

    // --- 3. Calcular 'z' (Log-Odds) ---
    // En un modelo real, el tratamiento de variables categóricas sería más complejo.
    // Por ahora, multiplicamos el valor mapeado por el coeficiente.
    const z = coef.intercepto +
              (coef.edad * edad) +
              (coef.breslow * breslow) +
              (coef.mitosis * mitosis) +
              (coef.ulceracion * ulceracion) +
              (coef.invasion_lv * invasion_lv) +
              (coef.invasion_perineural * invasion_perineural) +
              (coef.localizacion * localizacionValor) +
              (coef.subtipo * subtipoValor);

    // --- 4. Calcular la Probabilidad (Función Sigmoide) ---
    const probabilidad = 1 / (1 + Math.exp(-z));

    // --- 5. Mostrar el resultado ---
    // Se muestra como porcentaje
    const probabilidadPorcentaje = probabilidad * 100;
    document.getElementById('valor-probabilidad').textContent = `${probabilidadPorcentaje.toFixed(2)}%`;
    
    console.log(`Resultado Z: ${z}`);
    console.log(`Probabilidad: ${probabilidad}`);
});