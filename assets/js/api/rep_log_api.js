/**
 * Return a Promise object with the rep logs data
 * 
 * @return {Promise<Response>}
 */
export function getRepLogs() {
    return fetch('/reps', {
        credentials: 'same-origin'
    })
        .then(response => {
            return response.json().then((data) => data.items)
        });
}