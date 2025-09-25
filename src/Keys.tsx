import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    // Сортируем элементы согласно текущей сортировке
    const sortedItems = [...items].sort((a, b) => {
        return props.sorting === 'ASC' ? a.id - b.id : b.id - a.id;
    });

    const startEditing = (item: IItem) => {
        setEditingId(item.id);
        setEditValue(item.name);
    };

    const saveEditing = () => {
        if (editingId !== null) {
            setItems(prevItems =>
                prevItems.map(item =>
                    item.id === editingId ? { ...item, name: editValue } : item
                )
            );
            setEditingId(null);
            setEditValue('');
        }
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            saveEditing();
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    return (
        <div>
            {sortedItems.map(item => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => startEditing(item)}>
                            {item.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
    
}
