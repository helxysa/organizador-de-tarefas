'use client'

interface TaskCardProps {
  title: string;
  description: string;
  tag: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  onClick?: () => void; /
}

export default function TaskCard({ 
  title, 
  description, 
  tag, 
  dueDate, 
  priority,
  onClick 
}: TaskCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div 
      className={`
        task-card 
        priority-${priority} 
        hover:shadow-lg 
        transition-shadow 
        duration-300 
        p-4 
        rounded-lg
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="task-meta flex justify-between items-center">
        <span className="tag px-3 py-1 rounded-full text-sm bg-gray-200">{tag}</span>
        <span className="text-sm text-gray-500">{formatDate(dueDate)}</span>
      </div>
    </div>
  )
}
