// addEventListener('DOMContentLoaded', () => {

	const   form = document.getElementById('form'),
			inputs = document.querySelectorAll('.input')

	// Objeto Expresiones Regulares.
	const er = {
		regExpName: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
		regExpMail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		regExpMessage: /^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/
	}

	// Objeto validar campos.
	const validarCampo = {
		nameField: false,
		mailField: false,
		messageField: false
	}


	// Función validar formulario.
	const validarFormulario = e => {
		const mailDos = document.getElementById('confirm-email')

		// Nombre
		if (e.target.name === 'name') validarDatos(er.regExpName, e.target.value, e.target)

		// Email
		if (e.target.name === 'email') {
			validarDatos(er.regExpMail, e.target.value, e.target)
			validarMail2(mailDos)
		}

		// Confirm-Email
		if (e.target.name === 'confirm-email') validarMail2(e.target)

		// Mensaje
		if (e.target.name === 'text-area') validarDatos(er.regExpMessage, e.target.value, e.target)
	}


	// Función validar datos.
	const validarDatos = (expresion, valor, elemento ) => {
			if (expresion.test(valor)) changeClass(true, elemento)
			else changeClass(false, elemento)
	}


	// Función confirmar correo.
	const validarMail2 = elemento => {
		const 	inputEmail = document.getElementById('email'),
				inputEmail2 = document.getElementById('confirm-email')

		if (inputEmail.value !== '') {
			if (inputEmail.value === inputEmail2.value) changeClass(true, elemento)
			else changeClass(false, elemento)
		} else changeClass(false, elemento)
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

	// Evento inputs.
	inputs.forEach(input => {
		input.addEventListener('keyup', validarFormulario)
		input.addEventListener('blur', validarFormulario)
	})
