export function isColorDarkOrLight(color: string): boolean {

    color = color.replace('#', '');

    let r: number, g: number, b: number;
    if (color.length === 3) {
        r = parseInt(color[0] + color[0], 16);
        g = parseInt(color[1] + color[1], 16);
        b = parseInt(color[2] + color[2], 16);
    } else if (color.length === 6) {
        r = parseInt(color.slice(0, 2), 16);
        g = parseInt(color.slice(2, 4), 16);
        b = parseInt(color.slice(4, 6), 16);
    } else {
        throw new Error('Formato de color inválido');
    }

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness >= 128 ? false : true;
}

export function hourlyGreeting(): string {
    const realTime: number = new Date().getHours();

    if (realTime >= 5 && realTime < 12) {
        return "Buenos Días 🌞";
    } else if (realTime >= 12 && realTime < 19) {
        return "Buenas Tardes 🦋";
    } else {
        return "Buenas Noches 🌚";
    }
}

export function convertDate(date: string): string {
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const [year, monthNumber, day] = date.split('-');

    const month = months[parseInt(monthNumber, 10) - 1];

    const newDate = `${day} de ${month} de ${year}`;

    return newDate;
}

export function isToday(fechaParametro: string): boolean {
    const date = fechaParametro

    const today: Date = new Date();
    const formatISO: string = today.toISOString().split('T')[0];

    return date === formatISO;
}

export function sounds() {
    const bonk = new Audio('/sounds/bonk.mp3')
    const fart = new Audio('/sounds/fart.mp3')
    const mcClick = new Audio('/sounds/mcClick.mp3')
    const mouseClick = new Audio('/sounds/mouseClick.mp3')
    const orb = new Audio('/sounds/orb.mp3')
    const wii = new Audio('/sounds/wiiKeyPress.mp3')
    const hit = new Audio('/sounds/hit.mp3')
    const damage = new Audio('/sounds/hero_damage.wav')
    const parry = new Audio('/sounds/hero_parry.wav')

    const sound = Math.floor(Math.random() * 9) + 1;

    if (sound === 1) {
        bonk.play()
    }

    if (sound === 2) {
        fart.play()
    }

    if (sound === 3) {
        mcClick.play()
    }

    if (sound === 4) {
        mouseClick.play()
    }

    if (sound === 5) {
        orb.play()
    }

    if (sound === 6) {
        wii.play()
    }

    if (sound === 7) {
        hit.play()
    }

    if (sound === 8) {
        parry.play()
    }

    if (sound === 9) {
        damage.play()
    }
}