let value = prompt('Введите строку');

let checkString = function(data){
  if (typeof data !== 'string'){
    alert('Это не строка');
  }

  let string = data.trim();

  if(string.length > 30){
    //сначала обрезать строку, потом вывести ее значение
    return string.length[30] + '...';
  }

  return string;
}

console.log(checkString(value));