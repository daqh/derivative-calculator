const queryParams = new URLSearchParams(window.location.search);
const expression = queryParams.get('expression');
if (expression)
    try {
        const parsedExpression = math.parse(expression);
        expressionTex = parsedExpression.toTex({
            parenthesis: 'keep',
            implicit: 'hide'
        });

        const result = math.derivative(expression, 'x');

        const derivativeTex = result.toTex({
            parenthesis: 'keep',
            implicit: 'hide'
        })

        $('#result')
            .addClass('ui info message')
            .append("<h3>L'espressione inserita</h3>")
            .append(MathJax.tex2svg(expressionTex,
                {
                    em: 16,
                    ex: 6,
                    display: false
                }
            ))
            .append('<div class="ui divider"></div>')
            .append('<h3>Derivata</h3>')
            .append(MathJax.tex2svg(derivativeTex,
                {
                    em: 16,
                    ex: 6,
                    display: false
                }
            ))
    } catch (error) {
        $('#result')
            .addClass('ui red message')
            .append("<h3>Si è verificato un errore</h3>")
            .append("<p>Il formato dell'espressione inserita potrebbe non essere corretto.</p>")
        console.error('Si è verificato un errore')
    }
