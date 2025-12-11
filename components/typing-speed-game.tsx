"use client"

import { useState, useEffect, useRef } from "react"
import { Keyboard, RefreshCcw, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TypingSpeedGame() {
  const [text, setText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isFinished, setIsFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sentences = [
    "The quick brown fox jumps over the lazy dog while coding in React.",
    "TypeScript brings type safety to JavaScript applications seamlessly.",
    "Building interactive web experiences requires creativity and precision.",
    "Next.js enables server-side rendering and static site generation.",
    "Full-stack development combines frontend design with backend logic.",
  ]

  const startGame = () => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
    setText(randomSentence)
    setUserInput("")
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsFinished(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now())
    }

    if (userInput.length > 0) {
      const correctChars = userInput.split("").filter((char, i) => char === text[i]).length
      const acc = Math.round((correctChars / userInput.length) * 100)
      setAccuracy(acc)

      if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60
        const wordsTyped = userInput.length / 5
        const calculatedWpm = Math.round(wordsTyped / timeElapsed)
        setWpm(calculatedWpm)
      }
    }

    if (userInput === text) {
      setIsFinished(true)
    }
  }, [userInput, startTime, text])

  const getCharClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground"
    if (userInput[index] === text[index]) return "text-primary"
    return "text-destructive"
  }

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Keyboard className="w-6 h-6 text-accent" />
            <h2 className="text-4xl font-serif font-bold">Typing Speed Test</h2>
          </div>
          <p className="text-muted-foreground">How fast can you type? Test your words per minute and accuracy!</p>
        </div>

        <div className="glass p-8 rounded-xl">
          {!text ? (
            <div className="text-center">
              <Button onClick={startGame} size="lg" className="gap-2">
                <Zap className="w-5 h-5" />
                Start Typing Test
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary">{wpm}</div>
                    <div className="text-xs text-muted-foreground">WPM</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">{accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                <Button onClick={startGame} variant="outline" size="sm" className="gap-2 bg-transparent">
                  <RefreshCcw className="w-4 h-4" />
                  New Text
                </Button>
              </div>

              {isFinished && (
                <div className="text-center mb-6 p-4 bg-accent/10 rounded-lg animate-pulse">
                  <Zap className="w-12 h-12 text-accent mx-auto mb-2" />
                  <h3 className="text-xl font-serif font-bold">Complete!</h3>
                  <p className="text-sm text-muted-foreground">
                    {wpm} WPM with {accuracy}% accuracy
                  </p>
                </div>
              )}

              <div className="mb-6 p-6 bg-card rounded-lg text-xl font-mono leading-relaxed">
                {text.split("").map((char, index) => (
                  <span key={index} className={getCharClass(index)}>
                    {char}
                  </span>
                ))}
              </div>

              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full px-4 py-3 bg-background border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary text-lg font-mono"
                placeholder="Start typing here..."
                disabled={isFinished}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
