"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const buttons = [
    { label: "C", onClick: clear, className: "bg-red-500 hover:bg-red-600 text-white" },
    {
      label: "±",
      onClick: () => setDisplay(String(Number.parseFloat(display) * -1)),
      className: "bg-gray-200 hover:bg-gray-300",
    },
    {
      label: "%",
      onClick: () => setDisplay(String(Number.parseFloat(display) / 100)),
      className: "bg-gray-200 hover:bg-gray-300",
    },
    { label: "÷", onClick: () => performOperation("÷"), className: "bg-orange-500 hover:bg-orange-600 text-white" },

    { label: "7", onClick: () => inputNumber("7"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "8", onClick: () => inputNumber("8"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "9", onClick: () => inputNumber("9"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "×", onClick: () => performOperation("×"), className: "bg-orange-500 hover:bg-orange-600 text-white" },

    { label: "4", onClick: () => inputNumber("4"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "5", onClick: () => inputNumber("5"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "6", onClick: () => inputNumber("6"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "-", onClick: () => performOperation("-"), className: "bg-orange-500 hover:bg-orange-600 text-white" },

    { label: "1", onClick: () => inputNumber("1"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "2", onClick: () => inputNumber("2"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "3", onClick: () => inputNumber("3"), className: "bg-gray-100 hover:bg-gray-200" },
    { label: "+", onClick: () => performOperation("+"), className: "bg-orange-500 hover:bg-orange-600 text-white" },

    { label: "0", onClick: () => inputNumber("0"), className: "bg-gray-100 hover:bg-gray-200 col-span-2" },
    { label: ".", onClick: inputDecimal, className: "bg-gray-100 hover:bg-gray-200" },
    { label: "=", onClick: handleEquals, className: "bg-orange-500 hover:bg-orange-600 text-white" },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-xs shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-lg font-semibold">Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="bg-black text-white p-4 rounded-lg text-right">
            <div className="text-3xl font-mono overflow-hidden">{display}</div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                className={`h-12 text-lg font-semibold ${button.className} ${button.label === "0" ? "col-span-2" : ""}`}
                variant="outline"
              >
                {button.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
