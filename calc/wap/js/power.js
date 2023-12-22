var json = [
    {
        "symbol": "kW",
        "ratio": 1,
        "ename": "Kilowatt",
        "name": "千瓦",
        "tname": "千瓦"
    },
    {
        "symbol": "J/s",
        "ratio": 0.001,
        "ename": "Js",
        "name": "焦耳/秒",
        "tname": "焦耳/秒"
    },
    {
        "symbol": "BHP",
        "ratio": 0.745712172,
        "ename": "Horsepower",
        "name": "英制马力",
        "tname": "英制馬力"
    },
    {
        "symbol": "MHP",
        "ratio": 0.7352941,
        "ename": "mHorsepower",
        "name": "米制马力",
        "tname": "米製馬力"
    },
    {
        "symbol": "kg·m/s",
        "ratio": 0.0098039215,
        "ename": "kgms",
        "name": "公斤·米/秒",
        "tname": "公斤·米/秒"
    },
    {
        "symbol": "kcal/s",
        "ratio": 4.1841004,
        "ename": "kcals",
        "name": "千卡/秒",
        "tname": "千卡/秒"
    },
    {
        "symbol": "Btu/s",
        "ratio": 1.05507491,
        "ename": "Btus",
        "name": "英热单位/秒",
        "tname": "英熱單位/秒"
    },
    {
        "symbol": "ft·lb/s",
        "ratio": 0.0013557483731,
        "ename": "ftlbs",
        "name": "英尺·磅/秒",
        "tname": "英尺·磅/秒"
    },
    {
        "symbol": "N·m/s",
        "ratio": 0.001,
        "ename": "Nms",
        "name": "牛顿·米/秒",
        "tname": "牛頓·米/秒"
    },
    {
        "symbol": "MW",
        "ratio": 1000,
        "ename": "megawatt",
        "name": "兆瓦",
        "tname": "兆瓦"
    },
    {
        "symbol": "mW",
        "ratio": 0.000001,
        "ename": "Milliwatt",
        "name": "毫瓦",
        "tname": "毫瓦"
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


