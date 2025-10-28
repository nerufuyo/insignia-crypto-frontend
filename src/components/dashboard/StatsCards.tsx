import { useState, useEffect } from 'react';
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
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'blue',
    },
    {
      title: 'Total Top-ups',
      value: formatCurrency(stats.totalTopups),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: 'green',
    },
    {
      title: 'Total Transfers',
      value: formatCurrency(stats.totalTransfers),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: 'purple',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title} className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-gray-600">{stat.title}</p>
            {loading ? (
              <SkeletonLoader className="h-8 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
