import React, { useEffect, useState } from 'react';
import { ChevronRight, Gauge, Calendar, Fuel } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from './Reveal';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  title: string;
  subtitle: string;
  price: number;
  monthly: string;
  mileage: string;
  year: string;
  fuel: string;
  transmission: string;
  images: string[];
  originalUrl?: string;
}

interface FeaturedVehiclesProps {
  onSelectVehicle: (id: string) => void;
}

export function FeaturedVehicles({ onSelectVehicle }: FeaturedVehiclesProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/mock-data/inventory.json')
      .then((res) => res.json())
      .then((data: Vehicle[]) => {
        // Show first 3 vehicles as featured
        setVehicles(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12" id="showroom">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-text mb-4">
            Featured Vehicles
          </h2>
          <p className="text-textMuted text-lg font-medium">
            Hand-picked selection of our finest inventory
          </p>
        </div>
        {/* Reserves the grid's height so the section doesn't shift the page
            when the inventory lands. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-surface rounded-2xl border border-border h-[540px] animate-pulse" />
          ))}
        </div>
        <p className="sr-only" role="status">Loading featured vehicles</p>
      </section>
    );
  }

  if (vehicles.length === 0) return null;

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12" id="showroom">
      <Reveal className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-text mb-4">
            Featured Vehicles
          </h2>
          <p className="text-textMuted text-lg font-medium">
            Hand-picked selection of our finest inventory
          </p>
        </div>
        <a
          href="#/showroom"
          className="hidden md:flex items-center gap-2 text-text hover:text-primary transition-colors duration-200 font-bold"
        >
          View All Vehicles <ChevronRight size={20} aria-hidden="true" />
        </a>
      </Reveal>

      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map((vehicle, index) => {
          const displayImage = vehicle.images && vehicle.images.length > 0
            ? vehicle.images[0]
            : 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop';

          return (
            // The lift is a CSS transform rather than a `whileHover` spring:
            // one system owns the property, so it can't fight the class-based
            // transition on the same element.
            <RevealItem
              key={vehicle.id}
              onClick={() => onSelectVehicle(vehicle.id)}
              className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-lg hover:shadow-glow flex flex-col justify-between cursor-pointer transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-background flex items-center justify-center">
                  <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full border border-border">
                    <span className="text-[10px] font-semibold text-text uppercase tracking-wider">
                      Newly Added
                    </span>
                  </div>
                  <img
                    src={displayImage}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    width={640}
                    height={480}
                    loading={index === 0 ? undefined : 'lazy'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors leading-tight">
                        {vehicle.make}
                      </h3>
                      <p className="text-xs text-textMuted mt-0.5 line-clamp-1">{vehicle.model} - {vehicle.subtitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-extrabold text-text">
                        £{vehicle.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-surfaceHighlight rounded-xl p-4 mb-6 mt-4 flex justify-between items-center border border-border">
                    <div>
                      <p className="text-[10px] text-textMuted mb-0.5 leading-none">Finance from</p>
                      <p className="text-base font-bold text-primary">
                        {vehicle.monthly}
                        <span className="text-[10px] font-normal text-textMuted"> /mo</span>
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-text hover:text-primary transition-all underline decoration-textMuted underline-offset-4">
                      Quote Calculator
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
                    <div className="flex flex-col items-center justify-center p-1.5 sm:p-2.5 bg-surfaceHighlight rounded-xl border border-border text-center">
                      <Gauge size={16} className="text-textMuted mb-1" />
                      <span className="text-[10px] font-bold text-text truncate max-w-full">
                        {vehicle.mileage}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-1.5 sm:p-2.5 bg-surfaceHighlight rounded-xl border border-border text-center">
                      <Calendar size={16} className="text-textMuted mb-1" />
                      <span className="text-[10px] font-bold text-text truncate max-w-full">
                        {vehicle.year}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-1.5 sm:p-2.5 bg-surfaceHighlight rounded-xl border border-border text-center">
                      <Fuel size={16} className="text-textMuted mb-1" />
                      <span className="text-[10px] font-bold text-text truncate max-w-full">
                        {vehicle.fuel}
                      </span>
                    </div>
                  </div>

                  {/* The real control. The card-wide click is a mouse
                      convenience; this is what keyboard users reach. */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVehicle(vehicle.id);
                    }}
                    className="w-full bg-transparent hover:bg-surfaceHighlight active:bg-border/60 text-text py-3 rounded-xl font-semibold transition-colors duration-150 border border-border text-sm"
                  >
                    View Details
                    <span className="sr-only"> for the {vehicle.year} {vehicle.make} {vehicle.model}</span>
                  </button>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <div className="mt-12 text-center md:hidden">
        <a
          href="#/showroom"
          className="inline-flex items-center gap-2 text-text hover:text-primary transition-colors font-bold"
        >
          View All Vehicles <ChevronRight size={20} />
        </a>
      </div>
    </section>
  );
}