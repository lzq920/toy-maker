export default function useStorage (defaultStorage = 'localStorage') {
  const storage = window[defaultStorage]
  return { storage }
}
