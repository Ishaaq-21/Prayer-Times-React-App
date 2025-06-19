const prayerCalculationMethodsByCountry = {
  // 🔹 Arab Countries
  Algeria: 3, // Egyptian
  Bahrain: 4, // Umm al-Qura
  Egypt: 5, // Egyptian
  Iraq: 5, // Egyptian
  Jordan: 5, // Egyptian
  Kuwait: 9, // Kuwait-specific
  Lebanon: 5, // Egyptian
  Libya: 5, // Egyptian
  Oman: 4, // Umm al-Qura
  Palestine: 5, // Egyptian
  Qatar: 10, // Qatar-specific
  "Saudi Arabia": 4, // Umm al-Qura
  Sudan: 5, // Egyptian
  Syria: 5, // Egyptian
  "United Arab Emirates": 4, // Umm al-Qura
  Yemen: 4, // Umm al-Qura

  // 🔹 High-Muslim-Population Non-Arab Countries
  Pakistan: 1, // Karachi
  India: 1, // Karachi
  Bangladesh: 1, // Karachi
  Turkey: 13, // Diyanet
  Iran: 7, // University of Tehran
  Afghanistan: 1, // Karachi
  Russia: 14, // SAMR (Spiritual Admin of Muslims of Russia)
  France: 12, // UOIF
  "United States": 2, // ISNA
  Canada: 2, // ISNA

  // 🔹 Fallback
  default: 3, // Muslim World League (default)
};

export default prayerCalculationMethodsByCountry;
