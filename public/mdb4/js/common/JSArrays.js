

var JSArrays = (function () {
    function deleteFromArray(data, field, valueToDelete) {
        for (var i = 0; i < data.length; i++) {
            if (data[i][field] == valueToDelete) {
                data.splice(i, 1);
            }
        }
    }

    return {
        deleteFromArray: deleteFromArray,
    };
})();
