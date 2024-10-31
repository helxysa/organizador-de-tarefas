'use client'

import { useState, useEffect } from 'react'
import db from '../lib/firestore'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'
import Sidebar from './Sidebar'
import TaskCard from './TaskCard'

interface Task {
  id?: string
  title: string
  description: string
  tag: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    tag: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Função para carregar as tasks do Firebase
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksCollection = collection(db, 'tasks')
        const q = query(tasksCollection, orderBy('dueDate', 'asc'))
        const querySnapshot = await getDocs(q)
        
        const loadedTasks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Task[]
        
        setTasks(loadedTasks)
      } catch (error) {
        console.error('Erro ao carregar tasks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  const handleAddTask = async () => {
    try {
      const tasksCollection = collection(db, 'tasks')
      const newTask: Task = {
        ...newTaskData,
        dueDate: new Date().toISOString(),
      }

      const docRef = await addDoc(tasksCollection, newTask)
      const taskWithId = { ...newTask, id: docRef.id }
      
      setTasks([...tasks, taskWithId])
      setIsModalOpen(false)
      setNewTaskData({
        title: '',
        description: '',
        tag: '',
        priority: 'medium'
      })
    } catch (error) {
      console.error('Erro ao adicionar task:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewTaskData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex h-screen bg-[#1C1C1C] text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-white">My Tasks</h1>
          <button 
            className="bg-[#6C5DD3] hover:bg-[#5B4EC2] px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-lg">+</span> New Task
          </button>
        </div>

        {isLoading ? (
          <div className="text-center">Carregando...</div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="bg-[#2C2C2C] rounded-lg p-6 border-l-4 border-l-red-500 hover:bg-[#333333] transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-400 mb-4">{task.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-[#6C5DD3] bg-[#6C5DD320] px-3 py-1 rounded-md text-sm">
                    {task.tag}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                  <span className={`px-3 py-1 rounded-md text-sm ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#2C2C2C] p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Título</label>
                  <input
                    type="text"
                    name="title"
                    value={newTaskData.title}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Descrição</label>
                  <textarea
                    name="description"
                    value={newTaskData.description}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Tag</label>
                  <input
                    type="text"
                    name="tag"
                    value={newTaskData.tag}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Prioridade</label>
                  <select
                    name="priority"
                    value={newTaskData.priority}
                    onChange={handleInputChange}
                    className="w-full bg-[#1C1C1C] p-2 rounded-md"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-600 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-[#6C5DD3] rounded-md"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}