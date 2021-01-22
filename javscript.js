$('#namesv').val('Asbun\nBadu\nMalkovich\nPutin\nBambamng\nMangkir\nBirat\nManjula\nArchie\nEmmalyn\nAldona\nKısmet\nPrzemysł\nJemima\nCarina')

$('#group_ck').on('change', function() {
  if (document.getElementById('group_ck').checked) {
    document.getElementById('groupv').disabled = false
    document.getElementById('peoplev').disabled = true
    document.getElementById('peoplev').value = ""
  } else {
    document.getElementById('groupv').disabled = true
    document.getElementById('peoplev').disabled = false
    document.getElementById('groupv').value = ""
  }
});

$('#uneven_grp').on('change', function() {
  document.getElementById('groupv').value = document.getElementById('uneven_grp').value
  remove_input()
  generate_input()
});

$('#groupv').on('change', function() {
  document.getElementById('uneven_grp').value = document.getElementById('groupv').value
});

// For more than 20 groups
$('#uneven_ck').on('change', function() {
  if (document.getElementById('uneven_ck').checked) {
    generate_input()
    document.getElementById('def_opt').style.display = 'none'
    document.getElementById('uneven_opt').style.display = 'block'
  } else {
    remove_input();
    document.getElementById('def_opt').style.display = 'block'
    document.getElementById('uneven_opt').style.display = 'none'
  }
});

// trying to generate groups as many group size value
function generate_input() {
  var grp = $('#uneven_grp').val();
  if (grp > 1) {
    for (var inp_p = 1; inp_p <= grp; inp_p++) {
      var divtmp = document.createElement("div");
      var spantmp = document.createElement("span");
      var inputtmp = document.createElement("input");

      divtmp.className = ("input-group input-group-sm mb-3")
      spantmp.className = ("input-group-text");
      var spanit = ("Group " + inp_p);
      spantmp.innerText = (spanit);
      var inputid = ("grp_sm_" + inp_p);
      inputtmp.id = (inputid)
      inputtmp.className = ("form-control");
      inputtmp.type = ("text");
      inputtmp.placeholder = ("# peoples in group");
      inputtmp.arialabel = ("# peoples in group");

      document.getElementById('dyn_uneven').appendChild(divtmp);
      divtmp.appendChild(spantmp);
      divtmp.appendChild(inputtmp);
    }
  }
}

function remove_input() {
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
function counting() {
  var namelist = document.getElementById('namesv').value.trim().split('\n');
  var cleannames = namelist.filter(function(el) { return el; });
  var maxname = cleannames.length
  var ppl = $('#peoplev').val();
  var grp = $('#groupv').val();

  if (document.getElementById('uneven_ck').checked) {
    cntmode = 5
    alert('mode = ' + cntmode)
    // this one is for uneven groups
    // ======================================================================
  } else {
    if (ppl >= 1) {
      if (grp > 1) {
        // this one is for if both group and people has value
        // if (maxname > ppl) {
        //   remove_counting()
        //   var grp_auto = Math.round(maxname / ppl)
        //   var ctr = 0
        //   var people_in_groups = []
        //
        //   if ((grp_auto * ppl) > maxname && (grp_auto * ppl) != maxname) {
        //     var ads = 0
        //     var leftover = (grp_auto * ppl) - maxname
        //     alert('remove ' + leftover + ' person')
        //     for (var xxx = 0; xxx < leftover; xxx++) {
        //       if (leftover >= 1) {
        //         for (var xx = 0; xx < grp_auto; xx++) {
        //           if (leftover >= 1) {
        //             ads = ads + 1
        //             people_in_groups.push((ppl-1) - ads)
        //             leftover = leftover - 1
        //             console.log('leftover to remove ' + leftover);
        //           } else {
        //             people_in_groups.push(ppl-1)
        //           }
        //         }
        //       } else {
        //         console.log('leftover to remove2 ' + leftover);
        //       }
        //       people_in_groups.reverse()
        //     }
        //   } else {
        //     var ads = 0
        //     var leftover = maxname - (grp_auto * ppl)
        //     alert('add ' + leftover + ' person')
        //     for (var xxx = 0; xxx < leftover; xxx++) {
        //       for (var xx = 0; xx < grp_auto; xx++) {
        //         if (leftover >= 1) {
        //           ads = ads + 1
        //           people_in_groups.push((ppl-1) + ads)
        //           leftover = leftover - 1
        //           console.log('leftover to add ' + leftover);
        //         } else {
        //           people_in_groups.push(ppl-1)
        //         }
        //       }
        //     }
        //     people_in_groups.reverse()
        //   }
        //
        //   for (var x = 0; x < grp_auto; x++) {
        //     var lbltmp = document.createElement("label");
        //     lbltmp.innerHTML = ('<b>Group ' + (x + 1) + '</b>');
        //     lbltmp.className = ('p-2 pt-0 pb-0');
        //     var namepool = []
        //
        //     for (var b = people_in_groups[ctr]; b >= 0; b--) {
        //       console.log('people in groups = ' + people_in_groups[ctr]);
        //       var rand = Math.floor(Math.random()*cleannames.length);
        //       var pickedname = cleannames[rand]
        //       namepool.push('<li>' + pickedname + '</li>')
        //       cleannames.splice(rand, 1);
        //       // console.log('sisa ' + cleannames);
        //
        //       var oltmp = document.createElement("ol");
        //       oltmp.innerHTML = (namepool.join('\n'));
        //     }
        //     ctr = ctr + 1
        //     console.log('counter ' + ctr);
        //     console.log(namepool);
        //     console.log("Ini Team " + (x + 1) + " " + namepool);
        //
        //     document.getElementById('ResultBox').appendChild(lbltmp);
        //     document.getElementById('ResultBox').appendChild(oltmp);
        //   }
        // } else {
        //   remove_counting()
        //   var namepool = []
        //   var people_in_groups = maxname-1
        //   for (var i = people_in_groups; i >= 0; i--) {
        //     var rand = Math.floor(Math.random()*cleannames.length);
        //     var pickedname = cleannames[rand]
        //     namepool.push('<li>' + pickedname + '</li>')
        //     cleannames.splice(rand, 1);
        //
        //     var lbltmp = document.createElement("label");
        //     var oltmp = document.createElement("ol");
        //     lbltmp.innerHTML = ('<b>Group 1</b>');
        //     lbltmp.className = ('p-2 pt-0 pb-0');
        //     oltmp.innerHTML = (namepool.join('\n'));
        //
        //   }
        //   document.getElementById('ResultBox').appendChild(lbltmp);
        //   document.getElementById('ResultBox').appendChild(oltmp);
        // }
        // ======================================================================
        cntmode = 3
        alert('mode = ' + cntmode)
      } else {
        cntmode = 1
        alert('mode = ' + cntmode)
        // this one is for people only
        if (maxname > ppl) {
          remove_counting()
          var grp_auto = Math.round(maxname / ppl)
          var ctr = 0
          var people_in_groups = []

          if ((grp_auto * ppl) > maxname && (grp_auto * ppl) != maxname) {
            var ads = 0
            var leftover = (grp_auto * ppl) - maxname
            alert('remove ' + leftover + ' person')
            for (var xxx = 0; xxx < leftover; xxx++) {
              ads = ads + 1
              var namesum = maxname
              for (var xx = 0; xx < grp_auto; xx++) {
                if ((leftover >= 1) && (((ppl-1) - ads) >= (ppl-1))) {
                  people_in_groups.push((ppl-1) - ads)
                  leftover = leftover - 1
                  console.log('leftover to remove ' + leftover);
                } else {
                  if (ppl < namesum) {
                    people_in_groups.push(ppl-1)
                    namesum = (namesum - ppl)
                    console.log('namesum ' + namesum);
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
            var ads = 0
            var leftover = maxname - (grp_auto * ppl)
            grp_auto = grp_auto + 1
            alert('add ' + leftover + ' person')
            for (var xxx = 0; xxx < leftover; xxx++) {
              ads = ads + 1
              var namesum = maxname
              for (var xx = 0; xx < grp_auto; xx++) {
                console.log(grp_auto);
                if ((leftover >= 1) && (((ppl-1) + ads) <= (ppl-1))) {
                  people_in_groups.push((ppl-1) + ads)
                  leftover = leftover - 1
                  console.log('leftover to add ' + leftover);
                } else {
                  if (ppl < namesum) {
                    console.log('namesum3 ' + namesum);
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
            var lbltmp = document.createElement("label");
            lbltmp.innerHTML = ('<b>Group ' + (x + 1) + '</b>');
            lbltmp.className = ('p-2 pt-0 pb-0');
            var namepool = []

            for (var b = people_in_groups[ctr]; b >= 0; b--) {
              console.log('people in groups = ' + people_in_groups[ctr]);
              var rand = Math.floor(Math.random()*cleannames.length);
              var pickedname = cleannames[rand]
              namepool.push('<li>' + pickedname + '</li>')
              cleannames.splice(rand, 1);
              // console.log('sisa ' + cleannames);

              var oltmp = document.createElement("ol");
              oltmp.innerHTML = (namepool.join('\n'));
            }
            ctr = ctr + 1
            console.log('counter ' + ctr);
            console.log(namepool);
            console.log("Ini Team " + (x + 1) + " " + namepool);

            document.getElementById('ResultBox').appendChild(lbltmp);
            document.getElementById('ResultBox').appendChild(oltmp);
          }
        } else {
          remove_counting()
          var namepool = []
          var people_in_groups = maxname-1
          for (var i = people_in_groups; i >= 0; i--) {
            var rand = Math.floor(Math.random()*cleannames.length);
            var pickedname = cleannames[rand]
            namepool.push('<li>' + pickedname + '</li>')
            cleannames.splice(rand, 1);

            var lbltmp = document.createElement("label");
            var oltmp = document.createElement("ol");
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
      alert('mode = ' + cntmode)
      // this one is for group only
      if (maxname > grp) {
        remove_counting()
        var ppl = Math.round(maxname / grp)
        var grp_auto = grp
        var ctr = 0
        var people_in_groups = []

        if ((grp_auto * ppl) > maxname && (grp_auto * ppl) != maxname) {
          var ads = 0
          var leftover = (grp_auto * ppl) - maxname
          alert('remove ' + leftover + ' person')
          for (var xxx = 0; xxx < leftover; xxx++) {
            ads = ads + 1
            var namesum = maxname
            for (var xx = 0; xx < grp_auto; xx++) {
              if ((leftover >= 1) && (((ppl-1) - ads) >= (ppl-1))) {
                people_in_groups.push((ppl-1) - ads)
                leftover = leftover - 1
                console.log('leftover to remove ' + leftover);
              } else {
                if (ppl < namesum) {
                  people_in_groups.push(ppl-1)
                  namesum = (namesum - ppl)
                  console.log('namesum ' + namesum);
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
          var ads = 0
          var leftover = maxname - (grp_auto * ppl)
          grp_auto = grp_auto + 1
          alert('add ' + leftover + ' person')
          for (var xxx = 0; xxx < leftover; xxx++) {
            ads = ads + 1
            var namesum = maxname
            for (var xx = 0; xx < grp_auto; xx++) {
              console.log(grp_auto);
              if ((leftover >= 1) && (((ppl-1) + ads) <= (ppl-1))) {
                people_in_groups.push((ppl-1) + ads)
                leftover = leftover - 1
                console.log('leftover to add ' + leftover);
              } else {
                if (ppl < namesum) {
                  console.log('namesum3 ' + namesum);
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
          var lbltmp = document.createElement("label");
          lbltmp.innerHTML = ('<b>Group ' + (x + 1) + '</b>');
          lbltmp.className = ('p-2 pt-0 pb-0');
          var namepool = []

          for (var b = people_in_groups[ctr]; b >= 0; b--) {
            console.log('people in groups = ' + people_in_groups[ctr]);
            var rand = Math.floor(Math.random()*cleannames.length);
            var pickedname = cleannames[rand]
            namepool.push('<li>' + pickedname + '</li>')
            cleannames.splice(rand, 1);
            // console.log('sisa ' + cleannames);

            var oltmp = document.createElement("ol");
            oltmp.innerHTML = (namepool.join('\n'));
          }
          ctr = ctr + 1
          console.log('counter ' + ctr);
          console.log(namepool);
          console.log("Ini Team " + (x + 1) + " " + namepool);

          document.getElementById('ResultBox').appendChild(lbltmp);
          document.getElementById('ResultBox').appendChild(oltmp);
        }
      } else {
        remove_counting()
        var namepool = []
        var people_in_groups = maxname-1
        for (var i = people_in_groups; i >= 0; i--) {
          var rand = Math.floor(Math.random()*cleannames.length);
          var pickedname = cleannames[rand]
          namepool.push('<li>' + pickedname + '</li>')
          cleannames.splice(rand, 1);

          var lbltmp = document.createElement("label");
          var oltmp = document.createElement("ol");
          lbltmp.innerHTML = ('<b>Group 1</b>');
          lbltmp.className = ('p-2 pt-0 pb-0');
          oltmp.innerHTML = (namepool.join('\n'));

        }
        document.getElementById('ResultBox').appendChild(lbltmp);
        document.getElementById('ResultBox').appendChild(oltmp);
      }
      // ======================================================================
    } else {
      cntmode = 4
      alert('mode = ' + cntmode)
      // this one is for if both group and people has no value
      remove_counting()
      var rand = Math.floor(Math.random()*cleannames.length);
      var pickedname = (cleannames[rand]);
      var lbltmp = document.createElement("label");
      var oltmp = document.createElement("ol");
      var litmp = document.createElement("li");
      lbltmp.innerHTML = ('<b>Group 1</b>');
      lbltmp.className = ('p-2 pt-0 pb-0');
      litmp.innerHTML = (pickedname);
      console.log(cleannames);
      document.getElementById('ResultBox').appendChild(lbltmp);
      document.getElementById('ResultBox').appendChild(oltmp);
      oltmp.appendChild(litmp);
      // ======================================================================
    }
  }
}

function remove_counting() {
  var deltmp = document.getElementById('ResultBox')
  if (typeof(deltmp) != 'undefined' && deltmp != null)
  {
    while (deltmp.firstChild) {
      deltmp.removeChild(deltmp.lastChild);
    }
  }
}


//     console.log(people_in_groups);
//     var namepool = []
//     for (var i = ppl-1; i >= 0; i--) {
//       var rand = Math.floor(Math.random()*cleannames.length);
//       var pickedname = cleannames[rand]
//       namepool.push(pickedname)
//       cleannames.splice(rand, 1);
//       console.log(cleannames);
//       console.log(namepool);
//       document.getElementById('ResultBox').value = namepool.join('\n');
//     }
//   } else {
//     alert("woah, woah, woah, stop right there dude!")
// }

//   if (maxname >= ppl) {
//     if (ppl > 1) {
//       if (grp > 1) {
//         var grp_auto = Math.round(namelist.length / grp)
//         alert(namelist.length / grp)
//         var grppool = []
//         for (var x = 1; x <= grp; x++) {
//           var namepool = []
//           console.log(x);
//           for (var b = grp_auto-1; b >= 0; b--) {
//             console.log("team " + b + " " + grp_auto);
//             var rand = Math.floor(Math.random()*cleannames.length);
//             var pickedname = cleannames[rand]
//             namepool.push(pickedname);
//             cleannames.splice(rand, 1);
//             console.log(cleannames);
//           }
//           if (grp_auto > cleannames.length) {
//             grp_auto = maxname - grp_auto
//           } else {
//             var rand = Math.floor(Math.random()*cleannames.length);
//             console.log('sisa cleannames' + x + grp + cleannames);
//             var pickedname = cleannames[rand];
//             namepool.push(pickedname);
//           }
//           console.log(namepool);
//           grppool[x] = namepool
//           console.log("Ini Team " + x + " " + grppool[x]);
//         }
//       } else {
//         var namepool = []
//         for (var i = ppl-1; i >= 0; i--) {
//           var rand = Math.floor(Math.random()*cleannames.length);
//           var pickedname = cleannames[rand]
//           namepool.push(pickedname)
//           cleannames.splice(rand, 1);
//           console.log(cleannames);
//           console.log(namepool);
//           document.getElementById('ResultBox').value = namepool.join('\n');
//         }
//       }
//     } else {
//       var rand = Math.floor(Math.random()*cleannames.length);
//       var pickedname = cleannames[rand]
//       document.getElementById('ResultBox').value = pickedname;
//     }
//   } else {
//     alert("dude, pls count, okay!")
//   }
 // }
