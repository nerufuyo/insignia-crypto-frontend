import { useState, type FormEvent } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { transferService } from '../../services/transfer.service';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TransferModal = ({ isOpen, onClose, onSuccess }: TransferModalProps) => {
  const [toUsername, setToUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!toUsername.trim()) {
      toast.error('Please enter a recipient username');
      return;
    }

    if (toUsername.trim() === user?.username) {
      toast.error('Cannot transfer to yourself');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      await transferService.transfer({
        to_username: toUsername.trim(),
        amount: amountNum,
      });
      toast.success(`Successfully transferred ${amountNum.toLocaleString()} to ${toUsername}`);
      setToUsername('');
      setAmount('');
      onClose();
      onSuccess();
    } catch (error) {
      toast.error('Transfer failed. Please check your balance and try again.');
      console.error('Transfer error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Funds">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Recipient Username"
          placeholder="Enter username"
          value={toUsername}
          onChange={(e) => setToUsername(e.target.value)}
          autoFocus
        />

        <Input
          type="number"
          label="Amount"
          placeholder="Enter amount to transfer"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          step="0.01"
        />

        <div className="flex space-x-3">
          <Button type="button" onClick={onClose} variant="secondary" fullWidth>
            Cancel
          </Button>
          <Button type="submit" loading={loading} fullWidth>
            Transfer
          </Button>
        </div>
      </form>
    </Modal>
  );
};
