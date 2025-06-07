
import React, { useState, useEffect } from 'react';
import { WeatherData } from './types';
import { WeatherService } from './services/WeatherService';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await WeatherService.fetchWeatherData("東京");
        setWeatherData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "天気情報の取得に失敗しました。");
        } else {
          setError("天気情報の取得中に不明なエラーが発生しました。");
        }
        console.error("Failed to fetch weather data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // APIキーは環境変数から取得するため、依存配列は空です

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-weather-blue-dark">今日の天気</h1>
        <p className="text-lg text-weather-gray-dark">指定された都市の現在の天候情報を表示します。</p>
      </header>
      
      <main className="bg-white shadow-xl rounded-lg p-6 min-h-[300px] flex flex-col justify-center items-center">
        {isLoading && <LoadingSpinner />}
        {error && !isLoading && <ErrorMessage message={error} />}
        {weatherData && !isLoading && !error && <WeatherDisplay data={weatherData} />}
        {!weatherData && !isLoading && !error && (
          <p className="text-weather-gray-DEFAULT">表示する天気データがありません。</p>
        )}
      </main>

      <footer className="text-center mt-8 text-sm text-weather-gray-dark">
        <p>&copy; {new Date().getFullYear()} 天気情報アプリ. Powered by Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
