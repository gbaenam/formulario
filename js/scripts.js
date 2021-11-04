// addEventListener('DOMContentLoaded', () => {

	const   form = document.getElementById('form'),
			inputs = document.querySelectorAll('.input')

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
		nameError: 'Solamente letras mayúsculas y minúsculas',
		emailError: 'Ingrese un formato de correo válido',
		email2Error: 'Los correos no son iguales'
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
		if (e.target.name === 'confirm-email') validarMail2(e.target)

		// Mensaje
		if (e.target.name === 'text-area') validarDatos(er.erMessage, e.target.value, e.target)
	}


	// Función validar datos.
	const validarDatos = (expresion, valor, elemento ) => {
			if (expresion.test(valor)) changeClass(true, elemento)
			else {
				changeClass(false, elemento)
				showError()
			}
	}


	// Función confirmar correo.
	const validarMail2 = () => {
		const 	emailUno = document.getElementById('email'),
				emailDos = document.getElementById('confirm-email')

		if (emailUno.value !== '') {
			if (emailUno.value === emailDos.value) changeClass(true, emailDos)
			else changeClass(false, emailDos)
		} else changeClass(false, emailDos)
	}


	// Función añadir o quitar clases.
	const changeClass = (condicion, elemento) => {
		if (condicion) {
			elemento.classList.remove('incorrecto', 'txarea-incorrecto')
			elemento.classList.add('correcto', 'txarea-correcto')
		} else {
			elemento.classList.add('incorrecto', 'txarea-incorrecto')
			elemento.classList.remove('correcto', 'txarea-correcto')
		}
	}

	const showError = () => {
		
	}


	// Evento inputs.
	inputs.forEach(input => {
		input.addEventListener('keyup', validarFormulario)
		input.addEventListener('blur', validarFormulario)
	})
