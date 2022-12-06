import { StorageComponents, StorageType } from './type'

// Display Current Year In Copyright Section
const currentYearElement = document.querySelector(
	'[data-current-year]'
) as HTMLParagraphElement

const currentYear = new Date().getFullYear()
currentYearElement.innerText = currentYear.toString()

// Storage Code
const localStorageObj: StorageComponents = {
	storageName: 'localStorage',
	storageInstance: localStorage,
}
const sessionStorageObj: StorageComponents = {
	storageName: 'sessionStorage',
	storageInstance: sessionStorage,
}

const localStorageContainer = document.querySelector(
	'[data-local]'
) as HTMLElement
const sessionStorageContainer = document.querySelector(
	'[data-session]'
) as HTMLElement

function resetUI(storage: StorageType) {
	if (storage === 'local' || storage === 'localStorage')
		return showStorageItemsIntoUI(localStorageObj)
	if (storage === 'session' || storage === 'sessionStorage')
		return showStorageItemsIntoUI(sessionStorageObj)
}

function showStorageItemsIntoUI({
	storageName,
	storageInstance,
}: StorageComponents) {
	const storageItems = { ...storageInstance }

	storageName === 'localStorage'
		? (localStorageContainer.innerHTML = '')
		: (sessionStorageContainer.innerHTML = '')

	for (let storageItem in storageItems) {
		const storageItemElement = document.createElement('div')
		storageItemElement.className = 'storage-item'

		const storageHeaderElement = document.createElement('div')
		storageHeaderElement.className = 'storage-item-header'
		storageHeaderElement.setAttribute('role', 'button')
		storageHeaderElement.ariaPressed = 'false'
		storageHeaderElement.tabIndex = 0
		storageHeaderElement.title = 'Click to show/hide'

		storageHeaderElement.addEventListener('click', showHideValue)
		storageHeaderElement.addEventListener('keypress', showHideValue)

		const storageHeaderTitle = document.createElement('h3')
		storageHeaderTitle.className = 'storage-item-header-title'
		storageHeaderTitle.innerText = storageItem

		const storageItemControls = document.createElement('div')
		storageItemControls.classList.add('storage-item-controls')

		const storageItemDeleteElement = document.createElement('button')
		storageItemDeleteElement.className = 'storage-item-delete'
		storageItemDeleteElement.innerHTML = '&Cross;'
		storageItemDeleteElement.title = 'Click to Remove'
		storageItemDeleteElement.dataset.storage = storageName
		storageItemDeleteElement.dataset.key = storageItem
		storageItemDeleteElement.addEventListener('click', deleteStorageItem)

		const storageArrowElement = document.createElement('span')
		storageArrowElement.dataset.arrow = ''
		storageArrowElement.innerHTML = '&darr;'
		storageArrowElement.classList.add('storage-item-controls')

		const storageContentElement = document.createElement('button')
		storageContentElement.className = 'storage-item-content'
		storageContentElement.title = 'Click to copy'
		storageContentElement.dataset.content = ''
		storageContentElement.innerText = storageItems[storageItem]
		storageContentElement.addEventListener('click', copyToClipboard)

		storageItemControls.append(storageItemDeleteElement)
		storageItemControls.append(storageArrowElement)

		storageHeaderElement.append(storageHeaderTitle)
		storageHeaderElement.append(storageItemControls)
		storageItemElement.append(storageHeaderElement)
		storageItemElement.append(storageContentElement)

		if (storageName === 'localStorage')
			localStorageContainer?.append(storageItemElement)
		if (storageName === 'sessionStorage')
			sessionStorageContainer?.append(storageItemElement)
	}
}

showStorageItemsIntoUI(localStorageObj)
showStorageItemsIntoUI(sessionStorageObj)

const addFormElement = document.querySelector(
	'[data-add-form]'
) as HTMLFormElement

addFormElement.addEventListener('submit', addItemIntoStorage)

function addItemIntoStorage(event: SubmitEvent) {
	event.preventDefault()
	const formElement = event.target as HTMLFormElement
	const inputValue = new FormData(formElement)
	const keyInputElement = formElement.querySelector(
		'input[name="key"]'
	) as HTMLInputElement
	const valueInputElement = formElement.querySelector(
		'input[name="value"]'
	) as HTMLInputElement

	const targetedStorage = inputValue.get('storage')
	const key = inputValue.get('key')?.toString()
	const value = inputValue.get('value')?.toString()

	if (targetedStorage == undefined || targetedStorage === '') return
	if (key === '' || key == null) return
	if (value === '' || value == null) return

	const storage = getStorage(targetedStorage as StorageType)

	if (storage == null) return
	storage.setItem(key, value)

	resetUI(targetedStorage as StorageType)
	keyInputElement.value = ''
	valueInputElement.value = ''
}

function deleteStorageItem(event: MouseEvent) {
	event.stopPropagation()
	const targetedItem = event.target
	if (targetedItem == null) return
	if (!(targetedItem instanceof HTMLButtonElement)) return

	const storageName = targetedItem.dataset.storage
	const key = targetedItem.dataset.key

	if (storageName == undefined) return
	if (key == undefined) return

	const storage = getStorage(storageName as StorageType)

	if (storage == null) return
	storage.removeItem(key)
	resetUI(storageName as StorageType)
}

function getStorage(storageName: StorageType) {
	if (storageName === 'local' || storageName === 'localStorage')
		return localStorage
	if (storageName === 'session' || storageName === 'sessionStorage')
		return sessionStorage
}

function showHideValue(event: MouseEvent | KeyboardEvent) {
	const targetedStorage = event.target as HTMLButtonElement

	const contentElement = targetedStorage?.parentElement?.querySelector(
		'[data-content]'
	) as HTMLElement
	contentElement?.classList.toggle('show')

	changeUpDownArrow(
		targetedStorage.parentElement as HTMLElement,
		contentElement
	)
}

function changeUpDownArrow(element: HTMLElement, contentElement: HTMLElement) {
	const arrowElement = element.querySelector('[data-arrow]') as HTMLElement

	if (contentElement?.classList.contains('show'))
		return (arrowElement.innerHTML = '&uarr;')

	arrowElement.innerHTML = '&darr;'
}

function copyToClipboard(event: MouseEvent) {
	const targetedContent = event.target as HTMLButtonElement
	if (targetedContent == null || targetedContent.innerText == '') return

	// copy text into clipboard
	navigator.clipboard.writeText(targetedContent.innerText)
}
