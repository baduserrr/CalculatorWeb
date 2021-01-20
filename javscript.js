$('#namesv').val('Asbun\nBadu\nMalkovich\nPutin\nBambamng\nMangkir\nBirat')

function Counting() {
  var namelist = document.getElementById('namesv').value.trim().split('\n');
  var cleannames = namelist.filter(function(el) { return el; });
  var maxname = cleannames.length

  var ppl = $('#peoplev').val();
  var grp = $('#groupv').val();
  if (maxname >= ppl) {
    if (ppl > 1) {
      if (grp > 1) {
        var grplim = Math.round(namelist.length / grp)
        alert(namelist.length / grp)
        var grppool = []
        for (var x = 1; x <= grp; x++) {
          var namepool = []
          console.log(x);
          for (var b = grplim-1; b >= 0; b--) {
            console.log("team " + b + " " + grplim);
            var rand = Math.floor(Math.random()*cleannames.length);
            var pickedname = cleannames[rand]
            namepool.push(pickedname);
            cleannames.splice(rand, 1);
            console.log(cleannames);
          }
          if (grplim > cleannames.length) {
            grplim = maxname - grplim
          } else if ((grplim*grp) < cleannames.length) {
            var rand = Math.floor(Math.random()*cleannames.length);
            console.log('sisa cleannames' + x + grp + cleannames);
            var pickedname = cleannames[rand];
            namepool.push(pickedname);
          }
          console.log(namepool);
          grppool[x] = namepool
          console.log("Ini Team " + x + " " + grppool[x]);
        }
      } else {
        var namepool = []
        for (var i = ppl-1; i >= 0; i--) {
          var rand = Math.floor(Math.random()*cleannames.length);
          var pickedname = cleannames[rand]
          namepool.push(pickedname)
          cleannames.splice(rand, 1);
          console.log(cleannames);
          console.log(namepool);
          document.getElementById('ResultBox').value = namepool.join('\n');
        }
      }
    } else {
      var rand = Math.floor(Math.random()*cleannames.length);
      var pickedname = cleannames[rand]
      document.getElementById('ResultBox').value = pickedname;
    }
  } else {
    alert("dude, pls count, okay!")
  }
}
