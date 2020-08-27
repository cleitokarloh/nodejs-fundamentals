import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface BalanceData {
  income: number | 0;
  outcome: number | 0;
}

interface CreateTransactionDTO {
  title: string; value: number; type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const balance = this.transactions.reduce((prev, b) => {

      if(b.type === 'income') {
        prev.income += b.value;
        prev.total += b.value;
      }

      if(b.type === 'outcome') {
        prev.outcome += b.value;
        prev.total -= b.value;
      }

      return prev;
    }, {
      income: 0,
      outcome:0,
      total: 0
    });

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transction = new Transaction({title, value, type});

    this.transactions.push(transction);

    return transction;
  }
}

export default TransactionsRepository;
