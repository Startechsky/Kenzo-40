import { useEffect, useState } from 'react'
import heroImage from './assets/kenzo/kenzo-hero.jpeg'
import cakeImage from './assets/kenzo/kenzo-cake.jpeg'
import familyImage from './assets/kenzo/kenzo-family.jpeg'
import memoryImage from './assets/kenzo/kenzo-memory.jpeg'
import { celebrantProfile, quizDatabase, type QuizQuestion } from './data/quiz'

type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

type GradeInfo = {
  label: string
  summary: string
  accent: string
}

const eventDate = new Date('2026-05-03T13:00:00+01:00')

const memoryPhotos = [
  {
    src: heroImage,
    title: 'Kenzo in focus',
    caption: 'A calm and confident moment that sets the tone for the celebration.',
  },
  {
    src: cakeImage,
    title: 'Cake table glow',
    caption: 'A beautiful frame for the memories, candles, and birthday smiles.',
  },
  {
    src: familyImage,
    title: 'Family joy',
    caption: 'A reminder that birthdays are brightest when shared with loved ones.',
  },
  {
    src: memoryImage,
    title: 'Moments of gratitude',
    caption: 'A meaningful snapshot that adds warmth and personality to the page.',
  },
]

const schedule = [
  {
    time: '2:00 PM',
    title: 'Arrival & Welcome',
    note: 'Guests settle in, connect, and ease into the blue-orange celebration mood.',
  },
  {
    time: '3:00 PM',
    title: 'Tributes for Kenzo',
    note: 'A window for warm words, laughter, and reflections on Solomon’s journey.',
  },
  {
    time: '4:00 PM',
    title: 'Cake, Photos & Cheers',
    note: 'The big smile moment with cake, snapshots, and joyful birthday wishes.',
  },
  {
    time: '5:00 PM',
    title: 'Quiz & Celebration Flow',
    note: 'Friends and family take the Kenzo challenge before the evening continues.',
  },
]

const funFacts = [
  { label: 'Best Food', value: celebrantProfile.favoriteFood },
  { label: 'Best Color', value: celebrantProfile.favoriteColor },
  { label: 'Hobby', value: celebrantProfile.hobby },
  { label: 'Alias', value: celebrantProfile.alias },
  { label: 'Venue', value: `${celebrantProfile.venue}, ${celebrantProfile.area}` },
  { label: 'City', value: celebrantProfile.city },
]

function shuffleQuestions(questions: QuizQuestion[]) {
  const pool = [...questions]

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[pool[index], pool[randomIndex]] = [pool[randomIndex], pool[index]]
  }

  return pool.slice(0, 5)
}

function getCountdownParts(targetDate: Date): CountdownParts {
  const difference = targetDate.getTime() - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function getGrade(score: number): GradeInfo {
  if (score === 5) {
    return {
      label: 'Kenzo Royalty',
      summary: 'You know Kenzo extremely well. This is top-tier birthday-circle knowledge.',
      accent: 'bg-orange-500 text-white',
    }
  }

  if (score >= 3) {
    return {
      label: 'Inner Circle',
      summary: 'You know Kenzo pretty well and clearly came ready for the celebration.',
      accent: 'bg-blue-600 text-white',
    }
  }

  return {
    label: 'Getting Warmer',
    summary: 'You are on your way. One more round and you may earn your place in the inner circle.',
    accent: 'bg-white text-slate-900',
  }
}

function App() {
  const [countdown, setCountdown] = useState<CountdownParts>(() => getCountdownParts(eventDate))
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>(() =>
    shuffleQuestions(quizDatabase),
  )
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(eventDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const score = selectedQuestions.reduce((total, question) => {
    return answers[question.id] === question.answer ? total + 1 : total
  }, 0)

  const grade = getGrade(score)

  function handleAnswer(questionId: number, option: string) {
    if (submitted) {
      return
    }

    setAnswers((current) => ({
      ...current,
      [questionId]: option,
    }))
  }

  function handleSubmitQuiz() {
    if (Object.keys(answers).length !== selectedQuestions.length) {
      return
    }

    setSubmitted(true)
  }

  function handleResetQuiz() {
    setSelectedQuestions(shuffleQuestions(quizDatabase))
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <main className="relative overflow-hidden bg-white] text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-300/35 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-orange-300/35 blur-3xl" />
        <div className="absolute bottom-16 left-1/3 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-4 bg-white/80 px-5 py-4 shadow-[0_18px_40px_rgba(37,99,235,0.08)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-['Cormorant_Garamond'] text-3xl font-semibold tracking-[0.18em] text-blue-950">
              KENZO AT MAY 3
            </p>
            <p className="text-sm uppercase tracking-[0.26em] text-slate-500">
              Birthday one-page celebration
            </p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
            <a className="rounded-full px-4 py-2 transition hover:bg-blue-50" href="#story">
              Story
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-orange-50" href="#gallery">
              Gallery
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-blue-50" href="#quiz">
              Quiz Game
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
              Celebrating Solomon Adekunle Adediran
            </p>
            <h1 className="mt-6 font-['Cormorant_Garamond'] text-6xl font-semibold leading-none text-balance text-slate-950 sm:text-7xl lg:text-[6.5rem]">
              Kenzo&apos;s day, painted in blue, orange, and white.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              This personalized birthday website celebrates Solomon Adekunle
              Adediran, also known as Kenzo, with his event details, personal
              moments, and a fun quiz game for friends and family.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#quiz"
                className="rounded-full bg-blue-700 px-7 py-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(37,99,235,0.2)] transition hover:-translate-y-0.5"
              >
                Play Kenzo Challenge
              </a>
              <a
                href="#gallery"
                className="rounded-full border border-orange-200 bg-white px-7 py-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-slate-900 transition hover:bg-orange-50"
              >
                See Memories
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Alias</p>
                <p className="mt-3 font-['Cormorant_Garamond'] text-4xl font-semibold text-blue-950">
                  {celebrantProfile.alias}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Date</p>
                <p className="mt-3 font-['Cormorant_Garamond'] text-4xl font-semibold text-blue-950">
                  3 May 2026
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Venue</p>
                <p className="mt-3 font-['Cormorant_Garamond'] text-3xl font-semibold text-blue-950">
                  Ibadan
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[linear-gradient(135deg,_rgba(59,130,246,0.18),_rgba(249,115,22,0.2))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <img
                src={heroImage}
                alt="Solomon Adekunle Adediran speaking during a gathering"
                className="h-[24rem] w-full object-cover object-top sm:h-[30rem]"
              />
              <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
                <div className="rounded-[1.75rem] bg-blue-700 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.24em] text-blue-100/80">Venue</p>
                  <p className="mt-3 font-['Cormorant_Garamond'] text-3xl">
                    {celebrantProfile.venue}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-blue-50/80">
                    {celebrantProfile.area}, {celebrantProfile.city}
                  </p>
                </div>
                <div className="rounded-[1.75rem] bg-orange-100 p-5 text-slate-900">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Color Story</p>
                  <p className="mt-3 font-['Cormorant_Garamond'] text-3xl text-orange-700">
                    Blue. Orange. White.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    A fresh and joyful palette with warmth, brightness, and calm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto w-full max-w-7xl px-6 py-4 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2.5rem] border border-blue-100 bg-white/85 p-8 shadow-[0_24px_60px_rgba(37,99,235,0.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900/70">
              The Story
            </p>
            <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl text-slate-950">
              Honoring Solomon Adekunle Adediran in a way that feels personal.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Built for May 3, 2026, this page centers Kenzo&apos;s name, place,
              and personality. It keeps the experience simple on one page while
              adding enough detail to feel warm, thoughtful, and memorable.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {funFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{fact.label}</p>
                  <p className="mt-3 font-['Cormorant_Garamond'] text-3xl text-slate-950">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-[linear-gradient(160deg,_#0f3f91_0%,_#0f5cc0_52%,_#fd8f2d_100%)] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-white/65">Countdown</p>
            <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl">The celebration is getting closer.</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-[1.5rem] bg-white/12 p-4 text-center backdrop-blur">
                <p className="font-['Cormorant_Garamond'] text-4xl">{countdown.days}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/70">Days</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/12 p-4 text-center backdrop-blur">
                <p className="font-['Cormorant_Garamond'] text-4xl">{countdown.hours}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/70">Hours</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/12 p-4 text-center backdrop-blur">
                <p className="font-['Cormorant_Garamond'] text-4xl">{countdown.minutes}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/70">Minutes</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/12 p-4 text-center backdrop-blur">
                <p className="font-['Cormorant_Garamond'] text-4xl">{countdown.seconds}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/70">Seconds</p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] bg-white/12 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-white/70">Address</p>
              <p className="mt-3 text-lg leading-8 text-white/95">
                {celebrantProfile.venue}, {celebrantProfile.area}.{' '}
                {celebrantProfile.city}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="rounded-[2.75rem] border border-orange-100 bg-white/85 p-8 shadow-[0_28px_80px_rgba(249,115,22,0.08)] sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700/80">
                Gallery
              </p>
              <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl text-slate-950">
                Personal moments that make the page feel like Kenzo.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Photos from the shared archive are now part of the page, giving the
              site a more real and heartfelt presence.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {memoryPhotos.map((photo) => (
              <article
                key={photo.title}
                className="overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-72 w-full object-cover object-top"
                />
                <div className="p-6">
                  <h3 className="font-['Cormorant_Garamond'] text-3xl text-slate-950">
                    {photo.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{photo.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-2 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-white/60">Celebration Flow</p>
            <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl">
              A smooth birthday rhythm from arrival to the challenge.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              This section keeps the day organized while preserving the joyful,
              personal tone of the page.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-blue-100 bg-white/85 p-6 shadow-[0_30px_80px_rgba(37,99,235,0.08)] sm:p-8">
            <div className="space-y-4">
              {schedule.map((item) => (
                <div
                  key={item.time}
                  className="grid gap-3 rounded-[1.75rem] border border-slate-100 bg-slate-50/80 p-5 sm:grid-cols-[120px_1fr]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                    {item.time}
                  </p>
                  <div>
                    <p className="font-['Cormorant_Garamond'] text-3xl text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quiz" className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-12 lg:pb-20">
        <div className="rounded-[2.75rem] border border-white/80 bg-[linear-gradient(135deg,_rgba(14,60,140,0.98),_rgba(20,84,170,0.96)_40%,_rgba(249,115,22,0.94)_100%)] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.28em] text-white/65">Kenzo Challenge</p>
              <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl">
                Five random questions from a twenty-question birthday database.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/80">
                Each player gets a different set of five questions. Submit all five
                answers to receive a performance grade in one of three tiers.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetQuiz}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-950 transition hover:-translate-y-0.5"
            >
              New 5 Questions
            </button>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              {selectedQuestions.map((question, index) => (
                <article
                  key={question.id}
                  className="rounded-[2rem] bg-white/10 p-5 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/65">
                    Question {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-8 text-white">
                    {question.prompt}
                  </h3>

                  <div className="mt-5 grid gap-3">
                    {question.options.map((option) => {
                      const isSelected = answers[question.id] === option
                      const isCorrect = submitted && question.answer === option
                      const isWrongSelection =
                        submitted && isSelected && question.answer !== option

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleAnswer(question.id, option)}
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                            isCorrect
                              ? 'border-emerald-300 bg-emerald-400/20 text-white'
                              : isWrongSelection
                                ? 'border-red-300 bg-red-400/20 text-white'
                                : isSelected
                                  ? 'border-white bg-white text-blue-950'
                                  : 'border-white/20 bg-white/6 text-white/90 hover:bg-white/12'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] bg-white/12 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.24em] text-white/65">Scoring</p>
                <h3 className="mt-4 font-['Cormorant_Garamond'] text-4xl">Three result tiers</h3>
                <div className="mt-6 space-y-3 text-sm leading-7 text-white/85">
                  <p>0-2 correct: Getting Warmer</p>
                  <p>3-4 correct: Inner Circle</p>
                  <p>5 correct: Kenzo Royalty</p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white/12 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.24em] text-white/65">Your Result</p>
                <p className="mt-4 font-['Cormorant_Garamond'] text-6xl">{score}/5</p>
                <div className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] ${grade.accent}`}>
                  {grade.label}
                </div>
                <p className="mt-4 text-base leading-7 text-white/85">{grade.summary}</p>

                {!submitted ? (
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(answers).length !== selectedQuestions.length}
                    className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-950 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="mt-6 rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:-translate-y-0.5"
                  >
                    Play Again
                  </button>
                )}
              </div>

              <div className="rounded-[2rem] bg-white/12 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.24em] text-white/65">Quick Note</p>
                <p className="mt-4 text-base leading-7 text-white/85">
                  The quiz bank includes twenty stored questions, with favorite
                  food, favorite color, and hobby already included for Kenzo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
