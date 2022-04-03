// addEventListener('DOMContentLoaded', () => {

const form = document.getElementById('form'),
	inputs = document.querySelectorAll('.input'),
	emailUno = document.getElementById('email'),
	emailDos = document.getElementById('checkmail'),
	terminos = document.getElementById('terminos'),
	submitButton = document.getElementById('submit-button')

// Objeto Expresiones Regulares.
const er = {
	erName: /^(([A-ZÁÉÍÓÚa-zñáéíóú])[\s]?)+$/,
	erEmail: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/,
	erTextArea: /^([\w]\s?)([\w\,\.\$\&\#\%\"\¡\!\¿\?\(\)\@\ñ\á\é\í\ó\ú]\s?)+$/
}

// Objeto validar campos
const checkInput = {
	name: false,
	email: false,
	checkmail: false,
	textarea: false
}

// Objeto mensajes de error.
const errorMessage = {
	nameError: 'Ingrese únicamente letras',
	emailError: 'Formato de correo inválido',
	email2Error: 'Los correos no son iguales',
	txareaError: 'Máximo 300 caracteres; algunos caracteres especiales están restringidos'
}


// Función validar formulario.
const validarFormulario = e => {

	// Nombre
	if (e.target.name === 'name') validarDatos(er.erName, e.target.value, e.target)

	// Email
	if (e.target.name === 'email') {
		validarDatos(er.erEmail, e.target.value, e.target)
		validarMail2()
	}

	// Confirm-Email
	if (e.target.name === 'checkmail') validarMail2()

	// Mensaje
	if (e.target.name === 'textarea') {
		if (e.target.value.trim().length <= 300) validarDatos(er.erTextArea, e.target.value, e.target)
		else changeState(false, e.target)
	}
}


// Función validar datos.
const validarDatos = (expresion, valor, elemento) => {
	if (expresion.test(valor)) changeState(true, elemento)
	else changeState(false, elemento)
}


// Función confirmar correo.
const validarMail2 = () => {
	if (emailUno.value !== '') {
		if (emailUno.value === emailDos.value) changeState(true, emailDos)
		else changeState(false, emailDos)
	} else changeState(false, emailDos)
}


// Función cambiar de estado.
const changeState = (condicion, elemento) => {
	const formBox = elemento.parentElement,
		message = formBox.querySelector('p')
		message.classList.add('form__error-message')

	if (condicion) {
		message.innerText = ''
		checkInput[elemento.name] = true
		formBox.classList.remove('incorrecto')
		formBox.classList.add('correcto')
	} else {
		showError(elemento, message)
		checkInput[elemento.name] = false
		formBox.classList.add('incorrecto')
		formBox.classList.remove('correcto')
	}
	submitController()
}


// Función mostrar error.
const showError = (elemento, message) => {
	if (elemento.name === 'name') message.innerText = errorMessage.nameError

	else if (elemento.name === 'email') message.innerText = errorMessage.emailError

	else if (elemento.name === 'checkmail') {
		if (emailUno.value !== '') message.innerText = errorMessage.email2Error
	} else if (elemento.name === 'textarea') message.innerText = errorMessage.txareaError
}


// Función controlar botón de envío.
const submitController = () => {
	if (checkInput.name && checkInput.email && checkInput.checkmail && checkInput.textarea && terminos.checked) submitButton.toggleAttribute('disabled', false)
	else submitButton.toggleAttribute('disabled', true)
}


// Evento click sobre Términos y Condiciones.
terminos.addEventListener('click', submitController)


// Eventos keyup y blur sobre los inputs.
inputs.forEach(input => {
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)
})

// Evento submit del formulaio.
form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
	event.preventDefault()
	const $form = new FormData(this)
	const response = await fetch(this.action, {
		method: this.method,
		body: $form,
		headers: {
			'Accept': 'application/json'
		}
	})

	if (response.ok) {
		modal.style.visibility = 'visible'
		modalContent.classList.add('modal--open')
	}
}


// VENTANA MODAL

const   modal = document.getElementById('modal'),
        closeModal = document.getElementById('modal-close'),
        modalContent = document.getElementById('modal-content')

// Función cerrar ventana modal.
const close = e => {
    e.stopPropagation()
    modalContent.classList.remove('modal--open')
    setTimeout(() => modal.style.visibility = 'hidden',1000)
}

// Cerrando la ventana modal.
closeModal.addEventListener('click', e => {
    close(e)
	form.reset()
	submitButton.toggleAttribute('disabled', true)

	// Capturando todos los contenedores "form__box" con la clase "correcto"
	const classCorrecto = document.querySelectorAll('.correcto')

	// Limpiando la clase correcto.
	classCorrecto.forEach((element) => {
		element.classList.remove('correcto')
	})
})
