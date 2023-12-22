var json = [
    {
        "symbol": "ATM",
        "ratio": 101325,
        "ename": "Atm",
        "name": "标准大气压",
        "tname": "標準大氣壓"
    },
    {
        "symbol": "hPa",
        "ratio": 100,
        "ename": "Hectopascal",
        "name": "百帕",
        "tname": "百帕"
    },
    {
        "symbol": "kPa",
        "ratio": 1000,
        "ename": "Kilopascal",
        "name": "千帕",
        "tname": "千帕"
    },
    {
        "symbol": "MPa",
        "ratio": 1000000,
        "ename": "MPa",
        "name": "兆帕",
        "tname": "兆帕"
    },
    {
        "symbol": "mmHg",
        "alias": "托",
        "ratio": 133.32236842105,
        "ename": "Millimeter Hg",
        "name": "毫米汞柱",
        "tname": "毫米汞柱"
    },
    {
        "symbol": "in Hg",
        "ratio": 3386.3881578947,
        "ename": "Inch Hg",
        "name": "英寸汞柱",
        "tname": "英寸汞柱"
    },
    {
        "symbol": "Bar",
        "ratio": 100000,
        "ename": "Bar",
        "name": "巴",
        "tname": "巴"
    },
    {
        "symbol": "mBar",
        "ratio": 100,
        "ename": "Millibar",
        "name": "毫巴",
        "tname": "毫巴"
    },
    {
        "symbol": "psi",
        "ratio": 6894.757,
        "ename": "engPound_sq_inch",
        "name": "磅力/平方英寸",
        "tname": "磅力/平方英寸"
    },
    {
        "symbol": "psf",
        "ratio": 47.880256944444,
        "ename": "engPound_sq_foot",
        "name": "磅力/平方英尺",
        "tname": "磅力/平方英尺"
    },
    {
        "symbol": "kgf/㎡",
        "ratio": 9.80665,
        "ename": "xpressKg_sq_m",
        "name": "公斤力/平方米",
        "tname": "公斤力/平方米"
    },
    {
        "symbol": "kgf/c㎡",
        "ratio": 98066.5,
        "ename": "xpressKg_sq_cm",
        "name": "公斤力/平方厘米",
        "tname": "公斤力/平方厘米"
    },
    {
        "symbol": "",
        "ratio": 9.8066135801985,
        "ename": "mmmH2O",
        "name": "毫米水柱",
        "tname": "毫米水柱"
    },
    {
        "symbol": "",
        "ratio": 249.087,
        "ename": "engInchH2O",
        "name": "英寸水柱",
        "tname": "英寸水柱"
    }
];

var app = new Vue({
    el: '#app',
    data: {
        number: "",
        array: json,
        numArr: [],
        noChangeTarget: {}
    },
    methods: {
        toNonExponential: function (num) {
            var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
            return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
        },
        num: function (numb) {
            var inputNum = numb;
            if (numb > 10000000 || numb < 0.0000001) {
                inputNum = numb.toLocaleString().split(",").join("")
            }
            if (inputNum.toString().length > 15) {
                if (inputNum.toString().match(/\./)) {
                    var tempArr = inputNum.toString().split(".");
                    if (tempArr[0].length >= 15) {
                        inputNum = Number(tempArr[0]);
                    } else {
                        var extra = 15 - tempArr[0].length;
                        var t = tempArr[1].split("");
                        t.splice(extra);
                        tempArr[1] = t.join("");
                        inputNum = Number(tempArr.join("."));
                    }
                }
            }
            if (!inputNum.toString().match(/\./)) {
                var returnNum = !inputNum.toString().match(/e/) ? inputNum.toString() : inputNum.toLocaleString().split(",").join("");
                if (returnNum.match(/e/)) {
                    return inputNum.toLocaleString().split(",").join("");
                } else {
                    return returnNum;
                }
            } else {
                return (this.toNonExponential(((inputNum * Math.pow(10, 14)).toFixed(1)) / Math.pow(10, 14))).toString()
            }
        },
        inputCheck(n) {
            n.target.value = n.target.value.replace(/[^\d\.]/ig, '')
            this.number = n.target.value.replace(/[^\d\.]/ig, '');
            n.target.value = n.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/ig, "");
            this.number = n.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/ig, "");
            if (n.data === "e") {
                n.target.value = n.target.value.replace(/e/ig, "");
                this.number = Number(n.target.value.replace(/e/ig, ""))
            } else {
                this.number = this.number ? this.number.replace(/[^\d\.]/ig, '') : "";
            }
            if (this.number) {
                if (this.number.toString().match(/\./)) {
                    var tempStr = this.number.toString();
                    var tempArr = tempStr.split(".");
                    if (tempArr[0].length >= 18) {
                        this.number = Number(tempArr[0]);
                    } else if (tempArr[1].length >= (18 - tempArr[0].length - 1)) {
                        var flag = 18 - tempArr[0].length - 1;
                        tempArr[1].split("").splice(flag);
                        this.number = Number(tempArr.join("."))
                    }
                } else {
                    if (this.number.length >= 18) {
                        var tempArr = this.number.toString().split("");
                        tempArr.splice(17);
                        this.number = parseInt(tempArr.join(""))
                    }
                }
            }
        },
        inputBottom(e, radio, ename) {
            e.target.value = e.target.value ? e.target.value.replace(/[^0-9\.]/ig, '') : "";
            if (e.target.value) {
                if (e.target.value.length > 15) {
                    if (e.target.value.match(/\./)) {
                        var tempArr = e.target.value.split(".");
                        if (tempArr[0].length >= 15) {
                            e.target.value = Number(tempArr[0]);
                        } else {
                            var extra = 15 - tempArr[0].length;
                            var t = tempArr[1].split("");
                            t.splice(extra);
                            tempArr[1] = t.join("");
                            e.target.value = tempArr.join(".");
                        }
                    } else {
                        if (e.target.value.length >= 15) {
                            var tempArr = e.target.value.split("");
                            tempArr.splice(15);
                            e.target.value = tempArr.join("")
                  cf      }
                    }
                }
                this.noChangeTarget.ename = ename;
                this.noChangeTarget.value = e.target.value;
                if ((e.target.value * radio).toString().match(/e/)) {
                    this.number = Number((e.target.value * radio).toLocaleString().split(",").join(""));
                } else {
                    this.number = Number(e.target.value * radio);
                }
                this.number = Number(e.target.value * radio);
            } else {
                this.noChangeTarget.value = "";
                this.number = "";
            }
        }
    },
})


