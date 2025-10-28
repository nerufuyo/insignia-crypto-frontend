import { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { LoadingSpinner, SkeletonLoader } from '../components/common/Loading';
import { balanceService } from '../services/balance.service';
import { transactionService } from '../services/transaction.service';
import { formatCurrency } from '../utils/format';
import { TopupModal } from '../components/dashboard/TopupModal';
import { TransferModal } from '../components/dashboard/TransferModal';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { StatsCards } from '../components/dashboard/StatsCards';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadBalance();
  }, [refreshKey]);

  const loadBalance = async () => {
    try {
      const data = await balanceService.getBalance();
      setBalance(data.balance);
    } catch (error) {
      toast.error('Failed to load balance');
      console.error('Load balance error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setLoading(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Button onClick={handleRefresh} variant="secondary">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <div>
            <p className="text-primary-100 text-sm font-medium mb-2">Total Balance</p>
            {loading ? (
              <SkeletonLoader className="h-12 w-48 bg-primary-400" />
            ) : (
              <h2 className="text-4xl font-bold">{formatCurrency(balance)}</h2>
            )}
          </div>
          <div className="mt-6 flex space-x-4">
            <Button
              onClick={() => setIsTopupModalOpen(true)}
              variant="secondary"
              className="bg-white text-primary-700 hover:bg-gray-100"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Top Up
            </Button>
            <Button
              onClick={() => setIsTransferModalOpen(true)}
              variant="secondary"
              className="bg-white text-primary-700 hover:bg-gray-100"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Transfer
            </Button>
          </div>
        </Card>

        <StatsCards refreshKey={refreshKey} />

        <RecentTransactions refreshKey={refreshKey} />
      </div>

      <TopupModal
        isOpen={isTopupModalOpen}
        onClose={() => setIsTopupModalOpen(false)}
        onSuccess={handleRefresh}
      />

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onSuccess={handleRefresh}
      />
    </MainLayout>
  );
};
