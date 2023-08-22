import { onMounted, onUnmounted, Ref } from "vue"

export function useDropdownEventHandler(dropdownOpen: Ref<boolean>, dropdown: Ref<HTMLElement | null>, trigger: Ref<HTMLElement | null>): void {
  // close on click outside
  const clickHandler = (event: Event) => {
    if (!dropdownOpen.value || dropdown.value?.contains(event.target as Node) || trigger.value?.contains(event.target as Node)) return
    dropdownOpen.value = false
  }
  // close if the esc key is pressed
  const keyHandler = (event: KeyboardEvent) => {
    if (!dropdownOpen.value || event.code !== 'Escape') return
    dropdownOpen.value = false
  }

  onMounted(() => {
    document.addEventListener('click', clickHandler)
    document.addEventListener('keydown', keyHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', clickHandler)
    document.removeEventListener('keydown', keyHandler)
  })
}