"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
  id: string;
  label: string;
  index: number;
}

function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 mb-2 bg-white rounded-xl shadow-sm border-2 ${
        isDragging ? "border-brand-primary shadow-md" : "border-brand-secondary/30"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-brand-accent text-brand-primary font-bold shrink-0">
        {props.index + 1}
      </div>
      <div className="flex-1 text-lg font-medium text-gray-700">{props.label}</div>
      <div {...attributes} {...listeners} className="touch-none cursor-grab active:cursor-grabbing p-2">
        <GripVertical className="text-brand-primary/50" />
      </div>
    </div>
  );
}

interface SortableListProps {
  items: string[];
  onChange: (items: string[]) => void;
}

export function SortableList({ items, onChange }: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="w-full">
          {items.map((id, index) => (
            <SortableItem key={id} id={id} label={`Muestra ${id}`} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}


