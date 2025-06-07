
export type WeatherIconType = 
  | "sunny" 
  | "partly_cloudy" 
  | "cloudy" 
  | "rainy" 
  | "snowy" 
  | "windy" 
  | "stormy" 
  | "foggy" 
  | "default";

export interface WeatherData {
  location: string;
  temperature: number; // Celsius
  description: string;
  humidity: number; // Percentage
  windSpeed: number; // m/s
  icon: WeatherIconType;
  currentDate: string; // YYYY-MM-DD
  feelsLike: number; // Celsius
  pressure: number; // hPa
  visibility: number; // km
  sunrise: string; // HH:MM
  sunset: string; // HH:MM
}

// Used for Gemini API response, which might contain an array of grounding chunks
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  // Other types of chunks can be added here if needed
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  // Other grounding metadata fields
}
