// addEventListener('DOMContentLoaded', () => {

	const   form = document.getElementById('form'),
			inputs = document.querySelectorAll('.input'),
			textArea = document.getElementById('text-area')

	const er = {
		nombre: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		mensaje: /^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/
	}


	const validarFormulario = e => {

		// Nombre
		if (e.target.name === 'name') {
			validarDatos(er.nombre, e.target.value)
		}

		// Email
		if (e.target.name === 'email') {
			validarDatos(er.correo, e.target.value)
		}

		// Confirm-Email
		if (e.target.name === 'confirm-email') {
			validarMail2()
		}

		// Mensaje
		if (e.target.name === 'text-area') {
			validarDatos(er.mensaje, e.target.value)
		}
	}


	const validarDatos = (expresion, valor) => {
		if (expresion.test(valor)) {
			console.log('Ingreso correcto')
		} else {
			console.log('Ingreso incorrecto')
		}
	}


	const validarMail2 = () => {

		const 	inputEmail = document.getElementById('email'),
				inputEmail2 = document.getElementById('confirm-email')

		if (inputEmail.value !== inputEmail2.value) {
			console.log('Los Email no coinciden')
		} else {
			console.log('Los Email son iguales')
		}
	}

	textArea.addEventListener('keyup', validarFormulario)
	textArea.addEventListener('blur', validarFormulario)

	inputs.forEach(input => {
		input.addEventListener('keyup', validarFormulario)
		input.addEventListener('blur', validarFormulario)
	})



	// const validarCampo = e => {
	// 	console.log(e.target.name)
	// }


	// switch (e.target.name) {
	// 	case 'usuario':
	// 		validarCampo(expresiones.usuario, e.target, 'usuario')
	// 	break;
	// 	case 'nombre':
	// 		validarCampo(expresiones.nombre, e.target, 'nombre')
	// 	break;
	// 	case 'password':
	// 		validarCampo(expresiones.password, e.target, 'password')
	// 		validarPassword2()
	// 	break;
	// 	case 'password2':
	// 		validarPassword2()
	// 	break;
	// 	case 'correo':
	// 		validarCampo(expresiones.correo, e.target, 'correo')
	// 	break;
	// 	case 'telefono':
	// 		validarCampo(expresiones.telefono, e.target, 'telefono')
	// 	break;
	// }

// })

// Email
// if (e.target.name === 'email') {
// 	if (er.correo.test(e.target.value)) {
// 		console.log('Ingreso correcto')
// 	} else {
// 		console.log('Ingreso incorrecto')
// 	}
// }
