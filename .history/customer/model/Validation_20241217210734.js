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

    isNumber(value,messageError,errorId){
        const regex = /^[0-9]*$/
        const element = document.getElementById(errorId)

        if(regex.test(value)){
            element.innerHTML =''
            element.style.display ='none'
            return true
        }

        element.innerHTML = messageError
        element.style.display ='block'
        return false
    }

}