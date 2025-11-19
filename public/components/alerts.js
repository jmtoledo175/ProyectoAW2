export const alert = () => {
  return `
    <div id="alert"
      class="bg-rose-100 border border-rose-400 text-rose-700 p-4 rounded-xl shadow-sm mt-4 hidden">

      <div class="flex items-center justify-between">

        <p id="txtAlert" class="text-sm font-medium">
          Error al ingresar los datos
        </p>

        <button
          id="btnCloseAlert"
          class="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-rose-600 transition">
          ✕
        </button>

      </div>
    </div>
  `;
};
