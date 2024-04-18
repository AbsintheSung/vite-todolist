export async function loginOutAPI(url, method,token, body = null) {
    try {
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            cache: "no-cache"
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            let errorMessage = await response.json();
            console.log('登出錯誤資訊', errorMessage);
            throw new Error(errorMessage.message);
        }
        return await response.json();
    } catch (error) {
        throw error
    }
}
