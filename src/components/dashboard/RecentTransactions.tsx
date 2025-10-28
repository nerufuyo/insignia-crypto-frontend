import { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { LoadingSpinner } from '../common/Loading';
import { transactionService } from '../../services/transaction.service';
import { formatCurrency, formatRelativeTime } from '../../utils/format';
import type { Transaction } from '../../types';
import { Link } from 'react-router-dom';

export const RecentTransactions = ({ refreshKey }: { refreshKey: number }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, [refreshKey]);

  const loadTransactions = async () => {
    try {
      const data = await transactionService.getUserTopTransactions();
      setTransactions(data.slice(0, 5));
    } catch (error) {
      console.error('Load transactions error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Recent Transactions"
      action={
        <Link to="/transactions" className="text-sm text-primary-600 hover:text-primary-700">
          View all →
        </Link>
      }
    >
      {loading ? (
        <div className="py-8">
          <LoadingSpinner />
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No transactions yet
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.amount > 0 ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.amount > 0 ? 'Received from' : 'Sent to'} {transaction.username}
                  </p>
                  <p className="text-sm text-gray-500">{formatRelativeTime(transaction.created_at)}</p>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
