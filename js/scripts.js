// addEventListener('DOMContentLoaded', () => {

	const   form = document.getElementById('form'),
			inputs = document.querySelectorAll('.input'),
			emailUno = document.getElementById('email'),
			emailDos = document.getElementById('confirm-email')

	// Objeto Expresiones Regulares.
	const er = {
		erName: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
		erMail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		erMessage: /^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/
	}

	// Objeto validar campos.
	const validarCampo = {
		nameField: false,
		mailField: false,
		messageField: false
	}

	// Objeto mensajes de error.
	const errorMessage = {
		nameError: 'Ingrese únicamente letras mayúsculas y minúsculas',
		emailError: 'Ingrese un formato de correo válido',
		email2Error: 'Los correos no son iguales',
		txareaError: 'Máximo 160 caracteres'
	}


	// Función validar formulario.
	const validarFormulario = e => {

		// Nombre
		if (e.target.name === 'name') validarDatos(er.erName, e.target.value, e.target)

		// Email
		if (e.target.name === 'email') {
			validarDatos(er.erMail, e.target.value, e.target)
			validarMail2()
		}

		// Confirm-Email
		if (e.target.name === 'confirm-email') validarMail2()

		// Mensaje
		if (e.target.name === 'text-area') validarDatos(er.erMessage, e.target.value, e.target)
	}


	// Función validar datos.
	const validarDatos = (expresion, valor, elemento ) => {
			if (expresion.test(valor)) changeClass(true, elemento)
			else changeClass(false, elemento)
	}


	// Función confirmar correo.
	const validarMail2 = () => {
		if (emailUno.value !== '') {
			if (emailUno.value === emailDos.value) changeClass(true, emailDos)
			else changeClass(false, emailDos)
		} else changeClass(false, emailDos)
	}


	// Función añadir o quitar clases.
	const changeClass = (condicion, elemento) => {
		const 	formBox = elemento.parentElement,
				message = formBox.querySelector('p')
		if (condicion) {
			removeError(message)
			elemento.classList.remove('incorrecto', 'txarea-incorrecto')
			elemento.classList.add('correcto', 'txarea-correcto')
		} else {
			showError(elemento, message)
			elemento.classList.add('incorrecto', 'txarea-incorrecto')
			elemento.classList.remove('correcto', 'txarea-correcto')
		}
	}

	const showError = (elemento, message) => {
		if (elemento.name === 'name') {
			message.innerText = errorMessage.nameError
		}

		else if (elemento.name === 'email') {
			message.innerText = errorMessage.emailError
		}

		else if (elemento.name === 'confirm-email') {
			if (emailUno.value !== '') {
				message.innerText = errorMessage.email2Error
			}
		}

		else if (elemento.name === 'text-area') {
			message.innerText = errorMessage.txareaError
		}
	}


	const removeError = message => {
		message.innerText = ''
	}


	// Evento inputs.
	inputs.forEach(input => {
		input.addEventListener('keyup', validarFormulario)
		input.addEventListener('blur', validarFormulario)
	})


