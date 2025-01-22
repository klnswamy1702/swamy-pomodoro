"use client"
import { useState, useEffect } from 'react'
// import { Button } from "./components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Play, Pause, X } from "lucide-react"
// import { Input } from "./components/ui/input"
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";


export default function PomodoroTimer() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus')
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      playSound()
      if (mode === 'focus') {
        setMode('break')
        setTimeLeft(breakTime * 60)
      } else {
        setMode('focus')
        setTimeLeft(focusTime * 60)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, mode, focusTime, breakTime])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMode('focus')
    setTimeLeft(focusTime * 60)
  }

  const playSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRi4AAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAIAAAAC')
    audio.play()
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFocusTime = parseInt(e.target.value, 10)
    setFocusTime(newFocusTime)
    if (mode === 'focus') setTimeLeft(newFocusTime * 60)
  }

  const handleBreakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBreakTime = parseInt(e.target.value, 10)
    setBreakTime(newBreakTime)
    if (mode === 'break') setTimeLeft(newBreakTime * 60)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Pomodoro Timer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center space-x-4">
            <Button
              variant={mode === 'focus' ? 'default' : 'outline'}
              onClick={() => {
                setMode('focus')
                setTimeLeft(focusTime * 60)
                setIsActive(false)
              }}
            >
              Focus
            </Button>
            <Button
              variant={mode === 'break' ? 'default' : 'outline'}
              onClick={() => {
                setMode('break')
                setTimeLeft(breakTime * 60)
                setIsActive(false)
              }}
            >
              Break
            </Button>
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold mb-8">{formatTime(timeLeft)}</div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Focus Time</p>
                <div className="flex justify-center items-center space-x-2">
                  <Input
                    type="number"
                    value={focusTime}
                    onChange={handleFocusChange}
                    className="w-16 text-center"
                    min="1"
                    max="60"
                  />
                  <span className="text-sm">m</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Break Time</p>
                <div className="flex justify-center items-center space-x-2">
                  <Input
                    type="number"
                    value={breakTime}
                    onChange={handleBreakChange}
                    className="w-16 text-center"
                    min="1"
                    max="15"
                  />
                  <span className="text-sm">m</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                onClick={toggleTimer}
                className="w-32"
              >
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={resetTimer}
                className="w-32"
              >
                <X className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}