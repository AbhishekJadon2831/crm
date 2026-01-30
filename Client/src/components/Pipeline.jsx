import React, { useState, useEffect } from "react";
import { Clock, Mail, Phone, Building2, GripVertical } from "lucide-react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { useAuth } from "./Context/AuthContext";

 

function DraggableCard({ item, isOverlay }) {
  const isClosed = item.status === "CLOSED";

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item._id,
      disabled: isClosed,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging && !isOverlay ? 0.3 : 1,
    cursor: isClosed ? "not-allowed" : "grab",
  };

  

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!isClosed ? listeners : {})}
      {...attributes}
      className={`group relative bg-[#1a1d21] rounded-xl border p-5 mb-4 transition-all duration-200
        ${isOverlay ? "z-50 shadow-2xl border-blue-500 scale-105" : "shadow-md"}
        ${isClosed
          ? "border-green-900/50 opacity-75"
          : "border-[#283039] hover:border-[#3a4552] hover:shadow-lg active:scale-[0.98]"}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider
          ${isClosed ? "bg-green-900/30 text-green-400" : "bg-blue-900/30 text-blue-300"}`}>
          {item.status}
        </span>
        {!isClosed && <GripVertical size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />}
      </div>

      <h4 className="text-lg font-semibold text-white leading-tight">{item.fullname}</h4>

      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Mail size={14} className="opacity-70" />
          <span className="truncate">{item.email}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Phone size={14} className="opacity-70" />
          <span>{item.number}</span>
        </div>
        {item.company && (
          <div className="flex items-center gap-2 text-blue-400/80 text-sm pt-1">
            <Building2 size={14} />
            <span className="font-medium uppercase tracking-tight text-[11px]">{item.company}</span>
          </div>
        )}
      </div>

      <div className="flex mt-5 pt-4 border-t border-[#283039] gap-3 items-center justify-between">
        <div className="flex items-center gap-2 text-[#9cabba]">
          <Clock size={16} />
          <p className="text-xs font-medium">Follow-up</p>
        </div>
        {isClosed && <span className="text-green-400 text-[10px] font-black uppercase italic">✓ Won</span>}
      </div>
    </div>
  );
}



function DroppableColumn({ status, title, items, colorClass }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex-1 min-w-[320px] flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <h3 className={`font-bold text-lg ${colorClass}`}>{title}</h3>
          <span className="bg-[#283039] text-slate-400 text-xs px-2.5 py-0.5 rounded-full font-mono">
            {items.length}
          </span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 rounded-2xl transition-all duration-200 p-2 min-h-[500px]
          ${isOver ? "bg-blue-500/5 ring-2 ring-blue-500/20 ring-dashed" : "bg-[#16191d]"}`}
      >
        {items.map((item) => (
          <DraggableCard key={item._id} item={item} />
        ))}

        {items.length === 0 && (
          <div className="h-32 border-2 border-dashed border-[#283039] rounded-xl flex items-center justify-center text-slate-600 text-sm italic">
            No deals in {title.toLowerCase()}
          </div>
        )}
      </div>
    </div>
  );
}



function Pipeline() {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/leads/pipeline");
      const data = await res.json();


      const setData = data.filter((task) => task.assignee === user?.name)
      setItems(setData)

       


    } catch (e) { console.error("Fetch failed", e); }


  };

  useEffect(() => {
    if (user) {
      fetchData();

    }
  }, [user]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const draggedId = active.id;
    const newStage = over.id;
    const draggedItem = items.find((item) => item._id === draggedId);

    if (!draggedItem || draggedItem.status === "CLOSED" || draggedItem.status === newStage) return;

    // Optimistic UI update
    setItems((prev) =>
      prev.map((item) => (item._id === draggedId ? { ...item, status: newStage } : item))
    );


    await fetch(`http://localhost:3000/api/leads/pipeline/${draggedId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: newStage }),
    });
  };

  const activeItem = items.find((i) => i._id === activeId);

  return (
    <div className="p-10 min-h-screen bg-[#0f1113] text-slate-200 ml-90">
      <header className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-white font-black text-5xl tracking-tight mb-2">Sales Pipeline</h1>
        <p className="text-lg text-slate-500 font-medium">Manage your revenue flow and deal stages.</p>
      </header>

      <div className="max-w-7xl mx-auto overflow-x-auto pb-10">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-8">
            <DroppableColumn
              status="NEW"
              title="New"
              items={items.filter(i => i.status === "NEW")}
              colorClass="text-white"
            />
            <DroppableColumn
              status="CONTACTED"
              title="Contacted"
              items={items.filter(i => i.status === "CONTACTED")}
              colorClass="text-blue-400"
            />
            <DroppableColumn
              status="INTERESTED"
              title="Interested"
              items={items.filter(i => i.status === "INTERESTED")}
              colorClass="text-emerald-400"
            />


            <DroppableColumn
              status="CLOSED"
              title="Closed"
              items={items.filter(i => i.status === "CLOSED")}
              colorClass="text-red-400"
            />


            <DroppableColumn
              status="LOST"
              title="Lost"
              items={items.filter(i => i.status === "LOST")}
              colorClass="text-blue-400"
            />


          </div>

          <DragOverlay dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: { active: { opacity: '0.5' } },
            }),
          }}>
            {activeId ? <DraggableCard item={activeItem} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default Pipeline;