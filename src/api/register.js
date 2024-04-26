export async function registerAPI(url, method, body = null) {
    try {
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-cache"
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            let errorMessage = await response.json();
            // console.log('註冊錯誤資訊', errorMessage);
            throw new Error(errorMessage.message);
        }
        return await response.json();
    } catch (error) {
        throw error
    }
}

// async function registerAccount(){
//     let user={
//         "email":inputState.value.email.content,
//         "nickname":inputState.value.nickname.content,
//         "password":inputState.value.password.content
//     }
//     try {
//         let data = await fetch('https://todolist-api.hexschool.io/users/sign_up',{
//             body:JSON.stringify(user),
//             cache: "no-cache",
//             headers: {
//                 "user-agent": "Mozilla/4.0 MDN Example",
//                 "content-type": "application/json",
//             },
//             method: "POST",
           
//         })
//         if( !data.ok ){
//             const errorData = await data.json();
//             console.log('錯誤資訊',errorData)
//             // throw new Error(JSON.stringify(errorData))
//         }
//         const dataJson = await data.json(); 
//         console.log('正確資訊',dataJson)

//     } catch (error) {

//     }
   
// }
