import Viewer3D from '@/components/viewer/Viewer3D'
import Sidebar from '@/components/sidebar/Sidebar'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Viewer3D />
        <Sidebar />
      </div>
    </main>
  )
}