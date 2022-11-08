type StorageInstanceType = typeof localStorage | typeof sessionStorage
type StorageNameType = 'localStorage' | 'sessionStorage'
interface StorageItemType {
  [key: string | number]: string
}

interface StorageComponents {
  storageName: StorageNameType
  storageInstance: StorageInstanceType
}

type StorageType = 'local' | 'session'

export { StorageComponents, StorageNameType, StorageItemType, StorageType }
