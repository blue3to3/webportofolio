import useScrollReveal from "../hooks/useScrollReveal"

function About() {

  useScrollReveal()

  return (
    <main className="bg-gray-50 px-10 py-20">

      <section className="reveal text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800">
          About
        </h1>

        <p className="mt-6 text-gray-500 leading-relaxed">
          A fashion designer from Indonesia focused on character,
          proportion, and refined visual development.
        </p>
      </section>

      <section className="reveal mt-16 bg-white rounded-2xl p-10 shadow-sm max-w-4xl mx-auto">
        <p className="text-gray-600 leading-relaxed mb-6">
          Since beginning my professional journey in 2023, I have collaborated
          with established brands across creative fashion projects.
        </p>

        <p className="text-gray-600 leading-relaxed">
          My design process explores silhouette, material sensitivity,
          and structural detailing to create contemporary fashion work
          that feels thoughtful and grounded.
        </p>
      </section>

    </main>
  )
}

export default About
