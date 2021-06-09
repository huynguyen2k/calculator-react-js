import React from 'react'
import './css/style.css'

export default class Calculator extends React.Component {

    state = {
        expression: '',
        result: '0',
    }

    data = [
        ['CE', 'C', '+/-', '/'],
        [7, 8, 9, 'x'],
        [4, 5, 6, '-'],
        [1, 2, 3, '+'],
        [0, '.', '=', '%'],
    ]

    handleNumber = (value) => {
        if (value === '.') {
            if (this.state.result.indexOf(value) >= 0)   return

            value = this.state.result + value

        } else {

            if (this.state.result === '0') {
                value = value.toString()

            } else {
                value = this.state.result + value
            }
        }

        this.setState({result: value})
    }

    handleControl = (value) => {
        let newState;

        if (value === 'C') {
            newState = {
                result: '0',
                expression: ''
            }
        } else {
            newState = {
                result: '0'
            }
        }
        this.setState(newState)
    }

    calculate = (a, operator, b) => {
        a = Number(a)
        b = Number(b)

        if (operator === '+') {
            return a + b
        } else if (operator === '-') {
            return a - b
        } else if (operator === 'x') {
            return a * b
        } else if (operator === '/') {
            return a / b
        } else {
            return a % b
        }
    }

    handleOperation = (value) => {
        let newState;
        let expression = this.state.expression
        let result = this.state.result

        if (value === '=') {
            let a = expression.slice(0, expression.indexOf(' '))
            let operator = expression[expression.length - 1]
            let b = result

            result = this.calculate(a, operator, b)
            expression = `${a} ${operator} ${b} =`

            newState = {
                expression,
                result
            }

        } else if (value === '+/-') {
            if (result[0] === '-') {
                result = result.slice(1)
            } else {
                result = '-' + result
            }

            newState = {
                result
            }

        } else {

            if (expression === '') {
                newState = {
                    expression: result + ' ' + value,
                    result: '0'
                }
            } else if (expression[expression.length - 1] === '=') {
                newState = {
                    expression: result + ' ' + value,
                    result: '0'
                }
            } else {
                let a = expression.slice(0, expression.indexOf(' '))
                let operator = expression[expression.length - 1]
                let b = result
    
                expression = this.calculate(a, operator, b).toString()
                expression += ' ' + value
                result = '0'
                
                newState = {
                    expression,
                    result
                }
            }
        }

        this.setState(newState)
    }

    renderCalculatorKeyBoard = () => {
        return this.data.map((row, i) => {

            const cols = row.map((value, j) => {
                let callback

                if (typeof value === 'number' || value === '.') {
                    callback = this.handleNumber
                } else if (value === 'CE' || value === 'C') {
                    callback = this.handleControl
                } else {
                    callback = this.handleOperation
                }

                return (
                    <td onClick={() => { callback(value) }} key={j}>{value}</td>
                )
            })

            return (
                <tr key={i}>{cols}</tr>
            )
        })
    }

    renderCalculator = () => {
        return (
            <div className="calculator">
                <div className="calculator__header">
                    <h3 className="expression">{this.state.expression}</h3>
                    <h3 className="result">{this.state.result}</h3>
                </div>
                <div className="calculator__body">
                    <table className="calculator__keyboard">
                        <tbody>
                            {this.renderCalculatorKeyBoard()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="wrapper">
                {this.renderCalculator()}
            </div>
        )
    }
}