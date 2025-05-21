'use client'
import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Plus, Filter, X, FileText } from 'lucide-react'

export default function ExamFiltersDialog({ open, onOpenChange, filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState(filters)
  const fileInputRef = useRef(null)

  // Sync local state when dialog opens
  useEffect(() => {
    if (open) setLocalFilters(filters)
  }, [open, filters])

  const handleChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }))
  }

  // For exámenes anteriores
  const handleAddPrevExam = () => {
    if (localFilters.prevExams.length < 5) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setLocalFilters(prev => ({
        ...prev,
        prevExams: [...prev.prevExams, { name: file.name, file }]
      }))
    }
    // Limpiar el input para permitir volver a seleccionar el mismo archivo si se elimina
    e.target.value = ''
  }

  const handleRemovePrevExam = (idx) => {
    setLocalFilters(prev => ({
      ...prev,
      prevExams: prev.prevExams.filter((_, i) => i !== idx)
    }))
  }

  const handleSave = () => {
    setFilters(localFilters)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <Filter className="inline w-5 h-5 mr-2" />
            Filtros del examen
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-2">
          {/* Ortografía */}
          <div className="flex items-center justify-between">
            <span>Corregir faltas ortográficas</span>
            <Switch
              checked={localFilters.corrigeOrtografia}
              onCheckedChange={v => handleChange('corrigeOrtografia', v)}
            />
          </div>
          {/* Número de preguntas */}
          <div>
            <label className="block text-sm mb-1">Número de preguntas</label>
            <Input
              type="number"
              min={1}
              max={20}
              value={localFilters.numPreguntas}
              onChange={e => handleChange('numPreguntas', Number(e.target.value))}
              className="w-24"
            />
          </div>
          {/* Dificultad */}
          <div>
            <label className="block text-sm mb-1">Dificultad</label>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[localFilters.dificultad]}
              onValueChange={([v]) => handleChange('dificultad', v)}
              className="max-w-xs"
            />
            <div className="text-xs text-gray-500 mt-1 flex gap-2">
              {[1,2,3,4,5].map(n => (
                <span key={n} className={n === localFilters.dificultad ? 'font-bold text-blue-600' : ''}>{n}</span>
              ))}
            </div>
          </div>
          {/* Exámenes anteriores */}
          <div>
            <div className="flex items-center gap-2">
              <Switch
                checked={localFilters.usarPrevExams}
                onCheckedChange={v => handleChange('usarPrevExams', v)}
              />
              <span>Basar en exámenes anteriores</span>
            </div>
            {localFilters.usarPrevExams && (
              <div className="mt-2 space-y-2">
                {/* Lista de PDFs */}
                {localFilters.prevExams.map((ex, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 border rounded-lg px-3 py-2">
                    <FileText className="w-5 h-5 text-red-500" />
                    <span className="flex-1 truncate">{ex.name}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemovePrevExam(idx)}
                      aria-label="Eliminar"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {/* Botón para añadir PDF */}
                {localFilters.prevExams.length < 5 && (
                  <>
                    <input
                      type="file"
                      accept="application/pdf"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddPrevExam}
                      className="mt-1"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Añadir examen (PDF)
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
          {/* Tipo de examen */}
          <div className="flex items-center justify-between">
            <span>Tipo de examen: {localFilters.tipoTest ? 'Tipo test' : 'Respuesta larga'}</span>
            <Switch
              checked={localFilters.tipoTest}
              onCheckedChange={v => handleChange('tipoTest', v)}
            />
          </div>
          {/* Número de respuestas por pregunta (solo si tipo test) */}
          {localFilters.tipoTest && (
            <div>
              <label className="block text-sm mb-1">Respuestas por pregunta</label>
              <Slider
                min={2}
                max={6}
                step={1}
                value={[localFilters.numRespuestas]}
                onValueChange={([v]) => handleChange('numRespuestas', v)}
                className="max-w-xs"
              />
              <div className="text-xs text-gray-500 mt-1 flex gap-2">
                {[2,3,4,5,6].map(n => (
                  <span key={n} className={n === localFilters.numRespuestas ? 'font-bold text-blue-600' : ''}>{n}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <span className="text-xs text-gray-500 mr-auto flex items-center">
            🛠️ Aún en desarrollo
          </span>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled>
            Aplicar filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 