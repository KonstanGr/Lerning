const postData = async (url, data) => {//postData настраивает запрос
    let res = await fetch(url, {//postData посылает запрос на сервер
        method: "POST",
        headers: {
            'Content-type': 'application/json'
         },
        body: data 
    });

    return await res.json();// возвращаем промис(трансформирует в json)
};

async function getResource(url) {
    let res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();// возвращаем промис(трансформирует в json)
}

export {postData};
export {getResource};