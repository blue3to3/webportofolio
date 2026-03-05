import { Link } from "react-router-dom"

function WorkCard({ work }) {
  return (
    <Link to={`/works/${work.id}`} className="group block">
      <div className="bg-surface rounded-xl p-4 shadow-sm border border-border">
        {work.cover && (
          <img
            src={work.cover}
            alt={work.title}
            className="transition-opacity duration-300 group-hover:opacity-80"
          />
        )}
      </div>

      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
        {work.category}
      </p>
      <p className="text-sm">{work.title}</p>
      <p className="text-xs text-gray-400">{work.year}</p>
    </Link>
  )
}

export default WorkCard
