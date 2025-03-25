import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link href={'/properties'}>properties</Link>
    </div>
  )
}
