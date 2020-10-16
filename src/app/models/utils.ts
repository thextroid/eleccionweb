export const  langes=       {
    // separator of parts of a date (e.g. '/' in 11/05/1955)
    '/': "-",
    // separator of parts of a time (e.g. ':' in 05:44 PM)
    ':': ":",
    // the first day of the week (0 = Sunday, 1 = Monday, etc)
    firstDay: 0,
    days: {
        names: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        namesAbbr: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        namesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    },
    months: {
        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
        names: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", ""],
        // abbreviated month names
        namesAbbr: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", ""]
    },
    AM: ["AM", "am", "AM"],
    PM: ["PM", "pm", "PM"],
    eras: [
    {"name": "A.D.", "start": null, "offset": 0 }
],
    twoDigitYearMax: 2029,
    patterns: {
        d: "M/d/yyyy",
        D: "dddd, MMMM dd, yyyy",
        t: "h:mm tt",
        T: "h:mm:ss tt",
        f: "dddd, MMMM dd, yyyy h:mm tt",
        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
        M: "MMMM dd",
        Y: "yyyy MMMM",
        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
    },
    percentsymbol: "%",
    currencysymbol: "$",
    currencysymbolposition: "before",
    decimalseparator: '.',
    thousandsseparator: ',',
    pagergotopagestring: "Ir a pagina:",
    pagershowrowsstring: "Ver filas:",
    pagerrangestring: " de ",
    pagerpreviousbuttonstring: "anterior",
    pagernextbuttonstring: "siguiente",
    groupsheaderstring: "Arrastre una columna y suelte aquí para agrupar por esa columna",
    sortascendingstring: "Ascendente",
    sortdescendingstring: "Descendente",
    sortremovestring: "Resetear",
    groupbystring: "Agrupar por esta columna",
    groupremovestring: "Eliminar desde Grupos",
    filterclearstring: "Limpiar",
    filterstring: "Filtrar",
    filtershowrowstring: "Ver filas where:",
    filtershowrowdatestring: "Ver filas where date:",
    filterorconditionstring: "o",
    filterandconditionstring: "y",
    filterselectallstring: "(Seleccionar todo)",
    filterchoosestring: "Seleccione:",
    filterstringcomparisonoperators: ['vacio', 'no vacío', 'contiene', 'contiene(coincidencias)',
        'no contiene', 'no contiene(coinc.)', 'empieza con', 'empieza con(coinc.)',
        'termina con', 'termina con(coinc.)', 'igual', 'igual(coinc.)', 'nulos', 'no nulos'],
    filternumericcomparisonoperators: ['igual', 'no iguale', 'menor que', 'menor igual', 'mayor', 'mayor igual', 'null', 'not null'],
    filterdatecomparisonoperators: ['igual', 'no iguale', 'menor que', 'menor o igual', 'mayor que', 'mayor o igual que', 'nulos', 'no nulos'],
    filterbooleancomparisonoperators: ['igual', 'no es iguale'],
    validationstring: "Valor ingresado no se valido",
    emptydatastring: "No hay datos para mostrar",
    filterselectstring: "Seleccione filtro",
    loadtext: "Cargando...",
    clearstring: "Limpiar",
    todaystring: "Hoy"          
};