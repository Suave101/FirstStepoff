var width = (window.innerWidth/100)*95;
var height = width*(479/1080);
var c;
var context;
var ___temp = false;
document.getElementById('temp').innerHTML = '<canvas id="myCanvas" style="margin:0;padding:0;display:inline-block;" width="'+ width + '" height="' + height + '"></canvas>';
c = document.getElementById("myCanvas");
var cRect = c.getBoundingClientRect();
context = c.getContext("2d");
window.requestAnimationFrame(gameLoop);
var turfColor = "#6f8c69";
var hashandlinecolor = "#FFFFFF";
var dotCircleColor = "#000080";
var circleCircleColor = "#8a0000";
var arcCircleColor = "#ffffff";
var fileCircleColor = "#4300a1";
var c = document.getElementById("myCanvas");
var context = c.getContext("2d");
var num = 0;
var mouseX = 0;
var mouseY = 0;
var _arr = [1.875, 3.75, 5.625, 7.5, 9.375, 11.25, 13.125, 15.0, 16.875, 18.75, 20.625, 22.5, 24.375, 26.25, 28.125, 30.0, 31.875, 33.75, 35.625, 37.5, 39.375, 41.25, 43.125, 45.0, 46.875, 48.75, 50.625, 52.5, 54.375, 56.25, 58.125, 60.0, 61.875, 63.75, 65.625, 67.5, 69.375, 71.25, 73.125, 75.0, 76.875, 78.75, 80.625, 82.5, 84.375, 86.25, 88.125, 90.0, 91.875, 93.75, 95.625, 97.5, 99.375, 101.25, 103.125, 105.0, 106.875, 108.75, 110.625, 112.5, 114.375, 116.25, 118.125, 120.0, 121.875, 123.75, 125.625, 127.5, 129.375, 131.25, 133.125, 135.0, 136.875, 138.75, 140.625, 142.5, 144.375, 146.25, 148.125, 150.0, 151.875, 153.75, 155.625, 157.5, 159.375, 161.25, 163.125, 165.0, 166.875, 168.75, 170.625, 172.5, 174.375, 176.25, 178.125, 180.0, 181.875, 183.75, 185.625, 187.5, 189.375, 191.25, 193.125, 195.0, 196.875, 198.75, 200.625, 202.5, 204.375, 206.25, 208.125, 210.0, 211.875, 213.75, 215.625, 217.5, 219.375, 221.25, 223.125, 225.0, 226.875, 228.75, 230.625, 232.5, 234.375, 236.25, 238.125, 240.0, 241.875, 243.75, 245.625, 247.5, 249.375, 251.25, 253.125, 255.0, 256.875, 258.75, 260.625, 262.5, 264.375, 266.25, 268.125, 270.0, 271.875, 273.75, 275.625, 277.5, 279.375, 281.25, 283.125, 285.0, 286.875, 288.75, 290.625, 292.5, 294.375, 296.25, 298.125, 300.0, 301.875, 303.75, 305.625, 307.5, 309.375, 311.25, 313.125, 315.0, 316.875, 318.75, 320.625, 322.5, 324.375, 326.25, 328.125, 330.0, 331.875, 333.75, 335.625, 337.5, 339.375, 341.25, 343.125, 345.0, 346.875, 348.75, 350.625, 352.5, 354.375, 356.25, 358.125, 360.0];
var cRect = c.getBoundingClientRect();
var modes = {dot: "Marcher ", circle: "Circle ", arc: "Arc ", file: "File/Column "};
// var IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet] = {dots: 0, circles: 0, arcs: 0, files: 0};
var mode = modes.dot;
var IMPORTANT_MASTER_SET_LIST = {1: [], 2: [], 3: []};
var IMPORTANT_MASTER_HTML_LIST = {};
var IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST = {1: {dots: 0, circles: 0, arcs: 0, files: 0}};
var currentSet = 1;
var _setLastCheck = 1;

c.addEventListener("mousemove", setMousePosition, false);
c.addEventListener("mousedown", newSetMousePosition);
function cmo(x) {
    let arr = [];
    for (let i = 0; i < _arr.length; i++) {
        arr.push((_arr[i]/360)*width);
    }
    closestNumb = arr.sort((a,b) => Math.abs(b - x) - Math.abs(a-x)).pop();;
    return closestNumb;
}
function setMousePosition(e) {
  cRect = c.getBoundingClientRect();
  mouseX = cmo(e.clientX - cRect.left);
  mouseY = cmo(e.clientY - cRect.top);
  cordX = (_arr.indexOf((mouseX/width)*360)+1);
  cordY = (_arr.indexOf((mouseY/width)*360)+1);
  if (cordX > 96) {
    document.getElementById('s12').innerHTML = "<td id='s12'>2</td>";
  } else {
    document.getElementById('s12').innerHTML = "<td id='s12'>1</td>";
  }
  txv = [16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176];
  // Left to Right
  closest = txv.reduce((prev,current) => Math.abs(current - cordX)<Math.abs(prev - cordX) ? current : prev);
  if (closest > 96) {
    yardline = (((closest - 16)/8)-((((closest - 16)/8) - 10)*2))*5;
    _side = 2;
  } else {
    yardline = ((closest - 16)/8)*5;
    _side = 1;
  }
  if (cordX == closest) {
    cordX = "On the " + yardline;
  } else if (cordX < closest) {
    if (_side == 1) {
      cordX = Math.abs(cordX-closest) + " outside the " + yardline;
    } else {
      cordX = Math.abs(closest-cordX) + " inside the " + yardline;
    }
  } else if (cordX > closest) {
    if (_side == 1) {
      cordX = Math.abs(closest-cordX) + " inside the " + yardline;
    } else {
      cordX = Math.abs(cordX-closest) + " outside the " + yardline;
    }
  }
  // Front to Back
  if (cordY > 71) {
    cordY = ((cordY - 86)*-1) + " behind of front sideline";
  } else if (cordY > 57) {
    cordY = (cordY - 57) + " in front of front hash";
  } else if (cordY == 57) {
    cordY = "On front hash";
  } else if (cordY == 28) {
    cordY = "On Back Hash";
  } else if ((28 < cordY) && (cordY < 42)) {
    cordY = (cordY - 28) + " in front of back hash";
  } else if (((cordY > 41) && (cordY < 57))) {
    cordY = ((cordY - 57)*-1) + " behind of front hash";
  } else if (cordY < 14) {
    cordY = cordY + 1 + " in front of back sideline";
  } else if (cordY < 28) {
    cordY = ((cordY - 28)*-1) + " behind of back hash";
  }
  document.getElementById('tlr').innerHTML = "<td id='tlr'>" + cordX + "</td>";
  document.getElementById('tfb').innerHTML = "<td id='tfb'>" + cordY + "</td>";
}
function newSetMousePosition(e) {
  cRect = c.getBoundingClientRect();
  mouseX = cmo(e.clientX - cRect.left);
  mouseY = cmo(e.clientY - cRect.top);
  _mouseX = structuredClone(mouseX);
  _mouseY = structuredClone(mouseY);
  _bad = false;
  for (let i = 0; i < IMPORTANT_MASTER_SET_LIST[currentSet].length; i++) {
    if ((IMPORTANT_MASTER_SET_LIST[currentSet][i][0] == mouseX) && (IMPORTANT_MASTER_SET_LIST[currentSet][i][1] == mouseY)) {
        if (confirm("Do you want to edit this itsm's position? If not, click cancel.")) {
          _bad =structuredClone(IMPORTANT_MASTER_SET_LIST[currentSet][i]);
        } else {
          _bad = true;
        }
    }
  }
  if (_bad == false) {
      cordX = (_arr.indexOf((mouseX/width)*360)+1);
      cordY = (_arr.indexOf((mouseY/width)*360)+1);
      if (cordX > 96) {
        _cell4 = "2";
      } else {
        _cell4 = "1";
      }
      txv = [16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176];
      // Left to Right
      closest = txv.reduce((prev,current) => Math.abs(current - cordX)<Math.abs(prev - cordX) ? current : prev);
      if (closest > 96) {
        yardline = (((closest - 16)/8)-((((closest - 16)/8) - 10)*2))*5;
        _side = 2;
      } else {
        yardline = ((closest - 16)/8)*5;
        _side = 1;
      }
      if (cordX == closest) {
        cordX = "On the " + yardline;
      } else if (cordX < closest) {
        if (_side == 1) {
          cordX = Math.abs(cordX-closest) + " outside the " + yardline;
        } else {
          cordX = Math.abs(closest-cordX) + " inside the " + yardline;
        }
      } else if (cordX > closest) {
        if (_side == 1) {
          cordX = Math.abs(closest-cordX) + " inside the " + yardline;
        } else {
          cordX = Math.abs(cordX-closest) + " outside the " + yardline;
        }
      }
      // Front to Back
      if (cordY > 71) {
        cordY = ((cordY - 86)*-1) + " behind of front sideline"
      } else if (cordY > 57) {
        cordY = (cordY - 57) + " in front of front hash"
      } else if (cordY == 57) {
        cordY = "On front hash"
      } else if (cordY == 28) {
        cordY = "On Back Hash"
      } else if ((28 < cordY) && (cordY < 42)) {
        cordY = (cordY - 28) + " in front of back hash"
      } else if (((cordY > 41) && (cordY < 57))) {
        cordY = ((cordY - 57)*-1) + " behind of front hash"
      } else if (cordY < 14) {
        cordY = cordY + 1 + " in front of back sideline"
      } else if (cordY < 28) {
        cordY = ((cordY - 28)*-1) + " behind of back hash"
      }
      if (mode == modes.arc) {
        IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].arcs = IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].arcs + 1;
        _amount = structuredClone(IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].arcs);
      } else if (mode == modes.circle) {
        IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].circles = IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].circles + 1;
        _amount = structuredClone(IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].circles);
      } else if (mode == modes.dot) {
        IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].dots = IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].dots + 1;
        _amount = structuredClone(IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].dots);
      } else if (mode == modes.file) {
        IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].files = IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].files + 1;
        _amount = structuredClone(IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet].files);
      }
      if (mode == modes.circle) {
        conditionMet = false;
        radius = -1;
        while ((conditionMet == false) || radius == null) {
          radius = window.prompt("Radius in Feet: ");
          if (radius == null) {
            conditionMet = null;
          }
          try {
            radius = Number.parseInt(radius);
          } catch {
            alert("Please use numbers only");
          }
          if (Number.isInteger(radius) == true) {
            if ((radius < 91) && (radius > 0)) {
              conditionMet = true;
            } else {
              alert("Radius Must be between 1 and 90");
            }
          }
        }
        if (conditionMet == null) {
        } else {
          circleElement = document.createElement("div");
          circleElement.id = "_CGcirlceElement_" + _amount;
          circleElement.className = "_CGcircleElement";
          circleElement.innerHTML = mode + _amount;
          circleElement.setAttribute("ondrop", 'drop(event);');
          circleElement.setAttribute('ondragover', "allowDrop(event);")
          _circleManagementDivObject = document.getElementById("circleManagementDiv");
          _circleManagementDivObject.appendChild(circleElement);
          IMPORTANT_MASTER_SET_LIST[currentSet].push([_mouseX, _mouseY, _amount, mode + _amount, cordX, cordY, _cell4, mode, [radius], [], "_CGcirlceElement_" + _amount]);
        }
      } else if (mode == modes.dot) {
        marcherElement = document.createElement("div");
        marcherElement.id = "_CGmarcherElement_" + _amount;
        marcherElement.className = "_CGmarcherElement";
        marcherElement.innerHTML = mode + _amount;
        marcherElement.setAttribute("draggable", 'true');
        marcherElement.setAttribute('ondragstart', "drag(event)")
        _marcherManagementDivObject = document.getElementById("marcherManagementDiv");
        _marcherManagementDivObject.appendChild(marcherElement);
        IMPORTANT_MASTER_SET_LIST[currentSet].push([_mouseX, _mouseY, _amount, mode + _amount, cordX, cordY, _cell4, mode, null, null]);
      }
  } else {
    alert("People Can't March On top of each other silly");
  }
}
window.requestAnimationFrame(gameLoop);
function drawVerticalLine(feetfromleg) {
    context.strokeStyle = hashandlinecolor;
    context.lineWidth = (1/1080)*width;
    context.moveTo((feetfromleg/360)*width, 0);
    context.lineTo((feetfromleg/360)*width, height);
}
function drawHorisontalHash(feetfromleft, feetfromtop) {
    context.strokeStyle = hashandlinecolor;
    context.moveTo(((feetfromleft-2)/360)*width, (feetfromtop/360)*width);
    context.lineTo(((feetfromleft+2)/360)*width, (feetfromtop/360)*width);
}
function drawVerticalHash(feetfromleft, feetfromtop) {
    context.strokeStyle = hashandlinecolor;
    context.moveTo(((feetfromleft)/360)*width, ((feetfromtop)/360)*width);
    context.lineTo(((feetfromleft)/360)*width, ((feetfromtop+2)/360)*width);
}
function drawNumbers(feetfromleft, feetfromtop, text_number) {
    context.strokeStyle = hashandlinecolor;
    context.font = (6/360)*width + "px Benton Sans"
    context.fillStyle = hashandlinecolor;
    context.fillText(text_number, ((feetfromleft-3)/360)*width, (feetfromtop/360)*width);
}
function setModeDot() {
  mode = modes.dot;
}
function setModeCircle() {
  mode = modes.circle;
}
function drawPointsOnCircle(_item) {
  // [_mouseX, _mouseY, structuredClone(IMPORTANT_MASTER_SET_LIST[currentSet].length + 2), mode + _amount, cordX, cordY, _cell4, mode, null, null]
  _dpoctemp = new Array();
  _temp_circleManagementDivObject = document.getElementById("_CGcirlceElement_" + _item[2]);
  _temp_circleManagementDivObject_items = _temp_circleManagementDivObject.querySelectorAll(`[class="_CGmarcherElement"]`)
  for (let z = 0; z < _temp_circleManagementDivObject_items.length; z++) {
    _dpoctemp.push(_temp_circleManagementDivObject_items[z].id);
  }
  for (let z = 0; z < _item[9].length; z++) {
    if (_dpoctemp.includes(_item[9][z]) == false) {
      console.log(_item);
      console.log(_item[9][z]);
      console.log(_item[9].pop(z));
    }
  }
  for (let z = 0; z < _item[9].length; z++) {
    context.beginPath();
    // https://math.stackexchange.com/questions/1267646/finding-vertices-of-regular-polygon
    _radius = ((_item[8][0]/360)*width);
    context.arc((Math.cos((z*2*Math.PI)/_item[9].length)*_radius)+_item[0], (Math.sin((z*2*Math.PI)/_item[9].length)*_radius)+_item[1], (1/360)*width, 0, 2 * Math.PI);
    context.stroke();
  }
}
function manageSets() {
  let setInputElement = document.getElementById("SET_INPUT");
  currentSet = setInputElement.value;
  let _MMD = document.getElementById("marcherManagementDiv");
  let _CMD = document.getElementById("circleManagementDiv");
  if (currentSet == _setLastCheck) {
    IMPORTANT_MASTER_HTML_LIST[currentSet] = [structuredClone(_MMD.outerHTML), structuredClone(_CMD.outerHTML)];
  } else {
    if (IMPORTANT_MASTER_HTML_LIST[currentSet] == undefined) {
      IMPORTANT_MASTER_HTML_LIST[currentSet] = ['<div id="marcherManagementDiv" ondrop="drop(event)" ondragover="allowDrop(event)"></div>', '<div id="circleManagementDiv"></div>'];
    }
    if (IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet] == undefined) {
      IMPORTANT_MASTER_FIELD_ELEMENT_AMOUNTS_LIST[currentSet] = {dots: 0, circles: 0, arcs: 0, files: 0};
    }
    _MMD.outerHTML = IMPORTANT_MASTER_HTML_LIST[currentSet][0];
    _CMD.outerHTML = IMPORTANT_MASTER_HTML_LIST[currentSet][1];
  }
  _setLastCheck = currentSet;
}
function manageOptions() {
  let marcherManagementDiv = document.getElementById("marcherManagementDiv");
  let circleManagementDiv = document.getElementById("circleManagementDiv");
  let fieldManagementLabel = document.getElementById("fieldManagementLabel");
  let labelCordStable = document.getElementById("labelCordStable");
  let videosArea = document.getElementById("videosArea");
  if (document.getElementById("_SOM_O").checked) {
    marcherManagementDiv.style.display = "block";
    circleManagementDiv.style.display = "block";
    fieldManagementLabel.style.display = "block";
  } else {
    marcherManagementDiv.style.display = "none";
    circleManagementDiv.style.display = "none";
    fieldManagementLabel.style.display = "none";
  }
  if (document.getElementById("_SOT_O").checked) {
    labelCordStable.style.display = "block";
  } else {
    labelCordStable.style.display = "none";
  }
  if (document.getElementById("_SVA_O").checked) {
    videosArea.style.display = "block";
  } else {
    videosArea.style.display = "none";
  }
}
function manageTable() {
  // let tableObject = document.getElementById("69696");
  // for (let i = 1; 1 < tableObject.rows.length; i++) {
  //   // TODO:
  //   // if row not in IMPORTANT SET LIST delete
  //   // Update Rows
  // }
}
function draw() {
    manageSets();
    manageOptions();
    manageTable();
    width = c.width;
    height = c.height;
    context.clearRect(0, 0, c.width, c.height);
    context.fillStyle = turfColor;
    context.fillRect(0, 0, width, height);
    drawVerticalLine(30);drawVerticalLine(30);drawVerticalLine(45);drawVerticalLine(60);drawVerticalLine(75);drawVerticalLine(90);drawVerticalLine(105);drawVerticalLine(120);drawVerticalLine(135);drawVerticalLine(150);drawVerticalLine(165);drawVerticalLine(180);drawVerticalLine(195);drawVerticalLine(210);drawVerticalLine(225);drawVerticalLine(240);drawVerticalLine(255);drawVerticalLine(270);drawVerticalLine(285);drawVerticalLine(300);drawVerticalLine(315);drawVerticalLine(330);drawVerticalLine(330);drawHorisontalHash(45, (160/3));drawHorisontalHash(60, (160/3));drawHorisontalHash(75, (160/3));drawHorisontalHash(90, (160/3));drawHorisontalHash(105, (160/3));drawHorisontalHash(120, (160/3));drawHorisontalHash(135, (160/3));drawHorisontalHash(150, (160/3));drawHorisontalHash(165, (160/3));drawHorisontalHash(180, (160/3));drawHorisontalHash(195, (160/3));drawHorisontalHash(210, (160/3));drawHorisontalHash(225, (160/3));drawHorisontalHash(240, (160/3));drawHorisontalHash(255, (160/3));drawHorisontalHash(270, (160/3));drawHorisontalHash(285, (160/3));drawHorisontalHash(300, (160/3));drawHorisontalHash(315, (160/3));drawHorisontalHash(45, (320/3));drawHorisontalHash(60, (320/3));drawHorisontalHash(75, (320/3));drawHorisontalHash(90, (320/3));drawHorisontalHash(105, (320/3));drawHorisontalHash(120, (320/3));drawHorisontalHash(135, (320/3));drawHorisontalHash(150, (320/3));drawHorisontalHash(165, (320/3));drawHorisontalHash(180, (320/3));drawHorisontalHash(195, (320/3));drawHorisontalHash(210, (320/3));drawHorisontalHash(225, (320/3));drawHorisontalHash(240, (320/3));drawHorisontalHash(255, (320/3));drawHorisontalHash(270, (320/3));drawHorisontalHash(285, (320/3));drawHorisontalHash(300, (320/3));drawHorisontalHash(315, (320/3));drawVerticalHash(30, (314/3));drawVerticalHash(33, (314/3));drawVerticalHash(36, (314/3));drawVerticalHash(39, (314/3));drawVerticalHash(42, (314/3));drawVerticalHash(45, (314/3));drawVerticalHash(48, (314/3));drawVerticalHash(51, (314/3));drawVerticalHash(54, (314/3));drawVerticalHash(57, (314/3));drawVerticalHash(60, (314/3));drawVerticalHash(63, (314/3));drawVerticalHash(66, (314/3));drawVerticalHash(69, (314/3));drawVerticalHash(72, (314/3));drawVerticalHash(75, (314/3));drawVerticalHash(78, (314/3));drawVerticalHash(81, (314/3));drawVerticalHash(84, (314/3));drawVerticalHash(87, (314/3));drawVerticalHash(90, (314/3));drawVerticalHash(93, (314/3));drawVerticalHash(96, (314/3));drawVerticalHash(99, (314/3));drawVerticalHash(102, (314/3));drawVerticalHash(105, (314/3));drawVerticalHash(108, (314/3));drawVerticalHash(111, (314/3));drawVerticalHash(114, (314/3));drawVerticalHash(117, (314/3));drawVerticalHash(120, (314/3));drawVerticalHash(123, (314/3));drawVerticalHash(126, (314/3));drawVerticalHash(129, (314/3));drawVerticalHash(132, (314/3));drawVerticalHash(135, (314/3));drawVerticalHash(138, (314/3));drawVerticalHash(141, (314/3));drawVerticalHash(144, (314/3));drawVerticalHash(147, (314/3));drawVerticalHash(150, (314/3));drawVerticalHash(153, (314/3));drawVerticalHash(156, (314/3));drawVerticalHash(159, (314/3));drawVerticalHash(162, (314/3));drawVerticalHash(165, (314/3));drawVerticalHash(168, (314/3));drawVerticalHash(171, (314/3));drawVerticalHash(174, (314/3));drawVerticalHash(177, (314/3));drawVerticalHash(180, (314/3));drawVerticalHash(183, (314/3));drawVerticalHash(186, (314/3));drawVerticalHash(189, (314/3));drawVerticalHash(192, (314/3));drawVerticalHash(195, (314/3));drawVerticalHash(198, (314/3));drawVerticalHash(201, (314/3));drawVerticalHash(204, (314/3));drawVerticalHash(207, (314/3));drawVerticalHash(210, (314/3));drawVerticalHash(213, (314/3));drawVerticalHash(216, (314/3));drawVerticalHash(219, (314/3));drawVerticalHash(222, (314/3));drawVerticalHash(225, (314/3));drawVerticalHash(228, (314/3));drawVerticalHash(231, (314/3));drawVerticalHash(234, (314/3));drawVerticalHash(237, (314/3));drawVerticalHash(240, (314/3));drawVerticalHash(243, (314/3));drawVerticalHash(246, (314/3));drawVerticalHash(249, (314/3));drawVerticalHash(252, (314/3));drawVerticalHash(255, (314/3));drawVerticalHash(258, (314/3));drawVerticalHash(261, (314/3));drawVerticalHash(264, (314/3));drawVerticalHash(267, (314/3));drawVerticalHash(270, (314/3));drawVerticalHash(273, (314/3));drawVerticalHash(276, (314/3));drawVerticalHash(279, (314/3));drawVerticalHash(282, (314/3));drawVerticalHash(285, (314/3));drawVerticalHash(288, (314/3));drawVerticalHash(291, (314/3));drawVerticalHash(294, (314/3));drawVerticalHash(297, (314/3));drawVerticalHash(300, (314/3));drawVerticalHash(303, (314/3));drawVerticalHash(306, (314/3));drawVerticalHash(309, (314/3));drawVerticalHash(312, (314/3));drawVerticalHash(315, (314/3));drawVerticalHash(318, (314/3));drawVerticalHash(321, (314/3));drawVerticalHash(324, (314/3));drawVerticalHash(327, (314/3));drawVerticalHash(330, (314/3));drawVerticalHash(30, (160/3));drawVerticalHash(33, (160/3));drawVerticalHash(36, (160/3));drawVerticalHash(39, (160/3));drawVerticalHash(42, (160/3));drawVerticalHash(45, (160/3));drawVerticalHash(48, (160/3));drawVerticalHash(51, (160/3));drawVerticalHash(54, (160/3));drawVerticalHash(57, (160/3));drawVerticalHash(60, (160/3));drawVerticalHash(63, (160/3));drawVerticalHash(66, (160/3));drawVerticalHash(69, (160/3));drawVerticalHash(72, (160/3));drawVerticalHash(75, (160/3));drawVerticalHash(78, (160/3));drawVerticalHash(81, (160/3));drawVerticalHash(84, (160/3));drawVerticalHash(87, (160/3));drawVerticalHash(90, (160/3));drawVerticalHash(93, (160/3));drawVerticalHash(96, (160/3));drawVerticalHash(99, (160/3));drawVerticalHash(102, (160/3));drawVerticalHash(105, (160/3));drawVerticalHash(108, (160/3));drawVerticalHash(111, (160/3));drawVerticalHash(114, (160/3));drawVerticalHash(117, (160/3));drawVerticalHash(120, (160/3));drawVerticalHash(123, (160/3));drawVerticalHash(126, (160/3));drawVerticalHash(129, (160/3));drawVerticalHash(132, (160/3));drawVerticalHash(135, (160/3));drawVerticalHash(138, (160/3));drawVerticalHash(141, (160/3));drawVerticalHash(144, (160/3));drawVerticalHash(147, (160/3));drawVerticalHash(150, (160/3));drawVerticalHash(153, (160/3));drawVerticalHash(156, (160/3));drawVerticalHash(159, (160/3));drawVerticalHash(162, (160/3));drawVerticalHash(165, (160/3));drawVerticalHash(168, (160/3));drawVerticalHash(171, (160/3));drawVerticalHash(174, (160/3));drawVerticalHash(177, (160/3));drawVerticalHash(180, (160/3));drawVerticalHash(183, (160/3));drawVerticalHash(186, (160/3));drawVerticalHash(189, (160/3));drawVerticalHash(192, (160/3));drawVerticalHash(195, (160/3));drawVerticalHash(198, (160/3));drawVerticalHash(201, (160/3));drawVerticalHash(204, (160/3));drawVerticalHash(207, (160/3));drawVerticalHash(210, (160/3));drawVerticalHash(213, (160/3));drawVerticalHash(216, (160/3));drawVerticalHash(219, (160/3));drawVerticalHash(222, (160/3));drawVerticalHash(225, (160/3));drawVerticalHash(228, (160/3));drawVerticalHash(231, (160/3));drawVerticalHash(234, (160/3));drawVerticalHash(237, (160/3));drawVerticalHash(240, (160/3));drawVerticalHash(243, (160/3));drawVerticalHash(246, (160/3));drawVerticalHash(249, (160/3));drawVerticalHash(252, (160/3));drawVerticalHash(255, (160/3));drawVerticalHash(258, (160/3));drawVerticalHash(261, (160/3));drawVerticalHash(264, (160/3));drawVerticalHash(267, (160/3));drawVerticalHash(270, (160/3));drawVerticalHash(273, (160/3));drawVerticalHash(276, (160/3));drawVerticalHash(279, (160/3));drawVerticalHash(282, (160/3));drawVerticalHash(285, (160/3));drawVerticalHash(288, (160/3));drawVerticalHash(291, (160/3));drawVerticalHash(294, (160/3));drawVerticalHash(297, (160/3));drawVerticalHash(300, (160/3));drawVerticalHash(303, (160/3));drawVerticalHash(306, (160/3));drawVerticalHash(309, (160/3));drawVerticalHash(312, (160/3));drawVerticalHash(315, (160/3));drawVerticalHash(318, (160/3));drawVerticalHash(321, (160/3));drawVerticalHash(324, (160/3));drawVerticalHash(327, (160/3));drawVerticalHash(330, (160/3));drawNumbers(60, 133, 10);drawNumbers(90, 133, 20);drawNumbers(120, 133, 30);drawNumbers(150, 133, 40);drawNumbers(180, 133, 50);drawNumbers(210, 133, 40);drawNumbers(240, 133, 30);drawNumbers(270, 133, 20);drawNumbers(300, 133, 10);
    context.stroke();
    if (IMPORTANT_MASTER_SET_LIST[currentSet] == null) {
      IMPORTANT_MASTER_SET_LIST[currentSet] = [];
    }
    for (let i = 0; i < IMPORTANT_MASTER_SET_LIST[currentSet].length; i++) {
        if (IMPORTANT_MASTER_SET_LIST[currentSet][i][10] != false) {
          context.beginPath();
        context.arc(IMPORTANT_MASTER_SET_LIST[currentSet][i][0], IMPORTANT_MASTER_SET_LIST[currentSet][i][1], (1/360)*width, 0, 2 * Math.PI);
        if (IMPORTANT_MASTER_SET_LIST[currentSet][i][7] == modes.dot) {
          context.fillStyle = dotCircleColor;
        } else if (IMPORTANT_MASTER_SET_LIST[currentSet][i][7] == modes.circle) {
          context.fillStyle = circleCircleColor;
        } else if (IMPORTANT_MASTER_SET_LIST[currentSet][i][7] == modes.arc) {
          context.fillStyle = arcCircleColor;
        } else if (IMPORTANT_MASTER_SET_LIST[currentSet][i][7] == modes.file) {
          context.fillStyle = fileCircleColor;
        }
        context.fill();
        if (IMPORTANT_MASTER_SET_LIST[currentSet][i][7] == modes.circle) {
          context.beginPath();
          context.arc(IMPORTANT_MASTER_SET_LIST[currentSet][i][0], IMPORTANT_MASTER_SET_LIST[currentSet][i][1], (IMPORTANT_MASTER_SET_LIST[currentSet][i][8][0]/360)*width, 0, 2 * Math.PI);
          context.stroke();
          drawPointsOnCircle(IMPORTANT_MASTER_SET_LIST[currentSet][i]);
        } else if (IMPORTANT_MASTER_SET_LIST[currentSet][i][7] == modes.arc) {
          alert("Bad Thing Happened");
        } else if (IMPORTANT_MASTER_SET_LIST[currentSet][i][7] == modes.file) {
          alert("Bad Thing Happened");
        }
        }
    }
    context.beginPath();
    context.arc(mouseX, mouseY, (1/360)*width, 0, 2 * Math.PI);
    context.fillStyle = "#FF6A6A";
    context.fill();
}
function gameLoop() {
    draw();
    window.requestAnimationFrame(gameLoop);
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  _element = document.getElementById(data);
  if (ev.target.id.startsWith('_CGmarcherElement') == false) {
    ev.target.appendChild(_element);
    for (let i = 0; i < IMPORTANT_MASTER_SET_LIST[currentSet].length; i++) {
      if (IMPORTANT_MASTER_SET_LIST[currentSet][i][3] == _element.innerHTML) {
        if (ev.target.id.startsWith('marcherManagementDiv')) {
          IMPORTANT_MASTER_SET_LIST[currentSet][i][10] = true;
        } else {
          IMPORTANT_MASTER_SET_LIST[currentSet][i][10] = false;
        }
        
      }
    }
    for (let i = 0; i < IMPORTANT_MASTER_SET_LIST[currentSet].length; i++) {
      if (IMPORTANT_MASTER_SET_LIST[currentSet][i][10] == ev.target.id) {
        IMPORTANT_MASTER_SET_LIST[currentSet][i][9].push(_element.id)
      }
    }
  }
}
function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementById("_body").style.overflow = "hidden";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementById("_body").style.overflow = "";
}
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("_mySlides");
  let dots = document.getElementsByClassName("_dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" _active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " _active";
}