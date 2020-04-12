function Ajax(method, params, reqtype, callback, failCallback) {
    params = params || {};
    callback = callback || function (data) {
        $('body').overhang({
            type: 'success',
            message: data.message,
        });
    };
    failCallback = failCallback || function (data) {
        $('body').overhang({
            type: 'error',
            message: data.message,
        });
    };
    return $.ajax({
        type: reqtype,
        url: '/ajax/' + method,
        data: params,
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                callback(data);
            } else {
                failCallback(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            const data = {
                message: errorThrown ? errorThrown : textStatus
            };
            failCallback(data);
        },
    });
}

function DataTables() {
    if ($('#data-table')) {
        $(document).ready(function () {
            $('#data-table').DataTable({
                "aLengthMenu": [
                    [5, 10, 25, -1],
                    [5, 10, 25, "All"]
                ],
                "iDisplayLength": 5,
            });
        });

        function checkAll(bx) {
            var cbs = document.getElementsByTagName('input');
            for (var i = 0; i < cbs.length; i++) {
                if (cbs[i].type == 'checkbox') {
                    cbs[i].checked = bx.checked;
                }
            }
        }
    }
}

function Books() {
    console.log('here');
    $('body').on('click', '.kitapAl', function () {
        Ajax('userbooks', {bookid: $(this).parent().parent().data('book')._id}, 'POST', () => {
            $(this).removeClass('btn-primary').removeClass('kitapAl').addClass('btn-success');
            $(this).html("Bu kitaba sahipsin");
            $('body').overhang({
                type: 'success',
                message: 'Kitabı başarıyla aldın.',
            });
        });
    });
}

function init() {
    DataTables();
    Books();
}

init();