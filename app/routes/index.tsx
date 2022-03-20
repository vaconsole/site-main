import { Link } from 'remix'

export default function Index() {
  return (
    <div>
      <h1> wellcome to remix app</h1>

      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
  )
}
