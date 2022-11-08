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

function resetUI(storage: 'local' | 'session') {
  if (storage === 'local') return showStorageItemsIntoUI(localStorageObj)
  if (storage === 'session') return showStorageItemsIntoUI(sessionStorageObj)
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
    const storageItemElement = document.createElement('button')
    storageItemElement.className = 'storage-item-button'
    storageItemElement.innerText = storageItem

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

function deleteItemFromStorage() {}

function getStorage(storageName: StorageType) {
  if (storageName === 'local') return localStorage
  if (storageName === 'session') return sessionStorage
}
