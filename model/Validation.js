var Validation = function() {

    this.kiemTraRong = function(selector, name, error_selector) {
        var value = document.querySelector(selector).value;
        if(value.trim() === '') {
            document.querySelector(error_selector).innerHTML = name +  ' không được bỏ trống';
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }

    this.kiemTraDoDai = function(selector, name, error_selector,minLength, maxLenght){
        var value = document.querySelector(selector).value.trim();
        if(value.length < minLength || value.length > maxLenght) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minLength} đến ${maxLenght} kí tự`;
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }

    this.kiemTraTatCaChu = function(selector, name, error_selector) {
        var regex = /^[A-Za-z]+$/;
        if(regex.test(document.querySelector(selector).value)){
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }
        document.querySelector(error_selector).innerHTML = name + ' phải là chữ';
        return false;
    }

    
    this.kiemTraGiaTri = function(selector, name, error_selector,minValue, maxValue){
        var value = document.querySelector(selector).value;
        if(Number(value) < minValue || Number(value) > maxValue) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
}