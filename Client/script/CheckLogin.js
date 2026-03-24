const URL_BE = `http://127.0.0.1:8081`;



async function apiFetch(url, options = {}) {

    const res = await fetch(url, {
        ...options,
        credentials: "include"
    });

    // console.log("API Response: ", res.status);


    if (res.status === 401) {
        window.location.href = "/login.html";
        return;
    }

    return res;
}