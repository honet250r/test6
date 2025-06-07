
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { WeatherData, GroundingMetadata } from '../types';

// APIキーは環境変数 `process.env.API_KEY` から取得されることを前提としています。
// この変数はビルド環境または実行環境で設定されている必要があります。
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("APIキーが設定されていません。環境変数 `process.env.API_KEY` を設定してください。");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" }); // API_KEYが未定義の場合のフォールバック

export class WeatherService {
  static async fetchWeatherData(city: string): Promise<WeatherData> {
    if (!API_KEY) {
      throw new Error("APIキーが設定されていません。アプリケーションを正しく設定してください。");
    }
    
    const model = ai.models;

    const prompt = `
今日の${city}の天気を詳しく教えてください。以下の情報をJSON形式で返してください：
- location: 都市名 (例: "${city}")
- temperature: 気温（摂氏、数値）
- description: 天気の説明（例： "晴れ", "曇り", "雨"）
- humidity: 湿度（パーセント、数値）
- windSpeed: 風速（m/s、数値）
- icon: 天気状態を表すキーワード ("sunny", "partly_cloudy", "cloudy", "rainy", "snowy", "windy", "stormy", "foggy", "default" のいずれか)
- currentDate: 今日の日付 (YYYY-MM-DD形式)
- feelsLike: 体感温度 (摂氏、数値)
- pressure: 気圧 (hPa、数値)
- visibility: 視程 (km、数値)
- sunrise: 日の出時刻 (HH:MM形式)
- sunset: 日の入り時刻 (HH:MM形式)

例：
{
  "location": "${city}",
  "temperature": 22,
  "description": "晴れ時々曇り",
  "humidity": 55,
  "windSpeed": 3.5,
  "icon": "partly_cloudy",
  "currentDate": "2024-05-23",
  "feelsLike": 21,
  "pressure": 1012,
  "visibility": 10,
  "sunrise": "04:35",
  "sunset": "18:48"
}
`;

    try {
      const response: GenerateContentResponse = await model.generateContent({
        model: "gemini-2.5-flash-preview-04-17", // 推奨モデル
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      let jsonStr = response.text.trim();
      const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[1]) {
        jsonStr = match[1].trim();
      }
      
      const parsedData = JSON.parse(jsonStr) as WeatherData;

      // Gemini APIから返される可能性のあるGroundingMetadataの処理 (今回は使用しないが、将来的な拡張のため)
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata as GroundingMetadata | undefined;
      if (groundingMetadata?.groundingChunks) {
        console.log("Grounding sources:", groundingMetadata.groundingChunks);
      }

      // アイコンタイプの検証とフォールバック
      const validIcons: WeatherData['icon'][] = ["sunny", "partly_cloudy", "cloudy", "rainy", "snowy", "windy", "stormy", "foggy", "default"];
      if (!validIcons.includes(parsedData.icon)) {
        console.warn(`不明なアイコンタイプを受信しました: ${parsedData.icon}. デフォルトにフォールバックします.`);
        parsedData.icon = "default";
      }
      
      return parsedData;

    } catch (error) {
      console.error("Gemini APIからの天気データの取得または解析に失敗しました:", error);
      if (error instanceof Error) {
        throw new Error(`天気データの取得に失敗しました: ${error.message}`);
      }
      throw new Error("天気データの取得中に不明なエラーが発生しました。");
    }
  }
}
