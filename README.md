# Muslim Prayer Times Web App

A modern, responsive web application that displays accurate daily prayer times for any city worldwide, with support for English and Arabic languages, and an integrated AI-powered Islamic assistant chatbot.

---

## 🌟 Features

- **Worldwide Prayer Times:**  
  Instantly fetches daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any city using reliable APIs.

- **City Search:**  
  Search for any city in the world to get its prayer times and local time.

- **Live City Clock:**  
  Displays the current time for the selected city, updating every second.

- **Next Prayer Countdown:**  
  Shows the next upcoming prayer and a live countdown timer.

- **Multilingual Support:**  
  Seamless switching between English and Arabic, with full RTL/LTR support.

- **Beautiful UI:**  
  Responsive, mobile-friendly design with Islamic-themed visuals and smooth animations.

- **AI Islamic Chatbot:**  
  Integrated AI assistant (powered by Google Gemini) to answer general Islamic questions (excluding fatwa), available in both English and Arabic.

- **Error Handling:**  
  User-friendly error messages for city not found, network issues, and unexpected errors.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/prayer-times-project.git
   cd prayer-times-project
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your API keys:

   ```env
   VITE_TIMEZONEDB_API_KEY=your_timezonedb_api_key
   VITE_GEMINI_API_KEY=your_google_gemini_api_key
   ```

   - [Get a TimeZoneDB API key](https://timezonedb.com/api)
   - [Get a Google Gemini API key](https://aistudio.google.com/app/apikey)

4. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 🛠️ Project Structure

```
prayer-times-project/
├── public/
│   └── locales/           # Translation files (en, ar)
├── src/
│   ├── assets/            # Images and icons
│   ├── components/        # React components (UI, chatbot, helpers)
│   ├── contexts/          # React context providers
│   ├── i18n.js            # i18next configuration
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles (TailwindCSS)
├── tailwind.config.js     # TailwindCSS config
├── vite.config.js         # Vite config
├── package.json
└── .env                   # API keys (not committed)
```

---

## � Internationalization (i18n)

- Uses [i18next](https://www.i18next.com/) with [react-i18next](https://react.i18next.com/).
- Translation files are in `public/locales/en/translation.json` and `public/locales/ar/translation.json`.
- Language can be toggled via the UI; RTL/LTR layout is handled automatically.

---

## 🤖 AI Chatbot

- Powered by [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai).
- Provides general Islamic guidance (not fatwa).
- Respects language of user input (English or Arabic).
- See `src/components/AI-ChatBotCompo/ChatBot.jsx` for implementation.

---

## 📦 Main Dependencies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/)
- [Axios](https://axios-http.com/)
- [Day.js](https://day.js.org/)
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- [react-loading-indicators](https://www.npmjs.com/package/react-loading-indicators)
- [clsx](https://www.npmjs.com/package/clsx)

---

## 🧩 API Usage

- **Prayer Times:**  
  [Aladhan API](https://aladhan.com/prayer-times-api) (via `/v1/timings`)
- **City Geolocation:**  
  [OpenStreetMap Nominatim](https://nominatim.org/release-docs/latest/api/Search/)
- **Time Zone:**  
  [TimeZoneDB](https://timezonedb.com/api)
- **AI Chatbot:**  
  [Google Gemini API](https://aistudio.google.com/app/apikey)

---

## ⚠️ Disclaimer

- The AI assistant does **not** provide fatwa or legal Islamic rulings.
- Always consult a qualified scholar or imam for religious matters.
- Prayer times are based on external APIs and may vary by calculation method.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Aladhan.com](https://aladhan.com/) for prayer times API.
- [OpenStreetMap](https://www.openstreetmap.org/) for geolocation.
- [TimeZoneDB](https://timezonedb.com/) for timezone data.
- [Google Gemini](https://aistudio.google.com/) for AI assistant.
- [TailwindCSS](https://tailwindcss.com/) for styling.
- [i18next](https://www.i18next.com/) for internationalization.

---

## ✨ Contributions

Pull requests and suggestions are welcome!  
Feel free to open an issue or submit a PR.

---
