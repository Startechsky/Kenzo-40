import { useEffect, useRef, useState } from 'react'
import heroImage from './assets/kenzo/kenzo-woman.jpeg'
import cakeImage from './assets/kenzo/kenzo-family2.jpeg'
import familyImage from './assets/kenzo/kenzo parents.jpeg'
import memoryImage from './assets/kenzo/kenzo-phd.jpeg'
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
    title: 'The Woman Of Kenzos Dreams',
    caption: 'A man focused and determined for the kingdom expansion.',
  },
  {
    src: cakeImage,
    title: 'Family',
    caption: 'A reminder that birthdays are brightest when shared with loved ones',
  },
  {
    src: familyImage,
    title: 'The Ones who raised the General',
    caption: 'Bishop & Evang Adediran..',
  },
  {
    src: memoryImage,
    title: 'Phd In The Bag',
    caption: 'Kenzo pursued his phd with the same discipline and focus that he applies to all areas of his life, and we celebrate this milestone as part of his story.',
  },
]

const schedule = [
  {
    time: '2:00 PM',
    title: 'Arrival & Welcome',
    note: 'Guests settle in, connect, and ease into the orange and white celebration mood.',
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

const storyChapters = [
  {
    title: 'Academic Background',
    body: 'Kenzo\'s academic story reflects focus, discipline, and the steady courage to keep growing. His education shaped the confidence, clarity, and thoughtful leadership that family, friends, and community continue to celebrate today.',
  },
  {
    title: 'Life Journey',
    body: 'Through different seasons, Solomon Adekunle Adediran has carried himself with grace, warmth, and purpose. His journey is marked by resilience, meaningful relationships, and a heart that keeps showing up for the people around him.',
  },
  {
    title: 'Ministry Journey',
    body: 'His ministry journey speaks of service, faith, and a sincere desire to be a blessing. Whether through encouragement, presence, or responsibility, Kenzo\'s walk continues to reflect devotion and quiet strength.',
  },
  {
    title: 'Family History',
    body: 'Family remains one of the strongest threads in Kenzo\'s story. His life is surrounded by love, shared memories, guidance, gratitude, and the kind of support that makes a milestone like forty feel deeply meaningful.',
  },
]

const wishes = [
  {
    name: 'E.E',
    message: 'The Lord be merciful to you, as you celebrate- Oceanic Babs!!',
  },
  {
    name: 'Titilade Udofia',
    message: ' Being a great and wonderful brother that you are, come rain come shine, you are faithful and reliable brother indeed, you are always ready to stretch and go extra mile even when inconvenient for you. ',
  },
  // {
  //   name: 'Barr. Mojisola Adediran ',
  //   message: 'Happy birthday to my beloved husband.You have taught me so much about living in peace, loving genuinely, and giving generously. Your life is a reflection of kindness, respect, and discipline, and I am grateful every day for the man you are.You are not only an amazing husband but also a great father, always present, caring, and intentional. The love and guidance you give to our family speak volumes about your heart. Your commitment to God’s work and your passion for helping humanity continue to inspire me and everyone around you. Today, I pray that the Lord will strengthen you, increase your wisdom, and grant you greater grace to fulfill your calling. May your life be filled with joy, good health, and divine favour. May God continue to use you mightily and reward your labour of love abundantly. I celebrate you today and always. Happy birthday,  Solo my Love.',
  // },
  {
    name: 'Akintunde',
    message: 'Apostle sir, thank you for being an example of a believer. May your walk with God ever be stronger and may He lead you daily. Congrats on your new age.',
  },
  {
    name: 'Abraham Bolarinwa',
    message: 'Happy birthday to you sir, thank you for embodying the realities of godliness, meekness, compassion and love. Thanks for all the years of fatherly counsel. Our prayer is that the path before you shines brighter and brighter. Amen.',
  },
  {
    name: 'Olatinwo Abiodun Timileyin ',
    message: 'Happy birthday Father, you are truly a father, leader and a great inspiration to us. Thank you for the mentorship, privileges and platforms. It is a blessing knowing you and working with you sir. You have blessed me and my fiancee in no little way and I pray that the Lord God of your covenant will keep you, increase you and anoint you the more in Jesus name. I love you sir',
  },
  {
    name: 'Temidayo Adefioye ',
    message: '"Happy birthday! Wishing you a day filled with love, laughter, and all your favorite things! 🎂" And thanks for all you do for me in my office career.',
  },
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
      accent: 'bg-orange-600 text-white',
    }
  }

  return {
    label: 'Getting Warmer',
    summary: 'You are on your way. One more round and you may earn your place in the inner circle.',
    accent: 'bg-white text-orange-950',
  }
}

function App() {
  const wishesTrackRef = useRef<HTMLDivElement>(null)
  const [countdown, setCountdown] = useState<CountdownParts>(() => getCountdownParts(eventDate))
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>(() =>
    shuffleQuestions(quizDatabase),
  )
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [wishIndex, setWishIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(eventDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const revealTargets = document.querySelectorAll('.scroll-reveal, .reveal-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    revealTargets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWishIndex((current) => (current + 1) % wishes.length)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const track = wishesTrackRef.current
    const activeCard = track?.children[wishIndex] as HTMLElement | undefined

    if (!track || !activeCard) {
      return
    }

    track.scrollTo({
      left: activeCard.offsetLeft,
      behavior: 'smooth',
    })
  }, [wishIndex])

  const score = selectedQuestions.reduce((total, question) => {
    return answers[question.id] === question.answer ? total + 1 : total
  }, 0)

  const grade = getGrade(score)
  const currentQuestion = selectedQuestions[currentQuestionIndex]
  const answeredCount = Object.keys(answers).length

  function handleAnswer(questionId: number, option: string) {
    if (submitted) {
      return
    }

    setAnswers((current) => {
      if (current[questionId]) {
        return current
      }

      return {
        ...current,
        [questionId]: option,
      }
    })

    if (currentQuestionIndex === selectedQuestions.length - 1) {
      setSubmitted(true)
      return
    }

    setCurrentQuestionIndex((current) => current + 1)
  }

  function handleResetQuiz() {
    setSelectedQuestions(shuffleQuestions(quizDatabase))
    setAnswers({})
    setSubmitted(false)
    setCurrentQuestionIndex(0)
  }

  function showPreviousWish() {
    setWishIndex((current) => (current === 0 ? wishes.length - 1 : current - 1))
  }

  function showNextWish() {
    setWishIndex((current) => (current + 1) % wishes.length)
  }

  return (
    <main className="relative overflow-hidden bg-orange-50 text-orange-950">
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-300/35 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-orange-300/35 blur-3xl" />
        <div className="absolute bottom-16 left-1/3 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />
      </div> */}

      <section className="scroll-reveal flex min-h-screen w-full flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex flex-col gap-4 justify-between border-b-2 border-orange-100 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-['Cormorant_Garamond'] text-3xl font-semibold tracking-[0.18em] text-orange-700">
              KENZO
            </p>
            {/* <p className="text-sm uppercase tracking-[0.26em] text-slate-500">
              Birthday one-page celebration
            </p> */}
          </div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-800">
            40th Birthday Celebration - 3 May 2026
          </div>
          <nav className="flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-800">
            <a className="rounded-full px-4 py-2 transition hover:bg-white" href="#story">
              Story
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-orange-50" href="#gallery">
              Gallery
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white" href="#quiz">
              Quiz Game
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1fr_1fr] lg:py-14">
          <div className="max-w-5xl">
            <p className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-orange-800">
              Celebrating Solomon Adekunle Adediran
            </p>
            <h1 className="mt-6 font-['Cormorant_Garamond'] text-6xl font-semibold leading-none text-balance text-orange-950 sm:text-7xl lg:text-[6.5rem]">
              Kenzo @ 40. Celebrate A Man Of Grace
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-orange-900 sm:text-xl">
              Today we celebrate a man of wisdom, faith, and love. Kenzo is a reflection of what a life refined by discipline, grace, and purpose can become. Join us in honoring his journey, his impact, and the joy he brings to everyone around him.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#quiz"
                className="rounded-full bg-orange-600 px-7 py-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(249,115,22,0.22)] transition hover:-translate-y-0.5 hover:bg-orange-700"
              >
                Play Kenzo Challenge
              </a>
              <a
                href="#gallery"
                className="rounded-full border border-orange-200 bg-white px-7 py-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-orange-950 transition hover:bg-orange-100"
              >
                See Memories
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-orange-100 bg-white p-5 shadow-[0_18px_50px_rgba(249,115,22,0.08)]">
                <p className="text-xs uppercase tracking-[0.26em] text-orange-600">Alias</p>
                <p className="mt-3 font-['Cormorant_Garamond'] text-4xl font-semibold text-orange-950">
                  {celebrantProfile.alias}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-orange-100 bg-white p-5 shadow-[0_18px_50px_rgba(249,115,22,0.08)]">
                <p className="text-xs uppercase tracking-[0.26em] text-orange-600">Date</p>
                <p className="mt-3 font-['Cormorant_Garamond'] text-4xl font-semibold text-orange-950">
                  3 May 2026
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-orange-100 bg-white p-5 shadow-[0_18px_50px_rgba(249,115,22,0.08)]">
                <p className="text-xs uppercase tracking-[0.26em] text-orange-600">Venue</p>
                <p className="mt-3 font-['Cormorant_Garamond'] text-3xl font-semibold text-orange-950">
                  Ibadan
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Solomon Adekunle Adediran speaking during a gathering"
              className="h-[30rem] w-full max-w-[42rem] object-contain object-top sm:h-[38rem] lg:h-[46rem]"
            />
          </div>
        </div>
      </section>

      <section id="story" className="scroll-reveal w-full px-6 py-4 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2.5rem] border border-orange-100 bg-white p-8 shadow-[0_24px_60px_rgba(249,115,22,0.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
              The Story
            </p>
            <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl text-orange-950">
              Solomon Adediran is a representation of what a man refined by discipline, grace, and purpose can become.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-orange-900 sm:text-lg">
              Here we learn about kenzo's background and stages of growth
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {storyChapters.map((chapter) => (
                <div
                  key={chapter.title}
                  className="reveal-item rounded-[1.5rem] border border-orange-100 bg-orange-50 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-orange-600">
                    {chapter.title}
                  </p>
                  <p className="mt-3 text-base leading-7 text-orange-950">
                    {chapter.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-orange-600 p-8 text-white shadow-[0_30px_80px_rgba(249,115,22,0.18)] sm:p-10">
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

      <section className="scroll-reveal w-full px-6 py-12 sm:px-10 lg:px-12">
        <div className="rounded-[2.75rem] border border-orange-100 bg-white p-8 shadow-[0_28px_80px_rgba(249,115,22,0.08)] sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700/80">
                Speeches & Wishes
              </p>
              <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl text-orange-950">
                Words from family, friends, and well-wishers.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-orange-900">
              A warm space for tributes, prayers, and birthday wishes that honor
              Kenzo&apos;s life, faith, and relationships.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={showPreviousWish}
                className="rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-950 transition hover:bg-orange-100"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={showNextWish}
                className="rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-orange-700"
              >
                Next
              </button>
            </div>

            <div className="flex gap-2">
              {wishes.map((wish, index) => (
                <button
                  key={wish.name}
                  type="button"
                  aria-label={`Show wish from ${wish.name}`}
                  onClick={() => setWishIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === wishIndex ? 'w-8 bg-orange-600' : 'w-3 bg-orange-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            ref={wishesTrackRef}
            className="wishes-carousel mt-8 flex gap-5 overflow-hidden scroll-smooth"
          >
            {wishes.map((wish) => (
              <article
                key={wish.name}
                className="wish-card reveal-item rounded-[2rem] border border-orange-100 bg-orange-50 p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
                  {wish.name}
                </p>
                <p className="mt-4 text-base leading-7 text-orange-950">{wish.message}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-reveal w-full px-6 py-12 sm:px-10 lg:px-12">
        <div className="rounded-[2.75rem] border border-orange-100 bg-white/85 p-8 shadow-[0_28px_80px_rgba(249,115,22,0.08)] sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700/80">
                Gallery
              </p>
              <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl text-orange-950">
                Beautiful moments captured in photos.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-orange-900">
              A peak into Kenzo's memories, milestones, and meaningful moments.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {memoryPhotos.map((photo) => (
              <article
                key={photo.title}
                className="reveal-item overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-[0_20px_50px_rgba(249,115,22,0.08)]"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-72 w-full object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-['Cormorant_Garamond'] text-3xl text-orange-950">
                    {photo.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-orange-900">{photo.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="scroll-reveal w-full px-6 py-2 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2.5rem] bg-orange-700 p-8 text-white shadow-[0_30px_80px_rgba(249,115,22,0.2)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-white/60">Celebration Flow</p>
            <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl">
              A smooth birthday rhythm from arrival to the challenge.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              This section keeps the day organized while preserving the joyful,
              personal tone of the page.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-orange-100 bg-white p-6 shadow-[0_30px_80px_rgba(249,115,22,0.08)] sm:p-8">
            <div className="space-y-4">
              {schedule.map((item) => (
                <div
                  key={item.time}
                  className="reveal-item grid gap-3 rounded-[1.75rem] border border-orange-100 bg-orange-50 p-5 sm:grid-cols-[120px_1fr]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-700">
                    {item.time}
                  </p>
                  <div>
                    <p className="font-['Cormorant_Garamond'] text-3xl text-orange-950">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-orange-900">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <section id="quiz" className="scroll-reveal w-full px-6 py-12 sm:px-10 lg:px-12 lg:pb-20">
        <div className="rounded-[2.75rem] border border-white bg-orange-600 p-8 text-white shadow-[0_30px_80px_rgba(249,115,22,0.18)] sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.28em] text-white/65">Kenzo Challenge</p>
              <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl">
                Play The Kenzo Challenge And Know Your Place.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/80">
                Each player gets a different set of five questions. Submit all five
                answers to receive a performance grade in one of three tiers.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetQuiz}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-950 transition hover:-translate-y-0.5"
            >
              New 5 Questions
            </button>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              {!submitted && currentQuestion ? (
                <article
                  key={currentQuestion.id}
                  className="rounded-[2rem] bg-white/10 p-5 backdrop-blur sm:p-7"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/65">
                    Question {currentQuestionIndex + 1} of {selectedQuestions.length}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-8 text-white">
                    {currentQuestion.prompt}
                  </h3>

                  <div className="mt-5 grid gap-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAnswer(currentQuestion.id, option)}
                        className="rounded-2xl border border-white/20 bg-white/6 px-4 py-3 text-left text-sm font-medium text-white/90 transition hover:bg-white hover:text-orange-950"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </article>
              ) : (
                <article className="rounded-[2rem] bg-white p-6 text-orange-950 shadow-[0_20px_50px_rgba(124,45,18,0.12)] sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
                    Final Result
                  </p>
                  <p className="mt-4 font-['Cormorant_Garamond'] text-6xl">{score}/5</p>
                  <div className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] ${grade.accent}`}>
                    {grade.label}
                  </div>
                  <p className="mt-4 text-base leading-7 text-orange-900">{grade.summary}</p>
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="mt-6 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
                  >
                    Play Again
                  </button>
                </article>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] bg-white/12 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.24em] text-white/65">Progress</p>
                <h3 className="mt-4 font-['Cormorant_Garamond'] text-4xl">
                  {submitted ? 'Challenge complete' : `${answeredCount}/5 answered`}
                </h3>
                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{ width: `${(answeredCount / selectedQuestions.length) * 100}%` }}
                  />
                </div>
                <div className="mt-6 space-y-3 text-sm leading-7 text-white/85">
                  <p>0-2 correct: Getting Warmer</p>
                  <p>3-4 correct: Inner Circle</p>
                  <p>5 correct: Kenzo Royalty</p>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white/12 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.24em] text-white/65">How It Works</p>
                <p className="mt-4 text-base leading-7 text-white/85">
                  Answer one question at a time. The next question appears
                  immediately, and the final score with grade shows only after all
                  five questions are complete.
                </p>
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
