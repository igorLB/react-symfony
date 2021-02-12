function fecthJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
    }, options))
        .then(checkStatus)
        .then(response => {
            return response.text()
                .then(text => text ? JSON.parse(text) : '');
        })
}


function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error;
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

export function createRepLog(repLog) {
    return fecthJson('/reps', {
        method: 'POST',
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type' : 'application/json',
        }
    })
}