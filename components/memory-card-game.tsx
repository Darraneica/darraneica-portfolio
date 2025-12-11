"use client"

import { useState, useEffect } from "react"
import { Trophy, RefreshCcw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

type Card = {
  id: number
  value: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryCardGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const techIcons = ["⚛️", "🔥", "⚡", "💎", "🚀", "🎯", "💻", "🌟"]

  const initGame = () => {
    const values = [...techIcons, ...techIcons]
    const shuffled = values.sort(() => Math.random() - 0.5)
    const newCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }))
    setCards(newCards)
    setFlippedIndices([])
    setMoves(0)
    setGameWon(false)
    setTime(0)
    setIsPlaying(true)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, gameWon])

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setMoves(moves + 1)
      const [first, second] = flippedIndices
      if (cards[first].value === cards[second].value) {
        setCards((prev) => prev.map((card, i) => (i === first || i === second ? { ...card, isMatched: true } : card)))
        setFlippedIndices([])
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) => (i === first || i === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedIndices([])
        }, 1000)
      }
    }
  }, [flippedIndices, cards, moves])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setGameWon(true)
      setIsPlaying(false)
    }
  }, [cards])

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return
    }

    setCards((prev) => prev.map((card, i) => (i === index ? { ...card, isFlipped: true } : card)))
    setFlippedIndices((prev) => [...prev, index])
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-secondary" />
            <h2 className="text-4xl font-serif font-bold">Memory Match</h2>
          </div>
          <p className="text-muted-foreground">Test your memory! Match all the tech icons to win.</p>
        </div>

        <div className="glass p-8 rounded-xl">
          {cards.length === 0 ? (
            <div className="text-center">
              <Button onClick={initGame} size="lg" className="gap-2">
                <Trophy className="w-5 h-5" />
                Start Game
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Moves:</span>
                    <span className="ml-2 font-bold text-primary">{moves}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-bold text-accent">{time}s</span>
                  </div>
                </div>
                <Button onClick={initGame} variant="outline" size="sm" className="gap-2 bg-transparent">
                  <RefreshCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>

              {gameWon && (
                <div className="text-center mb-6 p-4 bg-primary/10 rounded-lg animate-bounce">
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
                  <h3 className="text-xl font-serif font-bold">You Won!</h3>
                  <p className="text-sm text-muted-foreground">
                    {moves} moves in {time} seconds
                  </p>
                </div>
              )}

              <div className="grid grid-cols-4 gap-4">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all duration-300 transform ${
                      card.isFlipped || card.isMatched
                        ? "bg-gradient-to-br from-primary to-accent scale-105"
                        : "bg-card hover:scale-105"
                    } ${card.isMatched ? "opacity-50" : ""}`}
                  >
                    {card.isFlipped || card.isMatched ? card.value : "?"}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
