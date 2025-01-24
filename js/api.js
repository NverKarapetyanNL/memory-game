export async function fetchImages(source, count) {
    if (source === 'dogs') {
        const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
        const data = await res.json();
        return data.message.slice(0, count).flatMap(image => [image, image]).sort(() => Math.random() - 0.5);
    } else if (source === 'cats') {
        return Array.from({ length: count }, () => `https://cataas.com/cat?width=100&height=100&random=${Math.random()}`)
            .flatMap(image => [image, image])
            .sort(() => Math.random() - 0.5);
    } else if (source === 'lorem') {
        return Array.from({ length: count }, (_, i) => `https://picsum.photos/id/${i + 10}/100/100`)
            .flatMap(image => [image, image])
            .sort(() => Math.random() - 0.5);
    }
    return [];
}
