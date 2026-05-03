import { motion } from 'framer-motion';
import ScenarioSimulator from '../components/ScenarioSimulator';
import { FiPlayCircle } from 'react-icons/fi';

export default function ScenarioPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center shadow-lg">
            <FiPlayCircle size={18} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Scenario Simulator</h1>
            <p className="text-xs text-text-muted">Test your knowledge with real-world voting situations</p>
          </div>
        </div>
      </div>
      <ScenarioSimulator />
    </motion.div>
  );
}
