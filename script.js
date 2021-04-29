// Salvo il valore  del queryString chiamato "expression" in una variabile
const expression = new URLSearchParams(window.location.search)
    .get('expression');

if (expression) // Se la variabile contiene un espressione
    try {       // Metto il try perché potrebbe non trattarsi di una espressione valida

        const expressionTex = math
            .parse(expression)          // Converto l'espressione in formato testuale in un formato leggibile da mathjs
            .toTex({                    // Di questo ultimo valore ne ottengo il "Tex", specificando alcune opzioni per la conversione
                parenthesis: 'keep',
                implicit: 'hide'
            });

        const derivativeTex = math          // Calcolo la derivata dell'espressione precedente e prendo il Tex anche di questa
            .derivative(expression, 'x')
            .toTex({
                parenthesis: 'keep',
                implicit: 'hide'
            })

        $('#result')                        // All'elemento HTML con id result aggiungo una classe per renderlo blu
            .addClass('ui info message')
            .append("<h3>L'espressione inserita</h3>")      // Aggiungo un titolo
            .append(MathJax.tex2svg(expressionTex,          // Converto il Tex dell'espressione in un vettoriale e lo visualizzo
                {
                    em: 16,
                    ex: 6,
                    display: false
                }
            ))
            .append('<div class="ui divider"></div>')
            .append('<h3>Derivata</h3>')                    // Aggiungo un altro titolo
            .append(MathJax.tex2svg(derivativeTex,          // Effettuo la conversione in vettoriale del tex della derivata
                {
                    em: 16,
                    ex: 6,
                    display: false
                }
            ))
    } catch (error) {                           // Se l'espressione non è corretta stampo un errore
        $('#result')
            .addClass('ui red message')
            .append("<h3>Si è verificato un errore</h3>")
            .append("<p>Il formato dell'espressione inserita potrebbe non essere corretto.</p>")
        console.error('Si è verificato un errore')
    }
