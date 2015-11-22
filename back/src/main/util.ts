export function fromNode<T>(a: (cb: (err: any, value: T) => void) => void): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        a((err: any, value: T) => {
            if (err) return reject(err);
            resolve(value);
        });
    });
}
