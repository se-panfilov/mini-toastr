"use strict";

var a = {
  ".one_a": {
    ".second_a": {
      position: 'fixed',
      top: '12px'
    },
    ".second_b": {
      cursor: 'pointer',
      ".third_a": {
        cursor: 'pointer',
        width: '300px',
        ".fourth_a": {
          'background-color': '#FF0000',
          ".fifth": {
            some: '123'
          }
        },
        ".fourth_b": {
          width: '300px',
        }
      },
      ".third_b": {
        'background-color': '#FF0000'
      }
    }
  },
  ".one_b": {
    cursor: 'pointer'
  }
}


// function flat (obj) {
//   let out = {}
//   for (let k in obj) {
//     if (obj.hasOwnProperty(k)) {
//       if (typeof obj[k] === 'object') {
//         flat(obj[k])
//       } else {
//         console.info(k)
//       }
//     }
//   }
// }
//
// flat(a)

// function flatten (o) {
//   var prefix = arguments[1] || "", out = arguments[2] || {}, name;
//   for (name in o) {
//     if (o.hasOwnProperty(name)) {
//       if (typeof o[name] === "object") {
//         flatten(o[name], prefix + name + ' ', out)
//       } else {
//         out[prefix + '__'+  name] = o[name];
//       }
//     }
//   }
//   return out;
// }


function flatten (obj, includePrototype, into, prefix) {
  into = into || {};
  prefix = prefix || "";

  for (var k in obj) {
    if (includePrototype || obj.hasOwnProperty(k)) {
      var prop = obj[k];
      if (prop && typeof prop === "object" && !(prop instanceof Date || prop instanceof RegExp)) {
        flatten(prop, includePrototype, into, prefix + k + " ");
      }
      else {
        if (into[prefix] && typeof into[prefix] === 'object') {
          into[prefix][k] = prop
        } else {
          into[prefix] = {}
          into[prefix][k] = prop
        }
      }
    }
  }

  return into;
}

var flattenObj = flatten(a)
// console.info(flattenObj)

let b = JSON.stringify(flattenObj, null, 2)

let c = b;
c = c.replace(/"(.+)": \{/g, '\$1 \{')
c = c.replace(/"(\w*\-*\w*)": "(.+)",?/g, '$1: $2;')
c = c.replace(/},/g, '}\n')

c = c.substr(1, c.lastIndexOf('}')-1)

c = c.replace()
console.info(c)



//---------------------------------------------

// let b = JSON.stringify(a, null, 2)
//
// let c = b;
// c = c.replace(/"(\w+)": \{/g, '\.$1 \{')
// c = c.replace(/"(\w*\-*\w*)": "(.+)",?/g, '$1: $2;')
// c = c.replace(/},/g, '}\n')
//
// c = c.substr(1, c.lastIndexOf('}')-1)

// c = c.replace()
// console.info(c)

let newObj = {}

function flatKeys (obj) {

  function getNames (obj, field) {
    const names = {}

    function getNames (obj, field) {
      return Object.keys(obj).forEach(v => {

        if (typeof obj[v] === 'object') {
          const fieldName = (field) ? `${field} ${v}` : v
          names[v] = fieldName
          return getNames(obj[v], fieldName)
        }
      })
    }

    getNames(obj, field)

    return names
  }

  const names = getNames(obj)
  // console.info(names)

  // function makeNewObj (oldObj, newNamesArr) {
  //   const result = {}
  //
  //   function fillNewObj (oldObj, newNamesArr) {
  //     for (let k in oldObj) {
  //       if (oldObj.hasOwnProperty(k)) {
  //         if (typeof oldObj[k] === 'object') {
  //           // console.info(`${k} - ${oldObj[k]}`)
  //           result[newNamesArr[k]] = oldObj[k]
  //
  //           // let filtered = Object.keys(oldObj[k]).filter((v,i) => {
  //           //   return typeof oldObj[k][v] !== 'object'
  //           // })
  //
  //           let filtered = {}
  //           for (let key in oldObj) {
  //             if (typeof oldObj[key] !== 'object') filtered[key] = oldObj[key]
  //           }
  //
  //           // console.info(filtered)
  //
  //           fillNewObj(oldObj[k], newNamesArr)
  //         }
  //         // TODO (S.Panfilov) Cur Work point
  //         // console.info(`${newNamesArr[k]} - ${k}`)
  //
  //       }
  //     }
  //   }
  //
  //   fillNewObj(oldObj, newNamesArr)
  //
  //   console.info('---')
  //   return result
  // }


  // console.info(makeNewObj(obj, names))
  // makeNewObj(obj, names)

  // return result

}

var d = flatKeys(a)

console.info(d)


//     .one_a .second_a {
//       position: 'fixed';
//       top: '12px';
//     }

//     .one_a .second_b {
//       cursor: 'pointer'
//     }

//     .one_a .second_b .third_a {
//       cursor: 'pointer';
//       width: '300px';
//     }

//     .one_a second_b .third_b {
//       'background-color': '#FF0000';
//     }

//     .one_a .second_b .third_b .fourth_a {
//       'background-color': '#FF0000';
//     }

//     .one_a .second_b .third_b .fourth_a .fifth {
//       some: '123';
//     }

//     .one_a .second_b .third_b .fourth_b {
//       width: '300px';
//     }

//   one_b {
//     cursor: 'pointer';
//   }

// var a = {
//   null: { cursor: 'pointer' }

//   '.one_a .second_a' {
//     position: 'fixed', top: '12px'
//   }

//   '.one_a.second_b.third_a.fourth_a .fifth' {
//     some: '123';
//   }

//   '.one_a.second_b.third_a .fourth_a': {
//     'background-color': '#FF0000',
//     '.fifth': {
//       some: '123';
//     }
//   }

//   '.one_a.second_b.third_a .fourth_b': { width: '300px' },
//   '.one_a.second_b .third_a': {
//     cursor: 'pointer',
//     width: '300px',
//     '.fourth_a': { 'background-color': '#FF0000', '.fifth': [Object] },
//     '.fourth_b': { width: '300px' }
//   }

//   '.one_a.second_b .third_b': { 'background-color': '#FF0000' },
//   '.one_a .second_b': {
//     cursor: 'pointer',
//     '.third_a': {
//       cursor: 'pointer',
//       width: '300px',
//       '.fourth_a': [Object];
//       '.fourth_b': [Object];
//     }
//
//     '.third_b': {
//       'background-color': '#FF0000';
//     }
//   }
// }