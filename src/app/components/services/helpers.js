class HelperService {
    constructor() {
        this.apiurl = "/api";
     }
    
    buildUrl(model, action) {
        action = action || "";
        return `${this.apiurl}/${model}/${action}`;
    }

    validateObject(object) {
        var valid = [];
        if (object) {
            for(var key in object) {
                if ((object[key] != undefined || object[key] != null) || object[key] != "" || object[key] == false) {
                    valid.push(true);
                }
                else {
                    valid.push(false);
                }
            }
        }
        var y = valid.indexOf(false);
        return y == -1 ? true : false;
    }

    cleanObject(object) {
        if (object) {
            for(var key in object) {
                object[key] = null;
            }
        }
        return object;  
    }

    dateFormat(value) {
        var date = new Date(value);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();      
        return `${day}/${month}/${year}`;
    }

    cutCharacters(text) {
        if (text && text.length >= 75) {    
            var x = text.substring(0, 75);
            return x + "...";
        } 
        return text;
    }

    formatMoney(value) {
        if (value >= 1000) {
            var result = (value / 1000).toFixed(1);
            return result + "k";
        }
    }

}

export default new HelperService();