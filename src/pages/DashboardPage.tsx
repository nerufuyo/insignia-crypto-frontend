import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWallet, 
  faSync,
  faCoins,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SkeletonLoader } from '../components/common/Loading';
import { balanceService } from '../services/balance.service';
import { formatCurrency } from '../utils/format';
import { 
  TopupModal, 
  TransferModal, 
  RecentTransactions, 
  StatsCards 
} from '../components/dashboard';
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
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="mt-1 text-gray-600">Manage your crypto wallet</p>
          </div>
          <Button onClick={handleRefresh} variant="secondary" icon={<FontAwesomeIcon icon={faSync} className={loading ? 'animate-spin' : ''} />}>
            Refresh
          </Button>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white border-none relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="p-3 bg-white rounded-lg mr-3 shadow-lg">
                  <FontAwesomeIcon icon={faWallet} className="text-2xl text-primary-600" />
                </div>
                <div>
                  <p className="text-primary-100 text-sm font-medium">Total Balance</p>
                  <p className="text-xs text-primary-200">Available funds</p>
                </div>
              </div>
              {loading ? (
                <SkeletonLoader className="h-14 w-64 bg-primary-500" />
              ) : (
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-bold mb-6"
                >
                  {formatCurrency(balance)}
                </motion.h2>
              )}
              <div className="flex space-x-4">
                <Button
                  onClick={() => setIsTopupModalOpen(true)}
                  variant="secondary"
                  className="!bg-white !text-primary-600 !border-white hover:!bg-gray-50 hover:!text-primary-700 font-semibold shadow-lg"
                  icon={<FontAwesomeIcon icon={faCoins} />}
                >
                  Top Up
                </Button>
                <Button
                  onClick={() => setIsTransferModalOpen(true)}
                  variant="secondary"
                  className="!bg-white !text-primary-600 !border-white hover:!bg-gray-50 hover:!text-primary-700 font-semibold shadow-lg"
                  icon={<FontAwesomeIcon icon={faPaperPlane} />}
                >
                  Transfer
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatsCards refreshKey={refreshKey} />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RecentTransactions refreshKey={refreshKey} />
        </motion.div>
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
