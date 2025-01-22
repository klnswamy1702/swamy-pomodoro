import Head from 'next/head'
// import PomodoroTimer from '@/components/PomodoroTimer'
import PomodoroTimer from '@/components/PomodoroTimer'


export default function Home() {
  return (
    <>
      <Head>
        <title>Pomodoro Timer</title>
      </Head>
      <main>
        <PomodoroTimer />
      </main>
    </>
  )
}
