import { useState, type FormEvent } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { balanceService } from '../../services/balance.service';
import toast from 'react-hot-toast';

interface TopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TopupModal = ({ isOpen, onClose, onSuccess }: TopupModalProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amountNum > 10000000) {
      toast.error('Maximum top-up amount is 10,000,000');
      return;
    }

    setLoading(true);
    try {
      await balanceService.topup({ amount: amountNum });
      toast.success(`Successfully topped up ${amountNum.toLocaleString()}`);
      setAmount('');
      onClose();
      onSuccess();
    } catch (error) {
      toast.error('Top-up failed. Please try again.');
      console.error('Topup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Top Up Balance">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          label="Amount"
          placeholder="Enter amount to top up"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          max="10000000"
          step="0.01"
          helperText="Maximum top-up amount: 10,000,000"
          autoFocus
        />

        <div className="flex space-x-3">
          <Button type="button" onClick={onClose} variant="secondary" fullWidth>
            Cancel
          </Button>
          <Button type="submit" loading={loading} fullWidth>
            Top Up
          </Button>
        </div>
      </form>
    </Modal>
  );
};
