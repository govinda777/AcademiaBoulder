import { useState } from "react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface CalendarWidgetProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const CalendarWidget = ({ selectedDate, onDateChange }: CalendarWidgetProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Get days of current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day names
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  // Get empty cells for the first week
  const firstDayOfMonth = monthStart.getDay();
  const prevMonthDayCount = firstDayOfMonth;
  
  // Helper function to check if a date is selectable (future date)
  const isSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
    <div className="w-full">
      {/* Header with month and navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={previousMonth}
          className="p-1 hover:bg-neutral-200 rounded-full"
          aria-label="Mês anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <h3 className="font-semibold text-secondary">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        
        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-neutral-200 rounded-full"
          aria-label="Próximo mês"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {weekDays.map((day, index) => (
          <div key={index} className="text-center text-sm text-neutral-500">
            {day}
          </div>
        ))}
        
        {/* Empty cells from previous month */}
        {Array.from({ length: prevMonthDayCount }).map((_, index) => (
          <div key={`prev-${index}`} className="aspect-square flex items-center justify-center text-neutral-400 text-sm">
            {format(addDays(monthStart, -prevMonthDayCount + index), 'd')}
          </div>
        ))}
        
        {/* Days of current month */}
        {daysInMonth.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const dayIsToday = isToday(day);
          const canSelect = isSelectable(day);
          
          return (
            <div 
              key={day.toString()}
              className={cn(
                "aspect-square flex items-center justify-center text-sm border rounded-md cursor-pointer",
                dayIsToday ? "border-primary" : "border-neutral-200",
                isSelected ? "calendar-day active" : "",
                !canSelect && "text-neutral-400 cursor-not-allowed"
              )}
              onClick={() => canSelect && onDateChange(day)}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
