export async function loginAPI(url, method, body = null) {
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
            console.log('登入錯誤資訊', errorMessage);
            throw new Error(errorMessage.message);
        }
        return await response.json();
    } catch (error) {
        throw error
    }
}


// async function login(){
//     try {
       
//         let user = {
//             "email":inputState.value.email.content ,
//             "password":inputState.value.password.content
//         }
//         let response = await fetch('https://todolist-api.hexschool.io/users/sign_in',{
//             body:JSON.stringify(user),
//             cache: "no-cache",
//             headers: {
//                 "user-agent": "Mozilla/4.0 MDN Example",
//                 "content-type": "application/json",
//             },
//             method: "POST",
//         })
//         if(!response.ok){
//             const errorMessage = await response.json();
//             console.log('錯誤資訊',errorMessage)
//         }
//         let data = await response.json()
//         console.log('正確資訊',data)
//         console.log(data.token)
//     } catch (error) {
        
//     }finally{

//     }
   
// }







