import { Routes, Route } from 'react-router-dom'
import { PageNotImplemented } from './components/NotImplemented'
import TabBarLayout from './components/TabBar'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<TabBarLayout />}>
        <Route path="/home" element={<PageNotImplemented />} />
        <Route path="/cards" element={<PageNotImplemented />} />
        <Route path="/transactions-history" element={<PageNotImplemented />} />
        <Route path="/profile" element={<PageNotImplemented />} />
        <Route path="/transactions" element={<PageNotImplemented />} />
      </Route>
    </Routes>
  )
}
