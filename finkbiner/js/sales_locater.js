var svg_map = document.getElementsByTagName('svg_map');

svg_map.addEventListener("load", function(){
    var svgDoc = svg_map.contentDocument;

    var g = svgDoc.getElementsByTagName("g");
    for(var i = 0; i < g.length; i++){
        if(g[i].id != 'text_boxes' && g[i].id != 'sales_data'){
            g[i].style.fontSize = '12px';
            g[i].style.fillRule = 'nonzero';
            g[i].style.stroke = '#000000';
            g[i].style.strokeWidth = '0.51889181';
            g[i].style.strokeLinecap = 'butt';
            g[i].style.strokeLinejoin = 'bevel';
            g[i].style.strokeMiterlimit = '4';
            g[i].style.strokeDasharray = 'none';
            g[i].style.strokeOpacity = '1';
            g[i].style.markerStart = 'none';
            g[i].style.position = 'relative';
            g[i].style.zIndex = '999';
            g[i].style.fill = '#994C4F';

        }
    }
    var counties = svgDoc.getElementsByTagName('path');

    for(var i =0; i < counties.length; i++){
        addText(counties[i], counties[i].getAttribute('label'), counties[i].id);

        counties[i].setAttribute('active', 'false');
        counties[i].onmouseover = function() {

            showCounty(this.id);
            this.style.fill = '#3F337F';
            this.addEventListener('click', function(){
                this.setAttribute('active', 'true');
                this.style.fill = '#3F337F';
                mouseClick(this.id, svgDoc);
                showSales(this.id);
            });
        };
        counties[i].onmouseout = function() {
            this.style.fill = '#994c4f';
            hideCounty(this.id);
        };
    }
}, false);


function mouseClick(id, doc){
    var counties = doc.getElementsByTagName('path');
    for(var i =0; i < counties.length; i++){
        counties[i].style.fill = '#994C4F';
        var is_clicked = counties[i].getAttribute('active');

        if(is_clicked === 'false'){
            console.log(is_clicked);
            mouseOut(counties[i]);
        } else {
            isActive(counties[i]);
            counties[i].setAttribute('active', 'false');
        }
    }
    var county = doc.getElementById(id);
    county.style.fill = "#3F337F";
}
function mouseOut(county){
    county.onmouseout = function(){
        this.style.fill = '#994c4f';
        hideCounty(this.id);
    };
}
function isActive(county){
    county.onmouseout = function(){
        this.style.fill = '#3F337F';
        hideCounty(this.id);
    };
}
function showCounty(label){
    var svgDoc = svg_map.contentDocument;
    var text = svgDoc.getElementById(label + '_text');
    var rect = svgDoc.getElementById(label + '_rect');
    text.style.display = 'block';
    rect.style.display = 'block';
}
function hideCounty(label){
    var svgDoc = svg_map.contentDocument;
    var text = svgDoc.getElementById(label + '_text');
    var rect = svgDoc.getElementById(label + '_rect');
    // console.log(text);
    text.style.display = 'none';
    rect.style.display = 'none';
}

function addText(p, label, id) {
    var svgDoc = svg_map.contentDocument;
    var text_boxes = svgDoc.getElementById("text_boxes");

    var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var b = p.getBBox();
    // console.log(b);
    t.setAttribute("transform", "translate(" + (b.x + b.width/999) + " " + (b.y + b.height/10) + ")");
    t.id = id + '_text';
    // t.textContent = p.parentNode.id;
    t.textContent = label;
    t.setAttribute('fill', 'white');
    t.style.display = 'none';
    t.setAttribute('x', -45);
    t.setAttribute('y', -15);
    t.style.cursor = 'default';
    text_boxes.appendChild(t);

    var text = t.textContent;
    var new_width = text.length * 13;
    // console.log(new_width);

    // var tb = t.getBBox();
    // console.log(tb);
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("transform", "translate(" + (b.x + b.width/999) + " " + (b.y + b.height/10) + ")");
    rect.id = id + '_rect';
    rect.setAttribute('x',  -60);
    rect.setAttribute('y', - 30);
    rect.setAttribute('width', new_width);
    rect.setAttribute('height', 20);
    rect.setAttribute('fill', 'black');
    rect.style.display = 'none';
    text_boxes.insertBefore(rect, t);
    // console.log(SVGRect);
}

function showSales(id){
    // console.log(sales_data);
    // console.log(id);
    var doc = svg_map.ownerDocument;
    var sales_data = [
      {
        "region": {
          "region": "region_1",
          "counties": [
            "Ford_il",
            "Livingston_il",
            "Iriquois_il",
            "Kanakakee_il",
            "Will_il",
            "Cook_il",
            "Lake_in",
            "Porter_in",
            "LaPorte_in"
          ],
          "state": [
            "Illinois",
            "Indiana"
          ],
          "sales_person": [
            {
              "name": "Jerry Joynt",
              "title": "Territory Sales Represntative",
              "office_phone": "8003070221",
              "mobile_phone": "8156416059",
              "email": "jjoynt@finkbinerequipment.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_2",
          "counties": [
            "McHenry_il",
            "Lake_il",
            "Cook_il"
          ],
          "state": [
            "Illinois"
          ],
          "sales_person": [
            {
              "name": "Chuck Rhodes",
              "title": "Territory Sales Represntative",
              "office_phone": "8003070221",
              "mobile_phone": "6303037575",
              "email": "crhodes@finkbinerequipment.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_3",
          "counties": [
            "DuPage_il",
            "Cook_il"
          ],
          "state": [
            "Illinois"
          ],
          "sales_person": [
            {
              "name": "Andy Bazan",
              "title": "Territory Sales Represntative",
              "office_phone": "8003070221",
              "mobile_phone": "6302158556",
              "email": "abazan@finkbinerequipment.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_4",
          "counties": [
            "Will_il",
            "Ford_il",
            "Livingston_il",
            "Iriquois_il",
            "Jo_Daviess_il",
            "Stephenson_il",
            "Winnebago_il",
            "Boone_il",
            "Carroll_il",
            "Ogle_il",
            "DeKalb_il",
            "Kane_il",
            "Whiteside_il",
            "Lee_il",
            "Rok_Island_il",
            "Henry_il",
            "Bureau_il",
            "La_Salle_il",
            "Kendall_il",
            "Grundy_il",
            "Mercer_il",
            "Stark_il",
            "Putnam_il"
          ],
          "state": [
            "Illinois"
          ],
          "sales_person": [
            {
              "name": "Dan Buck",
              "title": "Territory Sales Represntative",
              "office_phone": "8003070221",
              "mobile_phone": "6304428708",
              "email": "dbuck@finkbinerequipment.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_5",
          "counties": [
            "Henderson_il",
            "Warren_il",
            "Knox_il",
            "Marshall_il",
            "Woodford_il",
            "Peoria_il",
            "Hancock_il",
            "McDonough_il",
            "McLean_il",
            "Tazwell_il",
            "Schuyler_il",
            "Mason_il",
            "Logan_il",
            "DeWitt_il",
            "Platt_il",
            "Champaign_il",
            "Vermillion_il",
            "Macon_il",
            "Menard_il",
            "Sangamon_il",
            "Cass_il",
            "Morgan_il",
            "Brown_il",
            "Adams_il",
            "Pike_il",
            "Scott_il",
            "Christian_il",
            "Moultrie_il",
            "Edgar_il",
            "Morgan_il"
          ],
          "state": [
            "Illinois"
          ],
          "sales_person": [
            {
              "name": "Clyde Robison",
              "title": "Territory Sales Representative",
              "office_phone": "8003070221",
              "mobile_phone": "3096965237",
              "email": "crobison@finkbinerequipment.com"
            }
          ]
        }
      },
        {
            "region": {
                "region": "region_6",
                "counties": [
                    "Crawford_il",
                    "Jasper_il",
                    "Effingham_il",
                    "Fayette_il",
                    "Bond_il",
                    "Madison_il",
                    "St_Clair_il",
                    "Clinton_il",
                    "Marion_il",
                    "Clay_il",
                    "Richland_il",
                    "Lawrence_il",
                    "Wabash_il",
                    "Edwards_il",
                    "Wayne_il",
                    "Jefferson_il",
                    "Washington_il",
                    "Monroe_il",
                    "Randolph_il",
                    "Perry_il",
                    "Franklin_il",
                    "Hamilton_il",
                    "White_il",
                    "Jackson_il",
                    "Williamson_il",
                    "Saline_il",
                    "Gallatin_il",
                    "Union_il",
                    "Johnson_il",
                    "Pope_il",
                    "Hardin_il",
                    "Alexander_il",
                    "Pulaski_il",
                    "Massac_il"
                ],
                "state": [
                    "Illinois"
                ],
                "sales_person": [
                    {
                        "name": "Jason Zeibert",
                        "title": "President",
                        "office_phone": "8003070221",
                        "mobile_phone": "6306018359",
                        "email": "jzeibert@finkbinerequipment.com"
                    }
                ]
            }
        }
    ];
    if(doc.getElementById("sales_box")){
        var item = doc.getElementById("sales_box");
        item.parentNode.removeChild(item);
    }
    var i;
    var sales_arr = [];
    var multiple = false;
    for(i = 0; i < sales_data.length; i++) {
        if(sales_data[i].region.counties.indexOf(id) != -1){
            sales_arr.push(sales_data[i].region.sales_person[0]);
        }
    }
    console.log(sales_arr);
    if(sales_arr.length > 1){
        multiple = true;
    }

    MessageBox(sales_arr, multiple);
}

function MessageBox(msg, is_multiple) {
    var svgDoc = svg_map.contentDocument;
    var sd1 = svgDoc.getElementById("sales_data_1");
    sd1.style.visibility = 'visible';

    if(is_multiple){
        var sd2 = svgDoc.getElementById("sales_data_2");
        sd2.style.visibility = 'visible';
        var sd3 = svgDoc.getElementById("sales_data_3");
        sd3.style.visibility = 'visible';
    } else {
        var sd2 = svgDoc.getElementById("sales_data_2");
        sd2.style.visibility = 'hidden';
        var sd3 = svgDoc.getElementById("sales_data_3");
        sd3.style.visibility = 'hidden';
    }


    var tspan1 = svgDoc.getElementById('tspan1');
    tspan1.textContent = msg[0].name;
    var tspan2 = svgDoc.getElementById('tspan2');
    tspan2.textContent = msg[0].title;
    var tspan3a = svgDoc.getElementById('tspan3a');
    tspan3a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "tel:1"+msg[0].office_phone);
    var tspan3 = svgDoc.getElementById('tspan3');
    var office_phone = phonePipe(msg[0].office_phone);
    tspan3.textContent = "Office Phone: "+office_phone;
    var tspan4a = svgDoc.getElementById('tspan4a');
    tspan4a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "tel:1"+msg[0].mobile_phone);
    var tspan4 = svgDoc.getElementById('tspan4');
    var mobile_phone = phonePipe(msg[0].mobile_phone);
    tspan4.textContent = "Mobile Phone: "+mobile_phone;
    var tspan5a = svgDoc.getElementById('tspan5a');
    tspan5a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "mailto:"+msg[0].email);
    var tspan5 = svgDoc.getElementById('tspan5');
    tspan5.textContent = "E-Mail Address: "+msg[0].email;

    if(is_multiple) {
        var tspan6 = svgDoc.getElementById('tspan6');
        tspan6.textContent = msg[1].name;
        var tspan7 = svgDoc.getElementById('tspan7');
        tspan7.textContent = msg[1].title;
        var tspan8a = svgDoc.getElementById('tspan8a');
        tspan8a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "tel:1" + msg[1].office_phone);
        var tspan8 = svgDoc.getElementById('tspan8');
        var office_phone = phonePipe(msg[1].office_phone);
        tspan8.textContent = "Office Phone: " + office_phone;
        var tspan9a = svgDoc.getElementById('tspan9a');
        tspan9a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "tel:1" + msg[1].mobile_phone);
        var tspan9 = svgDoc.getElementById('tspan9');
        var mobile_phone = phonePipe(msg[1].mobile_phone);
        tspan9.textContent = "Mobile Phone: " + mobile_phone;
        var tspan10a = svgDoc.getElementById('tspan10a');
        tspan10a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "mailto:" + msg[1].email);
        var tspan10 = svgDoc.getElementById('tspan10');
        tspan10.textContent = "E-Mail Address: " + msg[1].email;
    }

}
function phonePipe(value){
    var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(regexObj.test(value)){
        var parts = value.match(regexObj);
        var phone = '';
        if (parts[1]) { phone += "(" + parts[1] + ") "; }
        phone += parts[2] + "-" + parts[3];
        return phone;
    } else {
        return value;
    }
}
