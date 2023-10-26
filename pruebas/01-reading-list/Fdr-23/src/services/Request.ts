type BooksResponse = {
    library: { book: Record<string, unknown> }[];
};

export const getAllBooks = (): Promise<BooksResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const response = fetch('/src/db/books.json', {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status}, ${response.statusText}`)
                    } else {
                        return response.json()
                    }
                }).then((data) => data)
                resolve(response)
            } catch (error) {
                console.log(error)
                reject(error)
            }
        }, 1000);
    })

}