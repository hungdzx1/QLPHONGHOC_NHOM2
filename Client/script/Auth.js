
const Auth = async () => {
    try {
        const res = await apiFetch(`${URL_BE}/api/auth`);

        const data = await res.json();

        const auth = data.data[0];

        // console.log("Auth: ",auth);

        // console.log("Fullname: ", auth.fullname);

        if(res.ok){
            const name = document.getElementById("fullname");

            name.innerHTML = `${auth.fullname}`;
        }
        else{
            throw new Error(data.message);
        }

    } catch (error) {
        console.error('Lỗi: ', error);
    }
}

Auth();



