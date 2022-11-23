import { Routes, Route } from 'react-router-dom'
import { PageNotImplemented } from './components/NotImplemented'
import TabBarLayout from './layouts/TabBarLayout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { TransactionsHistory } from './pages/TransactionHistory'
import { Transactions } from './pages/Transactions'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<TabBarLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cards" element={<PageNotImplemented />} />
        <Route path="/transactions-history" element={<TransactionsHistory />} />
        <Route path="/profile" element={<PageNotImplemented />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  )
}
