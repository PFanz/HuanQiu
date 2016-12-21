$(function () {
    var $window = $(window).eq(0)
    var $document = $(document).eq(0)
    var $camera = $('.camera').eq(0)
    var scenes = 'scene00 scene01 scene02 scene03 scene04 scene05 scene06 scene07 scene08 scene09 scene10 scene11 addition'.split(' ')
    var imgLoader = new ImgLoader
    var currX = 504
    var currY = 0
    var S = false
    var Y = 2
    var O = 0
    var h = false
    var g = 0
    var n = !g
    var R = 0
    var J = false
    var startX = 0
    var startY = 0
    var moveX = 0
    var moveY = 0
    var movedX = 0
    var movedY = 0
    var timeLines = []
    var newTimeLine = 0
    var doms = {
        'default': function(a) {
            a.set("#unique1", {
                left: 1295,
                top: -200,
                width: 504,
                height: 320
            });
            a.set("#unique2", {
                left: 1555,
                top: -366,
                width: 504,
                height: 640
            });
            a.set("#unique3", {
                left: 504,
                top: 251,
                width: 504,
                height: 69,
                "z-index": 10,
                z: 10
            });
            a.set("#unique4", {
                left: 2483,
                top: -262,
                width: 108.5,
                height: 210,
                "z-index": 30,
                z: 30
            });
            a.set("#unique5", {
                left: 2592,
                top: -384,
                width: 198.5,
                height: 270,
                "z-index": 30,
                z: 30
            });
            a.set("#unique6", {
                left: 2730,
                top: -212,
                width: 93.5,
                height: 210,
                "z-index": 30,
                z: 30
            });
            a.set("#unique7", {
                left: 2965,
                top: -262,
                width: 65.5,
                height: 210,
                "z-index": 30,
                z: 30
            });
            a.set("#unique8", {
                left: 2930,
                top: -129,
                width: 41.5,
                height: 210,
                "z-index": 30,
                z: 30
            });
            a.set("#unique9", {
                left: 2986,
                top: -366,
                width: 58.5,
                height: 210,
                "z-index": 30,
                z: 30
            });
            a.set("#unique10", {
                left: 3192,
                top: -312,
                width: 101.5,
                height: 210,
                "z-index": 30,
                z: 30
            });
            a.set("#unique11", {
                left: 3176,
                top: -114,
                width: 174.5,
                height: 293,
                "z-index": 30,
                z: 30
            });
            a.set("#unique12", {
                left: 4311,
                top: -153,
                width: 330.5,
                height: 200,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle-13", {
                left: -144,
                top: 77,
                width: 35,
                height: 46,
                "z-index": 91,
                z: 91
            });
            a.set("#aoaoEle-12", {
                left: -324,
                top: 27,
                width: 141,
                height: 110,
                "z-index": 93,
                z: 93
            });
            a.set("#aoaoEle-11", {
                left: -504,
                top: 0,
                width: 504,
                height: 320,
                "z-index": 90,
                z: 90
            });
            a.set("#aoaoEle-10", {
                left: -176,
                top: 134,
                width: 26,
                height: 35.5,
                "z-index": 91,
                z: 91
            });
            a.set("#aoaoEle-9", {
                left: -465,
                top: 191,
                width: 55,
                height: 26.5,
                "z-index": 91,
                z: 91
            });
            a.set("#aoaoEle-8", {
                left: -113,
                top: 135,
                width: 36.5,
                height: 19,
                "z-index": 91,
                z: 91
            });
            a.set("#aoaoEle-7", {
                left: -574,
                top: 27,
                width: 444.5,
                height: 47,
                "z-index": 91,
                z: 91
            });
            a.set("#aoaoEle-6", {
                left: -105,
                top: 43,
                width: 103,
                height: 67.5,
                "z-index": 91,
                z: 91
            });
            a.set("#aoaoEle-5", {
                left: -369,
                top: 97,
                width: 267.5,
                height: 136.5,
                "z-index": 94,
                z: 94
            });
            a.set("#aoaoEle-4", {
                left: -382,
                top: 108,
                width: 257.5,
                height: 125.5,
                "z-index": 93,
                z: 93
            });
            a.set("#aoaoEle-3", {
                left: -248,
                top: 281,
                width: 30,
                height: 50.5,
                "z-index": 91,
                z: 91
            });
            a.set("#aoaoEle-2", {
                left: -350,
                top: 37,
                width: 28,
                height: 27,
                "z-index": 92,
                z: 92
            });
            a.set("#aoaoEle-1", {
                left: -405,
                top: 11,
                width: 26,
                height: 26,
                "z-index": 91,
                z: 91
            });
            a.set("#aoaoEle0", {
                left: 465,
                top: 155,
                width: 31.5,
                height: 34.5,
                "z-index": 99,
                z: 99
            });
            a.set("#aoaoEle1", {
                left: 0,
                top: 0,
                width: 504,
                height: 320,
                z: 0
            });
            a.set("#aoaoEle2", {
                left: 79,
                top: 169,
                width: 216.5,
                height: 35.5,
                "z-index": 40,
                z: 40
            });
            a.set("#aoaoEle3", {
                left: 0,
                top: 251,
                width: 504,
                height: 69,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle4", {
                left: 0,
                top: 0,
                width: 473,
                height: 259,
                "z-index": 0,
                z: 0
            });
            a.set("#aoaoEle5", {
                left: 342,
                top: 12,
                width: 94.5,
                height: 197,
                "z-index": 0,
                z: 0,
                display: "none"
            });
            a.set("#aoaoEle6", {
                left: 0,
                top: 215,
                width: 361,
                height: 69,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle7", {
                left: 0,
                top: 258,
                width: 198,
                height: 62.5,
                "z-index": 30,
                z: 30
            });
            a.set("#aoaoEle8", {
                left: 24,
                top: 21,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle9", {
                left: 24,
                top: 97,
                width: 143,
                height: 41,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle10", {
                left: 961,
                top: 0,
                width: 504,
                height: 320,
                "z-index": 11,
                z: 11
            });
            a.set("#aoaoEle11", {
                left: 504,
                top: 0,
                width: 416,
                height: 320,
                z: 0
            });
            a.set("#aoaoEle12", {
                left: 1312,
                top: 110,
                "z-index": 80,
                z: 80
            });
            a.set("#aoaoEle13", {
                left: 1329,
                top: 194,
                width: 25.5,
                height: 10,
                "z-index": 30,
                z: 30
            });
            a.set("#aoaoEle14", {
                left: 518,
                top: 157,
                width: 36,
                height: 94.5,
                z: 0
            });
            a.set("#aoaoEle15", {
                left: 621,
                top: 132,
                width: 61,
                height: 120,
                z: 0
            });
            a.set("#aoaoEle16", {
                left: 751,
                top: 37,
                width: 83.5,
                height: 283,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle17", {
                left: 561,
                top: 190,
                width: 50,
                height: 130.5,
                "z-index": 50,
                z: 50
            });
            a.set("#aoaoEle18", {
                left: 689,
                top: 98,
                width: 67.5,
                height: 221.5,
                "z-index": 50,
                z: 50
            });
            a.set("#aoaoEle19", {
                left: 749,
                top: 225,
                width: 93.5,
                height: 94.5,
                "z-index": 40,
                z: 40
            });
            a.set("#aoaoEle20", {
                left: 808,
                top: 0,
                width: 152.5,
                height: 320,
                "z-index": 50,
                z: 40
            });
            a.set("#aoaoEle21", {
                left: 579,
                top: 14,
                width: 271.5,
                height: 142.5,
                "z-index": 60,
                z: 60
            });
            a.set("#aoaoEle22", {
                left: 394,
                top: 251,
                width: 371,
                height: 69.5,
                "z-index": 11,
                z: 11
            });
            a.set("#aoaoEle23", {
                left: 1121,
                top: 30,
                width: 229,
                height: 97.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle24", {
                left: 1046,
                top: 46,
                width: 136,
                height: 239,
                "z-index": 40,
                z: 40
            });
            a.set("#aoaoEle25", {
                left: 622,
                top: 20,
                width: 54.5,
                height: 50.5
            });
            a.set("#aoaoEle26", {
                left: 1368,
                top: 16,
                "z-index": 60,
                z: 60
            });
            a.set("#aoaoEle27", {
                left: 1266,
                top: 20,
                "z-index": 60,
                z: 60
            });
            a.set("#aoaoEle28", {
                left: 1050,
                top: 353,
                width: 0,
                height: 32.5,
                "z-index": 70,
                z: 70,
                rotationZ: -27.7
            });
            a.set("#aoaoEle29", {
                left: 1620,
                top: -130,
                width: 237,
                height: 450
            });
            a.set("#aoaoEle30", {
                left: 2280,
                top: 0,
                width: 177,
                height: 323,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle31", {
                left: 1459,
                top: 110,
                width: 203,
                height: 210,
                "z-index": 80,
                z: 80
            });
            a.set("#aoaoEle32", {
                left: 2130,
                top: 110,
                width: 177.5,
                height: 238.5,
                "z-index": 30,
                z: 30
            });
            a.set("#aoaoEle33", {
                left: 1697,
                top: 206,
                width: 208,
                height: 114,
                "z-index": 82,
                z: 82
            });
            a.set("#aoaoEle34", {
                left: 1840,
                top: -149,
                width: 55.5,
                height: 355,
                "z-index": 80,
                z: 80
            });
            a.set("#aoaoEle35", {
                left: 1856,
                top: 36,
                width: 121.5,
                height: 252.5,
                "z-index": 81,
                z: 81
            });
            a.set("#aoaoEle36", {
                left: 1978,
                top: -376,
                width: 110,
                height: 693.5,
                "z-index": 80,
                z: 80
            });
            a.set("#aoaoEle37", {
                left: 0,
                top: 0,
                width: 92.5,
                height: 84
            });
            a.set("#aoaoEle38", {
                left: 1760,
                top: -179,
                width: 230,
                height: 77
            });
            a.set("#aoaoEle39", {
                left: 1899,
                top: -230,
                width: 104.5,
                height: 35
            });
            a.set("#aoaoEle40", {
                left: 1533,
                top: -36,
                width: 237.5,
                height: 95
            });
            a.set("#aoaoEle41", {
                left: 1920,
                top: -368,
                width: 663,
                height: 319,
                "z-index": 20,
                z: 20,
                rotationZ: -27.7
            });
            a.set("#aoaoEle42", {
                left: 2E3,
                top: -145,
                width: 486,
                height: 124,
                "z-index": 70,
                z: 70,
                rotationZ: -27.7
            });
            a.set("#aoaoEle43", {
                left: 2112,
                top: -372,
                width: 117,
                height: 32.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle44", {
                left: 2069,
                top: -303,
                width: 168,
                height: 54.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle45", {
                left: 2233,
                top: -344,
                width: 96,
                height: 27,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle46", {
                left: 2380,
                top: -389,
                width: 87,
                height: 62,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle47", {
                left: 2134,
                top: -234,
                width: 90.5,
                height: 24,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle48", {
                left: 2036,
                top: -132,
                width: 88.5,
                height: 86,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle49", {
                left: 2466,
                top: -320,
                width: 56.5,
                height: 59,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle50", {
                left: 2520,
                top: -388,
                width: 114.5,
                height: 83,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle51", {
                left: 2158,
                top: -130,
                width: 119.5,
                height: 119.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle52", {
                left: 2267,
                top: -180,
                width: 73.5,
                height: 37,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle53", {
                left: 2351,
                top: -220,
                width: 50,
                height: 40,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle54", {
                left: 2110,
                top: -17,
                width: 50,
                height: 72,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle55", {
                left: 2585,
                top: -305,
                width: 49,
                height: 35.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle56", {
                left: 2200,
                top: 21,
                width: 41.5,
                height: 40.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle57", {
                left: 2290,
                top: -20,
                width: 88,
                height: 36.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle58", {
                left: 2239,
                top: -291,
                width: 118.5,
                height: 49.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle59", {
                left: 2324,
                top: -143,
                width: 64,
                height: 62,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle60", {
                left: 2423,
                top: -154,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle61", {
                left: 2424,
                top: -226,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle62", {
                left: 2088,
                top: -366,
                width: 504,
                height: 640,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle63", {
                left: 2802,
                top: -301,
                width: 158.5,
                height: 210,
                "z-index": 30,
                z: 30
            });
            a.set("#aoaoEle64", {
                left: 2592,
                top: -366,
                width: 1100,
                height: 554,
                "z-index": 0,
                z: 0
            });
            a.set("#aoaoEle65", {
                left: 2592,
                top: -366,
                width: 1E3,
                height: 465.5
            });
            a.set("#aoaoEle66", {
                left: 2864,
                top: -96,
                width: 77,
                height: 24
            });
            a.set("#aoaoEle67", {
                left: 3084,
                top: -176,
                width: 41,
                height: 22.5
            });
            a.set("#aoaoEle68", {
                left: 3104,
                top: -86,
                width: 59,
                height: 19.5
            });
            a.set("#aoaoEle69", {
                left: 2998,
                top: -291,
                width: 34.5,
                height: 134.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle70", {
                left: 2871,
                top: -286,
                width: 342.5,
                height: 200,
                "z-index": 0,
                z: 0
            });
            a.set("#aoaoEle71", {
                left: 2871,
                top: -286,
                width: 342.5,
                height: 200,
                "z-index": 0,
                z: 0
            });
            a.set("#aoaoEle72", {
                left: 2794,
                top: -349,
                width: 175,
                height: 63.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle73", {
                left: 2838,
                top: -251,
                width: 85.5,
                height: 41,
                "z-index": 30,
                z: 30
            });
            a.set("#aoaoEle74", {
                left: 2970,
                top: -222,
                width: 164.5,
                height: 73,
                "z-index": 0,
                z: 0
            });
            a.set("#aoaoEle75", {
                left: 3618,
                top: -224,
                width: 840,
                height: 320,
                "z-index": 5,
                z: 5
            });
            a.set("#aoaoEle76", {
                left: 3707,
                top: -64,
                width: 137,
                height: 59.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle77", {
                left: 3892,
                top: -224,
                width: 88.5,
                height: 60.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle78", {
                left: 3882,
                top: -128,
                width: 111,
                height: 64.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle79", {
                left: 3921,
                top: -17,
                width: 74,
                height: 113.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle80", {
                left: 4112,
                top: 13,
                width: 174,
                height: 83.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle81", {
                left: 4021,
                top: -218,
                width: 217.5,
                height: 216.5,
                "z-index": 30,
                z: 30
            });
            a.set("#aoaoEle82", {
                left: 3502,
                top: -331,
                width: 243.5,
                height: 512,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle83", {
                left: 3752,
                top: -212,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle84", {
                left: 3756,
                top: 8,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle85", {
                left: 4548,
                top: -64,
                width: 20.5,
                height: 33.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle86", {
                left: 4319,
                top: -224,
                width: 600,
                height: 321,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle87", {
                left: 4629,
                top: -117,
                width: 209,
                height: 213.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle88", {
                left: 4412,
                top: -162,
                width: 126,
                height: 196.5,
                "z-index": 30,
                z: 30
            });
            a.set("#aoaoEle89", {
                left: 4383,
                top: 71,
                width: 163.5,
                height: 25.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle90", {
                left: 4565,
                top: -212,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle91", {
                left: 4672,
                top: -212,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle92", {
                left: 5126,
                top: -237,
                width: 222.5,
                height: 72,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle93", {
                left: 5134,
                top: -158,
                width: 156.5,
                height: 275.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle94", {
                left: 4919,
                top: -224,
                width: 821.5,
                height: 320,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle95", {
                left: 5055,
                top: -1,
                width: 95,
                height: 115,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle96", {
                left: 5253,
                top: -107,
                width: 82.5,
                height: 99.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle97", {
                left: 5061,
                top: -155,
                width: 58.5,
                height: 107,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle98", {
                left: 4973,
                top: -189,
                width: 72,
                height: 73,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle99", {
                left: 5269,
                top: 20,
                width: 94.5,
                height: 97,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle100", {
                left: 5451,
                top: -74,
                width: 77.5,
                height: 59.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle101", {
                left: 5344,
                top: -71,
                width: 101,
                height: 59,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle102", {
                left: 5410,
                top: -148,
                width: 125.5,
                height: 65.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle103", {
                left: 5253,
                top: -149,
                width: 137.5,
                height: 61,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle104", {
                left: 5396,
                top: -217,
                width: 139.5,
                height: 59.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle105", {
                left: 5388,
                top: 1,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle106", {
                left: 4923,
                top: -44,
                width: 139.5,
                height: 155.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle107", {
                left: 5748,
                top: -224,
                width: 1100,
                height: 250,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle108", {
                left: 5744,
                top: -94,
                width: 47,
                height: 145,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle109", {
                left: 5982,
                top: -140,
                width: 27,
                height: 144,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle110", {
                left: 6018,
                top: -136,
                width: 69,
                height: 194,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle111", {
                left: 6244,
                top: -185,
                width: 55,
                height: 226,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle112", {
                left: 6400,
                top: -119,
                width: 102,
                height: 172,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle113", {
                left: 6042,
                top: -111,
                width: 255,
                height: 205.5,
                "z-index": 50,
                z: 50
            });
            a.set("#aoaoEle114", {
                left: 5748,
                top: -20,
                width: 1100,
                height: 78,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle115", {
                left: 5786,
                top: -66,
                width: 351,
                height: 76,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle116", {
                left: 6480,
                top: -64,
                width: 351,
                height: 76.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle117", {
                left: 5748,
                top: 58,
                width: 1100,
                height: 68.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle118", {
                left: 5484,
                top: -242,
                width: 304.5,
                height: 371,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle119", {
                left: 5805,
                top: -66,
                width: 519,
                height: 162.5,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle120", {
                left: 6324,
                top: -83,
                width: 53.5,
                height: 140.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle121", {
                left: 5883,
                top: 29,
                width: 86.5,
                height: 69.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle122", {
                left: 6331,
                top: -92,
                width: 395,
                height: 187.5,
                "z-index": 60,
                z: 60
            });
            a.set("#aoaoEle123", {
                left: 5959,
                top: -210,
                "z-index": 80,
                z: 80
            });
            a.set("#aoaoEle124", {
                left: 6298,
                top: -212,
                width: 136,
                height: 63.5,
                "z-index": 80,
                z: 80
            });
            a.set("#aoaoEle125", {
                left: 6922,
                top: -174,
                width: 48.5,
                height: 99.5,
                "z-index": 30,
                z: 30
            });
            a.set("#aoaoEle126", {
                left: 6848,
                top: -224,
                width: 1483,
                height: 320,
                "z-index": 60,
                z: 60
            });
            a.set("#aoaoEle127", {
                left: 7390,
                top: -29,
                "z-index": 90,
                z: 90
            });
            a.set("#aoaoEle128", {
                left: 7094,
                top: -156,
                width: 31,
                height: 99,
                "z-index": 75,
                z: 75
            });
            a.set("#aoaoEle129", {
                left: 7282,
                top: 2,
                width: 64,
                height: 16.5,
                "z-index": 75,
                z: 75
            });
            a.set("#aoaoEle130", {
                left: 6924,
                top: -292,
                width: 560.5,
                height: 365.5,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle131", {
                left: 7104,
                top: -200,
                width: 159.5,
                height: 90.5,
                "z-index": 80,
                z: 80
            });
            a.set("#aoaoEle132", {
                left: 7263,
                top: -177,
                width: 42,
                height: 43,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle133", {
                left: 7283,
                top: -106,
                width: 55.5,
                height: 58.5,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle134", {
                left: 7242,
                top: -120,
                width: 34,
                height: 34,
                "z-index": 80,
                z: 80
            });
            a.set("#aoaoEle135", {
                left: 7346,
                top: 24,
                width: 18,
                height: 43.5,
                "z-index": 100,
                z: 100
            });
            a.set("#aoaoEle136", {
                left: 7135,
                top: 24,
                width: 313,
                height: 97,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle137", {
                left: 6963,
                top: -60,
                width: 128,
                height: 64,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle138", {
                left: 6964,
                top: 22,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle139", {
                left: 7361,
                top: 5,
                width: 7.5,
                height: 19,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle140", {
                left: 7116,
                top: -73,
                width: 56.5,
                height: 87,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle141", {
                left: 7581,
                top: -306,
                width: 643,
                height: 631,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle142", {
                left: 7662,
                top: -64,
                width: 75,
                height: 73.5,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle143", {
                left: 7936,
                top: -24,
                width: 92.5,
                height: 108.5,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle144", {
                left: 7604,
                top: -224,
                "z-index": 71,
                z: 71
            });
            a.set("#aoaoEle145", {
                left: 7748,
                top: -196,
                width: 190.5,
                height: 217,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle146", {
                left: 7937,
                top: -213,
                width: 58,
                height: 81.5,
                "z-index": 70,
                z: 70
            });
            a.set("#aoaoEle147", {
                left: 8009,
                top: -212,
                width: 125.5,
                height: 73,
                "z-index": 72,
                z: 72
            });
            a.set("#aoaoEle148", {
                left: 8060,
                top: -130,
                "z-index": 72,
                z: 72
            });
            a.set("#aoaoEle149", {
                left: 8331,
                top: -224,
                width: 663,
                height: 320,
                "z-index": 1,
                z: 1
            });
            a.set("#aoaoEle150", {
                left: 8463,
                top: -211,
                width: 238,
                height: 312,
                "z-index": 3,
                z: 3
            });
            a.set("#aoaoEle151", {
                left: 8463,
                top: -211,
                width: 238,
                height: 312,
                "z-index": 4,
                z: 4
            });
            a.set("#aoaoEle152", {
                left: 8551,
                top: -114,
                width: 62,
                height: 18.5,
                "z-index": 5,
                z: 5
            });
            a.set("#aoaoEle153", {
                left: 8159,
                top: -473,
                width: 856,
                height: 855,
                "z-index": 2,
                z: 2
            });
            a.set("#aoaoEle154", {
                left: 8453,
                top: -27,
                width: 257.5,
                height: 257.5,
                "z-index": 10,
                z: 10
            });
            a.set("#aoaoEle155", {
                left: 8453,
                top: -27,
                width: 257.5,
                height: 257.5,
                "z-index": 11,
                z: 11
            });
            a.set("#aoaoEle156", {
                left: 8453,
                top: -27,
                width: 257.5,
                height: 257.5,
                "z-index": 12,
                z: 12
            });
            a.set("#aoaoEle157", {
                left: 8514,
                top: -223,
                width: 43,
                height: 42.5,
                "z-index": 20,
                z: 20
            });
            a.set("#aoaoEle158", {
                left: 8464,
                top: -211,
                width: 238,
                height: 312,
                "z-index": 6,
                z: 6
            });
            a.set("#aoaoEle159", {
                left: 8336,
                top: -203,
                width: 173,
                height: 120.5,
                "z-index": 40,
                z: 40
            });
            a.set("#aoaoEle160", {
                left: 8643,
                top: -197,
                width: 169,
                height: 113.5,
                "z-index": 40,
                z: 40
            });
            a.set("#aoaoEle161", {
                left: 8332,
                top: -73,
                width: 501.5,
                height: 247,
                "z-index": 7,
                z: 7
            });
            a.set("#aoaoEle163", {
                left: 1321,
                top: 134,
                "z-index": 90,
                z: 90
            });
            a.set("#aoaoEle164", {
                left: 7884,
                top: -37,
                "z-index": 90,
                z: 90
            });
            a.set("#aoaoEle165", {
                left: 8455,
                top: -201,
                "z-index": 6,
                z: 6
            });
            a.set("#aoaoEle166", {
                left: 8974,
                top: -224,
                width: 680,
                height: 320,
                "z-index": 95,
                z: 95
            });
            a.set("#aoaoEle167", {
                left: 9237,
                top: 4,
                width: 177.5,
                height: 34,
                "z-index": 96,
                z: 96
            });
            a.set("#aoaoEle168", {
                left: 9193,
                top: 40,
                width: 298,
                height: 41.5,
                "z-index": 96,
                z: 96
            });
            a.set("#aoaoEle169", {
                left: 8662,
                top: 39,
                width: 47.5,
                height: 36.5,
                "z-index": 14,
                z: 14
            });
            a.set("#aoaoEle170", {
                left: 8716,
                top: 43,
                width: 104,
                height: 32.5,
                "z-index": 15,
                z: 15
            });
            L = 504;
            N = 0;
            a.set($camera, {
                x: currX,
                y: currY
            })
        },
        init: function() {
            newTimeLine.set("#aoaoEle26", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle27", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle12", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle13", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle163", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle23", {
                width: 0
            });
            newTimeLine.set("#aoaoEle42", {
                width: 0,
                "transform-origin": "0% 0%"
            });
            newTimeLine.set("#aoaoEle43", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle44", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle45", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle46", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle47", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle48", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle49", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle50", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle51", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle52", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle53", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle54", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle55", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle56", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle57", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle58", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle59", {
                scale: 0,
                rotationZ: -27.7,
                x: -100,
                y: 64
            });
            newTimeLine.set("#aoaoEle60", {
                scale: 1,
                x: 200
            });
            newTimeLine.set("#aoaoEle61", {
                scale: 1,
                x: 200
            });
            newTimeLine.set("#unique4", {
                y: 220
            });
            newTimeLine.set("#unique5", {
                y: 640
            });
            newTimeLine.set("#unique6", {
                y: 320
            });
            newTimeLine.set("#unique7", {
                y: 320
            });
            newTimeLine.set("#unique8", {
                y: 320
            });
            newTimeLine.set("#unique9", {
                y: 640,
                x: 140
            });
            newTimeLine.set("#aoaoEle69", {
                y: 640,
                x: 140
            });
            newTimeLine.set("#unique10", {
                y: 320
            });
            newTimeLine.set("#unique11", {
                y: 1680
            });
            newTimeLine.set("#aoaoEle72", {
                y: -80
            });
            newTimeLine.set("#aoaoEle63", {
                y: 960,
                x: 150
            });
            newTimeLine.set("#aoaoEle73", {
                y: 960,
                x: 150
            });
            newTimeLine.set("#aoaoEle70", {
                y: 1260,
                x: 0,
                scale: 0
            });
            newTimeLine.set("#aoaoEle71", {
                y: 1260,
                x: 0
            });
            newTimeLine.set("#aoaoEle74", {
                y: 1260,
                x: 0
            });
            newTimeLine.set("#aoaoEle76", {
                height: 0,
                y: 59.5
            });
            newTimeLine.set("#aoaoEle77", {
                y: -60
            });
            newTimeLine.set("#aoaoEle78", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle79", {
                y: 113
            });
            newTimeLine.set("#aoaoEle80", {
                x: 140
            });
            newTimeLine.set("#aoaoEle81", {
                x: 230,
                y: -230
            });
            newTimeLine.set("#aoaoEle83", {
                x: -110,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle84", {
                y: 90,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle88", {
                opacity: 0
            });
            newTimeLine.set("#unique12", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle89", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle87", {
                x: -200,
                width: 115,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle91", {
                y: 100,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle90", {
                y: 100,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle106", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle98", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle95", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle97", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle93", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle92", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle99", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle96", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle103", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle101", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle100", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle102", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle104", {
                y: -100
            });
            newTimeLine.set("#aoaoEle105", {
                y: 100
            });
            newTimeLine.set("#aoaoEle122", {
                x: -790
            });
            newTimeLine.set("#aoaoEle124", {
                y: 100,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle123", {
                y: 100,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle137", {
                x: -100,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle138", {
                x: -100,
                opacity: 0
            });
            newTimeLine.set("#aoaoEle130", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle132", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle128", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle140", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle129", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle133", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle131", {
                scale: 0
            });
            newTimeLine.set("#aoaoEle141", {
                y: -350
            });
            newTimeLine.set("#aoaoEle142", {
                y: -350
            });
            newTimeLine.set("#aoaoEle143", {
                y: -350
            });
            newTimeLine.set("#aoaoEle144", {
                y: -350
            });
            newTimeLine.set("#aoaoEle145", {
                y: -350
            });
            newTimeLine.set("#aoaoEle146", {
                y: -350
            });
            newTimeLine.set("#aoaoEle147", {
                y: -350
            });
            newTimeLine.set("#aoaoEle148", {
                y: -350
            });
            newTimeLine.set("#aoaoEle151", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle152", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle153", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle157", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle158", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle159", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle160", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle161", {
                y: 180
            });
            newTimeLine.set("#aoaoEle168", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle169", {
                opacity: 0
            });
            newTimeLine.set("#aoaoEle170", {
                opacity: 0
            })
        },
        subTimeline: function() {
            var a = new TimelineLite;
            a.add("start");
            a.to("#aoaoEle0", .6, {
                x: "-=8"
            }, "start");
            a.to("#aoaoEle0", .4, {
                x: "+=8",
                onComplete: function() {
                    a.progress(0, !1).play()
                }
            }, "start+=0.6");
            timeLines.push(a);
            if (!J) {
                var b = new TimelineLite;
                b.add("start");
                b.fromTo("#aoaoEle2", 30, {
                    x: 150
                }, {
                    x: -150,
                    ease: Linear.easeNone
                }, "start");
                b.fromTo("#aoaoEle2", 1, {
                    opacity: 0
                }, {
                    opacity: 1
                }, "start");
                b.fromTo("#aoaoEle2", 1, {
                    opacity: 1
                }, {
                    opacity: 0,
                    onComplete: function() {
                        b.progress(0)
                    }
                }, "start+=29");
                timeLines.push(b);
                var c = new TimelineLite;
                c.add("start");
                c.fromTo("#aoaoEle3", .5, {
                    x: 0
                }, {
                    x: -504,
                    ease: Linear.easeNone,
                    onComplete: function() {
                        c.progress(0)
                    }
                });
                c.fromTo("#unique3", .5, {
                    x: 0
                }, {
                    x: -504,
                    ease: Linear.easeNone
                }, "start");
                timeLines.push(c);
                var e = new TimelineLite;
                e.add("start");
                e.to("#aoaoEle4", 30, {
                    x: -100,
                    ease: Linear.easeNone
                }, "start");
                timeLines.push(e);
                var f = new TimelineLite;
                f.add("start");
                f.to("#aoaoEle-1", 8, {
                    rotationZ: 360,
                    ease: Linear.easeNone,
                    onComplete: function() {
                        f.progress(0, !1).play()
                    }
                }, "start");
                timeLines.push(f);
                var g = new TimelineLite;
                g.add("start");
                g.fromTo("#aoaoEle-7", 30, {
                    x: 100
                }, {
                    x: -100,
                    ease: Linear.easeNone
                }, "start");
                g.fromTo("#aoaoEle-7", 1, {
                    opacity: 0
                }, {
                    opacity: 1
                }, "start");
                g.fromTo("#aoaoEle-7", 1, {
                    opacity: 1
                }, {
                    opacity: 0,
                    onComplete: function() {
                        g.progress(0)
                    }
                }, "start+=29");
                timeLines.push(g);
                var h = new TimelineLite;
                h.add("start");
                h.fromTo("#aoaoEle-5", 30, {
                    x: 300
                }, {
                    x: -300,
                    ease: Linear.easeNone
                }, "start");
                h.fromTo("#aoaoEle-5", 1, {
                    opacity: 0
                }, {
                    opacity: 1
                }, "start");
                h.fromTo("#aoaoEle-5", 1, {
                    opacity: 1
                }, {
                    opacity: 0,
                    onComplete: function() {
                        h.progress(0)
                    }
                }, "start+=29");
                timeLines.push(h);
                var k = new TimelineLite;
                k.add("start");
                k.fromTo("#aoaoEle-6", 30, {
                    x: 0
                }, {
                    x: -200,
                    ease: Linear.easeNone
                }, "start");
                k.fromTo("#aoaoEle-6", 1, {
                    opacity: 0
                }, {
                    opacity: 1
                }, "start");
                k.fromTo("#aoaoEle-6", 1, {
                    opacity: 1
                }, {
                    opacity: 0,
                    onComplete: function() {
                        k.progress(0)
                    }
                }, "start+=29");
                timeLines.push(k);
                var l = new TimelineLite;
                l.add("start");
                l.fromTo("#aoaoEle-2", 30, {
                    x: -300
                }, {
                    x: 300,
                    ease: Linear.easeNone
                }, "start");
                l.fromTo("#aoaoEle-2", 1, {
                    opacity: 0
                }, {
                    opacity: 1
                }, "start");
                l.fromTo("#aoaoEle-2", 1, {
                    opacity: 1
                }, {
                    opacity: 0,
                    onComplete: function() {
                        l.progress(0)
                    }
                }, "start+=29");
                timeLines.push(l);
                var m = new TimelineLite;
                m.add("start");
                m.fromTo("#aoaoEle-2", 30, {
                    y: -10
                }, {
                    x: 300,
                    ease: Linear.easeNone
                }, "start");
                m.fromTo("#aoaoEle-2", 1, {
                    opacity: 0
                }, {
                    opacity: 1
                }, "start");
                m.fromTo("#aoaoEle-2", 1, {
                    opacity: 1
                }, {
                    opacity: 0,
                    onComplete: function() {
                        m.progress(0)
                    }
                }, "start+=29");
                timeLines.push(m);
                var d = new TimelineLite;
                d.add("start");
                d.set("#aoaoEle163", {
                    y: -5
                });
                d.to("#aoaoEle163", .6, {
                    y: 5
                }, "start+=0");
                d.to("#aoaoEle163", .4, {
                    y: -5,
                    onComplete: function() {
                        d.progress(0)
                    }
                }, "start+=0.6");
                timeLines.push(d);
                b.progress(0, !1).play();
                c.progress(0, !1).play();
                e.progress(0, !1).play()
            }
        },
        scene00: function(a) {
            a.add("scene00");
            a.to($camera, .01, {
                x: 504,
                y: 0
            });
            a.from("#aoaoEle-4", 2, {
                y: 320,
                ease: Back.easeOut,
                delay: .2
            }, "scene00");
            a.from("#aoaoEle-12", 2, {
                y: 320,
                ease: Power3.easeOut
            }, "scene00");
            a.from("#aoaoEle-3", 1, {
                rotationZ: 180,
                y: 100,
                ease: Back.easeOut,
                delay: 1
            }, "scene00");
            a.from("#aoaoEle-10", 1, {
                rotationZ: 180,
                y: -200,
                ease: Back.easeOut,
                delay: 2
            }, "scene00");
            a.to("#aoaoEle-9", 1, {
                x: 100,
                ease: Linear.easeNone,
                delay: 3
            }, "scene00");
            a.to("#aoaoEle-9", 2, {
                y: 100,
                ease: Linear.easeNone,
                delay: 4
            }, "scene00");
            a.to("#aoaoEle-9", .01, {
                rotationZ: 90,
                ease: Linear.easeNone,
                delay: 4
            }, "scene00");
            a.call(function() {
                setPos(-494, 0);
                a.pause()
            }, [], a);
            a.eventCallback("onUpdate", function() {.043 > a.progress() && a.play()
            })
        },
        scene01: function(a) {
            a.add("scene01");
            a.to($camera, 3, {
                x: 0,
                y: 0
            });
            a.fromTo("#aoaoEle6", 1.5, {
                x: -400
            }, {
                x: 0
            }, "scene01");
            a.fromTo("#aoaoEle7", 1.5, {
                x: -200
            }, {
                x: 0,
                delay: -1
            });
            a.fromTo("#aoaoEle8", .5, {
                x: -204
            }, {
                x: 0,
                ease: Back.easeOut
            }, "scene01+=0.5");
            a.fromTo("#aoaoEle9", .5, {
                x: -204
            }, {
                x: 0,
                ease: Back.easeOut
            }, "scene01+=0.75");
            a.call(function() {
                setPos(0, 0);
                $("#aoaoEle28").removeClass("withArrow");
                a.pause()
            }, [], a)
        },
        scene02: function(a) {
            a.add("scene02");
            a.to("#aoaoEle24", .1, {
                opacity: 0,
                onComplete: function() {}
            }, "scene02");
            a.to($camera, 5, {
                x: -961,
                y: 0,
                ease: Power2.easeInOut,
                onComplete: function() {}
            }, "scene02");
            a.to("#aoaoEle6", 5, {
                x: "+=504",
                ease: Power2.easeInOut
            }, "scene02");
            a.to("#aoaoEle7", 5, {
                x: "+=504",
                ease: Power2.easeInOut
            }, "scene02");
            a.to("#aoaoEle26", .4, {
                scale: 1,
                ease: Back.easeOut
            });
            a.to("#aoaoEle27", .4, {
                scale: 1,
                ease: Back.easeOut
            });
            a.fromTo("#aoaoEle23", .6, {
                width: 0
            }, {
                width: 229,
                ease: Power1.easeOut
            });
            a.to("#aoaoEle12", .4, {
                scale: 1,
                ease: Back.easeOut,
                delay: -.15
            });
            a.to("#aoaoEle13", .4, {
                scale: 1,
                ease: Back.easeOut
            });
            a.to("#aoaoEle163", .6, {
                scale: 1,
                ease: Back.easeOut
            });
            a.call(function() {
                setPos(961, 120);
                a.pause()
            }, [], a)
        },
        scene03: function(a) {
            a.add("scene03");
            a.to("#aoaoEle163", .4, {
                scale: 0
            });
            a.to("#aoaoEle24", .1, {
                opacity: 1
            });
            a.to("#aoaoEle24", .1, {
                opacity: 0
            });
            a.to("#aoaoEle24", .1, {
                opacity: 1
            });
            a.to("#aoaoEle24", .1, {
                opacity: 0
            });
            a.to("#aoaoEle24", .1, {
                opacity: 1
            });
            a.to("#aoaoEle23", .4, {
                opacity: 0
            }, "scene03");
            a.to("#aoaoEle12", .4, {
                opacity: 0
            }, "scene03");
            a.to("#aoaoEle13", .4, {
                opacity: 0
            }, "scene03");
            a.call(function() {
                $("#aoaoEle28").addClass("withArrow")
            }, [], a, "scene03+=2");
            a.to($camera, 1, {
                x: -1329,
                y: 0,
                ease: Linear.easeNone
            }, "scene03+=2");
            a.to($camera, 1.5, {
                x: -1884,
                y: 366,
                ease: Linear.easeNone
            }, "scene03+=3");
            a.to($camera, 1, {
                x: -2088,
                y: 366
            }, "scene03+=4.5");
            a.fromTo("#aoaoEle28", 2, {
                width: 0
            }, {
                width: 1104,
                ease: Linear.easeNone
            }, "scene03+=2");
            a.to("#aoaoEle58", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle43", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle44", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle45", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle46", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle47", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle48", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle49", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle50", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle51", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle52", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle53", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle54", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle55", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle56", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle57", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle59", .4, {
                scale: 1,
                x: 0,
                y: 0,
                rotationZ: -27.7,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle42", 1.2, {
                width: 486,
                ease: Linear.easeNone
            }, "scene03+=3.7");
            a.to("#aoaoEle60", .4, {
                scale: 1,
                x: 0,
                ease: Back.easeOut,
                delay: -.3
            });
            a.to("#aoaoEle61", .4, {
                scale: 1,
                x: 0,
                ease: Back.easeOut,
                delay: -.3
            });
            a.call(function() {
                setPos(2098, -406);
                a.pause()
            }, [], a)
        },
        scene04: function(a) {
            a.add("scene04");
            a.to($camera, 4, {
                x: -2783,
                y: 366,
                ease: Power2.easeInOut
            }, "scene04");
            a.to("#unique4", 5, {
                y: -250,
                x: 0,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#unique5", 5, {
                y: -1E3,
                x: 0,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#unique6", 5, {
                y: -300,
                x: 0,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#unique7", 6, {
                y: -250,
                x: 0,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#unique8", 6, {
                y: -300,
                x: 0,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#unique9", 6, {
                y: -250,
                x: 140,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#aoaoEle69", 6, {
                y: -250,
                x: 140,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#unique10", 5, {
                y: -250,
                x: 0,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#unique11", 6, {
                y: -750,
                x: 0,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#aoaoEle63", 6, {
                y: -300,
                x: 150,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#aoaoEle73", 6, {
                y: -300,
                x: 150,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#aoaoEle70", 6, {
                y: 0,
                x: 0,
                delay: -.1,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#aoaoEle71", 6, {
                y: 0,
                x: 0,
                delay: -.1,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#aoaoEle74", 6, {
                y: 0,
                x: 0,
                delay: -.1,
                ease: Linear.easeNone
            }, "scene04");
            a.to("#aoaoEle70", .5, {
                scale: 1,
                ease: Back.easeOut
            }, "scene04+=5.5");
            a.to("#aoaoEle72", .4, {
                y: 0,
                ease: Back.easeOut
            });
            a.call(function() {
                setPos(2783, -446);
                a.pause()
            }, [], a, "scene04+=4.5");
            a.call(function() {
                setPos(2783, -366);
                a.pause()
            }, [], a)
        },
        scene05: function(a) {
            a.add("scene05");
            a.to($camera, 1.5, {
                x: -2975,
                y: 224,
                ease: Power2.easeInOut
            }, "scene05");
            a.to($camera, 3, {
                x: -3742,
                y: 224,
                ease: Power2.easeInOut
            });
            a.to("#aoaoEle70", .5, {
                scale: 0
            }, "scene05");
            a.to("#aoaoEle70", 1.5, {
                x: 192,
                y: 142,
                ease: Power1.easeInOut
            }, "scene05");
            a.to("#aoaoEle71", 1.5, {
                x: 192,
                y: 142,
                ease: Power1.easeInOut
            }, "scene05");
            a.to("#aoaoEle74", 1.5, {
                x: 192,
                y: 142,
                ease: Power1.easeInOut
            }, "scene05");
            a.to("#aoaoEle70", 3, {
                x: 857,
                y: 142,
                ease: Power1.easeInOut
            }, "scene05+=1.5");
            a.to("#aoaoEle71", 3, {
                x: 857,
                y: 142,
                ease: Power1.easeInOut
            }, "scene05+=1.5");
            a.to("#aoaoEle74", 3, {
                x: 857,
                y: 142,
                ease: Power1.easeInOut
            }, "scene05+=1.5");
            a.to("#aoaoEle76", .4, {
                height: 59.5,
                y: 0
            }, "scene05+=4");
            a.to("#aoaoEle77", .4, {
                y: 0,
                delay: -.3
            });
            a.to("#aoaoEle78", .4, {
                scale: 1,
                delay: -.3
            });
            a.to("#aoaoEle79", .4, {
                y: 0,
                delay: -.3
            });
            a.to("#aoaoEle80", .4, {
                x: 0,
                delay: -.3
            });
            a.to("#aoaoEle81", .4, {
                x: 0,
                y: 0,
                delay: -.3
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "+=1"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "-=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "+=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "-=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "+=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "-=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "+=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "-=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "+=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "-=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "+=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "-=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "+=2"
            });
            a.to("#aoaoEle81", .05, {
                rotationZ: "-=1"
            });
            a.fromTo("#aoaoEle83", .4, {
                opacity: 0
            }, {
                x: 0,
                y: 0,
                opacity: 1,
                delay: -.3
            });
            a.to("#aoaoEle84", .4, {
                x: 0,
                y: 0,
                opacity: 1,
                delay: -.3
            });
            a.call(function() {
                setPos(3742, -224);
                a.pause()
            }, [], a)
        },
        scene06: function(a) {
            a.add("scene06");
            a.to($camera, 2, {
                x: -4356,
                y: 224,
                ease: Power2.easeInOut
            }, "scene06");
            a.to("#aoaoEle81", 1.8, {
                x: 346,
                y: 56,
                rotationZ: -45.8,
                opacity: 1,
                scale: 1.28,
                ease: Power1.easeInOut
            }, "scene06");
            a.to("#aoaoEle88", .4, {
                opacity: 1
            }, "scene06+=1.8");
            a.to("#aoaoEle89", .4, {
                opacity: 1
            }, "scene06+=1.8");
            a.to("#aoaoEle87", .2, {
                width: 209,
                opacity: 1,
                ease: Linear.easeNone
            });
            a.to("#aoaoEle87", .6, {
                x: 0,
                ease: Power1.easeOut
            });
            a.to("#aoaoEle91", .4, {
                y: 0,
                opacity: 1,
                ease: Back.easeOut,
                delay: -.2
            });
            a.to("#aoaoEle90", .4, {
                y: 0,
                opacity: 1,
                ease: Back.easeOut,
                delay: -.2
            });
            a.call(function() {
                setPos(4356, -244);
                a.pause()
            }, [], a)
        },
        scene07: function(a) {
            a.add("scene07");
            a.to($camera, 3, {
                x: -5059,
                y: 224,
                ease: Power2.easeInOut
            }, "scene07");
            a.to("#aoaoEle106", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.1");
            a.to("#aoaoEle98", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.2");
            a.to("#aoaoEle95", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.3");
            a.to("#aoaoEle97", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.4");
            a.to("#aoaoEle93", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.5");
            a.to("#aoaoEle92", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.6");
            a.to("#aoaoEle99", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.7");
            a.to("#aoaoEle103", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.9");
            a.to("#aoaoEle101", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=2.0");
            a.to("#aoaoEle100", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=2.1");
            a.to("#aoaoEle102", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=2.2");
            a.to("#aoaoEle96", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene07+=1.8");
            a.to("#aoaoEle104", .4, {
                y: 0,
                ease: Back.easeOut
            }, "scene07+=2.6");
            a.to("#aoaoEle105", .4, {
                y: 0,
                ease: Back.easeOut
            }, "scene07+=2.8");
            a.call(function() {
                setPos(5059, -224);
                a.pause()
            }, [], a)
        },
        scene08: function(a) {
            a.add("scene08");
            a.to($camera, 3, {
                x: -5939,
                y: 224,
                ease: Power2.easeInOut
            }, "scene08");
            a.to("#aoaoEle122", 2, {
                x: 0,
                ease: Power1.easeInOut,
                delay: 1
            }, "scene08");
            a.to("#aoaoEle124", .4, {
                y: 0,
                opacity: 1,
                ease: Back.easeOut,
                delay: -.2
            });
            a.to("#aoaoEle123", .4, {
                y: 0,
                opacity: 1,
                ease: Back.easeOut,
                delay: -.2
            });
            a.call(function() {
                setPos(5939, -264);
                a.pause()
            }, [], a)
        },
        scene09: function(a) {
            a.add("scene09");
            a.to($camera, 2.5, {
                x: -6950,
                y: 224,
                ease: Power2.easeInOut
            }, "scene09");
            a.to("#aoaoEle122", 2.5, {
                x: 520,
                ease: Power1.easeIn
            }, "scene09");
            a.to("#aoaoEle130", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene09+=1.5");
            a.to("#aoaoEle132", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene09+=1.6");
            a.to("#aoaoEle128", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene09+=1.7");
            a.to("#aoaoEle129", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene09+=1.9");
            a.to("#aoaoEle131", .4, {
                scale: 1,
                ease: Back.easeOut
            }, "scene09+=2.1");
            a.to("#aoaoEle137", .4, {
                x: 0,
                opacity: 1,
                ease: Back.easeOut,
                delay: -.2
            });
            a.to("#aoaoEle138", .4, {
                x: 0,
                opacity: 1,
                ease: Back.easeOut,
                delay: -.2
            });
            a.call(function() {
                setPos(6950, -224);
                a.pause()
            }, [], a)
        },
        scene10: function(a) {
            a.add("scene10");
            a.to($camera, 2, {
                x: -7650,
                y: 224,
                ease: Power2.easeInOut
            }, "scene10");
            a.to("#aoaoEle141", 1, {
                y: 0,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.to("#aoaoEle142", 1, {
                y: 0,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.to("#aoaoEle143", 1, {
                y: 0,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.to("#aoaoEle144", 1, {
                y: 0,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.to("#aoaoEle145", 1, {
                y: 0,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.to("#aoaoEle146", 1, {
                y: 0,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.to("#aoaoEle147", 1, {
                y: 0,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.to("#aoaoEle148", 1, {
                y: 0,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.to("#aoaoEle164", 1, {
                y: 306,
                ease: Power1.easeInOut
            }, "scene10+=2.2");
            a.call(function() {
                a.pause()
            }, [], a, "scene10+=2");
            a.call(function() {
                setPos(7650, -74);
                a.pause()
            }, [], a)
        },
        scene11: function(a) {
            a.add("scene11");
            a.to($camera, 2, {
                x: -8331,
                y: 224,
                ease: Power2.easeInOut
            }, "scene11");
            a.from("#aoaoEle154", .6, {
                y: 180,
                ease: Back.easeOut
            }, "scene11+=2");
            a.from("#aoaoEle155", .6, {
                y: 180,
                ease: Back.easeOut
            }, "scene11+=2");
            a.from("#aoaoEle156", .6, {
                y: 180,
                ease: Back.easeOut
            }, "scene11+=2");
            a.to("#aoaoEle161", 1.5, {
                y: -20,
                ease: Power2.easeOut
            }, "scene11+=2.8");
            a.to("#aoaoEle161", .8, {
                y: 100,
                ease: Power1.easeInOut
            }, "scene11+=4.3");
            a.to("#aoaoEle161", 1.5, {
                y: -20,
                ease: Power2.easeOut
            }, "scene11+=5.2");
            a.to("#aoaoEle161", .8, {
                y: 100,
                ease: Power1.easeInOut
            }, "scene11+=6.7");
            a.to("#aoaoEle161", 1.5, {
                y: -20,
                ease: Power2.easeOut
            }, "scene11+=7.6");
            a.to("#aoaoEle161", .8, {
                y: 180,
                ease: Power1.easeInOut
            }, "scene11+=9.1");
            a.to("#aoaoEle169", .4, {
                opacity: 1
            }, "scene11+=2.4");
            a.to("#aoaoEle170", .4, {
                opacity: 1
            }, "scene11+=2.4");
            a.to("#aoaoEle169", .4, {
                opacity: 0
            }, "scene11+=2.8");
            a.to("#aoaoEle170", .4, {
                opacity: 0
            }, "scene11+=2.8");
            a.to("#aoaoEle165", .4, {
                opacity: 0
            }, "scene11+=2.8");
            a.call(function() {
                a.pause()
            }, [], a, "scene11+=2.79");
            a.to("#aoaoEle155", 1, {
                rotationZ: 80,
                ease: Elastic.easeOut
            }, "scene11+=4.3");
            a.to("#aoaoEle155", 1, {
                rotationZ: 164,
                ease: Elastic.easeOut
            }, "scene11+=6.7");
            a.to("#aoaoEle155", 1, {
                rotationZ: 248,
                ease: Elastic.easeOut
            }, "scene11+=9.1");
            a.to("#aoaoEle151", .01, {
                opacity: 1,
                ease: Back.easeIn
            }, "scene11+=2.8");
            a.to("#aoaoEle151", .01, {
                opacity: 0,
                ease: Back.easeIn
            }, "scene11+=4.3");
            a.to("#aoaoEle151", .01, {
                opacity: 1,
                ease: Back.easeIn
            }, "scene11+=5.2");
            a.to("#aoaoEle151", .01, {
                opacity: 0,
                ease: Back.easeIn
            }, "scene11+=6.7");
            a.to("#aoaoEle151", .01, {
                opacity: 1,
                ease: Back.easeIn
            }, "scene11+=7.6");
            a.to("#aoaoEle151", .01, {
                opacity: 0,
                ease: Back.easeIn
            }, "scene11+=9.1");
            a.fromTo("#aoaoEle152", .2, {
                opacity: 0,
                scale: 1
            }, {
                opacity: 1,
                scale: 1.1
            }, "scene11+=2.8");
            a.to("#aoaoEle152", .6, {
                opacity: 0
            }, "scene11+=3.0");
            a.fromTo("#aoaoEle152", .2, {
                opacity: 0,
                scale: 1
            }, {
                opacity: 1,
                scale: 1.1
            }, "scene11+=5.2");
            a.to("#aoaoEle152", .6, {
                opacity: 0
            }, "scene11+=5.4");
            a.fromTo("#aoaoEle152", .2, {
                opacity: 0,
                scale: 1
            }, {
                opacity: 1,
                scale: 1.1
            }, "scene11+=7.6");
            a.to("#aoaoEle152", .6, {
                opacity: 0
            }, "scene11+=7.8");
            a.to("#aoaoEle150", .4, {
                opacity: 0,
                ease: Linear.easeNone
            }, "scene11+=9.9");
            a.to("#aoaoEle158", .4, {
                opacity: 1,
                ease: Linear.easeNone
            }, "scene11+=9.9");
            a.to("#aoaoEle153", .4, {
                opacity: 1
            }, "scene11+=9.9");
            a.to("#aoaoEle159", .4, {
                opacity: 1
            }, "scene11+=9.9");
            a.to("#aoaoEle160", .4, {
                opacity: 1
            }, "scene11+=9.9");
            a.to("#aoaoEle153", 2, {
                rotationZ: 360,
                ease: Linear.easeNone
            }, "scene11+=9.9");
            a.call(function() {
                setPos(8331, -260);
                a.pause()
            }, [], a)
        },
        scene12: function(a) {
            a.add("scene12");
            a.to($camera, 2, {
                x: -9080,
                y: 224,
                ease: Power2.easeInOut
            }, "scene12");
            a.fromTo("#aoaoEle168", 1, {
                x: -400
            }, {
                x: 0,
                opacity: 1,
                ease: Power1.easeOut,
                delay: 2.5
            }, "scene12");
            a.from("#aoaoEle167", 1, {
                y: -360,
                ease: Back.easeOut,
                delay: 2
            }, "scene12");
            a.call(function() {
                a.pause()
            }, [], a)
        }
    }

    function preventEvent(event) {
        event.preventDefault()
    }

    function resizeHandle() {
        var width = $(window).width(),
            height = $(window).height(),
            $loadingTxt = $(".loading .txt");
        width < height ? $loadingTxt.show() : $loadingTxt.hide()
    }

    function setPos(x, y) {
        $("#aoaoEle0").show();
        $("#aoaoEle0").css({
            left: x + 450 + "px",
            top: y + 130 + "px",
            display: "block",
            "z-index": 9999
        });
        timeLines[0] && timeLines[0].progress(0, !1).play()
    }

    function imgSource(start) {
        var b = {
            tag: "scene00",
            path: "http://web.socialab.com.cn/static/jd79/assets/scene00/",
            list: "ballon.png ballons.png bg.jpg camer.png cart1.png cart2.png cloud1.png cloud2.png cloud3.png logo.png phone.png plant.png sun.png".split(" "),
            onComplete: function(a) {
                $("#loadingTxt").html("20%")
                imgLoader.load(c)
            }
        }, c = {
                tag: "scene01",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene01/",
                list: "arrow.png bg.jpg cloud.png ground.jpg map.png map_txt.png train_back.png train_front.png txt_01.png txt_02.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("30%");
                    imgLoader.load(e)
                }
            }, e = {
                list: "bg.jpg bg2.jpg button.png txt_03.png building_back_01.png building_back_02.png building_back_03.png building_front_01.png building_front_02.png building_front_03.png building_front_04.png cloud2.png ground2.png line.png screen.png sun.png txt_01_a.png txt_02_a.png".split(" "),
                tag: "scene02",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene02/",
                onComplete: function(a) {
                    $("#loadingTxt").html("40%");
                    imgLoader.load(f)
                }
            }, f = {
                tag: "scene03",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene03/",
                list: "bg_arrow.png building_back_01.png building_back_02.png building_front_01.png building_front_02.png building_front_03.png building_front_04.jpg building_front_05.jpg building_front_06.png cap_arrow.png cloud_01.png cloud_02.png cloud_03.png line.png main_arrow.png present_01.png present_02.png present_03.png present_04.png present_05.png present_06.png present_07.png present_08.png present_09.png present_10.png present_11.png present_12.png present_13.png present_14.png present_15.png present_618.png present_1111.png txt_01_a.png txt_02_a.png bg.jpg".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("50%");
                    imgLoader.load(g)
                }
            }, g = {
                tag: "scene04",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene04/",
                list: "ballon.png bg.png citybg.jpg cloud_1.png cloud_2.png cloud_3.png flag.png focus.png phone.png txt_1.png txt_2.png txt_03.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("60%");
                    imgLoader.load(h)
                }
            }, h = {
                tag: "scene05",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene05/",
                list: "bg.jpg phone_1.png phone_2.png phone_3.png phone_4.jpg phone_5.png phone_6.png tower.png txt_01.png txt_02.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("60%");
                    imgLoader.load(k)
                }
            }, k = {
                tag: "scene06",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene06/",
                list: "arrow.png bg.jpg cart.png phone.jpg shadow.png txt_01.png txt_02.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("70%");
                    imgLoader.load(l)
                }
            }, l = {
                tag: "scene07",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene07/",
                list: "areacondition.png areacondition2.png bg.jpg cabinet.png calendar.png calorifier.png clock.png hotwater.png monitor.png radio.png speaker.png tool.png txt_1.png txt_02.png washer.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("80%");
                    imgLoader.load(m)
                }
            }, m = {
                tag: "scene08",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene08/",
                list: "bg.jpg build_1.png build_2.png build_3.png build_4.png build_5.jpg house_a.png mid_bg.jpg mid_tree.png mid_tree2.png road.jpg trafficlight.png tree.png tree2.png tree3.png cart_a.png txt_01.png txt_2.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("90%");
                    imgLoader.load(d)
                }
            }, d = {
                tag: "scene09",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene09/",
                list: "24k.png bg.jpg beer.png price.png tap_txt_2.png all.png fish_body.png fish_tail.png snacks2.png star.png symbol.png table.png txt_1.png txt_02.png upan.png wine.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("95%");
                    imgLoader.load(n)
                }
            }, n = {
                tag: "scene10",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene10/",
                list: "blackboard2.png haiwai.png jd.png bg.jpg light.png paipai.png txt_1.png txt_02.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("98%");
                    imgLoader.load(p)
                }
            }, p = {
                tag: "scene11",
                path: "http://web.socialab.com.cn/static/jd79/assets/scene11/",
                list: "bg.jpg fat.png fighting.png gasp.png light.png scale_btm.png scale_num.png scale_top.png star.png thin.png txt_1.png txt_2.png weight.png".split(" "),
                onComplete: function(a) {
                    $("#loadingTxt").html("100%");
                    imgLoader.load(q)
                }
            }, q = {
                tag: "addition",
                path: "http://web.socialab.com.cn/static/jd79/assets/",
                list: "scene02/txt_04.png scene02/hand.png scene10/hand.png scene11/txt_3.png scene12/bg_s.jpg scene12/txt_01.png scene12/plant.png scene11/hand.png scene11/txt_4.png".split(" "),
                onComplete: function(b) {
                    $("#loadingTxt").html("100%");
                    start()
                }
            };
        imgLoader.load({
            tag: "loading",
            path: "http://web.socialab.com.cn/static/jd79/assets/",
            list: ["loading_bg2.jpg", "loading.gif", "loadtxt.png"],
            onComplete: function(a) {
                $("#loadingTxt").html("10%");
                $(".loading").show();
                imgLoader.load(b)
            }
        })
    }

    function initElems () {
        $('.loading').remove()
        $window.off('resize', resizeHandle)
        var elemsLen = -13
        var width = $window.width()
        var height = $window.height()
        // 将每个elem添加到页面中
        scenes.forEach(function (item, index) {
            var h = imgLoader.tags[item]
            var k = h.imgPool
            h.list.forEach(function (item, index) {
                var dom = k[item]
                dom = $('<div />').css({
                    left: -currX + width / 2,
                    top: -currY + height / 2,
                    width: h.width / 2,
                    height: h.height / 2,
                    backgroundImage: 'url("' + dom.url +'")'
                })
                dom.addClass('ele')
                dom.attr('id', 'aoaoEle' + elemsLen++)
                $camera.append(dom)
            })
        })
        // 整个动画初始化
        initAnimation()
    }

    function initAnimation () {
        $('#aoaoEle0').hide()
        timeLines[0] && timeLines[0].progress(0, false).pause()
    }

    function initScript () {
        newTimeLine = new TimelineLite({
            isPause: false,
            onReverseComplete: function () {
                newTimeLine.pause()
                newTimeLine.progress(0, false).play()
            }
        });
        for (key in doms) {
            var item = doms[key];
            (n || key == 'default') && item.apply(null, [newTimeLine])
        } 
        newTimeLine.play().pause()
    }

    function touchStartHandle (event) {
        event.preventDefault()
        if (S) {
            if (0 < Y) {
                Y--
                setTimeout(function () {
                    Y++
                }, 5000)
                clearTimeout(O)
                S = false
            } else {
                return
            }
        }
        $document.off('touchmove').on('touchmove', touchMoveHandle)
        $document.off('touchend').on('touchend', touchEndHandle)
        startX = event.touches[0].clientX
        startY = event.touches[0].clientY
        newTimeLine.pause()
        h = false
    }

    function touchMoveHandle (event) {
        if (!S) {
            moveX = event.touches[0].clientX
            moveY = event.touches[0].clientY
            movedX = moveX - startX
            movedY = moveY - startY
            startX = moveX
            startY = moveY
            if (g) {
                currX += movedX
                currY += movedY
                TweenLite.set($camera, {
                    x: currX,
                    y: currY
                })
            } else {
                if (utils.isGhostMode){
                    var progress = newTimeLine.progress() + -movedY / 12500
                } else {
                    var progress = newTimeLine.progress() + -movedX / 12500
                }
                progress = Math.max(.043, Math.min(1, progress));
                console.log(progress)
                newTimeLine.progress(progress, false);
                h = false;
            }
        }
    }

    function touchEndHandle (event) {
        $document.off('touchmove')
        $document.off('touchend')
        initAnimation()
        if (J) {
            S = true
            O = setTimeout(function () {
                S = false
                newTimeLine.play()
            }, 400)
        } else {
            if (h && newTimeLine.progress() > 0.04) {
                if (utils.isGhostMode) {
                    movedX <= 0 ? newTimeLine.play() : newTimeLine.reverse()
                } else {
                    movedY <= 0 ? newTimeLine.play() : newTimeLine.reverse()
                }
            } else {
                newTimeLine.play()
            }
        }
    }

    function play () {
        if (n) {
            newTimeLine.progress(0, false).play()
        } else {
            timeLines.forEach(function (item, index) {
                item.progress(0).pause()
            })
            newTimeLine.progress(0).pause()
        }
        $camera.show()
    }

    function start () {
        initElems()
        initScript()
        $document.off('touchstart').on('touchstart', touchStartHandle)
        play()
    }

    setTimeout(function() {
        // 只是阻住默认事件
        $document.on("touchstart", preventEvent);
        // 横屏提示
        $window.on("resize", resizeHandle);
        setTimeout(resizeHandle, 0);
        // 是否是 414 * 736屏幕
        J = 414 == $window.width() || 736 == $window.width();
        // 加载图片，加载完成后执行m函数
        imgSource(start)
    }, 0)
})