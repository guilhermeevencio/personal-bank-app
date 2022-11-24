import { AxiosError } from 'axios'
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { IUser } from '../../interfaces/User'
import { createTransactionRequest } from '../../services/requests'
import styles from './styles.module.css'

export function CreateTransactionForm() {
  const [creditedAccount, setCreditedAccount] = useState('')
  const [description, setDecription] = useState('')
  const [transactionValue, setTransactionValue] = useState(0)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const userInfoFromLS = localStorage.getItem('userInfo')
    if (userInfoFromLS) {
      const parsedUserInfo = JSON.parse(userInfoFromLS)
      setUser(parsedUserInfo)
    }
  }, [])

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const { id, value } = e.currentTarget
    switch (id) {
      case 'creditedAccount':
        setCreditedAccount(value)
        break
      case 'value':
        setTransactionValue(Number(value))
        break
      case 'description':
        setDecription(value)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const transactionResponse = await createTransactionRequest({
      debitedAccountId: user?.account.id || '',
      creditedAccount,
      description,
      value: transactionValue * 100,
      token: user?.token || '',
    })

    if (transactionResponse instanceof AxiosError) {
      setSuccess(false)
      setErrorMessage('Verifique se os campos foram corretamente preenchidos.')
    } else {
      setErrorMessage(null)
      setSuccess(true)
      setCreditedAccount('')
      setDecription('')
      setTransactionValue(0)
    }
  }

  return (
    <div className={styles.createTransactionFormContainer}>
      <h2>Criar Transação</h2>
      <form onSubmit={handleSubmit} className={styles.formStyle}>
        <div className={styles.inputDiv}>
          <label htmlFor="creditedAccount">Enviar para</label>
          <input
            type="text"
            id="creditedAccount"
            onChange={handleChange}
            value={creditedAccount}
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            onChange={handleChange}
            id="description"
            value={description}
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="value"> Valor</label>
          <input
            type="number"
            id="value"
            onChange={handleChange}
            value={String(transactionValue)}
          />
        </div>
        <button>Finalizar transação</button>
        {success ? <p>Transferência realizada com sucesso!</p> : null}
        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  )
}
