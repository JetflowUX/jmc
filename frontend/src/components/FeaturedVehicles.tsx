import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronRight, Gauge, Calendar, Fuel } from 'lucide-react';
const vehicles = [
{
  id: 1,
  make: 'Porsche',
  model: 'Taycan 4S',
  year: '2023',
  price: '£89,900',
  monthly: '£945',
  image:
  'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop',
  specs: {
    mileage: '4,500',
    year: '2023',
    fuel: 'Electric'
  },
  tag: 'Newly Added'
},
{
  id: 2,
  make: 'Range Rover',
  model: 'Sport Dynamic SE',
  year: '2023',
  price: '£84,500',
  monthly: '£890',
  image:
  'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=2000&auto=format&fit=crop',
  specs: {
    mileage: '12,000',
    year: '2023',
    fuel: 'Hybrid'
  },
  tag: 'Low Mileage'
},
{
  id: 3,
  make: 'Mercedes-Benz',
  model: 'G-Class G63 AMG',
  year: '2022',
  price: '£145,000',
  monthly: '£1,450',
  image:
  'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2000&auto=format&fit=crop',
  specs: {
    mileage: '18,500',
    year: '2022',
    fuel: 'Petrol'
  },
  tag: 'Premium Selection'
}];

export function FeaturedVehicles() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12" id="showroom">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Vehicles
          </h2>
          <p className="text-textMuted text-lg">
            Hand-picked selection of our finest inventory
          </p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-white hover:text-primary transition-colors font-medium">
          View All Vehicles <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle, index) =>
        <motion.div
          key={vehicle.id}
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.1
          }}
          whileHover={{
            y: -10
          }}
          className="group bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-glow">
          
            <div className="relative h-64 overflow-hidden">
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-xs font-medium text-white">
                  {vehicle.tag}
                </span>
              </div>
              <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-primary hover:border-primary transition-colors group/btn">
                <Heart
                size={18}
                className="text-white group-hover/btn:fill-white transition-all" />
              
              </button>
              <img
              src={vehicle.image}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {vehicle.make}
                  </h3>
                  <p className="text-textMuted">{vehicle.model}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">
                    {vehicle.price}
                  </p>
                </div>
              </div>

              <div className="bg-surfaceHighlight rounded-xl p-4 mb-6 mt-4 flex justify-between items-center border border-white/5">
                <div>
                  <p className="text-xs text-textMuted mb-1">Finance from</p>
                  <p className="text-lg font-bold text-primary">
                    {vehicle.monthly}
                    <span className="text-sm font-normal text-textMuted">
                      /mo
                    </span>
                  </p>
                </div>
                <button className="text-sm font-medium text-white hover:text-primary transition-colors underline decoration-white/30 underline-offset-4">
                  Personalise Quote
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-3 bg-surfaceHighlight rounded-xl border border-white/5">
                  <Gauge size={18} className="text-textMuted mb-2" />
                  <span className="text-xs font-medium text-white">
                    {vehicle.specs.mileage}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-surfaceHighlight rounded-xl border border-white/5">
                  <Calendar size={18} className="text-textMuted mb-2" />
                  <span className="text-xs font-medium text-white">
                    {vehicle.specs.year}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-surfaceHighlight rounded-xl border border-white/5">
                  <Fuel size={18} className="text-textMuted mb-2" />
                  <span className="text-xs font-medium text-white">
                    {vehicle.specs.fuel}
                  </span>
                </div>
              </div>

              <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors border border-white/10">
                View Details
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-12 text-center md:hidden">
        <button className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-medium">
          View All Vehicles <ChevronRight size={20} />
        </button>
      </div>
    </section>);

}