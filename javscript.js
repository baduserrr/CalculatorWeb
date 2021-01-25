//=+==+===+====+===+==+= Name Picker =+==+===+====+===+==+=

// $('#namesv').val('Asbun\nBadu\nMalkovich\nPutin\nBambamng\nMangkir\nBirat\nManjula\nArchie\nEmmalyn\nAldona\nKısmet\nPrzemysł\nJemima\nCarina')

function NP_clipboard_copy() {
  var copyTextarea = document.createElement('input');
  copyText = (document.getElementById('ResultBox').innerText);
  copyTextarea.value = copyText
  document.body.appendChild(copyTextarea);
  // console.lo_g(copyTextarea);
  copyTextarea.select();
  copyTextarea.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.body.removeChild(copyTextarea);
}

function NP_alert_show() {
  $('.toast').toast('show');
}

// For winner picker
$('#group_ck').on('change', function() {
  if (document.getElementById('group_ck').checked) {
    document.getElementById('uneven_ck').disabled = false
    document.getElementById('def_opt').style.display = 'block'
    document.getElementById('win_opt').style.display = 'none'
    document.getElementById('uneven_opt').style.display = 'none'
  } else {
    document.getElementById('def_opt').style.display = 'none'
    document.getElementById('uneven_ck').disabled = true
    if (document.getElementById('uneven_ck').checked) {
      document.getElementById('uneven_ck').checked = false
      document.getElementById('win_opt').style.display = 'block'
      document.getElementById('uneven_opt').style.display = 'none'
    } else {
      document.getElementById('win_opt').style.display = 'block'
      document.getElementById('uneven_opt').style.display = 'none'
    }
  }
});

// For group splitter
$('#group_rd').on('change', function() {
  if (document.getElementById('group_rd').checked) {
    document.getElementById('groupv').disabled = false
    document.getElementById('people_rd').checked = false
    document.getElementById('peoplev').disabled = true
    document.getElementById('peoplev').value = ""
  } else {
    document.getElementById('groupv').disabled = true
    document.getElementById('people_rd').checked = true
    document.getElementById('peoplev').disabled = false
    document.getElementById('groupv').value = ""
  }
});
// For group splitter
$('#people_rd').on('change', function() {
  if (document.getElementById('people_rd').checked) {
    document.getElementById('groupv').disabled = true
    document.getElementById('group_rd').checked = false
    document.getElementById('peoplev').disabled = false
    document.getElementById('groupv').value = ""
  } else {
    document.getElementById('groupv').disabled = false
    document.getElementById('group_rd').checked = true
    document.getElementById('peoplev').disabled = true
    document.getElementById('peoplev').value = ""
  }
});

// For uneven groups
$('#uneven_ck').on('change', function() {
  if (document.getElementById('uneven_ck').checked) {
    NP_generate_input()
    document.getElementById('uneven_opt').style.display = 'block'
    document.getElementById('def_opt').style.display = 'none'
    document.getElementById('win_opt').style.display = 'none'
  } else {
    NP_remove_input();
    document.getElementById('uneven_opt').style.display = 'none'
    if (document.getElementById('group_ck').checked) {
      document.getElementById('def_opt').style.display = 'block'
      document.getElementById('win_opt').style.display = 'none'
    } else {
      document.getElementById('def_opt').style.display = 'none'
      document.getElementById('win_opt').style.display = 'block'
    }
  }
});

$('#uneven_grp').on('change', function() {
  document.getElementById('groupv').value = document.getElementById('uneven_grp').value
  NP_remove_input()
  NP_generate_input()
});

$('#groupv').on('change', function() {
  document.getElementById('uneven_grp').value = document.getElementById('groupv').value
});

// trying to generate groups as many group size value
function NP_generate_input() {
  var grp = $('#uneven_grp').val();
  if (grp >= 1) {
    for (var inp_p = 1; inp_p <= grp; inp_p++) {
      var divtmp = document.createElement('div');
      var spantmp = document.createElement('span');
      var inputtmp = document.createElement('input');

      divtmp.className = ('input-group input-group-sm mb-3')
      spantmp.className = ('input-group-text');
      var spanit = ('Group ' + inp_p);
      spantmp.innerText = (spanit);
      var inputid = ('grp_sm_' + inp_p);
      inputtmp.id = (inputid)
      inputtmp.className = ('form-control');
      inputtmp.type = ('number');
      inputtmp.placeholder = ('# peoples in group');
      inputtmp.setAttribute('aria-label', '# peoples in group');

      document.getElementById('dyn_uneven').appendChild(divtmp);
      divtmp.appendChild(spantmp);
      divtmp.appendChild(inputtmp);
    }
  }
}

function NP_remove_input() {
  var deltmp = document.getElementById('dyn_uneven')
  if (typeof(deltmp) != 'undefined' && deltmp != null)
  {
    while (deltmp.firstChild) {
      deltmp.removeChild(deltmp.lastChild);
    }
  }
}
// end of trying to generate groups as many group size value

// main things
function NP_Main() {
  var namelist = document.getElementById('namesv').value.trim().split('\n');
  var cleannames = namelist.filter(function(el) { return el; });
  var maxname = cleannames.length;
  var ppl = $('#peoplev').val();
  var grp = $('#groupv').val();

  if (namelist != "") {
    if (document.getElementById('uneven_ck').checked) {
      cntmode = 5
      // al_ert('mode = ' + cntmode)
      // this one is for uneven groups
      if (true) {

      }
      NP_clear_result()
      var grp_auto = $('#uneven_grp').val()
      var ctr = 0
      var people_in_groups = []
      var allppl = 0
      var allgrp = grp_auto

      for (var xa = 0; xa <= allgrp; xa++) {
        var jdl = ('#grp_sm_' + (xa+1));
        ads = Number($(jdl).val())
        allppl = allppl + ads
        if (maxname >= allppl) {
          people_in_groups.push(ads-1)
        } else {
          people_in_groups.push((ads-1) - (allppl - maxname))
        }
      }

      for (var x = 0; x < grp_auto; x++) {
        var lbltmp = document.createElement('label');
        lbltmp.innerHTML = ('<b>Group ' + (x + 1) + '</b>');
        lbltmp.className = ('p-2 pt-0 pb-0');
        var namepool = []

        for (var b = people_in_groups[ctr]; b >= 0; b--) {
          // console.lo_g('people in groups = ' + people_in_groups[ctr]);
          var rand = Math.floor(Math.random()*cleannames.length);
          var pickedname = cleannames[rand]
          namepool.push('<li>' + pickedname + '</li>')
          cleannames.splice(rand, 1);
          var oltmp = document.createElement('ol');
          oltmp.innerHTML = (namepool.join('\n'));
        }
        ctr = ctr + 1
        // console.lo_g('counter ' + ctr);
        // console.lo_g(namepool);
        // console.lo_g("Ini Team " + (x + 1) + " " + namepool);

        document.getElementById('ResultBox').appendChild(lbltmp);
        document.getElementById('ResultBox').appendChild(oltmp);
      }
      // ======================================================================
    } else if (document.getElementById('group_ck').checked) {
      if (ppl >= 1) {
        if (grp > 1) {
          cntmode = 3
          // al_ert('mode = ' + cntmode)
          // this one is for if both group and people has value
          // ======================================================================
        } else {
          cntmode = 1
          // al_ert('mode = ' + cntmode)
          // this one is for people only
          if (maxname > ppl) {
            NP_clear_result()
            var grp_auto = Math.round(maxname / ppl)
            var ctr = 0
            var people_in_groups = []

            if ((grp_auto * ppl) > maxname && (grp_auto * ppl) != maxname) {
              NP_alert_show()
              var ads = 0
              var leftover = (grp_auto * ppl) - maxname
              // al_ert('remove ' + leftover + ' person')
              for (var xxx = 0; xxx < leftover; xxx++) {
                ads = ads + 1
                var namesum = maxname
                for (var xx = 0; xx < grp_auto; xx++) {
                  if ((leftover >= 1) && (((ppl-1) - ads) >= (ppl-1))) {
                    people_in_groups.push((ppl-1) - ads)
                    leftover = leftover - 1
                    // console.lo_g('leftover to remove ' + leftover);
                  } else {
                    if (ppl < namesum) {
                      people_in_groups.push(ppl-1)
                      namesum = (namesum - ppl)
                      // console.lo_g('namesum ' + namesum);
                    } else {
                      people_in_groups.push(namesum-1)
                      people_in_groups.reverse()
                    }
                  }
                }
                people_in_groups.reverse()
              }
            } else if ((grp_auto * ppl) == maxname) {
              for (var xx = 0; xx < grp_auto; xx++) {
                people_in_groups.push(ppl-1)
              }
            } else {
              NP_alert_show()
              var ads = 0
              var leftover = maxname - (grp_auto * ppl)
              grp_auto = grp_auto + 1
              // al_ert('add ' + leftover + ' person')
              for (var xxx = 0; xxx < leftover; xxx++) {
                ads = ads + 1
                var namesum = maxname
                for (var xx = 0; xx < grp_auto; xx++) {
                  // console.lo_g(grp_auto);
                  if ((leftover >= 1) && (((ppl-1) + ads) <= (ppl-1))) {
                    people_in_groups.push((ppl-1) + ads)
                    leftover = leftover - 1
                    // console.lo_g('leftover to add ' + leftover);
                  } else {
                    if (ppl < namesum) {
                      // console.lo_g('namesum3 ' + namesum);
                      people_in_groups.push(ppl-1)
                      namesum = (namesum - ppl)
                    } else {
                      people_in_groups.push(namesum-1)
                      people_in_groups.reverse()
                    }
                  }
                }
                people_in_groups.reverse()
              }
            }

            for (var x = 0; x < grp_auto; x++) {
              var lbltmp = document.createElement('label');
              lbltmp.innerHTML = ('<b>Group ' + (x + 1) + '</b>');
              lbltmp.className = ('p-2 pt-0 pb-0');
              var namepool = []

              for (var b = people_in_groups[ctr]; b >= 0; b--) {
                // console.lo_g('people in groups = ' + people_in_groups[ctr]);
                var rand = Math.floor(Math.random()*cleannames.length);
                var pickedname = cleannames[rand]
                namepool.push('<li>' + pickedname + '</li>')
                cleannames.splice(rand, 1);
                // // console.lo_g('sisa ' + cleannames);

                var oltmp = document.createElement('ol');
                oltmp.innerHTML = (namepool.join('\n'));
              }
              ctr = ctr + 1
              // console.lo_g('counter ' + ctr);
              // console.lo_g(namepool);
              // console.lo_g("Ini Team " + (x + 1) + " " + namepool);

              document.getElementById('ResultBox').appendChild(lbltmp);
              document.getElementById('ResultBox').appendChild(oltmp);
            }
          } else {
            NP_alert_show()
            NP_clear_result()
            var namepool = []
            var people_in_groups = maxname-1
            for (var i = people_in_groups; i >= 0; i--) {
              var rand = Math.floor(Math.random()*cleannames.length);
              var pickedname = cleannames[rand]
              namepool.push('<li>' + pickedname + '</li>')
              cleannames.splice(rand, 1);

              var lbltmp = document.createElement('label');
              var oltmp = document.createElement('ol');
              lbltmp.innerHTML = ('<b>Group 1</b>');
              lbltmp.className = ('p-2 pt-0 pb-0');
              oltmp.innerHTML = (namepool.join('\n'));

            }
            document.getElementById('ResultBox').appendChild(lbltmp);
            document.getElementById('ResultBox').appendChild(oltmp);
          }
          // ======================================================================
        }
      } else if (grp >= 1 && grp != "") {
        cntmode = 2
        // al_ert('mode = ' + cntmode)
        // this one is for group only
        if (maxname >= grp) {
          NP_clear_result()
          var ppl = Math.round(maxname / grp)
          // console.lo_g(maxname / grp);
          var grp_auto = grp
          // console.lo_g(grp_auto + ' group with ' + ppl + ' people');
          var ctr = 0
          var people_in_groups = []

          var leftover = (grp_auto * ppl) - maxname
          if ((leftover >= ppl) && (grp_auto != ppl)) {
            ppl = ppl - 1
            // console.lo_g('ppl = ' + ppl);
          }

          if ((grp_auto * ppl) > maxname && ((grp_auto * ppl) != maxname)) {
            NP_alert_show()
            var ads = 0
            var leftover = (grp_auto * ppl) - maxname
            // al_ert('remove ' + leftover + ' person')
            for (var xxx = 0; xxx < leftover; xxx++) {
              ads = ads + 1
              var namesum = maxname
              for (var xx = 0; xx < grp_auto; xx++) {
                if ((leftover >= 1) && (((ppl-1) - ads) >= (ppl-1))) {
                  people_in_groups.push((ppl-1) - ads)
                  leftover = leftover - 1
                  // console.lo_g('leftover to remove ' + leftover);
                } else {
                  if (ppl < namesum) {
                    people_in_groups.push(ppl-1)
                    namesum = (namesum - ppl)
                    // console.lo_g('namesum ' + namesum);
                    // console.lo_g(people_in_groups);
                  } else {
                    people_in_groups.push(namesum-1)
                    people_in_groups.reverse()
                  }
                }
              }
              people_in_groups.reverse()
            }
          } else if ((grp_auto * ppl) == maxname) {
            for (var xx = 0; xx < grp_auto; xx++) {
              people_in_groups.push(ppl-1)
            }
          } else {
            NP_alert_show()
            var ads = 0
            var leftover = maxname - (grp_auto * ppl)
            // al_ert('add ' + leftover + ' person')
            for (var xxx = 0; xxx < leftover; xxx++) {
              ads = ads + 1
              var namesum = maxname
              for (var xx = 0; xx < grp_auto; xx++) {
                // console.lo_g(grp_auto);
                if (leftover >= 1) {
                  people_in_groups.push((ppl-1) + ads)
                  leftover = leftover - 1
                  // console.lo_g('leftover to add ' + leftover);
                } else {
                  people_in_groups.push(ppl-1)
                }
              }
            }
          }

          for (var x = 0; x < grp_auto; x++) {
            var lbltmp = document.createElement('label');
            lbltmp.innerHTML = ('<b>Group ' + (x + 1) + '</b>');
            lbltmp.className = ('p-2 pt-0 pb-0');
            var namepool = []

            for (var b = people_in_groups[ctr]; b >= 0; b--) {
              // console.lo_g('people in groups = ' + people_in_groups[ctr]);
              var rand = Math.floor(Math.random()*cleannames.length);
              var pickedname = cleannames[rand]
              namepool.push('<li>' + pickedname + '</li>')
              cleannames.splice(rand, 1);
              var oltmp = document.createElement('ol');
              oltmp.innerHTML = (namepool.join('\n'));
            }
            ctr = ctr + 1
            // console.lo_g('counter ' + ctr);
            // console.lo_g(namepool);
            // console.lo_g("Ini Team " + (x + 1) + " " + namepool);

            document.getElementById('ResultBox').appendChild(lbltmp);
            document.getElementById('ResultBox').appendChild(oltmp);
          }
        } else {
          NP_alert_show()
          NP_clear_result()
          var namepool = []
          var grp_auto = maxname
          var people_in_groups = 1
          for (var x = 0; x < grp_auto; x++) {
            var lbltmp = document.createElement('label');
            lbltmp.innerHTML = ('<b>Group ' + (x + 1) + '</b>');
            lbltmp.className = ('p-2 pt-0 pb-0');
            var namepool = []

            for (var b = people_in_groups; b >= 0; b--) {
              // console.lo_g('people in groups = ' + people_in_groups[ctr]);
              var rand = Math.floor(Math.random()*cleannames.length);
              var pickedname = cleannames[rand]
              namepool.push('<li>' + pickedname + '</li>')
              cleannames.splice(rand, 1);
              var oltmp = document.createElement('ol');
              oltmp.innerHTML = (namepool.join('\n'));
            }
            ctr = ctr + 1
            // console.lo_g('counter ' + ctr);
            // console.lo_g(namepool);
            // console.lo_g("Ini Team " + (x + 1) + " " + namepool);

            document.getElementById('ResultBox').appendChild(lbltmp);
            document.getElementById('ResultBox').appendChild(oltmp);
          }
        }
        // ======================================================================
      } else {
        cntmode = 4
        // al_ert('mode = ' + cntmode)
        // this one is for if both group and people has no value
        NP_alert_show()
        NP_clear_result();
        var rand = Math.floor(Math.random()*cleannames.length);
        var pickedname = (cleannames[rand]);
        var lbltmp = document.createElement('label');
        var oltmp = document.createElement('ol');
        var litmp = document.createElement("li");
        lbltmp.innerHTML = ('<b>Group 1</b>');
        lbltmp.className = ('p-2 pt-0 pb-0');
        litmp.innerHTML = (pickedname);
        // console.lo_g(cleannames);
        document.getElementById('ResultBox').appendChild(lbltmp);
        document.getElementById('ResultBox').appendChild(oltmp);
        oltmp.appendChild(litmp);
        // ======================================================================
      }
    } else {
      cntmode = 6
      // al_ert('mode = ' + cntmode)
      NP_clear_result()
      var namepool = []
      var grp_auto = $('#winnerv').val()
      var people_in_groups = 0

      if ((grp_auto >= 1) && (maxname > grp_auto)) {
        for (var x = 0; x < grp_auto; x++) {
          var lbltmp = document.createElement('label');
          lbltmp.innerHTML = ('<b>#' + (x + 1) + '</b>');
          lbltmp.className = ('p-2 pt-0 pb-0');
          var namepool = []

          for (var b = people_in_groups; b >= 0; b--) {
            // console.lo_g('people in groups = ' + people_in_groups[ctr]);
            var rand = Math.floor(Math.random()*cleannames.length);
            var pickedname = cleannames[rand]
            namepool.push('<li>' + pickedname + '</li>')
            cleannames.splice(rand, 1);
            var oltmp = document.createElement('ol');
            oltmp.innerHTML = (namepool.join('\n'));
          }
          ctr = ctr + 1
          // console.lo_g('counter ' + ctr);
          // console.lo_g(namepool);
          // console.lo_g("Ini Team " + (x + 1) + " " + namepool);

          document.getElementById('ResultBox').appendChild(lbltmp);
          document.getElementById('ResultBox').appendChild(oltmp);
        }
      } else {
        NP_alert_show()
        grp_auto = maxname;
        for (var x = 0; x < grp_auto; x++) {
          var lbltmp = document.createElement('label');
          lbltmp.innerHTML = ('<b>#' + (x + 1) + '</b>');
          lbltmp.className = ('p-2 pt-0 pb-0');
          var namepool = []

          for (var b = people_in_groups; b >= 0; b--) {
            // console.lo_g('people in groups = ' + people_in_groups[ctr]);
            var rand = Math.floor(Math.random()*cleannames.length);
            var pickedname = cleannames[rand]
            namepool.push('<li>' + pickedname + '</li>')
            cleannames.splice(rand, 1);
            var oltmp = document.createElement('ol');
            oltmp.innerHTML = (namepool.join('\n'));
          }
          ctr = ctr + 1
          // console.lo_g('counter ' + ctr);
          // console.lo_g(namepool);
          // console.lo_g("Ini Team " + (x + 1) + " " + namepool);

          document.getElementById('ResultBox').appendChild(lbltmp);
          document.getElementById('ResultBox').appendChild(oltmp);
        }
      }
    }
  } else {
    NP_alert_show()
  }
}

function NP_clear_result() {
  var deltmp = document.getElementById('ResultBox')
  if (typeof(deltmp) != 'undefined' && deltmp != null)
  {
    while (deltmp.firstChild) {
      deltmp.removeChild(deltmp.lastChild);
    }
  }
}
