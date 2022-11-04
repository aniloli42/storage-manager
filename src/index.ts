import { StorageComponents } from './type'

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

const localStorageContainer = document.querySelector('[data-local]')
const sessionStorageContainer = document.querySelector('[data-session]')

function showStorageItemsIntoUI({
  storageName,
  storageInstance,
}: StorageComponents) {
  const storageItems = { ...storageInstance }

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

function addItemIntoStorage() {}
function deleteItemFromStorage() {}
