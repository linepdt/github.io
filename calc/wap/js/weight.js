var json = [
    {
        "symbol": "g",
        "ratio": 0.001,
        "ename": "gram",
        "name": "克",
        "tname": "克"
    },
    {
        "symbol": "mg",
        "ratio": 0.000001,
        "ename": "milligram",
        "name": "毫克",
        "tname": "毫克"
    },
    {
        "symbol": "μg",
        "ratio": 1e-9,
        "ename": "microgram",
        "name": "微克",
        "tname": "微克"
    },
    {
        "symbol": "t",
        "ratio": 1000,
        "ename": "ton",
        "name": "吨",
        "tname": "噸"
    },
    {
        "symbol": "q",
        "ratio": 100,
        "ename": "quintal",
        "name": "公担",
        "tname": "公擔"
    },
    {
        "symbol": "ct",
        "ratio": 0.0002,
        "ename": "carat",
        "name": "克拉",
        "tname": "克拉"
    },
    {
        "symbol": "lb",
        "ratio": 0.45359237,
        "ename": "pound",
        "name": "磅",
        "tname": "磅"
    },
    {
        "symbol": "oz",
        "ratio": 0.028349523125,
        "ename": "avdpOunce",
        "name": "盎司",
        "tname": "盎司"
    },
    {
        "symbol": "ct",
        "ratio": 0.0002,
        "ename": "carat",
        "name": "克拉",
        "tname": "克拉"
    },
    {
        "symbol": "gr",
        "ratio": 0.00006479891,
        "ename": "avdpGrain",
        "name": "格令",
        "tname": "格令"
    },
    {
        "symbol": "lt",
        "ratio": 1016.0469088,
        "ename": "briTon",
        "name": "长吨",
        "tname": "長噸"
    },
    {
        "symbol": "st",
        "ratio": 907.18474,
        "ename": "usTon",
        "name": "短吨",
        "tname": "短噸"
    },
    {
        "symbol": "lh",
        "ratio": 50.80234544,
        "ename": "briCWT",
        "name": "英担",
        "tname": "英擔"
    },
    {
        "symbol": "sh",
        "ratio": 45.359237,
        "ename": "usCWT",
        "name": "美担",
        "tname": "美擔"
    },
    {
        "symbol": "st",
        "ratio": 6.35029318,
        "ename": "briStone",
        "name": "英石",
        "tname": "英石"
    },
    {
        "symbol": "dr",
        "ratio": 0.0017718451953125,
        "ename": "avdpDram",
        "name": "打兰",
        "tname": "打蘭"
    },
    {
        "symbol": "",
        "ratio": 0.3732417216,
        "ename": "troyPound",
        "name": "金衡磅",
        "tname": "金衡磅"
    },
    {
        "symbol": "",
        "ratio": 0.0311034768,
        "ename": "troyOunce",
        "name": "金衡盎司",
        "tname": "金衡盎司"
    },
    {
        "symbol": "",
        "ratio": 0.00155517384,
        "ename": "troyDWT",
        "name": "金衡担",
        "tname": "金衡擔"
    },
    {
        "symbol": "",
        "ratio": 0.00006479891,
        "ename": "troyGrain",
        "name": "金衡格令",
        "tname": "金衡格令"
    },
    {
        "symbol": "",
        "ratio": 0.5,
        "ename": "jin",
        "name": "斤",
        "tname": "斤"
    },
    {
        "symbol": "",
        "ratio": 50,
        "ename": "dan",
        "name": "担",
        "tname": "擔"
    },
    {
        "symbol": "",
        "ratio": 0.05,
        "ename": "liang",
        "name": "两",
        "tname": "兩"
    },
    {
        "symbol": "",
        "ratio": 0.005,
        "ename": "qian",
        "name": "钱",
        "tname": "錢"
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


