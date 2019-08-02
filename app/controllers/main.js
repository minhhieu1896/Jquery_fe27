$(document).ready(function(){
    var mangND = new DanhSachNguoiDung();
    var tbody = $('#tblDanhSachNguoiDung');

    getLocalStorage();

    $('#btnThemNguoiDung').click(function() {
        var title = "Thêm người dùng";
        var btn = `<button class="btn btn-success" id="btnThem">Thêm</button>` ;
        $('.modal-title').html(title);
        $('.modal-footer').html(btn);
    });

    $('body').delegate('#btnThem', 'click',function() {
        var taiKhoan = $('#TaiKhoan').val();
        var hoTen = $('#HoTen').val();
        var matKhau = $('#MatKhau').val();
        var email = $('#Email').val();
        var sdt = $('#SoDienThoai').val();
        var nguoiDungMoi = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt);
        // console.table(nguoiDungMoi);
        mangND.themNguoiDung(nguoiDungMoi)
        setLocalStorage();
        HienThi();
    });

    $('body').delegate('.btn-update', 'click', function() {
        var target = event.target;
        var id = target.dataset.id;
        id = parseInt(id[id.length - 1]);

        var title = "Chỉnh sửa thông tin";
        var btn = `<button class="btn btn-success" id="btnSua">Sửa</button>` ;
        $('.modal-title').html(title);
        $('.modal-footer').html(btn);

        $('#TaiKhoan').val(mangND.mangNguoiDung[id].taiKhoan) ;
        $('#HoTen').val(mangND.mangNguoiDung[id].hoTen);
        $('#MatKhau').val(mangND.mangNguoiDung[id].matKhau);
        $('#Email').val(mangND.mangNguoiDung[id].email);
        $('#SoDienThoai').val(mangND.mangNguoiDung[id].sdt);


        $('body').delegate('#btnSua', 'click',function() {
            var taiKhoan = $('#TaiKhoan').val();
            var hoTen = $('#HoTen').val();
            var matKhau = $('#MatKhau').val();
            var email = $('#Email').val();
            var sdt = $('#SoDienThoai').val();
            var nguoiDungMoi = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt);
            // console.table(nguoiDungMoi);
            mangND.mangNguoiDung[id] = nguoiDungMoi;
            setLocalStorage();
            HienThi();
        });
    });



    $('body').delegate('.btn-delete', 'click',function() {
        var target = event.target;
        var id = target.dataset.id;
        
        id = parseInt(id[id.length - 1]);
        mangND.mangNguoiDung.splice(id,1);
        
        HienThi();
    });


    function HienThi() {
        var tr = '';

        mangND.mangNguoiDung.forEach( (cur, index) => {
            tr += `
            <tr>
                <td>${index+1}</td>
                <td>${cur.taiKhoan}</td>
                <td>${cur.hoTen}</td>
                <td>${cur.matKhau}</td>
                <td>${cur.email}</td>
                <td>${cur.sdt}</td>
                <td style="text-align: center;">
                <button class="btn btn-success btn-update" data-id='Sua${index}' data-toggle="modal" data-target="#myModal">Sửa</button>
                <button class="btn btn-danger btn-delete" data-id='Xoa${index}'>Xóa</button>
                </td>
            </tr>
            `
        })

        tbody.html(tr);
    }

    function setLocalStorage(){
        localStorage.setItem('mangNguoiDung', JSON.stringify(mangND.mangNguoiDung));
    }

    function getLocalStorage(){
        if (localStorage.getItem('mangNguoiDung'))
        mangND.mangNguoiDung = JSON.parse(localStorage.getItem('mangNguoiDung', (mangND.mangNguoiDung)));
        HienThi();
    }

});

