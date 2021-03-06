var svg_map = document.getElementById('svg_map');

svg_map.addEventListener("load", function(){
    var svgDoc = svg_map.contentDocument;
    var regions = [
        {
            region: 'region_1',
            fill_color: '#994C4F',
            alt_color: '#433399'
        },
        {
            region: 'region_2',
            fill_color: '#993336',
            alt_color: '#584C99'
        },
        {
            region: 'region_3',
            fill_color: '#B26668',
            alt_color: '#5C4CB2'
        },
        {
            region: 'region_4',
            fill_color: '#E57F82',
            alt_color: '#8F7FE5'
        },
        {
            region: 'region_5',
            fill_color: '#B24C4f',
            alt_color: '#7266B2'
        },
        {
            region: 'region_6',
            fill_color: '#CC7F82',
            alt_color: '#8B7FCC'
        },
        {
            region: 'region_7',
            fill_color: '#CC6669',
            alt_color: '#7666CC'
        },
        {
            region: 'region_8',
            fill_color: '#FFB2B5',
            alt_color: '#BEB2FF'
        },
        {
            region: 'region_9',
            fill_color: '#E5999B',
            alt_color: '#A599E5'
        },
        {
            region: 'region_10',
            fill_color: '#FF999C',
            alt_color: '#A999FF'
        },
        {
            region: 'region_11',
            fill_color: '#7F191C',
            alt_color: '#29197F'
        },
        {
            region: 'region_12',
            fill_color: '#66191C',
            alt_color: '#251966'
        },
        {
            region: 'region_13',
            fill_color: '#7F3335',
            alt_color: '#3F337F'
        }
    ];

    var g = svgDoc.getElementsByTagName("g");
    for(var i = 0; i < g.length; i++){
        if(g[i].id != 'text_boxes' && g[i].id != 'sales_data' && g[i].id != 'sales_data_2'){
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
            g[i].style.fill = regions[i].fill_color;
            g[i].onmouseover = function() {
                mouseOver(this.id, svgDoc, regions);
            };
            g[i].onmouseout = function() {
                mouseOut(this.id, svgDoc, regions);
            };
            g[i].addEventListener('click', function(){
                showSales(this.id);
            });
        }
    }
    var counties = svgDoc.getElementsByTagName('path');
    for(var i =0; i < counties.length; i++){
        addText(counties[i], counties[i].getAttribute('label'), counties[i].id);
        counties[i].onmouseover = function() {
            showCounty(this.id);
        };
        counties[i].onmouseout = function() {
            hideCounty(this.id);
        };

    }
}, false);


function mouseOver(id, doc, regions){
    switch(id){
        default:
            for(var i = 0; i < regions.length; i++){
                var region = doc.getElementById(id);
                if(id === regions[i].region){
                    region.style.fill = regions[i].alt_color;
                }
            }
            break;
    }
}
function mouseOut(id, doc, regions){
    // console.log(id);
    switch(id){
        default:
            for(var i = 0; i < regions.length; i++){
                var region = doc.getElementById(id);
                if(id === regions[i].region){
                    region.style.fill = regions[i].fill_color;
                }
            }
            break;
    }
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
    t.setAttribute('x', 0);
    t.setAttribute('y', -15);
    t.style.cursor = 'default';
    text_boxes.appendChild(t);

    var text = t.textContent;
    var new_width = text.length * 13;
    // console.log(new_width);

    var tb = t.getBBox();
    // console.log(tb);
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("transform", "translate(" + (b.x + b.width/999) + " " + (b.y + b.height/10) + ")");
    rect.id = id + '_rect';
    rect.setAttribute('x', tb.x - 15);
    rect.setAttribute('y', tb.y - 30);
    rect.setAttribute('width', tb.width + new_width);
    rect.setAttribute('height', tb.width + 20);
    rect.setAttribute('fill', 'black');
    rect.style.display = 'none';
    text_boxes.insertBefore(rect, t);
    // console.log(SVGRect);
}
function showSales(id){
    // console.log(sales_data);
    // console.log(id);
    var all_data = [
      {
        "region": {
          "region": "region_1",
          "counties": [
            "Kenosha_wi",
            "Racine_wi",
            "Milwaukee_wi",
            "Ozaukee_wi",
            "Sheboygan_wi",
            "Washington_wi"
          ],
          "state": [
            "Wisconsin"
          ],
          "sales_person": [
            {
              "name": "Ben Stanish",
              "title": "Territory Sales Representative",
              "office_phone": "8002366900",
              "mobile_phone": "4142175943",
              "email": "bens@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_2",
          "counties": [
            "Dodge_wi",
            "Jefferson_wi",
            "Rock_wi",
            "Walworth_wi",
            "Waukesha_wi"
          ],
          "state": [
            "Wisconsin"
          ],
          "sales_person": [
            {
              "name": "Jeff Murawski",
              "title": "Territory Sales Representative",
              "office_phone": "8002366900",
              "mobile_phone": "2629395070",
              "email": "jmurawski@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_3",
          "counties": [
            "Columbia_wi",
            "Crawford_wi",
            "Dane_wi",
            "Grant_wi",
            "Green_wi",
            "Iowa_wi",
            "Juneau_wi",
            "La_Crosse_wi",
            "Lafayette_wi",
            "Monroe_wi",
            "Richland_wi",
            "Sauk_wi",
            "Vernon_wi"
          ],
          "state": [
            "Wisconsin"
          ],
          "sales_person": [
            {
              "name": "Andy brocker",
              "title": "Territory Sales Representative",
              "office_phone": "8002366900",
              "mobile_phone": "6082251878",
              "email": "abrocker@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_4",
          "counties": [
            "Barron_wi",
            "Buffalo_wi",
            "Chippewa_wi",
            "Dunn_wi",
            "Eau_Claire_wi",
            "Jackson_wi",
            "Pepin_wi",
            "Pierce_wi",
            "Polk_wi",
            "St_Croix_wi",
            "Trempeleau_wi"
          ],
          "state": [
            "Wisconsin"
          ],
          "sales_person": [
            {
              "name": "Lanny Peterson",
              "title": "Territory Sales Representative",
              "office_phone": "8002427113",
              "mobile_phone": "7155748089",
              "email": "lpeterson@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_5",
          "counties": [
            "Adams_wi",
            "Calumet_wi",
            "Door_wi",
            "Fond_du_Lac_wi",
            "Green_Lake_wi",
            "Kewaunee_wi",
            "Manitowoc_wi",
            "Marquette_wi",
            "Outagamie_wi",
            "Shawano_wi",
            "Waupaca_wi",
            "Waushara_wi",
            "Winnebago_wi"
          ],
          "state": [
            "Wisconsin"
          ],
          "sales_person": [
            {
              "name": "Brian Knute",
              "title": "Territory Sales Representative",
              "office_phone": "8002366900",
              "mobile_phone": "9208587905",
              "email": "bknute@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_6",
          "counties": [
            "Clark_wi",
            "Langlade_wi",
            "Lincoln_wi",
            "Marathon_wi",
            "Oneida_wi",
            "Portage_wi",
            "Price_wi",
            "Rusk_wi",
            "Sawyer_wi",
            "Taylor_wi",
            "Wood_wi"

          ],
          "state": [
            "Wisconsin"
          ],
          "sales_person": [
            {
              "name": "John Oberthaler",
              "title": "Territory Sales Representative",
              "office_phone": "8002427113",
              "mobile_phone": "7155708772",
              "email": "joberthaler@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_7",
          "counties": [
            "Brown_wi",
            "Florence_wi",
            "Forest_wi",
            "Marinette_wi",
            "Menominee_wi",
            "Oconto_wi",
            "Vilas_wi",
            "Alger_mi",
            "Baraga_mi",
            "Chippewa_mi",
            "Delta_mi",
            "Dickinson_mi",
            "Houghton_mi",
            "Iron_mi",
            "Keweenaw_mi",
            "Luce_mi",
            "Mackinac_mi",
            "Marquette_mi",
            "Menominee_mi",
            "Ontonagon_mi",
            "Schoolcraft_mi"
          ],
          "state": [
            "Wisconsin",
            "Michigan"
          ],
          "sales_person": [
            {
              "name": "Bob Brouillard",
              "title": "Territory Sales Represntative",
              "office_phone": "8002368318",
              "mobile_phone": "9208507905",
              "email": "bbrouillard@amsatte.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_8",
          "counties": [
            "Ashland_wi",
            "Bayfield_wi",
            "Burnett_wi",
            "Douglas_wi",
            "Iron_wi",
            "Washburn_wi",
            "Gogebic_mi",
            "Aitkin_mn",
            "Becker_mn",
            "Beltrami_mn",
            "Carlton_mn",
            "Cass_mn",
            "Clay_mn",
            "Clearwater_mn",
            "Cook_mn",
            "Crow_Wing_mn",
            "Douglas_mn",
            "Grant_mn",
            "Hubbard_mn",
            "Itasca_mn",
            "Kanabec_mn",
            "Kittson_mn",
            "Koochicing_mn",
            "Lake_mn",
            "Lake_of_the_Woods_mn",
            "Mahnomen_mn",
            "Marshall_mn",
            "Morrison_mn",
            "Norman_mn",
            "Otter_Tail_mn",
            "Pennington_mn",
            "Pine_mn",
            "Polk_mn",
            "Red_Lake_mn",
            "Roseau_mn",
            "St_Louis_mn",
            "Stevens_mn",
            "Todd_mn",
            "Wadena_mn",
            "Wilkin_mn"
          ],
          "state": [
            "Wisconsin",
            "Minnesota",
            "Michigan"
          ],
          "sales_person": [
            {
              "name": "Steve Laine",
              "title": "Territory Sales Represntative",
              "office_phone": "8002366900",
              "mobile_phone": "2182600581",
              "email": "slaine@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_9",
          "counties": [
            "Anoka_mn",
            "Benton_mn",
            "Blue_Earth_mn",
            "Carver_mn",
            "Chisago_mn",
            "Dakota_mn",
            "Fillmore_mn",
            "Freeborn_mn",
            "Goodhue_mn",
            "Hennepin_mn",
            "Houston_mn",
            "Isanti_mn",
            "Le_Sueur_mn",
            "McLeod_mn",
            "Mille_Lacs_mn",
            "Mower_mn",
            "Olmsted_mn",
            "Pope_mn",
            "Ramsey_mn",
            "Rice_mn",
            "Scott_mn",
            "Sherburne_mn",
            "Sibley_mn",
            "Stearns_mn",
            "Wabasha_mn",
            "Waseca_mn",
            "Washington_mn",
            "Winona_mn",
            "Wright_mn"
          ],
          "state": [
            "Minnesota"
          ],
          "sales_person": [
            {
              "name": "John Schemmel",
              "title": "Territory Sales Represntative",
              "office_phone": "8002366900",
              "mobile_phone": "6128496332",
              "email": "jschemmel@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_10",
          "counties": [
            "Big_Stone_mn",
            "Brown_mn",
            "Chippewa_mn",
            "Cottonwood_mn",
            "Faribault_mn",
            "Jackson_mn",
            "Kandiyohi_mn",
            "Lac_Qui_Parle_mn",
            "Lincoln_mn",
            "Lyon_mn",
            "Martin_mn",
            "Meeker_mn",
            "Murray_mn",
            "Nicollet_mn",
            "Nobles_mn",
            "Pipestone_mn",
            "Pope_mn",
            "Redwood_mn",
            "Renville_mn",
            "Rock_mn",
            "Stevens_mn",
            "Swift_mn",
            "Traverse_mn",
            "Watonwan_mn",
            "Yellow_Medicine_mn"
          ],
          "state": [
            "Minnesota"
          ],
          "sales_person": [
            {
              "name": "Darren Reddekopp",
              "title": "Vice President - Business Development",
              "office_phone": "8002366900",
              "mobile_phone": "6123822847",
              "email": "dreddekopp@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_11",
          "counties": [
            "All_counties"
          ],
          "state": [
            "Indiana"
          ],
          "sales_person": [
            {
              "name": "James Drought",
              "title": "Senior Vice President",
              "office_phone": "8002366900",
              "mobile_phone": "4143229362",
              "email": "jdrought@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_12",
          "counties": [
            "All_counties"
          ],
          "state": [
            "Michigan"
            ],
          "sales_person": [
            {
              "name": "James Drought",
              "title": "Senior Vice President",
              "office_phone": "8002366900",
              "mobile_phone": "4143229362",
              "email": "jdrought@amstate.com"
            }
          ]
        }
      },
      {
        "region": {
          "region": "region_13",
          "counties": [
            "All_counties"
          ],
          "state": [
            "Illinois"
          ],
          "sales_person": [
            {
              "name": "James Drought Not",
              "title": "Senior Vice President",
              "office_phone": "8002366900",
              "mobile_phone": "4143229362",
              "email": "jdrought@amstate.com"
            }
          ]
        }
      }
    ];
    var doc = svg_map.ownerDocument;
    if(doc.getElementById("sales_box")){
        var item = doc.getElementById("sales_box");
        item.parentNode.removeChild(item);
    }
    var i;
    var msg;
    for(i = 0; i < all_data.length; i++) {
        // console.log(sales_data[i].region.region);
        if(all_data[i].region.region === id){
            msg = all_data[i].region.sales_person[0];
            rgn = all_data[i].region.region;
            MessageBox(msg, rgn);
        }
    }
}

function MessageBox(msg, rgn) {
    var svgDoc = svg_map.contentDocument;
    var sd = svgDoc.getElementById("sales_data");
    sd.style.visibility = 'visible';
    console.log(rgn);
    if(rgn === 'region_11'){
        var sd2 = svgDoc.getElementById("sales_data_2");
        sd2.style.visibility = 'visible';
    } else {
        var sd2 = svgDoc.getElementById("sales_data_2");
        sd2.style.visibility = 'hidden';
    }

    var tspan1 = svgDoc.getElementById('tspan1');
    tspan1.textContent = msg.name;
    var tspan2 = svgDoc.getElementById('tspan2');
    tspan2.textContent = msg.title;
    var tspan3a = svgDoc.getElementById('tspan3a');
    tspan3a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "tel:1"+msg.office_phone);
    var tspan3 = svgDoc.getElementById('tspan3');
    var office_phone = phonePipe(msg.office_phone);
    tspan3.textContent = "Office Phone: "+office_phone;
    var tspan4a = svgDoc.getElementById('tspan4a');
    tspan4a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "tel:1"+msg.mobile_phone);
    var tspan4 = svgDoc.getElementById('tspan4');
    var mobile_phone = phonePipe(msg.mobile_phone);
    tspan4.textContent = "Mobile Phone: "+mobile_phone;
    var tspan5a = svgDoc.getElementById('tspan5a');
    tspan5a.setAttributeNS("http://www.w3.org/1999/xlink", "href", "mailto:"+msg.email);
    var tspan5 = svgDoc.getElementById('tspan5');
    tspan5.textContent = "E-Mail Address: "+msg.email;

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
