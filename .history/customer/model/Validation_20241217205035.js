export class Validation{
    required(value,messageError,errorId){

        const element = document.getElementById(errorId);
        if(value.trim() === ''){
            element.innerHTML = messageError
            element.style.display = 'block';
            return false
        }

        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }


    minLength(value,messageError,errorId){
        if(value.length < minLength){
            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }

}