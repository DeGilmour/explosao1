const index = require('./index');
function convertToGet(queryRes){
    console.log("Controller " + queryRes)
    return queryRes
}

function paginator(num_produtos){
    console.log("Num prod" + num_produtos)
    var num_table = 8;
    var num_paginas = num_produtos/num_table
    var offset = 0
    console.log(num_paginas)
    console.log(Number.isInteger(num_paginas))
    if (Number.isInteger(num_paginas)){
        offset = num_paginas - 1
        return offset
    }
    else{
      num_paginas =  Math.ceil(num_paginas)
      num_paginas = num_paginas + 1
      var real_num_pag = []
      for (let index = 1; index < num_paginas ; index++) {
        real_num_pag.push(index);
      }
      console.log(real_num_pag)
      offset = real_num_pag
      if(offset == 0){
        offset = 1
      }
      return offset
    }

}
module.exports = { convertToGet, paginator }