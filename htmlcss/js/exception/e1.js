function test() {

    console.log(111);
    var a = window.aaaaa()
    console.log(111);
}
try {
    test();
} catch (error) {
    console.log(error)
}

var t = new test();