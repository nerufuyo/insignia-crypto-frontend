import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
        <Link 
          to="/transactions"
          className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          View all
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
        </Link>
      }
    >
      {loading ? (
        <div className="py-12">
          <LoadingSpinner />
        </div>
      ) : transactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FontAwesomeIcon icon={faArrowUp} className="text-2xl text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No transactions yet</p>
          <p className="text-sm text-gray-400 mt-1">Your transaction history will appear here</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    transaction.amount > 0 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    <FontAwesomeIcon 
                      icon={transaction.amount > 0 ? faArrowDown : faArrowUp}
                      className={`text-xl ${
                        transaction.amount > 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {transaction.amount > 0 ? 'Received from' : 'Sent to'}{' '}
                      <span className="text-primary-600">{transaction.username}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {formatRelativeTime(transaction.created_at)}
                    </p>
                  </div>
                </div>
                <div className={`font-bold text-lg ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Card>
  );
};
