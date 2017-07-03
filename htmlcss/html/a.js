document.write("<script language='javascript' src='b.js'></script>");  // ok 浏览器也可以调试
document.write("<p>1</p>");  // （会自动跳到body中去写，后面再写script标签会接着从该标签继续写下去）
document.write("<p>2</p>");
function test()
{
    b();
}
 