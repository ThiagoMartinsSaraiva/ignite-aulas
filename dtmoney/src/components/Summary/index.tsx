import { useContext } from 'react';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../TransactionsContext';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce((acc, transition) => {
    if (transition.type === 'deposit') {
      acc.deposits += transition.amount
      acc.total += transition.amount
    } else {
      acc.withdraws += transition.amount
      acc.total -= transition.amount
    }

    return acc
  }, { 
    deposits: 0,
    withdraws: 0,
    total: 0
  })

  function currencyFormat(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>{currencyFormat(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas"/>
        </header>
        <strong>- {currencyFormat(summary.withdraws)}</strong>
      </div>

      <div className="hightlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total"/>
        </header>
        <strong>{currencyFormat(summary.total)}</strong>
      </div>
    </Container>
  )
}