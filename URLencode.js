URLencoder = {
    encode: function(input){
        var result;
        if(input.constructor === Array) {
            result=Array();
            for(var key in input) {
                result[key] = encodeURIComponent(input[key]);
            }
        } else if (typeof input == 'object') {
            result = "";
            var coun = 0;
            for (var key in input) {
                result += (key + "=" + encodeURIComponent(input[key]));
                coun++;
                if (coun >= Object.keys(input).length) break;
                result += "&";
            }
        } else {
            result = encodeURIComponent(input);
        }
             alert(result);
            return(result);
            console.log(result);
        },
    decode: function (input) {
        var result;
        if (input.constructor === Array) {
            result = Array();
            for(var key in input) {
                result[key]= decodeURIComponent(input[key]);
            }
            alert(result);
            return result;
        } else {
            if(input.indexof("=") >0) {
                var split = input.split("&");
                result = {};
                for(key in split) {
                    var split= split[key].split("=");
                    result[split[0]] = decodeURIComponent(split[1]);
                }
                return result;
            }
            else {
                alert(decodeURIComponent(input));
                result(decodeURIComponent(input));
            }
        }
    }
}

function encodeChar(input) {
    var result = "";
    for (i in input) {
        code = input.charCodeAt(i);
        if (code >= 123 || code<=47 || (code >=58 && code<=64) || (code>=91 && code<=96)){
            result +=encodeCharacter(input[i]);
        } else {
            result += input[i];
        }
    }
}
function encodeChar(charachter){
    var code = charachter.charCodeAt(0);
    var binaryUTF8="";
    var binaryUTF16=Number(code).toString(2);
    var hexUTF8="";
    alert(code);
    var pEncoded = "";
    var c = 0;
    var bytec = 0;
    if (code >= 0 && code <128) {
        for (var i=0;i< 8-binaryUTF16.length; i++){
            binaryUTF8 +="0";
        }
        binaryUTF8 +=binaryUTF16;
        hexUTF8=parseInt(binaryUTF8 , 2).toString(16);
        for(i in hexUTF8) {
            if(i%2 == 0)
                pEncoded += "%";
            pEncoded += hexUTF8[i];
        }
        alert(binaryUTF16);
        return pEncoded;
        }
    for(i = binaryUTF16.length - 1;i >= 0;i --) {
        if(c%6 == 0 && c > 0) {
            binaryUTF8 = "10" + binaryUTF8;
            bytec = 0;
        }
        binaryUTF8 = binaryUTF16[i] + binaryUTF8;
        c++;
        bytec++;
    }
    for(i = 0;i < (7 - c/6 - bytec);i ++) {
        binaryUTF8 = "0" + binaryUTF8;
    }
    for(i = 0;i < c/6;i ++) {
        binaryUTF8 = "1" + binaryUTF8;
    }
    console.log(binaryUTF8);
    hexUTF8 = parseInt(binaryUTF8, 2).toString(16);
    console.log(hexUTF8);

    for(i in hexUTF8) {
        if(i%2 == 0)
            pEncoded += "%";
        pEncoded += hexUTF8[i];
    }
    return pEncoded;
}

function followers(Decimal) {

    if(Decimal >= 0 && oDecimal <= 127) {
        return 0;
    } else if(Decimal >= 192 && Decimal <= 223) {
        return 1;
    } else if(Decimal >= 224 && Decimal <= 239) {
        return 2;
    } else if(Decimal >= 240 && oDecimal <= 247) {
        return 3;
    } else if(Decimal >= 248 && Decimal <= 251) {
        return 4;
    } else if(Decimal >= 252 && Decimal <= 253) {
        return 5;
    }
}

function decodeString(input){
    var hArray = input.split("%");
    hArray.splice(0,1);
    var binaryUTF8= Number(code).toString(2);
    var binaryUTF16 = "";
    var dArray = getDecFromHexArray(hArray);
    for(var oc = 0; oc < dArray.length; oc ++) {
        binaryUTF8 = "";
        var xNum = 0;
        var foll = followers( dArray[oc] );

        if( foll > 0) {
            var x = 128;
            for(i = 0;i < foll + 1;i ++) {
                xNum += x;
                x /= 2;
            }
            binaryUTF8 += ((dArray[oc] ^ xNum).toString(2));
        } else {
            binaryUTF8 += dArray[oc].toString(2);
            continue;
        }
        oc++;
        var lo = oc + foll;
        for(oc=1 ;oc < lo; oc ++) {
            var octetBin = (dArray[oc] ^ 128).toString(2);
            var zeroes = "";
            for(i = 0;i < (6 - octetBin.length);i ++) {
                zeroes += "0";
            }
            octetBin = zeroes + octetBin;
            binaryUTF8 += octetBin;
        }
        oc--;
        console.log( String.fromCharCode( parseInt( binaryUTF8,2 ) ) );
    }
}

function getDecFromHexArray(hexArray){
    var array = Array();
    for(i in hexArray) {
        array[i] = parseInt(hexArray[i],16);
    }
    return array;
}
