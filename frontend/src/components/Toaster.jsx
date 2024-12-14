import { toast } from "react-toastify";

const Toaster = ({message, type}) =>{
   return toast(message, {position: 'top-right', type, theme:'dark'})
}

export default Toaster;