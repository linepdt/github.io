var json = [
    {
        "symbol": "k㎡",
        "ratio": 1000000,
        "ename": "square kilometer",
        "name": "平方千米",
        "tname": "平方千米"
    },
    {
        "symbol": "ha",
        "ratio": 10000,
        "ename": "hectare",
        "name": "公顷",
        "tname": "公頃"
    },
    {
        "symbol": "are",
        "ratio": 100,
        "ename": "are",
        "name": "公亩",
        "tname": "公畝"
    },
    {
        "symbol": "d㎡",
        "ratio": 0.01,
        "ename": "square decimeter",
        "name": "平方分米",
        "tname": "平方分米"
    },
    {
        "symbol": "c㎡",
        "ratio": 0.0001,
        "ename": "square centimeter",
        "name": "平方厘米",
        "tname": "平方厘米"
    },
    {
        "symbol": "m㎡",
        "ratio": 0.000001,
        "ename": "square millimeter",
        "name": "平方毫米",
        "tname": "平方毫米"
    },
    {
        "symbol": "acre",
        "ratio": 4046.8564224,
        "ename": "acre",
        "name": "英亩",
        "tname": "英畝"
    },
    {
        "symbol": "sq.mi",
        "ratio": 2589988.110336,
        "ename": "square mile",
        "name": "平方英里",
        "tname": "平方英里"
    },
    {
        "symbol": "sq.yd",
        "ratio": 0.83612736,
        "ename": "square yard",
        "name": "平方码",
        "tname": "平方碼"
    },
    {
        "symbol": "sq.ft",
        "ratio": 0.09290304,
        "ename": "square foot",
        "name": "平方英尺",
        "tname": "平方英尺"
    },
    {
        "symbol": "sq.in",
        "ratio": 0.00064516,
        "ename": "square inch",
        "name": "平方英寸",
        "tname": "平方英寸"
    },
    {
        "symbol": "sq.rd",
        "ratio": 25.29285264,
        "ename": "square rod",
        "name": "平方竿",
        "tname": "平方竿"
    },
    {
        "symbol": "",
        "ratio": 66666.666666667,
        "ename": "qing",
        "name": "顷",
        "tname": "頃"
    },
    {
        "symbol": "",
        "ratio": 666.66666666667,
        "ename": "mu",
        "name": "亩",
        "tname": "畝"
    },
    {
        "symbol": "",
        "ratio": 0.11111111111111,
        "ename": "square chi",
        "name": "平方尺",
        "tname": "平方尺"
    },
    {
        "symbol": "",
        "ratio": 0.0011111111111111,
        "ename": "square cun",
        "name": "平方寸",
        "tname": "平方寸"
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


