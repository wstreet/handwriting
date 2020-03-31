Object.myCreate = function(proto) {
    function F() {}

    F.prototype = proto

    return new F()
}