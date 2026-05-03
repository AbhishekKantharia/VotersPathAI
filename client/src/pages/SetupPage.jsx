import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { authUpdateProfile } from '../services/api';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiUser, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh',
  'Chandigarh', 'Puducherry', 'Andaman & Nicobar', 'Dadra & Nagar Haveli', 'Lakshadweep',
];

export default function SetupPage() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    age: user?.age || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
    voterStatus: user?.voterStatus || 'unknown',
    hasVoterId: user?.hasVoterId || false,
    isFirstTimeVoter: user?.isFirstTimeVoter || false,
  });

  const handleComplete = async () => {
    if (!form.name || !form.age || !form.state) {
      toast.error('Name, age, and state are required to personalize your journey.');
      return;
    }
    setSaving(true);
    try {
      const { data } = await authUpdateProfile({
        ...form,
        age: parseInt(form.age),
        profileCompleted: true
      });
      if (data.success) {
        updateUser(data.data.user);
        toast.success('Profile completed! Welcome to VotePath AI! 🗳️');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-3xl mb-4">
            🗳️
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Complete Your Profile</h1>
          <p className="text-text-muted mt-2">Help us personalize your voting journey with accurate local information.</p>
        </div>

        <div className="glass-card p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-xs text-text-secondary mb-1.5 font-medium">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="text" className="input-field pl-10" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-secondary mb-1.5 font-medium">Age</label>
                <input type="number" className="input-field" min="17" max="120" value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1.5 font-medium">Pincode</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input type="text" className="input-field pl-10" placeholder="400001" value={form.pincode}
                    onChange={e => setForm({ ...form, pincode: e.target.value })} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1.5 font-medium">State / Union Territory</label>
              <select className="input-field" value={form.state}
                onChange={e => setForm({ ...form, state: e.target.value })}>
                <option value="">Select State</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1.5 font-medium">Registration Status</label>
              <select className="input-field" value={form.voterStatus}
                onChange={e => setForm({ ...form, voterStatus: e.target.value })}>
                <option value="unknown">I'm not sure</option>
                <option value="not_registered">Not registered yet</option>
                <option value="applied">Applied for Voter ID</option>
                <option value="registered">Registered voter ✓</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 accent-primary rounded-lg"
                  checked={form.hasVoterId}
                  onChange={e => setForm({ ...form, hasVoterId: e.target.checked })} />
                <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                  I have my Voter ID (EPIC) card
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 accent-primary rounded-lg"
                  checked={form.isFirstTimeVoter}
                  onChange={e => setForm({ ...form, isFirstTimeVoter: e.target.checked })} />
                <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                  This will be my first time voting
                </span>
              </label>
            </div>
          </div>

          <motion.button 
            onClick={handleComplete} 
            disabled={saving}
            className="btn-primary w-full py-4 mt-8 text-base shadow-xl shadow-primary/20"
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 0.98 }}
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Personalizing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 font-bold">
                Complete Setup <FiCheckCircle size={18} />
              </span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
