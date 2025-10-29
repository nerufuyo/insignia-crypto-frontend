import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../common/Card';
import { SkeletonLoader } from '../common/Loading';
import { transactionService } from '../../services/transaction.service';
import { formatCurrency } from '../../utils/format';

export const StatsCards = ({ refreshKey }: { refreshKey: number }) => {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalTopups: 0,
    totalTransfers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [refreshKey]);

  const loadStats = async () => {
    try {
      const transactions = await transactionService.getUserTopTransactions();
      
      const totalTopups = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalTransfers = Math.abs(
        transactions
          .filter(t => t.amount < 0)
          .reduce((sum, t) => sum + t.amount, 0)
      );

      setStats({
        totalTransactions: transactions.length,
        totalTopups,
        totalTransfers,
      });
    } catch (error) {
      console.error('Load stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Transactions',
      value: stats.totalTransactions.toString(),
      icon: faReceipt,
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Top-ups',
      value: formatCurrency(stats.totalTopups),
      icon: faArrowUp,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Transfers',
      value: formatCurrency(stats.totalTransfers),
      icon: faArrowDown,
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card hoverable className="flex items-center space-x-4">
            <div className={`p-4 rounded-xl ${stat.lightBg}`}>
              <FontAwesomeIcon icon={stat.icon} className={`text-2xl ${stat.textColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              {loading ? (
                <SkeletonLoader className="h-8 w-24" />
              ) : (
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  {stat.value}
                </motion.p>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
