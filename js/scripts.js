// addEventListener('DOMContentLoaded', () => {

	const   form = document.getElementById('form'),
			inputs = document.querySelectorAll('.input'),
			textArea = document.getElementById('text-area')

	const er = {
		regExpName: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
		regExpMail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		regExpMessage: /^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/
	}

	const validarCampo = {
		nameField: false,
		mailField: false,
		messageField: false
	}


	const validarFormulario = e => {
		const mailDos = document.getElementById('confirm-email')

		// Nombre
		if (e.target.name === 'name') {
			validarDatos(er.regExpName, e.target.value, e.target)
			// console.log(e.target)
		}

		// Email
		if (e.target.name === 'email') {
			validarDatos(er.regExpMail, e.target.value, e.target)
			validarMail2(mailDos)
		}

		// Confirm-Email
		if (e.target.name === 'confirm-email') {
			validarMail2(e.target)
		}

		// Mensaje
		if (e.target.name === 'text-area') {
			validarDatos(er.regExpMessage, e.target.value, e.target)
		}
	}


	const validarDatos = (expresion, valor, elemento ) => {
		if (elemento.name !== 'text-area') {
			if (expresion.test(valor)) {
				changeClass(true, elemento)
			} else {
				changeClass(false, elemento)
			}
		} else if (expresion.test(valor)) {
			elemento.classList.remove('txarea-incorrecto')
			elemento.classList.add('txarea-correcto')
		} else {
			elemento.classList.add('txarea-incorrecto')
			elemento.classList.remove('txarea-correcto')
		}
	}


	const validarMail2 = elemento => {
		const 	inputEmail = document.getElementById('email'),
				inputEmail2 = document.getElementById('confirm-email')

		if (inputEmail.value !== '') {
			if (inputEmail.value === inputEmail2.value) {
				changeClass(true, elemento)
			} else {
				changeClass(false, elemento)
			}
		} else {
			elemento.classList.add('incorrecto')
		}
	}

	const changeClass = (condicion, elemento) => {
		if (condicion) {
			elemento.classList.remove('incorrecto')
			elemento.classList.add('correcto')
		} else {
			elemento.classList.add('incorrecto')
			elemento.classList.remove('correcto')
		}
	}

	textArea.addEventListener('keyup', validarFormulario)
	textArea.addEventListener('blur', validarFormulario)

	inputs.forEach(input => {
		input.addEventListener('keyup', validarFormulario)
		input.addEventListener('blur', validarFormulario)
	})
