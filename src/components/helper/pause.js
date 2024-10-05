// pauses the sorting algorithm visualiztion based on speed
const pause = async(speed) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, (-53.07 * speed) + 853.07);
    });
}

export default pause;