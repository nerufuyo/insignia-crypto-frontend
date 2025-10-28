import { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/Loading';
import { transactionService } from '../services/transaction.service';
import { formatCurrency } from '../utils/format';
import type { TopUser } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const TopUsersPage = () => {
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopUsers();
  }, []);

  const loadTopUsers = async () => {
    try {
      const data = await transactionService.getTopUsers();
      setTopUsers(data);
    } catch (error) {
      console.error('Load top users error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Top Transacting Users</h1>

        <Card title="Transaction Volume Chart">
          {loading ? (
            <div className="py-12">
              <LoadingSpinner />
            </div>
          ) : topUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="username" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="transacted_value" fill="#3b82f6" name="Transacted Value" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="Leaderboard">
          {loading ? (
            <div className="py-8">
              <LoadingSpinner />
            </div>
          ) : topUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No data available
            </div>
          ) : (
            <div className="space-y-3">
              {topUsers.map((user, index) => (
                <div
                  key={user.username}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-200 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.username}</p>
                      <p className="text-sm text-gray-500">
                        Total Transacted
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary-600">
                      {formatCurrency(user.transacted_value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};
