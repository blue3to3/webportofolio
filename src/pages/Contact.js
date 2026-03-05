import useScrollReveal from "../hooks/useScrollReveal"

function Contact() {
  useScrollReveal()
  return (
    <main className="bg-gray-50 px-10 py-20">

      <section className="reveal text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800">
          Let’s Talk
        </h1>

        <p className="mt-6 text-gray-500 leading-relaxed">
          For collaboration inquiries or project discussions,
          feel free to reach out.
        </p>
      </section>

      <section className="reveal mt-16 bg-white rounded-2xl p-10 shadow-sm max-w-xl mx-auto">
        <div className="space-y-4 text-gray-600 text-sm">
          <p>
            Email —{" "}
            <a
              href="mailto:jassonimanuel176@gmail.com"
              className="hover:text-black transition"
            >
              jassonimanuel176@gmail.com
            </a>
          </p>

          <p>
            Instagram —{" "}
            <a
              href="https://instagram.com/jassonthedesigner"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition"
            >
              @jassonthedesigner
            </a>
          </p>
        </div>
      </section>

    </main>
  )
}

export default Contact
