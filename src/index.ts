// Display Current Year In Copyright Section
const currentYearElement = document.querySelector(
  '[data-current-year]'
) as HTMLParagraphElement

const currentYear = new Date().getFullYear()

currentYearElement.innerText = currentYear.toString()
