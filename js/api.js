export async function fetchImages(source, count = 18) {
    let images = [];
    switch (source) {
        case "lorem":
            images = Array.from({ length: count }, (_, i) => `https://picsum.photos/id/${i + 10}/100/100`);
            break;
        case "dogs":
            const dogRes = await fetch("https://dog.ceo/api/breeds/image/random/18");
            const dogData = await dogRes.json();
            images = dogData.message;
            break;
        case "cats":
            images = Array.from({ length: count }, () => `https://cataas.com/cat?random=${Math.random()}`);
            break;
    }
    return images;
}
