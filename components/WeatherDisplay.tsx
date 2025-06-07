
import React from 'react';
import { WeatherData, WeatherIconType } from '../types';

// SVG Icon Components (Heroicons style)
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-24 h-24 text-yellow-400 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591" />
  </svg>
);

const CloudIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-24 h-24 text-gray-400 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5h10.5a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 18 10.5H6.75A4.5 4.5 0 0 0 2.25 15Z" />
  </svg>
);

const PartlyCloudyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative w-24 h-24 ${className}`}>
    <SunIcon className="absolute top-0 left-0 w-20 h-20 opacity-90" />
    <CloudIcon className="absolute bottom-0 right-0 w-20 h-20 opacity-80 !text-gray-300" />
  </div>
);

const RainIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-24 h-24 text-blue-400 ${className}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 0-2.25 2.25v.75M10.5 6v2.25m0 0A2.25 2.25 0 0 0 8.25 6H4.5M15 11.25l-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.061 16.061C10.584 16.013 11.118 16 11.663 16s1.079.013 1.602.061M6.31 13.7C6.122 14.448 6 15.224 6 16s.122 1.552.31 2.3M16.25 13.7c.188.748.31 1.524.31 2.3s-.122 1.552-.31 2.3" transform="translate(0, 2)"/> {/* Shift rain drops down */}
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591" transform="translate(0, -100)"/> {/* Placeholder, effectively hiding base cloud part for rain */}
  <CloudIcon className={`w-24 h-24 text-gray-400 ${className}`} />
  <path strokeLinecap="round" strokeLinejoin="round" d="M10 17.5l-1 2m4-2l-1 2m-1-5l-1 2" className="text-blue-500"/>
</svg>
);


const SnowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-24 h-24 text-blue-200 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /> {/* Placeholder for cloud */}
    <CloudIcon className={`w-24 h-24 text-gray-300 ${className}`} />
    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 13.5 1.5-1.5M12 12l1.5 1.5m-3-1.5L9 13.5m1.5-1.5L12 10.5m-1.5 3L9 12m3 1.5L10.5 15M12 12l-1.5-1.5m3 1.5L15 12m-1.5-1.5L12 9" className="text-white stroke-2" transform="translate(0,3)" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 16.5 12 15l1.5 1.5m-3 0L12 18l1.5-1.5" className="text-white stroke-2" transform="translate(0,3)"/>
  </svg>
);


const WindIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-24 h-24 text-gray-500 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
  </svg>
);

const StormIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative w-24 h-24 ${className}`}>
    <CloudIcon className="!text-gray-600" />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-yellow-400 absolute bottom-0 right-2 animate-pulse">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  </div>
);

const FogIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-24 h-24 text-gray-400 ${className}`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5M3.75 12h16.5m-16.5 2.25h16.5M3.75 16.5h16.5" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5h10.5a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 18 10.5H6.75A4.5 4.5 0 0 0 2.25 15Z" className="opacity-30"/>
</svg>
);


const DefaultIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-24 h-24 text-gray-500 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>
);


const weatherIconMap: Record<WeatherIconType, React.FC<{ className?: string }>> = {
  sunny: SunIcon,
  partly_cloudy: PartlyCloudyIcon,
  cloudy: CloudIcon,
  rainy: RainIcon,
  snowy: SnowIcon,
  windy: WindIcon,
  stormy: StormIcon,
  foggy: FogIcon,
  default: DefaultIcon,
};

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const WeatherIconComponent = weatherIconMap[data.icon] || DefaultIcon;

  return (
    <div className="w-full bg-gradient-to-br from-weather-blue to-weather-blue-dark text-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold">{data.location}</h2>
          <p className="text-lg text-blue-100">{data.currentDate}</p>
          <p className="text-5xl font-extrabold mt-2">{data.temperature}°C</p>
          <p className="text-xl capitalize mt-1 text-blue-200">{data.description}</p>
        </div>
        <div className="mt-6 md:mt-0">
          <WeatherIconComponent />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        <div className="bg-white/20 p-3 rounded-md backdrop-blur-sm">
          <p className="font-semibold">体感温度</p>
          <p>{data.feelsLike}°C</p>
        </div>
        <div className="bg-white/20 p-3 rounded-md backdrop-blur-sm">
          <p className="font-semibold">湿度</p>
          <p>{data.humidity}%</p>
        </div>
        <div className="bg-white/20 p-3 rounded-md backdrop-blur-sm">
          <p className="font-semibold">風速</p>
          <p>{data.windSpeed} m/s</p>
        </div>
        <div className="bg-white/20 p-3 rounded-md backdrop-blur-sm">
          <p className="font-semibold">気圧</p>
          <p>{data.pressure} hPa</p>
        </div>
        <div className="bg-white/20 p-3 rounded-md backdrop-blur-sm">
          <p className="font-semibold">視程</p>
          <p>{data.visibility} km</p>
        </div>
         <div className="bg-white/20 p-3 rounded-md backdrop-blur-sm col-span-2 sm:col-span-1">
          <p className="font-semibold">日の出 / 日の入</p>
          <p>{data.sunrise} / {data.sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
