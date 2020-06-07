function formatNumber(num)
{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function GetSortOrder(prop)
{
    return function(a,b)
    {
        if(a[prop]>b[prop])
        return 1;
        else if(a[prop]<b[prop])
        return -1;
        else return 0;

    }
}
function getIndex(code, array)
{
    var i;
    for(i = 0;i<array.length;i++)
    {
        if(array[i].statecode===code)
        {
            return i;
        }
    }
}
$(document).ready(function() {
 
  var deltcon="";
            var deltrec="";
            var deltdea="";
    $.getJSON("https://api.covid19india.org/state_district_wise.json",null, function(data1)
    {
        distJSON = data1;
    });

    $.getJSON("https://api.covid19india.org/data.json", null, function(
      data
    ) {
      document.getElementById("data1").innerHTML = formatNumber(data.statewise[0].confirmed) + '<div style=" font-weight:700; font-size: 1rem; color: grey;">[+' + formatNumber(data.statewise[0].deltaconfirmed) + ']</div>';
      document.getElementById("data2").innerHTML = formatNumber(data.statewise[0].active) + '<div style=" font-weight:700; font-size: 1rem; color: grey;">[+' + formatNumber((data.statewise[0].deltaconfirmed)-(data.statewise[0].deltarecovered)-(data.statewise[0].deltadeaths)) + ']</div>';
      document.getElementById("data3").innerHTML = formatNumber(data.statewise[0].recovered) + '<div style=" font-weight:700; font-size: 1rem; color: grey;">[+' + formatNumber(data.statewise[0].deltarecovered) + ']</div>';
      document.getElementById("data4").innerHTML = formatNumber(data.statewise[0].deaths) + '<div style=" font-weight:700; font-size: 1rem; color: grey;">[+' + formatNumber(data.statewise[0].deltadeaths) + ']</div>';
      document.getElementById("time").innerHTML  = "Last updated on " + data.statewise[0].lastupdatedtime+ '  <i class="far fa-bell"></i>';
      mainObj = data.statewise.sort(GetSortOrder("state"));
      var k = '<tbody>';
      for (i = 0; i < mainObj.length; i++) {
        try{
          if(mainObj[i].state!=="Total"){
            state = mainObj[i].state;
            distdata = distJSON[state]["districtData"];
            var dist = [];
            jQuery.each(distdata, function(i,v)
            {
               dist.push({
                  district: i,
                  confirmed: v.confirmed,
                  recovered: v.recovered,
                  active: v.active,
                  deceased: v.deceased,
                  delta: {
                    confirmed: v.delta.confirmed,
                  recovered: v.delta.recovered,
                  deceased: v.delta.deceased,
                  },
                  
               }); 
            });
            var deltaconfirmed="";
            var deltarecovered="";
            var deltadeaths="";
            if(mainObj[i].deltaconfirmed!=="0")
            {
              deltaconfirmed = mainObj[i].deltaconfirmed + '<i class="fas fa-xs fa-arrow-up"></i>';
            }
            if(mainObj[i].deltarecovered!=="0")
            {
              deltarecovered = mainObj[i].deltarecovered + '<i class="fas fa-xs fa-arrow-up"></i>';
            }
            if(mainObj[i].deltadeaths!=="0")
            {
              deltadeaths = mainObj[i].deltadeaths + '<i class="fas fa-xs fa-arrow-up"></i>';
            }
    // State Data 
    // ---------------------------------
        k += '<tr class="breakrow">';
        k += '<td style="font-weight:700;">' + mainObj[i].state + '</td>';
        k +=
          '<td style="font-size: 1rem; color: grey;font-weight:700;">' +
          formatNumber(mainObj[i].confirmed) + '<span style="font-size: 12px; color: red;font-weight:700;"> ' + deltaconfirmed + '</span>' + 
          '</td>';
        k += '<td style="font-size: 1rem; color: grey;font-weight:700;">' 
        + formatNumber(mainObj[i].active) + '</td>';
        k += '<td style="font-size: 1rem; color: grey;font-weight:700;">' 
        + formatNumber(mainObj[i].recovered) +'<span style="font-size: 12px; color: green;font-weight:700;"> ' + deltarecovered + '</span>' + '</td>';
        k += '<td style="font-size: 1rem; color: grey;font-weight:700;">' 
        + formatNumber(mainObj[i].deaths) +'<span style="font-size: 12px; color: orange;font-weight:700;"> ' + deltadeaths + '</span>' + '</td>';
        k += '</tr>';
    // ----------------------------------

    // District Data
    // ---------------------------------- 
    k += '<tr class="table-active" style="display: none;">';
        k += '<td style="font-weight:700;">' + 'Districts' + '</td>';
        k +=
          '<td style="font-size: 1rem; color: red;font-weight:700;">' +
          'Confirmed' +
          '</td>';
        k += '<td style="font-size: 1rem; color: #0779e4;font-weight:700;">' + 'Active' + '</td>';
        k += '<td style="font-size: 1rem; color: green;font-weight:700;">' + 'Recovered' + '</td>';
        k += '<td style="font-size: 1rem; color: orange;font-weight:700;">' + 'Death' + '</td>';
        k += '</tr>';
        jQuery.each(dist, function(i,v)
        {
           deltcon="";
             deltrec="";
             deltdea="";
            if(v.delta.confirmed!==0)
            {
              deltcon =  v.delta.confirmed + '<i class="fas fa-xs fa-arrow-up"></i>';
            }
            if(v.delta.recovered!==0)
            {
              deltrec =  v.delta.recovered+ '<i class="fas fa-xs fa-arrow-up"></i>';
            }
            if(v.delta.deceased!==0)
            {
              deltdea =  v.delta.deceased + '<i class="fas fa-xs fa-arrow-up"></i>';
            }
            k += '<tr class="table-active" style="display: none;">';
        k += '<td style="font-weight:700;">' + v.district + '</td>';
        k +=
          '<td style="font-size: 1rem; color: grey;font-weight:700;">' +
          formatNumber(v.confirmed)  + '<span style="font-size: 12px; color: red;font-weight:700;"> ' + deltcon + '</span>'
          '</td>';
        k += '<td style="font-size: 1rem; color: grey;font-weight:700;">' 
        + formatNumber(v.active) + '</td>';
        k += '<td style="font-size: 1rem; color: grey;font-weight:700;">' 
        + formatNumber(v.recovered) + '<span style="font-size: 12px; color: green;font-weight:700;"> ' + deltrec + '</span>' + '</td>';
        k += '<td style="font-size: 1rem; color: grey;font-weight:700;">' 
        + formatNumber(v.deceased) + '<span style="font-size: 12px; color: orange;font-weight:700;"> ' + deltdea + '</span>'+ '</td>';
        k += '</tr>';
        });
     // ----------------------------------
      }
        }
        catch
        {
          break;
        }
      }
      k += '</tbody>';
      document.getElementById("tabledata").innerHTML = k;
    });
  });

  