export function createStorage(): void {
    localStorage.setItem('toDoApp', JSON.stringify([]));
}

export function readStorage(): any[] | null {
    const storedData = localStorage.getItem('toDoApp');
    return storedData ? JSON.parse(storedData) : null;
}

export function editStorage(data: any[]): void {
    localStorage.setItem('toDoApp', JSON.stringify(data));
}