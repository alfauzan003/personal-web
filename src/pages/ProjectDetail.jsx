import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()
  return <div className="min-h-screen p-8">Project: {slug}</div>
}
