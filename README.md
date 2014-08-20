# Introdu��o #

jQuery fontResizer � um plugin criado por Eder Lima (ederlima.com.br) e que tomei a liberdade de adaptar para o jQuery Boilerplate.

## Como Usar ##

Instanciar o plugin em algum container e indicar dois elementos (seletores v�lidos da jQuery) para serem os bot�es que aumentar�o ou diminuir�o o texto.

As op��es dispon�veis s�o: 

* steps - Quantidade de passos que diminuir� e aumentar� a fonte,
* sizeIncrement - Unidade num�rica de incremento/decremento da fonte. A unidade de medida (px, pt etc) ser� a mesma j� utilizada na fonte.
* smallerButton - Seletor do elemento que ser� respons�vel por diminuir a fonte.
* biggerButton - Seletor do elemento que ser� respons�vel por aumentar a fonte.
* elements - Array de elementos que poder�o ter o tamanho da fonte alterada.
* onIncrease - Callback ao aumentar a fonte.
* onDecrease - Callback ao reduzir a fonte.

As fun��es de callback rodam no contexto do elemento que disparou a a��o e ainda recebem os seguintes elementos:

* Evento disparado.
* Passo atual
* Total de passos
* Bot�es como elementos jQuery (smallerButton e biggerButton)
* O container como elemento jQuery

## Exemplos ##

```javascript
$('#container1')
	.fontResizer({
		smallerButton: "#smaller1",
		biggerButton: "#bigger1"
	});

$('#container2')
	.fontResizer({
		smallerButton: "#smaller2",
		biggerButton: "#bigger2",
		elements: ["p", "td", "th"],
		steps: 7,
		sizeIncrement: 4,
		
		onIncrease: function(event, step, maxSteps, buttons) {
			if (step == maxSteps) {
				this.disabled = true;
			}
			buttons.smallerButton.prop("disabled", false);
		},
		
		onDecrease: function(event, step, maxSteps, buttons) {
			if (step == 1) {
				this.disabled = true;
			}
			buttons.biggerButton.prop("disabled", false);
		}
	});
```