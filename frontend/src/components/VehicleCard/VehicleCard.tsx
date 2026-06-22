import React from 'react';
import { motion } from 'framer-motion';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  price: number;
  image: string;
  specs?: Record<string, string>;
};

interface VehicleCardProps {
  vehicle: Vehicle;
  onFinanceClick?: (vehicleId: string) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onFinanceClick }) => {
  return (
    <motion.div
      className="glass p-4 m-2 w-80 flex flex-col items-center text-white"
      whileHover={{ rotateY: 15, scale: 1.02 }}
    >
      <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{vehicle.make} {vehicle.model}</h3>
      <p className="text-primary">£{vehicle.price.toLocaleString()}</p>
      <button
        onClick={() => onFinanceClick && onFinanceClick(vehicle.id)}
        className="mt-2 px-3 py-1 bg-primary text-white rounded"
      >
        Finance Now
      </button>
    </motion.div>
  );
};

export default VehicleCard;
