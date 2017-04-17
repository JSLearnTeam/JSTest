var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}

// map 解构
[
  [1, 2],
  [3, 4]
].map(([a, b]) => a + b);

// 遍历JSON结构
let jsonData = {
  id: 1,
  status: 'true',
  data: [3, 4]
};
let {
  id,
  status,
  data: number
} = jsonData;
console.log(id, status, number);

// 鉴别一个字符由2个字节还是4个字节组成的最简单方法
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
};
is32Bit('曹');

// 字符串遍历
function forEachStr(str) {
  for (let codePoint of str) {
    console.log(codePoint);
  }
}
forEachStr('hello world');

// 字符串新方法 includes,startsWith,endsWith
// 支持第二个参数，表示搜索开始位置。eg 3
const testStr = 'hello world';
testStr.startsWith('hello');
testStr.endsWith('d');
testStr.includes('world', 5);

// repeat 重复字符串指定次数
// 参数如果是小数会取整，如果是负数或者Infinity 则会报错
// NAN 等同于 0 ，字符串则会转成数字
testStr.repeat(3);

// 字符串补全长度， padStart,padEnd
// 2个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。
testStr.padStart('a', 10); // 由开头补全
testStr.padEnd('a', 4); // 由末尾开始补全

// 模板字符串 ` 字符
// 当做普通字符串使用
// 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
let strPlus = ``;
// 单行字符串
strPlus = `this is a plusStr`;
// 多行字符串
strPlus += `add a 
multiline str 
in it
`;
// 字符串中嵌入变量
let str1 = '变量1';
let str2 = '变量2';
strPlus += `add the 
one params ${str1} , two params ${str2}`;
console.log(strPlus);

// 大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
let str3 = `${str1}+${str2}=${str1 + str2}`;
console.log(str3);

// 模板字符串之中还能调用函数。
function strTest() {
  return 'hello world';
}
console.log(`foo ${strTest()} bar`); // foo hello world bar
// 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。

// 标签模板
alert `123` === alert(123); // true
{
  let a = 5;
  let b = 10;

  function tag(stringArr, value1, value2) {
    // ....
  }
  tag `Hello ${a + b} world ${a * b}`;
  // 等同于
  tag(['Hello', 'world', ''], 15, 10);
}
// “标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。

// String.raw 方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转译的字符串。
String.raw `Hi\n${2 + 3}`;


// 正则拓展
// ES6 如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
new RegExp(/abc/g, 'i').toString() == /abc/i; // true

// u修饰符，含义为“Unicode”模式，用来正确处理大于\uFFFF的Unicode字符
/^\uD83D/u.test('\uD83D\uDC2A'); // false
/^\uD83D/.test('\uD83D\uDC2A'); // true

// 点字符  点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。

// ES6新增了使用大括号表示Unicode字符，这种表示法在正则表达式中必须加上u修饰符，才能识别。

// Y修饰符
// y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
let s = 'aaa_aa_a';
let reg1 = /a+/g;
let reg2 = /a+/y;

reg1.exec(s);
reg2.exec(s);
// y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。
/b/y.exec('aba'); // null
// sticky 属性
// 与y修饰符相匹配，表示是否设置了y修饰符
// flags 属性    返回正则表达式的修饰符


// 数值的扩展
// 新增方法
// Number.isFinite 判断数值是否是有限的
Number.isFinite(15); // true
Number.isFinite(Infinity); // false
// Number.isNaN判断是不是NAN
Number.isNaN(12); // true
Number.isNaN('15'); // true
Number.isNaN(true); // true
Number.isNaN('true'); // true
Number.isNaN('trsads' / 0); // true

// ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

// Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
Number.isInteger(3.0) === Number.isInteger(3); // true
Number.isInteger(3.1); // false

// ES6在Number对象上面，新增一个极小的常量Number.EPSILON。
// 因此，Number.EPSILON的实质是一个可以接受的误差范围。
{
  function withInErrorMargin(left, right) {
    return Math.abs(left - right) < Math.EPSILON;
  }
  withInErrorMargin(0.1 + 0.2, 0.3);
  // true
  withInErrorMargin(0.1 + 0.2, 0.3);
  // false
}

// 安全整数和Number.isSafeInteger()
// JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
// ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER;
Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
Number.isSafeInteger(null); // false
// 实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。

// Math对象的扩展
// 去除小数部分
Math.trunc(4.1); // 4
// 参数为正数，返回+1；参数为负数，返回-1；参数为0，返回0；参数为-0，返回-0;其他值，返回NaN。
Math.sign(-5); // -1
// 取立方根
Math.cbrt('8'); // 2
// 整数使用32位二进制形式表示
Math.clz32(0); // 0

// 数组扩展

let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
let arr = Array.from(arrayLike);
Array.from({length: 3}) // [undefined, undefined, undefined]
Array.from(arrayLike,x => x+x);
// 等同于
Array.from(arrayLike).map(x => x+x);

[1,5,9,10].find(function(value,index,array){
  return value >5;
})  // 9
[1,5,9,10].findIndex(function(value,index,array){
  return value >5;
})  // 2
