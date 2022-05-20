async function getToken() {
    const url = QUT_API + "/user/login";

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: "mike@gmail.com",
                password: "password",
            })
        });

        const json = await res.json();
        const token = json.token;

        return { error: false, token: token };
    } catch {
        return { error: true, message: "Failed to get token" };
    }
}