import React, { FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { IUser } from '../../interfaces/User'
import { transactionsHistoryRequest } from '../../services/requests'

export function TransactionsHistoryForm() {
  const [minDate, setMinDate] = useState<string>('')
  const [maxDate, setMaxDate] = useState<string>('')
  const [user, setUser] = useState<IUser | null>(null)
  const [operation, setOperation] = useState('')

  useEffect(() => {
    const userInfoFromLS = localStorage.getItem('userInfo')
    if (userInfoFromLS) {
      const parsedUserInfo = JSON.parse(userInfoFromLS)
      setUser(parsedUserInfo)
    }
  }, [])

  console.log(user?.account.id, minDate, maxDate, operation)

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const id = e.currentTarget.id
    switch (id) {
      case 'minDate':
        setMinDate(e.currentTarget.value)
        break
      case 'maxDate':
        setMaxDate(e.currentTarget.value)
        break
      default:
        break
    }
  }

  const handleOperationChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    console.log(e.currentTarget.value)
    setOperation(e.currentTarget.value)
  }

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault()
    if (user) {
      const teste = await transactionsHistoryRequest({
        minDate,
        maxDate,
        accountId: user?.account.id,
        operation,
        token: user?.token,
      })
      console.log(teste)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          placeholder="menor data..."
          id="minDate"
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="maior data..."
          id="maxDate"
          onChange={handleChange}
        />
        <select
          id="operation"
          placeholder="tipo de transação..."
          onChange={handleOperationChange}
        >
          <option disabled>selecione um tipo</option>
          <option value="all">Todas</option>
          <option value="cash-in">Transefências Realizadas</option>
          <option value="cash-out">Transferências Recebidas</option>
        </select>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}