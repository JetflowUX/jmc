import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FinanceWizardProps {
  vehicleId: string;
  onClose?: () => void;
}

const FinanceWizard: React.FC<FinanceWizardProps> = ({ vehicleId, onClose }) => {
  const [step, setStep] = useState(1);
  // placeholder state for finance calculations
  const [downPayment, setDownPayment] = useState(0);
  const [term, setTerm] = useState(36);
  const [rate, setRate] = useState(5.0);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-darkBg text-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl mb-4">Finance Calculator</h2>
        {step === 1 && (
          <div>
            <label className="block mb-2">Down Payment (£)</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full p-2 bg-gray-800 rounded"
            />
            <button onClick={next} className="mt-4 px-4 py-2 bg-primary rounded">Next</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <label className="block mb-2">Term (months)</label>
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full p-2 bg-gray-800 rounded"
            />
            <div className="flex justify-between mt-4">
              <button onClick={prev} className="px-4 py-2 bg-gray-600 rounded">Back</button>
              <button onClick={next} className="px-4 py-2 bg-primary rounded">Next</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <label className="block mb-2">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full p-2 bg-gray-800 rounded"
            />
            <p className="mt-4">
              Estimated monthly payment: <strong>£{((parseFloat((vehicleId as any)) - downPayment) * (1 + rate / 100)) / term).toFixed(2)}</strong>
            </p>
            <div className="flex justify-between mt-4">
              <button onClick={prev} className="px-4 py-2 bg-gray-600 rounded">Back</button>
              <button onClick={onClose} className="px-4 py-2 bg-primary rounded">Close</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FinanceWizard;
