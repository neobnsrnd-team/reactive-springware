import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import routes from '@/router/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로는 홈으로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
