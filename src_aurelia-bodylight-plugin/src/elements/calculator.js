export class Calculator {
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
    shouldResetScreen = false

    attached () {
        /*const numberButtons = document.querySelectorAll('[data-number]')
        const operatorButtons = document.querySelectorAll('[data-operator]')
        const equalsButton = document.getElementById('equalsBtn')
        const clearButton = document.getElementById('clearBtn')
        const deleteButton = document.getElementById('deleteBtn')
        const pointButton = document.getElementById('pointBtn')
        */
        //this.lastOperationScreen = document.getElementById('lastOperationScreen')
        //this.currentOperationScreen = document.getElementById('currentOperationScreen')        
        //TODO window.addEventListener('keydown', handleKeyboardInput)
        /*equalsButton.addEventListener('click', evaluate)
        clearButton.addEventListener('click', clear)
        deleteButton.addEventListener('click', deleteNumber)
        pointButton.addEventListener('click', appendPoint)
        numberButtons.forEach((button) =>
        button.addEventListener('click', () => appendNumber(button.textContent))
      )
      
      operatorButtons.forEach((button) =>
        button.addEventListener('click', () => setOperation(button.textContent))
      )*/
      
    }



appendNumber(number) {
  if (this.currentOperationScreen.textContent === '0' || this.shouldResetScreen)
    this.resetScreen()
  this.currentOperationScreen.textContent += number
}

resetScreen() {
    this.currentOperationScreen.textContent = ''
    this.shouldResetScreen = false
}

clear() {
    this.currentOperationScreen.textContent = '0'
    this.lastOperationScreen.textContent = ''
    this.firstOperand = ''
    this.secondOperand = ''
    this.currentOperation = null
}

appendPoint() {
  if (this.shouldResetScreen) this.resetScreen()
  if (this.currentOperationScreen.textContent === '')
  this.currentOperationScreen.textContent = '0'
  if (this.currentOperationScreen.textContent.includes('.')) return
  this.currentOperationScreen.textContent += '.'
}

deleteNumber() {
    this.currentOperationScreen.textContent = this.currentOperationScreen.textContent
    .toString()
    .slice(0, -1)
}

setOperation(operator) {
  if (this.currentOperation !== null) this.evaluate()
  this.firstOperand = this.currentOperationScreen.textContent
  this.currentOperation = operator
  this.lastOperationScreen.textContent = `${this.firstOperand} ${this.currentOperation}`
  this.shouldResetScreen = true
}

evaluate() {
  if (this.currentOperation === null || this.shouldResetScreen) return
  if (this.currentOperation === '÷' && this.currentOperationScreen.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  this.secondOperand = this.currentOperationScreen.textContent
  this.currentOperationScreen.textContent = this.roundResult(
    this.operate(this.currentOperation, this.firstOperand, this.secondOperand)
  )
  this.lastOperationScreen.textContent = `${this.firstOperand} ${this.currentOperation} ${this.secondOperand} =`
  this.currentOperation = null
}

roundResult(number) {
  return Math.round(number * 1000) / 1000
}

handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) this.appendNumber(e.key)
  if (e.key === '.') this.appendPoint()
  if (e.key === '=' || e.key === 'Enter') this.evaluate()
  if (e.key === 'Backspace') this.deleteNumber()
  if (e.key === 'Escape') this.clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
  this.setOperation(this.convertOperator(e.key))
}

convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

add(a, b) {
  return a + b
}

substract(a, b) {
  return a - b
}

multiply(a, b) {
  return a * b
}

divide(a, b) {
  return a / b
}

operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return this.add(a, b)
    case '−':
      return this.substract(a, b)
    case '×':
      return this.multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return this.divide(a, b)
    default:
      return null
  }
}

}