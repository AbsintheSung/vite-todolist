export async function fetchAPI(url, method, token , body = null) {
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
            console.log('錯誤資訊', errorMessage);
            throw new Error(errorMessage.message);
        }
        return await response.json();
        
    } catch (error) {
        // console.error(error);
        throw error
    }
}


// async function getData() {
//     try {
//         let response = await fetch('https://todolist-api.hexschool.io/todos/',
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `${token}`
//             }
//         })
//         if( !response.ok ){
//             let errorMessage = await response.json();
//             console.log('錯誤資訊',errorMessage)
//             // throw new Error(errorMessage)
//         }
        
//         const responseData = await response.json();
//         data.value = []
//         responseData.data.forEach((item)=>{
//             item.edit = false
//             data.value.push(item)
//         })
//         // console.log(data.value)
//     } catch (error) {
        
//     }
   
// };

