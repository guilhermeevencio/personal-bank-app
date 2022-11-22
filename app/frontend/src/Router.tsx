import { Routes, Route } from 'react-router-dom'
import { PageNotImplemented } from './components/NotImplemented'
import TabBarLayout from './layouts/TabBarLayout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { TransactionsHistory } from './pages/TransactionHistory'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<TabBarLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cards" element={<PageNotImplemented />} />
        <Route path="/transactions-history" element={<TransactionsHistory />} />
        <Route path="/profile" element={<PageNotImplemented />} />
        <Route path="/transactions" element={<PageNotImplemented />} />
      </Route>
    </Routes>
  )
}
