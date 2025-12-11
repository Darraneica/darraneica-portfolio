"use client"

import { useState } from "react"
import { Lock, Unlock, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CodeBreakerGame() {
  const [code, setCode] = useState<string[]>([])
  const [userGuess, setUserGuess] = useState<string[]>(["", "", "", ""])
  const [attempts, setAttempts] = useState<Array<{ guess: string[]; feedback: string[] }>>([])
  const [gameWon, setGameWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const colors = ["red", "blue", "green", "yellow", "purple", "orange"]

  const startGame = () => {
    const newCode: string[] = []
    for (let i = 0; i < 4; i++) {
      newCode.push(colors[Math.floor(Math.random() * colors.length)])
    }
    setCode(newCode)
    setUserGuess(["", "", "", ""])
    setAttempts([])
    setGameWon(false)
    setGameStarted(true)
  }

  const checkGuess = () => {
    if (userGuess.some((color) => color === "")) return

    const feedback: string[] = []
    const codeCopy = [...code]
    const guessCopy = [...userGuess]

    // Check exact matches
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === codeCopy[i]) {
        feedback.push("exact")
        codeCopy[i] = ""
        guessCopy[i] = ""
      }
    }

    // Check color matches
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] !== "") {
        const index = codeCopy.indexOf(guessCopy[i])
        if (index !== -1) {
          feedback.push("color")
          codeCopy[index] = ""
        }
      }
    }

    setAttempts([...attempts, { guess: userGuess, feedback }])

    if (feedback.filter((f) => f === "exact").length === 4) {
      setGameWon(true)
    } else {
      setUserGuess(["", "", "", ""])
    }
  }

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      red: "bg-red-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
    }
    return colorMap[color] || "bg-muted"
  }

  return (
    <section id="games" className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Lock className="w-6 h-6 text-primary" />
            <h2 className="text-4xl font-serif font-bold">Code Breaker</h2>
          </div>
          <p className="text-muted-foreground">
            Crack the secret color code! Guess the pattern in as few attempts as possible.
          </p>
        </div>

        <div className="glass p-8 rounded-xl">
          {!gameStarted ? (
            <div className="text-center">
              <Button onClick={startGame} size="lg" className="gap-2">
                <Lock className="w-5 h-5" />
                Start Game
              </Button>
            </div>
          ) : (
            <>
              {gameWon ? (
                <div className="text-center space-y-4">
                  <Unlock className="w-16 h-16 text-primary mx-auto animate-bounce" />
                  <h3 className="text-2xl font-serif font-bold">Code Cracked!</h3>
                  <p className="text-muted-foreground">You solved it in {attempts.length} attempts!</p>
                  <Button onClick={startGame} className="gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Play Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-sm font-medium mb-4 text-center">Select your guess:</h3>
                    <div className="flex justify-center gap-4 mb-6">
                      {userGuess.map((color, i) => (
                        <div
                          key={i}
                          className={`w-16 h-16 rounded-full border-4 border-border ${
                            color ? getColorClass(color) : "bg-card"
                          } cursor-pointer hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            const emptyIndex = userGuess.findIndex((c) => c === "")
                            if (emptyIndex !== -1) {
                              const newGuess = [...userGuess]
                              newGuess[emptyIndex] = color
                              setUserGuess(newGuess)
                            }
                          }}
                          className={`w-12 h-12 rounded-full ${getColorClass(
                            color,
                          )} hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-center gap-3">
                      <Button onClick={() => setUserGuess(["", "", "", ""])} variant="outline">
                        Clear
                      </Button>
                      <Button onClick={checkGuess} disabled={userGuess.some((c) => c === "")}>
                        Check
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Previous Attempts:</h3>
                    {attempts.map((attempt, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-card rounded-lg">
                        <div className="flex gap-2">
                          {attempt.guess.map((color, j) => (
                            <div key={j} className={`w-8 h-8 rounded-full ${getColorClass(color)}`} />
                          ))}
                        </div>
                        <div className="flex gap-1">
                          {attempt.feedback.map((fb, j) => (
                            <div
                              key={j}
                              className={`w-3 h-3 rounded-full ${fb === "exact" ? "bg-green-500" : "bg-yellow-500"}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Green dot = correct color & position | Yellow dot = correct color, wrong position</p>
        </div>
      </div>
    </section>
  )
}
