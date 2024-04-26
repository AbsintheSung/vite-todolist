import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref } from 'vue'

const toastId = ref('')

//使用者點擊 等待時顯示(loading狀態)
export  function toastWaitMessage(message){
    toastId.value = toast(`${message}`, {
        toastId: toastId.value,
        theme: "dark",
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        dangerouslyHTMLString: true,
        isLoading: true,
    })
}

//成功時 更新 toast內容，並設置500毫秒關閉
export function updateToastMessage(message){
    toast.update(toastId.value, {
        render: (props) => {
            return `${message}`;
        },
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose:500,
    });
}

//失敗時 更新 toast內容，並設置500毫秒關閉
export function updateToastMessage_Error(message){
    toast.update(toastId.value, {
        render: (props) => {
            return `${message}`;
        },
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose:500,
    });
}

