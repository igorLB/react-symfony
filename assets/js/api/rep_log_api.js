function fecthJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
    }, options))
        .then(response => {
            return response.json();
        })
}

/**
 * Return a Promise object with the rep logs data
 * 
 * @return {Promise<Response>}
 */
export function getRepLogs() {
    return fecthJson('/reps')
        .then(data => data.items);
}

export function deleteRepLog(id) {
    return fecthJson(`/reps/${id}`, {
        method: 'DELETE',
    })
}