import React from 'react';
import { OPERATING_HOURS } from '../constants';

interface StoreStatusBannerProps {
  isOpen: boolean;
}

const StoreStatusBanner = ({ isOpen }: StoreStatusBannerProps) => {
  const { morning, afternoon } = OPERATING_HOURS;
  const hoursText = `Horário: ${String(morning.start).padStart(2, '0')}h-${morning.end}h e ${afternoon.start}h-${afternoon.end}h`;

  if (isOpen) {
    return (
      <div className="bg-pink-100 text-pink-800 p-2 rounded-full text-center shadow-sm text-xs mb-8 max-w-lg mx-auto" role="alert">
        <p><span className="font-bold">Loja Aberta!</span> Estamos prontos para receber seu pedido.</p>
      </div>
    );
  }

  return (
    <div className="bg-red-100 text-red-800 p-2 rounded-full text-center shadow-sm text-xs mb-8 max-w-lg mx-auto" role="alert">
       <p><span className="font-bold">Loja Fechada.</span> Nossos pedidos online estão encerrados por hoje. {hoursText}</p>
    </div>
  );
};

export default StoreStatusBanner;