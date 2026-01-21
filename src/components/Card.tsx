import React, {  useState } from "react";
import { motion, AnimatePresence , } from "motion/react";
import {
  Github,
  Clock,
  Star,
  Check,
  MessageSquare,
  GitBranchIcon,
} from "lucide-react";


const Card = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, label: "Design System Setup", completed: true },
    { id: 2, label: "Component Development", completed: false },
    { id: 3, label: "Documentation", completed: false },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          layout: { duration: 0.4, type: "spring", bounce: 0, stiffness: 100 },
        }}
        className=" relative w-full max-w-[380px] cursor-pointer overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-6 shadow-sm"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl"
          
        />
        {/* Header */}
        <motion.div
          layout="position"
          className="mb-6 flex items-start justify-between"
        >
          <span className="rounded-full border border-blue-100 bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-400">
            In Progress
          </span>
          <motion.div className="rounded-lg border border-gray-300 px-2 py-1">
            <Github className="h-4 w-4" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          layout="position"
          className="mb-6 text-2xl font-bold tracking-tight text-[rgb(var(--text))]"
        >
          Meow UI Components
        </motion.h2>

        {/* Progress Bar  */}
        <motion.div layout="position" className="mb-6 space-y-2">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Progress</span>
            <NumberCounter value={progressPercent} />
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              layout
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }} //
              transition={{ duration: 0.5, type: "spring" }}
              className={`h-full rounded-full transition-colors duration-300 ${
                progressPercent === 100
                  ? "bg-green-500"
                  : "bg-[rgb(var(--text))]"
              }`}
            />
          </div>
        </motion.div>

        {/*Collapsible Area*/}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {/* Meta Data */}
              <div className="mb-6 flex items-center gap-4 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Due May 01, 2025</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-yellow-500" />
                  <span>190</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GitBranchIcon className="h-3.5 w-3.5" />
                  <span>2 issues</span>
                </div>
              </div>

              {/* Contributors */}
              <div className="mb-8">
                <p className="mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Contributors
                </p>
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-bold text-gray-600">
                    V
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-[10px] text-gray-400">
                    +2
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="mb-8 mt-4">
                <p className="mb-3 text-sm font-bold text-[rgb(var(--text))]">
                  Recent Tasks
                </p>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={(e) => toggleTask(task.id, e)}
                      className="group flex cursor-pointer items-center justify-between py-1"
                    >
                      <span
                        className={`text-sm transition-colors duration-300 ${task.completed ? "text-gray-400 line-through" : "text-gray-600"}`}
                      >
                        {task.label}
                      </span>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-300 ${
                          task.completed
                            ? "border-green-500"
                            : "border-gray-300 group-hover:border-gray-400"
                        }`}
                      >
                        <AnimatePresence>
                          {task.completed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Check
                                className="h-3 w-3 text-green-500"
                                strokeWidth={3}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[rgb(var(--text))] py-3 text-sm font-semibold text-[rgb(var(--bg))] hover:opacity-90 transition-opacity">
                  <MessageSquare className="h-4 w-4" />
                  View Discussion
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout="position"
          className="flex items-center justify-between border-t border-transparent pt-4 text-xs text-gray-400"
        >
          <span>Last updated: 2 hours ago</span>
          <span>2 open issues</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

const NumberCounter = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-[rgb(var(--text))]"
    >
      {value}%
    </motion.span>
  );
};

export default Card;
