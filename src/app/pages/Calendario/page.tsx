'use client'
import { useEffect, useState } from 'react'
import db from '@/app/lib/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { Badge, Card, Chip } from '@nextui-org/react'

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  tag: string
}

export default function Calendario() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [uniqueTags, setUniqueTags] = useState<string[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, 'tasks')
      const tasksSnapshot = await getDocs(tasksCollection)
      const tasksList = tasksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[]
      
      setTasks(tasksList)
      const tags = [...new Set(tasksList.map(task => task.tag))]
      setUniqueTags(tags)
    }

    fetchTasks()
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  const filteredTasks = tasks.filter(task => 
    selectedTag === 'all' ? true : task.tag === selectedTag
  )

  const groupedTasks = {
    high: filteredTasks.filter(task => task.priority === 'high'),
    medium: filteredTasks.filter(task => task.priority === 'medium'),
    low: filteredTasks.filter(task => task.priority === 'low'),
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Organizador de Tarefas</h1>
      
      <div className="flex gap-2 mb-6">
        <Chip 
          onClick={() => setSelectedTag('all')}
          variant={selectedTag === 'all' ? 'solid' : 'flat'}
          className="cursor-pointer"
        >
          Todas
        </Chip>
        {uniqueTags.map(tag => (
          <Chip
            key={tag}
            onClick={() => setSelectedTag(tag)}
            variant={selectedTag === tag ? 'solid' : 'flat'}
            className="cursor-pointer"
          >
            {tag}
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(groupedTasks).map(([priority, priorityTasks]) => (
          <div key={priority}>
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {priority} Priority
            </h2>
            <div className="space-y-4">
              {priorityTasks.map(task => (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{task.title}</h3>
                    <Badge color={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{task.description}</p>
                  <div className="flex justify-between items-center">
                    <Chip size="sm" variant="flat">{task.tag}</Chip>
                    <span className="text-sm text-gray-500">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </Card>
              ))}
              {priorityTasks.length === 0 && (
                <p className="text-gray-500 text-center">Nenhuma tarefa encontrada</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}