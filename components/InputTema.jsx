// components/InputTema.jsx
export default function InputTema({ tema, setTema, onSubmit }) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Introduce un tema (ej: Historia de Mesopotamia)"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2"
        />
        <button
          onClick={onSubmit}
          className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90"
        >
          Generar examen
        </button>
      </div>
    )
  }
  