var json = [
    {
        "symbol": "km",
        "alias": "公里",
        "ratio": 1000,
        "ename": "kilometer",
        "name": "千米",
        "tname": "千米"
    },
    {
        "symbol": "dm",
        "ratio": 0.1,
        "ename": "decimeter",
        "name": "分米",
        "tname": "分米"
    },
    {
        "symbol": "cm",
        "ratio": 0.01,
        "ename": "centimeter",
        "name": "厘米",
        "tname": "厘米"
    },
    {
        "symbol": "mm",
        "ratio": 0.001,
        "ename": "millimeter",
        "name": "毫米",
        "tname": "毫米"
    },
    {
        "symbol": "μm",
        "ratio": 0.000001,
        "ename": "micrometer",
        "name": "微米",
        "tname": "微米"
    },
    {
        "symbol": "nm",
        "ratio": 1e-9,
        "ename": "nanometer",
        "name": "纳米",
        "tname": "納米"
    },
    {
        "symbol": "ly",
        "ratio": 9460730472580800,
        "ename": "light yea",
        "name": "光年",
        "tname": "光年"
    },
    {
        "symbol": "AU",
        "ratio": 149597870700,
        "ename": "astronomical unit",
        "name": "天文单位",
        "tname": "天文單位"
    },
    {

        "symbol": "in",
        "ratio": 0.0254,
        "ename": "inch",
        "name": "英寸",
        "tname": "英寸"
    },
    {
        "symbol": "ft",
        "ratio": 0.3048,
        "ename": "foot",
        "name": "英尺",
        "tname": "英尺"
    },
    {
        "symbol": "yd",
        "ratio": 0.9144,
        "ename": "yard",
        "name": "码",
        "tname": "碼"
    },
    {
        "symbol": "mi",
        "ratio": 1609.344,
        "ename": "mile",
        "name": "英里",
        "tname": "英里"
    },
    {
        "symbol": "nmi",
        "ratio": 1852,
        "ename": "nautical",
        "name": "海里",
        "tname": "海裡"
    },
    {
        "symbol": "fm",
        "ratio": 1.8288,
        "ename": "fathom",
        "name": "英寻",
        "tname": "英尋"
    },
    {
        "symbol": "fur",
        "ratio": 201.168,
        "ename": "furlong",
        "name": "弗隆",
        "tname": "弗隆"
    },
    {
        "symbol": "a",
        "ratio": 0.0000000001,
        "ename": "angstrom",
        "name": "埃",
        "tname": "埃"
    },
    {
        "symbol": "",
        "ratio": 500,
        "ename": "li",
        "name": "里",
        "tname": "裡"
    },
    {
        "symbol": "",
        "ratio": 3.3333333333333,
        "ename": "zhang",
        "name": "丈",
        "tname": "丈"
    },
    {
        "symbol": "",
        "ratio": 0.33333333333333,
        "ename": "chi",
        "name": "尺",
        "tname": "尺"
    },
    {
        "symbol": "",
        "ratio": 0.033333333333333,
        "ename": "cun",
        "name": "寸",
        "tname": "寸"
    },
    {
        "symbol": "",
        "ratio": 0.0033333333333333,
        "ename": "fen",
        "name": "分",
        "tname": "分"
    },
    {
        "symbol": "",
        "ratio": 0.00033333333333333,
        "ename": "lii",
        "name": "厘",
        "tname": "厘"
    },
    {
        "symbol": "",
        "ratio": 0.000033333333333333,
        "ename": "hao",
        "name": "毫",
        "tname": "毫"
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


