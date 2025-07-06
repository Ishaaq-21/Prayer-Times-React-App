export default function ChatBotToggleBtn({
  activeLang,
  handleToggleClick,
  expand,
}) {
  return (
    <div
      className={`fixed block lg:hidden bottom-6 ${activeLang === "en" ? "right-8 left-auto" : "left-8 right-auto"} z-10`}
    >
      <button
        className={`bg-gradient-to-r from-amber-500 to-orange-600 text-white p-3 rounded-full shadow-lg hover:scale-110 hover:from-amber-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-gray-900 transition-transform duration-300 ease-in-out  ${expand ? " hidden" : " block"}`}
        onClick={handleToggleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
        <span className="sr-only">Open Chatbot</span>
      </button>
    </div>
  );
}
